import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SiteHeader } from "./SiteChrome";
import { ME_URL, meHref } from "./AccountMenu";
import { UI_DICTS } from "@/lib/i18n/all";
import { LANGS } from "@/lib/layer";

/**
 * The header as every visitor sees it (onco.cc has no sessions, so there is only one state). Two things the owner
 * asked for and one that HTML forbids: a visible "Sign in/up" control rather than a bare icon, every control on the
 * same 40px box so they share a centre line, and no anchor nested inside another (the GitHub link and the sign-in
 * link are siblings of the other controls, never children of one). The sign-in control is a bridge: a plain anchor
 * to the signed-in site me.onco.cc that reads no session and, once mounted, carries the current address as `back`.
 */
const router: AppRouterInstance = { push() {}, replace() {}, prefetch() {}, back() {}, forward() {}, refresh() {}, bfcacheId: "static" };
const html = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(SiteHeader)));

/** Tags in document order, so nesting can be walked without a DOM. */
const tags = (s: string) => [...s.matchAll(/<(\/?)([a-zA-Z][\w-]*)[^>]*?(\/?)>/g)].map((m) => ({ close: m[1] === "/", name: m[2].toLowerCase(), self: m[3] === "/" }));

describe("site header", () => {
  it("shows the sign-in call to action with the user glyph and a tooltip", () => {
    const label = UI_DICTS.en["account.signInCta"];
    expect(label).toBe("Sign in/up");
    expect(html).toContain(`>${label}</span>`);
    expect(html).toContain(`title="${label}"`);
    // Primary pill in the accent, same 40px control box as its neighbours; the label steps out below sm.
    const start = html.indexOf('class="ctl btn-primary');
    expect(start).toBeGreaterThanOrEqual(0);
    const cta = html.slice(start, html.indexOf(`>${label}</span>`, start) + 1);
    expect(cta).toContain("w-10 px-0 sm:w-auto sm:px-2.5");
    expect(cta).toContain('<span class="hidden sm:inline">');
    expect(cta).toMatch(/<svg[^>]*><circle cx="12" cy="8" r="4">/);
  });

  it("links the sign-in pill to the signed-in site in the same tab, with no session code behind it", () => {
    const a = html.match(/<a [^>]*data-testid="sign-in-bridge"[^>]*>/)?.[0] ?? "";
    // The exported HTML carries the bare address; the page's own address is only known in the browser.
    expect(a).toContain(`href="${ME_URL}"`);
    expect(a).not.toContain("target=");
    expect(a).not.toContain('href="/signup/"');
    expect(meHref("https://onco.cc/cancers/aml/?tab=trials#phase-3")).toBe("https://me.onco.cc/signin/?back=https%3A%2F%2Fonco.cc%2Fcancers%2Faml%2F%3Ftab%3Dtrials%23phase-3");
    expect(meHref(null)).toBe(ME_URL);
    // Nothing signed-in is left in the header: no avatar pill, popover, sync line or delete control.
    for (const gone of ["signed-in-pill", "cloud-sync", "preference-chips", 'role="menu"', "Delete my account"]) expect(html).not.toContain(gone);
  });

  it("keeps the sign-in label in all nine languages", () => {
    for (const l of LANGS) expect((UI_DICTS[l.code] as Record<string, string>)["account.signInCta"], l.code).toBeTruthy();
  });

  it("nests no anchor inside another anchor", () => {
    let open = 0;
    for (const t of tags(html)) {
      if (t.name !== "a") continue;
      if (t.close) { open -= 1; continue; }
      expect(open, "an <a> opened while another <a> was open").toBe(0);
      if (!t.self) open += 1;
    }
    expect(open).toBe(0);
  });

  it("wraps every header control in a flex box so nothing sits on a text baseline", () => {
    // A wrapper that is display:block puts its inline-flex button on a line box, leaving a descender gap below it.
    const header = html.slice(0, html.indexOf("</header>"));
    const wrappers = [...header.matchAll(/<div class="(relative[^"]*)"><button/g)].map((m) => m[1]);
    expect(wrappers.length).toBeGreaterThanOrEqual(2);
    for (const c of wrappers) expect(c, c).toMatch(/\bflex\b/);
    // Every control shares the .ctl box (40px, items-center).
    expect((header.match(/class="ctl[ "]/g) ?? []).length).toBeGreaterThanOrEqual(5);
  });
});
