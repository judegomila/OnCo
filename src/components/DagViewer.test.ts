import { afterEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { DagViewer, type DagViewData } from "./DagViewer";

/**
 * Hydration suspects for the dependency map (roadmap row 139). The first client render must equal the static
 * HTML byte for byte, so nothing in DagViewer's render may depend on locale, time zone, randomness or the browser.
 * Names carry the punctuation and non-ASCII that made localeCompare collate differently in Node and Chrome.
 */
const names = ["α-emitter generators", "CAR-T manufacturing", "Adaptive radiotherapy (online replanning)", "Ac-225 supply", "apheresis", "Zr-89 PET", "cryopreservation", "MRI-linac", "1,000-plex panels", "Élan sequencing", "iPSC master cell banks", "\"quoted\" & <escaped>"];
const nodes = names.map((name, i) => ({ id: `t${i}`, name, section: i % 2 ? "imaging" : "", status: "approved", route: `/technologies/t${i}/`, tldr: `What ${name} is.\nSecond line.`, vendors: i % 3, up: i ? [`t${i - 1}`] : [], down: i < names.length - 1 ? [`t${i + 1}`] : [] }));
const layers = nodes.map((n) => [n.id]);
const data: DagViewData = {
  // 1,200 nodes so the picker count needs a thousands separator.
  nodes: [...nodes, ...[...Array(1200 - nodes.length)].map((_, i) => ({ ...nodes[i % nodes.length], id: `f${i}`, up: [], down: [] }))],
  edges: nodes.slice(1).map((n, i) => [`t${i}`, n.id] as [string, string]),
  whole: layers,
  perRoot: Object.fromEntries(nodes.map((n) => [n.id, layers])),
  criticalPath: nodes.map((n) => n.id),
  chokepoints: ["t1", "t2"],
  singleVendor: ["t2", "t4"],
  cycles: [],
};

const render = () => renderToString(createElement(DagViewer, { data }));

describe("DagViewer renders the same markup in every environment", () => {
  const env = { TZ: process.env.TZ, LANG: process.env.LANG, LC_ALL: process.env.LC_ALL };
  afterEach(() => { Object.assign(process.env, env); vi.restoreAllMocks(); vi.useRealTimers(); });

  it("does not change with time zone, locale variables or the clock", () => {
    Object.assign(process.env, { TZ: "Pacific/Kiritimati", LANG: "de_DE.UTF-8", LC_ALL: "de_DE.UTF-8" });
    vi.useFakeTimers({ now: new Date("2001-02-03T04:05:06Z") });
    const a = render();
    Object.assign(process.env, { TZ: "America/Los_Angeles", LANG: "ja_JP.UTF-8", LC_ALL: "ja_JP.UTF-8" });
    vi.setSystemTime(new Date("2031-12-31T23:59:59Z"));
    const b = render();
    expect(a).toBe(b);
    expect(a.length).toBeGreaterThan(10_000);
  });

  it("calls no locale-dependent formatter, random source or clock during render", () => {
    const spies = [
      vi.spyOn(String.prototype, "localeCompare"),
      vi.spyOn(Number.prototype, "toLocaleString"),
      vi.spyOn(Date.prototype, "toLocaleString"),
      vi.spyOn(Date.prototype, "toLocaleDateString"),
      vi.spyOn(Math, "random"),
      vi.spyOn(Date, "now"),
      vi.spyOn(Intl, "NumberFormat"),
      vi.spyOn(Intl, "DateTimeFormat"),
      vi.spyOn(Intl, "Collator"),
    ];
    const html = render();
    for (const s of spies) expect(s).not.toHaveBeenCalled();
    // Thousands separators come from a plain regex, not Intl, so they are identical in Node and every browser.
    // React separates adjacent text children with an empty comment; the client skips comments while hydrating.
    expect(html).toContain("Whole map (<!-- -->1,200<!-- --> technologies)");
  });

  it("orders the root picker by code point, and touches neither the theme attribute nor browser globals", () => {
    // Node has no window, document, navigator or localStorage: a render-time read would throw here.
    const html = render();
    const options = [...html.matchAll(/<option value="t\d+">([^<]*)<\/option>/g)].map((m) => m[1]);
    const sorted = [...options].sort((x, y) => { const a = x.toLowerCase(), b = y.toLowerCase(); return a < b ? -1 : a > b ? 1 : x < y ? -1 : x > y ? 1 : 0; });
    expect(options).toEqual(sorted);
    expect(html).not.toContain("data-theme");
    expect(html).not.toContain("data-scroll-behavior");
    // Nothing on the map is measured at render time; the layout uses fixed tile and column sizes.
    expect(html).toMatch(/<svg width="\d+" height="\d+" viewBox="0 0 \d+ \d+"/);
  });

  it("keeps SVG tiles as valid foreign content and never nests anchors", () => {
    const html = render();
    let open = 0; const nested: number[] = [];
    for (const m of html.matchAll(/<(\/?)a[\s>]/g)) { if (m[1]) open--; else { if (open > 0) nested.push(m.index); open++; } }
    expect(nested).toEqual([]);
    // An HTML-only element inside <svg> would make the parser close the svg early; only SVG elements may appear there.
    const svg = html.slice(html.indexOf("<svg width="), html.lastIndexOf("</svg>"));
    const tags = new Set([...svg.matchAll(/<([a-zA-Z]+)[\s>/]/g)].map((m) => m[1]));
    for (const t of tags) expect(["svg", "defs", "marker", "path", "text", "g", "a", "title", "rect", "circle", "line", "polyline", "polygon", "ellipse"]).toContain(t);
  });
});
