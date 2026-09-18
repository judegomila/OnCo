import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { applyPreferences, isApplyingPreferences, PREFERENCE_EVENTS, preferencePatch, preferencesOf, preferencesToApply, readPreferences, type Preferences } from "./preferences";
import { getAccountProfile, saveAccountProfile } from "./profile";

/**
 * A minimal window + document so the toggles' stores (localStorage keys onco:region, onco.layer, onco:theme), the
 * <html> attributes their writers set and the events they fire can all be exercised without a browser.
 */
function fakeBrowser() {
  const store = new Map<string, string>();
  const events: Array<{ type: string; applying: boolean }> = [];
  const attrs = new Map<string, string>();
  const root = {
    dataset: {} as Record<string, string>, lang: "en", dir: "ltr",
    setAttribute: (k: string, v: string) => { attrs.set(k, v); }, getAttribute: (k: string) => attrs.get(k) ?? null, removeAttribute: (k: string) => { attrs.delete(k); },
  };
  const win = {
    store, events, root,
    localStorage: { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => { store.set(k, v); }, removeItem: (k: string) => { store.delete(k); } },
    dispatchEvent: (e: Event) => { events.push({ type: e.type, applying: isApplyingPreferences() }); return true; },
  };
  return win;
}
type G = { window?: unknown; document?: unknown; CustomEvent?: unknown };
const g = globalThis as unknown as G;

const CURRENT: Preferences = { region: "US", view: "plain", language: "es", theme: "dark" };

describe("preferences, pure decisions", () => {
  it("picks only the preference fields out of a profile", () => {
    expect(preferencesOf({ role: "patient", cancer: "aml", region: "UK", theme: "dark" })).toEqual({ region: "UK", theme: "dark" });
    expect(preferencesOf({})).toEqual({});
  });

  it("writes to the profile only what differs from it", () => {
    expect(preferencePatch({}, CURRENT)).toEqual(CURRENT);
    expect(preferencePatch({ region: "US", view: "plain", language: "es", theme: "dark" }, CURRENT)).toBeNull();
    expect(preferencePatch({ region: "UK", view: "plain", language: "es", theme: "dark" }, CURRENT)).toEqual({ region: "US" });
  });

  it("applies only stored values that differ from the toggles, never an unset field", () => {
    expect(preferencesToApply({}, CURRENT)).toEqual({});
    expect(preferencesToApply({ region: "UK", view: "plain" }, CURRENT)).toEqual({ region: "UK" });
    expect(preferencesToApply({ region: "global", theme: "light", language: "es" }, CURRENT)).toEqual({ region: "global", theme: "light" });
  });
});

describe("preferences, browser stores", () => {
  let win: ReturnType<typeof fakeBrowser>;
  beforeEach(() => {
    win = fakeBrowser(); g.window = win; g.document = { documentElement: win.root };
    if (typeof g.CustomEvent === "undefined") g.CustomEvent = class extends Event { detail: unknown; constructor(type: string, init?: { detail?: unknown }) { super(type); this.detail = init?.detail; } };
  });
  afterEach(() => { delete g.window; delete g.document; });

  it("reads the toggles' own keys, with Global and the defaults when nothing is stored", () => {
    expect(readPreferences()).toEqual({ region: "global", view: "technical", language: "en", theme: "light" });
    win.store.set("onco:region", "JP");
    win.store.set("onco.layer", JSON.stringify({ level: "simple", lang: "ja" }));
    win.store.set("onco:theme", "contrast");
    expect(readPreferences()).toEqual({ region: "JP", view: "simple", language: "ja", theme: "contrast" });
  });

  it("applies a stored profile through each store's own writer and flags the writes so the sync ignores them", () => {
    applyPreferences({ region: "UK", view: "plain", language: "fr", theme: "dark" });
    expect(win.store.get("onco:region")).toBe("UK");
    expect(JSON.parse(win.store.get("onco.layer") ?? "{}")).toEqual({ level: "plain", lang: "fr" });
    expect(win.store.get("onco:theme")).toBe("dark");
    expect(win.root.dataset.region).toBe("UK");
    expect(win.root.dataset.level).toBe("plain");
    expect(win.root.lang).toBe("fr");
    expect(win.root.getAttribute("data-theme")).toBe("dark");
    expect(win.events.map((e) => e.type).sort()).toEqual([...PREFERENCE_EVENTS].sort());
    for (const e of win.events) expect(e.applying, e.type).toBe(true);
    expect(isApplyingPreferences()).toBe(false);
  });

  it("applies Global by removing the region key, and writes nothing that already agrees", () => {
    win.store.set("onco:region", "US");
    applyPreferences({ region: "global" });
    expect(win.store.has("onco:region")).toBe(false);
    expect(win.root.dataset.region).toBe("global");
    win.events.length = 0;
    applyPreferences({ region: "global", view: "technical", language: "en", theme: "light" });
    expect(win.events).toEqual([]);
  });

  it("ignores unknown values", () => {
    applyPreferences({ region: "XX", view: "loud" as never, language: "tlh" as never, theme: "neon" as never });
    expect(win.store.size).toBe(0);
    expect(win.events).toEqual([]);
  });

  it("round-trips through the account profile on sign-in: profile -> toggles, then a toggle change -> profile", () => {
    // What a signed-in user chose earlier, kept with their account entry.
    saveAccountProfile("user_1", { role: "patient", region: "AU", view: "simple", language: "pt", theme: "dark" });
    // Sign-in on a fresh browser: apply what differs.
    applyPreferences(preferencesToApply(preferencesOf(getAccountProfile("user_1")), readPreferences()));
    expect(readPreferences()).toEqual({ region: "AU", view: "simple", language: "pt", theme: "dark" });
    // Afterwards the profile already agrees, so the sync has nothing to write back.
    expect(preferencePatch(getAccountProfile("user_1"), readPreferences())).toBeNull();
    // The reader switches the theme from the header: only that field goes to the profile.
    win.store.set("onco:theme", "light");
    const patch = preferencePatch(getAccountProfile("user_1"), readPreferences());
    expect(patch).toEqual({ theme: "light" });
    saveAccountProfile("user_1", patch!);
    expect(getAccountProfile("user_1")).toMatchObject({ role: "patient", region: "AU", theme: "light" });
  });
});
