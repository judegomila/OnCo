import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Session } from "./account";
import { deleteCloudData, fetchCloudProfile, fetchSavedItems, mergeProfiles, mergeSavedItems, profileToRow, replaceSavedItems, rowToProfile, saveCloudProfile } from "./cloud-profile";

/**
 * The cloud profile transport against a mocked fetch: the two auth headers, the upsert body and Prefer header, the
 * one-shot token refresh on 401, and silence without the two public variables. Plus the two merge rules.
 */
const URL = "https://xyz.supabase.co";
const KEY = "anon-key";
const session: Session = { access_token: "tok.old", refresh_token: "refresh-1", expires_at: Date.now() + 3_600_000, user: { id: "user_01ABC", email: "a@example.org" } };

type Call = { url: string; init: RequestInit & { headers: Record<string, string> } };
let calls: Call[];
let responses: Array<() => Response>;
const json = (body: unknown, status = 200) => () => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
const empty = (status = 204) => () => new Response(null, { status });

type G = { window?: unknown; CustomEvent?: unknown };
const g = globalThis as unknown as G;
function fakeWindow() {
  const store = new Map<string, string>();
  return { store, localStorage: { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => { store.set(k, v); }, removeItem: (k: string) => { store.delete(k); } }, dispatchEvent: () => true };
}

beforeEach(() => {
  calls = []; responses = [];
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", URL);
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", KEY);
  vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit) => {
    calls.push({ url, init: init as Call["init"] });
    const next = responses.shift();
    if (!next) throw new Error(`unexpected fetch ${url}`);
    return next();
  }));
  g.window = fakeWindow();
  if (typeof g.CustomEvent === "undefined") g.CustomEvent = class extends Event { detail: unknown; constructor(type: string, init?: { detail?: unknown }) { super(type); this.detail = init?.detail; } };
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); delete g.window; });

describe("cloud profile transport", () => {
  it("is a no-op without the two public variables", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");
    expect(await fetchCloudProfile(session)).toEqual({ ok: false, reason: "off" });
    expect(await saveCloudProfile(session, { role: "patient" })).toEqual({ ok: false, reason: "off" });
    expect(await fetchSavedItems(session)).toEqual({ ok: false, reason: "off" });
    expect(await replaceSavedItems(session, [])).toEqual({ ok: false, reason: "off" });
    expect(calls).toHaveLength(0);
  });

  it("reads the profile row with the anon key as apikey and the WorkOS token as Bearer", async () => {
    responses.push(json([{ role: "caregiver", cancer_id: "aml", country: "GB", view: "plain", language: "es", theme: "dark", consent_at: "2026-09-20T10:00:00.000Z", updated_at: "2026-09-20T10:00:00.000Z" }]));
    const r = await fetchCloudProfile(session);
    expect(r).toEqual({ ok: true, value: { role: "caregiver", cancer: "aml", region: "GB", view: "plain", language: "es", theme: "dark", consentAt: "2026-09-20T10:00:00.000Z" } });
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(`${URL}/rest/v1/profiles?select=role,cancer_id,country,view,language,theme,consent_at,updated_at&user_id=eq.user_01ABC`);
    expect(calls[0].init.method).toBe("GET");
    expect(calls[0].init.headers.apikey).toBe(KEY);
    expect(calls[0].init.headers.Authorization).toBe("Bearer tok.old");
  });

  it("reports a missing row as null and a broken value as dropped", async () => {
    responses.push(json([]));
    expect(await fetchCloudProfile(session)).toEqual({ ok: true, value: null });
    expect(rowToProfile({ role: "wizard", cancer_id: "aml", country: "narnia", view: "plain", theme: "neon", consent_at: null })).toEqual({ cancer: "aml", view: "plain" });
    expect(rowToProfile(null)).toEqual({});
  });

  it("upserts the whole row with merge-duplicates and nulls for absent fields", async () => {
    responses.push(empty(201));
    const r = await saveCloudProfile(session, { role: "patient", cancer: "nsclc", theme: "light", consentAt: "2026-09-21T09:00:00.000Z" });
    expect(r).toEqual({ ok: true, value: true });
    const c = calls[0];
    expect(c.url).toBe(`${URL}/rest/v1/profiles`);
    expect(c.init.method).toBe("POST");
    expect(c.init.headers.Prefer).toBe("resolution=merge-duplicates,return=minimal");
    expect(c.init.headers["Content-Type"]).toBe("application/json");
    const body = JSON.parse(c.init.body as string) as Array<Record<string, unknown>>;
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject({ user_id: "user_01ABC", role: "patient", cancer_id: "nsclc", country: null, view: null, language: null, theme: "light", consent_at: "2026-09-21T09:00:00.000Z" });
    expect(typeof body[0].updated_at).toBe("string");
    expect(profileToRow("u", {}, "2026-01-01T00:00:00.000Z")).toEqual({ user_id: "u", role: null, cancer_id: null, country: null, view: null, language: null, theme: null, consent_at: null, updated_at: "2026-01-01T00:00:00.000Z" });
  });

  it("refreshes the WorkOS token once on 401 and retries with the new one", async () => {
    responses.push(empty(401));
    responses.push(json({ access_token: "tok.new", refresh_token: "refresh-2", user: { id: "user_01ABC", email: "a@example.org" } }));
    responses.push(json([{ role: "patient" }]));
    const r = await fetchCloudProfile(session);
    expect(r).toEqual({ ok: true, value: { role: "patient" } });
    expect(calls.map((c) => c.url)).toEqual([
      `${URL}/rest/v1/profiles?select=role,cancer_id,country,view,language,theme,consent_at,updated_at&user_id=eq.user_01ABC`,
      "https://api.workos.com/user_management/authenticate",
      `${URL}/rest/v1/profiles?select=role,cancer_id,country,view,language,theme,consent_at,updated_at&user_id=eq.user_01ABC`,
    ]);
    expect(JSON.parse(calls[1].init.body as string)).toMatchObject({ grant_type: "refresh_token", refresh_token: "refresh-1" });
    expect(calls[2].init.headers.Authorization).toBe("Bearer tok.new");
    // The refreshed session is stored for the rest of the page.
    const stored = JSON.parse((g.window as ReturnType<typeof fakeWindow>).store.get("onco:session:v1") ?? "null") as Session | null;
    expect(stored?.access_token).toBe("tok.new");
  });

  it("gives up as denied after a second 401 or a failed refresh", async () => {
    responses.push(empty(401));
    responses.push(json({ access_token: "tok.new", refresh_token: "refresh-2", user: { id: "user_01ABC", email: "a@example.org" } }));
    responses.push(empty(401));
    expect(await saveCloudProfile(session, { role: "patient" })).toEqual({ ok: false, reason: "denied" });
    expect(calls).toHaveLength(3);

    calls = [];
    responses.push(empty(401));
    responses.push(empty(400));
    expect(await saveCloudProfile(session, { role: "patient" })).toEqual({ ok: false, reason: "denied" });
    expect(calls).toHaveLength(2);
  });

  it("reports a network error or a 5xx as failed, for the caller to retry", async () => {
    responses.push(() => { throw new Error("offline"); });
    expect(await fetchCloudProfile(session)).toEqual({ ok: false, reason: "failed" });
    responses.push(empty(503));
    expect(await fetchCloudProfile(session)).toEqual({ ok: false, reason: "failed" });
  });

  it("replaces saved items by upserting the list and deleting every other row of the user", async () => {
    responses.push(empty(201));
    responses.push(empty(204));
    const r = await replaceSavedItems(session, [{ kind: "drug", id: "venetoclax", addedAt: "2026-09-01T00:00:00.000Z" }, { kind: "cancer", id: "aml", addedAt: "2026-09-02T00:00:00.000Z" }]);
    expect(r).toEqual({ ok: true, value: true });
    expect(calls[0].url).toBe(`${URL}/rest/v1/saved_items`);
    expect(calls[0].init.method).toBe("POST");
    expect(calls[0].init.headers.Prefer).toBe("resolution=merge-duplicates,return=minimal");
    expect(JSON.parse(calls[0].init.body as string)).toEqual([
      { user_id: "user_01ABC", kind: "drug", id: "venetoclax", added_at: "2026-09-01T00:00:00.000Z" },
      { user_id: "user_01ABC", kind: "cancer", id: "aml", added_at: "2026-09-02T00:00:00.000Z" },
    ]);
    expect(calls[1].init.method).toBe("DELETE");
    expect(calls[1].url).toBe(`${URL}/rest/v1/saved_items?user_id=eq.user_01ABC&id=not.in.("venetoclax","aml")`);
    expect(calls[1].init.headers.Authorization).toBe("Bearer tok.old");

    calls = [];
    responses.push(empty(204));
    expect(await replaceSavedItems(session, [])).toEqual({ ok: true, value: true });
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(`${URL}/rest/v1/saved_items?user_id=eq.user_01ABC`);
    expect(calls[0].init.method).toBe("DELETE");
  });

  it("reads saved items and skips rows without a kind or id", async () => {
    responses.push(json([{ kind: "drug", id: "venetoclax", added_at: "2026-09-01T00:00:00.000Z" }, { kind: "cancer" }, { id: "x" }]));
    expect(await fetchSavedItems(session)).toEqual({ ok: true, value: [{ kind: "drug", id: "venetoclax", addedAt: "2026-09-01T00:00:00.000Z" }] });
    expect(calls[0].url).toBe(`${URL}/rest/v1/saved_items?select=kind,id,added_at&user_id=eq.user_01ABC&order=added_at.desc`);
  });

  it("deletes the saved items and then the profile row", async () => {
    responses.push(empty(204));
    responses.push(empty(204));
    expect(await deleteCloudData(session)).toEqual({ ok: true, value: true });
    expect(calls.map((c) => [c.init.method, c.url])).toEqual([
      ["DELETE", `${URL}/rest/v1/saved_items?user_id=eq.user_01ABC`],
      ["DELETE", `${URL}/rest/v1/profiles?user_id=eq.user_01ABC`],
    ]);
  });
});

describe("merge rules", () => {
  it("fills an empty cloud from the local copy and uploads it", () => {
    expect(mergeProfiles({ role: "patient", cancer: "aml" }, null)).toEqual({ merged: { role: "patient", cancer: "aml" }, upload: true });
    expect(mergeProfiles({ role: "patient" }, {})).toEqual({ merged: { role: "patient" }, upload: true });
    expect(mergeProfiles({}, null)).toEqual({ merged: {}, upload: false });
  });

  it("lets the cloud win field by field, keeps local-only fields and uploads only when the cloud lacks something", () => {
    expect(mergeProfiles({ role: "patient", cancer: "aml", theme: "dark" }, { role: "caregiver", cancer: "nsclc" })).toEqual({ merged: { role: "caregiver", cancer: "nsclc", theme: "dark" }, upload: true });
    expect(mergeProfiles({ role: "patient" }, { role: "caregiver", cancer: "nsclc" })).toEqual({ merged: { role: "caregiver", cancer: "nsclc" }, upload: false });
    expect(mergeProfiles({}, { role: "researcher" })).toEqual({ merged: { role: "researcher" }, upload: false });
  });

  it("unions saved items by id", () => {
    const local = [{ kind: "drug", id: "venetoclax" }, { kind: "cancer", id: "aml" }];
    const cloud = [{ kind: "cancer", id: "aml", addedAt: "2026-09-01T00:00:00.000Z" }, { kind: "target", id: "bcl2", addedAt: "2026-09-02T00:00:00.000Z" }];
    expect(mergeSavedItems(local, cloud)).toEqual({ missing: [{ kind: "target", id: "bcl2", addedAt: "2026-09-02T00:00:00.000Z" }], upload: true });
    expect(mergeSavedItems([], cloud)).toEqual({ missing: cloud, upload: false });
    expect(mergeSavedItems(local, [])).toEqual({ missing: [], upload: true });
  });
});
