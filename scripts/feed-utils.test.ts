import { describe, expect, it } from "vitest";
import { NameMatcher, decodeEntities, normaliseDate, parseFeed, parseLongDate, parseOcePage, stripTags } from "./feed-utils";

const ENTITIES = [
  { id: "trastuzumab-deruxtecan", kind: "drug", name: "Trastuzumab deruxtecan", brand: "Enhertu", code: "DS-8201a", aka: ["T-DXd"] },
  { id: "trastuzumab", kind: "drug", name: "Trastuzumab", brand: "Herceptin", aka: [] },
  { id: "sacituzumab-govitecan", kind: "drug", name: "Sacituzumab govitecan", brand: "Trodelvy", code: "IMMU-132", aka: [] },
  { id: "ascent-04", kind: "trial", name: "ASCENT-04", aka: [] },
  { id: "tnbc", kind: "cancer", name: "Triple-negative breast cancer (TNBC)", aka: ["TNBC"] },
  { id: "pet", kind: "technology", name: "PET", aka: [] },
];

describe("NameMatcher", () => {
  const m = new NameMatcher(ENTITIES);
  it("matches names, brands, codes and aliases as whole words", () => {
    expect(m.match("Enhertu extends survival in HER2-low disease")).toContain("trastuzumab-deruxtecan");
    expect(m.match("DS-8201a phase 3")).toContain("trastuzumab-deruxtecan");
    expect(m.match("T-DXd in gastric cancer")).toContain("trastuzumab-deruxtecan");
    expect(m.match("Sacituzumab govitecan plus pembrolizumab in TNBC")).toEqual(expect.arrayContaining(["sacituzumab-govitecan", "tnbc"]));
  });
  it("does not match inside other words and skips terms shorter than four characters", () => {
    expect(m.match("Trastuzumabs are a class")).not.toContain("trastuzumab");
    expect(m.match("A PET scan")).not.toContain("pet");
  });
  it("prefers the longest match for an INN and reports both when both appear", () => {
    expect(m.best("trastuzumab deruxtecan")).toBe("trastuzumab-deruxtecan");
    expect(m.best("Trastuzumab")).toBe("trastuzumab");
    const both = m.match("Trastuzumab deruxtecan versus trastuzumab emtansine");
    expect(both[0]).toBe("trastuzumab-deruxtecan");
  });
  it("matches trial acronyms case-sensitively", () => {
    expect(m.match("ASCENT-04 primary analysis")).toContain("ascent-04");
    expect(m.match("the ascent-04 of the mountain")).not.toContain("ascent-04");
  });
});

describe("parsers", () => {
  it("parses RSS 2.0 items", () => {
    const xml = `<rss><channel><item><title>Alpha &amp; beta</title><link>https://x.test/a?rss=yes</link><pubDate>Tue, 08 Sep 2026 10:00:00 GMT</pubDate><description><![CDATA[<p>Hello</p>]]></description></item></channel></rss>`;
    const items = parseFeed(xml);
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ title: "Alpha & beta", link: "https://x.test/a", date: "2026-09-08", summary: "Hello" });
  });
  it("parses RSS 1.0 (RDF) and Atom entries", () => {
    const rdf = `<rdf:RDF><item rdf:about="https://x.test/b"><title>B</title><dc:date>2026-09-01T00:00:00Z</dc:date></item></rdf:RDF>`;
    expect(parseFeed(rdf)[0]).toMatchObject({ title: "B", link: "https://x.test/b", date: "2026-09-01" });
    const atom = `<feed><entry><title>C</title><link href="https://x.test/c"/><updated>2026-08-30T12:00:00Z</updated></entry></feed>`;
    expect(parseFeed(atom)[0]).toMatchObject({ title: "C", link: "https://x.test/c", date: "2026-08-30" });
  });
  it("parses the FDA OCE table", () => {
    const html = `<table><tr><th>Webpage</th><th>Description</th><th>Date</th></tr><tr><td><a href="/drugs/x/fda-approves-foo">FDA approves foo</a></td><td>On September 9, 2026, the Food and Drug Administration approved foo (Bar, Baz Inc.) for adults.</td><td>09/09/2026</td></tr></table>`;
    const items = parseOcePage(html);
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ date: "2026-09-09", title: "FDA approves foo", url: "https://www.fda.gov/drugs/x/fda-approves-foo" });
  });
  it("normalises dates and entities", () => {
    expect(parseLongDate("On August 26, 2026, the FDA")).toBe("2026-08-26");
    expect(normaliseDate("2026-09-01-07:00")).toBe("2026-09-01");
    expect(decodeEntities("A &ndash; B &#8211; C &#x2013; D &nbsp;E")).toBe("A – B – C – D  E");
    expect(stripTags("<p>Hi <b>there</b></p>")).toBe("Hi there");
  });
});
