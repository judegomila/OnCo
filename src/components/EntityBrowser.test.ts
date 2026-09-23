import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { EntityBrowser, LIST_CAP, type BrowserRow } from "./EntityBrowser";
import { buildBrowser } from "@/lib/kind-browser";
import { cellText, compareBrowserRows, isYearRange } from "@/lib/browser-sort";

/**
 * The drugs browser at 1440 px (owner report, 23 Sept 2026): the Approved column was clipped off the right edge, its
 * cells read as grey "2007 to 2017" placeholders, and Cancers wrapped six lines deep. The fixes under test: a year
 * range prints its first year in the foreground weight with a muted "to <latest>" only when they differ (sorting on
 * the first year); a list of more than `cap` linked objects shows `cap` of them and a "+N more" pill (a button, so no
 * anchor nests in an anchor); and the results table sits in a ScrollRow that only becomes a sideways scroller once
 * the table is measured wider than its card.
 */
const router: AppRouterInstance = { push() {}, replace() {}, prefetch() {}, back() {}, forward() {}, refresh() {}, bfcacheId: "static" };
const render = (el: React.ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));

/** Snippets where an `<a` opens while another is open (SVG subtrees skipped), as src/app/nested-anchors.test.ts counts them. */
const nestedAnchors = (html: string): number => {
  let open = 0, svg = 0, bad = 0;
  for (const m of html.matchAll(/<(\/?)(a|svg)(?=[\s>/])/g)) {
    if (m[2] === "svg") { svg = Math.max(0, svg + (m[1] ? -1 : 1)); continue; }
    if (svg > 0) continue;
    if (m[1]) { open = Math.max(0, open - 1); continue; }
    if (open > 0) bad++;
    open++;
  }
  return bad;
};

const drugs = buildBrowser("drug");
const browser = (rows: BrowserRow[]) => render(createElement(EntityBrowser, { rows, facets: drugs.facets, columns: drugs.columns, noun: "drugs", nameKind: "drug" }));
/** The cells of the first body row, in column order. */
const cells = (html: string) => [...(html.match(/<tbody[\s\S]*?<\/tbody>/)?.[0] ?? "").matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
const col = (key: string) => drugs.columns.findIndex((c) => c.key === key) + 2; // name and status come first

describe("drugs browser: Approved column", () => {
  const ranged = drugs.rows.find((r) => isYearRange(r.cols.approved) && r.cols.approved.last && r.cols.approved.last !== r.cols.approved.first)!;
  const single = drugs.rows.find((r) => isYearRange(r.cols.approved) && (!r.cols.approved.last || r.cols.approved.last === r.cols.approved.first))!;

  it("prints the first year in the foreground weight and a muted 'to <latest>' only when the years differ", () => {
    expect(ranged, "a product approved in more than one year").toBeTruthy();
    const v = ranged.cols.approved; if (!isYearRange(v)) throw new Error("not a year range");
    const cell = cells(browser([ranged]))[col("approved")];
    expect(cell).toMatch(new RegExp(`<span class="text-foreground"[^>]*>${v.first}</span>`));
    expect(cell).toMatch(new RegExp(`<span class="text-muted[^"]*"[^>]*>to ${v.last}</span>`));
    expect(cell).not.toContain(`${v.first} to ${v.last}`); // no grey range string

    const one = single.cols.approved; if (!isYearRange(one)) throw new Error("not a year range");
    const cell1 = cells(browser([single]))[col("approved")];
    expect(cell1).toContain(`>${one.first}</span>`);
    expect(cell1).not.toContain("data-year-last");
  });

  it("shows one small flag per region the row records", () => {
    const us = drugs.rows.find((r) => isYearRange(r.cols.approved) && r.cols.approved.regions?.includes("US"))!;
    expect(cells(browser([us]))[col("approved")]).toContain("🇺🇸");
    // Regions the corpus spells as names still get a flag.
    const cn = drugs.rows.find((r) => isYearRange(r.cols.approved) && r.cols.approved.regions?.includes("China"));
    if (cn) expect(cells(browser([cn]))[col("approved")]).toContain("🇨🇳");
  });

  it("reads as '2007 to 2017' for search and export, and sorts numerically on the first year", () => {
    const v = ranged.cols.approved; if (!isYearRange(v)) throw new Error("not a year range");
    expect(cellText(v)).toBe(`${v.first} to ${v.last}`);
    expect(ranged.sortKeys?.approved).toBe(v.first);
    const sorted = [...drugs.rows].filter((r) => isYearRange(r.cols.approved)).sort(compareBrowserRows({ key: "approved", dir: 1 }));
    const firsts = sorted.map((r) => (isYearRange(r.cols.approved) ? r.cols.approved.first : 0));
    expect(firsts).toEqual([...firsts].sort((a, b) => a - b));
    // Unapproved products carry no cell and a zero key, so they sit at the top ascending and the bottom descending.
    expect(drugs.rows.some((r) => r.cols.approved === undefined && r.sortKeys?.approved === 0)).toBe(true);
  });

  it("the Approved header carries a tooltip and stays sortable", () => {
    const c = drugs.columns.find((x) => x.key === "approved")!;
    expect(c.sortable).toBe(true);
    expect(c.numeric).toBe(true);
    expect(c.tip).toMatch(/first approval/i);
  });
});

describe("drugs browser: capped lists", () => {
  it("caps Targets, Cancers and Companies at two linked names", () => {
    for (const key of ["targets", "cancers", "companies"]) expect(drugs.columns.find((c) => c.key === key)?.cap, key).toBe(2);
  });

  it("a cell with more than two linked cancers renders two links and a '+N more' pill, never a nested anchor", () => {
    const row = drugs.rows.find((r) => Array.isArray(r.cols.cancers) && r.cols.cancers.length > 2)!;
    expect(row).toBeTruthy();
    const n = (row.cols.cancers as unknown[]).length;
    const html = browser([row]);
    const cell = cells(html)[col("cancers")];
    expect((cell.match(/href="\/cancers\//g) ?? []).length).toBe(2);
    expect(cell).toContain('data-pill="more"');
    expect(cell).toMatch(new RegExp(`<button[^>]*data-pill="more"[^>]*>[\\s\\S]*?${n - 2} more</button>`));
    expect(nestedAnchors(html)).toBe(0);
  });

  it("a cell within the cap shows every link and no pill", () => {
    const row = drugs.rows.find((r) => Array.isArray(r.cols.cancers) && r.cols.cancers.length === 2)!;
    const cell = cells(browser([row]))[col("cancers")];
    expect((cell.match(/href="\/cancers\//g) ?? []).length).toBe(2);
    expect(cell).not.toContain('data-pill="more"');
  });

  it("other browsers cap long lists at the default", () => {
    expect(LIST_CAP).toBe(3);
    const trials = buildBrowser("trial");
    const row = trials.rows.find((r) => Array.isArray(r.cols.cancers) && r.cols.cancers.length > LIST_CAP);
    if (!row) return;
    const html = render(createElement(EntityBrowser, { rows: [row], facets: trials.facets, columns: trials.columns, noun: "trials", nameKind: "trial" }));
    expect(html).toContain('data-pill="more"');
  });
});

describe("results table fits its card", () => {
  it("sits in a ScrollRow that stays visible at lg until the table is measured wider than the card", () => {
    const html = browser(drugs.rows.slice(0, 3));
    expect(html).toContain('class="card results-table"');
    expect(html).toContain("data-scroll-row");
    expect(html).toContain('class="overflow-x-auto lg:overflow-x-visible"');
    // The name cell is bounded so the TL;DR cannot widen the column without limit.
    expect(html).toContain("min-w-[220px] max-w-[24rem]");
    // Facet chips in cells are capped too, so one long modality label cannot set the column's minimum width.
    const chipRow = drugs.rows.find((r) => { const v = r.cols.modality; return !!v && typeof v === "object" && !Array.isArray(v) && "facet" in v; })!;
    expect(cells(browser([chipRow]))[col("modality")]).toContain("chip max-w-44");
  });
});
