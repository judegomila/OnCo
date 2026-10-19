import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { approvedYearOf } from "@/lib/approved-year";
import { regionalApprovals } from "@/data/regional-approvals";

/**
 * Approval is recorded in two places: the per-region rows in src/data/regional-approvals.ts, which carry a
 * regulator source, and the `approvals` array on the drug record, which does not. The chip read only the first.
 * Measured on 19 October 2026: 486 drugs carry a US or EU approval on the record, 121 of those have no regional
 * row, and 34 of those showed no approval at all. /drugs/altretamine/ said "Established" and never mentioned the
 * 1990 FDA approval the corpus has held all along.
 */
describe("a product approved on its own record says so", () => {
  const g = graph();
  const majors = (d: { approvals?: Array<{ region: string; year?: number }> }) => (d.approvals ?? []).filter((a) => /^(US|EU|FDA|EMA)/i.test(a.region));

  it("reads the earliest US or EU year off the record", () => {
    expect(approvedYearOf(g.must("altretamine") as never)).toBe(1990);
    expect(approvedYearOf(g.must("i131-mibg") as never)).toBe(2018);
    expect(approvedYearOf({ approvals: [{ region: "Japan", year: 2020 }] }), "a non-major region is not a US/EU approval").toBeUndefined();
    expect(approvedYearOf({ approvals: [] })).toBeUndefined();
  });

  it("a withdrawn or historic product keeps the later fact, not the approval", () => {
    for (const id of ["abarelix", "aminoglutethimide"]) {
      const d = g.must(id) as { status?: string };
      expect(majors(g.must(id) as never).length, `${id} is approved on the record`).toBeGreaterThan(0);
      expect(["withdrawn", "historic"]).toContain(d.status);
    }
  });

  it("every drug approved on its record now shows an approval unless superseded", () => {
    const hidden = (g.kind("drug") as Array<{ id: string; status?: string; approvals?: Array<{ region: string; year?: number }> }>)
      .filter((d) => majors(d).length && !regionalApprovals[d.id]
        && !["approved", "standard-of-care", "withdrawn", "historic", "negative"].includes(d.status ?? "")
        && approvedYearOf(d) === undefined);
    expect(hidden.map((d) => d.id), "an approval with no year cannot be shown; record the year").toEqual([]);
  });
});
