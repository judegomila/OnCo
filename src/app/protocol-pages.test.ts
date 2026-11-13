import { beforeAll, describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import EntityPage from "./[kind]/[id]/page";
import KindIndex from "./[kind]/page";
import { graph } from "@/lib/graph";
import { PROTOCOL_DOMAIN_LABEL } from "@/lib/kinds";
import { protocolsFor } from "@/lib/members";
import { isPagedKind, kindBrowser, kindPageSize } from "@/lib/tables/kinds";

/**
 * The care protocol pages (docs/PROTOCOLS.md): the index groups by domain as filter links rather than printing the
 * protocols twice, a detail page numbers its steps with an ordered list and shows each step's source and grade, best
 * in class and the guidelines, and a device page lists the care protocols that name it without repeating them in
 * Connected. Whole-page renders, so the wall-clock allowance follows SLOW_TEST_MS as in record-fold.test.ts.
 */
const SLOW_MS = Number(process.env.SLOW_TEST_MS ?? 120_000);

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));
/** Links to a protocol page; a router Link drops the trailing slash outside the Next build, so both forms count. */
const links = (html: string, id: string) => (html.match(new RegExp(`href="/protocols/${id}/?"`, "g")) ?? []).length;
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

describe("care protocol pages", () => {
  beforeAll(() => { graph(); }, 240_000);
  const list = graph().kind("protocol");

  // Past sixty protocols the index is a paged table (PAGED_KINDS, docs/PROTOCOLS.md "When the kind grows"): the page
  // carries the first kindPageSize("protocol") rows in the default order and fetches the rest from the kind's table file, so "every
  // protocol" is checked on the file the table fetches, and the page on the rows it carries. The domain links are
  // whole-table, so every protocol's domain is on the page whether or not its row is in the first page.
  it("/protocols/ links each filled domain to the filtered table and lists every protocol", { timeout: SLOW_MS }, async () => {
    const html = decode(render(await KindIndex({ params: Promise.resolve({ kind: "protocols" }) })));
    expect(html).toContain("data-protocol-domains");
    const rows = kindBrowser("protocol").rows;
    expect(new Set(rows.map((r) => r.id)), "every protocol is in the table the page fetches").toEqual(new Set(list.map((p) => p.id)));
    const carried = isPagedKind("protocol") ? rows.slice(0, kindPageSize("protocol")) : rows;
    for (const p of list) expect(html).toContain(`?domain=${encodeURIComponent(PROTOCOL_DOMAIN_LABEL[p.domain])}`);
    for (const r of carried) expect(links(html, r.id), `${r.id} in the table`).toBeGreaterThan(0);
  });

  for (const p of list) {
    it(`${p.id}: numbered steps with sources, best in class, grades and guidelines`, { timeout: SLOW_MS }, async () => {
      const html = decode(render(await EntityPage({ params: Promise.resolve({ kind: "protocols", id: p.id }) })));
      const steps = html.slice(html.indexOf('id="steps"'));
      expect(steps.indexOf("<ol")).toBeGreaterThan(0);
      expect((steps.slice(0, steps.indexOf("</ol>")).match(/<li/g) ?? []).length).toBe(p.steps.length);
      expect(html).toContain(p.steps[0].action);
      expect(html).toContain(p.bestInClass.statement.slice(0, 60));
      for (const s of p.sources) expect(html).toContain(`id="source-${s.key}"`);
      expect(html).not.toMatch(/step \d+ of \d+/i);
    });
  }

  it("a device page lists its care protocols and does not repeat them in Connected", { timeout: SLOW_MS }, async () => {
    const device = graph().must("implanted-ports");
    const members = protocolsFor(device);
    expect(members.length).toBeGreaterThan(0);
    const html = render(await EntityPage({ params: Promise.resolve({ kind: "technologies", id: device.id }) }));
    expect(html).toContain("data-protocol-list");
    for (const m of members) expect(links(html, m.protocol.id), m.protocol.id).toBe(1);
  });
});
