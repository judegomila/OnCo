import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { graph } from "./graph";
import { routeFor } from "./kinds";
import { routeExists } from "./sitemap-urls";
import { DECISION_TOOLS, enumerateAnswers, isComplete, toolById, toolCard, toolRoute, toolsFor, toolUrls, type Answers } from "./decision-tools";
import { QUOTED_ROWS } from "@/data/decision-tools/incidental-gallbladder-cancer";
import { QUOTED_TNBC_ROWS } from "@/data/decision-tools/tnbc-after-chemotherapy";
import { gallbladderStandardOfCare } from "@/data/spikes/gallbladder-treatment";
import { NAV_GROUPS } from "./nav";
import ToolPage, { generateStaticParams } from "@/app/tools/[id]/page";
import ToolsIndexPage from "@/app/tools/page";

/**
 * Decision aids quote, they do not invent: every card carries at least one verbatim statement with an https source,
 * every combination of answers maps to existing cards, every card is reachable, every internal link resolves, and the
 * page renders without JavaScript to its questions, its note and every statement.
 */
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: Parameters<typeof renderToStaticMarkup>[0]) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));
/** Tags out first, then entities back, so an escaped "P &lt; 0.001" in a quote is not read as a tag. */
const unescape = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&#x27;/g, "'").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

const isHttps = (u: string) => /^https:\/\/[^\s"]+$/.test(u);

/** Does an internal href reach a page: an entity route, a static page, or a page with generated params we know about. */
function internalResolves(href: string): boolean {
  const path = href.split("#")[0];
  if (!path.startsWith("/")) return false;
  if (routeExists(path)) return true;
  const g = graph();
  const m = /^\/([a-z-]+)\/([a-z0-9-]+)\/$/.exec(path);
  if (m) {
    const e = g.get(m[2]);
    if (e && routeFor(e) === path) return true;
    if (m[1] === "tools" && toolById(m[2])) return true;
  }
  const sub = /^\/cancers\/([a-z0-9-]+)\/(decisions|uk|compared|changes)\/$/.exec(path);
  if (sub && g.get(sub[1])?.kind === "cancer") return true;
  const prep = /^\/(prep|first-60-days|sequencing)\/([a-z0-9-]+)\/$/.exec(path);
  if (prep && g.get(prep[2])?.kind === "cancer") return true;
  return false;
}

describe("decision tools: data", () => {
  it("registers tools with unique ids keyed to real cancer, subtype and term records", () => {
    const g = graph();
    expect(new Set(DECISION_TOOLS.map((t) => t.id)).size).toBe(DECISION_TOOLS.length);
    for (const t of DECISION_TOOLS) {
      expect(g.get(t.cancerId)?.kind, t.id).toBe("cancer");
      expect(t.entityIds).toContain(t.cancerId);
      for (const id of t.entityIds) expect(g.get(id), `${t.id}: entity ${id}`).toBeTruthy();
      expect(toolsFor(t.cancerId).map((x) => x.id)).toContain(t.id);
      expect(t.inputs.length).toBeGreaterThanOrEqual(3);
      for (const i of t.inputs) expect(i.options.length, `${t.id}: ${i.id}`).toBeGreaterThanOrEqual(2);
      expect(new Set(t.inputs.map((i) => i.id)).size).toBe(t.inputs.length);
      expect(new Set(t.cards.map((c) => c.id)).size).toBe(t.cards.length);
      expect(t.lede).toMatch(/educational aid/i);
      expect(t.lede).toMatch(/not advice/i);
    }
    expect(toolsFor("gallbladder-polyp").map((t) => t.id)).toContain("gallbladder-polyp");
    expect(toolsFor("incidental-gallbladder-cancer").map((t) => t.id)).toContain("incidental-gallbladder-cancer");
  });

  it("quotes every branch from an https source, with the guideline's grade where it is a guideline statement", () => {
    for (const t of DECISION_TOOLS) {
      expect(isHttps(t.guideline.url)).toBe(true);
      for (const s of t.sources) expect(isHttps(s.url), `${t.id}: ${s.label}`).toBe(true);
      for (const c of t.cards) {
        expect(c.quotes.length, `${t.id}/${c.id} has a quote`).toBeGreaterThan(0);
        for (const q of c.quotes) {
          expect(q.text.trim().length, `${t.id}/${c.id}`).toBeGreaterThan(20);
          expect(isHttps(q.source.url), `${t.id}/${c.id}: ${q.source.url}`).toBe(true);
          expect(q.source.label.length).toBeGreaterThan(10);
        }
        expect(c.meaning.length).toBeGreaterThan(20);
      }
      for (const u of toolUrls(t)) expect(isHttps(u)).toBe(true);
    }
    // Every card of the polyp aid is a guideline recommendation and carries its grade.
    for (const c of toolById("gallbladder-polyp")!.cards) for (const q of c.quotes) expect(q.grade, c.id).toMatch(/recommendation/i);
  });

  it("maps every combination of answers to existing cards, and reaches every card", () => {
    for (const t of DECISION_TOOLS) {
      const seen = new Set<string>();
      const all = enumerateAnswers(t);
      expect(all.length).toBeGreaterThan(10);
      for (const a of all) {
        expect(isComplete(t, a)).toBe(true);
        const ids = t.decide(a);
        expect(ids.length, `${t.id}: ${JSON.stringify(a)}`).toBeGreaterThan(0);
        expect(new Set(ids).size, `${t.id}: duplicate card for ${JSON.stringify(a)}`).toBe(ids.length);
        for (const id of ids) { expect(toolCard(t, id), `${t.id}: card ${id}`).toBeTruthy(); seen.add(id); }
      }
      const unreachable = t.cards.map((c) => c.id).filter((id) => !seen.has(id));
      expect(unreachable, `${t.id}: unreachable cards`).toEqual([]);
      // Incomplete answers are not decided.
      expect(isComplete(t, {})).toBe(false);
    }
  });

  it("implements the eight polyp statements as the guideline orders them", () => {
    const t = toolById("gallbladder-polyp")!;
    const base: Answers = { size: "6to9", course: "first", shape: "pedunculated", age: "le60", psc: "no", asian: "no", symptoms: "no" };
    const head = (a: Answers) => t.decide({ ...base, ...a })[0];
    expect(head({ size: "ge10" })).toBe("surgery-10mm");
    expect(t.decide({ ...base, size: "ge10", course: "stable" })).toContain("reached-10");
    expect(head({})).toBe("follow-up");
    expect(head({ age: "gt60" })).toBe("surgery-6-9-risk");
    expect(head({ psc: "yes" })).toBe("surgery-6-9-risk");
    expect(head({ asian: "yes" })).toBe("surgery-6-9-risk");
    expect(head({ shape: "sessile" })).toBe("surgery-6-9-risk");
    expect(head({ size: "le5" })).toBe("no-follow-up");
    expect(head({ size: "le5", psc: "yes" })).toBe("follow-up");
    expect(head({ course: "grew" })).toBe("grew-2mm");
    expect(head({ course: "gone", size: "ge10" })).toBe("gone");
    expect(t.decide({ ...base, symptoms: "yes" })).toContain("symptoms");
    for (const a of enumerateAnswers(t)) expect(t.decide(a).at(-1)).toBe("ultrasound");
  });

  it("separates early from muscle-invasive incidental cancer and always names the UK route", () => {
    const t = toolById("incidental-gallbladder-cancer")!;
    const base: Answers = { t: "t2", margin: "clear", lvi: "absent", spill: "intact" };
    expect(t.decide({ ...base, t: "t1a" })[0]).toBe("no-further-surgery");
    expect(t.decide({ ...base, t: "tis", margin: "involved" })[0]).toBe("early-margin-involved");
    expect(t.decide(base)[0]).toBe("re-resection");
    expect(t.decide({ ...base, t: "t1b" })).toContain("t1b-debate");
    expect(t.decide({ ...base, t: "t3" })).not.toContain("t1b-debate");
    expect(t.decide({ ...base, margin: "involved" })).toContain("margin-involved");
    expect(t.decide({ ...base, spill: "perforated" })).toContain("perforated");
    for (const a of enumerateAnswers(t)) {
      const ids = t.decide(a);
      expect(ids.at(-1)).toBe("uk-pathway");
      if (a.t === "tis" || a.t === "t1a") expect(ids).not.toContain("re-resection"); else expect(ids).toContain("timing");
    }
  });

  it("quotes OnCo's standard-of-care rows exactly as the data has them", () => {
    for (const [setting, approach] of Object.entries(QUOTED_ROWS)) {
      const row = gallbladderStandardOfCare.find((r) => r.setting === setting);
      expect(row, setting).toBeTruthy();
      expect(row!.approach).toBe(approach);
    }
    const tnbc = graph().must("tnbc");
    for (const [setting, approach] of Object.entries(QUOTED_TNBC_ROWS)) {
      const row = tnbc.kind === "cancer" ? tnbc.standardOfCare.find((r) => r.setting === setting) : undefined;
      expect(row, setting).toBeTruthy();
      expect(row!.approach).toBe(approach);
    }
  });

  it("reads the triple-negative pathology report the way NICE and the trials do", () => {
    const t = toolById("tnbc-after-chemotherapy")!;
    const base: Answers = { response: "rcb23", brca: "none", pembro: "yes" };
    expect(t.decide({ ...base, response: "pcr" })[0]).toBe("pcr");
    expect(t.decide(base)[0]).toBe("capecitabine");
    expect(t.decide({ ...base, brca: "variant" })[0]).toBe("olaparib");
    expect(t.decide({ ...base, brca: "variant" })).toContain("brca-family");
    expect(t.decide({ ...base, brca: "not-tested" })[0]).toBe("get-tested");
    expect(t.decide({ ...base, response: "unknown" })[0]).toBe("rcb-not-reported");
    expect(t.decide({ ...base, response: "pcr", brca: "variant" })).toContain("pcr-brca");
    expect(t.decide({ ...base, response: "pcr", brca: "variant" })).not.toContain("olaparib");
    expect(t.decide({ ...base, response: "pcr" })).not.toContain("capecitabine");
    for (const a of enumerateAnswers(t)) {
      const ids = t.decide(a);
      expect(ids.at(-1)).toBe("follow-up");
      expect(ids).toContain(a.pembro === "yes" ? "pembro-continues" : "no-pembro");
      if (a.response === "pcr") { expect(ids).not.toContain("olaparib"); expect(ids).not.toContain("capecitabine"); expect(ids).not.toContain("rcb-class"); }
    }
  });

  it("links only to pages that exist, and follows house style", () => {
    for (const t of DECISION_TOOLS) {
      const hrefs = [...t.links.map((l) => l.href), ...t.cards.flatMap((c) => (c.links ?? []).map((l) => l.href))];
      const broken = hrefs.filter((h) => !internalResolves(h));
      expect(broken, `${t.id}: broken links`).toEqual([]);
      const prose = [t.title, t.lede, ...t.notes, ...t.questions, ...t.cards.flatMap((c) => [c.title, c.meaning, ...(c.questions ?? [])]), ...t.inputs.flatMap((i) => [i.label, i.hint ?? "", ...i.options.map((o) => o.label)])];
      for (const s of prose) expect(s, s).not.toMatch(/—/);
    }
  });

  it("is in the navigation and the tools index lists every tool", () => {
    expect(NAV_GROUPS.flatMap((g) => g.items).some((i) => i.href === "/tools/")).toBe(true);
    const html = render(createElement(ToolsIndexPage));
    // next/link drops the trailing slash when rendered outside the Next runtime, so match either form.
    for (const t of DECISION_TOOLS) expect(html).toMatch(new RegExp(`href="${toolRoute(t.id).replace(/\/$/, "")}/?"`));
  });
});

describe("decision tools: pages", () => {
  it("render without JavaScript to their questions, a note and every statement", async () => {
    const params = generateStaticParams();
    expect(params.map((p) => p.id).sort()).toEqual(DECISION_TOOLS.map((t) => t.id).sort());
    for (const { id } of params) {
      const t = toolById(id)!;
      const html = render(await ToolPage({ params: Promise.resolve({ id }) }));
      const text = unescape(html);
      for (const i of t.inputs) { expect(text).toContain(i.label); for (const o of i.options) expect(text, `${id}: option ${o.label}`).toContain(o.label); }
      expect(text).toContain("Without JavaScript, every statement the aid can show is listed further down the page.");
      expect(text).toMatch(/educational aid/i);
      for (const c of t.cards) {
        expect(text, `${id}: card ${c.id} title`).toContain(c.title);
        for (const q of c.quotes) { expect(text, `${id}: quote in ${c.id}`).toContain(q.text.replace(/\s+/g, " ")); expect(html).toContain(`href="${q.source.url.replace(/&/g, "&amp;")}"`); }
      }
      // Answers are not decided on the server: no result card is marked as the headline before the reader chooses.
      expect(html).not.toContain(">Headline<");
    }
  });
});
