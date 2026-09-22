import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ResultsTable, type Column } from "./ResultsTable";
import { pickValue, SEARCH_FROM } from "./ColumnFilter";
import { toggleValue } from "./FacetSelect";
import { FilterableTable } from "./FilterableTable";
import { EntityBrowser, type BrowserRow, type ColDef, type FacetDef } from "../EntityBrowser";
import { readViewParams, viewParams } from "@/lib/table-view";

/**
 * Filtering from the column header. The owner's ask (regulatory timeline as the example): clicking a column name
 * filters that column, while the toolbar's facet buttons stay. The header is a button with the funnel glyph and
 * aria-expanded; a sortable column keeps its sort control as a sibling button, never a parent; and choosing a value
 * in the header goes through the same selection rule and URL writer as the toolbar facet, so the two agree.
 */
const router: AppRouterInstance = { push() {}, replace() {}, prefetch() {}, back() {}, forward() {}, refresh() {}, bfcacheId: "static" };
const render = (el: React.ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));

type Row = { id: string; date: string; type: string; note: string };
const rows: Row[] = [
  { id: "1", date: "2024-03-01", type: "approval", note: "a" },
  { id: "2", date: "2023-06-01", type: "filing", note: "b" },
  { id: "3", date: "2024-09-01", type: "approval", note: "c" },
];
const options = (f: (r: Row) => string) => { const m = new Map<string, number>(); for (const r of rows) m.set(f(r), (m.get(f(r)) ?? 0) + 1); return [...m.entries()].map(([value, count]) => ({ value, label: value, count })); };

/** Buttons that open while another button is open: the parser would lift them out and hydration would fail. */
const nestedButtons = (html: string) => { let open = 0, bad = 0; for (const m of html.matchAll(/<(\/?)button[\s>]/g)) { if (m[1]) open--; else { if (open > 0) bad++; open++; } } return bad; };

describe("column header filter", () => {
  const columns: Column<Row>[] = [
    { key: "date", label: "Date", sortable: true, filter: { options: options((r) => r.date.slice(0, 4)), value: [], onChange() {} }, render: (r) => r.date },
    { key: "type", label: "Event", filter: { options: options((r) => r.type), value: ["approval"], onChange() {} }, render: (r) => r.type },
    { key: "note", label: "What happened", render: (r) => r.note },
  ];
  const html = render(createElement(ResultsTable<Row>, { columns, rows, rowKey: (r) => r.id, sort: { key: "date", dir: -1 }, onSort() {} }));

  it("renders a filterable header as a button with the filter glyph and aria-expanded", () => {
    const th = html.match(/<th[^>]*>(?:(?!<\/th>)[\s\S])*Event[\s\S]*?<\/th>/)?.[0] ?? "";
    expect(th).toContain('data-column-filter="label"');
    expect(th).toContain('aria-haspopup="dialog"');
    expect(th).toContain('aria-expanded="false"');
    expect(th).toContain('data-glyph="filter"');
    // The whole label is the trigger on a column that does not sort.
    expect(th).toMatch(/<button[^>]*data-column-filter="label"[^>]*>Event<svg/);
  });

  it("shows the active value as a tiny chip and fills the glyph", () => {
    const th = html.match(/<th[^>]*>(?:(?!<\/th>)[\s\S])*Event[\s\S]*?<\/th>/)?.[0] ?? "";
    expect(th).toContain('fill="currentColor"');
    expect(th).toMatch(/<span[^>]*class="chip[^"]*"[^>]*><span class="truncate">approval<\/span>/);
    expect(th).toContain("Filtering by Event: approval");
    const date = html.match(/<th[^>]*aria-sort[^>]*>[\s\S]*?<\/th>/)?.[0] ?? "";
    expect(date).toContain('fill="none"');
  });

  it("keeps sort on the label and puts the filter on a sibling glyph button for sortable columns", () => {
    const th = html.match(/<th[^>]*aria-sort="descending"[^>]*>[\s\S]*?<\/th>/)?.[0] ?? "";
    expect(th).toContain("Sorted descending");
    expect(th).toContain('data-column-filter="glyph"');
    expect(th).toContain('aria-label="Filter by Date"');
    expect((th.match(/<button/g) ?? []).length).toBe(2);
    expect(nestedButtons(html)).toBe(0);
  });

  it("leaves a plain header as text", () => {
    const th = html.match(/<th[^>]*>What happened<\/th>/)?.[0] ?? "";
    expect(th).not.toBe("");
  });

  it("does not render the popover until opened", () => {
    expect(html).not.toContain('role="dialog"');
  });
});

describe("header filter and facet button agree", () => {
  const sort = { key: "name", dir: 1 as const };

  it("choosing a value produces the same URL parameter as the toolbar facet", () => {
    // The toolbar facet (FacetSelect, multi) toggles the value into the selection; the header pill uses the same rule.
    const viaFacet = toggleValue([], "Solid");
    const viaHeader = pickValue([], "Solid");
    expect(viaHeader).toEqual(viaFacet);
    const a = viewParams(["group", "type"], { group: viaFacet }, "", sort, sort).toString();
    const b = viewParams(["group", "type"], { group: viaHeader }, "", sort, sort).toString();
    expect(a).toBe("group=Solid");
    expect(b).toBe(a);
    // A facet chip in a cell selects exactly that value; from empty, the same address.
    expect(viewParams(["group"], { group: ["Solid"] }, "", sort, sort).toString()).toBe(a);
  });

  it("choosing the value again clears it, in both controls", () => {
    expect(pickValue(["Solid"], "Solid")).toEqual(toggleValue(["Solid"], "Solid"));
    expect(viewParams(["group"], { group: pickValue(["Solid"], "Solid") }, "", sort, sort).toString()).toBe("");
  });

  it("repeats the key for several values and keeps unrelated keys, search and a changed sort", () => {
    const p = viewParams(["group"], { group: ["Solid", "Blood"] }, "her2", { key: "name", dir: -1 }, sort, "utm=x&group=old&q=stale");
    expect(p.toString()).toBe("utm=x&group=Solid&group=Blood&q=her2&sort=-name");
    const back = readViewParams(p, ["group"], () => new Set(["Solid", "Blood"]), (k) => k === "name");
    expect(back).toEqual({ sel: { group: ["Solid", "Blood"] }, q: "her2", sort: { key: "name", dir: -1 } });
  });

  it("single-choice facets replace rather than accumulate", () => {
    expect(pickValue(["GB"], "US", true)).toEqual(["US"]);
    expect(pickValue(["US"], "US", true)).toEqual([]);
  });

  it("adds a search box only past eight values", () => {
    expect(SEARCH_FROM).toBe(8);
  });
});

describe("EntityBrowser headers", () => {
  const facets: FacetDef[] = [{ key: "platform", label: "Platform", searchable: false }, { key: "cancers", label: "Cancer" }];
  const columns: ColDef[] = [
    { key: "platform", label: "Platform", sortable: true },
    { key: "tumours", label: "Cancers", hide: "hidden lg:table-cell" },
    { key: "notes", label: "Notes" },
  ];
  const rows: BrowserRow[] = [
    { id: "a", name: "Assay A", tldr: "", route: "/assays/a/", facets: { platform: ["NGS"], cancers: ["Lung"] }, cols: { platform: "NGS", tumours: [{ facet: "cancers", value: "Lung" }], notes: "x" } },
    { id: "b", name: "Assay B", tldr: "", route: "/assays/b/", facets: { platform: ["IHC"], cancers: ["Breast"] }, cols: { platform: "IHC", tumours: [{ facet: "cancers", value: "Breast" }], notes: "y" } },
  ];
  const html = render(createElement(EntityBrowser, { rows, facets, columns, noun: "assays", hideStatus: true, hideTldr: true }));

  it("puts a header filter on columns that are facets by key or by the chips they hold, and not elsewhere", () => {
    const heads = [...html.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => m[1]);
    const by = (label: string) => heads.find((h) => h.includes(label)) ?? "";
    expect(by("Platform")).toContain('data-column-filter="glyph"');
    expect(by("Cancers")).toContain('data-column-filter="label"');
    expect(by("Notes")).not.toContain("data-column-filter");
    expect(by("Name")).not.toContain("data-column-filter");
    expect(nestedButtons(html)).toBe(0);
  });
});

describe("FilterableTable from plain data", () => {
  it("builds header filters from column definitions and row objects", () => {
    const columns = [
      { key: "country", label: "Country", filterable: true, sortable: true },
      { key: "year", label: "Year", filterable: true, value: (r: Record<string, unknown>) => String(r.date).slice(0, 4) },
      { key: "name", label: "Name" },
    ];
    const data = [{ id: "1", name: "A", country: "GB", date: "2024-01-01" }, { id: "2", name: "B", country: "US", date: "2023-05-05" }];
    const html = render(createElement(FilterableTable<Record<string, unknown>>, { rows: data, columns, rowKey: (r) => String(r.id), noun: "rows" }));
    expect(html).toContain('data-column-filter="glyph"');
    expect(html).toContain('data-column-filter="label"');
    expect(html).toContain("2024");
    expect((html.match(/data-column-filter=/g) ?? []).length).toBe(2);
    expect(nestedButtons(html)).toBe(0);
  });
});
