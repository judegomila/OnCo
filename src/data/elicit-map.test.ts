import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { companiesElicitMap } from "./companies-elicit-map";
import { graph } from "@/lib/graph";

describe("Elicit AI for Pharma coverage", () => {
  it("registers every new vendor once and cites primary oncology evidence", () => {
    const directory = graph().must("elicit-ai-for-pharma");
    expect(companiesElicitMap.length).toBeGreaterThanOrEqual(11);
    for (const input of companiesElicitMap) {
      const vendor = graph().must(input.id);
      expect(vendor.kind).toBe("company");
      expect(vendor.asOf).toBe(input.asOf);
      expect(graph().entities.filter((e) => e.id === input.id)).toHaveLength(1);
      expect(directory.companies).toContain(input.id);
      expect(vendor.links.some((link) => !link.url.includes("elicit.com"))).toBe(true);
    }
  });
  it("accounts for each audited row and links the verified parent without duplicating it", () => {
    const audit = readFileSync(new URL("../../docs/elicit-market-map-audit-2026-11-06.md", import.meta.url), "utf8");
    const rows = audit.split("\n").filter((line) => line.startsWith("| ") && !line.startsWith("| ---") && !line.startsWith("| Map name"));
    const directory = graph().must("elicit-ai-for-pharma");
    expect(rows).toHaveLength(151);
    const cells = rows.map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
    expect(new Set(cells.map(([name]) => name)).size).toBe(rows.length);
    expect(cells.filter(([, status]) => status.startsWith("Candidate"))).toEqual([]);
    expect(cells.filter(([, status]) => status === "Added verified company").map(([, , id]) => id).sort())
      .toEqual(companiesElicitMap.map(({ id }) => id).sort());
    expect(cells.find(([name]) => name === "PPD Evidera")?.slice(1, 3))
      .toEqual(["Existing parent: service verified", "thermo-fisher"]);
    expect(directory.companies).toContain("thermo-fisher");
    expect(new Set(directory.companies).size).toBe(directory.companies.length);
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
