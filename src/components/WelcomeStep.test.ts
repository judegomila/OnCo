import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { safeReturnPath, WelcomeStep } from "./WelcomeStep";
import { ACCOUNT_ROLES } from "@/lib/profile";
import { EN, UI_DICTS } from "@/lib/i18n/ui";
import { LANGS } from "@/lib/layer";

const noop = () => {};
const router = { back: noop, forward: noop, refresh: noop, hmrRefresh: noop, push: noop, replace: noop, prefetch: noop } as unknown as AppRouterInstance;
const CANCERS = [
  { id: "aml", name: "Acute myeloid leukaemia", route: "/cancers/aml/", group: "blood" },
  { id: "nsclc", name: "Non-small cell lung cancer (NSCLC)", route: "/cancers/nsclc/", group: "lung" },
];
// The chooser fetches /api/v1/my-cancers.json in the browser; here the list is handed straight to the hook.
vi.mock("@/lib/use-my-cancer-list", () => ({ useMyCancerList: () => CANCERS }));

/** `<a>` opening while another `<a>` is open (SVG subtrees skipped), the check src/app/nested-anchors.test.ts runs on every page. */
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

const render = (props: Partial<Parameters<typeof WelcomeStep>[0]> = {}) =>
  renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(WelcomeStep, { userId: "user_1", back: "/saved/", ...props })));

describe("WelcomeStep", () => {
  it("offers the four roles as pressable pills with tooltips", () => {
    const html = render();
    expect(html).toContain("Tell us who you are");
    for (const label of ["Patient", "Caregiver", "Researcher", "Medical provider"]) expect(html).toContain(`</svg>${label}</button>`);
    expect(html.match(/aria-pressed="false"/g)).toHaveLength(4);
    for (const r of ACCOUNT_ROLES) expect(html).toContain(`title="${EN[`account.welcome.hint.${r}`]}"`);
  });

  it("marks the initial role pressed and enables Continue for it", () => {
    const html = render({ initialRole: "caregiver" });
    expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
    expect(html).not.toMatch(/<button[^>]* disabled=""[^>]*>Continue</);
    expect(render()).toMatch(/<button[^>]* disabled=""[^>]*>Continue</);
  });

  it("states the consent sentence and where Skip goes", () => {
    const html = render();
    expect(html).toContain("Your role and cancer choice stay in this browser and are never sent to OnCo or anyone else. You can clear them at any time from your account menu.");
    // Link drops the trailing slash here; the site's trailingSlash config restores it in the export.
    expect(html).toMatch(/<a[^>]*href="\/saved\/?"[^>]*>Skip for now<\/a>/);
    expect(html).toContain("Your cancer type (optional)");
  });

  it("nests no anchors and keeps the pink primary button", () => {
    const html = render({ initialRole: "patient" });
    expect(nestedAnchors(html)).toEqual([]);
    expect(html).toMatch(/class="btn btn-primary[^"]*"[^>]*>Continue</);
  });

  it("has every welcome key in every language", () => {
    const keys = Object.keys(EN).filter((k) => k.startsWith("account.welcome."));
    expect(keys.length).toBeGreaterThanOrEqual(24);
    for (const l of LANGS) for (const k of keys) expect((UI_DICTS[l.code] as Record<string, string>)[k], `${l.code}: ${k}`).toBeTruthy();
  });

  it("only returns to same-origin absolute paths", () => {
    expect(safeReturnPath("/cancers/aml/")).toBe("/cancers/aml/");
    expect(safeReturnPath("/trials/?cancers=AML")).toBe("/trials/?cancers=AML");
    expect(safeReturnPath("//evil.example/")).toBe("/signup/");
    expect(safeReturnPath("https://evil.example/")).toBe("/signup/");
    expect(safeReturnPath(null)).toBe("/signup/");
    expect(safeReturnPath("")).toBe("/signup/");
  });
});
