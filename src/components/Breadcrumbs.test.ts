import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("links ancestors and renders the current page as text", () => {
    const html = renderToStaticMarkup(createElement(Breadcrumbs, {
      items: [
        { label: "Home", href: "/" },
        { label: "Companies", href: "/companies/" },
        { label: "Noetik", href: "/companies/noetik/" },
      ],
    }));

    expect(html).toMatch(/<a [^>]*href="\/"[^>]*>Home<\/a>/);
    expect(html).toMatch(/<a [^>]*href="\/companies"[^>]*>Companies<\/a>/);
    expect(html).toContain('<span aria-current="page"');
    expect(html).not.toContain('href="/companies/noetik"');
  });
});
