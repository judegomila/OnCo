import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "../layout";
import TaggedIndex from "./page";
import TaggedPage, { generateMetadata, generateStaticParams } from "./[tag]/page";
import { allTags, tagIndex } from "@/lib/tags";
import { KIND_PAGE } from "@/lib/static-tables";

/**
 * The tag pages (/tagged/ and /tagged/<slug>/): a dedicated power search over every record carrying a tag. The
 * page renders the tag as a pill, one sentence on what it means, kind pills that filter, related tags, a paged
 * EntityBrowser with header filters, and the JSON companion link.
 */
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const page = (tag: string) => TaggedPage({ params: Promise.resolve({ tag }) });
const bodyRows = (html: string) => (html.match(/<tbody[^>]*>[\s\S]*?<\/tbody>/g) ?? []).map((t) => (t.match(/<tr[\s>]/g) ?? []).length);

describe("/tagged/ index", () => {
  it("lists every tag as a link with its count, linked from the explore header and the footer", () => {
    const html = render(createElement(TaggedIndex));
    const tags = allTags();
    // next/link drops the trailing slash when rendered outside the Next build (the export adds it back), hence `/?`.
    for (const t of tags.slice(0, 50)) expect(html).toMatch(new RegExp(`href="/tagged/${t.slug}/?"`));
    expect((html.match(/href="\/tagged\/[a-z0-9-]+\/?"/g) ?? []).length).toBeGreaterThanOrEqual(tags.length);
    expect(html).toContain(`${tags.length} tags`);
    // The footer links the index.
    const footer = html.slice(html.indexOf("<footer"));
    expect(footer).toMatch(/href="\/tagged\/?"/);
  });
});

describe("/tagged/<slug>/", () => {
  it("has a static param for every tag and metadata for each", async () => {
    const params = generateStaticParams();
    expect(params.length).toBe(tagIndex().size);
    const meta = await generateMetadata({ params: Promise.resolve(params[0]) });
    expect(meta.title).toBeDefined();
    expect(await generateMetadata({ params: Promise.resolve({ tag: "no-such-tag" }) })).toEqual({});
  });

  it("the largest tag renders the pill, the sentence, kind pills, related tags, a paged browser with header filters and the JSON link", async () => {
    const [top] = allTags();
    expect(top.count).toBeGreaterThan(KIND_PAGE);
    const html = render(await page(top.slug));
    expect(html).toContain("data-tag-pill");
    expect(html).toContain(`>${top.tag}<`);
    expect(html).toContain(top.description);
    // Kind pills are deep links that also filter in place.
    expect(html).toContain("data-tag-kinds");
    expect((html.match(/href="\?kind=[^"]+"/g) ?? []).length).toBe(Object.keys(top.kinds).length);
    // Related tags link their own pages.
    expect(html).toContain("data-related-tags");
    const related = html.slice(html.indexOf("data-related-tags"), html.indexOf("<table"));
    expect((related.match(/href="\/tagged\/[a-z0-9-]+\/?"/g) ?? []).length).toBeGreaterThan(0);
    // The browser: one page of rows, the Show more sentinel, header filters on the columns, the toolbar facets.
    const rows = bodyRows(html);
    expect(rows[0]).toBe(KIND_PAGE);
    expect(html).toContain("data-more");
    expect(html).toContain(`Show ${KIND_PAGE} more`);
    expect(html).toContain("data-column-filter");
    expect(html).toContain(top.count.toLocaleString("en-GB"));
    expect(html).toMatch(/href="\/(trials|drugs)\/[a-z0-9-]+\/?"/);
    // The JSON companion and the table file.
    expect(html).toContain("data-tag-export");
    expect(html).toContain(`href="/api/v1/tagged/${top.slug}.json"`);
    expect(html).toContain(`href="/api/v1/tables/tag-${top.slug}.json"`);
  });

  it("a small tag ships every row and no sentinel; a tag with several spellings names them", async () => {
    const small = allTags().find((t) => t.count > 1 && t.count <= KIND_PAGE)!;
    const html = render(await page(small.slug));
    expect(bodyRows(html)[0]).toBe(small.count);
    expect(html).not.toContain("data-more");
    expect(html).toContain(`href="/api/v1/tagged/${small.slug}.json"`);
    const spelled = allTags().find((t) => t.variants.length > 1)!;
    const html2 = render(await page(spelled.slug));
    expect(html2).toContain("Also written");
    expect(html2).toContain(spelled.variants[1]);
  });
});
