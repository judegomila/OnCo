import { describe, expect, it } from "vitest";
import { EVIDENCE_TIERS, TARGET_ROLES } from "@/lib/kinds";
import { TABLE_PAGE } from "@/lib/static-tables";
import { GENOME_TABLE, genesFor, genomeHref, parseRole, parseTier, tableHref } from "./genome-hub";
import { genomeGenes, genomeHub, tierCounts } from "./tables/genome";

describe("gene hub deep links", () => {
  it("reads a role or tier by id or by the label the target browser writes, in any case", () => {
    expect(parseRole("drug-target")).toBe("drug-target");
    expect(parseRole("Drug target")).toBe("drug-target");
    expect(parseRole("biomarker or prognostic gene")).toBe("biomarker");
    expect(parseRole("kinase")).toBeNull();
    expect(parseRole(null)).toBeNull();
    expect(parseTier("approved-drug")).toBe("approved-drug");
    expect(parseTier("Driver by cohort analysis")).toBe("cohort-driver");
    expect(parseTier("")).toBeNull();
  });

  it("writes the hub's own links with ids and the table's with labels", () => {
    expect(genomeHref(null, null)).toBe("/targets/genome/");
    expect(genomeHref("dna-repair", null)).toBe("/targets/genome/?role=dna-repair");
    expect(genomeHref("dna-repair", "approved-drug")).toBe("/targets/genome/?role=dna-repair&evidence=approved-drug");
    expect(tableHref("dna-repair", "approved-drug")).toBe("/targets/?role=DNA+repair&evidence=Approved+drug");
    // A link the hub writes reads back to the same choice.
    for (const r of TARGET_ROLES) for (const t of EVIDENCE_TIERS) {
      const p = new URL(genomeHref(r, t), "https://onco.cc").searchParams;
      expect(parseRole(p.get("role"))).toBe(r);
      expect(parseTier(p.get("evidence"))).toBe(t);
    }
  });
});

describe("gene hub rows", () => {
  const genes = genomeGenes();
  const hub = genomeHub(genes);

  it("lists every graded gene once, sorted by symbol, with a page and its roles", () => {
    expect(genes.length).toBeGreaterThan(1000);
    expect(new Set(genes.map((g) => g.id)).size).toBe(genes.length);
    for (const g of genes) {
      expect(g.href, g.id).toMatch(/^\/targets\/[a-z0-9-]+\/$/);
      expect(g.roles.length || g.tier, g.id).toBeTruthy();
    }
    const symbols = genes.map((g) => g.symbol);
    expect(symbols).toEqual([...symbols].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })));
    // Plain JSON: what the file holds is what the page passes.
    expect(JSON.parse(JSON.stringify(genes))).toEqual(genes);
  });

  it("gives each role its first page, its whole count and its tier split, and points at the file", () => {
    expect(hub.more).toEqual({ total: genes.length, src: `/api/v1/tables/${GENOME_TABLE}.json` });
    expect(hub.sections.map((s) => s.role)).toEqual(TARGET_ROLES.filter((r) => genes.some((g) => g.roles.includes(r))));
    for (const s of hub.sections) {
      const own = genesFor(genes, s.role, null);
      expect(s.total, s.role).toBe(own.length);
      expect(s.genes, s.role).toEqual(own.slice(0, TABLE_PAGE));
      expect(Object.values(s.tiers).reduce((a, b) => a + b, 0), s.role).toBe(own.filter((g) => g.tier).length);
      for (const t of EVIDENCE_TIERS) expect(genesFor(genes, s.role, t).length, `${s.role} ${t}`).toBe(s.tiers[t] ?? 0);
    }
    expect(hub.sections.some((s) => s.total > TABLE_PAGE)).toBe(true);
    expect(hub.tiers).toEqual(tierCounts(genes));
    expect(Object.values(hub.tiers).reduce((a, b) => a + b, 0)).toBe(genes.filter((g) => g.tier).length);
  });
});
