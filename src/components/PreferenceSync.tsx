"use client";

import { useEffect } from "react";
import { accountEnabled, loadSession, onAccountChange, type Session } from "@/lib/account";
import { pullCloud, startCloudSync } from "@/lib/cloud-sync";
import { getAccountProfile, saveAccountProfile } from "@/lib/profile";
import { applyPreferences, isApplyingPreferences, PREFERENCE_EVENTS, preferencePatch, preferencesOf, preferencesToApply, readPreferences } from "@/lib/preferences";

/**
 * Keeps a signed-in reader's header preferences (country, data view, language, theme) with their account profile.
 * Mounted once in the site header; renders nothing.
 *
 *  - When a session is found on load or captured after sign-in, the cloud copy of the profile is pulled and merged
 *    over the local one first (src/lib/cloud-sync.ts; a no-op without the Supabase variables), then the stored
 *    preferences are written into the toggles' own stores once for that user, so the site reflects them (and the
 *    toggles' events are ignored while that happens).
 *  - Afterwards every toggle change, while a session exists, is written into the profile, only when the value
 *    differs from what the profile holds; every profile or watchlist save is then pushed to the cloud in the
 *    background (`startCloudSync`).
 * Direction and loop rules are set out in src/lib/preferences.ts.
 */
export function PreferenceSync() {
  useEffect(() => {
    if (!accountEnabled) return;
    let userId: string | undefined;
    const applied = new Set<string>();
    let alive = true;
    const arrive = async (s: Session | null) => {
      userId = s?.user.id;
      if (!s || applied.has(s.user.id)) return;
      applied.add(s.user.id);
      await pullCloud(s);
      if (!alive) return;
      const stored = preferencesOf(getAccountProfile(s.user.id));
      const todo = preferencesToApply(stored, readPreferences());
      if (Object.keys(todo).length) applyPreferences(todo);
    };
    const record = () => {
      if (!userId || isApplyingPreferences()) return;
      const patch = preferencePatch(getAccountProfile(userId), readPreferences());
      if (patch) saveAccountProfile(userId, patch);
    };
    const raf = requestAnimationFrame(() => { void arrive(loadSession()); });
    const off = onAccountChange((s) => { void arrive(s); });
    const stop = startCloudSync();
    for (const ev of PREFERENCE_EVENTS) window.addEventListener(ev, record);
    return () => { alive = false; cancelAnimationFrame(raf); off(); stop(); for (const ev of PREFERENCE_EVENTS) window.removeEventListener(ev, record); };
  }, []);
  return null;
}
