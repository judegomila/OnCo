import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { auditCounts, RATCHETED_CHECKS, runAudit } from "../../scripts/audit";

/**
 * Audit ratchet. `npm run audit` has always reported contradictions; nothing stopped them coming back. These
 * counts are the floor at the last lowering and may fall, never rise. Lower them after a round with
 * `npx tsx scripts/audit.ts --write-floor`.
 *
 * Set on 19 October 2026, when high-severity findings had gone from 19 to 1 in a day: eighteen standard-of-care
 * rows that cited failed trials without saying so, and five trials whose stated hazard ratio contradicted their
 * own status. Both are at zero here, which is the point of writing the floor on the day rather than later.
 */
describe("audit ratchet", () => {
  const floor = JSON.parse(readFileSync("src/data/audit-floor.json", "utf8")) as { checks: Record<string, number> };
  const now = auditCounts(runAudit().findings);

  it.each(RATCHETED_CHECKS)("%s does not rise above its floor", (check) => {
    const limit = floor.checks[check];
    expect(limit, `${check} has no floor recorded; add one to src/data/audit-floor.json`).toBeDefined();
    expect(now[check], `${check} rose from ${limit} to ${now[check]}: fix the records, or say in the commit why the measure changed`).toBeLessThanOrEqual(limit);
  });

  it("holds the two that were cleared today at zero", () => {
    expect(floor.checks["soc-cites-dead"], "a treatment row citing a failed trial without saying so").toBe(0);
    expect(floor.checks["positive-hr-ge-1"], "a positive trial whose own hazard ratio says otherwise").toBe(0);
  });

  it("does not ratchet the checks that are mostly legitimate noise", () => {
    for (const noisy of ["future-year-in-text", "unsourced", "orphan", "duplicate-name", "name-collision-across-kinds"]) {
      expect(RATCHETED_CHECKS as readonly string[], `${noisy} would cry wolf`).not.toContain(noisy);
    }
  });
});
