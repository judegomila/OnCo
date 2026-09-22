import { describe, expect, it } from "vitest";
import { edgeFeedJson, edgeFeedXml } from "./build-feeds";
import { edgeFeed, normaliseEdgeDate, type EdgeItem } from "../src/lib/edge";

/**
 * Well-formedness check for the XML we emit (no XML parser ships in node_modules): tags balance, attributes are
 * quoted, text and attribute values contain no bare `<` or `&` (only the five entities and numeric references).
 */
export function xmlProblems(xml: string): string[] {
  const problems: string[] = [];
  const stack: string[] = [];
  const re = /<\?[\s\S]*?\?>|<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<(\/?)([A-Za-z_][\w.:-]*)((?:\s+[A-Za-z_][\w.:-]*\s*=\s*(?:"[^"<&]*(?:&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);[^"<&]*)*"|'[^'<&]*'))*)\s*(\/?)>/g;
  let last = 0;
  const text = (s: string, at: number) => { if (/[<]/.test(s)) problems.push(`bare < in text at ${at}`); if (/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/.test(s)) problems.push(`bare & in text at ${at}`); };
  for (const m of xml.matchAll(re)) {
    text(xml.slice(last, m.index), last);
    last = m.index + m[0].length;
    if (m[0].startsWith("<?") || m[0].startsWith("<!")) continue;
    const [, close, name, , selfClose] = m;
    if (close) { const open = stack.pop(); if (open !== name) problems.push(`</${name}> closes <${open}> at ${m.index}`); }
    else if (!selfClose) stack.push(name);
  }
  text(xml.slice(last), last);
  if (stack.length) problems.push(`unclosed: ${stack.join(", ")}`);
  if (!/^<\?xml /.test(xml)) problems.push("no XML declaration");
  return problems;
}

const mk = (over: Partial<EdgeItem> & { date: string; url: string }): EdgeItem => {
  const d = normaliseEdgeDate(over.date, "2026-09-22")!;
  return { id: over.url, kind: "paper", title: "T", sentence: "S.", refs: [], weight: 0, ...over, date: d.date, precision: d.precision, sortDate: d.sortDate };
};

describe("edge feeds", () => {
  const items = [
    mk({ date: "2026-09-10", url: "https://doi.org/10.1000/a&b", doi: "10.1000/a&b", title: "Tricky <title> & \"quotes\"", sentence: "A sentence with <b>markup</b> & an ampersand.", venue: "Lancet Oncol", refs: [{ id: "x", kind: "drug", name: "X & Y", route: "/drugs/x/" }] }),
    mk({ date: "2025", url: "https://eur-lex.europa.eu/eli/reg/2025/327/oj", kind: "law", weight: 7, title: "A law", sentence: "A 2025 regulation." }),
  ];
  it("writes well-formed Atom with one entry per item, a category per kind and escaped text", () => {
    const xml = edgeFeedXml(items);
    expect(xmlProblems(xml)).toEqual([]);
    expect(xml.match(/<entry>/g)).toHaveLength(2);
    expect(xml).toContain('<category term="law"/>');
    expect(xml).toContain("Tricky &lt;title&gt; &amp; &quot;quotes&quot;");
    expect(xml).toContain('href="https://onco.cc/edge/feed.xml"');
    expect(xml).toContain("<updated>2025-01-01T00:00:00Z</updated>");
  });
  it("catches malformed XML", () => {
    expect(xmlProblems('<?xml version="1.0"?><a><b></a>')).not.toEqual([]);
    expect(xmlProblems('<?xml version="1.0"?><a>x & y</a>')).not.toEqual([]);
  });
  it("writes JSON Feed 1.1 with the OnCo extension", () => {
    const j = JSON.parse(edgeFeedJson(items)) as { version: string; items: Array<{ url: string; tags: string[]; _onco: { kind: string; records: Array<{ url: string }> } }> };
    expect(j.version).toBe("https://jsonfeed.org/version/1.1");
    expect(j.items).toHaveLength(2);
    expect(j.items[0].tags).toEqual(["paper"]);
    expect(j.items[0]._onco.records[0].url).toBe("https://onco.cc/drugs/x/");
  });
  it("is well formed on the real ranked feed", () => {
    const xml = edgeFeedXml(edgeFeed(120));
    expect(xmlProblems(xml)).toEqual([]);
    expect(JSON.parse(edgeFeedJson(edgeFeed(120))).items.length).toBeGreaterThan(0);
  });
});
