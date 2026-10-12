import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { graph } from "@/lib/graph";
import { phaseLabel } from "@/lib/kinds";
import { ucsfBreastTrials } from "./ucsf-breast-trials";

const rows = readFileSync("docs/audits/ucsf-breast-2026-10-10.csv", "utf8").trim().split(/\r?\n/).slice(1).map((line) => {
  const [nct, id, coverage, localOpen, status, studyType, phases] = line.split(",");
  return { nct, id, coverage, localOpen, status, studyType, phases };
});

describe("dated UCSF female/adult breast inventory", () => {
  it("resolves every source NCT to an existing or new canonical record linked to UCSF", () => {
    const g = graph();
    expect(rows).toHaveLength(120);
    expect(new Set(rows.map((r) => r.nct)).size).toBe(120);
    expect(rows.filter((r) => r.localOpen === "true")).toHaveLength(47);
    const institution = g.must("ucsf");
    for (const row of rows) {
      const matches = g.kind("trial").filter((t) => t.nct === row.nct);
      expect(matches.map((t) => t.id), row.nct).toContain(row.id);
      // The existing I-SPY 2 and 2.2 programme pages intentionally share a platform registry ID.
      if (row.coverage === "added") expect(matches, row.nct).toHaveLength(1);
      expect(institution.trials, row.nct).toContain(row.id);
    }
  });

  it("keeps no-phase interventional and expanded-access records distinct from observational designs", () => {
    for (const record of ucsfBreastTrials) {
      const row = rows.find((r) => r.nct === record.nct)!;
      if (row.studyType === "OBSERVATIONAL") expect(record.phase).toBe("observational");
      else if (row.phases === "NA" || row.studyType === "EXPANDED_ACCESS") {
        expect(record.phase, row.nct).toBe("not-applicable");
        expect(phaseLabel(record.phase)).toBe("Phase not applicable");
      }
      expect(record.participation?.[0].overallStatus, row.nct).toBe(row.status);
      if (record.participation?.[0].enrolmentType === "ESTIMATED") expect(record.enrolled, row.nct).toBeUndefined();
    }
    expect(ucsfBreastTrials.find((t) => t.nct === "NCT06671912")?.status).toBeUndefined();
  });
});
