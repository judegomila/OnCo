import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { pathwayView } from "./pathway-products";
import { productClass } from "./product-class";

describe("pathway product illustration", () => {
  it("offers medicines that act on targets while leaving diagnostic measurements out of treatment highlighting", () => {
    const g = graph();
    for (const pathway of g.kind("pathway")) {
      for (const product of pathwayView(pathway).products) {
        const record = g.must(product.id);
        expect(record.kind).toBe("drug");
        if (record.kind === "drug") expect(productClass(record), record.id).toBe("medicine");
      }
    }
    const pathway = g.must("ras-mapk");
    if (pathway.kind !== "pathway") throw new Error("Expected a pathway");
    expect(pathwayView(pathway).products.some(product => product.id === "adagrasib")).toBe(true);
  });
});
