import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The caching policy in vercel.json, as the edge and the browser see it (24 September 2026 baseline: every page was
 * served `public, max-age=0, must-revalidate`, so each visit revalidated at the edge and a deploy emptied the edge
 * for every one of the 27,000 pages; the platform already sends `public, max-age=31536000, immutable` for
 * /_next/static/* and honours s-maxage for the CDN, so those are not repeated here).
 *
 *  - pages and their RSC payloads (index.txt, __next.*.txt): the edge keeps them a day and serves stale for a week
 *    while it refetches; the browser revalidates each visit (max-age=0) but may reuse what it has while it does;
 *  - /api/v1/* JSON: an hour at the edge, a day stale-while-revalidate, CORS open;
 *  - the service worker keeps the platform default so an update is picked up on the next visit;
 *  - the redirects and the ignoreCommand are untouched by this work.
 */
type Header = { key: string; value: string };
type Rule = { source: string; headers: Header[] };
type Config = { headers: Rule[]; redirects: Array<{ source: string; destination: string; permanent: boolean; has?: unknown[] }>; ignoreCommand: string };

const config = JSON.parse(readFileSync(join(__dirname, "../../vercel.json"), "utf8")) as Config;
const cacheControl = (rule: Rule) => rule.headers.find((h) => h.key === "Cache-Control")?.value;
/** Vercel compiles the rules to path-to-regexp routes; this mirrors enough of that to test which rule a path hits. */
const matches = (source: string, path: string) => new RegExp(`^${source.replace(/\(\.\*\)/g, "(.*)").replace(/\\\./g, "\\.")}$`).test(path);
/** Later rules override earlier ones for the same header key (the Next/Vercel header semantics). */
const effective = (path: string) => config.headers.filter((r) => matches(r.source, path)).map(cacheControl).filter(Boolean).at(-1);

describe("vercel.json caching", () => {
  it("keeps pages and their payloads hot at the edge between deploys while browsers revalidate", () => {
    const html = "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";
    expect(effective("/cancers/tnbc/")).toBe(html);
    expect(effective("/cancers/tnbc/index.txt")).toBe(html);
    expect(effective("/cancers/tnbc/__next._tree.txt")).toBe(html);
    expect(effective("/")).toBe(html);
    expect(effective("/drugs/")).toBe(html);
  });

  it("leaves the platform's immutable rule for hashed assets and the default for the service worker", () => {
    expect(effective("/_next/static/chunks/abc.js")).toBeUndefined();
    expect(effective("/_next/static/media/font.woff2")).toBeUndefined();
    expect(effective("/sw.js")).toBeUndefined();
  });

  it("caches the JSON API an hour at the edge with a day of stale-while-revalidate and open CORS", () => {
    const api = config.headers.find((r) => r.source.startsWith("/api/v1/"));
    expect(api && cacheControl(api)).toBe("public, max-age=0, s-maxage=3600, stale-while-revalidate=86400");
    expect(api?.headers.find((h) => h.key === "Access-Control-Allow-Origin")?.value).toBe("*");
    expect(effective("/api/v1/entities/tnbc.json")).toBe("public, max-age=0, s-maxage=3600, stale-while-revalidate=86400");
  });

  it("keeps the snapshot and image rules", () => {
    expect(effective("/logos/x.png")).toBe("public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
    expect(effective("/icon.svg")).toBe("public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
  });

  it("does not touch the redirects or the ignore command", () => {
    expect(config.redirects.length).toBeGreaterThanOrEqual(60);
    expect(config.redirects[0]).toMatchObject({ destination: "https://onco.cc/:path*", permanent: true });
    expect(config.ignoreCommand).toContain("github-actions[bot]");
  });
});
