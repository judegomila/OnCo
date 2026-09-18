"use client";

import { useEffect } from "react";
import { accountEnabled, loadSession, onAccountChange, type Session } from "@/lib/account";
import { getAccountProfile, saveAccountProfile } from "@/lib/profile";
import { applyPreferences, isApplyingPreferences, PREFERENCE_EVENTS, preferencePatch, preferencesOf, preferencesToApply, readPreferences } from "@/lib/preferences";

/**
 * Keeps a signed-in reader's header preferences (country, data view, language, theme) with their account profile.
 * Mounted once in the site header; renders nothing.
 *
 *  - When a session is found on load or captured after sign-in, the stored preferences are written into the
 *    toggles' own stores once for that user, so the site reflects them (and the toggles' events are ignored while
 *    that happens).
 *  - Afterwards every toggle change, while a session exists, is written into the profile, only when the value
 *    differs from what the profile holds.
 * Direction and loop rules are set out in src/lib/preferences.ts. Everything stays in this browser.
 */
export function PreferenceSync() {
  useEffect(() => {
    if (!accountEnabled) return;
    let userId: string | undefined;
    const applied = new Set<string>();
    const arrive = (s: Session | null) => {
      userId = s?.user.id;
      if (!s || applied.has(s.user.id)) return;
      applied.add(s.user.id);
      const stored = preferencesOf(getAccountProfile(s.user.id));
      const todo = preferencesToApply(stored, readPreferences());
      if (Object.keys(todo).length) applyPreferences(todo);
    };
    const record = () => {
      if (!userId || isApplyingPreferences()) return;
      const patch = preferencePatch(getAccountProfile(userId), readPreferences());
      if (patch) saveAccountProfile(userId, patch);
    };
    const raf = requestAnimationFrame(() => arrive(loadSession()));
    const off = onAccountChange(arrive);
    for (const ev of PREFERENCE_EVENTS) window.addEventListener(ev, record);
    return () => { cancelAnimationFrame(raf); off(); for (const ev of PREFERENCE_EVENTS) window.removeEventListener(ev, record); };
  }, []);
  return null;
}
