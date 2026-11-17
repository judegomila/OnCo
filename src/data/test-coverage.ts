/**
 * Who pays for a test, per country: one row per (test record, country, payer document).
 *
 * The census of 11 November 2026 (docs/proposals/cross-links-census-2026-11.md, section 8) found 183 product records
 * that `productClass()` classes as a test and only 41 with any coverage fact. This file is the structured home for
 * those facts. A row is written only from the payer's or guidance body's own page, read as raw text on the day in
 * `readOn`; nothing here is inferred from a test's class alone.
 *
 * What was read, and how:
 *
 * - **US Medicare national coverage determinations (NCDs).** api.coverage.cms.gov/v1/data/ncd/?ncdid=<id>&ncdver=<ver>
 *   serves the full text without a key. NCD 90.2 (next generation sequencing), 210.2.1 (HPV screening) and 210.3
 *   (colorectal screening tests) name no brand: each covers a class of test on stated terms. A row under one of them
 *   says so, and says where the test's FDA status was checked: the FDA's list of authorised companion diagnostics
 *   (content current as of 3 November 2026) and the openFDA premarket approval records (api.fda.gov/device/pma.json).
 * - **US Medicare local coverage (LCDs and billing articles, including MolDX).** The lists of documents are open
 *   (api.coverage.cms.gov/v1/reports/local-coverage-final-lcds and local-coverage-articles: 935 LCDs and 2,107
 *   articles on the day read), but every endpoint that serves an LCD's or article's text answers HTTP 401 until the
 *   reader accepts the AMA CPT, ADA CDT and AHA licence agreements. That acceptance was not ours to give, so no local
 *   document was read. Where a document is named for a test, the row below is a named gap that points at it: the
 *   title proves the document exists, not what it decides.
 * - **UK: NICE.** nice.org.uk/guidance/<id>/chapter/1-Recommendations, read with a full browser header set
 *   (docs/DATA-SOURCES.md). NICE moved its diagnostics guidance to HealthTech guidance numbers: DG58 is now HTG719,
 *   DG9 is HTG316 and DG56 is HTG690, each page stating that the recommendations are unchanged. DG17 was replaced by
 *   the prostate cancer guideline NG131. A NICE recommendation says what the NHS should use; it is not a statement
 *   that a given hospital has the test.
 *
 * No other country had an equally primary machine-readable source within reach, so none is recorded.
 */

export type TestCoverageStatus =
  /** A payer document names the test, or its terms apply to it, and pays without further conditions. */
  | "covered"
  /** Paid for only for the people and uses the document sets out. */
  | "covered with conditions"
  | "not covered"
  /** A guidance body (NICE) recommends the test, on the conditions in the note. */
  | "recommended with conditions"
  /** A guidance body says the test should not be used for the purpose in the note. */
  | "not recommended"
  | "research only"
  /** Looked for and not established. A named gap, never a guess. */
  | "not confirmed";

export type TestCoverageDocument = { id: string; title: string; url: string };

export type TestCoverageRow = {
  /** A `drug`-kind record that `productClass()` classes as a test. */
  testId: string;
  /** ISO 3166-1 alpha-2. */
  country: "US" | "GB";
  payer: string;
  status: TestCoverageStatus;
  /** The payer document the row rests on. A gap row carries one only where a document on the subject exists. */
  document?: TestCoverageDocument;
  /** The date the document, or this version of it, took effect or was published, as the source states it. */
  effective?: string;
  /** The day the source was fetched and read. */
  readOn: string;
  /** Plain language: what is covered for whom, in the source's own terms. */
  note: string;
  /** Gap rows only: what was searched. */
  searched?: string;
  /** Gap rows only: where the search can be repeated. */
  searchUrl?: string;
};

const READ = "2026-11-16";

const MEDICARE_NATIONAL = "Medicare (national coverage determination)";
const MEDICARE_LOCAL = "Medicare (local coverage, read from the Medicare Coverage Database lists)";
const NICE = "NICE (guidance for the NHS in England)";

const NCD_NGS: TestCoverageDocument = {
  id: "NCD 90.2",
  title: "Next Generation Sequencing (NGS)",
  url: "https://www.cms.gov/medicare-coverage-database/view/ncd.aspx?ncdid=372&ncdver=2",
};
const NCD_HPV: TestCoverageDocument = {
  id: "NCD 210.2.1",
  title: "Screening for Cervical Cancer with Human Papillomavirus (HPV)",
  url: "https://www.cms.gov/medicare-coverage-database/view/ncd.aspx?ncdid=365&ncdver=1",
};
const NCD_CRC: TestCoverageDocument = {
  id: "NCD 210.3",
  title: "Colorectal Cancer Screening Tests",
  url: "https://www.cms.gov/medicare-coverage-database/view/ncd.aspx?ncdid=281&ncdver=8",
};
const HTG719: TestCoverageDocument = {
  id: "HTG719",
  title: "Tumour profiling tests to guide adjuvant chemotherapy decisions in early breast cancer",
  url: "https://www.nice.org.uk/guidance/htg719/chapter/1-Recommendations",
};
const HTG316: TestCoverageDocument = {
  id: "HTG316",
  title: "EGFR-TK mutation testing in adults with locally advanced or metastatic non-small-cell lung cancer",
  url: "https://www.nice.org.uk/guidance/htg316/chapter/1-Recommendations",
};
const HTG690: TestCoverageDocument = {
  id: "HTG690",
  title: "Quantitative faecal immunochemical testing to guide colorectal cancer pathway referral in primary care",
  url: "https://www.nice.org.uk/guidance/htg690/chapter/1-Recommendations",
};
const NG131: TestCoverageDocument = {
  id: "NG131",
  title: "Prostate cancer: diagnosis and management",
  url: "https://www.nice.org.uk/guidance/ng131/chapter/Recommendations",
};

const FDA_CDX_LIST = "https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-cleared-or-approved-companion-diagnostic-devices-in-vitro-and-imaging-tools";
const MCD_LCD_LIST = "https://api.coverage.cms.gov/v1/reports/local-coverage-final-lcds";
const MCD_ARTICLE_LIST = "https://api.coverage.cms.gov/v1/reports/local-coverage-articles";

/**
 * NCD 90.2, section B.1. The rule names no test. It applies to a test that is (a) next generation sequencing and
 * (b) FDA approved or cleared as a companion diagnostic. Both were checked for each test: (b) on the FDA's list of
 * authorised companion diagnostics, (a) on the openFDA premarket approval record, whose device class for every test
 * below is "Next generation sequencing oncology panel, somatic or germline variant detection system" with the
 * decision code for an approval in force.
 */
function ngsCompanion(testId: string, fdaName: string, pma: string, cancers: string): TestCoverageRow {
  return {
    testId,
    country: "US",
    payer: MEDICARE_NATIONAL,
    status: "covered with conditions",
    document: NCD_NGS,
    effective: "2020-01-27",
    readOn: READ,
    note:
      `Medicare's national rule on sequencing tests names no brand. It covers a next generation sequencing test that the FDA has approved or cleared as a companion diagnostic, for a person with recurrent, relapsed, refractory, metastatic or advanced stage III or IV cancer who has not had the same test for the same cancer before and has decided to seek further treatment. The test must have an FDA-approved or cleared use in that person's cancer, be ordered by the treating doctor and be run in a CLIA-certified laboratory. ` +
      `${fdaName} meets the two test conditions: the FDA's list of companion diagnostics includes it (${pma}; listed for ${cancers}) and the FDA's approval record classes it as a next generation sequencing oncology panel. For a person who does not meet those conditions, the rule says sequencing is not covered nationally.`,
  };
}

/**
 * NCD 210.2.1, section B. The rule names no brand: it covers HPV testing with "the appropriate U.S. Food and Drug
 * Administration (FDA) approved/cleared laboratory tests, used consistent with FDA approved labeling". Each test's
 * approval was read from its openFDA premarket approval record.
 */
function hpvScreen(testId: string, fdaName: string, approval: string): TestCoverageRow {
  return {
    testId,
    country: "US",
    payer: MEDICARE_NATIONAL,
    status: "covered with conditions",
    document: NCD_HPV,
    effective: "2015-07-09",
    readOn: READ,
    note:
      `Medicare's national rule on HPV screening names no brand. It covers HPV testing once every five years, together with a Pap test, for people aged 30 to 65 who have no symptoms, using "the appropriate U.S. Food and Drug Administration (FDA) approved/cleared laboratory tests, used consistent with FDA approved labeling". ` +
      `The FDA's premarket approval database lists ${fdaName} as approved (${approval}), so the rule applies to it when it is used as its label says. HPV testing outside those terms is not covered by this rule.`,
  };
}

function nice(testId: string, status: TestCoverageStatus, document: TestCoverageDocument, effective: string, note: string): TestCoverageRow {
  return { testId, country: "GB", payer: NICE, status, document, effective, readOn: READ, note };
}

const TUMOUR_PROFILING_USE =
  "NICE says it can be used, alongside clinical risk factors, to guide the decision on chemotherapy after surgery for oestrogen or progesterone receptor-positive, HER2-negative early breast cancer with 1 to 3 positive lymph nodes in women who have been through the menopause, in men and, depending on their hormonal profile, in trans, non-binary or intersex people, and should not be used for that decision in women who have not been through the menopause. Where no lymph nodes are involved (or only micrometastases), it can be used in the NHS while more evidence is generated, only for people at intermediate risk of distant recurrence on a validated tool such as Predict or the Nottingham Prognostic Index. The company must supply it at the discount agreed with the NHS.";

/** Facts read from the payer's or guidance body's own document. */
export const TEST_COVERAGE: TestCoverageRow[] = [
  // United States: NCD 90.2, FDA-approved companion diagnostics run by next generation sequencing.
  ngsCompanion("guardant360-cdx", "Guardant360 CDx", "P200010", "non-small cell lung cancer, breast cancer and colorectal cancer, on a blood sample"),
  ngsCompanion("oncomine-dx-target-test", "Oncomine Dx Target Test", "P160045", "non-small cell lung cancer, cholangiocarcinoma, thyroid cancers, and astrocytoma and oligodendroglioma, on tissue"),
  ngsCompanion("oncomine-dx-express", "Oncomine Dx Express Test", "P240040", "non-small cell lung cancer, on tissue"),
  ngsCompanion("tempus-xt-cdx", "xT CDx", "P210011", "colorectal cancer, on tissue with matched blood or saliva"),
  ngsCompanion("caris-mi-cancer-seek", "MI Cancer Seek", "P240010", "breast cancer, colorectal cancer, melanoma, non-small cell lung cancer, endometrial carcinoma and solid tumours, on tissue"),
  ngsCompanion("trusight-oncology-comprehensive", "TruSight Oncology Comprehensive", "P230011", "non-small cell lung cancer, thyroid cancers and solid tumours, on tissue"),
  ngsCompanion("onco-reveal-dx-lung-colon", "ONCO/Reveal Dx Lung & Colon Cancer Assay", "P200011", "colorectal cancer and non-small cell lung cancer, on tissue"),

  // United States: NCD 210.2.1, FDA-approved HPV tests used for screening with a Pap test.
  hpvScreen("cobas-hpv", "the cobas HPV Test", "P100020, 19 April 2011; and P190028 for the cobas 6800 and 8800 systems, 3 April 2020"),
  hpvScreen("aptima-hpv", "the Aptima HPV Assay", "P100042, 28 October 2011; the Aptima HPV 16 18/45 Genotype Assay is P120007, 12 October 2012"),
  hpvScreen("alinity-m-hr-hpv", "Alinity m HR HPV", "P230003, 1 November 2023"),
  hpvScreen("bd-onclarity-hpv", "the BD Onclarity HPV Assay", "P160037, 12 February 2018"),
  hpvScreen("digene-hc2-hpv", "the digene Hybrid Capture 2 High-Risk HPV DNA Test", "P890064, with supplement S009 approved on 31 March 2003"),

  // United States: NCD 210.3, faecal occult blood tests as a class.
  {
    testId: "oc-sensor-fit",
    country: "US",
    payer: MEDICARE_NATIONAL,
    status: "covered with conditions",
    document: NCD_CRC,
    effective: "2026-06-08",
    readOn: READ,
    note:
      "Medicare's national rule on bowel cancer screening names no brand of stool blood test. It covers one screening faecal occult blood test every 12 months for people aged 45 and over, either a guaiac test or an immunoassay (immunochemical) test, which is the kind OC-Sensor is, on a written order from the person's doctor or other treating clinician. The rule covers the class of test; it does not mention OC-Sensor by name.",
  },

  // United Kingdom: NICE HTG719 (was DG58), tumour profiling tests in early breast cancer.
  nice("endopredict", "recommended with conditions", HTG719, "2024-05-09", `EndoPredict: ${TUMOUR_PROFILING_USE}`),
  nice("oncotype-dx", "recommended with conditions", HTG719, "2024-05-09", `Oncotype DX: ${TUMOUR_PROFILING_USE}`),
  nice("prosigna", "recommended with conditions", HTG719, "2024-05-09", `Prosigna: ${TUMOUR_PROFILING_USE} NICE adds that Prosigna's intended purpose is only for women who have been through the menopause.`),
  nice(
    "mammaprint",
    "not recommended",
    HTG719,
    "2024-05-09",
    "NICE says MammaPrint should not be used to guide the decision on chemotherapy after surgery for oestrogen or progesterone receptor-positive, HER2-negative early breast cancer, whether 1 to 3 lymph nodes are involved or none. Its reason for the node-positive group: the economic modelling suggested MammaPrint is likely to be less clinically effective and to cost more than standard care.",
  ),

  // United Kingdom: NICE HTG316 (was DG9), EGFR mutation testing in lung cancer.
  nice(
    "therascreen-cdx",
    "recommended with conditions",
    HTG316,
    "2013-08-14",
    "This applies to one kit in the family, the therascreen EGFR RGQ PCR Kit. NICE recommends it as an option for detecting EGFR mutations in the tumours of adults with previously untreated, locally advanced or metastatic non-small-cell lung cancer, when used in accredited laboratories that take part in an external quality assurance scheme. NICE found insufficient evidence to make a recommendation on a different Qiagen kit, the therascreen EGFR Pyro Kit. The guidance says nothing about the KRAS, PIK3CA, FGFR or BRAF kits.",
  ),
  nice(
    "cobas-egfr-mutation-test",
    "recommended with conditions",
    HTG316,
    "2013-08-14",
    "NICE recommends the cobas EGFR Mutation Test as an option for detecting EGFR mutations in the tumours of adults with previously untreated, locally advanced or metastatic non-small-cell lung cancer, when used in accredited laboratories that take part in an external quality assurance scheme. The guidance dates from 2013 and names the test without a version number; NICE states that a later review found nothing new that affects the recommendations.",
  ),

  // United Kingdom: NICE HTG690 (was DG56), faecal immunochemical testing for people with symptoms.
  nice(
    "oc-sensor-fit",
    "recommended with conditions",
    HTG690,
    "2023-08-24",
    "NICE recommends quantitative faecal immunochemical testing with OC-Sensor (or HM-JACKarc) in primary care to guide referral for suspected bowel cancer in adults with the symptoms it lists, among them an abdominal mass, a change in bowel habit, iron-deficiency anaemia, and rectal bleeding or unexplained weight loss or abdominal pain at the ages it sets out. A result of at least 10 micrograms of haemoglobin per gram of faeces leads to referral on a suspected cancer pathway. This is about testing people who have symptoms, not about the screening programme.",
  ),

  // United Kingdom: NICE NG131, recommendation 1.2.13 (replaced DG17).
  nice(
    "progensa-pca3",
    "not recommended",
    NG131,
    "2019-05-09",
    "NICE's prostate cancer guideline, recommendation 1.2.13, says the PROGENSA PCA3 assay is not recommended in people having investigations for suspected prostate cancer who have had a negative or inconclusive prostate biopsy. The committee saw no evidence that it is an effective use of NHS resources in that follow-up. This recommendation replaced NICE's earlier diagnostics guidance DG17.",
  ),
  nice(
    "prostate-health-index",
    "not recommended",
    NG131,
    "2019-05-09",
    "NICE's prostate cancer guideline, recommendation 1.2.13, says the Prostate Health Index is not recommended in people having investigations for suspected prostate cancer who have had a negative or inconclusive prostate biopsy. The committee saw no evidence that it is an effective use of NHS resources in that follow-up. This recommendation replaced NICE's earlier diagnostics guidance DG17.",
  ),
];

const LOCAL_TEXT_UNREAD =
  "Its text could not be read: the Medicare Coverage Database serves the text of local documents only after the reader accepts the AMA, ADA and AHA licence agreements, which we did not do. The title shows that a Medicare contractor has a policy document on this test, not what the document decides.";

/** A local Medicare document that is named for the test, or for exactly its subject, whose text was not read. */
function localPointer(testId: string, id: string, title: string, contractor: string, effective: string, extra = ""): TestCoverageRow {
  const isLcd = id.startsWith("L");
  const num = id.slice(1);
  return {
    testId,
    country: "US",
    payer: MEDICARE_LOCAL,
    status: "not confirmed",
    document: {
      id,
      title,
      url: isLcd
        ? `https://www.cms.gov/medicare-coverage-database/view/lcd.aspx?lcdid=${num}`
        : `https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleid=${num}`,
    },
    effective,
    readOn: READ,
    note: `Not confirmed. The Medicare Coverage Database lists a current ${isLcd ? "local coverage determination" : "local coverage article"} from ${contractor}, ${id}, titled "${title}". ${LOCAL_TEXT_UNREAD}${extra ? ` ${extra}` : ""}`,
    searched: "Titles of every final local coverage determination (935) and local coverage article (2,107) in the Medicare Coverage Database, matched against the test's name and aliases.",
    searchUrl: isLcd ? MCD_LCD_LIST : MCD_ARTICLE_LIST,
  };
}

function ngsGap(testId: string, note: string): TestCoverageRow {
  return {
    testId,
    country: "US",
    payer: MEDICARE_NATIONAL,
    status: "not confirmed",
    document: NCD_NGS,
    effective: "2020-01-27",
    readOn: READ,
    note,
    searched: "The text of NCD 90.2, the FDA's list of authorised companion diagnostics, and the test's openFDA premarket approval record.",
    searchUrl: FDA_CDX_LIST,
  };
}

function crcGap(testId: string, fdaLine: string): TestCoverageRow {
  return {
    testId,
    country: "US",
    payer: MEDICARE_NATIONAL,
    status: "not confirmed",
    document: NCD_CRC,
    effective: "2026-06-08",
    readOn: READ,
    note: `Not confirmed. Medicare's national rule on bowel cancer screening names no brand of biomarker test. It covers a non-invasive biomarker test once every 3 years for people aged 45 to 85 with no symptoms and at average risk, if the test is FDA authorised for bowel cancer screening and its FDA labelling shows either sensitivity of at least 90 per cent with specificity of at least 87 per cent, or sensitivity of at least 79 per cent with specificity of at least 90 per cent, for detecting bowel cancer. ${fdaLine} We did not read its FDA labelling against those thresholds, so whether the rule covers it is not established here.`,
    searched: "The text of NCD 210.3 (version 8) and the test's openFDA premarket approval record.",
    searchUrl: "https://api.coverage.cms.gov/v1/data/ncd/?ncdid=281&ncdver=8",
  };
}

function noDocument(testId: string): TestCoverageRow {
  return {
    testId,
    country: "US",
    payer: "Medicare (national and local coverage)",
    status: "not confirmed",
    readOn: READ,
    note: "Not confirmed. No Medicare national coverage determination, local coverage determination or local coverage article is titled for this test or for multi-cancer early detection testing. Titles were searched, not the text of local documents, so this does not establish that Medicare refuses to pay; it establishes that we found no coverage document for it.",
    searched: "Titles of all 345 national coverage determinations, 935 final local coverage determinations and 2,107 local coverage articles in the Medicare Coverage Database, for the test's name and for multi-cancer or early detection testing.",
    searchUrl: MCD_LCD_LIST,
  };
}

/**
 * Named gaps: tests that were looked for and could not be confirmed, with what was searched. Every row here is
 * `not confirmed`. A test is listed only if it was actually looked up.
 */
export const TEST_COVERAGE_GAPS: TestCoverageRow[] = [
  // NCD 90.2 could not be shown to apply.
  ngsGap(
    "mychoice-cdx",
    "Not confirmed. Medicare's national rule on sequencing tests (NCD 90.2) covers FDA-approved companion diagnostics only where the test is next generation sequencing. The FDA's list of companion diagnostics includes Myriad myChoice CDx (P190014) for ovarian cancer, but the FDA's approval record classes it as a cancer-related germline gene mutation detection system, not as a next generation sequencing panel, so the record does not show that the rule applies. The Medicare Coverage Database also lists a Palmetto GBA article on germline testing for PARP inhibitors (A54338), whose text we could not read.",
  ),
  ngsGap(
    "bracanalysis-cdx",
    "Not confirmed. Medicare's national rule on sequencing tests (NCD 90.2) covers FDA-approved companion diagnostics only where the test is next generation sequencing. The FDA's list of companion diagnostics includes BRACAnalysis CDx (P140020) for ovarian, breast, pancreatic and prostate cancer, but the FDA's approval record classes it as a cancer-related germline gene mutation detection system, not as a next generation sequencing panel, so the record does not show that the rule applies. The Medicare Coverage Database also lists a Palmetto GBA article on germline testing for PARP inhibitors (A54338), whose text we could not read.",
  ),
  ngsGap(
    "foundationfocus-cdxbrca",
    "Not confirmed. FoundationFocus CDxBRCA is on the FDA's list of companion diagnostics (P160018, ovarian cancer) and its approval record classes it as a next generation sequencing panel, which are the two test conditions of Medicare's national rule (NCD 90.2). But the openFDA record carries the decision code APWD where the tests in force carry APPR, which we read as an approval since withdrawn and could not verify. Until that is settled the rule cannot be said to apply.",
  ),
  ngsGap(
    "resolution-ctdx-first",
    "Not confirmed. Resolution ctDx FIRST is on the FDA's list of companion diagnostics (P210040, non-small cell lung cancer, on a blood sample) and its approval record classes it as a next generation sequencing panel, which are the two test conditions of Medicare's national rule (NCD 90.2). But the openFDA record carries the decision code APWD where the tests in force carry APPR, which we read as an approval since withdrawn and could not verify. Until that is settled the rule cannot be said to apply.",
  ),

  // NCD 210.3 thresholds not checked against FDA labelling.
  crcGap("cologuard-plus", "The FDA's approval database lists Cologuard Plus as approved (P230043, 3 October 2024)."),
  crcGap("epi-procolon", "The FDA's approval database lists Epi proColon as approved (P130001, 12 April 2016)."),

  // Local documents named for the test; text behind the licence wall.
  localPointer("4kscore", "L37798", "4Kscore Test Algorithm", "First Coast Service Options", "2020-01-06"),
  localPointer("4kscore", "L37792", "4Kscore Test Algorithm", "Novitas Solutions", "2019-12-30"),
  localPointer("isopsa", "L39284", "Prostate Cancer Detection with IsoPSA®", "CGS Administrators", "2026-11-05"),
  localPointer("abbott-realtime-idh1", "A55695", "Billing and Coding: MolDX: Abbott RealTime IDH1 and IDH2 testing for Acute Myeloid Leukemia (AML)", "Palmetto GBA", "2023-06-01"),
  localPointer("abbott-realtime-idh2", "A55695", "Billing and Coding: MolDX: Abbott RealTime IDH1 and IDH2 testing for Acute Myeloid Leukemia (AML)", "Palmetto GBA", "2023-06-01"),
  localPointer("mammaprint", "A53104", "Billing and Coding: MolDX: MammaPrint", "Palmetto GBA", "2022-01-01"),
  localPointer("endopredict", "L37264", "MolDX: EndoPredict Breast Cancer Gene Expression Test", "Palmetto GBA", "2021-07-04"),
  localPointer("prosigna", "L36125", "MolDX: Breast Cancer Assay: Prosigna®", "Palmetto GBA", "2021-04-22"),
  localPointer("oncotype-dx", "A53105", "Billing and Coding: MolDX: Oncotype DX® Breast Cancer Assay", "Palmetto GBA", "2019-10-24"),
  localPointer("epi-procolon", "A53702", "Billing and Coding: MolDX: SEPT9 Gene Test", "Palmetto GBA", "2019-11-21", "The title names the Septin 9 gene test, not Epi proColon by brand."),

  // Local documents on exactly the test's subject, not named for the brand.
  localPointer("decipher-prostate", "L38292", "MolDX: Prostate Cancer Genomic Classifier Assay for Men with Localized Disease", "Palmetto GBA", "2025-07-03", "The title does not name Decipher. Older response-to-comments articles in the same database are titled for the Decipher Prostate Cancer Classifier Assay (A55306, A54630, A54632)."),
  localPointer("oncotype-dx-gps", "L38292", "MolDX: Prostate Cancer Genomic Classifier Assay for Men with Localized Disease", "Palmetto GBA", "2025-07-03", "The title does not name the Oncotype DX Genomic Prostate Score. An older response-to-comments article in the same database is titled for the Oncotype DX Prostate Cancer Assay (A54613)."),
  localPointer("therascreen-cdx", "A54472", "Billing and Coding: MolDX: FDA-Approved KRAS Tests", "Palmetto GBA", "2022-07-14", "The title does not name therascreen. Sibling articles cover FDA-approved EGFR tests (A54021), FDA-approved BRAF tests (A54018) and PIK3CA gene tests (A53558). Medicare's national sequencing rule (NCD 90.2) does not reach these kits, which are PCR tests."),
  localPointer("cobas-egfr-mutation-test", "A54021", "Billing and Coding: MolDX: FDA-Approved EGFR Tests", "Palmetto GBA", "2024-05-30", "The title does not name the cobas test."),
  localPointer("cobas-4800-braf-v600", "A54018", "Billing and Coding: MolDX: FDA-Approved BRAF Tests", "Palmetto GBA", "2023-07-27", "The title does not name the cobas test."),
  localPointer("thxid-braf", "A54018", "Billing and Coding: MolDX: FDA-Approved BRAF Tests", "Palmetto GBA", "2023-07-27", "The title does not name the THxID kit."),
  localPointer("ventana-mmr-rxdx", "A56072", "Billing and Coding: MolDX: Microsatellite Instability-High (MSI-H) and Mismatch Repair Deficient (dMMR) Biomarker for Patients with Unresectable or Metastatic Solid Tumors", "Palmetto GBA", "2024-01-01", "The title does not name the VENTANA panel."),
  localPointer("her2-testing-assays", "L35922", "Lab: Special Histochemical Stains and Immunohistochemical Stains", "Palmetto GBA", "2025-03-13", "The title names the class of test (immunohistochemical stains), not HercepTest or PATHWAY 4B5. No Medicare coverage document is titled for HER2 testing."),
  localPointer("ventana-pd-l1-sp142", "L35922", "Lab: Special Histochemical Stains and Immunohistochemical Stains", "Palmetto GBA", "2025-03-13", "The title names the class of test (immunohistochemical stains). No Medicare coverage document is titled for PD-L1 testing."),
  localPointer("dako-pd-l1-22c3-pharmdx", "L35922", "Lab: Special Histochemical Stains and Immunohistochemical Stains", "Palmetto GBA", "2025-03-13", "The title names the class of test (immunohistochemical stains). No Medicare coverage document is titled for PD-L1 testing."),

  // Multi-cancer early detection tests: no document found at all.
  noDocument("cancerguard"),
  noDocument("overc-mcdbt"),
  noDocument("spot-mas"),
  noDocument("gagome-mced-test"),
  noDocument("avantect-mcd"),
  noDocument("shield-mcd"),
];

const BY_TEST = new Map<string, TestCoverageRow[]>();
for (const row of [...TEST_COVERAGE, ...TEST_COVERAGE_GAPS]) {
  const rows = BY_TEST.get(row.testId);
  if (rows) rows.push(row);
  else BY_TEST.set(row.testId, [row]);
}

/** Every row for one test, confirmed facts first, then named gaps. Empty when nothing was looked up. */
export function testCoverageFor(testId: string): TestCoverageRow[] {
  return BY_TEST.get(testId) ?? [];
}
