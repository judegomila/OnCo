import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { REGIONS, approvedRegions, hasAnchorApproval, isDiagnostic, regionSpecific, regionalApprovals, type Region } from "./regional-approvals";

const APPROVED = new Set(["approved", "standard-of-care"]);

describe("regional approvals", () => {
  const g = graph();
  const approved = g.kind("drug").filter((d) => APPROVED.has(d.status ?? "") && !isDiagnostic(d.modality));

  it("every approved product has a regional row with a US or EU verdict, unless it is approved only elsewhere", () => {
    const missing = approved.filter((d) => !regionalApprovals[d.id] && !hasAnchorApproval(d)).map((d) => d.id);
    expect(missing, `approved products without a regional row: ${missing.join(", ")}`).toEqual([]);
    const noAnchor = approved.filter((d) => { const row = regionalApprovals[d.id]; return row && !row.US && !row.EU && !regionSpecific(row); }).map((d) => d.id);
    expect(noAnchor, `approved products with neither a US nor an EU row: ${noAnchor.join(", ")}`).toEqual([]);
  });

  it("every row names a product in the corpus and uses known regions", () => {
    for (const [id, row] of Object.entries(regionalApprovals)) {
      expect(g.get(id)?.kind, `${id} is not a drug in the corpus`).toBe("drug");
      for (const r of Object.keys(row)) expect(REGIONS.includes(r as Region), `${id}: unknown region ${r}`).toBe(true);
    }
  });

  it("approved and conditional entries carry a plausible year and sources are https URLs", () => {
    const thisYear = new Date().getFullYear();
    for (const [id, row] of Object.entries(regionalApprovals)) {
      for (const r of REGIONS) {
        const e = row[r]; if (!e) continue;
        if (e.year !== undefined) { expect(e.year, `${id} ${r} year`).toBeGreaterThanOrEqual(1940); expect(e.year, `${id} ${r} year`).toBeLessThanOrEqual(thisYear); }
        if (e.source) expect(e.source.startsWith("https://"), `${id} ${r} source ${e.source}`).toBe(true);
        if (e.verified) expect(e.verifiedOn, `${id} ${r} verified without a date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });

  it("an approved product's first year is never after a later region's year for the same product when the note says it was first", () => {
    for (const [id, row] of Object.entries(regionalApprovals)) {
      for (const r of approvedRegions(row)) {
        const e = row[r]!;
        if (!e.note?.toLowerCase().includes("first approval globally") && !e.indication?.toLowerCase().includes("first approval globally")) continue;
        const others = approvedRegions(row).filter((o) => o !== r && row[o]?.year !== undefined).map((o) => row[o]!.year!);
        for (const y of others) expect(e.year !== undefined && e.year <= y, `${id}: ${r} is noted as first but ${e.year} is after another region's ${y}`).toBe(true);
      }
    }
  });
});
