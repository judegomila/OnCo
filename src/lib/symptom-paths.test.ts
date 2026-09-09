import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { SYMPTOM_PATHS, SYMPTOM_GROUPS } from "@/data/symptom-paths";

describe("symptom paths", () => {
  const g = graph();

  it("has about 40 symptoms with unique ids", () => {
    expect(SYMPTOM_PATHS.length).toBeGreaterThanOrEqual(38);
    expect(new Set(SYMPTOM_PATHS.map((s) => s.id)).size).toBe(SYMPTOM_PATHS.length);
    for (const s of SYMPTOM_PATHS) expect(s.id, s.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("every symptom has at least one cancer, one test, red flags and a source URL", () => {
    for (const s of SYMPTOM_PATHS) {
      expect(s.cancers.length, s.id).toBeGreaterThan(0);
      expect(s.tests.length, s.id).toBeGreaterThan(0);
      expect(s.redFlags.length, s.id).toBeGreaterThan(0);
      expect(s.referral.sources.length, s.id).toBeGreaterThan(0);
      for (const src of s.referral.sources) expect(src.url, `${s.id}: ${src.label}`).toMatch(/^https:\/\//);
      expect(s.referral.uk.length, s.id).toBeGreaterThan(40);
      expect(s.referral.us.length, s.id).toBeGreaterThan(40);
      expect(SYMPTOM_GROUPS, s.id).toContain(s.group);
    }
  });

  it("every referenced id resolves to an entity of the right kind", () => {
    for (const s of SYMPTOM_PATHS) {
      for (const id of s.cancers) expect(g.must(id).kind, `${s.id} -> ${id}`).toBe("cancer");
      for (const id of s.tests) expect(g.must(id).kind, `${s.id} -> ${id}`).toBe("technology");
      for (const id of s.terms ?? []) expect(g.must(id).kind, `${s.id} -> ${id}`).toBe("term");
    }
  });

  it("uses no em-dashes in reader-facing copy", () => {
    for (const s of SYMPTOM_PATHS) {
      const text = [s.label, s.plain, s.firstTest, s.referral.uk, s.referral.us, ...s.redFlags].join(" ");
      expect(text, s.id).not.toMatch(/—/);
    }
  });
});
