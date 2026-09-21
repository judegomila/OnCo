import { refreshSession, type Session } from "@/lib/account";
import { sanitiseAccountProfile, type AccountProfile } from "@/lib/profile";

/**
 * Cloud copy of the signed-in profile and watched pages: two Supabase tables (supabase/migrations/0001_profiles.sql)
 * read and written straight from the browser with `fetch` against the REST endpoint. No client library.
 *
 * Every request carries the project's anon key as `apikey` and the WorkOS access token as the Bearer token; Supabase
 * is configured to trust WorkOS as a third-party JWT provider (supabase/README.md) and the row policies compare
 * `user_id` with the token's `sub`. When Supabase answers 401 the token is refreshed once through the account
 * module and the request retried. With either public variable missing every function here is a no-op that reports
 * `reason: "off"`, and the site behaves as before: everything stays in this browser.
 *
 * Column names follow the table, field names follow src/lib/profile.ts: cancer_id <-> cancer, country <-> region.
 * The orchestration (merge with the local copy, retries, status for the account menu) is in src/lib/cloud-sync.ts;
 * this file is the transport plus the two merge rules, so it can be tested with a mocked fetch.
 */
export type SavedItem = { kind: string; id: string; addedAt: string };
export type CloudFailure = "off" | "denied" | "failed";
export type CloudResult<T> = { ok: true; value: T } | { ok: false; reason: CloudFailure };

/** The two public variables, read when called (Next inlines them at build) so a test can set and unset them. */
export function cloudConfig(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  return url && key ? { url: url.replace(/\/+$/, ""), key } : null;
}
export const cloudEnabled = (): boolean => cloudConfig() !== null;

export type ProfileRow = {
  user_id: string;
  role: string | null;
  cancer_id: string | null;
  country: string | null;
  view: string | null;
  language: string | null;
  theme: string | null;
  consent_at: string | null;
  updated_at?: string;
};
export const PROFILE_COLUMNS = "role,cancer_id,country,view,language,theme,consent_at,updated_at";

/** A table row as a profile; unknown values are dropped the same way a damaged local entry is. */
export function rowToProfile(row: Partial<ProfileRow> | null | undefined): AccountProfile {
  if (!row) return {};
  return sanitiseAccountProfile({ role: row.role ?? undefined, cancer: row.cancer_id ?? undefined, region: row.country ?? undefined, view: row.view ?? undefined, language: row.language ?? undefined, theme: row.theme ?? undefined, consentAt: row.consent_at ?? undefined });
}

/** A profile as a full table row: absent fields become null so an upsert clears them in the cloud too. */
export function profileToRow(userId: string, p: AccountProfile, now: string = new Date().toISOString()): ProfileRow {
  return { user_id: userId, role: p.role ?? null, cancer_id: p.cancer ?? null, country: p.region ?? null, view: p.view ?? null, language: p.language ?? null, theme: p.theme ?? null, consent_at: p.consentAt ?? null, updated_at: now };
}

export const isEmptyProfile = (p: AccountProfile | null | undefined): boolean => !p || Object.keys(p).length === 0;

/**
 * The merge rule for a profile: the cloud wins for every field it holds, fields only the local copy holds are kept,
 * and `upload` says whether the cloud is missing something (empty cloud, or local-only fields) and should be written.
 */
export function mergeProfiles(local: AccountProfile, cloud: AccountProfile | null): { merged: AccountProfile; upload: boolean } {
  if (!cloud || isEmptyProfile(cloud)) return { merged: local, upload: !isEmptyProfile(local) };
  const merged: AccountProfile = { ...local, ...cloud };
  const upload = (Object.keys(merged) as Array<keyof AccountProfile>).some((k) => cloud[k] === undefined);
  return { merged, upload };
}

/**
 * The merge rule for saved items: a union by id. `missing` are the cloud items this browser lacks (to be added
 * locally), `upload` says the browser holds items the cloud lacks.
 */
export function mergeSavedItems(local: ReadonlyArray<{ kind: string; id: string }>, cloud: ReadonlyArray<SavedItem>): { missing: SavedItem[]; upload: boolean } {
  const localIds = new Set(local.map((w) => w.id));
  const cloudIds = new Set(cloud.map((c) => c.id));
  return { missing: cloud.filter((c) => !localIds.has(c.id)), upload: local.some((w) => !cloudIds.has(w.id)) };
}

/* ---------- transport ---------- */

type Req = { method?: "GET" | "POST" | "DELETE"; path: string; body?: unknown; prefer?: string };

/** One REST call with the two auth headers; a 401 refreshes the WorkOS token once and retries with the new one. */
async function call(session: Session, req: Req, retried = false): Promise<CloudResult<Response>> {
  const c = cloudConfig();
  if (!c) return { ok: false, reason: "off" };
  const headers: Record<string, string> = { apikey: c.key, Authorization: `Bearer ${session.access_token}`, Accept: "application/json" };
  if (req.body !== undefined) headers["Content-Type"] = "application/json";
  if (req.prefer) headers.Prefer = req.prefer;
  const r = await fetch(`${c.url}/rest/v1/${req.path}`, { method: req.method ?? "GET", headers, body: req.body === undefined ? undefined : JSON.stringify(req.body) }).catch(() => null);
  if (!r) return { ok: false, reason: "failed" };
  if (r.status === 401 && !retried) {
    const next = await refreshSession(session);
    if (next) return call(next, req, true);
    return { ok: false, reason: "denied" };
  }
  if (r.status === 401 || r.status === 403) return { ok: false, reason: "denied" };
  if (!r.ok) return { ok: false, reason: "failed" };
  return { ok: true, value: r };
}

const own = (session: Session) => `user_id=eq.${encodeURIComponent(session.user.id)}`;
const UPSERT = "resolution=merge-duplicates,return=minimal";

/** The account's profile row as a profile; `null` when the account has no row yet. */
export async function fetchCloudProfile(session: Session): Promise<CloudResult<AccountProfile | null>> {
  const r = await call(session, { path: `profiles?select=${PROFILE_COLUMNS}&${own(session)}` });
  if (!r.ok) return r;
  try {
    const rows = await r.value.json() as Partial<ProfileRow>[];
    return { ok: true, value: Array.isArray(rows) && rows[0] ? rowToProfile(rows[0]) : null };
  } catch { return { ok: false, reason: "failed" }; }
}

/** Upsert the whole profile row for the signed-in user. */
export async function saveCloudProfile(session: Session, profile: AccountProfile): Promise<CloudResult<true>> {
  const r = await call(session, { method: "POST", path: "profiles", prefer: UPSERT, body: [profileToRow(session.user.id, profile)] });
  return r.ok ? { ok: true, value: true } : r;
}

/** The account's saved items (kind, id, added time). */
export async function fetchSavedItems(session: Session): Promise<CloudResult<SavedItem[]>> {
  const r = await call(session, { path: `saved_items?select=kind,id,added_at&${own(session)}&order=added_at.desc` });
  if (!r.ok) return r;
  try {
    const rows = await r.value.json() as Array<{ kind?: string; id?: string; added_at?: string }>;
    if (!Array.isArray(rows)) return { ok: false, reason: "failed" };
    const value: SavedItem[] = [];
    for (const x of rows) if (typeof x.id === "string" && typeof x.kind === "string") value.push({ kind: x.kind, id: x.id, addedAt: x.added_at ?? new Date().toISOString() });
    return { ok: true, value };
  } catch { return { ok: false, reason: "failed" }; }
}

/** Make the account's saved items equal to `items`: upsert them, then delete every other row of this user. */
export async function replaceSavedItems(session: Session, items: ReadonlyArray<SavedItem>): Promise<CloudResult<true>> {
  if (items.length) {
    const body = items.map((i) => ({ user_id: session.user.id, kind: i.kind, id: i.id, added_at: i.addedAt }));
    const up = await call(session, { method: "POST", path: "saved_items", prefer: UPSERT, body });
    if (!up.ok) return up;
  }
  const keep = items.length ? `&id=not.in.(${items.map((i) => `"${i.id.replace(/"/g, "")}"`).join(",")})` : "";
  const del = await call(session, { method: "DELETE", path: `saved_items?${own(session)}${keep}`, prefer: "return=minimal" });
  return del.ok ? { ok: true, value: true } : del;
}

/** Delete every cloud row of the signed-in user: the profile and all saved items. */
export async function deleteCloudData(session: Session): Promise<CloudResult<true>> {
  const a = await call(session, { method: "DELETE", path: `saved_items?${own(session)}`, prefer: "return=minimal" });
  if (!a.ok) return a;
  const b = await call(session, { method: "DELETE", path: `profiles?${own(session)}`, prefer: "return=minimal" });
  return b.ok ? { ok: true, value: true } : b;
}
