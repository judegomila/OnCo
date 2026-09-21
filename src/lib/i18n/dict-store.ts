import { useEffect, useSyncExternalStore } from "react";
import type { Lang } from "@/lib/layer";
import type { UiDict } from "./ui";
import type { NavDict } from "./nav";

/**
 * Per-language loading of the chrome dictionaries. English is compiled into the chrome; the other eight languages
 * (src/lib/i18n/ui/<lang>.ts and src/lib/i18n/nav/<lang>.ts, about 40 KB of source each) used to be imported
 * statically by ui.ts and nav.ts, which put all of them into the JavaScript of every page for every reader.
 * Now a language's two files are one dynamic import, fetched the first time a reader's saved language needs them.
 *
 * `t`, `navGroupText` and the other lookups stay synchronous: they read these caches and fall back to English until
 * the language has arrived, and `useLangDicts` re-renders every subscriber when it does. The first client render is
 * English either way (useLayer starts at the default), so hydration is unchanged.
 */
export type Other = Exclude<Lang, "en">;

export const UI_CACHE: Partial<Record<Other, UiDict>> = {};
export const NAV_CACHE: Partial<Record<Other, NavDict>> = {};

let version = 0;
const listeners = new Set<() => void>();
const pending = new Map<Other, Promise<void>>();

function bump() { version++; for (const l of listeners) l(); }
function subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; }
const getVersion = () => version;

/** True when `lang` can be rendered from the caches (always for English). */
export function hasLang(lang: Lang): boolean { return lang === "en" || (!!UI_CACHE[lang] && !!NAV_CACHE[lang]); }

// One explicit import pair per language: bundlers split each into its own chunk; template paths are not supported.
async function load(lang: Other): Promise<[UiDict, NavDict]> {
  switch (lang) {
    case "es": { const [u, n] = await Promise.all([import("./ui/es"), import("./nav/es")]); return [u.es, n.navEs]; }
    case "zh": { const [u, n] = await Promise.all([import("./ui/zh"), import("./nav/zh")]); return [u.zh, n.navZh]; }
    case "pt": { const [u, n] = await Promise.all([import("./ui/pt"), import("./nav/pt")]); return [u.pt, n.navPt]; }
    case "hi": { const [u, n] = await Promise.all([import("./ui/hi"), import("./nav/hi")]); return [u.hi, n.navHi]; }
    case "fr": { const [u, n] = await Promise.all([import("./ui/fr"), import("./nav/fr")]); return [u.fr, n.navFr]; }
    case "de": { const [u, n] = await Promise.all([import("./ui/de"), import("./nav/de")]); return [u.de, n.navDe]; }
    case "ja": { const [u, n] = await Promise.all([import("./ui/ja"), import("./nav/ja")]); return [u.ja, n.navJa]; }
    case "ar": { const [u, n] = await Promise.all([import("./ui/ar"), import("./nav/ar")]); return [u.ar, n.navAr]; }
  }
}

/** Fetch a language's dictionaries once; resolves when they are in the caches (immediately for English or a loaded language). */
export function ensureLang(lang: Lang): Promise<void> {
  if (lang === "en" || hasLang(lang)) return Promise.resolve();
  let p = pending.get(lang);
  if (!p) {
    p = load(lang)
      .then(([ui, nav]) => { UI_CACHE[lang] = ui; NAV_CACHE[lang] = nav; pending.delete(lang); bump(); })
      .catch(() => { pending.delete(lang); /* offline or blocked: English stays; the next render asks again */ });
    pending.set(lang, p);
  }
  return p;
}

/** Put dictionaries loaded some other way into the caches (src/lib/i18n/all.ts does this for tests and scripts). */
export function registerLang(lang: Other, ui: UiDict, nav: NavDict) { UI_CACHE[lang] = ui; NAV_CACHE[lang] = nav; bump(); }

/**
 * Client hook: starts the load for `lang` and re-renders the caller when any language arrives. Returns whether `lang`
 * is ready; callers keep rendering (English falls out of the synchronous lookups meanwhile).
 */
export function useLangDicts(lang: Lang): boolean {
  useSyncExternalStore(subscribe, getVersion, getVersion);
  useEffect(() => { if (lang !== "en") void ensureLang(lang); }, [lang]);
  return hasLang(lang);
}
