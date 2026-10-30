import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { PRODUCT_CLASS_META, productClass, productLabel, type ProductClass } from "./product-class";
import { placeholderKind } from "@/components/MoleculeSlot";
import { tests } from "@/data/tests";
import { mcedTests } from "@/data/mced-census-tests";

const g = graph();
const drugs = g.kind("drug");
const cls = (id: string) => productClass(g.must(id));

describe("product class", () => {
  it("names the tests the owner and the brief name as tests", () => {
    for (const id of ["signatera", "galleri", "cancerguard", "guardant-reveal", "oncodetect"]) expect(cls(id), id).toBe("test");
  });

  it("calls a PSMA PET tracer an imaging agent", () => {
    for (const id of ["pylarify", "illuccix", "locametz", "ga68-psma-11"]) expect(cls(id), id).toBe("imaging-agent");
  });

  it("keeps medicines, including radioligand and theranostic therapies, as medicines", () => {
    for (const id of ["pembrolizumab", "trastuzumab-deruxtecan", "pluvicto", "fap-2286", "tar-200", "cetuximab-sarotalocan", "osimertinib"]) expect(cls(id), id).toBe("medicine");
  });

  it("calls the tumour-treating-fields device and diagnostic software devices", () => {
    expect(cls("optune")).toBe("device");
    expect(cls("transpara")).toBe("device");
  });

  it("classes every record in the two test files as something other than a medicine", () => {
    const ids = [...tests, ...mcedTests].filter((e) => e.kind === "drug").map((e) => e.id);
    expect(ids.length).toBeGreaterThan(20);
    const wrong = ids.filter((id) => cls(id) === "medicine");
    expect(wrong, `classed as medicines: ${wrong.join(", ")}`).toEqual([]);
  });

  it("matches whole words only: a modality that merely contains a fragment stays a medicine", () => {
    expect(productClass({ modality: "Oral benzimidazole anthelmintic for human worm infections, tested in two small cancer trials" })).toBe("medicine");
    expect(productClass({ modality: "Small-molecule competitive inhibitor" })).toBe("medicine");
    expect(productClass({ modality: "Petasin analogue" })).toBe("medicine");
    expect(productClass({ modality: "Theranostic pair (peptide radioligand)" })).toBe("medicine");
    expect(productClass({ modality: "Intravesical drug-eluting device" })).toBe("medicine");
  });

  it("labels a test's page a test and a medicine's page by its kind", () => {
    expect(productLabel(g.must("signatera"))).toBe("Test");
    expect(productLabel(g.must("pylarify"))).toBe("Imaging agent");
    expect(productLabel(g.must("pembrolizumab"))).toBeUndefined();
    expect(productLabel(g.must("her2"))).toBeUndefined();
  });

  it("shares the rule with the molecule placeholder, so a test never reads as a drug there", () => {
    for (const d of drugs) {
      const c = productClass(d);
      const p = placeholderKind(d.modality);
      if (c === "test" || c === "device") expect(p.id, d.id).toBe(c);
      if (c === "imaging-agent") expect(p.id, d.id).toBe("imaging");
      if (c === "medicine") expect(["test", "device", "imaging"], d.id).not.toContain(p.id);
    }
  });

  // Read the list with: npx vitest run src/lib/product-class.test.ts --reporter=verbose
  it("lists every product that is not a medicine, for a reader to check by hand", () => {
    const by = new Map<ProductClass, string[]>();
    for (const d of drugs) {
      const c = productClass(d);
      if (c === "medicine") continue;
      by.set(c, [...(by.get(c) ?? []), `${d.id} (${d.modality})`]);
    }
    const lines = [...by].flatMap(([c, ids]) => [`${PRODUCT_CLASS_META[c].group}: ${ids.length}`, ...ids.map((s) => `  ${s}`)]);
    console.log(`Products that are not medicines, of ${drugs.length}:\n${lines.join("\n")}`);
    // A floor, not a ceiling: the list should only grow as tests are added. 92 on 30 October 2026.
    expect([...by.values()].flat().length).toBeGreaterThanOrEqual(90);
  });
});
