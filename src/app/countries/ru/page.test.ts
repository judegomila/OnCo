import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "../../layout";
import RussiaPage from "./page";
import { graph } from "@/lib/graph";
import { RU_COMPANIES, RU_INSTITUTIONS, RU_PAPERS, RU_PEOPLE, RU_TRIALS, RU_TRIAL_STARTS } from "@/data/country-ru";

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const KB = 1024;

/**
 * /countries/ru/ is written from Russian-language primary sources rather than from the corpus, so the two things
 * worth guarding are that every id it names still resolves (a renamed record would silently drop a section) and
 * that the page stays small enough to be worth loading.
 */
describe("the Russia country page", () => {
  it("names only ids that exist in the corpus", () => {
    const g = graph();
    const check = (ids: string[], kind: string) => ids.filter((id) => g.get(id)?.kind !== kind);
    expect(check(RU_INSTITUTIONS, "institution")).toEqual([]);
    expect(check(RU_COMPANIES, "company")).toEqual([]);
    expect(check(RU_TRIALS, "trial")).toEqual([]);
    expect(check(RU_PAPERS, "paper")).toEqual([]);
    expect(check(RU_PEOPLE, "person")).toEqual([]);
  });

  it("renders the Russian-source sections and stays within its markup budget", () => {
    const html = render(createElement(RussiaPage));
    // The national statistical volumes, the registration route and the domestic maker: the three things the page exists for.
    expect(html).toContain("Cancer in Russia");
    expect(html).toContain("721,690");
    expect(html).toContain("160 working days");
    expect(html).toContain("31 December 2025");
    expect(html).toContain("Biocad");
    // The trial-start series is the page's own measurement; every year must render.
    for (const row of RU_TRIAL_STARTS) expect(html, String(row.year)).toContain(String(row.year));
    // Gaps are named on the page, not omitted.
    expect(html).toContain("What could not be sourced");
    // 143 KB when written; the budget leaves room for more cards without becoming a cliff edge.
    expect(Buffer.byteLength(html, "utf8"), "russia markup").toBeLessThan(250 * KB);
  });
});
