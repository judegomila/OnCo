"use client";

import { useEffect, useState } from "react";
import { loadSession, type Session } from "@/lib/account";
import { cloudEnabled, deleteCloudData, fetchCloudProfile, fetchSavedItems, mergeProfiles, mergeSavedItems, replaceSavedItems, saveCloudProfile, type CloudResult, type SavedItem } from "@/lib/cloud-profile";
import { clearAccountProfile, clearProfile, getAccountProfile, loadProfile, ROLE_MODE, saveAccountProfile, saveProfile, type AccountProfile } from "@/lib/profile";
import { KIND_META, type Kind } from "@/lib/schema";
import { loadWatchlist, replaceWatchlist, type WatchItem } from "@/lib/watchlist";

/**
 * Keeps the local copies (per-user account profile, browser profile, watchlist) and the cloud rows
 * (src/lib/cloud-profile.ts) in step. The browser is always written first, so the site never waits on the network;
 * the cloud is written afterwards, in the background, with a small retry.
 *
 *   pull   on session capture or load (`pullCloud`, awaited by PreferenceSync before it applies preferences and by
 *          the signup form before it decides between the welcome step and the return page): the cloud profile is
 *          merged over the local one (cloud wins field by field; an empty cloud is filled from the local copy), the
 *          cancer and reading mode are mirrored into the browser profile, and saved items are unioned by id. Cloud
 *          items this browser has never seen are named by fetching OnCo's own /api/v1/entities/<id>.json.
 *   push   every `onco:account-profile` and `onco:watchlist` event while a session exists (`startCloudSync`,
 *          mounted once by PreferenceSync) upserts the changed table, debounced, skipping writes that match what the
 *          cloud already holds. Pulls write the local stores too; those writes are muted so they do not echo back.
 *   status "off" without the two public variables, otherwise "idle" until the first attempt, then "synced" or
 *          "local" (the last attempt failed: the account menu says "Saved on this device only").
 */
export type SyncStatus = "off" | "idle" | "syncing" | "synced" | "local";
const STATUS_EVENT = "onco:cloud-sync";
let status: SyncStatus = "idle";
function setStatus(s: SyncStatus) {
  status = s;
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(STATUS_EVENT, { detail: s }));
}
export function cloudStatus(): SyncStatus { return cloudEnabled() ? status : "off"; }

/** React hook: the sync status, live. "off" when the cloud is not configured. */
export function useCloudSync(): SyncStatus {
  const [s, setS] = useState<SyncStatus>("idle");
  useEffect(() => {
    const id = requestAnimationFrame(() => setS(cloudStatus()));
    const on = () => setS(cloudStatus());
    window.addEventListener(STATUS_EVENT, on);
    return () => { cancelAnimationFrame(id); window.removeEventListener(STATUS_EVENT, on); };
  }, []);
  return s;
}

/** True while a pull or a delete is writing the local stores, so the push listeners ignore those events. */
let muted = false;
/** What the cloud is known to hold per user, serialised, so an unchanged profile or list is not written again. */
const knownProfile = new Map<string, string>();
const knownItems = new Map<string, string>();

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
/** Run `fn`, retrying network failures after 1 s and 4 s; "denied" and "off" are not retried. */
export async function withRetry<T>(fn: () => Promise<CloudResult<T>>, delays: readonly number[] = [1000, 4000]): Promise<CloudResult<T>> {
  let r = await fn();
  for (const d of delays) {
    if (r.ok || r.reason !== "failed") break;
    await sleep(d);
    r = await fn();
  }
  return r;
}

const toSaved = (w: WatchItem): SavedItem => ({ kind: w.kind, id: w.id, addedAt: /^\d{4}-\d{2}-\d{2}$/.test(w.addedOn) ? `${w.addedOn}T00:00:00.000Z` : new Date().toISOString() });
const itemsKey = (items: ReadonlyArray<{ kind: string; id: string }>) => JSON.stringify([...items].map((i) => `${i.kind}/${i.id}`).sort());

/** Name and route for saved items that only exist in the cloud, from OnCo's own entity JSON; unresolvable ids are left for next time. */
async function hydrate(items: SavedItem[]): Promise<WatchItem[]> {
  const today = new Date().toISOString().slice(0, 10);
  const out: WatchItem[] = [];
  await Promise.all(items.slice(0, 200).map(async (i) => {
    try {
      const r = await fetch(`/api/v1/entities/${encodeURIComponent(i.id)}.json`);
      if (!r.ok) return;
      const j = await r.json() as { entity?: { id?: string; kind?: string; name?: string; asOf?: string } };
      const e = j.entity;
      if (!e?.name || !e.kind || !(e.kind in KIND_META)) return;
      out.push({ id: i.id, kind: e.kind, name: e.name, route: `/${KIND_META[e.kind as Kind].route}/${i.id}/`, addedOn: i.addedAt.slice(0, 10), seen: { asOf: e.asOf, on: today } });
    } catch { /* offline or missing: try again on the next pull */ }
  }));
  return out;
}

/** The cancer and reading mode a merged account profile implies for the browser profile For me and the hubs read. */
function mirrorIntoBrowserProfile(merged: AccountProfile, cloud: AccountProfile | null) {
  const p = loadProfile();
  const patch: Partial<typeof p> = {};
  if (cloud?.cancer && p.cancerId !== cloud.cancer) patch.cancerId = cloud.cancer;
  if (merged.role && p.mode !== ROLE_MODE[merged.role]) patch.mode = ROLE_MODE[merged.role];
  if (Object.keys(patch).length) saveProfile({ ...p, ...patch });
}

/**
 * Pull the account's cloud rows and merge them over this browser's copies; upload what the cloud lacks. Resolves
 * once the local stores are settled (true when the cloud answered), so callers can read the merged profile next.
 */
export async function pullCloud(s: Session): Promise<boolean> {
  if (!cloudEnabled()) return false;
  setStatus("syncing");
  const uid = s.user.id;
  const got = await fetchCloudProfile(s);
  if (!got.ok) { setStatus(got.reason === "off" ? "off" : "local"); return false; }
  const local = getAccountProfile(uid);
  const { merged, upload } = mergeProfiles(local, got.value);
  muted = true;
  try {
    if (JSON.stringify(merged) !== JSON.stringify(local)) saveAccountProfile(uid, merged);
    mirrorIntoBrowserProfile(merged, got.value);
  } finally { muted = false; }
  let ok = true;
  if (upload) {
    const r = await withRetry(() => saveCloudProfile(s, merged));
    ok = r.ok;
  }
  knownProfile.set(uid, JSON.stringify(merged));

  const items = await fetchSavedItems(s);
  if (items.ok) {
    const list = loadWatchlist();
    const { missing, upload: uploadItems } = mergeSavedItems(list, items.value);
    if (missing.length) {
      const named = await hydrate(missing);
      if (named.length) { muted = true; try { replaceWatchlist([...loadWatchlist(), ...named]); } finally { muted = false; } }
    }
    const union = [...loadWatchlist().map(toSaved), ...items.value.filter((c) => !loadWatchlist().some((w) => w.id === c.id))];
    if (uploadItems) {
      const r = await withRetry(() => replaceSavedItems(s, union));
      ok = ok && r.ok;
    }
    knownItems.set(uid, itemsKey(union));
  } else ok = false;
  setStatus(ok ? "synced" : "local");
  return ok;
}

async function pushProfile(s: Session): Promise<void> {
  const uid = s.user.id;
  const profile = getAccountProfile(uid);
  const key = JSON.stringify(profile);
  if (knownProfile.get(uid) === key) return;
  setStatus("syncing");
  const r = await withRetry(() => saveCloudProfile(s, profile));
  if (r.ok) knownProfile.set(uid, key);
  setStatus(r.ok ? "synced" : r.reason === "off" ? "off" : "local");
}

async function pushItems(s: Session): Promise<void> {
  const uid = s.user.id;
  const items = loadWatchlist().map(toSaved);
  const key = itemsKey(items);
  if (knownItems.get(uid) === key) return;
  setStatus("syncing");
  const r = await withRetry(() => replaceSavedItems(s, items));
  if (r.ok) knownItems.set(uid, key);
  setStatus(r.ok ? "synced" : r.reason === "off" ? "off" : "local");
}

/**
 * Listen for local saves and push them to the cloud in the background, debounced. Returns the unsubscribe.
 * Mounted once (PreferenceSync); a no-op without the two public variables.
 */
export function startCloudSync(): () => void {
  if (typeof window === "undefined" || !cloudEnabled()) return () => {};
  let profileTimer: ReturnType<typeof setTimeout> | undefined;
  let itemsTimer: ReturnType<typeof setTimeout> | undefined;
  const onProfile = (e: Event) => {
    if (muted) return;
    const s = loadSession();
    const uid = (e as CustomEvent<{ userId?: string }>).detail?.userId;
    if (!s || (uid && uid !== s.user.id)) return;
    clearTimeout(profileTimer);
    profileTimer = setTimeout(() => { void pushProfile(s); }, 600);
  };
  const onItems = () => {
    if (muted) return;
    const s = loadSession();
    if (!s) return;
    clearTimeout(itemsTimer);
    itemsTimer = setTimeout(() => { void pushItems(s); }, 800);
  };
  window.addEventListener("onco:account-profile", onProfile);
  window.addEventListener("onco:watchlist", onItems);
  return () => { window.removeEventListener("onco:account-profile", onProfile); window.removeEventListener("onco:watchlist", onItems); clearTimeout(profileTimer); clearTimeout(itemsTimer); };
}

/**
 * "Delete my account data": remove the cloud rows first, then the browser copies (account profile, browser profile,
 * watchlist). Returns false when the cloud refused or could not be reached; the local copies are then left in place
 * so the reader can try again (nothing is deleted from one side only).
 */
export async function deleteAccountData(s: Session): Promise<boolean> {
  const uid = s.user.id;
  if (cloudEnabled()) {
    setStatus("syncing");
    const r = await withRetry(() => deleteCloudData(s));
    if (!r.ok && r.reason !== "off") { setStatus("local"); return false; }
  }
  muted = true;
  try {
    clearAccountProfile(uid);
    clearProfile();
    replaceWatchlist([]);
  } finally { muted = false; }
  knownProfile.set(uid, JSON.stringify({}));
  knownItems.set(uid, itemsKey([]));
  if (cloudEnabled()) setStatus("synced");
  return true;
}
