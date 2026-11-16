import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import SriLankaPage from "./page";
import { LK_DIVE as D } from "@/data/country-lk";
import { diveCards, diveIds } from "@/data/country-dive";
import { graph } from "@/lib/graph";

vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));
const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = () => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(SriLankaPage)));

/**
 * /countries/lk/ is hand-written cards plus entity lists pulled from the graph. The lists are the part that rots:
 * a renamed or merged id silently drops a card, so they are checked against the graph rather than against a count.
 */
describe("Sri Lanka deep dive", () => {
  const g = graph();
  const cards = diveCards(D);

  it("every entity id in the page lists exists in the graph", () => {
    const missing = diveIds(D).filter((id) => !g.get(id));
    expect(missing, `ids with no record: ${missing.join(", ")}`).toEqual([]);
  });

  it("every card has a plain paragraph, a detail paragraph and at least one source", () => {
    for (const card of cards) {
      expect(card.plain.length, card.id).toBeGreaterThan(80);
      expect(card.detail.length, card.id).toBeGreaterThan(200);
      expect(card.links.length, card.id).toBeGreaterThan(0);
      for (const l of card.links) expect(l.url, `${card.id}: ${l.label}`).toMatch(/^(https?:\/\/|\/)/);
    }
  });

  it("card and section ids are unique, so the anchors resolve", () => {
    const ids = [...cards.map((c) => c.id), ...D.sections.map((s) => s.id), "institutions", "companies", "trials", "people", "gaps"];
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("house style: no em-dashes and no 'as of' stamps in the prose", () => {
    for (const card of cards) {
      const prose = `${card.title} ${card.plain} ${card.detail}`;
      expect(prose, card.id).not.toMatch(/[\u2014\u2013]/);
      expect(prose, card.id).not.toMatch(/\bas of\b/i);
    }
  });

  it("renders the sections that answer the brief, inside its markup budget", () => {
    const html = render();
    for (const anchor of ["profile", "paying", "regulator", "doing", "institutions", "companies", "trials", "people", "gaps"]) {
      expect(html, anchor).toContain(`id="${anchor}"`);
    }
    expect(html).toContain("Cancer in Sri Lanka");
    expect(D.sections.find((s) => s.id === "profile")?.tables?.length, "the registry's own figures").toBeGreaterThan(0);
    // The budget leaves room for the entity lists to grow with the corpus.
    expect(Buffer.byteLength(html, "utf8"), "markup").toBeLessThan(150 * 1024);
  });
});
