import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import AutoCountryPage from "./page";
import { autoCountry, countryIndex } from "@/lib/country-pages";
import { GLOBOCAN } from "@/lib/globocan";
import { pageRows } from "@/lib/static-tables";
import { pagedTables } from "@/lib/tables";
import { COUNTRY_TRIALS_PAGE, countryTrialRows, countryTrials, countryTrialsTableId } from "@/lib/tables/country-trials";
import { recruitingIn } from "@/lib/trials-here";

/**
 * The automatic country pages render from data alone. Three shapes: a small Pacific island whose incidence IARC
 * built from neighbouring countries (Samoa), the automatic page with the most trials (Estonia; Peru held this place
 * until its deep dive arrived), and a territory reported on its own (Guam). Each must state GLOBOCAN's figures and edition, cite IARC, and name what
 * OnCo does not hold, inside the markup budget the automatic pages share.
 */
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = async (iso: string) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, await AutoCountryPage({ params: Promise.resolve({ iso }) })));
/** 120 KB of markup without the root layout: Peru, when it was automatic, was about half of it; the trial table is paged at 30 rows. */
const BUDGET = 120 * 1024;
const fmt = (n: number | null | undefined) => (n ?? 0).toLocaleString("en-GB");

describe("automatic country pages", () => {
  for (const iso of ["ws", "ee", "gu"]) {
    it(`/countries/${iso}/ states GLOBOCAN's figures, the citation and the gaps`, async () => {
      const c = autoCountry(iso)!;
      const html = await render(iso);
      expect(html).toContain(`Cancer in ${c.name}`);
      expect(html).toContain(fmt(c.all?.[0]));
      expect(html).toContain(fmt(c.all?.[2]));
      expect(html).toContain(`GLOBOCAN ${GLOBOCAN.year}`);
      expect(html).toContain("International Agency for Research on Cancer");
      expect(html).toContain("What OnCo does not yet hold");
      expect(html).toContain("country-coverage-2026-11.md");
      expect(html).not.toMatch(/[–—]/);
      expect(Buffer.byteLength(html, "utf8"), `${iso} markup`).toBeLessThan(BUDGET);
    });
  }

  it("says when IARC built the estimate from neighbouring countries (Samoa, method 5)", async () => {
    const html = await render("ws");
    expect(html).toContain("Built partly from other countries");
    expect(html).toContain("neighbouring countries");
  });

  it("lists Estonia's trials, paged, and its records", async () => {
    const c = autoCountry("ee")!;
    expect(c.trials.length).toBeGreaterThan(30);
    const html = await render("ee");
    expect(html).toContain(`${recruitingIn("EE").length} recruiting here · ${c.trials.length} with a site here`);
    const list = countryTrials("EE");
    expect(list.map((x) => x.trial.id).sort()).toEqual(c.trials.map((t) => t.id).sort());
    const rows = countryTrialRows(list);
    const paged = pageRows(countryTrialsTableId("EE"), rows, COUNTRY_TRIALS_PAGE);
    expect(paged.more?.src).toBe("/api/v1/tables/country-trials-ee.json");
    expect(pagedTables().map((t) => t.id)).toContain("country-trials-ee");
    expect(html).toContain(`href="/trials/${list[0].trial.id}`);
    expect(html).not.toContain(`href="/trials/${list.at(-1)!.trial.id}`);
    for (const e of c.institutions) expect(html).toContain(e.name.replace(/&/g, "&amp;").replace(/'/g, "&#x27;"));
  });

  it("names a trial gap rather than showing an empty table", async () => {
    const html = await render("ws");
    expect(autoCountry("ws")!.trials.length).toBe(0);
    expect(html).toContain("No trial record in OnCo lists a site in Samoa");
  });
});

describe("/countries/ lists every country compactly", () => {
  it("links every country with a page, marks the deep dives, and stays small", async () => {
    const { default: CountriesPage } = await import("../page");
    const { CountryDirectory } = await import("@/components/CountryDirectory");
    const html = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(CountriesPage)));
    const index = countryIndex();
    // Link drops the trailing slash in a test render; the export writes it back (trailingSlash: true).
    for (const c of index) expect(html, c.iso2).toMatch(new RegExp(`href="${c.route}?"`));
    for (const c of ["re", "mq", "gp", "gf"]) expect(html).toMatch(new RegExp(`href="/countries/fr/?#overseas-${c}"`));
    expect((html.match(/>deep dive</g) ?? []).length).toBe(index.filter((c) => c.deepDive).length);
    // The directory is names and links only: about 180 bytes a country. The ranking table below it is the page's bulk.
    const rows = index.map((c) => ({ c: c.iso2, n: c.name, r: c.region, d: c.deepDive }));
    const dir = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(CountryDirectory, { rows, regions: [...new Set(index.map((c) => c.region))] })));
    expect(Buffer.byteLength(dir, "utf8"), "directory markup").toBeLessThan(40 * 1024);
    expect(JSON.stringify(rows).length, "directory props").toBeLessThan(12 * 1024);
  });
});
