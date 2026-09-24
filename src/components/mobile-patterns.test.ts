import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import BodyPage from "@/app/body/page";
import GraphPage from "@/app/graph/page";
import TumorBoardPage from "@/app/tumor-board/page";
import QueryPage from "@/app/query/page";
import PathPage from "@/app/path/page";
import DealsPage from "@/app/deals/page";
import IraePage from "@/app/irae/page";
import PrepPage from "@/app/prep/page";
import PrepSheetPage, { generateStaticParams as prepSheetParams } from "@/app/prep/[id]/page";
import DependenciesPage from "@/app/dependencies/page";
import ResistancePage from "@/app/resistance/page";
import ToolPage, { generateStaticParams as toolParams } from "@/app/tools/[id]/page";

/**
 * Two-column tools on a phone (docs/MOBILE.md). Below the lg breakpoint the columns stack, so a tap in the controls
 * used to change something a screen or more below. Each view now carries one of three small-screen structures, and
 * this test keeps them in the static markup, the way the export renders them:
 *
 *  - sticky preview: the driven element sticks under the header at no more than 40 percent of the viewport;
 *  - choose / view: two pills (role=tab, aria-controls) switch between the panes, with a live region for the hint;
 *  - inline: the driven element is ordered directly under the control on small screens.
 *
 * Every view also names its wrapper (`data-mobile-view`), a control and the driven element, which is what
 * scripts/mobile-audit.ts taps and measures in a real browser at 390 px.
 */

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));

/** The opening tag of the wrapper named `view`, and everything up to the end of the document (enough to find its parts). */
function viewOf(html: string, name: string): string {
  const i = html.indexOf(`data-mobile-view="${name}"`);
  expect(i, `view ${name} present`).toBeGreaterThanOrEqual(0);
  const start = html.lastIndexOf("<", i);
  return html.slice(start);
}
const openingTag = (fragment: string) => fragment.slice(0, fragment.indexOf(">") + 1);
const tagWith = (html: string, attr: string) => { const i = html.indexOf(attr); expect(i, `${attr} present`).toBeGreaterThanOrEqual(0); const start = html.lastIndexOf("<", i); return html.slice(start, html.indexOf(">", i) + 1); };
const classOf = (tag: string) => / class="([^"]*)"/.exec(tag)?.[1] ?? "";

function expectChooseView(html: string, name: string) {
  const view = viewOf(html, name);
  expect(openingTag(view)).toContain('data-mobile-pattern="choose-view"');
  const bar = tagWith(view, 'role="tablist"');
  expect(classOf(bar)).toContain("lg:hidden");
  expect(classOf(bar)).toContain("sticky");
  const tabs = [...view.matchAll(/<button[^>]*role="tab"[^>]*>/g)].map((m) => m[0]);
  expect(tabs.length, "two pills").toBe(2);
  for (const t of tabs) {
    const target = /aria-controls="([^"]+)"/.exec(t)?.[1];
    expect(target, "pill points at a pane").toBeTruthy();
    expect(view, `pane ${target} exists`).toContain(`id="${target}"`);
  }
  // Pills carry glyphs: each tab opens with an inline SVG.
  expect((view.match(/role="tab"[^>]*><svg/g) ?? []).length).toBe(2);
  expect(view).toContain("data-mobile-live");
  expect(view).toContain('aria-live="polite"');
  // The chooser shows first; the view pane is hidden below lg until a choice or the pill.
  expect(classOf(tagWith(view, 'data-choose-view-pane="choose"'))).not.toContain("max-lg:hidden");
  expect(classOf(tagWith(view, 'data-choose-view-pane="view"'))).toContain("max-lg:hidden");
  expect(view).toContain("data-mobile-driven");
  expect(view).toContain("data-mobile-control");
  // Both panes print (globals.css), so nothing that was on paper is lost.
}

function expectStickyPreview(html: string, name: string) {
  const view = viewOf(html, name);
  expect(openingTag(view)).toContain('data-mobile-pattern="sticky-preview"');
  const driven = tagWith(view, "data-mobile-driven");
  const cls = classOf(driven);
  expect(cls).toContain("max-lg:sticky");
  expect(cls).toContain("max-lg:top-14");
  expect(cls).toContain("max-lg:max-h-[40vh]");
  const id = / id="([^"]+)"/.exec(driven)?.[1];
  expect(id, "driven element has an id").toBeTruthy();
  expect(view, "controls point at the driven element").toContain(`aria-controls="${id}"`);
  expect(view).toContain("data-mobile-control");
  expect(view).toContain('aria-live="polite"');
}

function expectInline(html: string, name: string, orderClass: string) {
  const view = viewOf(html, name);
  expect(openingTag(view)).toContain('data-mobile-pattern="inline"');
  expect(view).toContain(orderClass);
  expect(view).toContain("data-mobile-driven");
  expect(view).toContain("data-mobile-control");
}

describe("two-column tools have a small-screen structure", () => {
  it("body map: the detail panel is a sticky preview above the figure", () => {
    const html = render(createElement(BodyPage));
    expectStickyPreview(html, "body-map");
    // Every organ and system-wide chip drives the same panel.
    const regions = html.match(/class="bm-region"/g) ?? [];
    expect(regions.length).toBeGreaterThan(10);
    expect((html.match(/aria-controls="body-detail"/g) ?? []).length).toBeGreaterThanOrEqual(regions.length);
  });

  it("graph explorer: the scene is a sticky preview above the panel", () => {
    const html = render(createElement(GraphPage));
    expectStickyPreview(html, "graph-explorer");
  });

  it("tumour board: biomarker ticks and matches behind Choose and Matches pills", () => {
    expectChooseView(render(createElement(TumorBoardPage)), "tumour-board");
  });

  it("query builder: saved queries and results behind pills", () => {
    expectChooseView(render(createElement(QueryPage)), "query-builder");
  });

  it("irAE guide: organ list and card behind pills", () => {
    expectChooseView(render(createElement(IraePage)), "irae-guide");
  });

  it("prep pack: builder and pack behind pills, and the builder toolbar only sticks on desktop", () => {
    const html = render(createElement(PrepPage));
    expectChooseView(html, "prep-pack");
    expect(html).not.toMatch(/class="sticky top-14 z-30 -mx-4/);
    expect(html).toContain("lg:sticky top-14 z-30 -mx-4");
  });

  it("appointment sheet: ticks and sheet behind pills, no nested scroller on small screens", async () => {
    const [{ id }] = prepSheetParams();
    const html = render(await PrepSheetPage({ params: Promise.resolve({ id }) }));
    expectChooseView(html, "prep-sheet");
    expect(html).toContain("lg:max-h-[28rem] lg:overflow-y-auto");
  });

  it("decision aids: the result is a sticky preview above the question pills", async () => {
    const params = toolParams();
    expect(params.length).toBeGreaterThan(0);
    for (const { id } of params) {
      const html = render(await ToolPage({ params: Promise.resolve({ id }) }));
      expectStickyPreview(html, "decision-tool");
      // Every option pill drives the result.
      const pills = html.match(/role="radio"/g) ?? [];
      expect(pills.length).toBeGreaterThan(5);
      expect((html.match(/aria-controls="tool-result"/g) ?? []).length).toBe(pills.length);
    }
  });

  it("path finder: examples go first on small screens, pickers and routes follow inline", () => {
    expectInline(render(createElement(PathPage)), "path-finder", "max-lg:order-first");
  });

  it("deal flow: the tapped ribbon's deal list sits directly under the drawing on small screens", () => {
    const html = render(createElement(DealsPage));
    expectInline(html, "deal-flow", "max-md:order-first");
    expect(html).toContain('aria-controls="deal-flow-detail"');
    expect(html).toContain('id="deal-flow-detail"');
    // The region matrix scrolls inside its own box (ScrollRow), and the grid children may shrink below the table.
    expect(viewOf(html, "deal-flow")).toContain("data-scroll-row");
    expect(openingTag(viewOf(html, "deal-flow"))).toContain("[&amp;&gt;*]:min-w-0"); // React escapes the class text
  });

  it("dependency map: tiles open the side panel behind Map and Panel pills, with a close pill", () => {
    const html = render(createElement(DependenciesPage));
    expectChooseView(html, "dependency-map");
    const view = viewOf(html, "dependency-map");
    expect(view).toContain('aria-controls="dag-panel"');
    expect(view).toContain('id="dag-panel"');
    expect((view.match(/data-node-id="/g) ?? []).length).toBeGreaterThan(20);
  });

  it("resistance: route taps drive the caption inline, and mechanism cards cannot widen the page", () => {
    const html = render(createElement(ResistancePage));
    const view = viewOf(html, "resistance-map");
    expect(openingTag(view)).toContain('data-mobile-pattern="inline"');
    expect(view).toContain("data-mobile-control");
    expect(view).toContain("data-mobile-driven");
    expect(html).toContain("md:grid-cols-2 [&amp;&gt;*]:min-w-0");
  });
});
