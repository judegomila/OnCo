import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { catalysts } from "@/data/catalysts";
import { deals } from "@/data/deals";
import { exclusivity } from "@/data/exclusivity";
import { manufacturingSites } from "@/data/manufacturing";
import { settingShares } from "@/data/setting-shares";
import { companyFinancials } from "@/data/company-financials";
import { SPONSOR_PATTERNS, resolveSponsor } from "@/data/sponsor-aliases";
import { estimate, parsePct, incidence } from "./market";
import { foldLine, periodStart, quarterOf, sortKey, toIcs } from "./ics";
import { calendar } from "@/data/calendar";

/** Every id a side file points at must resolve in the graph, so the pages never render a dead chip. */
describe("investor side data resolves against the graph", () => {
  const g = graph();
  const must = (id: string, where: string) => expect(g.get(id), `${where}: ${id}`).toBeDefined();
  const isKind = (id: string, kind: string, where: string) => expect(g.get(id)?.kind, `${where}: ${id}`).toBe(kind);

  it("catalysts", () => {
    const ids = new Set<string>();
    for (const c of catalysts) {
      expect(ids.has(c.id), c.id).toBe(false); ids.add(c.id);
      c.companies.forEach((id) => isKind(id, "company", c.id));
      c.drugs.forEach((id) => isKind(id, "drug", c.id));
      c.refs.forEach((id) => must(id, c.id));
      expect(c.source.startsWith("https://"), c.id).toBe(true);
      expect(/^\d{4}(-\d{2}(-\d{2})?|-Q[1-4])?$/.test(c.date), c.id).toBe(true);
    }
    // Do not duplicate calendar entries; the page merges both lists.
    for (const c of catalysts) for (const e of calendar) expect(c.title, c.id).not.toBe(e.title);
  });

  it("deals", () => {
    const ids = new Set<string>();
    for (const d of deals) {
      expect(ids.has(d.id), d.id).toBe(false); ids.add(d.id);
      if (d.from.id) isKind(d.from.id, "company", d.id); else expect(d.from.country, d.id).toMatch(/^[A-Z]{2}$/);
      if (d.to.id) isKind(d.to.id, "company", d.id); else expect(d.to.country, d.id).toMatch(/^[A-Z]{2}$/);
      d.assets.forEach((id) => isKind(id, "drug", d.id));
      (d.refs ?? []).forEach((id) => must(id, d.id));
      expect(d.source.startsWith("https://"), d.id).toBe(true);
    }
  });

  it("exclusivity", () => {
    for (const e of exclusivity) {
      isKind(e.drugId, "drug", "exclusivity");
      for (const r of e.rows) { expect(r.year).toBeGreaterThan(2000); expect(r.source.startsWith("https://")).toBe(true); }
      expect(e.rows.length + e.entrants.length, e.drugId).toBeGreaterThan(0);
    }
  });

  it("manufacturing sites", () => {
    for (const s of manufacturingSites) {
      if (s.operatorId) isKind(s.operatorId, "company", s.id);
      s.customers.forEach((id) => isKind(id, "company", s.id));
      (s.drugs ?? []).forEach((id) => isKind(id, "drug", s.id));
      if (s.bottleneckId) isKind(s.bottleneckId, "bottleneck", s.id);
      expect(Math.abs(s.lat)).toBeLessThanOrEqual(90);
      expect(Math.abs(s.lng)).toBeLessThanOrEqual(180);
    }
  });

  it("setting shares and financials", () => {
    for (const s of settingShares) {
      isKind(s.cancerId, "cancer", "setting-shares");
      for (const x of s.settings) { expect(x.share[0]).toBeLessThanOrEqual(x.share[1]); expect(x.share[1]).toBeLessThanOrEqual(1); }
      if (s.subtypeShare) expect(s.subtypeShare.share[0]).toBeLessThanOrEqual(s.subtypeShare.share[1]);
    }
    for (const f of companyFinancials) {
      isKind(f.companyId, "company", "financials");
      for (const p of f.topProducts) if (p.drugId) isKind(p.drugId, "drug", `${f.companyId} ${p.name}`);
    }
  });

  it("sponsor aliases point at real ids and resolve the common sponsors", () => {
    for (const [, t] of SPONSOR_PATTERNS) if (t.id) must(t.id, `sponsor alias ${t.label}`);
    expect(resolveSponsor("Merck Sharp & Dohme LLC").id).toBe("merck");
    expect(resolveSponsor("Hoffmann-La Roche").id).toBe("roche-genentech");
    expect(resolveSponsor("Kite, A Gilead Company").id).toBe("gilead");
    expect(resolveSponsor("Children's Oncology Group").id).toBe("childrens-oncology-group");
    expect(resolveSponsor("Some Unknown Biotech Ltd").matched).toBe(false);
  });
});

describe("market arithmetic", () => {
  it("parses prevalence strings into ranges", () => {
    expect(parsePct("15-20")).toEqual([15, 20]);
    expect(parsePct(">95")).toEqual([95, 100]);
    expect(parsePct("<1")).toEqual([0, 1]);
    expect(parsePct("~25 adults; ~3 children")).toEqual([20, 30]);
    expect(parsePct(100)).toEqual([100, 100]);
    expect(parsePct("n/a")).toBeNull();
  });
  it("multiplies the factors and keeps low below high", () => {
    const e = estimate(100_000, [10, 20], [0.5, 0.7], [0.1, 0.15]);
    expect(e.low).toBe(500);
    expect(e.high).toBe(2100);
  });
  it("finds world incidence for mapped cancers and none for unmapped ones", () => {
    expect(incidence("tnbc", "WORLD")).toBeGreaterThan(1_000_000);
    expect(incidence("sarcoma", "WORLD")).toBeNull();
    expect(incidence("prostate", "USA")).toBeGreaterThan(100_000);
  });
});

describe("ics", () => {
  it("handles fuzzy dates", () => {
    expect(periodStart("2026-Q4")).toBe("2026-10-01");
    expect(periodStart("2027")).toBe("2027-01-01");
    expect(quarterOf("2026-11-03")).toBe("2026-Q4");
    expect(sortKey("2026-Q4") > sortKey("2026-11-30")).toBe(true);
  });
  it("folds long lines and writes a valid skeleton", () => {
    const long = "SUMMARY:" + "x".repeat(200);
    const folded = foldLine(long).split("\r\n");
    expect(folded.length).toBeGreaterThan(1);
    for (const l of folded) expect(new TextEncoder().encode(l).length).toBeLessThanOrEqual(75);
    const ics = toIcs([{ uid: "t", date: "2026-Q4", summary: "Test, with; punctuation", description: "line1\nline2" }], { name: "Test", stamp: new Date("2026-09-09T00:00:00Z") });
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics).toContain("DTSTART;VALUE=DATE:20261001");
    expect(ics).toContain("SUMMARY:Expected Q4 2026: Test\\, with\\; punctuation");
    expect(ics.trimEnd().endsWith("END:VCALENDAR")).toBe(true);
  });
});
