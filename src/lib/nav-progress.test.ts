import { describe, expect, it } from "vitest";
import { navigationHref, PROGRESS_TIMEOUT_MS } from "./nav-progress";

const here = { origin: "https://onco.cc", pathname: "/cancers/", search: "" };
const click = (over: Partial<Parameters<typeof navigationHref>[1]> = {}) => ({ button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, defaultPrevented: false, ...over });
const anchor = (href: string, attrs: Record<string, string> = {}, target = "") => ({ href: new URL(href, here.origin).href, target, hasAttribute: (n: string) => n in attrs });

describe("navigation progress: which clicks start the bar", () => {
  it("starts for a plain left click on another page of the site", () => {
    expect(navigationHref(anchor("/cancers/tnbc/"), click(), here)).toBe("/cancers/tnbc/");
    expect(navigationHref(anchor("/drugs/?status=approved"), click(), here)).toBe("/drugs/?status=approved");
  });

  it("stays hidden for modified clicks, other buttons, new tabs and handled clicks", () => {
    expect(navigationHref(anchor("/cancers/tnbc/"), click({ metaKey: true }), here)).toBeNull();
    expect(navigationHref(anchor("/cancers/tnbc/"), click({ ctrlKey: true }), here)).toBeNull();
    expect(navigationHref(anchor("/cancers/tnbc/"), click({ shiftKey: true }), here)).toBeNull();
    expect(navigationHref(anchor("/cancers/tnbc/"), click({ button: 1 }), here)).toBeNull();
    expect(navigationHref(anchor("/cancers/tnbc/", {}, "_blank"), click(), here)).toBeNull();
    expect(navigationHref(anchor("/cancers/tnbc/"), click({ defaultPrevented: true }), here)).toBeNull();
  });

  it("stays hidden for other origins, downloads, files and same-page hash links", () => {
    expect(navigationHref(anchor("https://me.onco.cc/"), click(), here)).toBeNull();
    expect(navigationHref(anchor("https://github.com/judegomila/OnCo"), click(), here)).toBeNull();
    expect(navigationHref(anchor("/api/v1/entities/tnbc.json"), click(), here)).toBeNull();
    expect(navigationHref(anchor("/api/v1/cancers.csv"), click(), here)).toBeNull();
    expect(navigationHref(anchor("/edge/feed.xml"), click(), here)).toBeNull();
    expect(navigationHref(anchor("/report.pdf", { download: "" }), click(), here)).toBeNull();
    expect(navigationHref(anchor("/cancers/#trials"), click(), here)).toBeNull();
    expect(navigationHref(anchor("/cancers/", { "data-no-progress": "" }), click(), here)).toBeNull();
  });

  it("treats a hash on another page as a navigation and a query change on this page as one too", () => {
    expect(navigationHref(anchor("/cancers/tnbc/#pipeline"), click(), here)).toBe("/cancers/tnbc/");
    expect(navigationHref(anchor("/cancers/?group=Breast"), click(), here)).toBe("/cancers/?group=Breast");
  });

  it("keeps the safety timeout long enough for a 700 KB payload on a slow line but not forever", () => {
    expect(PROGRESS_TIMEOUT_MS).toBeGreaterThanOrEqual(10_000);
    expect(PROGRESS_TIMEOUT_MS).toBeLessThanOrEqual(30_000);
  });
});
