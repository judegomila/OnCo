import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import DependenciesPage from "./page";

/**
 * Anchors nested inside anchors in the rendered markup. The HTML parser refuses to nest <a>: it closes the outer
 * one early and lifts the inner one out as a sibling, so the DOM the browser builds differs from the tree React
 * expects and hydration fails with React error 418 (roadmap row 139). The serialised DOM after React recovers
 * looks identical to the server HTML, which is why a text diff never showed it.
 */
function nestedAnchors(html: string): string[] {
  const found: string[] = [];
  let open = 0;
  for (const m of html.matchAll(/<(\/?)a[\s>]/g)) {
    if (m[1]) { open = Math.max(0, open - 1); continue; }
    if (open > 0) found.push(html.slice(Math.max(0, m.index - 160), m.index + 80));
    open++;
  }
  return found;
}

describe("dependency map page", () => {
  const html = renderToStaticMarkup(createElement(DependenciesPage));

  it("never nests one anchor inside another (React 418 on /dependencies/)", () => {
    expect(nestedAnchors(html)).toEqual([]);
  });

  it("still links single-vendor steps to the vendor company and to the map root", () => {
    if (!html.includes('id="single-vendor"')) return;
    if (html.includes("Only vendor: ")) {
      expect(html).toMatch(/Only vendor: <a class="underline" href="\/companies\//);
      // The technology name is the link when the vendor is one too, so both stay clickable without nesting.
      expect(html).toMatch(/<a class="block font-medium leading-snug hover:underline" href="\/dependencies\/?\?root=/);
    }
  });

  it("nestedAnchors catches the pattern it guards against", () => {
    expect(nestedAnchors('<a href="/x"><span>Only vendor: <a href="/y">Y</a></span></a>')).toHaveLength(1);
    expect(nestedAnchors('<a href="/x">X</a><a href="/y">Y</a>')).toEqual([]);
  });
});
