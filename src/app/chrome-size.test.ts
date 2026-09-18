import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "./layout";
import EmbedCard, { generateStaticParams as embedParams } from "./(embed)/embed/[id]/page";
import { myCancerList, myCancerTiles } from "@/lib/my-cancer-list";

/**
 * The shared chrome is repeated in every one of the ~27,000 exported pages, twice over: once as HTML and once in the
 * RSC payload the page inlines for hydration. A 22 GB export came from that repetition, and the largest single item
 * was the 39 KB cancer list (id, name, route) the root layout passed as a prop to two header components: props are
 * serialised per page, imported code ships once. This test keeps the layout's contribution small:
 *
 *  - the layout never calls the graph for the cancer list (it is fetched on demand, src/lib/use-my-cancer-list.ts);
 *  - the header and footer markup, and a whole minimal page (an embed card inside the layout), stay under budgets
 *    set from the measurements when this was written (header 10.7 KB, footer 21.1 KB, embed page 41.8 KB), with room.
 *
 * Budgets are on the static markup, which react-dom/server can produce here; the RSC payload cannot be rendered in
 * vitest, but the same trees drive both, and the spy on myCancerList catches the one thing that inflated it most.
 */

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));
vi.mock("@/lib/my-cancer-list", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@/lib/my-cancer-list")>();
  return { ...mod, myCancerList: vi.fn(mod.myCancerList), myCancerTiles: vi.fn(mod.myCancerTiles) };
});

const KB = 1024;
const BUDGET = { header: 14 * KB, footer: 26 * KB, chrome: 40 * KB, embedPage: 52 * KB };

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const bytes = (s: string) => Buffer.byteLength(s, "utf8");
const slice = (html: string, tag: string) => {
  const start = html.indexOf(`<${tag}`);
  const end = html.indexOf(`</${tag}>`);
  expect(start, `<${tag}> present`).toBeGreaterThanOrEqual(0);
  return html.slice(start, end + tag.length + 3);
};

describe("shared chrome stays small", () => {
  const layoutHtml = render(createElement("div", { id: "probe" }, "page"));
  const header = slice(layoutHtml, "header");
  const footer = slice(layoutHtml, "footer");

  it("renders the header and footer inside their byte budgets", () => {
    expect(bytes(header), `header ${bytes(header)} B`).toBeLessThan(BUDGET.header);
    expect(bytes(footer), `footer ${bytes(footer)} B`).toBeLessThan(BUDGET.footer);
    expect(bytes(header) + bytes(footer), "header + footer").toBeLessThan(BUDGET.chrome);
  });

  it("does not serialise the cancer list into the layout", () => {
    expect(vi.mocked(myCancerList)).not.toHaveBeenCalled();
    expect(vi.mocked(myCancerTiles)).not.toHaveBeenCalled();
    // The header's My cancer chip and account menu render their unset state; no cancer routes beyond the nav's own links.
    expect((layoutHtml.match(/href="\/cancers\//g) ?? []).length).toBeLessThanOrEqual(4);
    expect(layoutHtml).not.toContain("acral-melanoma");
  });

  it("keeps a minimal page (embed card in the layout) inside its budget", async () => {
    const [first] = embedParams();
    const html = render(await EmbedCard({ params: Promise.resolve(first) }));
    expect(html).toContain('id="main"');
    expect(bytes(html), `embed page ${bytes(html)} B`).toBeLessThan(BUDGET.embedPage);
    expect(vi.mocked(myCancerList)).not.toHaveBeenCalled();
  });
});
