import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { regionalApprovals } from "../src/data/regional-approvals";
import { APPLIED_PATH, type AppliedSnapshot } from "./apply-proposals";
import { readJson } from "./feed-utils";
import { fetchEparPage, quotedStatus } from "./lib/ema-page";
import { hasRow, readRegionalApprovals, rowBody, sourceExpr } from "./lib/regional-approvals-io";

const snap = existsSync(APPLIED_PATH) ? readJson<AppliedSnapshot>(APPLIED_PATH) : null;
const rows = snap?.rows ?? [];
/** Set by .github/workflows/propose.yml after --apply: re-read every applied row's register page (cached) and compare. */
const VERIFY = !!process.env.ONCO_VERIFY_APPLIED;

describe("applied proposal rows (public/proposals/applied.json)", () => {
  it.skipIf(!snap)("every applied row is still a row of regional-approvals.ts that cites its register page", () => {
    const parsed = readRegionalApprovals();
    for (const r of rows) {
      expect(hasRow(parsed, r.key), `${r.key} missing from the file`).toBe(true);
      expect(rowBody(parsed, r.key), `${r.key} does not cite ${r.sourceUrl}`).toContain(sourceExpr(r.sourceUrl));
      expect(r.quotedStatus.length, `${r.key} has no quoted status`).toBeGreaterThan(0);
    }
  });

  it.skipIf(!VERIFY || !snap)("every applied row's source page returns the quoted status and the file holds that status", async () => {
    for (const r of rows) {
      expect(regionalApprovals[r.drugId]?.EU?.status, `${r.drugId} EU status`).toBe(r.status);
      const page = await fetchEparPage(r.sourceUrl);
      expect(page, `${r.sourceUrl} unreachable`).not.toBeNull();
      expect(page!.status, `${r.drugId}: page status`).toBe(r.pageStatus);
      expect(quotedStatus(page!), `${r.drugId}: status line`).toBe(r.quotedStatus);
    }
  }, 120_000);
});
