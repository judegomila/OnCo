import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { readField, REPORT_FIELDS, REPORT_FORMS, ruleMatches } from "@/data/report-fields";

describe("report fields", () => {
  const g = graph();

  it("covers about 60 fields across six forms with unique ids", () => {
    expect(REPORT_FIELDS.length).toBeGreaterThanOrEqual(58);
    expect(REPORT_FORMS.length).toBe(6);
    expect(new Set(REPORT_FIELDS.map((f) => f.id)).size).toBe(REPORT_FIELDS.length);
    for (const form of REPORT_FORMS) expect(REPORT_FIELDS.filter((f) => f.form === form.id).length, form.id).toBeGreaterThanOrEqual(8);
  });

  it("every field has a resolving glossary term, a source URL and at least one reading", () => {
    for (const f of REPORT_FIELDS) {
      expect(g.must(f.termId).kind, `${f.id} -> ${f.termId}`).toBe("term");
      expect(f.source.url, f.id).toMatch(/^https:\/\//);
      expect(f.readings.length, f.id).toBeGreaterThan(0);
      for (const r of f.readings) expect(r.means.length, f.id).toBeGreaterThan(20);
      // Select fields: every option produces a reading.
      if (f.input.kind === "select") for (const o of f.input.options) expect(readField(f, o.value), `${f.id}=${o.value}`).toBeDefined();
      // Text fields: any value produces a reading.
      if (f.input.kind === "text") expect(readField(f, "anything"), f.id).toBeDefined();
      // Number fields: min, max and midpoint all produce a reading.
      if (f.input.kind === "number") for (const v of [f.input.min ?? 0, f.input.max ?? 100, ((f.input.min ?? 0) + (f.input.max ?? 100)) / 2]) expect(readField(f, String(v)), `${f.id}=${v}`).toBeDefined();
    }
  });

  it("every form's cancers resolve", () => {
    for (const form of REPORT_FORMS) for (const id of form.cancers) expect(g.must(id).kind, `${form.id} -> ${id}`).toBe("cancer");
  });

  it("applies the stated cut-offs", () => {
    const ki67 = REPORT_FIELDS.find((f) => f.id === "breast-ki67")!;
    expect(readField(ki67, "5")?.means).toMatch(/low/);
    expect(readField(ki67, "12")?.means).toMatch(/not reliable/);
    expect(readField(ki67, "30")?.means).toMatch(/high/);
    const er = REPORT_FIELDS.find((f) => f.id === "breast-er")!;
    expect(readField(er, "0")?.means).toMatch(/negative/);
    expect(readField(er, "5")?.means).toMatch(/low positive/);
    expect(readField(er, "80")?.means).toMatch(/ER positive/);
    const tps = REPORT_FIELDS.find((f) => f.id === "lung-pdl1")!;
    expect(readField(tps, "0")?.means).toMatch(/negative/);
    expect(readField(tps, "49")?.means).toMatch(/1% to 49%/);
    expect(readField(tps, "50")?.means).toMatch(/50% or higher/);
    const bcr = REPORT_FIELDS.find((f) => f.id === "prostate-psa-post-op")!;
    expect(readField(bcr, "0.19")?.means).toMatch(/Below 0.2/);
    expect(readField(bcr, "0.2")?.means).toMatch(/biochemical recurrence/);
    const deauville = REPORT_FIELDS.find((f) => f.id === "lym-deauville")!;
    expect(readField(deauville, "3")?.means).toMatch(/complete metabolic response/);
    expect(readField(deauville, "4")?.means).toMatch(/Score 4/);
    expect(readField(REPORT_FIELDS.find((f) => f.id === "breast-her2-ihc")!, "1")?.means).toMatch(/HER2-low/);
    expect(readField(ki67, "")).toBeUndefined();
    expect(readField(ki67, "abc")).toBeUndefined();
  });

  it("rule matching handles bounds and equality", () => {
    expect(ruleMatches({ lte: 5 }, 5)).toBe(true);
    expect(ruleMatches({ lte: 5 }, 5.1)).toBe(false);
    expect(ruleMatches({ gte: 30 }, 29.9)).toBe(false);
    expect(ruleMatches({ eq: 4 }, 4)).toBe(true);
    expect(ruleMatches({ eq: "a" }, "a")).toBe(true);
    expect(ruleMatches({ in: ["a", "b"] }, "c")).toBe(false);
    expect(ruleMatches({ any: true }, "whatever")).toBe(true);
    expect(ruleMatches({}, 3)).toBe(false);
  });

  it("uses no em-dashes in reader-facing copy", () => {
    for (const f of REPORT_FIELDS) {
      const text = [f.label, f.hint ?? "", ...f.readings.flatMap((r) => [r.means, r.changes ?? ""])].join(" ");
      expect(text, f.id).not.toMatch(/—/);
    }
  });
});
