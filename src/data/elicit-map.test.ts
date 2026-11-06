import { describe, expect, it } from "vitest";
import { companiesElicitMap } from "./companies-elicit-map";
import { graph } from "@/lib/graph";

describe("Elicit AI for Pharma coverage", () => {
  it("registers every new vendor once and cites primary oncology evidence", () => {
    const directory = graph().must("elicit-ai-for-pharma");
    expect(companiesElicitMap.length).toBe(11);
    for (const input of companiesElicitMap) {
      const vendor = graph().must(input.id);
      expect(vendor.kind).toBe("company");
      expect(vendor.asOf).toBe("2026-11-06");
      expect(directory.companies).toContain(input.id);
      expect(vendor.links.some((link) => !link.url.includes("elicit.com"))).toBe(true);
    }
  });
  it("keeps the publisher and source directory as distinct linked objects", () => {
    const publisher = graph().must("elicit");
    const directory = graph().must("elicit-ai-for-pharma");
    expect(publisher.kind).toBe("company");
    expect(directory.kind).toBe("collection");
    expect(publisher.related).toContain(directory.id);
    expect(directory.companies).toContain(publisher.id);
    if (directory.kind === "collection") {
      expect(directory.url).toBe("https://elicit.com/ai-for-pharma");
      expect(directory.license).toBeUndefined();
    }
  });

  it("links the five oncology-labelled vendors to their existing records", () => {
    const directory = graph().must("elicit-ai-for-pharma");
    for (const id of ["noetik", "tempus", "foundation-medicine", "triomics", "flatiron-health"]) {
      expect(graph().must(id).kind, id).toBe("company");
      expect(directory.companies, id).toContain(id);
      expect(graph().entities.filter((e) => e.id === id)).toHaveLength(1);
    }
  });
});
