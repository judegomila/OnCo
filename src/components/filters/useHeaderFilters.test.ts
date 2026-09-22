import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { countOptions, passesFilter } from "./useHeaderFilters";
import { GuidelineConcordance, type ConcordanceRow } from "../GuidelineConcordance";
import { ManufacturingMap, type SiteRow } from "../ManufacturingMap";
import { AutoPulse } from "../AutoPulse";
import { PlanRankings } from "../PlanRankings";
import { CountryRanking, type CountryRow } from "../CountryRanking";
import { ScorecardTable, type ScorecardRow } from "../ScorecardTable";
import { ResearchRanking, type RankingRow } from "../ResearchRanking";
import { US_PLANS } from "@/data/coverage-rankings";

/**
 * Client tables that keep their own controls (a FacetSelect, a checkbox, a metric picker) now also filter from
 * their column headers, through `useHeaderFilters` and `FilterHead`. The header shares state with the existing
 * control where one exists (the same setter), so choosing a value in either place moves both. These tests check
 * the option counting and the pass rule the components use to hide rows, and that the converted components put
 * the header button (with aria-expanded) on their categorical columns and nowhere else.
 */
const router: AppRouterInstance = { push() {}, replace() {}, prefetch() {}, back() {}, forward() {}, refresh() {}, bfcacheId: "static" };
const render = (el: React.ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));
const heads = (html: string) => [...html.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => m[1]);
const filterHeads = (html: string) => heads(html).filter((h) => h.includes("data-column-filter"));
const nestedButtons = (html: string) => { let open = 0, bad = 0; for (const m of html.matchAll(/<(\/?)button[\s>]/g)) { if (m[1]) open--; else { if (open > 0) bad++; open++; } } return bad; };

describe("countOptions and passesFilter", () => {
  it("counts distinct values, flattens lists, skips blanks, labels and orders pills", () => {
    const opts = countOptions(["b", ["a", "b"], undefined, "", null, "c"], { labels: { a: "Alpha" }, order: ["c"] });
    expect(opts).toEqual([
      { value: "c", label: "c", count: 1 },
      { value: "b", label: "b", count: 2 },
      { value: "a", label: "Alpha", count: 1 },
    ]);
    expect(countOptions(["x", "y"], { labels: (v) => v.toUpperCase() }).map((o) => o.label)).toEqual(["X", "Y"]);
  });

  it("hides a row when none of its values is chosen and passes everything when nothing is chosen", () => {
    expect(passesFilter(undefined, ["a"])).toBe(true);
    expect(passesFilter([], ["a"])).toBe(true);
    expect(passesFilter(["a"], ["a", "b"])).toBe(true);
    expect(passesFilter(["c"], ["a", "b"])).toBe(false);
    expect(passesFilter(["c"], [])).toBe(false);
    const rows = [{ kind: "drug" }, { kind: "trial" }, { kind: "drug" }];
    expect(rows.filter((r) => passesFilter(["trial"], [r.kind]))).toHaveLength(1);
  });
});

describe("client tables with their own controls gain header filters", () => {
  it("GuidelineConcordance: cancer, every body's stance and the verdict filter from the header", () => {
    const rows: ConcordanceRow[] = [
      { key: "a", cancerId: "c1", cancerName: "Breast cancer", cancerRoute: "/cancers/c1/", setting: "first line", intervention: "Drug A", refs: [{ id: "d", name: "Drug A", route: "/drugs/d/" }], bodies: [{ body: "NCCN", stance: "preferred", recommendation: "yes", date: "2025-01", url: "https://example.org" }, { body: "NICE", stance: "not-recommended", recommendation: "no", date: "2025-02", url: "https://example.org" }] },
      { key: "b", cancerId: "c2", cancerName: "Lung cancer", cancerRoute: "/cancers/c2/", setting: "adjuvant", intervention: "Drug B", refs: [], bodies: [{ body: "ESMO", stance: "recommended", recommendation: "yes", date: "2024-06", url: "https://example.org" }] },
    ] as ConcordanceRow[];
    const html = render(createElement(GuidelineConcordance, { rows }));
    const labels = filterHeads(html).map((h) => h.match(/Filter by ([^"]+)"/)?.[1]);
    expect(labels).toEqual(["Cancer and setting", "NCCN", "ESMO", "NICE", "ASCO", "Verdict"]);
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain("Bodies disagree");
    expect(nestedButtons(html)).toBe(0);
  });

  it("ManufacturingMap: site (country), operator (ownership) and capabilities filter; free-text columns do not", () => {
    const sites: SiteRow[] = [
      { id: "s1", name: "Plant 1", operator: "Op", ownership: "cdmo", city: "Basel", country: "Switzerland", lat: 47.5, lng: 7.6, capabilities: ["adc-conjugation"], capacity: "x", customers: [], drugs: [], source: { label: "src", url: "https://example.org" } },
      { id: "s2", name: "Plant 2", operator: "Op2", operatorRoute: "/companies/op2/", ownership: "in-house", city: "Dublin", country: "Ireland", lat: 53.3, lng: -6.2, capabilities: ["biologics-drug-substance"], capacity: "y", customers: [], drugs: [], source: { label: "src", url: "https://example.org" } },
    ] as SiteRow[];
    const html = render(createElement(ManufacturingMap, { sites }));
    const labels = filterHeads(html).map((h) => h.match(/Filter by ([^"]+)"/)?.[1]);
    expect(labels).toEqual(["Site", "Operator", "Capabilities"]);
    expect(heads(html).find((h) => h.includes("Source"))).not.toContain("data-column-filter");
    expect(nestedButtons(html)).toBe(0);
  });

  it("AutoPulse: date (month), source and names filter from the header and share the toolbar's source state", () => {
    const snap = { fetched: "2026-09-20", feeds: [{ id: "f1", name: "Feed one", homepage: "https://example.org", url: "https://example.org/rss", kind: "news", ok: true, count: 2 }], items: [
      { feedId: "f1", title: "A story", url: "https://example.org/a", date: "2026-09-19", refs: ["drug-a"] },
      { feedId: "f1", title: "Another", url: "https://example.org/b", date: "2026-08-02", refs: [] },
    ] };
    const html = render(createElement(AutoPulse, { snap, refs: { "drug-a": { id: "drug-a", name: "Drug A (brand)", route: "/drugs/drug-a/", kind: "drug" } } as never }));
    const labels = filterHeads(html).map((h) => h.match(/Filter by ([^"]+)"/)?.[1]);
    expect(labels).toEqual(["Date", "Source", "Names"]);
    expect((html.match(/<tbody[^>]*>[\s\S]*?<\/tbody>/) ?? [""])[0].match(/<tr[\s>]/g)).toHaveLength(2);
    expect(nestedButtons(html)).toBe(0);
  });

  it("PlanRankings: the plan column filters by kind and the metric column by whether a figure is published; rank numbers come from the full ranking", () => {
    const html = render(createElement(PlanRankings, { rows: US_PLANS }));
    const labels = filterHeads(html).map((h) => h.match(/Filter by ([^"]+)"/)?.[1]);
    expect(labels?.[0]).toBe("Plan or insurer");
    expect(labels).toHaveLength(2);
    expect(html).toContain("Medicare Advantage");
    expect(nestedButtons(html)).toBe(0);
  });
});

describe("ResultsTable users whose toolbar facet had no column", () => {
  it("CountryRanking: a Region column carries the Region facet's filter", () => {
    const row = (code: string, name: string, w: number): CountryRow => ({ code, name, works: { "2021": w / 2, "2025": w }, total: w * 3, citedHigh: w / 10, oa: w, trials: 10, institutions: 1 });
    const rows = [row("US", "United States", 5000), row("DE", "Germany", 2000), row("CN", "China", 4000)];
    const html = render(createElement(CountryRanking, { rows, years: [2021, 2025] }));
    const head = heads(html).find((h) => h.includes("Region")) ?? "";
    expect(head).toContain('data-column-filter="label"');
    expect(head).toContain('aria-expanded="false"');
    expect(html).toContain("North America");
    expect(nestedButtons(html)).toBe(0);
  });

  it("ScorecardTable: Type and Country columns carry the facets, Regions filters from its header", () => {
    const row = (id: string, companyType: string, country: string, regions: string[]): ScorecardRow => ({ id, name: id, route: `/companies/${id}/`, country, companyType, rank: 1, score: 10, approved: 1, phase3: 0, early: 0, targets: 1, modalities: 1, regions, recentEvents: 0, registryTrials: 0, failures: 0, points: { approved: 6, phase3: 0, early: 0, targets: 2, modalities: 2, regions: regions.length, momentum: 0, trials: 0, failures: 0 } });
    const rows = [row("a", "pharma", "US", ["US", "EU"]), row("b", "biotech", "CH", [])];
    const html = render(createElement(ScorecardTable, { rows }));
    const labels = filterHeads(html).map((h) => h.match(/Filter by ([^"]+)"/)?.[1]);
    expect(labels).toEqual(["Type", "Country", "Regions"]);
    expect(html).toContain("Biotech");
    expect(nestedButtons(html)).toBe(0);
  });

  it("ResearchRanking: institutions filter by parent university and by five-year coverage", () => {
    const rows: RankingRow[] = [
      { key: "a", name: "Centre A", sub: "University X", works2024: 10, works2025: 12, cited2yr: 5, works5: 40, cited5: 100 },
      { key: "b", name: "Centre B", works2024: 3, works2025: 4, cited2yr: null, works5: null, cited5: null },
    ];
    const html = render(createElement(ResearchRanking, { rows, years: [2021, 2025], mode: "institution" }));
    const labels = filterHeads(html).map((h) => h.match(/Filter by ([^"]+)"/)?.[1]);
    expect(labels).toEqual(["Institution", "Works 2021 to 2025"]);
    expect(nestedButtons(html)).toBe(0);
  });
});
