import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import JapanPage from "./page";
import { JP_CEILINGS, JP_SCREENING_PROGRAMME, JP_STAGE } from "@/data/country-jp";

/**
 * The Japan deep dive renders three hand-built tables alongside the GLOBOCAN one, and its entity lists come from
 * the graph by id. This test holds the tables to their data and keeps the page inside a markup budget.
 */
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));
const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = () => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(JapanPage)));

describe("/countries/jp/", () => {
  const html = render();

  it("renders every row of the three hand-built tables", () => {
    for (const r of JP_SCREENING_PROGRAMME) expect(html, `screening row ${r.id}`).toContain(r.interval);
    for (const r of JP_STAGE) expect(html, `stage row ${r.id}`).toContain(r.site);
    for (const r of JP_CEILINGS) expect(html, `ceiling row ${r.id}`).toContain(r.multi);
  });

  it("pulls its entity lists from the graph", () => {
    expect(html).toContain("/institutions/ncc-japan");
    expect(html).toContain("/trials/jcog0802");
    expect(html).toContain("/people/tasuku-honjo");
  });

  it("says what the corpus did not hold and names the gaps", () => {
    expect(html).toContain("jRCT");
    expect(html).toContain("Records that should be in this corpus and are not");
  });

  it("stays inside its markup budget", () => {
    // 182 KB when written; the budget leaves room for the entity lists to grow with the corpus.
    expect(Buffer.byteLength(html, "utf8"), "japan markup").toBeLessThan(230 * 1024);
  });
});
