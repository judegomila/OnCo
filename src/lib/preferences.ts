"use client";

import { LANGS, LAYER_EVENT, LEVELS, readLayer, writeLayer, type Lang, type Level } from "./layer";
import { PREFERENCE_FIELDS, type AccountProfile } from "./profile";
import { isRegion, readRegion, REGION_EVENT, writeRegion } from "./region";
import { isTheme, readTheme, THEME_EVENT, writeTheme, type Theme } from "./theme";

/**
 * A signed-in reader's preferences, mirrored between the header toggles' own stores and the per-user account
 * profile (src/lib/profile.ts). The toggles stay the source of truth for what the page shows:
 *
 *   store              key            written by                       event
 *   country / region   onco:region    writeRegion (src/lib/region.tsx)  onco:region
 *   view and language  onco.layer     writeLayer (src/lib/layer.ts)     onco:layer
 *   theme              onco:theme     writeTheme (src/lib/theme.ts)     onco:theme
 *
 * Two directions, never a loop:
 *   toggles -> profile   PreferenceSync listens to the three events and, while a session exists, writes the changed
 *                        fields into the profile. Writing the profile fires only `onco:account-profile`, which
 *                        nothing here listens to.
 *   profile -> toggles   once per user per page load, when a session is captured or found, `applyPreferences`
 *                        writes the stored values into the toggles' stores. Those writes fire the toggle events;
 *                        the `applying` flag makes the sync ignore them, and the pure `preferencePatch` writes
 *                        nothing when the values already agree, so even a missed flag converges in one step.
 * Everything stays in this browser; the profile is never sent anywhere.
 */
export type Preferences = { region: string; view: Level; language: Lang; theme: Theme };
export const PREFERENCE_EVENTS: readonly string[] = [REGION_EVENT, LAYER_EVENT, THEME_EVENT];

/** What the toggles' stores hold right now. */
export function readPreferences(): Preferences {
  const layer = readLayer();
  return { region: readRegion() ?? "global", view: layer.level, language: layer.lang, theme: readTheme() };
}

/** The preference fields the profile holds, and only those. */
export function preferencesOf(profile: AccountProfile): Partial<Preferences> {
  const out: Partial<Preferences> = {};
  for (const f of PREFERENCE_FIELDS) if (profile[f] !== undefined) (out as Record<string, unknown>)[f] = profile[f];
  return out;
}

/** Pure: the current toggle values the profile does not yet hold; null when the profile already agrees. */
export function preferencePatch(profile: AccountProfile, current: Preferences): Partial<Preferences> | null {
  const patch: Partial<Preferences> = {};
  for (const f of PREFERENCE_FIELDS) if (profile[f] !== current[f]) (patch as Record<string, unknown>)[f] = current[f];
  return Object.keys(patch).length ? patch : null;
}

/** Pure: the stored preferences that differ from the toggles, i.e. what applying the profile will change. */
export function preferencesToApply(profile: AccountProfile, current: Preferences): Partial<Preferences> {
  const out: Partial<Preferences> = {};
  for (const f of PREFERENCE_FIELDS) { const v = profile[f]; if (v !== undefined && v !== current[f]) (out as Record<string, unknown>)[f] = v; }
  return out;
}

let applying = false;
/** True while `applyPreferences` is writing the toggles' stores, so the sync does not echo those writes back. */
export function isApplyingPreferences(): boolean { return applying; }

/** Write stored preferences into the toggles' own stores; each store's writer applies it to <html> and announces it. */
export function applyPreferences(p: Partial<Preferences>): void {
  if (typeof window === "undefined") return;
  applying = true;
  try {
    if (p.region !== undefined) {
      const r = isRegion(p.region) ? p.region : null;
      if (r !== readRegion() && (r !== null || p.region === "global")) writeRegion(r);
    }
    const layer = readLayer();
    const level = p.view !== undefined && LEVELS.some((l) => l.code === p.view) ? p.view : layer.level;
    const lang = p.language !== undefined && LANGS.some((l) => l.code === p.language) ? p.language : layer.lang;
    if (level !== layer.level || lang !== layer.lang) writeLayer({ level, lang });
    if (p.theme !== undefined && isTheme(p.theme) && p.theme !== readTheme()) writeTheme(p.theme);
  } finally { applying = false; }
}
