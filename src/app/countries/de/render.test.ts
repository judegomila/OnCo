import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import GermanyPage from "./page";
import { DE_ASSESSMENT, DE_CERTIFICATION, DE_COMPANIES, DE_DOING, DE_GAPS, DE_INSTITUTIONS, DE_PAPERS, DE_PAYING, DE_PEOPLE, DE_PRECISION, DE_PROFILE, DE_REGISTRIES, DE_REGULATOR, DE_TRIALS } from "@/data/country-de";
import { graph } from "@/lib/graph";

vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));
const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = () => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(GermanyPage)));

/**
 * /countries/de/ is hand-written cards plus entity lists pulled from the graph. The lists are the part that rots:
 * a renamed or merged id silently drops a card, so they are checked against the graph rather than against a count.
 */
describe("Germany deep dive", () => {
  const g = graph();
  const ALL_CARDS = [DE_PROFILE, DE_REGISTRIES, DE_PAYING, DE_ASSESSMENT, DE_REGULATOR, DE_CERTIFICATION, DE_PRECISION, DE_DOING, DE_GAPS];

  it("every entity id in the page lists exists in the graph", () => {
    const missing = [...DE_INSTITUTIONS, ...DE_COMPANIES, ...DE_TRIALS, ...DE_PAPERS, ...DE_PEOPLE].filter((id) => !g.get(id));
    expect(missing, `ids with no record: ${missing.join(", ")}`).toEqual([]);
  });

  it("every card has a plain paragraph, a detail paragraph and at least one source", () => {
    for (const card of ALL_CARDS.flat()) {
      expect(card.plain.length, card.id).toBeGreaterThan(80);
      expect(card.detail.length, card.id).toBeGreaterThan(200);
      expect(card.links.length, card.id).toBeGreaterThan(0);
      for (const l of card.links) expect(l.url, `${card.id}: ${l.label}`).toMatch(/^(https?:\/\/|\/)/);
    }
  });

  it("card ids are unique, so the anchors resolve", () => {
    const ids = ALL_CARDS.flat().map((c) => c.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("house style: no em-dashes and no 'as of' stamps in the prose", () => {
    for (const card of ALL_CARDS.flat()) {
      const prose = `${card.title} ${card.plain} ${card.detail}`;
      expect(prose, card.id).not.toMatch(/[—–]/);
      expect(prose, card.id).not.toMatch(/\bas of\b/i);
    }
  });

  it("renders with the sections that answer the brief", () => {
    const html = render();
    for (const anchor of ["profile", "registries", "paying", "assessment", "regulator", "certification", "precision", "institutions", "companies", "trials", "people", "doing", "gaps"]) {
      expect(html, anchor).toContain(`id="${anchor}"`);
    }
    expect(html).toContain("Cancer in Germany");
    expect(html).toContain("Krebs in Deutschland");
  });
});
