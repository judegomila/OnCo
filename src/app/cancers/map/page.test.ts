import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import CancerMapPage, { GRAPH_JSON } from "./page";
import { GET } from "./graph.json/route";
import { cancerDag } from "@/lib/cancer-dag";

/**
 * The cancer map page: the SVG stays under its HTML budget, every node is a link with a tooltip, the four badge
 * groups are all present for the client switch to choose between, and the outline repeats the structure in plain
 * lists. Rendered with react-dom/server the way the static export renders it.
 */
describe("cancer map page", () => {
  const html = renderToStaticMarkup(createElement(CancerMapPage));
  const svg = html.slice(html.indexOf('<svg width='), html.indexOf("</svg>", html.indexOf('<svg width=')) + 6);
  const d = cancerDag();

  it("keeps the SVG under 300 KB", () => {
    expect(svg.length).toBeGreaterThan(10_000);
    expect(svg.length, `svg ${Math.round(svg.length / 1024)} KB`).toBeLessThan(300 * 1024);
  });

  it("draws every node as a link with a tooltip and every edge as a path", () => {
    expect(svg.match(/<a href=/g)?.length).toBe(d.stats.nodes);
    expect(svg.match(/<title[ >]/g)?.length).toBe(d.stats.nodes + 1);
    expect(svg.match(/<path class="e /g)?.length).toBe(d.stats.edges);
    for (const n of d.nodes.slice(0, 20)) expect(svg).toContain(`href="${n.route}"`);
  });

  it("carries every non-zero badge on a node so the switch only toggles visibility", () => {
    const n = d.nodes.find((x) => x.layer === "cancer" && x.counts.trials && x.counts.drugs && x.counts.approvals && x.counts.ideas)!;
    const node = svg.slice(svg.indexOf(`data-id="${n.id}"`), svg.indexOf("</a>", svg.indexOf(`data-id="${n.id}"`)));
    for (const c of ["bt", "bd", "ba", "bi"]) expect(node).toContain(`class="b ${c}"`);
    expect(node).toContain(`>${n.counts.trials.toLocaleString("en-GB")}</text>`);
  });

  it("repeats the structure as nested lists and links the JSON twin", () => {
    expect(html).toContain('aria-label="Cancer map as a list"');
    expect(html.match(/<li class="mt-1">/g)!.length).toBeGreaterThanOrEqual(d.stats.nodes);
    expect(html).toContain(`href="${GRAPH_JSON}"`);
    expect(html).toContain('"@type":"WebPage"');
  });

  it("serves the same graph as JSON", async () => {
    const res = GET();
    expect(res.headers.get("Content-Type")).toContain("application/json");
    const body = await res.json();
    expect(body.nodes).toHaveLength(d.stats.nodes);
    expect(body.edges).toHaveLength(d.stats.edges);
    expect(body.nodes[0].url).toMatch(/^https:\/\/onco\.cc\//);
    expect(body.stats.multiParent).toBe(d.stats.multiParent);
  });
});
