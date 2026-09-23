import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Spotlight } from "./Spotlight";
import { graph } from "@/lib/graph";
import { spotlightSets } from "@/lib/spotlight";
import { KIND_META } from "@/lib/kinds";
import { SPOTLIGHT_KINDS, SPOTLIGHT_URL, spotlightKindLabel, spotlightNeighbours } from "@/lib/spotlight-schedule";
import Home from "@/app/page";

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: React.ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));
// next/link drops the trailing slash when it renders outside the exported site (trailingSlash is applied by the build).
const hasHref = (html: string, route: string) => html.includes(`href="${route}"`) || html.includes(`href="${route.replace(/\/$/, "")}"`);

/**
 * The spotlight without JavaScript: the server renders the embedded set in full (hero, facts, pills, runners-up,
 * the kind kicker and the previous/next pills), which is what crawlers and readers without scripts get. The swap to
 * the reader's day happens after mount and is not exercised here.
 */
describe("Spotlight renders the embedded set without JavaScript", () => {
  const sets = spotlightSets(graph());

  for (const k of SPOTLIGHT_KINDS) {
    it(`${k}: title, kicker, facts, pills, runners-up and the rotation pills`, () => {
      const set = sets[k];
      const html = render(createElement(Spotlight, { embedded: set }));
      expect(html).toContain(`data-spotlight="${k}"`);
      expect(html).toContain(`Spotlight on <a`);
      expect(hasHref(html, set.hero.route), set.hero.route).toBe(true);
      expect(html).toContain("Today&#x27;s kind");
      expect(html).toContain(`<span class="capitalize">${spotlightKindLabel(k).replace(/&/g, "&amp;")}</span>`);
      for (const f of set.hero.facts) expect(html).toContain(`>${f.kicker}</div>`);
      for (const p of set.hero.pills) expect(hasHref(html, p.route), p.route).toBe(true);
      for (const r of set.runnersUp) expect(hasHref(html, r.route), r.route).toBe(true);
      const { prev, next } = spotlightNeighbours(k);
      expect(html).toContain(`data-spotlight-kind="${prev}"`);
      expect(html).toContain(`data-spotlight-kind="${next}"`);
      expect(html).toContain(`href="${SPOTLIGHT_URL}"`);
      expect(html).toContain("data-spotlight-export");
      // Fixed boxes: the swap cannot move the page.
      expect(html).toContain("h-[3lh]");
      expect((html.match(/h-\[4lh\]/g) ?? []).length).toBe(3);
      expect(html).toContain("h-[3.1rem] overflow-hidden");
      // No skeleton in the HTML, no nested anchors, no em-dashes.
      expect(html).not.toContain("animate-pulse");
      expect(html).not.toMatch(/<a [^>]*>(?:(?!<\/a>)[\s\S])*<a /);
      expect(html).not.toMatch(/—/);
    });
  }

  it("the home page embeds one set and points crawlers at the JSON of every set", () => {
    const html = render(createElement(Home));
    const m = html.match(/data-spotlight="([a-z]+)"/);
    expect(m).not.toBeNull();
    expect(SPOTLIGHT_KINDS).toContain(m![1]);
    expect(html).toContain(`rel="alternate" type="application/json" href="${SPOTLIGHT_URL}"`);
    expect((html.match(/data-spotlight=/g) ?? []).length).toBe(1);
    // The counts grid still lists every kind in rotation, so the spotlight names nothing the grid does not.
    for (const k of SPOTLIGHT_KINDS) expect(hasHref(html, `/${KIND_META[k].route}/`), k).toBe(true);
  });
});
