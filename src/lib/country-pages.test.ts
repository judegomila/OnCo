import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { GLOBOCAN } from "./globocan";
import { routeExists } from "./sitemap-urls";
import { autoCountry, autoCountryCodes, COUNTRY_PAGES, countryIndex, countryPageFor, countryRoute, deepDiveCodes, deepDiveQueue, namesCountry, partAnchor } from "./country-pages";
import { NAV_GROUPS } from "./nav";
import { siteSearchDocs } from "./search-index";
import { CTGOV_COUNTRY, ISO3_TO_ISO2, PART_OF } from "@/data/country-codes";
import { generateStaticParams } from "@/app/countries/[iso]/page";

/**
 * Every GLOBOCAN country has a page: its deep dive where one exists, an automatic page otherwise, or a section of
 * its parent's page (France's overseas departments). A deep dive always wins, so the dynamic route must never
 * generate a code that has its own folder.
 */
describe("country pages", () => {
  const gloIso2 = Object.keys(GLOBOCAN.countries).filter((k) => k !== "WORLD").map((k) => ISO3_TO_ISO2[k]);
  const params = generateStaticParams().map((p) => p.iso.toUpperCase());

  it("knows the alpha-2 code of every GLOBOCAN country", () => {
    const missing = Object.keys(GLOBOCAN.countries).filter((k) => k !== "WORLD" && !ISO3_TO_ISO2[k]);
    expect(missing).toEqual([]);
    expect(new Set(gloIso2).size).toBe(gloIso2.length);
  });

  it("gives every GLOBOCAN country a page: a deep dive, an automatic page or a section of its parent's", () => {
    const dives = new Set(deepDiveCodes());
    const auto = new Set(params);
    const homeless = gloIso2.filter((c) => !dives.has(c) && !auto.has(c) && !PART_OF[c]);
    expect(homeless).toEqual([]);
    for (const c of gloIso2) {
      const route = countryPageFor(c).split("#")[0];
      expect(dives.has(route.slice(11, 13).toUpperCase()) || auto.has(route.slice(11, 13).toUpperCase()), c).toBe(true);
    }
    // The deep dives found on disk are the folders the sitemap helper sees as literal routes.
    for (const d of dives) expect(routeExists(`/countries/${d.toLowerCase()}/`), d).toBe(true);
  });

  it("lets a deep dive win: no automatic page is generated for a code with its own folder", () => {
    const clash = params.filter((c) => deepDiveCodes().includes(c));
    expect(clash).toEqual([]);
    // Peru had an automatic page until its deep dive arrived; Samoa has none.
    expect(params).toContain("WS");
    expect(params).not.toContain("PE");
    expect(params).not.toContain("FR");
    expect(params).not.toContain("AR");
    expect(autoCountryCodes()).toEqual(params);
  });

  it("puts France's overseas departments on the France page, not on pages of their own", () => {
    for (const c of ["RE", "MQ", "GP", "GF"]) {
      expect(PART_OF[c]).toBe("FR");
      expect(params).not.toContain(c);
      expect(countryPageFor(c)).toBe(`/countries/fr/#${partAnchor(c)}`);
      expect(countryIndex().some((r) => r.iso2 === c)).toBe(false);
    }
    const fr = countryIndex().find((r) => r.iso2 === "FR")!;
    expect(fr.deepDive).toBe(true);
    expect(fr.parts?.map((p) => p.iso2).sort()).toEqual(["GF", "GP", "MQ", "RE"]);
    const page = readFileSync("src/app/countries/fr/page.tsx", "utf8");
    expect(page).toContain('<CountryParts parent="FR" />');
  });

  it("maps every country name in the trial captures to a code", () => {
    const text = readFileSync("src/data/trial-participation.ts", "utf8");
    const names = new Set<string>();
    for (const m of text.matchAll(/"countries": \[([^\]]*)\]/g)) for (const n of JSON.parse(`[${m[1]}]`) as string[]) names.add(n);
    expect([...names].filter((n) => !CTGOV_COUNTRY[n])).toEqual([]);
  });

  it("matches programme and law records to a country by whole name only", () => {
    expect(namesCountry("Cervical cancer screening programme in Myanmar", "MM")).toBe(true);
    expect(namesCountry("Breast cancer screening programme in Turkey", "TR")).toBe(true);
    expect(namesCountry("Screening in Papua New Guinea", "GN")).toBe(false);
    expect(namesCountry("A law in Northern Ireland", "IE")).toBe(false);
    expect(namesCountry("Programme in Nigeria", "NE")).toBe(false);
    expect(autoCountry("PT")!.laws.map((e) => e.id)).toContain("portugal-law-75-2021-right-to-be-forgotten");
    expect(autoCountry("MM")!.programmes.map((e) => e.id)).toContain("screening-mmr-cervix");
  });

  it("reads the deep-dive queue from the coverage proposal", () => {
    const q = deepDiveQueue();
    expect(q.size).toBe(60);
    expect(q.ranks.get("PE")).toBe(24);
  });

  it("flags estimates IARC built from neighbouring countries", () => {
    const ws = autoCountry("WS")!;
    expect(ws.methodInc.code).toBe("5");
    expect(ws.methodInc.neighbours).toBe(true);
    expect(autoCountry("PE")!.methodInc.neighbours).toBe(false);
  });
});

/**
 * Country deep dives are found through search and through /countries/, not through the site menu. The menu is in the
 * root layout, so anything it lists ships with every page; listing each country there made the menu's cost grow with
 * every country added (about 37 KB at 117 countries). These checks keep the menu at one Countries entry and make sure
 * no country page is lost from search when it is not in the menu.
 */
const APP = join(process.cwd(), "src", "app", "countries");
const codes = readdirSync(APP, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^[a-z]{2}$/.test(d.name) && existsSync(join(APP, d.name, "page.tsx")))
  .map((d) => `/countries/${d.name}/`);

describe("country deep dives", () => {
  it("every country page has a line for search, and every line has a page", () => {
    const listed = new Set(COUNTRY_PAGES.map((c) => c.href));
    expect(codes.filter((h) => !listed.has(h)), "country pages with no line in src/lib/country-pages.ts").toEqual([]);
    expect([...listed].filter((h) => !codes.includes(h)), "lines with no page").toEqual([]);
    expect(listed.size, "one line per page").toBe(COUNTRY_PAGES.length);
  });

  it("search reaches every country page, deep dive or automatic, once each", () => {
    const pageRoutes = siteSearchDocs().filter((d) => d.kind === "page").map((d) => d.route);
    const routes = new Set(pageRoutes);
    expect(codes.filter((h) => !routes.has(h)), "deep dives search cannot reach").toEqual([]);
    expect(autoCountryCodes().map(countryRoute).filter((h) => !routes.has(h)), "automatic pages search cannot reach").toEqual([]);
    const countryRoutes = pageRoutes.filter((r) => /^\/countries\/[a-z]{2}\/$/.test(r));
    expect(countryRoutes.length, "a country indexed twice").toBe(new Set(countryRoutes).size);
  });

  it("the site menu does not list the deep dives one by one", () => {
    // A country can keep a menu entry for a reason of its own (India's paying-for-care line is shown to readers who
    // chose India), but the menu must not grow with the number of countries.
    const inMenu = NAV_GROUPS.flatMap((g) => g.items).filter((i) => /^\/countries\/[a-z]{2}\/$/.test(i.href));
    expect(inMenu.length).toBeLessThanOrEqual(3);
  });
});
