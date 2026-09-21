"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * The Google Analytics consent store. onco.cc holds no accounts, so the one thing that left the browser without
 * being asked for was the visit count; this gate makes it asked for. gtag.js is not in the exported HTML at all
 * (src/app/layout.test.ts guards that): it is inserted by `loadGtag` only after the visitor presses Allow, at that
 * moment and again on later visits while the stored choice is "granted". "No thanks" stores "denied", inserts
 * nothing and sets no cookies. A browser sending the Global Privacy Control signal (navigator.globalPrivacyControl)
 * counts as "denied" without the bar being shown; an explicit choice made on the site afterwards takes precedence.
 *
 * Everything takes an optional environment so the logic runs unchanged in Node tests (no jsdom here).
 */
export const GA_ID = "G-2TTJ25WSN8";
export const CONSENT_KEY = "onco:analytics";
/** Fired on window after every write, with the new choice as `detail`. */
export const CONSENT_EVENT = "onco:analytics";
/** Fired on window by the change-choice control; the bar listens and shows itself again. */
export const CONSENT_OPEN_EVENT = "onco:analytics-open";
export const GTAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

export type Consent = "granted" | "denied" | "unset";
export type Choice = Exclude<Consent, "unset">;

export type ConsentStorage = Pick<Storage, "getItem" | "setItem">;
export type ConsentEnv = { storage: ConsentStorage | null; gpc: boolean };

export function isConsent(v: unknown): v is Consent { return v === "granted" || v === "denied" || v === "unset"; }

/** The browser's storage and GPC signal; null storage when localStorage is blocked (private mode, policies). */
export function browserEnv(): ConsentEnv {
  if (typeof window === "undefined") return { storage: null, gpc: false };
  let storage: ConsentStorage | null = null;
  try { storage = window.localStorage; } catch { storage = null; }
  const nav = window.navigator as Navigator & { globalPrivacyControl?: boolean };
  return { storage, gpc: nav.globalPrivacyControl === true };
}

/**
 * What the visitor has chosen. A stored choice wins; with none stored, a GPC signal means "denied" (nothing is
 * written, so the browser setting keeps deciding); otherwise "unset", which is the only state that shows the bar.
 */
export function readConsent(env: ConsentEnv = browserEnv()): Consent {
  let saved: string | null = null;
  try { saved = env.storage?.getItem(CONSENT_KEY) ?? null; } catch { saved = null; }
  if (saved === "granted" || saved === "denied") return saved;
  return env.gpc ? "denied" : "unset";
}

/** Whether the bar should appear on arrival: only when nothing is stored and the browser sent no GPC signal. */
export function shouldShowBar(env: ConsentEnv = browserEnv()): boolean {
  return readConsent(env) === "unset";
}

export type GtagWindow = { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } & Record<string, unknown>;
export type GtagDocument = { createElement(tag: "script"): { async: boolean; src: string }; head: { appendChild(node: unknown): unknown } | null };

/**
 * Insert the standard Google loader and the plain `gtag('config')` call. Idempotent: a second call while the tag
 * is already on the page does nothing and returns false. This is the only place gtag.js is referenced at runtime.
 */
export function loadGtag(win: GtagWindow = window as unknown as GtagWindow, doc: GtagDocument = document as unknown as GtagDocument): boolean {
  if (win.__oncoGtagLoaded === true) return false;
  win.__oncoGtagLoaded = true;
  win[`ga-disable-${GA_ID}`] = false;
  const layer: unknown[] = Array.isArray(win.dataLayer) ? win.dataLayer : [];
  win.dataLayer = layer;
  const gtag = (...args: unknown[]) => { layer.push(args); };
  win.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);
  const s = doc.createElement("script");
  s.async = true;
  s.src = GTAG_SRC;
  doc.head?.appendChild(s);
  return true;
}

/** Expire the _ga cookies on this host and its parent domains; only those the page can see. */
export function clearGaCookies(doc: { cookie: string }, host: string): void {
  const names = doc.cookie.split(";").map((p) => p.trim().split("=")[0]).filter((n) => n === "_ga" || n.startsWith("_ga_"));
  const parts = host.split(".");
  const domains = [""].concat(parts.map((_, i) => parts.slice(i).join(".")).filter((d) => d.includes(".")));
  for (const n of names) for (const d of domains) doc.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
}

/**
 * Persist a choice and act on it: "granted" loads the tag now; "denied" sets Google's documented `ga-disable-<id>`
 * flag so a tag already on the page (the visitor allowed, then changed their mind) sends no more hits, and expires
 * the Google cookies the page can reach. Pure apart from the environment passed in, so the browser wrapper below
 * and the Node test share it.
 */
export function applyConsent(c: Choice, env: ConsentEnv, win: GtagWindow, doc: GtagDocument & { cookie: string }, host: string): void {
  try { env.storage?.setItem(CONSENT_KEY, c); } catch { /* storage blocked */ }
  if (c === "granted") loadGtag(win, doc);
  else { win[`ga-disable-${GA_ID}`] = true; clearGaCookies(doc, host); }
}

/** The browser write: apply, then announce so every subscriber (bar, footer control, privacy page) follows one write. */
export function writeConsent(c: Choice): void {
  if (typeof window === "undefined") return;
  applyConsent(c, browserEnv(), window as unknown as GtagWindow, document as unknown as GtagDocument & { cookie: string }, location.hostname);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
}

/** Ask the bar to show itself again (the footer's and the privacy page's "Change" control). */
export function openConsentBar(): void {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/**
 * The current choice and the GPC flag: "unset" and false on the server and first client render, then read from the
 * browser and kept in step with every write in this tab and in others. `ready` turns true once the browser has been
 * read, so controls can hold their server text until then.
 */
export function useAnalyticsConsent(): { consent: Consent; gpc: boolean; ready: boolean; set: (c: Choice) => void } {
  const [state, setState] = useState<{ consent: Consent; gpc: boolean; ready: boolean }>({ consent: "unset", gpc: false, ready: false });
  useEffect(() => {
    const id = requestAnimationFrame(() => { const env = browserEnv(); setState({ consent: readConsent(env), gpc: env.gpc, ready: true }); });
    const onEvent = (e: Event) => { const d = (e as CustomEvent<Consent>).detail; if (isConsent(d)) setState((s) => ({ ...s, consent: d })); };
    const onStorage = (e: StorageEvent) => { if (e.key === CONSENT_KEY) setState((s) => ({ ...s, consent: readConsent() })); };
    window.addEventListener(CONSENT_EVENT, onEvent);
    window.addEventListener("storage", onStorage);
    return () => { cancelAnimationFrame(id); window.removeEventListener(CONSENT_EVENT, onEvent); window.removeEventListener("storage", onStorage); };
  }, []);
  const set = useCallback((c: Choice) => writeConsent(c), []);
  return { ...state, set };
}
