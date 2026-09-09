import { describe, expect, it } from "vitest";
import { REGION_COUNTRIES, referralRouteFor, referralRoutes, regionForCountry } from "@/data/referral-routes";
import { REGIONS } from "@/data/regional-approvals";

const HTTPS = /^https:\/\//;

describe("referral routes", () => {
  it("covers every region exactly once", () => {
    expect(referralRoutes.map((r) => r.region).sort()).toEqual([...REGIONS].sort());
    for (const r of REGIONS) expect(referralRouteFor(r)?.region).toBe(r);
  });

  it("every region has at least three steps, one source and a cost line", () => {
    for (const r of referralRoutes) {
      expect(r.howItWorks.length, r.region).toBeGreaterThanOrEqual(3);
      expect(r.sources.length, r.region).toBeGreaterThanOrEqual(1);
      expect(r.cost.length, r.region).toBeGreaterThan(20);
      expect(r.asOf).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("every URL is https", () => {
    for (const r of referralRoutes) {
      for (const s of r.sources) expect(s.url, `${r.region} ${s.label}`).toMatch(HTTPS);
      for (const s of r.remoteReview) expect(s.url, `${r.region} ${s.name}`).toMatch(HTTPS);
    }
  });

  it("no em-dashes in copy", () => {
    const text = JSON.stringify(referralRoutes);
    expect(text.includes("—")).toBe(false);
  });

  it("maps countries to regions without overlap", () => {
    const seen = new Set<string>();
    for (const list of Object.values(REGION_COUNTRIES)) for (const c of list) { expect(seen.has(c), c).toBe(false); seen.add(c); }
    expect(regionForCountry("GB")).toBe("UK");
    expect(regionForCountry("DE")).toBe("EU");
    expect(regionForCountry("US")).toBe("US");
    expect(regionForCountry("ZZ")).toBeUndefined();
  });
});
