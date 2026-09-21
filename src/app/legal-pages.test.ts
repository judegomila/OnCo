import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "./layout";
import TermsOfUsePage from "./terms-of-use/page";
import PrivacyPage from "./privacy/page";
import { EN } from "@/lib/i18n/ui";
import { UI_DICTS } from "@/lib/i18n/all";
import { LANGS } from "@/lib/layer";
import { SITE_PAGES } from "@/lib/search-index";
import { staticRoutes } from "@/lib/sitemap-urls";

/**
 * The legal pages (/terms-of-use/ and /privacy/) and the footer's medical disclaimer: both pages render with
 * react-dom/server, nest no anchors, carry their key sections, placeholders and JSON-LD, and the footer links to the
 * terms. /terms/ is the glossary, which is why the terms live at /terms-of-use/.
 */
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const noop = () => {};
const router = { back: noop, forward: noop, refresh: noop, hmrRefresh: noop, push: noop, replace: noop, prefetch: noop } as unknown as AppRouterInstance;
const withRouter = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));
const inLayout = (el: ReactElement) => withRouter(createElement(RootLayout, null, el));

/** `<a>` opening while another `<a>` is open (SVG subtrees skipped), the same check src/app/nested-anchors.test.ts runs on every page. */
function nestedAnchors(html: string): string[] {
  const found: string[] = [];
  let open = 0, svg = 0;
  for (const m of html.matchAll(/<(\/?)(a|svg)(?=[\s>/])/g)) {
    if (m[2] === "svg") { svg = Math.max(0, svg + (m[1] ? -1 : 1)); continue; }
    if (svg > 0) continue;
    if (m[1]) { open = Math.max(0, open - 1); continue; }
    if (open > 0) found.push(html.slice(Math.max(0, m.index - 80), m.index + 80));
    open++;
  }
  return found;
}

const terms = withRouter(createElement(TermsOfUsePage));
const privacy = withRouter(createElement(PrivacyPage));
const year = String(new Date().getFullYear());

describe("terms of use", () => {
  it("renders the key sections with icons, a contents strip and JSON-LD", () => {
    for (const id of ["purpose", "not-medical-advice", "accuracy", "your-responsibilities", "accounts", "licences", "external-links", "liability", "changes", "governing-law", "contact"]) {
      expect(terms, id).toContain(`<section id="${id}"`);
      expect(terms, id).toContain(`href="#${id}"`);
    }
    expect(terms).toContain('aria-label="Contents"');
    expect(terms).toMatch(/<h2[^>]*><svg/);
    expect(terms).toContain('type="application/ld+json"');
    expect(terms).toContain('"@type":"WebPage"');
    expect(terms).toContain('"url":"https://onco.cc/terms-of-use/"');
  });

  it("states the substance and leaves the owner's placeholders visible", () => {
    expect(terms).toContain("not medical advice, diagnosis or treatment");
    expect(terms).toContain("CC BY-NC 4.0");
    expect(terms).toContain("MIT licence");
    expect(terms).toContain("me.onco.cc");
    expect(terms).not.toMatch(/WorkOS|Supabase/);
    expect(terms).toContain("[jurisdiction]");
    expect(terms).toContain("[legal entity and address]");
    expect(terms).toContain("[contact email]");
    expect(terms).toContain("github.com/judegomila/OnCo/issues");
    expect(terms).toContain("Last updated");
    expect(terms).toContain(year);
  });

  it("nests no anchors and follows house style", () => {
    expect(nestedAnchors(inLayout(createElement(TermsOfUsePage)))).toEqual([]);
    expect(terms).not.toMatch(/—|–|\bas of\b/);
  });
});

describe("privacy policy", () => {
  it("renders the key sections with icons, a contents strip and JSON-LD", () => {
    for (const id of ["who", "summary", "hosting", "analytics", "accounts", "on-your-device", "newsletter", "storage", "health", "third-parties", "no-ads", "rights", "children", "transfers", "changes", "contact"]) {
      expect(privacy, id).toContain(`<section id="${id}"`);
      expect(privacy, id).toContain(`href="#${id}"`);
    }
    expect(privacy).toContain('aria-label="Contents"');
    expect(privacy).toContain('"@type":"WebPage"');
    expect(privacy).toContain('"url":"https://onco.cc/privacy/"');
  });

  it("describes only the data flows the code has", () => {
    expect(privacy).toContain("G-2TTJ25WSN8");
    // No account data on this site: the header's Sign in/up links to me.onco.cc, which has its own privacy notice.
    expect(privacy).toContain('href="https://me.onco.cc/privacy/"');
    expect(privacy).not.toMatch(/WorkOS|Supabase|api\.workos\.com|onco:session|onco:account-profile|onco:pkce/);
    expect(privacy).toContain("onco:profile:v1");
    expect(privacy).toContain("onco:watchlist:v1");
    expect(privacy).toContain("service worker");
    expect(privacy).toContain("clinicaltrials.gov");
    expect(privacy).toContain("nominatim.openstreetmap.org");
    expect(privacy).toContain("[legal entity and address]");
    expect(privacy).toContain("[contact email]");
    expect(privacy).toContain("tools.google.com/dlpage/gaoptout");
    expect(privacy).toContain("Last updated");
    expect(privacy).toContain(year);
    expect(privacy).toContain('<time dateTime="');
  });

  it("nests no anchors and follows house style", () => {
    expect(nestedAnchors(inLayout(createElement(PrivacyPage)))).toEqual([]);
    expect(privacy).not.toMatch(/—|–|\bas of\b/);
  });
});

describe("footer", () => {
  const html = inLayout(createElement("div"));
  it("carries the one-line medical disclaimer linked to the terms, and links both legal pages", () => {
    expect(html).toContain(EN["footer.medical"]);
    expect(html).toMatch(/data-testid="footer-medical"[^>]*>[^<]*<a[^>]*href="\/terms-of-use\/?"/);
    expect(html).toMatch(/<a[^>]*href="\/privacy\/?"/);
  });

  it("has the footer strings in all nine languages", () => {
    for (const l of LANGS) for (const k of ["footer.medical", "footer.terms", "footer.privacy"] as const) expect((UI_DICTS[l.code] as Record<string, string>)[k], `${l.code}: ${k}`).toBeTruthy();
  });
});

describe("discoverability", () => {
  it("lists both pages for site search and the sitemap", () => {
    expect(SITE_PAGES.map((p) => p.href)).toEqual(expect.arrayContaining(["/terms-of-use/", "/privacy/"]));
    expect(staticRoutes()).toEqual(expect.arrayContaining(["/terms-of-use/", "/privacy/"]));
  });
});
