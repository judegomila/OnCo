import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { cellValues, StaticTable, type StaticColumn, type StaticRow } from "./StaticTable";
import { readViewParams } from "@/lib/table-view";
import DealsPage from "@/app/deals/page";
import FundingPage from "@/app/funding/page";
import StatusPage from "@/app/status/page";

/**
 * Server-rendered pages hand StaticTable plain rows (strings, numbers, small link and chip objects) and it draws
 * the shared header filter on every categorical column. The owner's ask: every table on the site filters from
 * its headers. These tests check the pieces the conversions rely on: header buttons with aria-expanded, a filter
 * value hiding the rows that do not carry it, the URL form agreeing with what the header writes, and three of
 * the converted pages rendering their header filters with every row still in the markup.
 */
const router: AppRouterInstance = { push() {}, replace() {}, prefetch() {}, back() {}, forward() {}, refresh() {}, bfcacheId: "static" };
const render = (el: React.ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));
const bodyRows = (html: string) => (html.match(/<tbody[^>]*>[\s\S]*?<\/tbody>/g) ?? []).map((t) => (t.match(/<tr[\s>]/g) ?? []).length);
const nestedButtons = (html: string) => { let open = 0, bad = 0; for (const m of html.matchAll(/<(\/?)button[\s>]/g)) { if (m[1]) open--; else { if (open > 0) bad++; open++; } } return bad; };

const columns: StaticColumn[] = [
  { key: "name", label: "Name" },
  { key: "kind", label: "Kind", filterable: true },
  { key: "year", label: "Year", filterable: true, sortable: true, numeric: true },
  { key: "tags", label: "Tags", filterable: true },
  { key: "score", label: "Score", sortable: true, numeric: true },
];
const rows: StaticRow[] = [
  { id: "a", name: { text: "Alpha", href: "/drugs/alpha/", strong: true }, kind: "drug", year: "2024", tags: [{ text: "ADC", chip: "bg-foreground/5" }, { text: "HER2", chip: "bg-foreground/5" }], score: { text: "1,200", v: 1200 } },
  { id: "b", name: { text: "Beta", href: "/trials/beta/" }, kind: "trial", year: "2023", tags: [{ text: "HER2", chip: "bg-foreground/5" }], score: 300 },
  { id: "c", name: "Gamma", kind: "drug", year: "2022", tags: [], score: undefined },
];

describe("StaticTable", () => {
  const html = render(createElement(StaticTable, { rows, columns, noun: "rows" }));

  it("puts a header filter button with aria-expanded on every filterable column and nowhere else", () => {
    const heads = [...html.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => m[1]);
    const by = (label: string) => heads.find((h) => h.includes(label)) ?? "";
    expect(by("Kind")).toContain('data-column-filter="label"');
    expect(by("Kind")).toContain('aria-expanded="false"');
    expect(by("Year")).toContain('data-column-filter="glyph"');
    expect(by("Tags")).toContain('data-column-filter="label"');
    expect(by("Name")).not.toContain("data-column-filter");
    expect(by("Score")).not.toContain("data-column-filter");
    expect(nestedButtons(html)).toBe(0);
  });

  it("renders every row with links, chips, numbers and dashes from plain data", () => {
    expect(bodyRows(html)).toEqual([3]);
    expect(html).toMatch(/href="\/drugs\/alpha\/?"/);
    expect(html).toContain(">2024<");
    expect(html).toMatch(/<span class="chip bg-foreground\/5"[^>]*>ADC<\/span>/);
    expect(html).toContain("1,200");
    expect(html).toContain('<span class="text-muted">-</span>');
    expect(html).toContain("3</span>");
  });

  it("hides the rows a filter value does not match, counts N of M and offers Clear", () => {
    const filtered = render(createElement(StaticTable, { rows, columns, noun: "rows", initial: { kind: ["trial"] } }));
    expect(bodyRows(filtered)).toEqual([1]);
    expect(filtered).toContain("Beta");
    expect(filtered).not.toContain("Alpha");
    expect(filtered).toContain("data-clear-filters");
    expect(filtered).toContain("Filtering by Kind: trial");
    // Multi-valued cells match on any value.
    const her2 = render(createElement(StaticTable, { rows, columns, noun: "rows", initial: { tags: ["HER2"] } }));
    expect(bodyRows(her2)).toEqual([2]);
  });

  it("reads the same selection back from the URL that the header would write", () => {
    const known = (k: string) => new Set(rows.flatMap((r) => cellValues(r[k])));
    const view = readViewParams(new URLSearchParams("kind=trial&year=2023&sort=-year"), ["kind", "year", "tags"], known, (k) => k === "year");
    expect(view.sel).toEqual({ kind: ["trial"], year: ["2023"] });
    expect(view.sort).toEqual({ key: "year", dir: -1 });
  });

  it("takes filter values from the object behind a cell, not its display text", () => {
    expect(cellValues({ text: "1,200", v: 1200 })).toEqual(["1200"]);
    expect(cellValues([{ text: "A" }, { text: "B", v: "b" }])).toEqual(["A", "b"]);
    expect(cellValues(true)).toEqual(["Yes"]);
    expect(cellValues("")).toEqual([]);
  });
});

describe("converted server pages", () => {
  it("deals: one table with Year, Type and region header filters, every deal in the markup", () => {
    const html = render(createElement(DealsPage));
    expect(html).toContain('data-column-filter');
    expect(html).toContain("Filter by Type");
    expect(html).toContain("Filter by From region");
    expect(html).toContain('aria-expanded="false"');
    expect(Math.max(...bodyRows(html))).toBeGreaterThan(50);
    expect(nestedButtons(html)).toBe(0);
  });

  it("funding: the four type sections became one table with a Type filter", () => {
    const html = render(createElement(FundingPage));
    expect(html).toContain("Filter by Type");
    expect(bodyRows(html)).toHaveLength(1);
    expect(bodyRows(html)[0]).toBeGreaterThanOrEqual(10);
  });

  it("status: the feeds table filters by State and keeps the schedules table plain (under ten rows)", () => {
    const html = render(createElement(StatusPage));
    expect(html).toContain("Filter by State");
    const heads = [...html.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => m[1]);
    expect(heads.find((h) => h.includes("Workflow"))).not.toContain("data-column-filter");
  });
});
