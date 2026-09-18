import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SiteHeader } from "./SiteChrome";
import { SignedInPill } from "./AccountMenu";
import { displayName, type Session } from "@/lib/account";
import { UI_DICTS } from "@/lib/i18n/ui";

/**
 * The header as a first-time visitor sees it (no session, English). Two things the owner asked for and one that
 * HTML forbids: a visible "Sign up or log in" control rather than a bare icon, every control on the same 40px box
 * so they share a centre line, and no anchor nested inside another (the GitHub link and the sign-in link are
 * siblings of the other controls, never children of one).
 */
const router: AppRouterInstance = { push() {}, replace() {}, prefetch() {}, back() {}, forward() {}, refresh() {}, bfcacheId: "static" };
const html = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(SiteHeader)));

/** Tags in document order, so nesting can be walked without a DOM. */
const tags = (s: string) => [...s.matchAll(/<(\/?)([a-zA-Z][\w-]*)[^>]*?(\/?)>/g)].map((m) => ({ close: m[1] === "/", name: m[2].toLowerCase(), self: m[3] === "/" }));

describe("site header, signed out", () => {
  it("shows the sign-in call to action with the user glyph and a tooltip", () => {
    const label = UI_DICTS.en["account.signInCta"];
    expect(label).toBe("Sign up or log in");
    expect(html).toContain(`>${label}</span>`);
    expect(html).toContain(`title="${label}"`);
    // Primary pill in the accent, same 40px control box as its neighbours; the label steps out below sm.
    const start = html.indexOf('class="ctl btn-primary');
    expect(start).toBeGreaterThanOrEqual(0);
    const cta = html.slice(start, html.indexOf(`>${label}</span>`, start) + 1);
    expect(cta).toContain("w-10 px-0 sm:w-auto sm:px-3");
    expect(cta).toContain('<span class="hidden sm:inline">');
    expect(cta).toMatch(/<svg[^>]*><circle cx="12" cy="8" r="4">/);
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

/**
 * The signed-in pill, rendered on its own with a session (one never exists on the server, so the header above
 * cannot show it): same 40px box, initial circle with the green dot, first name, the role as a quiet chip from sm
 * up, and the "Signed in as" tooltip. Clicking it opens the account popover (aria-haspopup="menu").
 */
describe("site header, signed in", () => {
  const session: Session = { access_token: "a", refresh_token: "r", expires_at: Date.now() + 3600_000, user: { id: "user_1", email: "jude@example.com", name: "Jude Gomila", firstName: "Jude" } };
  const pill = (role?: "patient" | "caregiver" | "researcher" | "provider", s: Session = session) =>
    renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(SignedInPill, { session: s, role, open: false, onToggle() {} })));

  it("shows the initial circle, a green dot, the first name and the role chip, in the shared control box", () => {
    const html = pill("patient");
    expect(html).toContain('data-testid="signed-in-pill"');
    expect(html).toMatch(/<button[^>]*class="ctl gap-2 px-1\.5 sm:px-2\.5"/);
    expect(html).toContain('aria-haspopup="menu"');
    expect(html).toContain('title="Signed in as jude@example.com"');
    expect(html).toMatch(/rounded-full bg-accent text-white[^>]*>J<span class="[^"]*bg-emerald-500/);
    expect(html).toContain('<span class="hidden sm:inline text-[13px] font-medium leading-none">Jude</span>');
    expect(html).toMatch(/<span class="chip hidden sm:inline-flex[^"]*"><svg[\s\S]*?<\/svg>Patient<\/span>/);
    expect(html).toContain(">·</span>");
  });

  it("leaves out the chip and separator when no role is stored, and falls back to the email's local part", () => {
    const html = pill(undefined, { ...session, user: { id: "user_2", email: "ada.lovelace@example.com" } });
    expect(html).not.toContain("chip");
    expect(html).not.toContain(">·</span>");
    expect(html).toContain(">ada.lovelace</span>");
    expect(html).toMatch(/text-white[^>]*>A</);
    expect(displayName({ id: "x", email: "x@example.com", name: "Grace Hopper" })).toBe("Grace");
    expect(displayName({ id: "x", email: "x@example.com" })).toBe("x");
  });
});
