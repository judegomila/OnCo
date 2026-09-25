import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import UnitedStatesPage from "./page";
import { US_ACCELERATED, US_PAPERS, US_PEOPLE, US_TRIALS } from "@/data/country-us";
import { graph } from "@/lib/graph";

/**
 * The United States deep dive renders from two places at once: hand-written cards that carry their own sources,
 * and entity lists resolved from the graph by id. The second half is the fragile one, because an id that is
 * renamed or merged elsewhere in the corpus disappears from this page silently (`pick` filters missing ids out).
 * This test fails instead, and holds the page's markup inside the budget the country pages share.
 */
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = () => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(UnitedStatesPage)));

describe("/countries/us/", () => {
  it("resolves every listed entity id to a record of the right kind", () => {
    const g = graph();
    const expect404: string[] = [];
    for (const [ids, kind] of [[US_TRIALS, "trial"], [US_PAPERS, "paper"], [US_PEOPLE, "person"]] as const) {
      for (const id of ids) {
        const e = g.get(id);
        if (!e || e.kind !== kind) expect404.push(`${id} (wanted ${kind}, got ${e ? e.kind : "nothing"})`);
      }
    }
    expect(expect404, `country-us.ts lists ids the corpus no longer holds: ${expect404.join(", ")}`).toEqual([]);
  });

  it("states the accelerated-approval counts it computed, and their total", () => {
    const html = render();
    const total = US_ACCELERATED.rows.reduce((n, r) => n + r.count, 0);
    expect(total).toBe(239);
    expect(html).toContain(`${total} oncology indications have been granted accelerated approval since 1992`);
    for (const r of US_ACCELERATED.rows) expect(html, `missing count for ${r.id}`).toContain(`>${r.count}</span>`);
  });

  it("stays inside the markup budget", () => {
    const html = render();
    // 150 KB when written (without the root layout); the cards are prose and the entity grids are the growth risk.
    expect(Buffer.byteLength(html, "utf8"), "us markup").toBeLessThan(220 * 1024);
  });
});
