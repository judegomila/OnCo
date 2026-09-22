import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "./layout";
import { EN } from "@/lib/i18n/ui";
import { UI_DICTS } from "@/lib/i18n/all";
import { LANGS } from "@/lib/layer";

/**
 * The analytics gate as it reaches the visitor: the exported HTML of every page carries no Google script and no
 * consent bar (both are added in the browser, after the stored choice is read), and the footer of every page
 * carries the control that changes the choice later.
 */
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const noop = () => {};
const router = { back: noop, forward: noop, refresh: noop, hmrRefresh: noop, push: noop, replace: noop, prefetch: noop } as unknown as AppRouterInstance;
const html = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, createElement("div", { id: "probe" }, "page"))));

describe("root layout and the analytics gate", () => {
  it("ships no gtag script tag in the static HTML", () => {
    expect(html).toContain('id="probe"');
    expect(html).not.toContain("googletagmanager");
    expect(html).not.toContain("gtag(");
    expect(html).not.toContain("G-2TTJ25WSN8");
    for (const s of html.matchAll(/<script[^>]*>/g)) expect(s[0]).not.toMatch(/gtag|analytics/i);
  });

  it("renders no consent bar on the server; it appears in the browser only while no choice is stored", () => {
    expect(html).not.toContain('data-testid="analytics-consent"');
    expect(html).not.toContain(EN["consent.text"]);
  });

  it("puts the change-choice control in the footer, as a button that reads the same in every export", () => {
    const footer = html.slice(html.indexOf("<footer"), html.indexOf("</footer>"));
    expect(footer).toMatch(new RegExp(`<button[^>]*data-testid="analytics-choice"[^>]*>${EN["consent.choice"]}</button>`));
    expect(EN["consent.choice"]).toBe("Analytics choice");
  });

  it("has the consent strings in all nine languages", () => {
    const keys = ["consent.text", "consent.allow", "consent.decline", "consent.choice", "consent.state.granted", "consent.state.denied", "consent.state.unset", "consent.gpc"] as const;
    for (const l of LANGS) for (const k of keys) expect((UI_DICTS[l.code] as Record<string, string>)[k], `${l.code}: ${k}`).toBeTruthy();
    expect(EN["consent.text"]).toBe("OnCo uses Google Analytics to count visits. No advertising, nothing sold.");
  });
});
