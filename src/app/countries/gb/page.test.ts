import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "../../layout";
import UnitedKingdomPage from "./page";
import { graph } from "@/lib/graph";
import { UK_PATHWAYS, ukPathwayRoute } from "@/lib/uk-pathway";
import {
  GB_COMPANIES, GB_DOING, GB_FAILING, GB_GAPS, GB_INSTITUTIONS, GB_MEDICINES, GB_NATIONS,
  GB_PAPERS, GB_PAYING, GB_PEOPLE, GB_PROFILE, GB_REFUSALS, GB_SURVMARK, GB_TRIALS,
} from "@/data/country-gb";

/**
 * /countries/gb/ is the country-level page the eight NHS pathway pages imply. Three things are worth a gate.
 *
 * The entity lists are ids typed by hand; a typo silently drops a card, so every id must resolve to a record of
 * the kind the page filters for. The page's whole reason for existing is that it does not restate the pathway
 * pages, so it must link every one of them. And the distinction between a refusal, a terminated appraisal and a
 * medicine never appraised is the thing three review passes have found this corpus getting wrong, so the four
 * worked examples must survive any edit to the page.
 */

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const KB = 1024;
/** React escapes text nodes; compare against the escaped form rather than the source string. */
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

describe("/countries/gb/", () => {
  const html = render(createElement(UnitedKingdomPage));

  it("resolves every hand-written entity id to a record of the right kind", () => {
    const g = graph();
    const wrong: string[] = [];
    const check = (ids: string[], kind: string) => {
      for (const id of ids) {
        const e = g.get(id);
        if (!e) wrong.push(`${id} (missing)`);
        else if (e.kind !== kind) wrong.push(`${id} (${e.kind}, expected ${kind})`);
      }
    };
    check(GB_INSTITUTIONS, "institution");
    check(GB_COMPANIES, "company");
    check(GB_TRIALS, "trial");
    check(GB_PAPERS, "paper");
    check(GB_PEOPLE, "person");
    expect(wrong, wrong.join(", ")).toEqual([]);
  });

  it("links every cancer that has an NHS pathway page, because it deliberately does not restate them", () => {
    expect(UK_PATHWAYS.length).toBeGreaterThanOrEqual(8);
    for (const p of UK_PATHWAYS) {
      // next/link drops the trailing slash outside the Next build; both address the same page.
      const route = ukPathwayRoute(p.cancerId).replace(/\/$/, "");
      expect(html, p.cancerId).toContain(`href="${route}`);
      expect(html, `${p.cancerId} name`).toContain(esc(p.cancerName));
    }
  });

  it("carries a worked example of all four kinds of no, each with its source", () => {
    const kinds = GB_REFUSALS.map((r) => r.id);
    expect(kinds).toEqual(["refused", "terminated", "non-submission-smc", "never-appraised"]);
    for (const r of GB_REFUSALS) {
      expect(html, `${r.id} heading`).toContain(esc(r.kind));
      expect(html, `${r.id} source`).toContain(`href="${r.url}"`);
      expect(r.example.length, `${r.id} example`).toBeGreaterThan(30);
      expect(r.quote, `${r.id} quote`).toMatch(/[“"]/);
    }
    // The termination row must be the one that names the separate NICE address, because that is the machine-readable tell.
    expect(GB_REFUSALS.find((r) => r.id === "terminated")?.meaning).toContain("guidance/terminated");
  });

  it("renders every card and gap, with a source on each card", () => {
    const cards = [...GB_PROFILE, ...GB_NATIONS, ...GB_PAYING, ...GB_MEDICINES, ...GB_DOING, ...GB_FAILING];
    expect(cards.length).toBeGreaterThan(15);
    for (const c of cards) {
      expect(html, c.id).toContain(`id="${c.id}"`);
      expect(c.links.length, `${c.id} sources`).toBeGreaterThan(0);
      expect(c.plain.length, `${c.id} plain`).toBeGreaterThan(120);
      expect(c.detail.length, `${c.id} detail`).toBeGreaterThan(c.plain.length);
    }
    for (const gap of GB_GAPS) expect(html, gap.slice(0, 40)).toContain(esc(gap.slice(0, 60)));
  });

  it("states the survival comparison with both cohorts, so the trend is not hidden by the gap", () => {
    expect(GB_SURVMARK.length).toBe(7);
    for (const r of GB_SURVMARK) {
      expect(html, r.site).toContain(`${r.uk.toFixed(1)}%`);
      expect(r.uk, `${r.site} rose`).toBeGreaterThan(r.uk1995);
      expect(r.rank, `${r.site} rank`).toBeGreaterThanOrEqual(5);
    }
  });

  it("stays inside its markup budget", () => {
    // Measured 25 September 2026 at 22 cards, 4 refusal examples, 8 pathway rows and 5 entity grids.
    expect(html.length, `${Math.round(html.length / KB)} KB`).toBeLessThan(420 * KB);
  });
});
