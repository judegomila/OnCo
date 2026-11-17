import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "./layout";
import NotFound from "./not-found";
import { NO_AUTOMATIC_PAGES } from "@/lib/country-pages";
import { nestedAnchors, structureIssues } from "@/test-utils/html-structure";

/**
 * Wall-clock allowance for the whole-page renders below. 120 seconds is right on an idle machine and is a real
 * guard: a page that takes longer than that has usually started rendering something it should page instead. But
 * it measures contention, not code, when a dozen agents are building in other worktrees, and three ship chains
 * have now failed on these four files at 149 seconds and passed on a re-run. The chain exports SLOW_TEST_MS so
 * the allowance follows the machine it is on; the default is unchanged, and no assertion is relaxed either way.
 */
const SLOW_MS = Number(process.env.SLOW_TEST_MS ?? 120_000);

/**
 * Anchors nested inside anchors, on every page of the site. The HTML parser refuses to nest <a>: it closes the
 * outer one early and lifts the inner one out as a sibling, so the DOM the browser builds differs from the tree
 * React expects and hydration fails with React error 418 (first seen on /dependencies/, roadmap row 139). The
 * serialised DOM after React recovers looks identical to the server HTML, which is why a text diff never showed it.
 *
 * Every src/app page is rendered here with react-dom/server against the real graph, the way the static export
 * renders it, inside the root layout so the header and footer are scanned too. Pages with `generateStaticParams`
 * are rendered for a sample of their real ids (one record per kind, every kind browser, the first few of the rest);
 * `NA_FULL=1 npx vitest run src/app/nested-anchors.test.ts` renders every id (several minutes). New pages are
 * picked up by the glob, so nothing has to be registered.
 *
 * One address is not a page: when no country is left without a deep dive, the automatic country route generates a
 * single placeholder so the static export has something to write, and answers it with `notFound()`
 * (src/lib/country-pages.ts, NO_AUTOMATIC_PAGES). The export writes the site's not-found page there, so that is
 * what is scanned for it. Any other address that answers not-found still fails here. The automatic page's own
 * markup is scanned on fixture territories in src/app/countries/[iso]/render.test.ts.
 */

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

type Params = Record<string, string>;
type PageModule = {
  default: (props: { params: Promise<Params> }) => ReactElement | Promise<ReactElement>;
  generateStaticParams?: () => Params[] | Promise<Params[]>;
};

// Lazy glob (Vite in tests, Turbopack in Next): each value is a thunk returning the page module.
const pages = import.meta.glob("./**/page.tsx") as Record<string, () => Promise<PageModule>>;
const FULL = !!process.env.NA_FULL;

/** Which ids to render for a dynamic route: one record per kind for the record pages, every kind browser, the first few otherwise. */
function pick(file: string, all: Params[]): Params[] {
  if (FULL || file.startsWith("./[kind]/page")) return all;
  if (file.includes("[kind]/[id]")) {
    const seen = new Set<string>();
    return all.filter((p) => !seen.has(p.kind) && !!seen.add(p.kind));
  }
  return all.slice(0, 3);
}

/** Client components that call useRouter need the app router context; navigation never happens in a static render. */
const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
export const render = (el: ReactElement) =>
  renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));

describe("no page renders markup the HTML parser would rebuild", () => {
  it.each(Object.keys(pages).sort())("%s", async (file) => {
    const mod = await pages[file]();
    const paramSets = mod.generateStaticParams ? pick(file, await mod.generateStaticParams()) : [{}];
    expect(paramSets.length).toBeGreaterThan(0);
    for (const p of paramSets) {
      const placeholder = file === "./countries/[iso]/page.tsx" && p.iso === NO_AUTOMATIC_PAGES;
      if (placeholder) await expect(Promise.resolve().then(() => mod.default({ params: Promise.resolve(p) })), "the placeholder must answer not-found").rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
      const html = render(placeholder ? createElement(NotFound) : await mod.default({ params: Promise.resolve(p) }));
      // Every page has at least the header and footer links; an anchorless render means the page did not render.
      expect(html, `${file} ${JSON.stringify(p)} rendered no links`).toMatch(/<a[\s>]/);
      expect(nestedAnchors(html), `${file} ${JSON.stringify(p)}`).toEqual([]);
      expect(structureIssues(html), `${file} ${JSON.stringify(p)}`).toEqual([]);
    }
  }, FULL ? 1_800_000 : SLOW_MS);

  it("the scanner catches the pattern it guards against", () => {
    expect(nestedAnchors('<a href="/x"><span>Only vendor: <a href="/y">Y</a></span></a>')).toHaveLength(1);
    expect(nestedAnchors('<a href="/x">X</a><a href="/y">Y</a>')).toEqual([]);
    expect(nestedAnchors('<a href="/x"><svg><a href="/y"><path/></a></svg></a>')).toEqual([]);
    expect(nestedAnchors('<abbr title="x"><a href="/y">Y</a></abbr>')).toEqual([]);
  });

  it("the structure scanner catches what the parser rearranges and passes what it keeps", () => {
    const rules = (h: string) => structureIssues(h).map((i) => i.rule);
    expect(rules('<svg><g><rect><title></title></rect><circle><title>KRAS</title></circle></g></svg>')).toEqual(["empty-svg-title"]);
    expect(rules('<a href="/x"><span><a href="/y">Y</a></span></a>')).toEqual(["a-in-a"]);
    expect(rules('<p>Text <div>block</div></p>')).toEqual(["div-in-p"]);
    expect(rules('<p><span><ul><li>x</li></ul></span></p>')).toEqual(["ul-in-p", "li-in-p"]);
    expect(rules('<button><button>x</button></button>')).toEqual(["button-in-button"]);
    expect(rules('<form><div><form></form></div></form>')).toEqual(["form-in-form"]);
    expect(rules('<ul><li>a<div><li>b</li></div></li></ul>')).toEqual(["li-closes-open-li", "li-in-div"]);
    expect(rules('<dl><dt>a<span><dd>b</dd></span></dt></dl>')).toEqual(["dd-closes-open-dt"]);
    expect(rules('<table><tr><td>x</td></tr></table>')).toEqual(["tr-in-table"]);
    expect(rules('<table><tbody><tr><td>x</td></tr></tbody> stray</table>')).toEqual(["text-foster-parented-out-of-table"]);
    expect(rules('<table><tbody><tr><td>x</td></tr><div>y</div></tbody></table>')).toEqual(["div-foster-parented-out-of-tbody"]);
    expect(rules('<div><td>x</td></div>')).toEqual(["td-in-div"]);
    expect(rules('<select><option><b>x</b></option></select>')).toEqual(["b-in-option"]);
    expect(rules('<svg><text><span>x</span></text></svg>')).toEqual(["span-breaks-out-of-svg"]);
    expect(rules('<h2><h3>x</h3></h2>')).toEqual(["h3-in-h2"]);
    // Kept as written by the parser.
    expect(rules('<dl><div><dt>a</dt><dd>b<dl><dt>c</dt></dl></dd></div></dl>')).toEqual([]);
    expect(rules('<ul><li>a<ul><li>b</li></ul></li></ul>')).toEqual([]);
    expect(rules('<p>Text <span><a href="/y">Y</a></span> <b>bold</b><br/><img src="x"></p>')).toEqual([]);
    expect(rules('<table><thead><tr><th>h</th></tr></thead><tbody><tr><td><div><p>x</p></div></td></tr></tbody></table>')).toEqual([]);
    expect(rules('<svg viewBox="0 0 1 1"><title>Name (1 to 9)</title><foreignObject><div>ok</div></foreignObject><path d="M0 0"/></svg>')).toEqual([]);
    expect(rules('<a href="/x"><svg><a href="/y"><path/></a></svg></a>')).toEqual([]);
    expect(rules('<span><div>block in span is kept</div></span>')).toEqual([]);
  });
});
