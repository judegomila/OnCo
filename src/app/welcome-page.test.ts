import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "./layout";
import WelcomeRoute, { metadata } from "./welcome/page";
import { EN } from "@/lib/i18n/ui";
import { ACCOUNT_ROLES } from "@/lib/profile";
import { REGION_ORDER } from "@/lib/region";
import { LEVELS } from "@/lib/layer";
import { SITE_PAGES } from "@/lib/search-index";
import { staticRoutes } from "@/lib/sitemap-urls";

/**
 * /welcome/ as the exported HTML has it: the step for a visitor whose session is not yet known (a session never
 * exists on the server), which is also what a signed-out visitor sees. Roles, cancer chooser, country and view
 * pills, the consent sentence, the sign-in control, JSON-LD, no nested anchors, and the page listed for search.
 */
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));
// The chooser fetches /api/v1/my-cancers.json in the browser; here the list is handed straight to the hook.
vi.mock("@/lib/use-my-cancer-list", () => ({ useMyCancerList: () => [{ id: "aml", name: "Acute myeloid leukaemia", route: "/cancers/aml/", group: "blood" }] }));

const noop = () => {};
const router = { back: noop, forward: noop, refresh: noop, hmrRefresh: noop, push: noop, replace: noop, prefetch: noop } as unknown as AppRouterInstance;
const withRouter = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));

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

const html = withRouter(createElement(WelcomeRoute));

describe("/welcome/", () => {
  it("carries the heading, the four role pills with glyphs and tooltips, and the consent sentence", () => {
    expect(html).toContain("Tell us two things");
    expect(EN["account.welcome.title"]).toBe("Tell us two things");
    for (const label of ["Patient", "Caregiver", "Researcher", "Medical provider"]) expect(html).toContain(`</svg>${label}</button>`);
    for (const r of ACCOUNT_ROLES) expect(html).toContain(`title="${EN[`account.welcome.hint.${r}`]}"`);
    expect(html).toContain(EN["account.welcome.consent"]);
    expect(EN["account.welcome.consent"]).toContain("preferences");
    expect(html).toContain(EN["account.welcome.cancer"]);
  });

  it("prefills country and data view as optional pill rows below the cancer chooser", () => {
    expect(html).toContain(EN["account.welcome.region"]);
    expect(html).toContain(EN["account.welcome.view"]);
    expect(html).toContain(`aria-pressed="true"`);
    // Global is pressed until a country is chosen; each country pill carries its flag and regulator tooltip.
    expect(html).toMatch(/aria-pressed="true"[^>]*title="[^"]*"[^>]*><span aria-hidden="true" class="text-base leading-none">🌐<\/span>Global<\/button>/);
    for (const r of REGION_ORDER) expect(html).toContain(EN[`country.${r}`]);
    for (const l of LEVELS) expect(html).toContain(`</svg>${EN[`level.${l.code}`]}</button>`);
    const cancerAt = html.indexOf(EN["account.welcome.cancer"]), regionAt = html.indexOf(EN["account.welcome.region"]), viewAt = html.indexOf(EN["account.welcome.view"]);
    expect(cancerAt).toBeLessThan(regionAt);
    expect(regionAt).toBeLessThan(viewAt);
  });

  it("shows the sign-in control with a short note when no session is known", () => {
    expect(html).toContain('data-testid="welcome-signed-out"');
    expect(html).toContain(EN["account.welcome.signedOut"]);
    expect(html).toMatch(/class="btn btn-primary[^"]*"[^>]*>Sign in\/up<\/button>/);
    expect(html).not.toContain(">Continue</button>");
  });

  it("nests no anchors, has no em-dashes and carries page metadata and JSON-LD", () => {
    expect(nestedAnchors(withRouter(createElement(RootLayout, null, createElement(WelcomeRoute))))).toEqual([]);
    expect(html).not.toMatch(/—|–/);
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('"@type":"WebPage"');
    expect(html).toContain('"url":"https://onco.cc/welcome/"');
    expect(metadata.title).toBe("Tell us two things");
    expect(metadata.robots).toMatchObject({ index: false });
  });

  it("is listed for site search and exported as a static route", () => {
    expect(SITE_PAGES.map((p) => p.href)).toContain("/welcome/");
    expect(staticRoutes()).toContain("/welcome/");
  });
});
