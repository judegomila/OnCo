import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "../layout";
import ModalitiesPage from "./page";
import ModalityPage from "./[format]/page";
import { modalityHub, modalityHubs, modalityJson, modalitiesIndexJson } from "@/lib/modalities";
import { FORMATS, FORMAT_TECHNOLOGIES, formatsForTechnology, modalityFile, modalityRoute, MODALITY_TABLES, modalityTableId } from "@/lib/modular-formats";
import { modalityRows, modalityTables } from "@/lib/tables/modalities";
import { TABLE_PAGE } from "@/lib/static-tables";
import { graph } from "@/lib/graph";
import { NAV_GROUPS } from "@/lib/nav";
import { sitemapUrls } from "@/lib/sitemap-urls";
import { siteSearchDocs } from "@/lib/search-index";
import { hasRouteIcon } from "@/components/RouteIcon";

/**
 * The modality lens (src/lib/modalities.ts, /modalities/): one hub per engine format, every section read from
 * existing records and naming them. The data tests check that every id a hub names resolves in the graph and that
 * nothing is invented (an empty section stays empty); the render tests check that every format renders inside the
 * layout under the 600 KB markup budget with one page of rows per table, no nested anchors, and the JSON link.
 */

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const KB = 1024;
/** next/link drops the trailing slash in tests; match either form, with an optional fragment. */
const linkRe = (route: string, hash = "") => new RegExp(`href="${route.replace(/\/$/, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/?${hash ? `#${hash}` : ""}"`);
/** Text as react-dom/server writes it into markup. */
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
const bodyRows = (html: string) => (html.match(/<tbody[^>]*>[\s\S]*?<\/tbody>/g) ?? []).map((t) => (t.match(/<tr[\s>]/g) ?? []).length);
/** `<a` opened while another `<a` is open, SVG subtrees skipped (the same walk as src/app/nested-anchors.test.ts). */
function nestedAnchors(html: string): number {
  let open = 0, svg = 0, found = 0;
  for (const m of html.matchAll(/<(\/?)(a|svg)(?=[\s>/])/g)) {
    if (m[2] === "svg") { svg = Math.max(0, svg + (m[1] ? -1 : 1)); continue; }
    if (svg > 0) continue;
    if (m[1]) { open = Math.max(0, open - 1); continue; }
    if (open > 0) found++;
    open++;
  }
  return found;
}
/** Every `{ id, kind, route }` object anywhere in a JSON value: the record refs a hub names. */
function refs(x: unknown, out: Array<{ id: string; kind: string; route: string }> = []): Array<{ id: string; kind: string; route: string }> {
  if (Array.isArray(x)) { for (const y of x) refs(y, out); return out; }
  if (x && typeof x === "object") {
    const o = x as Record<string, unknown>;
    if (typeof o.id === "string" && typeof o.kind === "string" && typeof o.route === "string") out.push({ id: o.id, kind: o.kind, route: o.route });
    for (const v of Object.values(o)) refs(v, out);
  }
  return out;
}

const g = graph();
const hubs = modalityHubs();

describe("modality hubs: data", () => {
  it("has one hub per engine format, in the engine's order, each with its route and JSON file", () => {
    expect(hubs.map((h) => h.format.id)).toEqual(FORMATS.map((f) => f.id));
    for (const h of hubs) { expect(h.route).toBe(modalityRoute(h.format.id)); expect(h.file).toBe(modalityFile(h.format.id)); }
    expect(modalityHub("no-such-format")).toBeUndefined();
  });

  it("names only technology records that exist, and each carries a pill back to its hub", () => {
    for (const f of FORMATS) {
      expect(FORMAT_TECHNOLOGIES[f.id].length, f.id).toBeGreaterThan(0);
      for (const id of FORMAT_TECHNOLOGIES[f.id]) {
        expect(g.get(id)?.kind, `${f.id}: ${id}`).toBe("technology");
        expect(formatsForTechnology(id).map((x) => x.id), id).toContain(f.id);
      }
    }
  });

  it("reads how it works from the technology record, word for word, and names it", () => {
    for (const h of hubs) {
      expect(h.how.paragraphs.length, h.format.id).toBeGreaterThan(0);
      const src = g.get(h.how.from[0].id);
      expect(src?.kind).toBe("technology");
      if (src?.kind === "technology") { expect(h.how.paragraphs[0]).toBe(src.tldr); if (h.how.paragraphs[1]) expect(h.how.paragraphs[1]).toBe(src.principle); }
    }
  });

  it("resolves every record id a hub names, with the kind and route the graph gives it", () => {
    for (const h of hubs) {
      const all = refs(modalityJson(h));
      expect(all.length, h.format.id).toBeGreaterThan(20);
      for (const r of all) {
        const e = g.get(r.id);
        expect(e, `${h.format.id}: ${r.kind} ${r.id}`).toBeTruthy();
        expect(e!.kind, `${h.format.id}: ${r.id}`).toBe(r.kind);
        expect(r.route, `${h.format.id}: ${r.id}`).toMatch(/^\/[a-z-]+\/[a-z0-9-]+\/$/);
      }
    }
  });

  it("counts approved medicines from approval rows and approved statuses, phase 3 from statuses and live phase 3 trials, and never both", () => {
    const APPROVED = new Set(["approved", "standard-of-care", "established"]);
    for (const h of hubs) {
      const approved = new Set(h.approved.map((a) => a.drug.id));
      const phase3 = new Set(h.phase3.map((p) => p.drug.id));
      for (const a of h.approved) {
        const d = g.get(a.drug.id);
        expect(d?.kind).toBe("drug");
        if (d?.kind === "drug") { expect(d.approvals.length > 0 || APPROVED.has(d.status ?? ""), a.drug.id).toBe(true); expect(a.years).toEqual([...new Set(d.approvals.map((x) => x.year))].sort((x, y) => x - y)); expect(a.cancers.map((c) => c.id)).toEqual(d.cancers.filter((id) => g.get(id))); }
      }
      for (const id of phase3) expect(approved.has(id), `${h.format.id}: ${id} both approved and phase 3`).toBe(false);
      for (const p of h.phase3) expect(p.status === "phase-3" || p.trials.length > 0, p.drug.id).toBe(true);
      expect(h.counts.approved).toBe(h.approved.length);
      expect(h.counts.phase3).toBe(h.phase3.length);
      expect(h.counts.drugs).toBe(h.drugs.length);
    }
  });

  it("lists only recruiting trial records that name a medicine of the format", () => {
    for (const h of hubs) for (const t of h.trials) {
      const trial = g.get(t.trial.id);
      expect(trial?.kind).toBe("trial");
      if (trial?.kind !== "trial") continue;
      expect(trial.status).toBe("recruiting");
      const drugIds = new Set(h.drugs.map((d) => d.id));
      expect(t.drugs.every((d) => drugIds.has(d.id)), t.trial.id).toBe(true);
      expect(t.drugs.some((d) => trial.drugs.includes(d.id) || (g.get(d.id) as { trials?: string[] } | undefined)?.trials?.includes(trial.id)), t.trial.id).toBe(true);
    }
  });

  it("keeps side-effect terms to the glossary's Side effects category and resistance to classes with an exemplar or technology of the format", () => {
    for (const h of hubs) {
      for (const t of h.sideEffects.terms) { const term = g.get(t.id); expect(term?.kind).toBe("term"); if (term?.kind === "term") expect(term.category).toBe("Side effects"); expect(t.from.length).toBeGreaterThan(0); }
      const members = new Set([...h.drugs.map((d) => d.id), ...h.how.technologies.map((t) => t.id)]);
      for (const r of h.resistance) expect(r.exemplars.some((e) => members.has(e.id)) || r.mechanisms.length > 0, `${h.format.id}: ${r.id}`).toBe(true);
    }
    // The brief's two examples: cytokine release syndrome on the cell therapies, ocular toxicity or lung disease on the ADCs.
    expect(modalityHub("car-t")!.sideEffects.terms.map((t) => t.id)).toContain("crs");
    expect(modalityHub("adc")!.sideEffects.terms.map((t) => t.id)).toContain("ild");
    expect(modalityHub("adc")!.resistance.map((r) => r.id)).toContain("top1-adc");
  });

  it("cites roadmap steps by the step's own era, in the roadmap the step belongs to", () => {
    for (const h of hubs) for (const e of h.eras) {
      const r = g.get(e.roadmap.id);
      expect(r?.kind).toBe("roadmap");
      if (r?.kind !== "roadmap") continue;
      const step = r.steps[e.step - 1];
      expect(step.era).toBe(e.era); expect(step.title).toBe(e.title);
      expect(e.refs.length).toBeGreaterThan(0);
      expect(e.route).toBe(`/roadmaps/${r.id}/#story-step-${e.step - 1}`);
    }
    expect(modalityHub("adc")!.eras.some((e) => e.roadmap.id === "adc-generations")).toBe(true);
  });

  it("builds one paged table per hub and table kind with the rows the page renders, and an index file with every format", () => {
    const tables = modalityTables();
    expect(tables.map((t) => t.id).sort()).toEqual(hubs.flatMap((h) => MODALITY_TABLES.map((t) => modalityTableId(h.format.id, t))).sort());
    for (const h of hubs) for (const t of MODALITY_TABLES) expect(tables.find((x) => x.id === modalityTableId(h.format.id, t))!.rows).toEqual(modalityRows(h, t));
    const idx = modalitiesIndexJson() as { formats: Array<{ id: string; route: string; file: string }> };
    expect(idx.formats.map((f) => f.id)).toEqual(FORMATS.map((f) => f.id));
    for (const f of idx.formats) { expect(f.route).toBe(modalityRoute(f.id as typeof FORMATS[number]["id"])); expect(f.file).toBe(modalityFile(f.id as typeof FORMATS[number]["id"])); }
    for (const h of hubs) expect(JSON.stringify(modalityJson(h))).not.toMatch(/—/);
  });

  it("is in the navigation beside the engine, has an icon, is in the sitemap and the search index", () => {
    const intel = NAV_GROUPS.find((x) => x.id === "intel")!;
    const hrefs = intel.items.map((i) => i.href);
    expect(hrefs.indexOf(modalityRoute())).toBe(hrefs.indexOf("/pipeline/engine/") + 1);
    expect(hasRouteIcon(modalityRoute())).toBe(true);
    const urls = new Set(sitemapUrls().map((u) => u.url.replace(/^https?:\/\/[^/]+/, "")));
    expect(urls.has(modalityRoute())).toBe(true);
    for (const f of FORMATS) expect(urls.has(modalityRoute(f.id)), f.id).toBe(true);
    const routes = new Set(siteSearchDocs().map((d) => d.route));
    for (const f of FORMATS) expect(routes.has(modalityRoute(f.id)), f.id).toBe(true);
  });
});

describe("modality hubs: pages", () => {
  it("renders the index with a card per format linking to the hub and its sections, under budget", () => {
    const html = render(createElement(ModalitiesPage));
    for (const f of FORMATS) { expect(html).toMatch(linkRe(modalityRoute(f.id))); expect(html).toMatch(linkRe(modalityRoute(f.id), "approved")); }
    expect(html).toContain(`href="${modalityFile("index")}"`);
    expect(html).toContain("data-tabbar");
    expect(nestedAnchors(html)).toBe(0);
    expect(html).not.toMatch(/—/);
    expect(Buffer.byteLength(html, "utf8"), "index markup").toBeLessThan(200 * KB);
  }, 60_000);

  it("renders every format with its sections, one page of rows per table, the JSON link and no nested anchors, under 600 KB", async () => {
    for (const f of FORMATS) {
      const h = modalityHub(f.id)!;
      const html = render(await ModalityPage({ params: Promise.resolve({ format: f.id }) }));
      for (const id of ["how", "engine", "approved", "phase3", "parts", "companies", "trials", "sideEffects", "resistance", "papers", "eras", "ideas", "manufacturing"]) expect(html, `${f.id} #${id}`).toContain(`<section id="${id}"`);
      expect(html, f.id).toContain(`href="${h.file}"`);
      expect(html, f.id).toMatch(linkRe(h.engine.route));
      expect(html, f.id).toContain("data-tabbar");
      expect(html, f.id).toContain(esc(h.how.paragraphs[0].slice(0, 60)));
      // Tables: the first page of rows, and the Show more sentinel where a table is longer than a page.
      for (const t of MODALITY_TABLES) {
        const rows = modalityRows(h, t);
        if (!rows.length) continue;
        const start = html.indexOf(`id="${t}-table"`);
        expect(start, `${f.id} ${t}`).toBeGreaterThan(0);
        const section = html.slice(start, html.indexOf("</section>", start));
        expect(bodyRows(section)[0], `${f.id} ${t}`).toBe(Math.min(TABLE_PAGE, rows.length));
        if (rows.length > TABLE_PAGE) expect(section, `${f.id} ${t}`).toContain("data-more");
      }
      // Real links for search engines and readers: every approved medicine on the first page, every format in the switcher.
      for (const a of h.approved.slice(0, TABLE_PAGE)) expect(html, `${f.id} ${a.drug.id}`).toMatch(linkRe(a.drug.route));
      for (const x of FORMATS) expect(html).toMatch(linkRe(modalityRoute(x.id)));
      expect(nestedAnchors(html), f.id).toBe(0);
      expect(html, f.id).not.toMatch(/—/);
      expect(Buffer.byteLength(html, "utf8"), `${f.id} markup`).toBeLessThan(600 * KB);
    }
  }, 300_000);

  it("returns a JSON companion per format whose ids resolve, and 404s an unknown format", async () => {
    const { GET, generateStaticParams } = await import("./[format]/data.json/route");
    expect(generateStaticParams().map((p) => p.format)).toEqual(FORMATS.map((f) => f.id));
    const res = await GET(new Request("http://localhost/modalities/adc/data.json"), { params: Promise.resolve({ format: "adc" }) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { format: { id: string }; approved: unknown[]; note: string };
    expect(body.format.id).toBe("adc");
    expect(body.approved.length).toBe(modalityHub("adc")!.approved.length);
    expect(body.note).toContain("CC BY-NC 4.0");
    const missing = await GET(new Request("http://localhost/modalities/x/data.json"), { params: Promise.resolve({ format: "x" }) });
    expect(missing.status).toBe(404);
  });
});
