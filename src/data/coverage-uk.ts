/**
 * What the NHS offers for cancer: NICE technology appraisal (TA) outcomes, Cancer Drugs Fund (CDF) managed
 * access, and Scottish Medicines Consortium (SMC) advice for approved oncology products, plus a plain-English
 * explainer of how NHS cancer care and drug funding are organised.
 *
 * Rules: a TA number and year are recorded only where the appraisal is well known and the number could be
 * stated with confidence; the row links to the guidance page so it can be checked in one click. Where the
 * outcome is known but the TA number was not verified, no number is recorded and the row links to a NICE
 * search. Where nothing could be stated confidently the status is "unknown" with a NICE search link, which
 * means "not yet researched", not "not funded". Many products have several TAs (one per indication); the row
 * records one flagship appraisal and names others in the note. SMC status is "accepted" if SMC has accepted
 * the medicine for at least one cancer indication (often restricted); it is omitted where not checked.
 * Long-established generics (platinums, taxanes, anthracyclines, hormones) were never appraised as TAs and
 * are funded routinely through local formularies and NHS England chemotherapy protocols; they are marked
 * "not appraised" with that note. Verify at nice.org.uk and with the treating team before relying on a row.
 */

export type NiceStatus = "recommended" | "optimised" | "cdf" | "not recommended" | "in development" | "terminated" | "not appraised" | "unknown";

export type UkCoverage = {
  drugId: string;
  nice: { status: NiceStatus; ta?: string; year?: number; indication?: string; url?: string; note?: string };
  smc?: { status: string; id?: string; url?: string };
  awmsg?: string;
  nhsEnglandCommissioned?: boolean;
  cdfNote?: string;
  sources: Array<{ label: string; url: string }>;
};

/** Display order: what the NHS funds first, then pending, then refusals, then gaps in our research. */
export const NICE_STATUS_ORDER: NiceStatus[] = ["recommended", "optimised", "cdf", "in development", "not recommended", "terminated", "not appraised", "unknown"];

export const NICE_STATUS_LABEL: Record<NiceStatus, string> = {
  recommended: "NICE recommended",
  optimised: "Recommended (optimised)",
  cdf: "Cancer Drugs Fund",
  "not recommended": "Not recommended",
  "in development": "Appraisal in progress",
  terminated: "Appraisal terminated",
  "not appraised": "Not appraised",
  unknown: "Not yet researched",
};

export const NICE_STATUS_TIP: Record<NiceStatus, string> = {
  recommended: "NICE published a technology appraisal recommending the medicine; NHS England and Wales must fund it within 90 days for the appraised indication.",
  optimised: "Recommended for a narrower group than the licence, or with a condition such as a stopping rule or a confidential discount.",
  cdf: "Recommended for use through the Cancer Drugs Fund under a managed access agreement while more data are collected; NICE reappraises at the end of the period.",
  "not recommended": "NICE did not recommend routine NHS funding for the appraised indication at the price offered. Individual funding requests or later resubmissions are possible.",
  "in development": "An appraisal is scheduled or in progress. The medicine may be available through the company's early access scheme or the CDF interim funding route.",
  terminated: "NICE stopped the appraisal, usually because the company did not submit evidence; the medicine is not routinely funded for that indication.",
  "not appraised": "No technology appraisal exists: either a long-established generic that is funded routinely, or a product not licensed in the UK. Read the note.",
  unknown: "OnCo has not yet sourced the NICE position for this product; follow the link to search NICE.",
};

export const NICE_SEARCH = (q: string) => `https://www.nice.org.uk/search?q=${encodeURIComponent(q)}`;
export const CDF_LIST_URL = "https://www.england.nhs.uk/cancer/cdf/cancer-drugs-fund-list/";
export const SMC_SEARCH = (q: string) => `https://scottishmedicines.org.uk/medicines-advice/?keywords=${encodeURIComponent(q)}`;
const ta = (n: number) => `https://www.nice.org.uk/guidance/ta${n}`;

type Opts = { note?: string; smc?: string; cdfNote?: string; awmsg?: string; commissioned?: boolean };

function row(drugId: string, name: string, status: NiceStatus, taNo: number | undefined, year: number | undefined, indication: string | undefined, o: Opts = {}): UkCoverage {
  const url = taNo ? ta(taNo) : NICE_SEARCH(name);
  const sources: UkCoverage["sources"] = [{ label: taNo ? `NICE TA${taNo}` : `NICE search: ${name}`, url }];
  if (status === "cdf") sources.push({ label: "NHS England Cancer Drugs Fund list", url: CDF_LIST_URL });
  if (o.smc) sources.push({ label: `SMC advice: ${name}`, url: SMC_SEARCH(name) });
  return {
    drugId,
    nice: { status, ta: taNo ? `TA${taNo}` : undefined, year, indication, url, note: o.note },
    smc: o.smc ? { status: o.smc, url: SMC_SEARCH(name) } : undefined,
    awmsg: o.awmsg,
    nhsEnglandCommissioned: o.commissioned ?? (status === "recommended" || status === "optimised" || status === "cdf" ? true : undefined),
    cdfNote: o.cdfNote,
    sources,
  };
}

const rec = (id: string, name: string, taNo: number, year: number, ind: string, o: Opts = {}) => row(id, name, "recommended", taNo, year, ind, o);
const opt = (id: string, name: string, taNo: number, year: number, ind: string, o: Opts = {}) => row(id, name, "optimised", taNo, year, ind, o);
const cdf = (id: string, name: string, taNo: number, year: number, ind: string, o: Opts = {}) => row(id, name, "cdf", taNo, year, ind, { ...o, cdfNote: o.cdfNote ?? "Entered the Cancer Drugs Fund under a managed access agreement; check the current CDF list for whether it has since moved to routine commissioning." });
const notRec = (id: string, name: string, taNo: number, year: number, ind: string, o: Opts = {}) => row(id, name, "not recommended", taNo, year, ind, o);
const recNoTa = (id: string, name: string, ind: string, o: Opts = {}) => row(id, name, "recommended", undefined, undefined, ind, { ...o, note: `${o.note ? o.note + " " : ""}TA number not verified; follow the NICE search link.` });
const unknown = (id: string, name: string, o: Opts = {}) => row(id, name, "unknown", undefined, undefined, undefined, o);
const generic = (id: string, name: string, note?: string) => row(id, name, "not appraised", undefined, undefined, undefined, { note: note ?? "Long-established generic: never subject to a technology appraisal; funded routinely through hospital formularies and NHS England systemic anti-cancer therapy protocols.", commissioned: true });
const notUk = (id: string, name: string, note?: string) => row(id, name, "not appraised", undefined, undefined, undefined, { note: note ?? "No UK marketing authorisation yet, so no NICE appraisal. Access only through a clinical trial or a company early access scheme.", commissioned: false });
const inDev = (id: string, name: string, note?: string) => row(id, name, "in development", undefined, undefined, undefined, { note: note ?? "Recently licensed; a NICE appraisal is scheduled or in progress. Interim access may be possible via the CDF interim funding route once NICE issues positive draft guidance." });

const list: UkCoverage[] = [
  // ================= Checkpoint inhibitors =================
  opt("pembrolizumab", "pembrolizumab", 531, 2018, "Untreated PD-L1 ≥50% metastatic NSCLC (2-year stopping rule)", { note: "One of NICE's most-appraised medicines: melanoma (TA357, TA366, adjuvant TA766), NSCLC (TA428, TA531, TA557, TA600), classical Hodgkin lymphoma (TA540), urothelial (TA522), head and neck (TA661), RCC with axitinib (TA692), TNBC (TA801, TA851), MSI-H colorectal (TA709), oesophageal (TA737) and more. Most are optimised with a 2-year treatment stop.", smc: "accepted" }),
  rec("nivolumab", "nivolumab", 484, 2017, "Previously treated non-squamous NSCLC", { note: "Also melanoma (TA384; with ipilimumab TA400; adjuvant TA558), RCC (TA417; with ipilimumab TA655), squamous NSCLC (TA483), head and neck (TA490), classical Hodgkin lymphoma (TA462), adjuvant oesophageal (TA736), gastric with chemotherapy (TA857).", smc: "accepted" }),
  rec("ipilimumab", "ipilimumab", 319, 2014, "Previously untreated advanced melanoma", { note: "TA268 (previously treated melanoma, 2012) was the first checkpoint inhibitor NICE recommended; combinations with nivolumab in TA400 (melanoma) and TA655 (RCC).", smc: "accepted" }),
  rec("atezolizumab", "atezolizumab", 520, 2018, "NSCLC after chemotherapy", { note: "Also urothelial (TA492), extensive-stage SCLC with chemotherapy (TA639), HCC with bevacizumab (TA666), 1L NSCLC monotherapy (TA705), adjuvant NSCLC (TA823). The TNBC combination with nab-paclitaxel entered the CDF in 2020 and was later withdrawn after IMpassion131.", smc: "accepted" }),
  cdf("durvalumab", "durvalumab", 578, 2019, "Unresectable stage III NSCLC after chemoradiation (PACIFIC)", { note: "Moved to routine commissioning after the CDF period. Also extensive-stage SCLC with platinum-etoposide (TA798), and with tremelimumab in HCC (TA916).", smc: "accepted" }),
  rec("avelumab", "avelumab", 788, 2022, "Maintenance for urothelial cancer after platinum chemotherapy (JAVELIN Bladder 100)", { note: "Merkel cell carcinoma was appraised in TA517 (2018).", smc: "accepted" }),
  cdf("cemiplimab", "cemiplimab", 592, 2019, "Advanced cutaneous squamous cell carcinoma", { note: "Also PD-L1 ≥50% NSCLC (TA770, 2022).", smc: "accepted" }),
  cdf("dostarlimab", "dostarlimab", 779, 2022, "dMMR/MSI-H recurrent or advanced endometrial cancer after platinum", { note: "The first-line combination with carboplatin-paclitaxel (RUBY) was appraised separately in 2024; check NICE for the current position.", smc: "accepted" }),
  rec("tremelimumab", "tremelimumab", 916, 2023, "With durvalumab for untreated advanced or unresectable HCC (HIMALAYA)", { smc: "accepted" }),
  rec("relatlimab-nivolumab", "nivolumab-relatlimab", 950, 2024, "Untreated unresectable or metastatic melanoma (PD-L1 <1%)"),
  unknown("tislelizumab", "tislelizumab", { note: "MHRA-licensed 2024 for oesophageal squamous cell carcinoma; NICE appraisals for ESCC and NSCLC were in progress or recently published. Check NICE." }),
  unknown("toripalimab", "toripalimab", { note: "MHRA-licensed 2025 for nasopharyngeal carcinoma; NICE position not yet researched." }),
  unknown("serplulimab", "serplulimab", { note: "MHRA-licensed 2025 for extensive-stage SCLC; NICE position not yet researched." }),
  notUk("camrelizumab", "camrelizumab"),
  notUk("cadonilimab", "cadonilimab"),
  notUk("penpulimab", "penpulimab"),
  notUk("cosibelimab", "cosibelimab"),
  unknown("retifanlimab", "retifanlimab", { note: "EU-licensed 2024 for Merkel cell carcinoma; UK licence and NICE position not yet researched." }),

  // ================= ADCs =================
  cdf("trastuzumab-deruxtecan", "trastuzumab deruxtecan", 704, 2021, "HER2-positive unresectable or metastatic breast cancer after 2 or more anti-HER2 treatments", { note: "Second-line HER2-positive (DESTINY-Breast03) recommended in TA862 (2023). HER2-low breast cancer (DESTINY-Breast04) was not recommended in final guidance in 2024 after a dispute over the severity modifier, a decision widely criticised by patient groups; check NICE for any later resubmission. Gastric and NSCLC indications are separate appraisals.", smc: "accepted" }),
  rec("trastuzumab-emtansine", "trastuzumab emtansine", 458, 2017, "HER2-positive metastatic breast cancer after trastuzumab and a taxane", { note: "Adjuvant use for residual invasive disease after neoadjuvant therapy (KATHERINE) recommended in TA632 (2020).", smc: "accepted" }),
  rec("sacituzumab-govitecan", "sacituzumab govitecan", 819, 2022, "Unresectable triple-negative breast cancer after 2 or more systemic treatments", { note: "HR-positive/HER2-negative breast cancer (TROPiCS-02) appraised separately; check NICE.", smc: "accepted" }),
  rec("enfortumab-vedotin", "enfortumab vedotin", 982, 2024, "Locally advanced or metastatic urothelial cancer after platinum chemotherapy and a PD-1/PD-L1 inhibitor", { note: "First-line combination with pembrolizumab (EV-302) appraised separately; check NICE for the current position.", smc: "accepted" }),
  rec("brentuximab-vedotin", "brentuximab vedotin", 446, 2017, "CD30-positive Hodgkin lymphoma after autologous transplant or 2 prior therapies", { note: "Also systemic anaplastic large cell lymphoma (TA478) and CD30-positive cutaneous T-cell lymphoma (TA524).", smc: "accepted" }),
  cdf("polatuzumab-vedotin", "polatuzumab vedotin", 649, 2020, "With bendamustine-rituximab for relapsed or refractory DLBCL not eligible for transplant", { note: "First-line pola-R-CHP for DLBCL (POLARIX) recommended in TA874 (2023).", smc: "accepted" }),
  rec("gemtuzumab-ozogamicin", "gemtuzumab ozogamicin", 545, 2018, "Untreated de novo CD33-positive AML with standard induction chemotherapy", { smc: "accepted" }),
  rec("inotuzumab-ozogamicin", "inotuzumab ozogamicin", 541, 2018, "Relapsed or refractory CD22-positive B-cell precursor ALL", { smc: "accepted" }),
  recNoTa("belantamab-mafodotin", "belantamab mafodotin", "With bortezomib and dexamethasone for relapsed or refractory multiple myeloma after 1 or more treatments (DREAMM-7)", { note: "The UK was the first country to re-license belantamab (MHRA, April 2025) and NICE recommended it in 2025." }),
  unknown("mirvetuximab-soravtansine", "mirvetuximab soravtansine", { note: "MHRA-licensed 2025 for FRα-positive platinum-resistant ovarian cancer; NICE appraisal 2025-26. Check NICE." }),
  unknown("tisotumab-vedotin", "tisotumab vedotin", { note: "MHRA-licensed 2025 for recurrent or metastatic cervical cancer; NICE appraisal in progress. Check NICE." }),
  unknown("zynlonta", "loncastuximab tesirine", { note: "MHRA-licensed 2023 for relapsed or refractory DLBCL; NICE position not yet researched." }),
  unknown("datopotamab-deruxtecan", "datopotamab deruxtecan", { note: "MHRA-licensed 2025 for HR-positive/HER2-negative breast cancer; NICE appraisal 2025-26." }),
  notUk("telisotuzumab-vedotin", "telisotuzumab vedotin"),
  notUk("disitamab-vedotin", "disitamab vedotin"),
  notUk("trastuzumab-rezetecan", "trastuzumab rezetecan"),
  notUk("pivekimab-sunirine", "pivekimab sunirine"),

  // ================= Bispecifics and T-cell engagers =================
  rec("blinatumomab", "blinatumomab", 450, 2017, "Philadelphia-negative relapsed or refractory B-cell precursor ALL", { note: "MRD-positive B-ALL recommended in TA589 (2019). Front-line use (E1910) appraised later.", smc: "accepted" }),
  rec("glofitamab", "glofitamab", 927, 2023, "Relapsed or refractory DLBCL after 2 or more systemic treatments", { smc: "accepted" }),
  cdf("epcoritamab", "epcoritamab", 954, 2024, "Relapsed or refractory DLBCL after 2 or more systemic treatments", { smc: "accepted" }),
  cdf("mosunetuzumab", "mosunetuzumab", 892, 2023, "Relapsed or refractory follicular lymphoma after 2 or more systemic treatments", { smc: "accepted" }),
  unknown("teclistamab", "teclistamab", { note: "Licensed 2022 for relapsed or refractory myeloma after 3 or more treatments; NICE recommended it (via managed access) in 2024. TA number not verified." }),
  unknown("elranatamab", "elranatamab", { note: "Licensed 2024; NICE recommended it via the Cancer Drugs Fund in 2024. TA number not verified." }),
  unknown("talquetamab", "talquetamab", { note: "Licensed 2024; NICE appraisal 2024-25. Check NICE." }),
  unknown("linvoseltamab", "linvoseltamab", { note: "MHRA-licensed 2025; NICE appraisal in progress." }),
  unknown("odronextamab", "odronextamab", { note: "MHRA-licensed 2025 (Ordspono); NICE appraisal in progress." }),
  notUk("tarlatamab", "tarlatamab", "No UK marketing authorisation yet (EU MAA under review); accessible only via trials or early access."),
  recNoTa("tebentafusp", "tebentafusp", "HLA-A*02:01-positive unresectable or metastatic uveal melanoma", { note: "NICE recommended tebentafusp in 2023 with a commercial arrangement.", smc: "accepted" }),
  unknown("amivantamab", "amivantamab", { note: "Licensed 2022 for EGFR exon 20 insertion NSCLC after platinum; the first NICE appraisal did not recommend it. Later combinations (with lazertinib, MARIPOSA; with chemotherapy, PAPILLON) appraised 2025-26. Check NICE." }),
  unknown("zanidatamab", "zanidatamab", { note: "MHRA-licensed 2025 for HER2-positive biliary tract cancer; NICE appraisal in progress." }),
  notUk("zenocutuzumab", "zenocutuzumab"),

  // ================= Cell and gene therapies =================
  cdf("tisagenlecleucel", "tisagenlecleucel", 554, 2018, "Relapsed or refractory B-cell ALL in people up to 25 years", { note: "The first CAR-T NICE recommended, within weeks of EU licensing. DLBCL use (TA567, 2019, CDF) was not recommended for routine commissioning when reappraised in 2023. Delivered only at NHS England-designated CAR-T centres after national CAR-T clinical panel review.", smc: "accepted" }),
  cdf("axicabtagene-ciloleucel", "axicabtagene ciloleucel", 559, 2019, "Relapsed or refractory DLBCL or PMBCL after 2 or more systemic therapies", { note: "Moved to routine commissioning in TA872 (2023); second-line DLBCL (ZUMA-7) recommended in TA895 (2023). Delivered at designated CAR-T centres.", smc: "accepted" }),
  cdf("brexucabtagene-autoleucel", "brexucabtagene autoleucel", 677, 2021, "Relapsed or refractory mantle cell lymphoma after a BTK inhibitor", { note: "Adult B-ALL indication appraised separately (2023).", smc: "accepted" }),
  unknown("lisocabtagene-maraleucel", "lisocabtagene maraleucel", { note: "EU-licensed 2022; UK licence and NICE appraisal (second-line and third-line DLBCL) not yet researched." }),
  unknown("idecabtagene-vicleucel", "idecabtagene vicleucel", { note: "Licensed 2021 for myeloma after 3 or more treatments; NICE appraisals 2023-25 (including KarMMa-3 earlier-line use). Check NICE." }),
  unknown("ciltacabtagene-autoleucel", "ciltacabtagene autoleucel", { note: "Licensed 2022; NICE appraisals for later-line and CARTITUDE-4 earlier-line myeloma 2024-26. Check NICE." }),
  unknown("obecabtagene-autoleucel", "obecabtagene autoleucel", { note: "UK-developed (UCL/Autolus) CD19 CAR-T; MHRA-licensed 2025 for adult relapsed or refractory B-ALL; NICE appraisal 2025-26." }),
  notUk("lifileucel", "lifileucel"),
  notUk("afamitresgene-autoleucel", "afamitresgene autoleucel"),
  notUk("satricabtagene-autoleucel", "satricabtagene autoleucel"),
  rec("talimogene-laherparepvec", "talimogene laherparepvec", 410, 2016, "Unresectable regionally or distantly metastatic melanoma (stage IIIB-IVM1a) when systemically administered immunotherapy is not suitable", { smc: "accepted (restricted)" }),
  notRec("sipuleucel-t", "sipuleucel-T", 332, 2015, "Asymptomatic or minimally symptomatic metastatic hormone-relapsed prostate cancer", { note: "Never marketed in the UK; EU licence withdrawn 2015." }),
  notUk("nadofaragene-firadenovec", "nadofaragene firadenovec"),
  notUk("nogapendekin-alfa", "nogapendekin alfa inbakicept"),
  notUk("vusolimogene-oderparepvec", "vusolimogene oderparepvec"),

  // ================= Breast =================
  rec("palbociclib", "palbociclib", 495, 2017, "With an aromatase inhibitor for untreated HR-positive, HER2-negative advanced breast cancer", { note: "With fulvestrant after endocrine therapy: TA619 (2020, from CDF to routine).", smc: "accepted" }),
  rec("ribociclib", "ribociclib", 496, 2017, "With an aromatase inhibitor for untreated HR-positive, HER2-negative advanced breast cancer", { note: "With fulvestrant: TA593 (2019) and TA687 (2021, pre/perimenopausal). Adjuvant use (NATALEE) appraised 2025.", smc: "accepted" }),
  rec("abemaciclib", "abemaciclib", 563, 2019, "With an aromatase inhibitor for untreated HR-positive, HER2-negative advanced breast cancer", { note: "With fulvestrant: TA579 (2019). Adjuvant use for high-risk early breast cancer (monarchE): TA810 (2022).", smc: "accepted" }),
  rec("alpelisib", "alpelisib", 816, 2022, "With fulvestrant for PIK3CA-mutated HR-positive, HER2-negative advanced breast cancer after a CDK4/6 inhibitor", { smc: "accepted" }),
  unknown("capivasertib", "capivasertib", { note: "UK-discovered (ICR/AstraZeneca) AKT inhibitor licensed 2024; NICE initially issued negative draft guidance in 2024 then recommended it with fulvestrant in 2025 after a revised deal. TA number not verified." }),
  inDev("inavolisib", "inavolisib"),
  unknown("elacestrant", "elacestrant", { note: "Licensed 2023 for ESR1-mutated breast cancer; NICE appraisal 2024-25. Check NICE." }),
  inDev("camizestrant", "camizestrant"),
  inDev("imlunestrant", "imlunestrant"),
  inDev("vepdegestrant", "vepdegestrant"),
  notUk("gedatolisib", "gedatolisib"),
  rec("pertuzumab", "pertuzumab", 509, 2018, "With trastuzumab and docetaxel for HER2-positive metastatic breast cancer", { note: "Adjuvant use for node-positive early HER2-positive disease: TA569 (2019). Phesgo (subcutaneous with trastuzumab) is used where the TAs apply.", smc: "accepted" }),
  rec("trastuzumab", "trastuzumab", 34, 2002, "HER2-positive advanced breast cancer", { note: "Adjuvant early breast cancer: TA107 (2006). HER2-positive gastric cancer: TA208 (2010). Biosimilars and the subcutaneous form are used under the same guidance and have cut the NHS price substantially.", smc: "accepted" }),
  row("trastuzumab-biosimilars", "trastuzumab biosimilars", "not appraised", undefined, undefined, undefined, { note: "Biosimilars are not appraised separately: they fall under the originator's TAs (TA34, TA107, TA208). NHS England's biosimilar commissioning framework drove rapid switching from 2018.", commissioned: true }),
  notRec("lapatinib", "lapatinib", 257, 2012, "With an aromatase inhibitor for HER2-positive, HR-positive metastatic breast cancer", { note: "Also not recommended with capecitabine after trastuzumab (2010). Rarely used on the NHS." }),
  rec("neratinib", "neratinib", 612, 2019, "Extended adjuvant treatment of HR-positive, HER2-positive early breast cancer completed less than 1 year after trastuzumab", { smc: "accepted" }),
  rec("tucatinib", "tucatinib", 786, 2022, "With trastuzumab and capecitabine for HER2-positive breast cancer after 2 or more anti-HER2 treatments", { smc: "accepted" }),
  notUk("margetuximab", "margetuximab"),
  rec("eribulin", "eribulin", 423, 2016, "Locally advanced or metastatic breast cancer after 2 or more chemotherapy regimens", { smc: "accepted" }),
  rec("everolimus", "everolimus", 432, 2017, "Advanced renal cell carcinoma after previous treatment", { note: "Also HR-positive breast cancer with exemestane (TA421, 2016) and neuroendocrine tumours (TA449, 2017, with sunitinib).", smc: "accepted" }),
  rec("olaparib", "olaparib", 381, 2016, "Maintenance for relapsed platinum-sensitive BRCA-mutated ovarian cancer", { note: "First-line ovarian maintenance TA598 (2019, CDF); adjuvant BRCA-mutated HER2-negative early breast cancer TA886 (2023); BRCA-mutated mCRPC TA887 (2023).", smc: "accepted" }),
  cdf("niraparib", "niraparib", 528, 2018, "Maintenance for relapsed platinum-sensitive ovarian, fallopian tube or peritoneal cancer", { note: "First-line maintenance after platinum (PRIMA): TA673 (2021, CDF then routine). Both indications now routinely commissioned regardless of BRCA status.", smc: "accepted" }),
  cdf("rucaparib", "rucaparib", 611, 2019, "Maintenance for relapsed platinum-sensitive ovarian, fallopian tube or peritoneal cancer", { note: "Reappraised in 2023 after ARIEL3 overall survival data; check NICE for the current position.", smc: "accepted" }),
  unknown("talazoparib", "talazoparib", { note: "Licensed 2019 for germline BRCA HER2-negative breast cancer; NICE recommended it in 2024-25 with a commercial arrangement. TA number not verified. mCRPC with enzalutamide appraised separately." }),
  notRec("fulvestrant", "fulvestrant", 239, 2011, "Locally advanced or metastatic breast cancer as monotherapy", { note: "Now generic and widely used on the NHS as the partner drug in CDK4/6, alpelisib and capivasertib combinations, all of which are NICE recommended.", commissioned: true }),
  rec("letrozole", "letrozole and other aromatase inhibitors", 112, 2006, "Adjuvant hormonal therapy for early oestrogen-receptor-positive breast cancer", { note: "Anastrozole, letrozole and exemestane are all generic; NICE NG101 governs use. Anastrozole was licensed for breast cancer prevention in 2023 under the MHRA repurposing programme.", smc: "accepted" }),
  generic("exemestane", "exemestane", "Generic aromatase inhibitor covered by TA112 and NICE NG101; funded routinely."),
  generic("tamoxifen", "tamoxifen", "Generic; recommended in NICE NG101 for ER-positive breast cancer and for risk reduction in high-risk women (CG164). Funded routinely."),
  generic("goserelin", "goserelin / leuprolide (ovarian function suppression)", "Generic GnRH agonists; NG101 recommends ovarian function suppression for premenopausal ER-positive breast cancer. Funded routinely."),
  generic("megestrol-progestins", "progestins", "Generic progestins and the levonorgestrel IUD; funded routinely, no TA."),
  rec("pegylated-liposomal-doxorubicin", "pegylated liposomal doxorubicin", 91, 2005, "Advanced ovarian cancer after first-line platinum chemotherapy", { smc: "accepted" }),

  // ================= Lung =================
  cdf("osimertinib", "osimertinib", 654, 2020, "Untreated EGFR mutation-positive NSCLC (FLAURA)", { note: "Moved to routine commissioning. T790M after a first-generation TKI: TA416 (2016, CDF then routine). Adjuvant stage IB-IIIA (ADAURA): TA761 (2022). With chemotherapy (FLAURA2) and after chemoradiation (LAURA) appraised later.", smc: "accepted" }),
  rec("gefitinib", "gefitinib", 192, 2010, "Untreated EGFR mutation-positive NSCLC", { smc: "accepted" }),
  rec("erlotinib", "erlotinib", 258, 2012, "Untreated EGFR mutation-positive NSCLC", { note: "Second-line NSCLC: TA162 (2008).", smc: "accepted" }),
  rec("afatinib", "afatinib", 310, 2014, "Untreated EGFR mutation-positive NSCLC", { smc: "accepted" }),
  rec("dacomitinib", "dacomitinib", 595, 2019, "Untreated EGFR mutation-positive NSCLC", { smc: "accepted" }),
  rec("crizotinib", "crizotinib", 406, 2016, "Untreated ALK-positive advanced NSCLC", { note: "ROS1-positive NSCLC: TA529 (2018).", smc: "accepted" }),
  rec("ceritinib", "ceritinib", 500, 2018, "Untreated ALK-positive advanced NSCLC", { note: "After crizotinib: TA395 (2016).", smc: "accepted" }),
  rec("alectinib", "alectinib", 536, 2018, "Untreated ALK-positive advanced NSCLC", { note: "Adjuvant ALK-positive NSCLC (ALINA) appraised 2024-25; check NICE.", smc: "accepted" }),
  rec("brigatinib", "brigatinib", 670, 2021, "Untreated ALK-positive advanced NSCLC", { note: "After crizotinib: TA571 (2019).", smc: "accepted" }),
  cdf("lorlatinib", "lorlatinib", 628, 2020, "ALK-positive NSCLC after alectinib, ceritinib or crizotinib then another TKI", { note: "Untreated ALK-positive NSCLC (CROWN) appraised 2022 and recommended.", smc: "accepted" }),
  notUk("ensartinib", "ensartinib"),
  notUk("taletrectinib", "taletrectinib"),
  cdf("entrectinib", "entrectinib", 643, 2020, "NTRK fusion-positive solid tumours (histology-independent)", { note: "ROS1-positive NSCLC: TA644 (2020). The first tumour-agnostic appraisals in NICE's history.", smc: "accepted" }),
  cdf("larotrectinib", "larotrectinib", 630, 2020, "NTRK fusion-positive solid tumours (histology-independent)", { smc: "accepted" }),
  unknown("repotrectinib", "repotrectinib", { note: "EU-licensed 2025 for ROS1-positive NSCLC and NTRK tumours; UK licence and NICE position not yet researched." }),
  cdf("selpercatinib", "selpercatinib", 742, 2021, "RET fusion-positive advanced NSCLC after platinum chemotherapy", { note: "RET-altered thyroid cancer: TA711 (2021, CDF). Untreated NSCLC (LIBRETTO-431) appraised later.", smc: "accepted" }),
  unknown("pralsetinib", "pralsetinib", { note: "Licensed 2021 for RET fusion-positive NSCLC; NICE appraisal outcome not verified. Check NICE." }),
  rec("capmatinib-tepotinib", "tepotinib", 789, 2022, "Tepotinib for MET exon 14 skipping advanced NSCLC", { note: "Capmatinib has no UK licence; tepotinib is the NHS option.", smc: "accepted" }),
  cdf("sotorasib", "sotorasib", 781, 2022, "KRAS G12C-mutated advanced NSCLC after 1 or more systemic therapies", { note: "The CDF period ended after CodeBreaK 200 showed a modest PFS gain; NICE's 2024 reappraisal did not recommend routine commissioning at the price offered. Check the current position.", smc: "accepted" }),
  unknown("adagrasib", "adagrasib", { note: "EU-licensed 2024; UK licence and NICE appraisal for KRAS G12C NSCLC not yet researched." }),
  unknown("lazertinib", "lazertinib", { note: "MHRA-licensed 2025 with amivantamab (MARIPOSA); NICE appraisal in progress." }),
  notUk("sunvozertinib", "sunvozertinib"),
  notUk("zongertinib", "zongertinib"),
  notUk("sevabertinib", "sevabertinib"),
  rec("pemetrexed", "pemetrexed", 181, 2009, "First-line treatment of non-squamous NSCLC with cisplatin", { note: "Also malignant pleural mesothelioma (TA135, 2008) and maintenance (TA190, TA402). Generic since 2016.", smc: "accepted" }),
  notRec("ramucirumab", "ramucirumab", 378, 2016, "Advanced gastric or gastro-oesophageal junction cancer after chemotherapy", { note: "Also not recommended for NSCLC (TA403, 2016). HCC with high AFP appraised later. Not routinely available on the NHS." }),
  notUk("lurbinectedin", "lurbinectedin", "Licensed in the US and EU but no UK marketing authorisation confirmed; NICE position not yet researched."),
  rec("dabrafenib-trametinib", "dabrafenib with trametinib", 396, 2016, "Unresectable or metastatic BRAF V600-mutated melanoma", { note: "Adjuvant stage III melanoma: TA544 (2018). BRAF V600E NSCLC: TA898 (2023). Dabrafenib monotherapy: TA321 (2014). Paediatric BRAF-mutated glioma appraised 2024-25.", smc: "accepted" }),
  rec("vemurafenib", "vemurafenib", 269, 2012, "BRAF V600 mutation-positive unresectable or metastatic melanoma", { smc: "accepted" }),
  rec("cobimetinib", "cobimetinib", 414, 2016, "With vemurafenib for BRAF V600 mutation-positive melanoma", { smc: "accepted" }),
  rec("encorafenib", "encorafenib", 562, 2019, "With binimetinib for BRAF V600 mutation-positive melanoma", { note: "With cetuximab for BRAF V600E metastatic colorectal cancer after systemic therapy: TA668 (2020, CDF then routine).", smc: "accepted" }),
  rec("binimetinib", "binimetinib", 562, 2019, "With encorafenib for BRAF V600 mutation-positive melanoma", { smc: "accepted" }),

  // ================= Gastrointestinal and hepatobiliary =================
  rec("cetuximab", "cetuximab", 439, 2017, "With chemotherapy for untreated RAS wild-type metastatic colorectal cancer", { note: "Head and neck squamous cell carcinoma with radiotherapy: TA145 (2008). Earlier mCRC appraisal TA176 (2009).", smc: "accepted" }),
  rec("panitumumab", "panitumumab", 439, 2017, "With chemotherapy for untreated RAS wild-type metastatic colorectal cancer", { smc: "accepted" }),
  notRec("bevacizumab", "bevacizumab", 212, 2010, "Metastatic colorectal cancer with oxaliplatin or fluorouracil-based chemotherapy", { note: "NICE has never recommended bevacizumab for colorectal (TA118, TA212), ovarian (TA284, TA285), breast (TA214) or cervical cancer. It was widely funded by the pre-2016 Cancer Drugs Fund and later removed. Biosimilars (from 2020) have cut the price; some indications are funded via local policies. Bevacizumab with atezolizumab for HCC is funded under TA666.", commissioned: false }),
  notUk("bevacizumab-glioma", "bevacizumab for glioblastoma", "Not licensed for glioblastoma in the EU or UK (EMA refused 2009); not funded on the NHS except via trials or individual funding requests."),
  rec("regorafenib", "regorafenib", 555, 2019, "Advanced HCC after sorafenib", { note: "GIST after imatinib and sunitinib: TA488 (2017). Metastatic colorectal cancer was not recommended.", smc: "accepted" }),
  rec("trifluridine-tipiracil", "trifluridine-tipiracil", 405, 2016, "Metastatic colorectal cancer after standard therapies", { note: "Metastatic gastric or GOJ cancer after 2 or more therapies: TA669 (2021). With bevacizumab (SUNLIGHT) appraised 2024.", smc: "accepted" }),
  unknown("fruquintinib", "fruquintinib", { note: "Licensed 2024 for previously treated metastatic colorectal cancer; NICE recommended it in 2024. TA number not verified." }),
  rec("irinotecan", "irinotecan", 93, 2005, "Irinotecan, oxaliplatin and raltitrexed for advanced colorectal cancer", { note: "Generic; funded routinely. Liposomal irinotecan (Onivyde) with 5-FU for pancreatic cancer after gemcitabine was appraised in TA440 (2017).", smc: "accepted" }),
  rec("oxaliplatin", "oxaliplatin", 93, 2005, "Advanced colorectal cancer (FOLFOX-type regimens)", { note: "Also adjuvant stage III colon cancer (TA100, 2006). Generic; funded routinely.", smc: "accepted" }),
  generic("fluorouracil", "fluorouracil", "Generic backbone of colorectal, gastric, pancreatic, breast and head and neck regimens for 60 years; funded routinely. NHS England has required DPYD testing before fluoropyrimidines since 2020."),
  unknown("nalirifox", "NALIRIFOX (liposomal irinotecan regimen)", { note: "EU-licensed 2024 for first-line metastatic pancreatic cancer; NICE appraisal 2025. Check NICE." }),
  rec("gemcitabine", "gemcitabine", 25, 2001, "Advanced pancreatic cancer", { note: "One of the earliest cancer TAs. Generic; funded routinely across pancreatic, bladder, lung, ovarian and breast regimens.", smc: "accepted" }),
  rec("paclitaxel", "paclitaxel / nab-paclitaxel", 476, 2017, "Nab-paclitaxel with gemcitabine for untreated metastatic pancreatic cancer", { note: "Conventional paclitaxel is generic and funded routinely across breast, ovarian, lung and other cancers.", smc: "accepted" }),
  rec("sorafenib", "sorafenib", 474, 2017, "Advanced HCC (Child-Pugh A)", { note: "Originally rejected (TA189, 2010) and funded via the old CDF; recommended after a price cut. Also differentiated thyroid cancer (TA535, 2018).", smc: "accepted" }),
  rec("lenvatinib", "lenvatinib", 551, 2018, "Untreated advanced HCC", { note: "Progressive radioactive iodine-refractory differentiated thyroid cancer: TA535 (2018). With pembrolizumab for endometrial cancer (TA904, 2023) and RCC (TA858, 2023).", smc: "accepted" }),
  rec("cabozantinib", "cabozantinib", 463, 2017, "Advanced RCC after VEGF-targeted therapy", { note: "Untreated RCC: TA542 (2018). HCC after sorafenib appraised 2018. With nivolumab for untreated RCC: TA964 (2024).", smc: "accepted" }),
  cdf("pemigatinib", "pemigatinib", 722, 2021, "FGFR2 fusion or rearrangement-positive cholangiocarcinoma after 1 or more systemic therapies", { smc: "accepted" }),
  unknown("futibatinib", "futibatinib", { note: "EU-licensed 2023 for FGFR2-rearranged cholangiocarcinoma; UK licence and NICE position not yet researched." }),
  unknown("ivosidenib", "ivosidenib", { note: "Licensed 2023 for IDH1-mutated cholangiocarcinoma and with azacitidine for IDH1-mutated AML; NICE recommended the cholangiocarcinoma indication in 2024. TA number not verified." }),
  unknown("zolbetuximab", "zolbetuximab", { note: "MHRA-licensed 2024-25 for CLDN18.2-positive gastric cancer; NICE appraisal in progress." }),
  generic("docetaxel", "docetaxel", "Generic; TA101 (2006) recommended docetaxel for metastatic hormone-refractory prostate cancer and it is standard in breast, lung, gastric and head and neck regimens."),
  generic("cisplatin", "cisplatin"),
  generic("carboplatin", "carboplatin"),
  generic("etoposide", "etoposide"),
  generic("doxorubicin", "doxorubicin"),
  generic("cyclophosphamide", "cyclophosphamide"),
  generic("ifosfamide", "ifosfamide"),
  generic("methotrexate", "methotrexate"),
  generic("vincristine", "vincristine"),
  generic("vinblastine", "vinblastine"),
  generic("vinorelbine", "vinorelbine"),
  generic("bleomycin", "bleomycin"),
  generic("dactinomycin", "dactinomycin"),
  generic("melphalan", "melphalan", "Generic melphalan is standard for autologous transplant conditioning in myeloma and funded routinely. The Hepzato hepatic delivery system for uveal melanoma liver metastases is not UK-licensed."),
  generic("mitomycin", "mitomycin C", "Generic; intravesical mitomycin is standard after TURBT (NICE NG2). Jelmyto and Zusduri formulations are not UK-licensed."),
  rec("topotecan", "topotecan", 184, 2009, "Relapsed small-cell lung cancer", { note: "Also recurrent cervical cancer with cisplatin (TA183, 2009). Generic.", smc: "accepted" }),
  generic("hydroxyurea", "hydroxycarbamide", "Generic; first-line cytoreduction in polycythaemia vera and essential thrombocythaemia and used in CML and sickle cell disease. Funded routinely."),
  generic("cladribine", "cladribine", "Generic; standard first-line for hairy cell leukaemia. Funded routinely."),
  generic("mitotane", "mitotane", "Only licensed drug for adrenocortical carcinoma; funded routinely without a TA."),

  // ================= Genitourinary =================
  rec("abiraterone", "abiraterone", 259, 2012, "Metastatic castration-resistant prostate cancer after docetaxel", { note: "Before chemotherapy: TA387 (2016). Newly diagnosed high-risk hormone-sensitive disease (STAMPEDE/LATITUDE) was not recommended in TA721 (2021), but abiraterone went generic in 2022 and NHS England commissioned it for mHSPC via national policy.", smc: "accepted" }),
  rec("enzalutamide", "enzalutamide", 316, 2014, "Metastatic castration-resistant prostate cancer after docetaxel", { note: "Before chemotherapy: TA377 (2016). Hormone-sensitive metastatic disease: TA712 (2021). Non-metastatic CRPC: TA580 (2019).", smc: "accepted" }),
  rec("apalutamide", "apalutamide", 740, 2021, "With ADT for hormone-sensitive metastatic prostate cancer", { note: "High-risk non-metastatic CRPC: TA741 (2021).", smc: "accepted" }),
  rec("darolutamide", "darolutamide", 660, 2020, "High-risk non-metastatic hormone-relapsed prostate cancer", { note: "With docetaxel and ADT for metastatic hormone-sensitive disease (ARASENS): TA903 (2023).", smc: "accepted" }),
  rec("degarelix", "degarelix", 404, 2016, "Advanced hormone-dependent prostate cancer with spinal metastases", { smc: "accepted (restricted)" }),
  unknown("relugolix", "relugolix", { note: "Licensed 2022 for advanced hormone-sensitive prostate cancer; NICE position not yet researched." }),
  generic("leuprolide", "leuprorelin and GnRH agonists", "Generic and biosimilar GnRH agonists (leuprorelin, goserelin, triptorelin) are the backbone of NHS androgen deprivation; funded routinely without a TA."),
  generic("bicalutamide", "bicalutamide", "Generic; NICE NG131 covers use with GnRH agonists. Funded routinely."),
  rec("cabazitaxel", "cabazitaxel", 391, 2016, "Metastatic hormone-relapsed prostate cancer after docetaxel", { smc: "accepted" }),
  rec("radium-223", "radium-223 dichloride", 412, 2016, "Hormone-relapsed prostate cancer with bone metastases after docetaxel (or not suitable for it)", { smc: "accepted (restricted)" }),
  recNoTa("pluvicto", "lutetium-177 vipivotide tetraxetan", "PSMA-positive metastatic castration-resistant prostate cancer after ARPI and taxane (VISION)", { note: "Initially not recommended in draft guidance; NICE recommended it in 2025 after a revised commercial deal. Delivered at NHS nuclear medicine centres with PSMA PET selection." }),
  rec("sunitinib", "sunitinib", 169, 2009, "First-line advanced or metastatic RCC", { note: "GIST after imatinib: TA179 (2009). Pancreatic NETs: TA449 (2017). Generic since 2022.", smc: "accepted" }),
  rec("pazopanib", "pazopanib", 215, 2011, "First-line advanced RCC", { smc: "accepted" }),
  rec("axitinib", "axitinib", 333, 2015, "Advanced RCC after failure of prior systemic treatment", { note: "With pembrolizumab first-line: TA692 (2021).", smc: "accepted" }),
  rec("tivozanib", "tivozanib", 512, 2018, "First-line advanced RCC", { smc: "accepted" }),
  notRec("temsirolimus", "temsirolimus", 178, 2009, "First-line poor-prognosis advanced RCC", { note: "TA178 (bevacizumab, sorafenib, sunitinib and temsirolimus for RCC) recommended only sunitinib." }),
  unknown("belzutifan", "belzutifan", { note: "EU-licensed 2025 for VHL-associated tumours and previously treated RCC; UK licence and NICE position not yet researched." }),
  unknown("erdafitinib", "erdafitinib", { note: "EU-licensed 2024 for FGFR3-altered urothelial cancer after a PD-1/PD-L1 inhibitor; UK licence and NICE position not yet researched." }),
  notUk("tar-200", "TAR-200 (gemcitabine intravesical system)"),

  // ================= Haematology: myeloma =================
  rec("bortezomib", "bortezomib", 129, 2007, "Multiple myeloma at first relapse", { note: "Untreated myeloma with thalidomide: TA228 (2011). Induction before transplant: TA311 (2014). Mantle cell lymphoma: TA370. Generic since 2019. TA129 introduced the first NHS response-based rebate scheme.", smc: "accepted" }),
  rec("lenalidomide", "lenalidomide", 171, 2009, "Multiple myeloma after 2 or more prior therapies", { note: "Also del(5q) MDS (TA322, 2014), untreated myeloma with dexamethasone (TA587, 2019), maintenance after transplant (TA680, 2021), and combinations with daratumumab and ixazomib. Generic since 2023, which has unlocked many combinations.", smc: "accepted" }),
  rec("pomalidomide", "pomalidomide", 427, 2017, "Multiple myeloma after 3 or more treatments including lenalidomide and bortezomib", { note: "Originally rejected in 2015 and funded via the old CDF.", smc: "accepted" }),
  rec("thalidomide", "thalidomide", 228, 2011, "Untreated multiple myeloma with an alkylating agent and a corticosteroid (transplant-ineligible)", { smc: "accepted" }),
  rec("carfilzomib", "carfilzomib", 457, 2017, "With dexamethasone for myeloma after 1 prior therapy", { note: "With lenalidomide and dexamethasone (KRd): TA695 (2021).", smc: "accepted" }),
  cdf("ixazomib", "ixazomib", 505, 2018, "With lenalidomide and dexamethasone for myeloma after 2 or 3 lines", { note: "Reappraised in TA870 (2023) and recommended for routine commissioning.", smc: "accepted" }),
  cdf("daratumumab", "daratumumab", 573, 2019, "With bortezomib and dexamethasone for myeloma after 1 prior therapy (CASTOR)", { note: "Monotherapy after 3 lines: TA510 (2018, CDF). D-VTd induction before transplant: TA783 (2022). DVd moved to routine: TA763 (2022). D-Rd for untreated transplant-ineligible myeloma recommended 2023-24. Subcutaneous form used throughout.", smc: "accepted" }),
  cdf("isatuximab", "isatuximab", 658, 2020, "With pomalidomide and dexamethasone for myeloma after 3 or more treatments", { note: "With carfilzomib and dexamethasone (IKEMA) appraised 2023.", smc: "accepted" }),
  unknown("elotuzumab", "elotuzumab", { note: "Licensed 2016; NICE appraisal terminated or not recommended and elotuzumab is not routinely used on the NHS. Check NICE." }),
  unknown("selinexor", "selinexor", { note: "Licensed 2021; NICE appraisal for myeloma not verified. Check NICE." }),

  // ================= Haematology: lymphoma and CLL =================
  rec("rituximab", "rituximab", 65, 2003, "Aggressive (diffuse large B-cell) non-Hodgkin lymphoma with CHOP", { note: "Follicular lymphoma (TA110, TA137, TA226), CLL (TA174, TA193). Biosimilars since 2017 dominate NHS use. Subcutaneous form available.", smc: "accepted" }),
  rec("obinutuzumab", "obinutuzumab", 343, 2015, "With chlorambucil for untreated CLL unsuitable for fludarabine-based therapy", { note: "Rituximab-refractory follicular lymphoma with bendamustine: TA472 (2017). Untreated advanced follicular lymphoma: TA513 (2018). With venetoclax for CLL: TA663 (2020).", smc: "accepted" }),
  rec("ibrutinib", "ibrutinib", 429, 2017, "CLL after 1 prior therapy, or untreated CLL with 17p deletion or TP53 mutation", { note: "Waldenström macroglobulinaemia: TA491 (2017). Relapsed or refractory mantle cell lymphoma: TA502 (2018). Untreated CLL without high-risk features recommended 2021.", smc: "accepted" }),
  rec("acalabrutinib", "acalabrutinib", 689, 2021, "Untreated CLL (with 17p/TP53 or unsuitable for FCR/BR) and CLL after 1 prior therapy", { note: "Untreated mantle cell lymphoma with bendamustine-rituximab (ECHO) appraised 2025.", smc: "accepted" }),
  rec("zanubrutinib", "zanubrutinib", 931, 2023, "Untreated CLL (with 17p/TP53 or unsuitable for FCR/BR) and CLL after 1 prior therapy", { note: "Waldenström macroglobulinaemia: TA833 (2022). Relapsed or refractory mantle cell lymphoma and follicular lymphoma with obinutuzumab appraised 2024-25.", smc: "accepted" }),
  unknown("pirtobrutinib", "pirtobrutinib", { note: "Licensed 2023 for mantle cell lymphoma after a BTK inhibitor; NICE recommended it via the CDF in 2024. TA number not verified." }),
  rec("venetoclax", "venetoclax", 663, 2020, "With obinutuzumab for untreated CLL", { note: "Monotherapy for 17p/TP53 CLL: TA487 (2017, CDF). With rituximab for relapsed CLL: TA561 (2019). With azacitidine or low-dose cytarabine for AML unsuitable for intensive chemotherapy: TA765 (2022). Fixed-duration venetoclax-ibrutinib appraised 2024-25.", smc: "accepted" }),
  rec("idelalisib", "idelalisib", 359, 2015, "With rituximab for CLL after 1 prior therapy or untreated with 17p/TP53", { note: "Rarely used since BTK and BCL2 inhibitors arrived.", smc: "accepted" }),
  notUk("duvelisib", "duvelisib", "EU marketing authorisation application withdrawn; no UK licence."),
  rec("bendamustine", "bendamustine", 216, 2011, "First-line CLL (Binet B/C) when fludarabine combination is not appropriate", { note: "Generic; also used in lymphoma regimens (BR) and as the partner in TA472 and TA649.", smc: "accepted" }),
  unknown("tafasitamab", "tafasitamab", { note: "Licensed 2021 with lenalidomide for DLBCL; NICE appraisal terminated after the company did not submit. Not routinely funded. Check NICE." }),
  unknown("mogamulizumab", "mogamulizumab", { note: "TA577 (2019) appraised mogamulizumab for mycosis fungoides and Sézary syndrome; outcome not verified here. Check NICE." }),
  notUk("belinostat", "belinostat"),
  notUk("pralatrexate", "pralatrexate"),
  notUk("romidepsin", "romidepsin", "EU licence for PTCL withdrawn; no UK licence."),
  unknown("tagraxofusp", "tagraxofusp", { note: "EU-licensed 2021 for BPDCN; UK licence and NICE position not yet researched." }),
  unknown("belumosudil", "belumosudil", { note: "Chronic GVHD after 2 prior lines; MHRA-licensed 2023. NICE position not yet researched." }),

  // ================= Haematology: leukaemia and myeloid =================
  rec("imatinib", "imatinib", 70, 2003, "Chronic phase CML (first-line)", { note: "Unresectable or metastatic KIT-positive GIST: TA86 (2004). Adjuvant GIST: TA326 (2014). Generic since 2017; now costs the NHS a small fraction of the original price.", smc: "accepted" }),
  rec("dasatinib", "dasatinib", 426, 2016, "CML resistant or intolerant to imatinib", { note: "Untreated chronic phase CML: TA425 (2016). Generic since 2021.", smc: "accepted" }),
  rec("nilotinib", "nilotinib", 251, 2012, "Untreated chronic phase CML (dasatinib, nilotinib and standard-dose imatinib)", { note: "After imatinib: TA241 (2012) and TA426 (2016).", smc: "accepted" }),
  rec("bosutinib", "bosutinib", 401, 2016, "CML after prior TKI when imatinib, nilotinib and dasatinib are not appropriate", { note: "Untreated CML appraised 2018; check NICE.", smc: "accepted" }),
  rec("ponatinib", "ponatinib", 451, 2017, "CML or Ph-positive ALL resistant to dasatinib or nilotinib, or with T315I", { smc: "accepted" }),
  rec("asciminib", "asciminib", 813, 2022, "Chronic phase CML after 2 or more TKIs", { note: "Untreated CML (ASC4FIRST) appraised 2025-26.", smc: "accepted" }),
  rec("asparaginase", "pegaspargase", 408, 2016, "Acute lymphoblastic leukaemia in children, young people and adults", { note: "Erwinia asparaginase is used for hypersensitivity; recombinant Rylaze is not UK-licensed.", smc: "accepted" }),
  rec("azacitidine", "azacitidine", 218, 2011, "Intermediate-2 or high-risk MDS, CMML, and AML with 20-30% blasts not eligible for transplant", { note: "AML with more than 30% blasts (TA399, 2016) was not recommended. Oral azacitidine (Onureg) for AML maintenance appraised 2021-22. Generic injectable since 2020.", smc: "accepted" }),
  unknown("decitabine-cedazuridine", "decitabine-cedazuridine", { note: "EU-licensed 2023 for AML; UK licence and NICE position not yet researched." }),
  rec("midostaurin", "midostaurin", 523, 2018, "Untreated FLT3 mutation-positive AML with standard chemotherapy", { smc: "accepted" }),
  rec("gilteritinib", "gilteritinib", 642, 2020, "Relapsed or refractory FLT3 mutation-positive AML", { smc: "accepted" }),
  unknown("quizartinib", "quizartinib", { note: "Licensed 2024 for untreated FLT3-ITD AML with chemotherapy (QuANTUM-First); NICE recommended it in 2024. TA number not verified." }),
  rec("glasdegib", "glasdegib", 647, 2020, "With low-dose cytarabine for untreated AML unsuitable for intensive chemotherapy", { smc: "accepted" }),
  notUk("enasidenib", "enasidenib", "EU marketing authorisation application withdrawn 2019; no UK licence."),
  notUk("olutasidenib", "olutasidenib"),
  notUk("revumenib", "revumenib"),
  notUk("ziftomenib", "ziftomenib"),
  notUk("sonrotoclax", "sonrotoclax"),
  rec("cpx-351", "CPX-351 (liposomal daunorubicin-cytarabine)", 552, 2018, "Untreated therapy-related AML or AML with myelodysplasia-related changes", { smc: "accepted" }),
  rec("arsenic-trioxide", "arsenic trioxide", 526, 2018, "Acute promyelocytic leukaemia (untreated low-to-intermediate risk with ATRA, and relapsed)", { smc: "accepted" }),
  generic("tretinoin-atra", "tretinoin (ATRA)", "Standard for APL with arsenic trioxide (TA526) or chemotherapy; funded routinely without its own TA."),
  rec("ruxolitinib", "ruxolitinib", 386, 2016, "Disease-related splenomegaly or symptoms in myelofibrosis (intermediate-2 or high risk)", { note: "Polycythaemia vera resistant or intolerant to hydroxycarbamide appraised 2023. Steroid-refractory acute and chronic GVHD appraised 2023-24.", smc: "accepted" }),
  rec("fedratinib", "fedratinib", 756, 2021, "Myelofibrosis-related splenomegaly or symptoms after ruxolitinib", { smc: "accepted" }),
  unknown("momelotinib", "momelotinib", { note: "Licensed 2024 for myelofibrosis with anaemia; NICE recommended it in 2024. TA number not verified." }),
  notUk("pacritinib", "pacritinib"),
  unknown("luspatercept", "luspatercept", { note: "Licensed 2020 for transfusion-dependent anaemia in lower-risk MDS with ring sideroblasts after ESA failure; NICE appraisals 2022-25 (including COMMANDS first-line use). Check NICE." }),
  unknown("imetelstat", "imetelstat", { note: "EU-licensed 2025 for lower-risk MDS anaemia; UK licence and NICE position not yet researched." }),
  unknown("ropeginterferon-alfa-2b", "ropeginterferon alfa-2b", { note: "Licensed 2019 for polycythaemia vera without symptomatic splenomegaly; NICE appraisal outcome not verified. Check NICE." }),
  notUk("rusfertide", "rusfertide"),
  unknown("treosulfan", "treosulfan", { note: "EU-licensed 2019 as conditioning before allogeneic transplant; used in UK paediatric protocols. NICE position not yet researched." }),

  // ================= Sarcoma, bone, neuroendocrine, thyroid, CNS, rare =================
  rec("trabectedin", "trabectedin", 185, 2010, "Advanced soft tissue sarcoma after anthracyclines and ifosfamide", { smc: "accepted" }),
  rec("mifamurtide", "mifamurtide", 235, 2011, "High-grade resectable non-metastatic osteosarcoma after macroscopically complete surgical resection (age 2-30)", { smc: "accepted" }),
  unknown("ripretinib", "ripretinib", { note: "Licensed 2021 for GIST after 3 or more TKIs; NICE appraisal outcome not verified. Check NICE." }),
  unknown("avapritinib", "avapritinib", { note: "Licensed 2020 for PDGFRA D842V-mutant GIST and advanced systemic mastocytosis; NICE positions not yet researched." }),
  notUk("nirogacestat", "nirogacestat", "EU-licensed 2025 for desmoid tumours; UK licence and NICE position not yet researched."),
  notUk("pexidartinib", "pexidartinib", "EU marketing authorisation application withdrawn 2020; no UK licence."),
  notUk("vimseltinib", "vimseltinib"),
  rec("dinutuximab", "dinutuximab beta", 538, 2018, "High-risk neuroblastoma after induction, high-dose chemotherapy and stem cell transplant, or relapsed/refractory", { note: "Dinutuximab (Unituxin) is US-only; dinutuximab beta (Qarziba) is the UK product.", smc: "accepted" }),
  notUk("naxitamab", "naxitamab"),
  notUk("eflornithine", "eflornithine (DFMO)"),
  rec("lutathera", "lutetium-177 dotatate", 539, 2018, "Unresectable or metastatic, progressive, well-differentiated somatostatin receptor-positive GEP-NETs", { smc: "accepted" }),
  generic("octreotide-lanreotide", "somatostatin analogues", "Octreotide and lanreotide are long-established for functional NET symptoms and tumour control (CLARINET, PROMID); funded routinely without a TA."),
  unknown("vandetanib", "vandetanib", { note: "TA550 (2018) appraised vandetanib for medullary thyroid cancer; outcome not verified here. Check NICE." }),
  generic("radioactive-iodine", "radioactive iodine (I-131)", "Standard of care for differentiated thyroid cancer for 80 years; delivered through NHS nuclear medicine departments (BTA guideline). No TA."),
  notRec("vismodegib", "vismodegib", 489, 2017, "Symptomatic metastatic or locally advanced basal cell carcinoma unsuitable for surgery or radiotherapy", { note: "Was funded under the old CDF before 2016; not routinely available since. Individual funding requests possible." }),
  unknown("sonidegib", "sonidegib", { note: "Licensed 2015 for locally advanced BCC; NICE appraisal outcome not verified. Check NICE." }),
  recNoTa("vorasidenib", "vorasidenib", "IDH-mutant grade 2 astrocytoma or oligodendroglioma after surgery (INDIGO)", { note: "MHRA-licensed 2025; NICE recommended it in 2025-26 after a commercial deal." }),
  notUk("dordaviprone", "dordaviprone"),
  unknown("tovorafenib", "tovorafenib", { note: "EU-licensed 2025 for BRAF-altered paediatric low-grade glioma; UK licence and NICE position not yet researched." }),
  row("optune", "Optune (tumour treating fields)", "not appraised", undefined, undefined, undefined, { note: "NICE published a Medtech innovation briefing (MIB) rather than a TA; tumour treating fields are not routinely commissioned by NHS England for glioblastoma. Available privately or via trials.", commissioned: false }),
  row("aminolevulinic-acid-gleolan", "5-aminolevulinic acid (Gliolan)", "recommended", undefined, undefined, "Fluorescence-guided resection of high-grade glioma", { note: "Recommended in NICE guideline NG99 (brain tumours, 2018) rather than a TA; routinely used in NHS neurosurgical centres.", commissioned: true }),
  unknown("cetuximab-sarotalocan", "cetuximab sarotalocan", { note: "Japan-only licence (Akalux); not available in the UK." }),
  unknown("relacorilant", "relacorilant", { note: "US licence 2025-26 for platinum-resistant ovarian cancer; no UK licence known." }),
  notUk("avutometinib-defactinib", "avutometinib with defactinib"),
  generic("aldesleukin", "aldesleukin (high-dose IL-2)", "Licensed for metastatic RCC since 1989; largely superseded and rarely used on the NHS. No TA."),
  unknown("sodium-thiosulfate", "sodium thiosulfate (Pedmark)", { note: "EU-licensed 2023 to prevent cisplatin ototoxicity in children; NICE appraised it 2023-24. Check NICE." }),

  // ================= Vaccines, diagnostics and imaging agents =================
  row("gardasil-9", "Gardasil 9 (HPV vaccine)", "not appraised", undefined, undefined, "National HPV vaccination programme", { note: "Not a TA: HPV vaccination is a national immunisation programme on JCVI advice. Gardasil 9 has been the programme vaccine since 2022, offered to all children aged 12-13 (single dose since 2023) and to men who have sex with men up to 45 via sexual health clinics.", commissioned: true }),
  row("ga68-psma-11", "gallium-68 PSMA-11 PET", "not appraised", undefined, undefined, "PSMA PET-CT for prostate cancer staging and recurrence", { note: "Radiopharmaceuticals are not appraised as TAs. PSMA PET-CT is commissioned by NHS England (clinical commissioning policy) for biochemical recurrence and high-risk staging, and is required to select patients for Pluvicto. Locametz and Illuccix are MHRA-licensed kits.", commissioned: true }),
  row("ga68-dotatate", "gallium-68 DOTATATE PET", "not appraised", undefined, undefined, "Somatostatin receptor PET for neuroendocrine tumours", { note: "Available at NHS PET centres and required before Lutathera (TA539). No TA.", commissioned: true }),
  notUk("pylarify", "piflufolastat F-18", "US product; UK PSMA PET uses gallium-68 PSMA-11 or F-18 PSMA-1007 supplied by NHS radiopharmacies."),
  notUk("flotufolastat", "flotufolastat F-18"),
  notUk("fluciclovine-f18", "fluciclovine F-18", "EU-licensed but not commissioned for routine NHS use; PSMA PET is preferred."),
  notUk("fluoroestradiol-f18", "fluoroestradiol F-18"),
  row("tilmanocept-tc99m", "technetium-99m tilmanocept", "not appraised", undefined, undefined, undefined, { note: "EU-licensed sentinel node tracer; NHS sentinel node biopsy mostly uses Tc-99m nanocolloid. No TA.", commissioned: false }),
  notUk("pafolacianine", "pafolacianine"),
  notUk("pegulicianine", "pegulicianine"),
  row("foundationone-cdx", "FoundationOne CDx", "not appraised", undefined, undefined, undefined, { note: "NHS England does not commission commercial CGP panels routinely; tumour profiling is delivered by the seven NHS Genomic Laboratory Hubs under the National Genomic Test Directory, including whole genome sequencing for some cancers. Commercial panels may be obtained privately.", commissioned: false }),
  notUk("shield", "Shield blood test", "US-only blood-based colorectal screening test; NHS bowel screening uses the FIT stool test."),
  row("artera-ai-breast", "ArteraAI Breast", "not appraised", undefined, undefined, undefined, { note: "Not available on the NHS; NICE has assessed AI prognostic tools via early value assessments, not TAs.", commissioned: false }),
  row("artera-ai-prostate", "ArteraAI Prostate", "not appraised", undefined, undefined, undefined, { note: "Not available on the NHS; NICE early value assessment route applies to digital prognostic tools.", commissioned: false }),
  notUk("daraxonrasib", "daraxonrasib"),
  notUk("zidesamtinib", "zidesamtinib"),
  notUk("pyrotinib", "pyrotinib"),
];

export const coverageUk: Record<string, UkCoverage> = Object.fromEntries(list.map((c) => [c.drugId, c]));

/** Plain-English explainer of how NHS cancer care and drug funding work across the four nations. */
export const NHS_SYSTEM: Array<{ id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> }> = [
  {
    id: "pathway",
    title: "How you get into cancer care: GP, urgent referral, and the waiting-time standards",
    plain: "Almost everyone starts with their GP. If the GP suspects cancer they make an urgent referral and you should hear within two weeks and be told whether you have cancer within 28 days. If you do, treatment should start within 62 days of the referral.",
    detail: "NICE guideline NG12 sets the symptom thresholds at which a GP must refer on the urgent suspected cancer pathway (roughly a 3% risk of cancer). In England the old 'two-week wait' target was replaced in October 2023 by three standards: the 28-day Faster Diagnosis Standard (told you have or do not have cancer within 28 days of referral or screening; target 75%, rising to 80% by March 2026), the 31-day standard (treatment within a month of the decision to treat; 96%), and the 62-day standard (first treatment within 62 days of urgent referral, screening or consultant upgrade; 85%). Performance is published monthly and many trusts miss the 62-day target, so ask your cancer nurse specialist where you are on the pathway. Scotland, Wales and Northern Ireland publish their own 31- and 62-day figures. Emergency presentations (via A&E) account for roughly a fifth of diagnoses and have worse outcomes.",
    links: [
      { label: "NICE NG12: suspected cancer recognition and referral", url: "https://www.nice.org.uk/guidance/ng12" },
      { label: "NHS England: Faster Diagnosis Standard", url: "https://www.england.nhs.uk/cancer/faster-diagnosis/" },
      { label: "Cancer waiting times statistics", url: "https://www.england.nhs.uk/statistics/statistical-work-areas/cancer-waiting-times/" },
      { label: "NHS: cancer overview and referral", url: "https://www.nhs.uk/conditions/cancer/" },
    ],
  },
  {
    id: "mdt",
    title: "Who decides your treatment: the multidisciplinary team, cancer alliances and specialist centres",
    plain: "Your case is discussed by a team of specialists (the MDT) who agree a recommended plan before it is put to you. Common cancers are treated locally; rare cancers, complex surgery and cell therapy are concentrated in a small number of specialist centres.",
    detail: "Every NHS cancer patient should have their diagnosis and plan reviewed at a weekly multidisciplinary team meeting (surgeon, oncologist, radiologist, pathologist, clinical nurse specialist and others) and be assigned a named key worker, usually a clinical nurse specialist. England's Cancer Alliances (around 20) coordinate services across regions and run rapid diagnostic centres and the lung screening programme. Care is tiered: local trusts deliver most chemotherapy and radiotherapy; tertiary centres such as The Royal Marsden, The Christie, UCLH, Guy's, Leeds, Birmingham, Glasgow's Beatson, Cardiff's Velindre and Belfast City deliver specialised surgery, sarcoma, neuro-oncology, teenage and young adult and paediatric oncology. Ask your MDT whether your cancer type has a nationally designated centre; you can be referred anywhere in the NHS.",
    links: [
      { label: "NHS England: Cancer Alliances", url: "https://www.england.nhs.uk/cancer/cancer-alliances-improving-care-locally/" },
      { label: "Macmillan: your multidisciplinary team", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/preparing-for-treatment/your-multidisciplinary-team" },
      { label: "NHS England: national cancer programme", url: "https://www.england.nhs.uk/cancer/" },
    ],
  },
  {
    id: "nice",
    title: "NICE technology appraisals: how a drug gets funded, and the cost-per-QALY threshold",
    plain: "A new cancer drug is only routinely available on the NHS in England, Wales and Northern Ireland once NICE has appraised it and judged that its benefit is worth its price. If NICE says yes, the NHS must fund it within three months. Almost all recent yes decisions depend on a confidential discount.",
    detail: "NICE runs a single technology appraisal (TA) for each new medicine and indication, usually in parallel with licensing so guidance lands within a few months of MHRA approval. The company submits a cost-effectiveness model; an independent evidence review group critiques it; a committee decides. NICE normally accepts treatments below £20,000 per quality-adjusted life year (QALY) and needs strong justification between £20,000 and £30,000. Until 2022 an 'end-of-life' rule let drugs for people with under 24 months to live and a gain of 3+ months be accepted up to about £50,000 per QALY. The 2022 methods update replaced it with a severity modifier that weights QALYs by 1.2 or 1.7 for conditions with large absolute and proportional health loss; this catches most advanced cancers but not all, which is why some drugs for earlier-stage or HER2-low disease have been rejected. Outcomes are: recommended; recommended with optimisation (a narrower population, a stopping rule, or a Patient Access Scheme discount); recommended for the Cancer Drugs Fund; or not recommended. NHS England must fund positive TAs within 90 days. Wales and Northern Ireland adopt NICE TAs; Scotland uses the SMC instead.",
    links: [
      { label: "NICE technology appraisal guidance list", url: "https://www.nice.org.uk/guidance/published?ngt=Technology%20appraisal%20guidance" },
      { label: "NICE health technology evaluations manual (PMG36)", url: "https://www.nice.org.uk/process/pmg36" },
      { label: "NICE: technology appraisal guidance explained", url: "https://www.nice.org.uk/about/what-we-do/our-programmes/nice-guidance/nice-technology-appraisal-guidance" },
    ],
  },
  {
    id: "cdf",
    title: "The Cancer Drugs Fund and managed access",
    plain: "When NICE thinks a cancer drug is promising but the evidence is not yet good enough to say yes, it can be funded from the Cancer Drugs Fund for about two years while more data are collected, then re-decided. Patients get it straight away; the company carries the financial risk.",
    detail: "The original CDF (2010-2016) paid for drugs NICE had rejected and overspent badly. Since July 2016 it has been a managed access fund run jointly by NICE and NHS England with a fixed budget (£340 million a year). A drug enters the CDF when NICE judges it has plausible potential to be cost-effective but material uncertainty; a managed access agreement sets the data to be collected (often from SACT, the national chemotherapy dataset, plus the ongoing trial) and a confidential price. Interim funding from the CDF starts from the point of positive draft guidance, so CDF drugs are often available in England before anywhere else in Europe. At the end of the period NICE reappraises and either moves the drug to routine commissioning or, occasionally, withdraws it for new patients (existing patients continue). Well over a hundred drug-indication pairs have passed through, including CAR-T therapies, osimertinib, durvalumab and pembrolizumab combinations. The live CDF list is published by NHS England and updated monthly.",
    links: [
      { label: "NHS England: Cancer Drugs Fund", url: "https://www.england.nhs.uk/cancer/cdf/" },
      { label: "Current CDF list (updated monthly)", url: CDF_LIST_URL },
      { label: "NICE: managed access", url: "https://www.nice.org.uk/about/what-we-do/our-programmes/managed-access" },
    ],
  },
  {
    id: "imf",
    title: "The Innovative Medicines Fund",
    plain: "The Innovative Medicines Fund does for non-cancer medicines what the Cancer Drugs Fund does for cancer: it pays for promising treatments while evidence is collected. Some supportive treatments and rare-disease therapies relevant to cancer patients come through it.",
    detail: "Launched in June 2022 with £340 million a year, matching the CDF, the IMF extends managed access to any medicine NICE cannot yet recommend routinely, including gene therapies and treatments for rare inherited cancer syndromes or complications such as graft-versus-host disease. Together the two funds give NHS England a £680 million managed access envelope. The IMF uses the same interim funding mechanism from positive draft guidance and the same data-collection agreements. Patient charities have pressed for the two funds to be merged and for the managed access period to be more flexible.",
    links: [
      { label: "NHS England: Innovative Medicines Fund", url: "https://www.england.nhs.uk/medicines-2/innovative-medicines-fund/" },
    ],
  },
  {
    id: "specialised",
    title: "Specialised commissioning: CAR-T centres, proton beam therapy, stereotactic radiosurgery",
    plain: "The most complex treatments are paid for and planned nationally rather than locally, and delivered at a handful of accredited hospitals. If you need CAR-T, protons or radiosurgery you may travel, but the NHS funds it.",
    detail: "NHS England directly commissions around 150 specialised services. CAR-T cell therapy is delivered at JACIE-accredited centres (roughly 15 adult and 3 paediatric, including UCLH, King's, The Christie, Manchester Royal Infirmary, Birmingham, Bristol, Leeds, Newcastle, Glasgow, Cardiff and Great Ormond Street) after a national CAR-T clinical panel confirms eligibility; the drug cost sits with NICE-approved TAs and the CDF. High-energy proton beam therapy opened at The Christie (Manchester, 2018) and UCLH (London, 2021); indications are mainly paediatric and young adult tumours, base-of-skull chordoma and selected head and neck and spinal tumours, decided by a national proton panel, with overseas referral no longer routine. Stereotactic radiosurgery and stereotactic ablative radiotherapy (SABR) are commissioned at designated centres for brain metastases, vestibular schwannoma, early lung cancer and oligometastatic disease under national clinical commissioning policies. Blood and marrow transplantation, sarcoma surgery, hepatobiliary and oesophago-gastric surgery, teenage and young adult cancer and paediatric oncology are also nationally commissioned.",
    links: [
      { label: "NHS England: specialised services", url: "https://www.england.nhs.uk/commissioning/spec-services/" },
      { label: "NHS England: CAR-T therapy", url: "https://www.england.nhs.uk/cancer/cdf/car-t-therapy/" },
      { label: "NHS England: proton beam therapy", url: "https://www.england.nhs.uk/commissioning/spec-services/highly-spec-services/pbt/" },
      { label: "NHS England clinical commissioning policies", url: "https://www.england.nhs.uk/publication/?filter-category=clinical-commissioning-policies" },
    ],
  },
  {
    id: "scotland",
    title: "Scotland: the SMC, the New Medicines Fund and PACS",
    plain: "Scotland does not use NICE for new medicines. The Scottish Medicines Consortium decides, usually within months of licensing, and a New Medicines Fund covers the cost of end-of-life and rare-disease drugs. If a drug has been turned down, your consultant can still ask for it for you through PACS Tier 2.",
    detail: "The Scottish Medicines Consortium (SMC) appraises every new medicine for NHS Scotland; its decisions are 'accepted', 'accepted for restricted use' or 'not recommended', and health boards must make accepted medicines available. Since 2014 the Patient and Clinician Engagement (PACE) process gives extra weight to end-of-life and orphan medicines, and an ultra-orphan pathway allows three years of data collection. The New Medicines Fund (funded from pharmaceutical rebates) reimburses health boards for these medicines. Where SMC has not accepted a medicine, a clinician can apply under the Peer Approved Clinical System: PACS Tier 1 for ultra-orphan drugs and PACS Tier 2 (which replaced Individual Patient Treatment Requests in 2018) for any drug the SMC has rejected or not appraised. Scottish cancer waiting times use a 31-day and 62-day standard; the three regional cancer networks are NCA, SCAN and WoSCAN.",
    links: [
      { label: "Scottish Medicines Consortium: medicines advice", url: "https://scottishmedicines.org.uk/medicines-advice/" },
      { label: "Scottish Government: NHS medicines policy", url: "https://www.gov.scot/policies/nhs-medicines/" },
      { label: "PACS Tier 2 guidance", url: "https://www.gov.scot/publications/peer-approved-clinical-system-tier-two/" },
    ],
  },
  {
    id: "wales-ni",
    title: "Wales and Northern Ireland: AWTTC, One Wales and the New Treatment Fund; NI adoption of NICE",
    plain: "Wales and Northern Ireland follow NICE decisions, with their own rules on top. Wales has a fund that guarantees access within two months of a yes, and a One Wales route for medicines NICE has not looked at. Northern Ireland adopts NICE guidance a little later and runs its own individual funding requests.",
    detail: "In Wales, NICE TAs apply and the New Treatment Fund (since 2017) requires health boards to make newly recommended medicines available within 60 days. The All Wales Therapeutics and Toxicology Centre (AWTTC) supports the All Wales Medicines Strategy Group (AWMSG), which appraises medicines NICE does not intend to cover and runs the One Wales process for a consistent national position on unlicensed or non-appraised medicines, replacing seven different individual patient funding request policies. Velindre Cancer Centre (Cardiff) and the South West Wales and North Wales cancer centres deliver care, with Welsh patients travelling to English centres for CAR-T and protons. In Northern Ireland the Department of Health endorses NICE TAs (usually within weeks) and the Health and Social Care system funds them; regional cancer services are centred on Belfast City Hospital's Cancer Centre and the North West Cancer Centre at Altnagelvin, and an Individual Funding Request process covers non-approved treatments. NI cancer waiting-time performance has been the weakest in the UK.",
    links: [
      { label: "All Wales Therapeutics and Toxicology Centre", url: "https://awttc.nhs.wales/" },
      { label: "Welsh Government: New Treatment Fund", url: "https://www.gov.wales/new-treatment-fund" },
      { label: "Department of Health NI: NICE guidance endorsement", url: "https://www.health-ni.gov.uk/topics/safety-and-quality-standards/nice-guidance" },
    ],
  },
  {
    id: "screening",
    title: "Screening programmes: breast, bowel, cervical and lung",
    plain: "The NHS invites healthy people for four cancer screens: mammograms for women 50 to 71, a stool test for bowel cancer from 50, cervical screening for women 25 to 64, and low-dose CT lung checks for current and former smokers aged 55 to 74. You do not need a GP referral; invitations are automatic if you are registered with a GP.",
    detail: "Breast screening: three-yearly mammography for women 50-70 (invited up to 71; older women can self-refer); AI-assisted reading is being trialled (EDITH). Bowel screening: the faecal immunochemical test (FIT) every two years, extended in England from 60-74 down to 50-74 by 2025; a positive FIT leads to colonoscopy. Scotland has offered FIT from 50 since 2017; Wales and Northern Ireland are lowering to 50. Cervical screening: primary HPV testing, every three years at 25-49 and every five years at 50-64; England moved to five-yearly for HPV-negative women in July 2025 (Scotland and Wales already had), and HPV self-sampling is being introduced for under-screened women. Lung: the Targeted Lung Health Check programme (low-dose CT for people aged 55-74 who smoke or used to, identified via GP records) is being rolled out across England as the national NHS Lung Cancer Screening Programme, with full coverage planned by 2029; it has raised the share of lung cancers found at stage I-II to roughly three-quarters in screened areas. There is no national prostate screening; the UK National Screening Committee is reviewing PSA-based and risk-stratified screening (TRANSFORM trial) and has recommended a targeted programme for men with BRCA variants.",
    links: [
      { label: "NHS screening overview", url: "https://www.nhs.uk/conditions/nhs-screening/" },
      { label: "Breast screening", url: "https://www.nhs.uk/conditions/breast-screening-mammogram/" },
      { label: "Bowel cancer screening", url: "https://www.nhs.uk/conditions/bowel-cancer-screening/" },
      { label: "Cervical screening", url: "https://www.nhs.uk/conditions/cervical-screening/" },
      { label: "Lung cancer screening (Targeted Lung Health Checks)", url: "https://www.nhs.uk/conditions/lung-health-checks/" },
      { label: "UK National Screening Committee recommendations", url: "https://view-health-screening-recommendations.service.gov.uk/" },
    ],
  },
  {
    id: "genomics",
    title: "Genomic testing: the NHS Genomic Medicine Service and the National Genomic Test Directory",
    plain: "If your cancer is one where a gene test changes treatment, the NHS tests for it as standard through seven regional genomic laboratories. The list of what is tested for which cancer is public, so you can check whether your tumour should have been profiled.",
    detail: "The NHS Genomic Medicine Service (launched 2018, the first national system of its kind) delivers tumour and germline testing through seven Genomic Laboratory Hubs in England, with equivalent services in Scotland, Wales (All Wales Medical Genomics Service) and Northern Ireland. The National Genomic Test Directory, updated annually, lists every funded test by cancer type: small and large panels for solid tumours; fusion panels for lung and sarcoma; whole genome sequencing for sarcoma, paediatric cancers, acute leukaemias and some CNS tumours; germline BRCA and Lynch testing with eligibility criteria; and pharmacogenomic tests such as DPYD before fluoropyrimidines. Turnaround targets are 14 to 21 days for panels. Liquid biopsy (ctDNA) for lung cancer mutations was added in 2024-25 after a national pilot. Ask your team which tests were requested and whether your tumour meets the criteria for a large panel or WGS; a companion diagnostic named in a NICE TA (e.g. HER2, PD-L1, FRα, CLDN18.2) must be available where the drug is.",
    links: [
      { label: "NHS Genomic Medicine Service", url: "https://www.england.nhs.uk/genomics/nhs-genomic-med-service/" },
      { label: "National Genomic Test Directory", url: "https://www.england.nhs.uk/publication/national-genomic-test-directories/" },
      { label: "Genomics England", url: "https://www.genomicsengland.co.uk/" },
    ],
  },
  {
    id: "trials",
    title: "Clinical trials: NIHR, Be Part of Research, and how to ask",
    plain: "Around one in eight NHS cancer patients joins a clinical trial. You can search for trials yourself and ask your oncologist to refer you to the trial site, which may be a different hospital. Trials give free access to drugs the NHS does not yet fund.",
    detail: "The National Institute for Health and Care Research (NIHR) funds the research infrastructure in every NHS trust in England, with parallel bodies in Scotland (NHS Research Scotland), Wales (Health and Care Research Wales) and Northern Ireland. The NIHR Be Part of Research service and Cancer Research UK's trial finder both list open UK cancer trials by cancer type and location. Experimental Cancer Medicine Centres (ECMCs, 17 adult and a paediatric network) run early-phase trials of new drugs. Your oncologist can refer you to any UK trial site; travel costs may be reimbursed by the trial. Ask specifically whether a trial is open for your cancer at your line of treatment, and whether a molecular profiling study (e.g. DETERMINE for rare cancers, or TARGET National) could open drug-matched options. Compassionate access outside trials is via the MHRA's Early Access to Medicines Scheme (EAMS) or company-funded named-patient programmes.",
    links: [
      { label: "NIHR Be Part of Research", url: "https://bepartofresearch.nihr.ac.uk/" },
      { label: "Cancer Research UK trial finder", url: "https://www.cancerresearchuk.org/about-cancer/find-a-clinical-trial" },
      { label: "Experimental Cancer Medicine Centres", url: "https://www.ecmcnetwork.org.uk/" },
      { label: "MHRA Early Access to Medicines Scheme", url: "https://www.gov.uk/guidance/apply-for-the-early-access-to-medicines-scheme-eams" },
    ],
  },
  {
    id: "private",
    title: "Private and self-funded treatment, and how it fits with NHS care",
    plain: "You can pay privately for a drug the NHS will not fund and still receive the rest of your care on the NHS. The private drug must be given separately, but you cannot be removed from NHS care for paying for something extra. Many private hospitals host NHS consultants and can run trials too.",
    detail: "Since the 2009 Richards review, NHS patients in England may pay for additional private drugs ('top-ups') without losing NHS entitlement, provided the private element is delivered separately (different appointment or setting) so that NHS resources do not subsidise it. Private medical insurance typically covers licensed cancer drugs regardless of NICE status, subject to policy limits, and a growing share of new drugs are first used in the UK in the private sector. Self-funding costs are high: a year of a modern immunotherapy or ADC at list price is often £50,000 to £150,000, though some companies offer patient access schemes. Private hospital groups offer proton therapy, tumour treating fields and drugs NICE has rejected. A private consultation for a second opinion or a specific test can be followed by an NHS referral back; NHS consultants will accept privately obtained scans and genomics. Discuss any private element with your NHS team so records stay complete and drug interactions are managed.",
    links: [
      { label: "Guidance on NHS patients who wish to pay for additional private care", url: "https://www.gov.uk/government/publications/guidance-on-nhs-patients-who-wish-to-pay-for-additional-private-care" },
      { label: "Macmillan: private treatment", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/getting-treatment/private-treatment" },
    ],
  },
  {
    id: "prescriptions",
    title: "Free prescriptions and help with NHS costs",
    plain: "If you have cancer in England you can get all your NHS prescriptions free, not only cancer drugs, with a medical exemption certificate your GP or oncologist signs. Prescriptions are already free for everyone in Scotland, Wales and Northern Ireland. Hospital-administered cancer drugs are always free.",
    detail: "Since April 2009 people undergoing treatment for cancer, the effects of cancer, or the effects of cancer treatment are entitled to a five-year medical exemption certificate (form FP92A, signed by a GP or hospital doctor) that covers all NHS prescriptions in England. The certificate can be renewed while any of those conditions applies. Wigs and fabric supports are free on the NHS in Wales and Scotland and on low income in England; dental treatment and sight tests may be free on income grounds. Hospital car parking must be free for frequent outpatient attenders including cancer patients in England (since 2020), and is free in Wales and Scotland. Travel to hospital may be reimbursed under the Healthcare Travel Costs Scheme if you receive qualifying benefits, and some Cancer Alliances and charities run transport services.",
    links: [
      { label: "NHS: free prescriptions and medical exemption certificates", url: "https://www.nhs.uk/nhs-services/prescriptions/free-nhs-prescriptions/" },
      { label: "Healthcare Travel Costs Scheme", url: "https://www.nhs.uk/nhs-services/help-with-health-costs/healthcare-travel-costs-scheme-htcs/" },
      { label: "Macmillan: help with health costs", url: "https://www.macmillan.org.uk/cancer-information-and-support/get-help/financial-help" },
    ],
  },
  {
    id: "benefits",
    title: "Money: PIP, Universal Credit, sick pay, Macmillan grants and the special rules for terminal illness",
    plain: "Cancer usually costs money: lost income, travel, heating. You may be able to claim Personal Independence Payment (or Attendance Allowance over state pension age), get faster and higher payments under the special rules if a clinician says you may have less than 12 months, and receive one-off grants from Macmillan and other charities.",
    detail: "Personal Independence Payment (PIP; Adult Disability Payment in Scotland) is not means-tested and pays roughly £70 to £190 a week depending on how cancer or its treatment affects daily living and mobility. If a clinician completes an SR1 form stating you may have 12 months or less to live, claims for PIP, Universal Credit, Employment and Support Allowance and Attendance Allowance are fast-tracked, paid at the highest rate and not subject to a face-to-face assessment. Employees are entitled to Statutory Sick Pay for up to 28 weeks, and cancer counts as a disability under the Equality Act from diagnosis, giving rights to reasonable adjustments and protection from dismissal. Macmillan grants (typically a few hundred pounds) help with heating, clothing and travel; Macmillan's welfare rights advisers and Citizens Advice can complete benefit forms with you. Carers may claim Carer's Allowance. Young people have specific support through Teenage Cancer Trust and Young Lives vs Cancer, which pays a registration grant.",
    links: [
      { label: "GOV.UK: Personal Independence Payment", url: "https://www.gov.uk/pip" },
      { label: "GOV.UK: special rules for end of life (SR1)", url: "https://www.gov.uk/government/publications/dwp-factual-medical-reports-guidance-for-healthcare-professionals/special-rules-for-end-of-life" },
      { label: "Macmillan grants", url: "https://www.macmillan.org.uk/cancer-information-and-support/get-help/financial-help/macmillan-grants" },
      { label: "Macmillan: benefits and financial support", url: "https://www.macmillan.org.uk/cancer-information-and-support/get-help/financial-help/benefits" },
    ],
  },
  {
    id: "palliative",
    title: "Palliative care and hospices",
    plain: "Palliative care is symptom control and support at any stage of cancer, not only at the end of life, and you can have it alongside active treatment. Hospice care is free, mostly charity-run with part NHS funding, and includes home visits, day services and inpatient stays.",
    detail: "Every NHS cancer centre has a specialist palliative care team (consultants in palliative medicine, nurses, sometimes pharmacists and social workers) who can be involved from diagnosis for pain, breathlessness, nausea and psychological distress; early palliative care improves quality of life and in some trials survival. Community palliative care is delivered by district nurses, GPs, Marie Curie nurses and hospice-at-home teams. The UK's 200-plus hospices are mostly charities receiving roughly a third of their funding from the NHS; care is free to patients. Advance care planning (ReSPECT forms, lasting power of attorney, preferred place of care) is offered and recorded on shared records. Fast-track NHS Continuing Healthcare funding covers a package of care at home or in a care home when someone is rapidly deteriorating. Children's palliative care is coordinated through Together for Short Lives.",
    links: [
      { label: "NHS: end of life care", url: "https://www.nhs.uk/conditions/end-of-life-care/" },
      { label: "Hospice UK: find a hospice", url: "https://www.hospiceuk.org/" },
      { label: "Marie Curie", url: "https://www.mariecurie.org.uk/" },
      { label: "NICE NG142: end of life care for adults", url: "https://www.nice.org.uk/guidance/ng142" },
    ],
  },
  {
    id: "second-opinion",
    title: "Second opinions and choosing where to be treated",
    plain: "You can ask for a second opinion within the NHS and you can ask to be treated at a different hospital, including a specialist centre. There is no legal right to a second opinion, but it is rarely refused, and your own consultant or GP can arrange it.",
    detail: "Under the NHS Constitution you have a right to choose the provider for your first outpatient appointment after GP referral, and once in cancer care your MDT can refer you to any NHS specialist centre for an opinion or treatment. A second opinion is usually arranged by your consultant or GP with a copy of your notes and imaging; specialist centres such as The Royal Marsden and The Christie receive many. For rare cancers, ask whether your case has been discussed at a national or supra-regional MDT (e.g. sarcoma, neuro-oncology, ocular melanoma, thymic tumours). Patients sometimes seek a private second opinion for speed and then continue on the NHS. If you feel you have been refused reasonable care, the Patient Advice and Liaison Service (PALS) at each trust and Macmillan's support line can help you make the request.",
    links: [
      { label: "NHS: how to get a second opinion", url: "https://www.nhs.uk/nhs-services/gps/how-to-get-a-second-opinion/" },
      { label: "NHS Constitution for England", url: "https://www.gov.uk/government/publications/the-nhs-constitution-for-england" },
      { label: "Macmillan: getting a second opinion", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/preparing-for-treatment/getting-a-second-opinion" },
    ],
  },
  {
    id: "help",
    title: "Where to get help now: Macmillan, Cancer Research UK nurses, Maggie's",
    plain: "Three free services answer questions and support anyone affected by cancer in the UK: Macmillan's support line (0808 808 00 00, 8am to 8pm every day), Cancer Research UK's nurse helpline (0808 800 4040, weekdays), and Maggie's centres next to major cancer hospitals where you can walk in without an appointment.",
    detail: "Macmillan Cancer Support runs the largest network: a support line staffed by nurses, welfare rights advisers, financial guides and work-support specialists; an online community; Macmillan nurses and information centres in most cancer hospitals; and grants. Cancer Research UK's nurse helpline answers questions about diagnosis, treatment, trials and evidence, and its Cancer Chat forum is moderated by nurses. Maggie's has more than 20 walk-in centres at major UK cancer hospitals offering psychological support, benefits advice, exercise and relaxation classes and a kitchen table, plus online support. Cancer-specific charities (Breast Cancer Now, Prostate Cancer UK, Bowel Cancer UK, Roy Castle Lung Cancer Foundation, Blood Cancer UK, Myeloma UK, Pancreatic Cancer UK, The Brain Tumour Charity, Sarcoma UK, Teenage Cancer Trust and many others) run helplines with specialist nurses. Mental health support is available via NHS Talking Therapies and, in many centres, clinical psychology within the cancer service.",
    links: [
      { label: "Macmillan Cancer Support", url: "https://www.macmillan.org.uk/" },
      { label: "Cancer Research UK: nurse helpline and Cancer Chat", url: "https://www.cancerresearchuk.org/about-cancer/cancer-chat" },
      { label: "Maggie's centres", url: "https://www.maggies.org/" },
    ],
  },
];
