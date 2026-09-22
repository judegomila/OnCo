import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IDEA_PICKS } from "@/data/idea-picks";
import { EN } from "@/lib/i18n/ui";
import IdeaRankingsPage from "@/app/ideas/rankings/page";
import { graph } from "./graph";
import { combinedRank, RANK_PAGE, rankAll, rankView, scoreParts, VIEW_IDS, VIEWS, viewScore, type ScoreParts } from "./idea-rankings";

const base: Pick<ScoreParts, "burden" | "breadth" | "evidence" | "costRank" | "horizon" | "maturityRank"> = { burden: 1_000_000, breadth: 2, evidence: 1, costRank: 2, horizon: 5, maturityRank: 2 };

describe("idea ranking scores", () => {
  it("more burden ranks higher in Most important; more cost ranks lower in Best bang for buck", () => {
    expect(viewScore("most-important", { ...base, burden: 2_000_000 })!).toBeGreaterThan(viewScore("most-important", base)!);
    expect(viewScore("most-important", { ...base, breadth: 3 })!).toBeGreaterThan(viewScore("most-important", base)!);
    expect(viewScore("bang-for-buck", { ...base, costRank: 3 })!).toBeLessThan(viewScore("bang-for-buck", base)!);
    expect(viewScore("bang-for-buck", { ...base, horizon: 10 })!).toBeLessThan(viewScore("bang-for-buck", base)!);
    expect(viewScore("bang-for-buck", { ...base, burden: 2_000_000 })!).toBeGreaterThan(viewScore("bang-for-buck", base)!);
    expect(viewScore("hardest", { ...base, costRank: 3, horizon: 15, maturityRank: 1, evidence: 0 })!).toBeGreaterThan(viewScore("hardest", base)!);
    expect(viewScore("closest-to-reality", { ...base, maturityRank: 4, evidence: 5 })!).toBeGreaterThan(viewScore("closest-to-reality", base)!);
  });

  it("refuses to score what it cannot: no burden, no cost band or no horizon", () => {
    expect(viewScore("bang-for-buck", { ...base, burden: 0 })).toBeNull();
    expect(viewScore("bang-for-buck", { ...base, costRank: 0 })).toBeNull();
    expect(viewScore("bang-for-buck", { ...base, horizon: undefined })).toBeNull();
    expect(viewScore("most-important", { ...base, burden: 0 })).toBeNull();
    expect(viewScore("hardest", { ...base, costRank: 0 })).toBeNull();
    expect(viewScore("closest-to-reality", { ...base, burden: 0, costRank: 0, horizon: undefined })).not.toBeNull();
  });

  it("ideas without cancers get burden 0, never NaN, and every part is finite", () => {
    const parts = scoreParts();
    expect(parts).toHaveLength(graph().kind("idea").length);
    for (const p of parts) {
      expect(Number.isFinite(p.burden), p.id).toBe(true);
      expect(p.burden).toBeGreaterThanOrEqual(0);
      if (p.breadth === 0) { expect(p.burden, p.id).toBe(0); expect(p.sites, p.id).toEqual([]); }
      if (p.burden > 0) expect(p.breadth, p.id).toBeGreaterThan(0);
      for (const n of [p.breadth, p.evidence, p.trials, p.phase3, p.drugs, p.papers, p.costRank, p.maturityRank]) expect(Number.isFinite(n), p.id).toBe(true);
      expect(p.maturityRank).toBeGreaterThanOrEqual(1);
      expect(p.maturityRank).toBeLessThanOrEqual(4);
      expect(p.costRank).toBeLessThanOrEqual(3);
    }
    expect(parts.some((p) => p.breadth === 0)).toBe(true);
    expect(parts.some((p) => p.burden > 0)).toBe(true);
  });

  it("a site shared by several linked cancers is counted once", () => {
    const parts = scoreParts();
    for (const p of parts) {
      const codes = p.sites.map((s) => s.code);
      expect(new Set(codes).size, p.id).toBe(codes.length);
      expect(p.burden, p.id).toBe(p.sites.reduce((a, s) => a + (s.cases ?? 0), 0));
    }
  });

  it("ranked lists are sorted, numbered from 1 and capped at the limit", () => {
    for (const v of rankAll(50)) {
      expect(v.rows.length).toBeLessThanOrEqual(50);
      v.rows.forEach((r, i) => expect(r.rank).toBe(i + 1));
      const scores = v.rows.map((r) => r.score).filter((s): s is number => s !== null);
      for (let i = 1; i < scores.length; i++) expect(scores[i], `${v.view.id} row ${i}`).toBeLessThanOrEqual(scores[i - 1]);
      if (v.view.id !== "most-wanted") expect(v.rows.length).toBeGreaterThan(0);
    }
    const important = rankView("most-important", 50);
    for (let i = 1; i < important.rows.length; i++) {
      const a = important.rows[i - 1].parts, b = important.rows[i].parts;
      expect(a.burden * a.breadth).toBeGreaterThanOrEqual(b.burden * b.breadth);
    }
  });

  it("Most wanted is unavailable until votes.json carries a thumbs-up", () => {
    const empty = rankView("most-wanted", 50, scoreParts(), { generated: "2026-01-01", total: 0, votes: {} });
    expect(empty.available).toBe(false);
    expect(empty.rows).toEqual([]);
    const first = scoreParts()[0];
    const one = rankView("most-wanted", 50, scoreParts(), { generated: "2026-01-01", total: 1, votes: { [first.id]: { up: 3, reactions: 3, comments: 0, url: "https://github.com/judegomila/OnCo/discussions/1", title: first.id } } });
    expect(one.available).toBe(true);
    expect(one.rows[0].parts.id).toBe(first.id);
    expect(one.rows[0].score).toBe(3);
  });

  it("cherry picks are real ideas, unique, with one sentence each", () => {
    const g = graph();
    const ids = IDEA_PICKS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBeGreaterThanOrEqual(12);
    for (const pick of IDEA_PICKS) {
      const e = g.get(pick.id);
      expect(e?.kind, pick.id).toBe("idea");
      expect(pick.reason.trim().length, pick.id).toBeGreaterThan(20);
      expect(pick.reason.trim().endsWith("."), pick.id).toBe(true);
      expect(pick.reason.includes("—"), pick.id).toBe(false);
    }
    const view = rankView("cherry-picked", 50);
    expect(view.rows.map((r) => r.parts.id)).toEqual(ids.slice(0, 50));
    expect(view.rows.every((r) => !!r.reason)).toBe(true);
  });

  it("the combined rank that seeded the picks prefers ideas ranked in every computed view", () => {
    const top = combinedRank().slice(0, 12);
    for (const t of top) expect(Object.keys(t.ranks).length, t.id).toBe(4);
    expect(top[0].sum).toBeLessThanOrEqual(top[11].sum);
  });

  it("every view has a name, a formula and dictionary strings", () => {
    expect(VIEWS.map((v) => v.id)).toEqual([...VIEW_IDS]);
    for (const v of VIEWS) {
      expect(v.formula.length).toBeGreaterThan(20);
      expect(EN[`rank.view.${v.id}` as keyof typeof EN]).toBe(v.label);
      expect(EN[`rank.formula.${v.id}` as keyof typeof EN]).toBe(v.formula);
    }
  });
});

describe("/ideas/rankings/ page", () => {
  const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
  const html = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(IdeaRankingsPage)));

  it("renders the first page of the default view with its links, and the top of every other view", () => {
    expect(html).toContain("Best bang for buck");
    expect(html).toContain("Idea rankings");
    const top = rankView("bang-for-buck", RANK_PAGE).rows;
    expect(top).toHaveLength(RANK_PAGE);
    // The other views are on the page too (hidden until picked), so a deep link and a crawler both find them.
    for (const v of ["most-important", "hardest", "closest-to-reality", "cherry-picked"]) expect(html).toContain(`id="h-${v}"`);
    expect(html).toContain("Why it is picked");
    // next/link drops the trailing slash when rendered outside a Next build; the export adds it back.
    const href = (route: string) => new RegExp(`href="${route.replace(/\/$/, "")}/?"`);
    for (const r of top.slice(0, 5)) {
      expect(html).toMatch(href(r.parts.route));
      for (const c of r.parts.cancers.slice(0, 3)) expect(html).toMatch(href(c.route));
    }
    expect(html).toContain("/ideas/rankings/?view=most-important");
  });

  it("renders no anchor inside another anchor", () => {
    let open = 0, svg = 0;
    const nested: string[] = [];
    for (const m of html.matchAll(/<(\/?)(a|svg)(?=[\s>/])/g)) {
      if (m[2] === "svg") { svg = Math.max(0, svg + (m[1] ? -1 : 1)); continue; }
      if (svg > 0) continue;
      if (m[1]) { open = Math.max(0, open - 1); continue; }
      if (open > 0) nested.push(html.slice(Math.max(0, m.index - 120), m.index + 80));
      open++;
    }
    expect(nested).toEqual([]);
  });
});
