import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "./layout";

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

/** Snippets around each `<a` that opens while another `<a` is still open. SVG subtrees are skipped (SVG <a> is a different element). */
export function nestedAnchors(html: string): string[] {
  const found: string[] = [];
  let open = 0, svg = 0;
  for (const m of html.matchAll(/<(\/?)(a|svg)(?=[\s>/])/g)) {
    if (m[2] === "svg") { svg = Math.max(0, svg + (m[1] ? -1 : 1)); continue; }
    if (svg > 0) continue;
    if (m[1]) { open = Math.max(0, open - 1); continue; }
    if (open > 0) found.push(html.slice(Math.max(0, m.index - 200), m.index + 120));
    open++;
  }
  return found;
}

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

describe("no page nests one anchor inside another", () => {
  it.each(Object.keys(pages).sort())("%s", async (file) => {
    const mod = await pages[file]();
    const paramSets = mod.generateStaticParams ? pick(file, await mod.generateStaticParams()) : [{}];
    expect(paramSets.length).toBeGreaterThan(0);
    for (const p of paramSets) {
      const html = render(await mod.default({ params: Promise.resolve(p) }));
      // Every page has at least the header and footer links; an anchorless render means the page did not render.
      expect(html, `${file} ${JSON.stringify(p)} rendered no links`).toMatch(/<a[\s>]/);
      expect(nestedAnchors(html), `${file} ${JSON.stringify(p)}`).toEqual([]);
    }
  }, FULL ? 1_800_000 : 120_000);

  it("the scanner catches the pattern it guards against", () => {
    expect(nestedAnchors('<a href="/x"><span>Only vendor: <a href="/y">Y</a></span></a>')).toHaveLength(1);
    expect(nestedAnchors('<a href="/x">X</a><a href="/y">Y</a>')).toEqual([]);
    expect(nestedAnchors('<a href="/x"><svg><a href="/y"><path/></a></svg></a>')).toEqual([]);
    expect(nestedAnchors('<abbr title="x"><a href="/y">Y</a></abbr>')).toEqual([]);
  });
});
