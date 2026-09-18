"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * A browser-only profile that personalises OnCo. Stored in localStorage under one key.
 * Nothing here is ever sent anywhere; there is no server.
 */
export type ProfileMode = "patient" | "caregiver" | "clinician";
export type Stage = "early" | "locally-advanced" | "metastatic-first-line" | "metastatic-later" | "unknown";

export type Profile = {
  cancerId?: string;
  stage: Stage;
  /** Biomarker ids from src/data/biomarkers.ts, or per-cancer keys chosen in For me (slug of the cancer record's biomarker wording, or "not-tested"). */
  biomarkers: string[];
  /** Product or technology ids already received. */
  priorLines: string[];
  country?: string;
  postcode?: string;
  mode: ProfileMode;
  /** For me situation (roadmap item 101): the decision-section id of the standard-of-care row the reader is in. */
  setting?: string;
  /** Drug ids from the standard of care the reader has already had. */
  hadTreatments: string[];
  /** Whether the For me page should look for trials. */
  wantsTrials: boolean;
  /** Whether the diagnosis is recent (adds the first-60-days guide). */
  diagnosedRecently: boolean;
};

export const STAGES: Array<{ id: Stage; label: string; hint: string }> = [
  { id: "early", label: "Early / localised", hint: "Stage I-II, operable, before or after surgery" },
  { id: "locally-advanced", label: "Locally advanced", hint: "Stage III, not yet spread to distant organs" },
  { id: "metastatic-first-line", label: "Metastatic, first treatment", hint: "Stage IV, no systemic therapy for metastatic disease yet" },
  { id: "metastatic-later", label: "Metastatic, later lines", hint: "Stage IV, after at least one treatment for metastatic disease" },
  { id: "unknown", label: "Not sure", hint: "Show everything" },
];

export const MODES: Array<{ id: ProfileMode; label: string; hint: string }> = [
  { id: "patient", label: "Patient", hint: "Plain language first" },
  { id: "caregiver", label: "Caregiver", hint: "Logistics, side effects, when to call" },
  { id: "clinician", label: "Clinician", hint: "Technical detail first" },
];

const KEY = "onco:profile:v1";
const EMPTY: Profile = { stage: "unknown", biomarkers: [], priorLines: [], mode: "patient", hadTreatments: [], wantsTrials: true, diagnosedRecently: false };

export function loadProfile(): Profile {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const p = JSON.parse(raw) as Partial<Profile>;
    return { ...EMPTY, ...p, biomarkers: p.biomarkers ?? [], priorLines: p.priorLines ?? [], hadTreatments: p.hadTreatments ?? [], wantsTrials: p.wantsTrials ?? true, diagnosedRecently: p.diagnosedRecently ?? false };
  } catch {
    return EMPTY;
  }
}

export function saveProfile(p: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new CustomEvent("onco:profile", { detail: p }));
}

export function clearProfile() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("onco:profile", { detail: EMPTY }));
}

/** React hook: the profile, a setter that persists, and whether it has been read from storage yet. */
export function useProfile(): [Profile, (patch: Partial<Profile>) => void, boolean, () => void] {
  const [profile, setProfile] = useState<Profile>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Defer the initial read so the server-rendered HTML matches the first client render.
    const id = requestAnimationFrame(() => { setProfile(loadProfile()); setReady(true); });
    const onChange = (e: Event) => setProfile((e as CustomEvent<Profile>).detail);
    const onStorage = (e: StorageEvent) => { if (e.key === KEY) setProfile(loadProfile()); };
    window.addEventListener("onco:profile", onChange);
    window.addEventListener("storage", onStorage);
    return () => { cancelAnimationFrame(id); window.removeEventListener("onco:profile", onChange); window.removeEventListener("storage", onStorage); };
  }, []);

  const update = useCallback((patch: Partial<Profile>) => {
    const next = { ...loadProfile(), ...patch };
    saveProfile(next);
  }, []);

  const reset = useCallback(() => clearProfile(), []);

  return [profile, update, ready, reset];
}

export function isProfileEmpty(p: Profile): boolean {
  return !p.cancerId && p.stage === "unknown" && p.biomarkers.length === 0 && p.priorLines.length === 0 && !p.country && !p.postcode && !p.setting && p.hadTreatments.length === 0 && p.wantsTrials && !p.diagnosedRecently;
}

/* ---------- Account profile: who the signed-in reader is, kept per WorkOS user id ---------- */

/** Who is reading: chosen once after the first sign-in (WelcomeStep) and changeable from the account menu. */
export type AccountRole = "patient" | "caregiver" | "researcher" | "provider";
export const ACCOUNT_ROLES: readonly AccountRole[] = ["patient", "caregiver", "researcher", "provider"];
/** The browser-profile reading mode each role implies, so For me follows the choice. */
export const ROLE_MODE: Record<AccountRole, ProfileMode> = { patient: "patient", caregiver: "caregiver", researcher: "clinician", provider: "clinician" };

/**
 * Stored in localStorage under `onco:account-profile:v1:<user id>`, one entry per signed-in user so two people
 * sharing a browser do not overwrite each other. `cancer` mirrors the cancer id also written to the browser profile
 * above (the preference For me and the hubs read). Nothing here is sent to any server; WorkOS only ever sees the
 * email address and name.
 */
export type AccountProfile = { role?: AccountRole; cancer?: string; consentAt?: string };

const ACCOUNT_EVENT = "onco:account-profile";
const accountKey = (userId: string) => `onco:account-profile:v1:${userId}`;

export function getAccountProfile(userId: string | undefined): AccountProfile {
  if (typeof window === "undefined" || !userId) return {};
  try {
    const raw = window.localStorage.getItem(accountKey(userId));
    if (!raw) return {};
    const p = JSON.parse(raw) as AccountProfile;
    const out: AccountProfile = {};
    if (p.role && (ACCOUNT_ROLES as readonly string[]).includes(p.role)) out.role = p.role;
    if (typeof p.cancer === "string" && p.cancer) out.cancer = p.cancer;
    if (typeof p.consentAt === "string") out.consentAt = p.consentAt;
    return out;
  } catch { return {}; }
}

/** Merge `patch` into the user's stored profile; fields set to `undefined` are dropped. Returns what was saved. */
export function saveAccountProfile(userId: string, patch: Partial<AccountProfile>): AccountProfile {
  const next: AccountProfile = { ...getAccountProfile(userId), ...patch };
  for (const k of Object.keys(next) as Array<keyof AccountProfile>) if (next[k] === undefined) delete next[k];
  if (typeof window === "undefined") return next;
  try { window.localStorage.setItem(accountKey(userId), JSON.stringify(next)); } catch { /* storage blocked */ }
  window.dispatchEvent(new CustomEvent(ACCOUNT_EVENT, { detail: { userId, profile: next } }));
  return next;
}

export function clearAccountProfile(userId: string): void {
  if (typeof window === "undefined") return;
  try { window.localStorage.removeItem(accountKey(userId)); } catch { /* storage blocked */ }
  window.dispatchEvent(new CustomEvent(ACCOUNT_EVENT, { detail: { userId, profile: {} } }));
}

/** React hook: the signed-in user's account profile and whether storage has been read. Empty while signed out. */
export function useAccountProfile(userId: string | undefined): [AccountProfile, boolean] {
  const [profile, setProfile] = useState<AccountProfile>({});
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Deferred like useProfile so the first client render matches the server HTML; signed out reads as empty.
    const id = requestAnimationFrame(() => { setProfile(getAccountProfile(userId)); setReady(!!userId); });
    if (!userId) return () => cancelAnimationFrame(id);
    const onChange = (e: Event) => { const d = (e as CustomEvent<{ userId: string; profile: AccountProfile }>).detail; if (d.userId === userId) setProfile(d.profile); };
    const onStorage = (e: StorageEvent) => { if (e.key === accountKey(userId)) setProfile(getAccountProfile(userId)); };
    window.addEventListener(ACCOUNT_EVENT, onChange);
    window.addEventListener("storage", onStorage);
    return () => { cancelAnimationFrame(id); window.removeEventListener(ACCOUNT_EVENT, onChange); window.removeEventListener("storage", onStorage); };
  }, [userId]);
  return [profile, ready];
}
