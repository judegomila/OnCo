"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { MyCancerLite } from "./use-my-cancer";

/**
 * The (id, name, route, group) list of every cancer, fetched on demand from the static API instead of being
 * serialised into every page. Before this hook the root layout passed the 328-row list as a prop to two header
 * components, which put two 39 KB copies into the RSC payload of all 27,000 pages. Now the list is one file,
 * /api/v1/my-cancers.json (written by scripts/build-api.ts), fetched the first time a component needs it: a
 * signed-in reader with a cancer set, or a chooser being opened. It is cached in module scope for the page and in
 * sessionStorage for the tab; callers get [] until it has loaded, which is also what the server rendered.
 */
export type MyCancerListItem = MyCancerLite & { group?: string };

export const MY_CANCERS_URL = "/api/v1/my-cancers.json";
const KEY = "onco:my-cancers:v1";
const EMPTY: MyCancerListItem[] = [];

let cache: MyCancerListItem[] | null = null;
let pending: Promise<MyCancerListItem[]> | null = null;
const listeners = new Set<() => void>();

function fromSession(): MyCancerListItem[] | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) && parsed.length > 0 ? (parsed as MyCancerListItem[]) : null;
  } catch { return null; }
}

function settle(list: MyCancerListItem[]) {
  cache = list;
  for (const fn of listeners) fn();
}

/** Load the list once per page (sessionStorage, then the network); concurrent callers share one request. */
export function loadMyCancerList(): Promise<MyCancerListItem[]> {
  if (cache) return Promise.resolve(cache);
  if (pending) return pending;
  const stored = typeof window !== "undefined" ? fromSession() : null;
  if (stored) { settle(stored); return Promise.resolve(stored); }
  pending = fetch(MY_CANCERS_URL)
    .then(async (r) => (r.ok ? ((await r.json()) as MyCancerListItem[]) : EMPTY))
    .catch(() => EMPTY)
    .then((list) => {
      pending = null;
      if (list.length) {
        try { window.sessionStorage.setItem(KEY, JSON.stringify(list)); } catch { /* storage full or disabled */ }
        settle(list);
      }
      return list;
    });
  return pending;
}

/** Test seam: forget the module cache (sessionStorage is left alone). */
export function resetMyCancerListCache() { cache = null; pending = null; }

const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
const getSnapshot = () => cache ?? EMPTY;
const getServerSnapshot = () => EMPTY;

/**
 * The cancer list, [] until loaded. `enabled` gates the fetch: pass false while nothing on screen needs the list
 * (no cancer remembered, chooser closed) and no request is made. The server snapshot is always [], so hydration
 * matches the exported HTML; the list arrives through the store once fetched.
 */
export function useMyCancerList(enabled = true): MyCancerListItem[] {
  const list = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => { if (enabled) void loadMyCancerList(); }, [enabled]);
  return list;
}
