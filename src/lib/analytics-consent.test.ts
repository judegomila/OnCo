import { describe, expect, it } from "vitest";
import { CONSENT_KEY, GA_ID, GTAG_SRC, applyConsent, clearGaCookies, loadGtag, readConsent, shouldShowBar, type ConsentEnv, type GtagDocument, type GtagWindow } from "./analytics-consent";

/**
 * The analytics gate, run against fakes (no jsdom here): what is read from storage and the Global Privacy Control
 * signal, when the bar shows, and what Allow and No thanks do to the page.
 */
function memStorage(init: Record<string, string> = {}) {
  const m = new Map(Object.entries(init));
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => { m.set(k, v); }, map: m };
}
const env = (storage: ConsentEnv["storage"], gpc = false): ConsentEnv => ({ storage, gpc });

type FakeDoc = GtagDocument & { cookie: string; appended: Array<{ async: boolean; src: string }>; cookieWrites: string[] };
function fakeDoc(cookie = ""): FakeDoc {
  const appended: Array<{ async: boolean; src: string }> = [];
  const cookieWrites: string[] = [];
  return {
    appended, cookieWrites,
    get cookie() { return cookie; },
    set cookie(v: string) { cookieWrites.push(v); },
    createElement: () => ({ async: false, src: "" }),
    head: { appendChild: (n: unknown) => { appended.push(n as { async: boolean; src: string }); return n; } },
  };
}
const fakeWin = (): GtagWindow => ({});

describe("reading the choice", () => {
  it("is unset, and shows the bar, when nothing is stored and the browser sent no signal", () => {
    expect(readConsent(env(memStorage()))).toBe("unset");
    expect(shouldShowBar(env(memStorage()))).toBe(true);
  });

  it("returns the stored choice", () => {
    expect(readConsent(env(memStorage({ [CONSENT_KEY]: "granted" })))).toBe("granted");
    expect(readConsent(env(memStorage({ [CONSENT_KEY]: "denied" })))).toBe("denied");
    expect(shouldShowBar(env(memStorage({ [CONSENT_KEY]: "denied" })))).toBe(false);
  });

  it("treats a Global Privacy Control signal as No thanks without showing the bar, and writes nothing", () => {
    const s = memStorage();
    expect(readConsent(env(s, true))).toBe("denied");
    expect(shouldShowBar(env(s, true))).toBe(false);
    expect(s.map.size).toBe(0);
  });

  it("lets an explicit choice made on the site override the GPC signal", () => {
    expect(readConsent(env(memStorage({ [CONSENT_KEY]: "granted" }), true))).toBe("granted");
    expect(readConsent(env(memStorage({ [CONSENT_KEY]: "denied" }), true))).toBe("denied");
  });

  it("ignores garbage, blocked storage and storage that throws", () => {
    expect(readConsent(env(memStorage({ [CONSENT_KEY]: "yes please" })))).toBe("unset");
    expect(readConsent(env(null))).toBe("unset");
    expect(readConsent(env(null, true))).toBe("denied");
    const throwing = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
    expect(readConsent(env(throwing))).toBe("unset");
    expect(() => applyConsent("denied", env(throwing), fakeWin(), fakeDoc(), "onco.cc")).not.toThrow();
  });
});

describe("acting on the choice", () => {
  it("Allow stores granted and inserts the Google loader with a plain config call, once", () => {
    const s = memStorage(); const win = fakeWin(); const doc = fakeDoc();
    applyConsent("granted", env(s), win, doc, "onco.cc");
    expect(s.map.get(CONSENT_KEY)).toBe("granted");
    expect(doc.appended).toHaveLength(1);
    expect(doc.appended[0]).toMatchObject({ async: true, src: GTAG_SRC });
    expect(GTAG_SRC).toContain(GA_ID);
    const layer = win.dataLayer as unknown[][];
    expect(layer[0][0]).toBe("js");
    expect(layer[0][1]).toBeInstanceOf(Date);
    expect(layer[1]).toEqual(["config", GA_ID]);
    expect(win[`ga-disable-${GA_ID}`]).toBe(false);
    // A second Allow (or a later mount) does not insert a second tag.
    expect(loadGtag(win, doc)).toBe(false);
    applyConsent("granted", env(s), win, doc, "onco.cc");
    expect(doc.appended).toHaveLength(1);
  });

  it("No thanks stores denied, inserts nothing and sets no cookie", () => {
    const s = memStorage(); const win = fakeWin(); const doc = fakeDoc();
    applyConsent("denied", env(s), win, doc, "onco.cc");
    expect(s.map.get(CONSENT_KEY)).toBe("denied");
    expect(doc.appended).toHaveLength(0);
    expect(win.dataLayer).toBeUndefined();
    expect(win[`ga-disable-${GA_ID}`]).toBe(true);
    expect(doc.cookieWrites).toEqual([]);
  });

  it("changing from Allow to No thanks disables the loaded tag and expires the _ga cookies it can reach", () => {
    const s = memStorage(); const win = fakeWin(); const doc = fakeDoc("_ga=GA1.1.1; onco_other=1; _ga_ABC=GS1.1.2");
    applyConsent("granted", env(s), win, doc, "www.onco.cc");
    applyConsent("denied", env(s), win, doc, "www.onco.cc");
    expect(win[`ga-disable-${GA_ID}`]).toBe(true);
    expect(doc.appended).toHaveLength(1);
    const names = new Set(doc.cookieWrites.map((c) => c.split("=")[0]));
    expect([...names].sort()).toEqual(["_ga", "_ga_ABC"]);
    expect(doc.cookieWrites.some((c) => c.includes("domain=onco.cc"))).toBe(true);
    expect(doc.cookieWrites.some((c) => c.includes("domain=www.onco.cc"))).toBe(true);
    expect(doc.cookieWrites.every((c) => c.includes("expires=Thu, 01 Jan 1970"))).toBe(true);
  });

  it("clearGaCookies leaves other cookies alone and does nothing when there are none", () => {
    const doc = fakeDoc("theme=dark; session=abc");
    clearGaCookies(doc, "localhost");
    expect(doc.cookieWrites).toEqual([]);
  });
});
