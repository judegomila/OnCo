import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "@/app/layout";
import CheckpointsHub from "@/app/checkpoints/page";
import ImmunePage from "@/app/checkpoints/immune/page";
import CellCyclePage from "@/app/checkpoints/cell-cycle/page";
import { graph } from "@/lib/graph";
import { CHECKPOINT_CLASSES, CHECKPOINT_MEMBERS, IMMUNE_CHECKPOINT_TARGET_IDS, checkpointTargets, checkpointTerms } from "./checkpoint-map";
import { checkpointRefsFor, checkpointRows, familiesJson, hubJson, hubView } from "@/lib/checkpoints";

/** Anchors opened while another is open, outside SVG (the site-wide check in src/app/nested-anchors.test.ts covers every page; this keeps the failure local). */
function nestedAnchors(html: string): string[] {
  const found: string[] = [];
  let open = 0, svg = 0;
  for (const m of html.matchAll(/<(\/?)(a|svg)(?=[\s>/])/g)) {
    if (m[2] === "svg") { svg = Math.max(0, svg + (m[1] ? -1 : 1)); continue; }
    if (svg > 0) continue;
    if (m[1]) { open = Math.max(0, open - 1); continue; }
    if (open > 0) found.push(html.slice(Math.max(0, m.index - 120), m.index + 80));
    open++;
  }
  return found;
}

/**
 * The checkpoint map (src/data/checkpoint-map.ts) and its hubs. Every member must be a target record, every drug it
 * names a drug record, every partner pair declared on both sides, every immune member carry the immune-checkpoint
 * role, and every statement carry a source. The three pages render inside the root layout under the heavy-page
 * budget with clean HTML structure.
 */

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const KB = 1024;
const BUDGET = 600 * KB;
const banned = (s: string) => /—|–|\bas of\b|\bspike\b/i.test(s);

const g = graph();
const classIds = new Set(CHECKPOINT_CLASSES.map((c) => c.id));
const memberIds = new Set(CHECKPOINT_MEMBERS.map((m) => m.id));

describe("checkpoint map taxonomy", () => {
  it("has two roots with at least four classes each and unique class ids", () => {
    expect(classIds.size).toBe(CHECKPOINT_CLASSES.length);
    expect(CHECKPOINT_CLASSES.filter((c) => c.root === "immune").length).toBeGreaterThanOrEqual(6);
    expect(CHECKPOINT_CLASSES.filter((c) => c.root === "cell-cycle").length).toBe(4);
  });

  it("every member is unique, in a known class, and resolves to a target record with a matching HGNC id", () => {
    expect(memberIds.size).toBe(CHECKPOINT_MEMBERS.length);
    for (const m of CHECKPOINT_MEMBERS) {
      expect(classIds.has(m.classId), `${m.id} class ${m.classId}`).toBe(true);
      const t = g.get(m.id);
      expect(t?.kind, `${m.id} is a target`).toBe("target");
      if (t?.kind === "target" && t.hgnc) expect(m.hgnc, `${m.id} HGNC id`).toContain(t.hgnc);
      expect(m.hgnc).toMatch(/^HGNC:\d+(, HGNC:\d+)*$/);
      expect(m.symbol.length).toBeGreaterThan(0);
    }
  });

  it("every drug id exists and is a drug", () => {
    for (const m of CHECKPOINT_MEMBERS) for (const d of m.drugs) expect(g.get(d.id)?.kind, `${m.id} drug ${d.id}`).toBe("drug");
  });

  it("every partner pair is declared on both sides and never on itself", () => {
    const byId = new Map(CHECKPOINT_MEMBERS.map((m) => [m.id, m]));
    for (const m of CHECKPOINT_MEMBERS) for (const p of m.partners) {
      expect(p, `${m.id} names itself`).not.toBe(m.id);
      const other = byId.get(p);
      expect(other, `${m.id} partner ${p} is a member`).toBeDefined();
      expect(other!.partners, `${p} lists ${m.id} back`).toContain(m.id);
    }
  });

  it("every statement carries a source with an https URL and follows house style", () => {
    const urls: string[] = [];
    const texts: string[] = [];
    for (const c of CHECKPOINT_CLASSES) { texts.push(c.name, c.plain); if (c.evidence) { texts.push(c.evidence.text); urls.push(c.evidence.source.url); } }
    for (const m of CHECKPOINT_MEMBERS) {
      texts.push(m.label, m.expressedOn.text); urls.push(m.expressedOn.source.url);
      if (m.partnerNote) { texts.push(m.partnerNote.text); urls.push(m.partnerNote.source.url); }
      for (const n of m.pipelineNotes ?? []) { texts.push(n.text); urls.push(n.source.url); }
      for (const d of m.discontinued ?? []) { texts.push(d.name, d.reason); urls.push(d.source.url); }
      for (const d of m.drugs) if (d.note) texts.push(d.note);
    }
    for (const u of urls) expect(u).toMatch(/^https:\/\//);
    for (const t of texts) expect(banned(t), t).toBe(false);
  });

  it("immune members carry the immune-checkpoint role in the graph; cell-intrinsic members name their gates", () => {
    for (const m of CHECKPOINT_MEMBERS) {
      const cls = CHECKPOINT_CLASSES.find((c) => c.id === m.classId)!;
      const t = g.get(m.id);
      if (cls.root === "immune") {
        expect(IMMUNE_CHECKPOINT_TARGET_IDS.has(m.id)).toBe(true);
        expect(t?.kind === "target" && t.role, `${m.id} role`).toContain("immune-checkpoint");
      } else {
        expect(m.gates?.length, `${m.id} gates`).toBeGreaterThan(0);
      }
    }
  });

  it("new target and term records are in the graph, with sources and kebab-case ids from their symbols", () => {
    for (const t of checkpointTargets) {
      expect(g.get(t.id)?.kind, t.id).toBe("target");
      expect(t.id).toBe(t.symbol!.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
      expect(t.sources!.length).toBeGreaterThanOrEqual(2);
      expect(memberIds.has(t.id), `${t.id} is a member`).toBe(true);
    }
    for (const t of checkpointTerms) expect(g.get(t.id)?.kind, t.id).toBe("term");
    // The disambiguation term owns the bare words; the immune term keeps its own aliases.
    const immune = g.get("immune-checkpoint");
    expect(immune?.aka).not.toContain("checkpoint");
    expect(g.get("checkpoint")?.aka).toContain("checkpoints");
  });
});

describe("checkpoint rows and hubs", () => {
  it("derives a row per member with the strongest status and approvals from the drug records", () => {
    const rows = checkpointRows();
    expect(rows.size).toBe(CHECKPOINT_MEMBERS.length);
    const pd1 = rows.get("pd1")!;
    expect(pd1.best?.status).toBe("approved");
    expect(pd1.approvals.length).toBeGreaterThan(5);
    expect(pd1.approvedCancers.map((c) => c.id)).toContain("melanoma");
    expect(pd1.partners.map((p) => p.id).sort()).toEqual(["pdcd1lg2", "pdl1"]);
    const cdk = rows.get("cdk4-6")!;
    expect(cdk.best?.status).toBe("approved");
    expect(cdk.drugs.map((d) => d.drug.id)).toContain("palbociclib");
    // A failed drug never becomes the headline: TIGIT's best is the phase 3 domvanalimab, not the negative tiragolumab.
    expect(rows.get("tigit")!.best?.status).toBe("phase-3");
  });

  it("splits members between the two hubs and points record pages back to their rows", () => {
    const immune = hubView("immune"), cell = hubView("cell-cycle");
    expect(immune.rows.length + cell.rows.length).toBe(CHECKPOINT_MEMBERS.length);
    expect(checkpointRefsFor("pd1").member?.route).toBe("/checkpoints/immune/#pd1");
    expect(checkpointRefsFor("wee1").member?.route).toBe("/checkpoints/cell-cycle/#wee1");
    expect(checkpointRefsFor("immune-checkpoint").hubs).toEqual(["immune"]);
    expect(checkpointRefsFor("dna-damage-checkpoints").hubs).toEqual(["cell-cycle"]);
    expect(checkpointRefsFor("mitotic-spindle-checkpoint").hubs).toEqual(["cell-cycle"]);
    expect(checkpointRefsFor("checkpoint").hubs).toEqual(["immune", "cell-cycle"]);
    expect(checkpointRefsFor("kras").hubs).toEqual([]);
  });

  it("serialises the JSON companions", () => {
    const fam = familiesJson();
    expect(fam.families.map((f) => f.root)).toEqual(["immune", "cell-cycle"]);
    const j = hubJson("immune");
    const members = j.classes.flatMap((c) => c.members);
    expect(members.find((m) => m.id === "pd1")?.approvals.length).toBeGreaterThan(0);
    expect(JSON.stringify(j).length).toBeLessThan(BUDGET);
  });

  it("renders the three pages inside the root layout under the budget with clean structure", () => {
    for (const [name, Page] of [["hub", CheckpointsHub], ["immune", ImmunePage], ["cell-cycle", CellCyclePage]] as const) {
      const html = render(createElement(Page));
      expect(Buffer.byteLength(html, "utf8"), `${name} markup`).toBeLessThan(BUDGET);
      expect(nestedAnchors(html), `${name} nested anchors`).toEqual([]);
      expect(html).toContain("data-checkpoint-");
    }
    const immune = render(createElement(ImmunePage));
    expect(immune).toContain('id="pd1"');
    expect(immune).toContain("Immune synapse");
    const cell = render(createElement(CellCyclePage));
    expect(cell).toContain('id="wee1"');
    expect(cell).toContain("Cell cycle ring");
  });
});
