import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import CountriesPage from "./page";
import { CountryDirectory, type DirectoryRow } from "@/components/CountryDirectory";
import { autoCountryCodes, countryIndex } from "@/lib/country-pages";

/**
 * /countries/ as the corpus stands, with no fixture: the sentence above the directory gives the real number of deep
 * dives and of automatic pages, and the "deep dive" tag and the "deep dives only" switch are offered only while they
 * would tell a reader something.
 * Since 16 November 2026 every country is a deep dive. src/app/countries/[iso]/render.test.ts renders the same page
 * with three fixture territories on automatic pages, where both counts and the switch must appear.
 */
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const wrap = (el: ReturnType<typeof createElement>) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));

describe("/countries/ counts what it lists", () => {
  const index = countryIndex();
  const dives = index.filter((c) => c.deepDive).length;
  const auto = index.length - dives;
  const html = wrap(createElement(CountriesPage));

  it("states the real number of pages, deep dives and automatic pages", () => {
    expect(auto).toBe(autoCountryCodes().length);
    expect(html).toContain(`${index.length} countries and territories have a page`);
    if (auto === 0) {
      expect(html).toContain(`each of the ${dives} is a deep dive written from the country&#x27;s own sources.`);
      expect(html).not.toContain("pages assembled from GLOBOCAN");
      expect(html).not.toMatch(/\b0 pages\b/);
    } else {
      expect(html).toContain(`${dives} deep dives written from each country&#x27;s own sources, and ${auto} ${auto === 1 ? "page" : "pages"} assembled from GLOBOCAN`);
    }
    // Every country is linked, whichever state the corpus is in.
    for (const c of index) expect(html, c.iso2).toMatch(new RegExp(`href="${c.route}?"`));
    // The "deep dive" tag marks a deep dive only while some page is not one. When every country is a deep dive the
    // tag beside every name says nothing, so there is none; in the mixed state there is exactly one per deep dive.
    expect((html.match(/>deep dive</g) ?? []).length).toBe(auto === 0 ? 0 : dives);
  });

  it("tags the deep dives only while some country is not one", () => {
    const tags = (rows: DirectoryRow[]) => (wrap(createElement(CountryDirectory, { rows, regions: ["Europe"] })).match(/>deep dive</g) ?? []).length;
    const all: DirectoryRow[] = [{ c: "AA", n: "Aland", r: "Europe", d: true }, { c: "BB", n: "Bland", r: "Europe", d: true }];
    expect(tags(all)).toBe(0);
    // Mixed: one tag for each deep dive, directly after its own link, and none after the automatic page's.
    const mixedRows = [...all, { c: "CC", n: "Cland", r: "Europe", d: false }];
    expect(tags(mixedRows)).toBe(2);
    const mixed = wrap(createElement(CountryDirectory, { rows: mixedRows, regions: ["Europe"] }));
    for (const c of ["aa", "bb"]) expect(mixed).toMatch(new RegExp(`href="/countries/${c}/?"[^>]*>[^<]*</a><span[^>]*>deep dive<`));
    expect(mixed).not.toMatch(/href="\/countries\/cc\/?"[^>]*>[^<]*<\/a><span[^>]*>deep dive</);
    // No deep dive at all: nothing to tag.
    expect(tags([{ c: "CC", n: "Cland", r: "Europe", d: false }])).toBe(0);
  });

  it("offers the deep-dives-only switch only while some country is not a deep dive", () => {
    expect(html.includes("Deep dives only")).toBe(auto > 0);
    const rows: DirectoryRow[] = [{ c: "AA", n: "Aland", r: "Europe", d: true }, { c: "BB", n: "Bland", r: "Europe", d: true }];
    expect(wrap(createElement(CountryDirectory, { rows, regions: ["Europe"] }))).not.toContain("Deep dives only");
    const mixed = wrap(createElement(CountryDirectory, { rows: [...rows, { c: "CC", n: "Cland", r: "Europe", d: false }], regions: ["Europe"] }));
    expect(mixed).toContain("Deep dives only (2)");
    expect(mixed).toContain("3 of 3");
    // The name filter and the count stay in both states.
    expect(wrap(createElement(CountryDirectory, { rows, regions: ["Europe"] }))).toContain('aria-label="Find a country"');
  });
});
