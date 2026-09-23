import { describe, expect, it, vi } from "vitest";
import { writeFileSync } from "node:fs";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "../layout";
import MechanicsPage from "./page";
import StagePage, { generateStaticParams } from "./[stage]/page";
import { MECHANICS, MECHANICS_STAGE_COUNT } from "@/data/mechanics-atlas";
import { mechanicsStages, stageContent, stageCounts, stagesFor, STAGE_SECTIONS } from "@/lib/mechanics";
import { hasMechanicsGlyph } from "@/components/MechanicsGlyph";
import { pathwayView } from "@/lib/pathway-products";
import { graph } from "@/lib/graph";
import { sitemapUrls } from "@/lib/sitemap-urls";
import { siteSearchDocs } from "@/lib/search-index";
import { nestedAnchors, structureIssues } from "../nested-anchors.test";

/**
 * The mechanics atlas: a hub that carries the journey and one card per stage, and a page per stage that carries
 * the detail. The hub used to draw every diagram inline (2.4 MB of HTML on 23 Sept 2026); the budgets here keep
 * the hub light and every stage page within reach of a phone.
 */

vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const KB = 1024;
const HUB_BUDGET = 350 * KB;
const STAGE_BUDGET = 450 * KB;

describe("mechanics atlas data", () => {
  it("has 56 stages with unique ids, a glyph each and every listed id in the corpus", () => {
    const g = graph();
    const ids = MECHANICS.flatMap((c) => c.stages.map((s) => s.id));
    expect(ids.length).toBe(MECHANICS_STAGE_COUNT);
    expect(new Set(ids).size).toBe(ids.length);
    for (const c of MECHANICS) {
      expect(hasMechanicsGlyph(c.id), `chapter glyph ${c.id}`).toBe(true);
      for (const s of c.stages) {
        expect(hasMechanicsGlyph(s.id), `stage glyph ${s.id}`).toBe(true);
        expect(s.id).toMatch(/^[a-z0-9-]+$/);
        for (const id of [...s.pathways, ...s.terms, ...s.technologies, ...s.drugs, ...s.targets, ...(s.bottlenecks ?? [])]) expect(g.get(id), `${s.id} lists ${id}`).toBeDefined();
        for (const q of [s.plain, s.title, ...s.openQuestions]) expect(q, `${s.id} copy`).not.toMatch(/[\u2013\u2014]/);
      }
    }
  });

  it("every node in every stage diagram resolves: edges point at drawn nodes and every node has a link", () => {
    const g = graph();
    for (const { stage } of mechanicsStages()) {
      for (const pid of stage.pathways) {
        const p = g.get(pid);
        expect(p?.kind, `${stage.id}: ${pid}`).toBe("pathway");
        if (p?.kind !== "pathway") continue;
        const nodeIds = new Set(p.nodes.map((n) => n.id));
        expect(nodeIds.size, `${pid} node ids unique`).toBe(p.nodes.length);
        for (const e of p.edges) {
          expect(nodeIds.has(e.from), `${pid} edge from ${e.from}`).toBe(true);
          expect(nodeIds.has(e.to), `${pid} edge to ${e.to}`).toBe(true);
        }
        for (const n of p.nodes) if (n.targetId) expect(g.get(n.targetId)?.kind, `${pid} node ${n.id} target`).toBe("target");
        const view = pathwayView(p);
        for (const n of view.nodes) expect(n.href, `${pid} node ${n.id} link`).toMatch(/^\/[a-z-]+\/[a-z0-9-]+\/$/);
      }
    }
  });

  it("stage params, sitemap and search index agree on the 56 stage routes", () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(MECHANICS_STAGE_COUNT);
    const urls = new Set(sitemapUrls().map((u) => u.url));
    const docs = new Set(siteSearchDocs().filter((d) => d.kind === "page").map((d) => d.route));
    for (const { stage } of params) {
      expect(urls.has(`https://onco.cc/mechanics/${stage}/`), `sitemap ${stage}`).toBe(true);
      expect(docs.has(`/mechanics/${stage}/`), `search ${stage}`).toBe(true);
    }
  });

  it("counts on the hub match the content of the stage page", () => {
    for (const ref of mechanicsStages()) {
      const k = stageCounts(ref.stage);
      const c = stageContent(ref);
      expect(k.players, `${ref.stage.id} players`).toBe(c.players.length);
      expect(k.medicines, `${ref.stage.id} medicines`).toBe(c.medicineCount);
      expect(k.questions, `${ref.stage.id} questions`).toBe(c.questions.text.length + c.questions.bottlenecks.length + c.questions.ideaTotal + c.escape.ideas.length);
    }
  });

  it("targets and pathways find the stages they appear in", () => {
    expect(stagesFor("pd1").map((s) => s.stage.id)).toContain("checkpoints");
    expect(stagesFor("ras-mapk").map((s) => s.stage.id)).toContain("growth-factor-signalling");
    // Drawn as a node without being listed: EGFR sits in the RTK diagram at growth-factor signalling.
    expect(stagesFor("egfr").map((s) => s.stage.id)).toContain("growth-factor-signalling");
    expect(stagesFor("no-such-record")).toEqual([]);
  });
});

describe("mechanics hub", () => {
  const html = render(createElement(MechanicsPage));

  it("carries the journey, one card per stage with three deep-linking count pills, and no inline pathway diagram", () => {
    expect(html).toContain('aria-label="The journey through the atlas"');
    for (const { stage } of mechanicsStages()) {
      // Link drops the trailing slash in a static render; the export adds it back (trailingSlash: true).
      expect(html, stage.id).toMatch(new RegExp(`href="/mechanics/${stage.id}/?"`));
      for (const sec of ["players", "medicines", "questions"]) expect(html, `${stage.id} #${sec}`).toMatch(new RegExp(`href="/mechanics/${stage.id}/?#${sec}"`));
    }
    for (const c of MECHANICS) expect(html).toContain(`id="c-${c.id}"`);
    expect(html).not.toContain("Light up a product");
    expect(html).not.toContain("pathway diagram\"");
    expect(nestedAnchors(html)).toEqual([]);
    expect(structureIssues(html)).toEqual([]);
  });

  it(`stays under ${HUB_BUDGET / KB} KB of markup`, () => {
    if (process.env.MECH_SIZES) { console.log(`size hub ${Buffer.byteLength(html, "utf8")}`); writeFileSync("/tmp/mech-hub.html", html); }
    expect(Buffer.byteLength(html, "utf8"), "mechanics hub markup").toBeLessThan(HUB_BUDGET);
  });
});

describe("mechanics stage pages", () => {
  for (const ref of mechanicsStages()) {
    it(`${ref.number} ${ref.stage.id} renders its sections, navigator and diagram within ${STAGE_BUDGET / KB} KB`, async () => {
      const html = render(await StagePage({ params: Promise.resolve({ stage: ref.stage.id }) }));
      const c = stageContent(ref);
      expect(html).toContain(`<h1`);
      expect(html).toContain('id="what-happens"');
      if (c.pathways.length) { expect(html).toContain('id="diagram"'); expect(html).toContain('pathway diagram"'); }
      if (c.players.length) expect(html).toContain('id="players"');
      if (c.medicines.length) expect(html).toContain('id="medicines"');
      if (c.questions.text.length) expect(html).toContain('id="questions"');
      if (c.evidence.papers.length) expect(html).toContain('id="evidence"');
      expect(html).toContain('id="navigator"');
      // Every section id the hub deep-links to exists whenever the count is non-zero.
      const k = stageCounts(ref.stage);
      if (k.players) expect(html).toContain('id="players"');
      if (k.medicines) expect(html).toContain('id="medicines"');
      if (k.questions) expect(html).toContain('id="questions"');
      for (const s of STAGE_SECTIONS) if (html.includes(`id="${s.id}"`)) expect(html).toContain(`href="#${s.id}"`);
      expect(nestedAnchors(html), "nested anchors").toEqual([]);
      expect(structureIssues(html), "structure").toEqual([]);
      const bytes = Buffer.byteLength(html, "utf8");
      if (process.env.MECH_SIZES) console.log(`size ${ref.stage.id} ${bytes}`);
      expect(bytes, `${ref.stage.id} markup`).toBeLessThan(STAGE_BUDGET);
    });
  }
});
