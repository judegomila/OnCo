import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { graph } from "./graph";
import { COMPARE_SETS, compareRoute, compareSetFor, compareUrls, resolveCompare } from "./cancer-compare";
import ComparedPage, { generateStaticParams } from "@/app/cancers/[id]/compared/page";

/**
 * A comparison table quotes records or cited pages and nothing else: every hand cell that names a record field is a
 * substring of that field, every cited source is https, every standard-of-care setting named exists on its record,
 * and the anchor cancer's column is filled for the rows the corpus records.
 */
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: Parameters<typeof renderToStaticMarkup>[0]) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));

describe("cancer compare sets", () => {
  it("compare real cancer records, anchored on one of them", () => {
    const g = graph();
    for (const s of COMPARE_SETS) {
      expect(s.ids).toContain(s.anchorId);
      expect(new Set(s.ids).size).toBe(s.ids.length);
      for (const id of s.ids) expect(g.get(id)?.kind, id).toBe("cancer");
      expect(compareSetFor(s.anchorId)?.anchorId).toBe(s.anchorId);
      for (const id of s.ids) expect(compareSetFor(id)).toBeTruthy();
    }
    expect(compareSetFor("gallbladder")?.ids).toEqual(["gallbladder", "intrahepatic-cholangiocarcinoma", "extrahepatic-cholangiocarcinoma", "ampullary"]);
  });

  it("reads hand cells from the record field they name, or cites an https page", () => {
    const g = graph();
    for (const s of COMPARE_SETS) for (const r of s.rows) for (const [id, cell] of Object.entries(r.cells ?? {})) {
      expect(s.ids, `${r.id}: ${id} is in the set`).toContain(id);
      expect(cell.from || cell.source, `${r.id}/${id}: a record field or a source`).toBeTruthy();
      if (cell.from) {
        const e = g.must(cell.from.id);
        const field = (e as unknown as Record<string, unknown>)[cell.from.field];
        expect(typeof field, `${r.id}/${id}: ${cell.from.field}`).toBe("string");
        expect(field as string, `${r.id}/${id}: text is in ${cell.from.id}.${cell.from.field}`).toContain(cell.text);
      }
      if (cell.source) expect(cell.source.url).toMatch(/^https:\/\//);
    }
  });

  it("names standard-of-care settings that exist, and targets that exist", () => {
    const g = graph();
    for (const s of COMPARE_SETS) for (const r of s.rows) {
      if (r.kind === "soc") for (const [id, settings] of Object.entries(r.settings ?? {})) {
        const c = g.must(id);
        if (c.kind !== "cancer") throw new Error(id);
        for (const st of Array.isArray(settings) ? settings : [settings]) expect(c.standardOfCare.some((x) => x.setting === st), `${r.id}/${id}: setting "${st}"`).toBe(true);
      }
      if (r.kind === "prevalence") expect(g.get(r.targetId ?? "")?.kind, `${r.id}: target`).toBe("target");
    }
  });

  it("resolves to a mostly filled table with https sources, the anchor column complete where the corpus records it", () => {
    for (const s of COMPARE_SETS) {
      const { cancers, rows } = resolveCompare(s);
      expect(cancers.length).toBe(s.ids.length);
      const total = rows.length * cancers.length;
      const filled = rows.reduce((n, r) => n + Object.values(r.cells).filter(Boolean).length, 0);
      expect(filled / total, `${s.anchorId}: ${filled} of ${total} cells filled`).toBeGreaterThan(0.8);
      for (const r of rows) expect(r.cells[s.anchorId], `${s.anchorId}: anchor cell for ${r.def.id}`).toBeTruthy();
      for (const u of compareUrls(s)) expect(u).toMatch(/^https:\/\//);
      // The molecular rows carry a rate for the anchor from its prevalence rows.
      for (const r of rows.filter((x) => x.def.kind === "prevalence")) expect(r.cells[s.anchorId]?.lines.join(" "), `${s.anchorId}: ${r.def.id}`).toMatch(/%/);
    }
  });

  it("renders the compared page with every cancer and row, sources linked", async () => {
    const params = generateStaticParams();
    expect(params.map((p) => p.id)).toEqual(COMPARE_SETS.map((s) => s.anchorId));
    for (const { id } of params) {
      const s = compareSetFor(id)!;
      const html = render(await ComparedPage({ params: Promise.resolve({ id }) }));
      for (const r of s.rows) expect(html).toContain(`id="row-${r.id}"`);
      // next/link drops the trailing slash when rendered outside the Next runtime, so match either form; external URLs are HTML-escaped.
      for (const cid of s.ids) expect(html).toMatch(new RegExp(`href="/cancers/${cid}/?"`));
      for (const u of compareUrls(s)) expect(html).toContain(`href="${u.replace(/&/g, "&amp;")}"`);
      expect(html).toContain(compareRoute(id).replace(/\/$/, ""));
      expect(html).not.toMatch(/—/);
    }
  });
});
