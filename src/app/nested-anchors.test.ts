import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "./layout";

/**
 * Wall-clock allowance for the whole-page renders below. 120 seconds is right on an idle machine and is a real
 * guard: a page that takes longer than that has usually started rendering something it should page instead. But
 * it measures contention, not code, when a dozen agents are building in other worktrees, and three ship chains
 * have now failed on these four files at 149 seconds and passed on a re-run. The chain exports SLOW_TEST_MS so
 * the allowance follows the machine it is on; the default is unchanged, and no assertion is relaxed either way.
 */
const SLOW_MS = Number(process.env.SLOW_TEST_MS ?? 120_000);

/**
 * Anchors nested inside anchors, on every page of the site. The HTML parser refuses to nest <a>: it closes the
 * outer one early and lifts the inner one out as a sibling, so the DOM the browser builds differs from the tree
 * React expects and hydration fails with React error 418 (first seen on /dependencies/, roadmap row 139). The
 * serialised DOM after React recovers looks identical to the server HTML, which is why a text diff never showed it.
 *
 * Every src/app page is rendered here with react-dom/server against the real graph, the way the static export
 * renders it, inside the root layout so the header and footer are scanned too. Pages with `generateStaticParams`
 * are rendered for a sample of their real ids (one record per kind, every kind browser, the first few of the rest);
 * `NA_FULL=1 npx vitest run src/app/nested-anchors.test.ts` renders every id (several minutes). New pages are
 * picked up by the glob, so nothing has to be registered.
 */

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

type Params = Record<string, string>;
type PageModule = {
  default: (props: { params: Promise<Params> }) => ReactElement | Promise<ReactElement>;
  generateStaticParams?: () => Params[] | Promise<Params[]>;
};

// Lazy glob (Vite in tests, Turbopack in Next): each value is a thunk returning the page module.
const pages = import.meta.glob("./**/page.tsx") as Record<string, () => Promise<PageModule>>;
const FULL = !!process.env.NA_FULL;

/** Snippets around each `<a` that opens while another `<a` is still open. SVG subtrees are skipped (SVG <a> is a different element). */
export function nestedAnchors(html: string): string[] {
  const found: string[] = [];
  let open = 0, svg = 0;
  for (const m of html.matchAll(/<(\/?)(a|svg)(?=[\s>/])/g)) {
    if (m[2] === "svg") { svg = Math.max(0, svg + (m[1] ? -1 : 1)); continue; }
    if (svg > 0) continue;
    if (m[1]) { open = Math.max(0, open - 1); continue; }
    if (open > 0) found.push(html.slice(Math.max(0, m.index - 200), m.index + 120));
    open++;
  }
  return found;
}

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr", "param", "keygen"]);
/** Start tags that close an open <p> ("closes a p element" in the HTML spec), so a p wrapping one ends early. */
const P_CLOSERS = new Set(["address", "article", "aside", "blockquote", "center", "details", "dialog", "dir", "div", "dl", "dd", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "listing", "main", "menu", "nav", "ol", "p", "pre", "search", "section", "table", "ul", "xmp"]);
/** HTML start tags that pop the parser out of an <svg> unless inside foreignObject, desc or title. */
const SVG_BREAKOUT = new Set(["b", "big", "blockquote", "body", "br", "center", "code", "dd", "div", "dl", "dt", "em", "embed", "h1", "h2", "h3", "h4", "h5", "h6", "head", "hr", "i", "img", "li", "listing", "menu", "meta", "nobr", "ol", "p", "pre", "ruby", "s", "small", "span", "strong", "strike", "sub", "sup", "table", "tt", "u", "ul", "var"]);
/** The spec's "special" category: a dd/dt/li start tag stops looking for an open dd/dt/li at one of these (bar address, div, p). */
const SPECIAL = new Set("address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input keygen li link listing main marquee menu meta nav noembed noframes noscript object ol p param plaintext pre script search section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp svg math foreignobject desc".split(" "));
const TABLE_KIDS = new Set(["caption", "colgroup", "thead", "tbody", "tfoot", "tr", "script", "template", "style"]);
const SECTION_KIDS = new Set(["tr", "script", "template"]);
const ROW_KIDS = new Set(["td", "th", "script", "template"]);
const TABLE_TEXT_PARENTS = new Set(["table", "tbody", "thead", "tfoot", "tr", "colgroup"]);

export type StructureIssue = { rule: string; at: string };

/**
 * Places where a browser's HTML parser builds a different tree from the one React serialised, so hydration fails
 * (React error 418) although the text looks fine. No HTML parser ships in node_modules, so this walks the tag stream
 * with the tree-construction rules that rearrange or drop elements: an <a> or <button> inside another, a block inside
 * <p> (the p closes early), nested forms (the inner one is ignored), li/dd/dt closing an open li/dd/dt, table parts
 * outside their table (foster-parented, or dropped), non-whitespace text directly in a table, elements inside
 * <option>, HTML tags that break out of an <svg>, and an empty <title> inside an <svg>: React's server renderer
 * applies the document-title rule to every <title>, so one with several JSX children (`{a} ({b})`) is emitted empty
 * while the client renders the text (first seen on /targets/kras/, HotspotPlot). React output is balanced, so the
 * stack is exact; nothing here handles misnested end tags.
 */
export function structureIssues(html: string): StructureIssue[] {
  const issues: StructureIssue[] = [];
  const stack: string[] = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?)>|<!--[\s\S]*?-->|<!DOCTYPE[^>]*>/g;
  const ctx = (i: number) => html.slice(Math.max(0, i - 200), i + 100).replace(/\s+/g, " ");
  const flag = (rule: string, i: number) => issues.push({ rule, at: ctx(i) });
  const top = () => stack[stack.length - 1];
  /** Does a dd/dt/li start tag reach an open `tags` element before a special element (address, div and p excepted)? */
  const closesOpen = (tags: string[]) => {
    for (let i = stack.length - 1; i >= 0; i--) {
      const t = stack[i];
      if (tags.includes(t)) return t;
      if (t !== "address" && t !== "div" && t !== "p" && SPECIAL.has(t)) return null;
    }
    return null;
  };
  let lastEnd = 0;
  for (const m of html.matchAll(re)) {
    const text = html.slice(lastEnd, m.index);
    lastEnd = m.index + m[0].length;
    if (text.trim() && TABLE_TEXT_PARENTS.has(top())) flag(`text-foster-parented-out-of-${top()}`, m.index);
    if (m[0].startsWith("<!")) continue;
    const [, close, rawTag, , selfClose] = m;
    const tag = rawTag.toLowerCase();
    if (close) {
      const idx = stack.lastIndexOf(tag);
      if (idx === -1) { flag(`stray-close-${tag}`, m.index); continue; }
      if (idx !== stack.length - 1) flag(`unbalanced-${tag}-over-${stack.slice(idx + 1).join(">")}`, m.index);
      if (tag === "title" && stack.includes("svg") && !text.trim()) flag("empty-svg-title", m.index);
      stack.length = idx;
      continue;
    }
    const svgAt = stack.lastIndexOf("svg");
    if (svgAt >= 0) {
      if (SVG_BREAKOUT.has(tag) && !stack.slice(svgAt).some((t) => t === "foreignobject" || t === "desc" || t === "title")) flag(`${tag}-breaks-out-of-svg`, m.index);
    } else {
      const p = top();
      if (tag === "a" && stack.includes("a")) flag("a-in-a", m.index);
      if (tag === "button" && stack.includes("button")) flag("button-in-button", m.index);
      if (P_CLOSERS.has(tag) && stack.includes("p")) flag(`${tag}-in-p`, m.index);
      if (tag === "form" && stack.includes("form")) flag("form-in-form", m.index);
      if (tag === "dd" || tag === "dt") { const o = closesOpen(["dd", "dt"]); if (o) flag(`${tag}-closes-open-${o}`, m.index); }
      if (tag === "li") { if (closesOpen(["li"])) flag("li-closes-open-li", m.index); if (p !== "ul" && p !== "ol" && p !== "menu") flag(`li-in-${p}`, m.index); }
      if (tag === "tr" && p !== "tbody" && p !== "thead" && p !== "tfoot") flag(`tr-in-${p}`, m.index);
      if ((tag === "td" || tag === "th") && p !== "tr") flag(`${tag}-in-${p}`, m.index);
      if ((tag === "tbody" || tag === "thead" || tag === "tfoot" || tag === "caption" || tag === "colgroup") && p !== "table") flag(`${tag}-in-${p}`, m.index);
      if (p === "table" && !TABLE_KIDS.has(tag)) flag(`${tag}-foster-parented-out-of-table`, m.index);
      if ((p === "tbody" || p === "thead" || p === "tfoot") && !SECTION_KIDS.has(tag)) flag(`${tag}-foster-parented-out-of-${p}`, m.index);
      if (p === "tr" && !ROW_KIDS.has(tag)) flag(`${tag}-foster-parented-out-of-tr`, m.index);
      if (p === "option") flag(`${tag}-in-option`, m.index);
      if (p === "select" && tag !== "option" && tag !== "optgroup" && tag !== "hr" && tag !== "script" && tag !== "template") flag(`${tag}-in-select`, m.index);
      if (/^h[1-6]$/.test(tag) && /^h[1-6]$/.test(p)) flag(`${tag}-in-${p}`, m.index);
    }
    if (VOID.has(tag) || (selfClose && (svgAt >= 0 || tag === "svg"))) continue;
    stack.push(tag);
  }
  if (stack.length) issues.push({ rule: `unclosed-${stack.join(">")}`, at: "" });
  return issues;
}

/** Which ids to render for a dynamic route: one record per kind for the record pages, every kind browser, the first few otherwise. */
function pick(file: string, all: Params[]): Params[] {
  if (FULL || file.startsWith("./[kind]/page")) return all;
  if (file.includes("[kind]/[id]")) {
    const seen = new Set<string>();
    return all.filter((p) => !seen.has(p.kind) && !!seen.add(p.kind));
  }
  return all.slice(0, 3);
}

/** Client components that call useRouter need the app router context; navigation never happens in a static render. */
const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
export const render = (el: ReactElement) =>
  renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));

describe("no page renders markup the HTML parser would rebuild", () => {
  it.each(Object.keys(pages).sort())("%s", async (file) => {
    const mod = await pages[file]();
    const paramSets = mod.generateStaticParams ? pick(file, await mod.generateStaticParams()) : [{}];
    expect(paramSets.length).toBeGreaterThan(0);
    for (const p of paramSets) {
      const html = render(await mod.default({ params: Promise.resolve(p) }));
      // Every page has at least the header and footer links; an anchorless render means the page did not render.
      expect(html, `${file} ${JSON.stringify(p)} rendered no links`).toMatch(/<a[\s>]/);
      expect(nestedAnchors(html), `${file} ${JSON.stringify(p)}`).toEqual([]);
      expect(structureIssues(html), `${file} ${JSON.stringify(p)}`).toEqual([]);
    }
  }, FULL ? 1_800_000 : SLOW_MS);

  it("the scanner catches the pattern it guards against", () => {
    expect(nestedAnchors('<a href="/x"><span>Only vendor: <a href="/y">Y</a></span></a>')).toHaveLength(1);
    expect(nestedAnchors('<a href="/x">X</a><a href="/y">Y</a>')).toEqual([]);
    expect(nestedAnchors('<a href="/x"><svg><a href="/y"><path/></a></svg></a>')).toEqual([]);
    expect(nestedAnchors('<abbr title="x"><a href="/y">Y</a></abbr>')).toEqual([]);
  });

  it("the structure scanner catches what the parser rearranges and passes what it keeps", () => {
    const rules = (h: string) => structureIssues(h).map((i) => i.rule);
    expect(rules('<svg><g><rect><title></title></rect><circle><title>KRAS</title></circle></g></svg>')).toEqual(["empty-svg-title"]);
    expect(rules('<a href="/x"><span><a href="/y">Y</a></span></a>')).toEqual(["a-in-a"]);
    expect(rules('<p>Text <div>block</div></p>')).toEqual(["div-in-p"]);
    expect(rules('<p><span><ul><li>x</li></ul></span></p>')).toEqual(["ul-in-p", "li-in-p"]);
    expect(rules('<button><button>x</button></button>')).toEqual(["button-in-button"]);
    expect(rules('<form><div><form></form></div></form>')).toEqual(["form-in-form"]);
    expect(rules('<ul><li>a<div><li>b</li></div></li></ul>')).toEqual(["li-closes-open-li", "li-in-div"]);
    expect(rules('<dl><dt>a<span><dd>b</dd></span></dt></dl>')).toEqual(["dd-closes-open-dt"]);
    expect(rules('<table><tr><td>x</td></tr></table>')).toEqual(["tr-in-table"]);
    expect(rules('<table><tbody><tr><td>x</td></tr></tbody> stray</table>')).toEqual(["text-foster-parented-out-of-table"]);
    expect(rules('<table><tbody><tr><td>x</td></tr><div>y</div></tbody></table>')).toEqual(["div-foster-parented-out-of-tbody"]);
    expect(rules('<div><td>x</td></div>')).toEqual(["td-in-div"]);
    expect(rules('<select><option><b>x</b></option></select>')).toEqual(["b-in-option"]);
    expect(rules('<svg><text><span>x</span></text></svg>')).toEqual(["span-breaks-out-of-svg"]);
    expect(rules('<h2><h3>x</h3></h2>')).toEqual(["h3-in-h2"]);
    // Kept as written by the parser.
    expect(rules('<dl><div><dt>a</dt><dd>b<dl><dt>c</dt></dl></dd></div></dl>')).toEqual([]);
    expect(rules('<ul><li>a<ul><li>b</li></ul></li></ul>')).toEqual([]);
    expect(rules('<p>Text <span><a href="/y">Y</a></span> <b>bold</b><br/><img src="x"></p>')).toEqual([]);
    expect(rules('<table><thead><tr><th>h</th></tr></thead><tbody><tr><td><div><p>x</p></div></td></tr></tbody></table>')).toEqual([]);
    expect(rules('<svg viewBox="0 0 1 1"><title>Name (1 to 9)</title><foreignObject><div>ok</div></foreignObject><path d="M0 0"/></svg>')).toEqual([]);
    expect(rules('<a href="/x"><svg><a href="/y"><path/></a></svg></a>')).toEqual([]);
    expect(rules('<span><div>block in span is kept</div></span>')).toEqual([]);
  });
});
