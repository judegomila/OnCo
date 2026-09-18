import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { clearAccountProfile, getAccountProfile, saveAccountProfile } from "./profile";

/** Minimal window + localStorage so the per-user account store exercises its browser branch; nothing here talks to a network. */
function fakeWindow() {
  const store = new Map<string, string>();
  const events: string[] = [];
  return {
    store, events,
    localStorage: { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => { store.set(k, v); }, removeItem: (k: string) => { store.delete(k); } },
    dispatchEvent: (e: Event) => { events.push(e.type); return true; },
  };
}
type G = { window?: unknown; CustomEvent?: unknown };
const g = globalThis as unknown as G;

describe("account profile store", () => {
  let win: ReturnType<typeof fakeWindow>;
  beforeEach(() => {
    win = fakeWindow(); g.window = win;
    if (typeof g.CustomEvent === "undefined") g.CustomEvent = class extends Event { detail: unknown; constructor(type: string, init?: { detail?: unknown }) { super(type); this.detail = init?.detail; } };
  });
  afterEach(() => { delete g.window; });

  it("is empty without a window, a user id or a stored entry", () => {
    delete g.window;
    expect(getAccountProfile("user_1")).toEqual({});
    g.window = win;
    expect(getAccountProfile(undefined)).toEqual({});
    expect(getAccountProfile("user_1")).toEqual({});
  });

  it("saves under a key that carries the user id and reads back per user", () => {
    saveAccountProfile("user_1", { role: "patient", cancer: "aml", consentAt: "2026-09-18T09:00:00.000Z" });
    saveAccountProfile("user_2", { role: "researcher" });
    expect([...win.store.keys()]).toEqual(["onco:account-profile:v1:user_1", "onco:account-profile:v1:user_2"]);
    expect(getAccountProfile("user_1")).toEqual({ role: "patient", cancer: "aml", consentAt: "2026-09-18T09:00:00.000Z" });
    expect(getAccountProfile("user_2")).toEqual({ role: "researcher" });
    expect(win.events).toEqual(["onco:account-profile", "onco:account-profile"]);
  });

  it("merges patches and drops fields set to undefined", () => {
    saveAccountProfile("user_1", { role: "caregiver", cancer: "aml" });
    const saved = saveAccountProfile("user_1", { cancer: undefined });
    expect(saved).toEqual({ role: "caregiver" });
    expect(getAccountProfile("user_1")).toEqual({ role: "caregiver" });
  });

  it("ignores an unknown role or damaged JSON", () => {
    win.store.set("onco:account-profile:v1:user_1", JSON.stringify({ role: "admin", cancer: "" }));
    expect(getAccountProfile("user_1")).toEqual({});
    win.store.set("onco:account-profile:v1:user_1", "{not json");
    expect(getAccountProfile("user_1")).toEqual({});
  });

  it("clears one user without touching another", () => {
    saveAccountProfile("user_1", { role: "provider" });
    saveAccountProfile("user_2", { role: "patient" });
    clearAccountProfile("user_1");
    expect(getAccountProfile("user_1")).toEqual({});
    expect(getAccountProfile("user_2")).toEqual({ role: "patient" });
    expect(win.events.at(-1)).toBe("onco:account-profile");
  });
});
