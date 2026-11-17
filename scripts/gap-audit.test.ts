import { describe, expect, it } from "vitest";
import {
  NameIndex, detectBiomarkerGaps, detectCompaniesWithoutProducts, detectCompanyUnlinkedProducts, detectDuplicateItems, detectProseGaps,
  detectRowRecordMismatch, detectSideTableGaps, extractCodes, extractProductPhrases, groupDuplicatePills, groupOneWay, rank, sameProduct,
  type BiomarkerLite, type Finding, type ProductLite, type SideRow, type TestRowLite,
} from "./gap-audit";

/**
 * Small fixtures for each detector in scripts/gap-audit.ts. The fixtures are the cases that set the rules: the
 * NeXT Personal row with no record, the Signatera pill shown twice, an IHC kit offered to a mutation readout, a
 * one-word alias claiming a longer organisation's name, and ordinary English read as a brand.
 */
const idx = new NameIndex([
  { id: "signatera", kind: "drug", names: ["Signatera", "Signatera CDx"] },
  { id: "oncodetect", kind: "drug", names: ["Oncodetect"] },
  { id: "foundationone-cdx", kind: "drug", names: ["FoundationOne CDx / Liquid CDx"] },
  { id: "rmc-6236", kind: "drug", names: ["Daraxonrasib", "RMC-6236"] },
  { id: "navitoclax", kind: "drug", names: ["Navitoclax"] },
  { id: "imid-thing", kind: "drug", names: ["IMiD"] },
  { id: "natera", kind: "company", names: ["Natera"] },
  { id: "personalis", kind: "company", names: ["Personalis"] },
  { id: "roche-genentech", kind: "company", names: ["Roche / Genentech", "Roche / Genentech", "Roche", "Genentech"] },
  { id: "alliance-oncology", kind: "company", names: ["Alliance for Clinical Trials in Oncology", "Alliance"] },
  { id: "burning-rock", kind: "company", names: ["Burning Rock Dx"] },
]);
const has = (id: string) => idx.entries.some((e) => e.id === id);
const row = (x: Partial<SideRow> & Pick<SideRow, "name">): SideRow => ({ table: "T", where: "f.ts:1", want: ["drug"], idField: "drugId", pages: ["/t/"], named: true, ...x });

describe("class 1: side-table rows", () => {
  it("reports a named product with no record, and the record a row could link to", () => {
    const f = detectSideTableGaps([
      row({ name: "Personalis NeXT Personal", owners: ["Personalis"], wouldAdd: ["/companies/personalis/"] }),
      row({ name: "Natera Signatera", owners: ["Natera"] }),
    ], idx, has);
    expect(f.find((x) => x.subject === "Personalis NeXT Personal")).toMatchObject({ rule: "no-record", confidence: "high", pages: ["/t/", "/companies/personalis/"] });
    expect(f.find((x) => x.subject === "Natera Signatera")).toMatchObject({ rule: "id-empty-record-exists", suggestedId: "signatera" });
  });
  it("flags an id that names no record, and one that points at a sibling product", () => {
    const f = detectSideTableGaps([row({ name: "Ghost", id: "ghost" }), row({ name: "Oncodetect MRD Liquid", id: "signatera", checkAgreement: true })], idx, has);
    expect(f.map((x) => x.rule).sort()).toEqual(["dangling-id", "id-names-other-product"]);
  });
  it("accepts a row whose words all sit inside the record's name", () => {
    expect(detectSideTableGaps([row({ name: "FoundationOne Liquid CDx", id: "foundationone-cdx", checkAgreement: true })], idx, has)).toEqual([]);
  });
  it("matches on whole words only: IMiD is not inside pyrimidine", () => {
    expect(detectSideTableGaps([row({ name: "Fluoropyrimidine" })], idx, has)[0].rule).toBe("no-record");
  });
  it("does not let a one-word organisation alias claim a longer name, but reads a parent in brackets", () => {
    const f = detectSideTableGaps([
      row({ name: "Global Alliance for Genomics and Health", want: ["company"], idField: "maintainerId" }),
      row({ name: "Ventana Medical Systems (Roche)", want: ["company"], idField: "companyId" }),
    ], idx, has);
    expect(f[0].rule).toBe("no-record");
    expect(f[1]).toMatchObject({ rule: "id-empty-record-exists", suggestedId: "roche-genentech", confidence: "medium" });
  });
  it("merges one device listed on many readouts into one finding over every page", () => {
    const f = detectSideTableGaps([row({ name: "LeukoStrat CDx FLT3", pages: ["/biomarkers/a/"] }), row({ name: "LeukoStrat CDx FLT3", pages: ["/biomarkers/b/"], where: "f.ts:9" })], idx, has);
    expect(f).toHaveLength(1);
    expect(f[0].pages).toEqual(["/biomarkers/a/", "/biomarkers/b/"]);
    expect(f[0].where).toBe("f.ts:1 (+1 more)");
  });
});

describe("class 2: products named in prose", () => {
  it("finds brand-shaped product names and skips ordinary words and company names", () => {
    const words = new Set(["haystack"]);
    expect(extractProductPhrases("Its products include FoundationOne Tracker and FoundationOne MRD.", words)).toEqual(["FoundationOne Tracker", "FoundationOne MRD"]);
    expect(extractProductPhrases("Haystack MRD is tumour-informed.", words)).toEqual(["Haystack MRD"]);
    expect(extractProductPhrases("Patients with positive MRD, an Oral Liquid, the VENTANA MMR RxDx Panel.", words)).toEqual([]);
    expect(extractProductPhrases("sponsored by Guangzhou Burning Rock Dx Co., Ltd.", words)).toEqual([]);
    expect(extractProductPhrases("CareDx agreed in April to acquire it", words)).toEqual([]);
  });
  it("reads drug codes but not trial names or components", () => {
    expect(extractCodes("testing RMC-6236 and ERAS-4001 in the KOMET-017 trial, with the adjuvant OBI-821, and NCT01234567")).toEqual(["RMC-6236", "ERAS-4001"]);
  });
  it("reports a missing product once over every page that names it, and nothing for one the corpus holds", () => {
    const f = detectProseGaps([
      { page: "/companies/foundation-medicine/", where: "a.ts:1", text: "FoundationOne MRD measures residual disease; Signatera CDx is the comparator." },
      { page: "/technologies/mrd-testing/", where: "b.ts:1", text: "FoundationOne MRD is tumour-informed." },
    ], idx);
    expect(f).toHaveLength(1);
    expect(f[0]).toMatchObject({ subject: "FoundationOne MRD", confidence: "high", pages: ["/companies/foundation-medicine/", "/technologies/mrd-testing/"] });
  });
  it("treats a code beside a held product's name as an alias gap, not a missing record", () => {
    const f = detectProseGaps([{ page: "/companies/x/", where: "a.ts:1", text: "ABT-263 (navitoclax) and RMC-6236 and XYZ-1234." }], idx, { codes: true });
    expect(f.map((x) => x.subject)).toEqual(["XYZ-1234"]);
  });
});

const products: ProductLite[] = [
  { id: "signatera", name: "Signatera", isTest: true, technologies: ["mrd-testing", "liquid-biopsy"], targets: [], drugs: [], companies: ["natera"], where: "t.ts:1", method: "Signatera tumour-informed ctDNA MRD test" },
  { id: "oncodetect", name: "Oncodetect", isTest: true, technologies: ["mrd-testing", "liquid-biopsy"], targets: [], drugs: [], companies: [], where: "t.ts:2", method: "Oncodetect ctDNA MRD test" },
  { id: "radar", name: "RaDaR", isTest: true, technologies: ["mrd-testing", "liquid-biopsy"], targets: [], drugs: [], companies: [], where: "t.ts:3", method: "RaDaR ctDNA MRD test" },
  { id: "ihc-kit", name: "EGFR pharmDx", isTest: true, technologies: [], targets: ["egfr"], drugs: ["osimertinib"], companies: [], where: "t.ts:4", method: "EGFR pharmDx immunohistochemistry companion diagnostic assay" },
  { id: "pcr-kit", name: "cobas EGFR", isTest: true, technologies: [], targets: ["egfr"], drugs: ["osimertinib"], companies: [], where: "t.ts:5", method: "cobas EGFR real-time PCR mutation test" },
];
const rows: TestRowLite[] = [
  { id: "signatera-row", name: "Natera Signatera", drugId: "signatera", companyId: "natera", scope: "mrd", technologies: ["mrd-testing", "wes-wgs"], where: "tt.ts:1" },
  { id: "radar-row", name: "NeoGenomics RaDaR", drugId: "radar", companyId: "neogenomics", scope: "mrd", technologies: ["mrd-testing"], where: "tt.ts:2" },
];
const route = { biomarker: (id: string) => `/biomarkers/${id}/`, product: (id: string) => `/drugs/${id}/` };

describe("classes 3, 4 and 6 on a biomarker page", () => {
  const mrd: BiomarkerLite = { id: "ctdna-mrd-positive", name: "ctDNA MRD positivity", measurement: "ctdna-detection", drugs: ["signatera", "oncodetect"], tests: ["signatera-row", "radar-row"], assays: ["signatera-mrd"], thresholdDrugs: [], where: "b.ts:1" };
  const f = detectBiomarkerGaps([mrd], rows, [{ id: "signatera-mrd", name: "Signatera (tumour-informed ctDNA MRD)", vendor: "Natera", where: "a.ts:1" }], products, idx, route);
  it("reports a test record linked from the readout that its Tests box cannot show", () => {
    expect(f.find((x) => x.rule === "test-record-not-in-tests-box")).toMatchObject({ suggestedId: "oncodetect", page: "/biomarkers/ctdna-mrd-positive/#tests" });
  });
  it("reports a tests row whose record does not link back, grouped per test page", () => {
    const one = groupOneWay(f).filter((x) => x.cls === "one-way");
    expect(one).toHaveLength(1);
    expect(one[0]).toMatchObject({ page: "/drugs/radar/", suggestedId: "radar" });
  });
  it("reports one product shown twice in the box", () => {
    const d = groupDuplicatePills(f).filter((x) => x.cls === "duplicate");
    expect(d).toHaveLength(1);
    expect(d[0].subject).toBe("Signatera (tumour-informed ctDNA MRD) / Natera Signatera");
  });
  it("offers a companion test only when its platform can read the readout", () => {
    const mut: BiomarkerLite = { id: "egfr-l858r", name: "EGFR L858R", target: "egfr", measurement: "sequencing-variant", drugs: [], tests: [], assays: [], thresholdDrugs: ["osimertinib"], where: "b.ts:2" };
    const g = detectBiomarkerGaps([mut], rows, [], products, idx, route).filter((x) => x.rule === "cdx-for-threshold-drug-missing");
    expect(g.map((x) => x.suggestedId)).toEqual(["pcr-kit"]);
  });
});

describe("class 3 and 4 against a row's own record", () => {
  it("reports a row whose record lacks the row's company or technology", () => {
    const f = detectRowRecordMismatch(rows, new Map(products.map((p) => [p.id, p])), { product: (id) => `/drugs/${id}/`, company: (id) => `/companies/${id}/`, technology: (id) => `/technologies/${id}/` }, (id) => ["natera", "neogenomics", "mrd-testing", "wes-wgs"].includes(id));
    expect(f.map((x) => x.rule).sort()).toEqual(["row-company-not-on-record", "row-technology-not-on-record"]);
  });
});

describe("class 5: companies with no products", () => {
  it("reports a company whose text or side tables name products it has no records for", () => {
    const f = detectCompaniesWithoutProducts([
      { id: "personalis", name: "Personalis", companyType: "diagnostics", text: "Sequencing laboratory.", productCount: 0, where: "c.ts:1" },
      { id: "acme", name: "Acme Bio", companyType: "biotech", text: "Its lead is ACME-101.", productCount: 0, where: "c.ts:2" },
      { id: "held", name: "Held", companyType: "biotech", text: "Its lead is RMC-6236.", productCount: 0, where: "c.ts:3" },
      { id: "busy", name: "Busy", companyType: "biotech", text: "Its lead is BUSY-101.", productCount: 2, where: "c.ts:4" },
      { id: "fund", name: "Fund", companyType: "investor", text: "Backs FUND-101.", productCount: 0, where: "c.ts:5" },
    ], new Map([["personalis", ["Personalis NeXT Personal"]]]), idx, (id) => `/companies/${id}/`);
    expect(f.map((x) => [x.subject, x.confidence])).toEqual([["Personalis", "high"], ["Acme Bio", "medium"]]);
  });
  it("reports a company that names a held product which does not name the company", () => {
    const f = detectCompanyUnlinkedProducts([{ id: "revolution", name: "Revolution", companyType: "biotech", text: "Lead RMC-6236.", productCount: 0, where: "c.ts:1", productIds: [] }], idx, new Map([["rmc-6236", []]]), { company: (id) => `/companies/${id}/`, product: (id) => `/drugs/${id}/` });
    expect(f[0]).toMatchObject({ rule: "company-text-names-unlinked-product", suggestedId: "rmc-6236", confidence: "high" });
  });
});

describe("class 6: one product twice in one list", () => {
  it("pairs a record with its use-specific twin, not two assays that differ only in brackets", () => {
    const f = detectDuplicateItems([{ page: "/companies/roche-genentech/", section: "Products", items: [
      { id: "bevacizumab", name: "Bevacizumab" }, { id: "bevacizumab-glioma", name: "Bevacizumab (glioblastoma use)" },
      { id: "sp142", name: "VENTANA PD-L1 (SP142) Assay" }, { id: "sp263", name: "VENTANA PD-L1 (SP263) Assay" },
    ] }]);
    expect(f.map((x) => x.pair)).toEqual([["bevacizumab", "bevacizumab-glioma"]]);
  });
  it("tells one product from two", () => {
    expect(sameProduct("Signatera (tumour-informed ctDNA MRD)", "Natera Signatera")).toBe(true);
    expect(sameProduct("FoundationOne CDx", "FoundationOne Liquid CDx")).toBe(false);
    // Two antibody clones, two products: the brackets are the only place the names differ.
    expect(sameProduct("VENTANA PD-L1 (SP142) Assay", "VENTANA PD-L1 (SP263) Assay")).toBe(false);
    expect(sameProduct("VENTANA PD-L1 (SP263) Assay", "Ventana PD-L1 (SP263) Assay")).toBe(true);
  });
});

describe("ranking", () => {
  it("puts the gap that touches most pages first, then the more certain", () => {
    const f = (subject: string, pages: string[], confidence: Finding["confidence"]): Finding => ({ cls: "side-table", rule: "r", page: pages[0], pages, where: "", subject, confidence, detail: "" });
    expect(rank([f("a", ["/1/"], "high"), f("b", ["/1/", "/2/"], "medium"), f("c", ["/1/"], "medium")]).map((x) => x.subject)).toEqual(["b", "a", "c"]);
  });
});
