import { describe, expect, it } from "vitest";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { COUNTRY_PAGES } from "./country-pages";
import { NAV_GROUPS } from "./nav";
import { siteSearchDocs } from "./search-index";

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

  it("search reaches every country page", () => {
    const routes = new Set(siteSearchDocs().filter((d) => d.kind === "page").map((d) => d.route));
    expect(codes.filter((h) => !routes.has(h))).toEqual([]);
  });

  it("the site menu does not list the deep dives one by one", () => {
    // A country can keep a menu entry for a reason of its own (India's paying-for-care line is shown to readers who
    // chose India), but the menu must not grow with the number of countries.
    const inMenu = NAV_GROUPS.flatMap((g) => g.items).filter((i) => /^\/countries\/[a-z]{2}\/$/.test(i.href));
    expect(inMenu.length).toBeLessThanOrEqual(3);
  });
});
