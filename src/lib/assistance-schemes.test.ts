import { describe, expect, it } from "vitest";
import { ASSISTANCE_COUNTRIES, assistanceSchemes } from "@/data/assistance-schemes";

const HTTPS = /^https:\/\//;

describe("assistance schemes", () => {
  it("ids are unique and kebab-case", () => {
    const ids = assistanceSchemes.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("every scheme has an https url, a source and a valid asOf date", () => {
    for (const s of assistanceSchemes) {
      expect(s.url, s.id).toMatch(HTTPS);
      expect(s.source.url, s.id).toMatch(HTTPS);
      expect(s.source.label.length, s.id).toBeGreaterThan(3);
      expect(s.asOf, s.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(s.asOf)), s.id).toBe(false);
      expect(s.how.length, s.id).toBeGreaterThanOrEqual(1);
      expect(s.who.length, s.id).toBeGreaterThan(20);
      expect(s.what.length, s.id).toBeGreaterThan(20);
    }
  });

  it("covers the required countries", () => {
    const countries = new Set(assistanceSchemes.map((s) => s.country));
    for (const c of ["US", "GB", "EU", "AU", "JP", "CN", "CA"]) expect(countries.has(c), c).toBe(true);
    for (const c of countries) expect(ASSISTANCE_COUNTRIES[c], c).toBeTruthy();
  });

  it("no em-dashes in copy", () => {
    expect(JSON.stringify(assistanceSchemes).includes("—")).toBe(false);
  });
});
