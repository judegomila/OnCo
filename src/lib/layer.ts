"use client";

import { useSyncExternalStore } from "react";

/**
 * Reading layer: which text a reader sees.
 *  level    technical (full summary) | plain (TL;DR only) | simple (12-year-old TL;DR)
 *  lang     site language: menus, headings, table chrome and translated TL;DRs (src/lib/i18n)
 * Persisted in localStorage; broadcast via a window event so every widget updates. The language is also
 * written to <html lang> and <html dir> (Arabic is right-to-left) so browsers can offer page translation
 * and the layout flips.
 */
export type Level = "technical" | "plain" | "simple";
export type Lang = "en" | "es" | "zh" | "pt" | "hi" | "fr" | "de" | "ja" | "ar";
export type Layer = { level: Level; lang: Lang };

export const LANGS: Array<{ code: Lang; label: string; native: string }> = [
  { code: "en", label: "English", native: "English" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "ar", label: "Arabic", native: "العربية" },
];
/** English labels and blurbs; the translated forms live in src/lib/i18n/ui.ts under level.<code>. */
export const LEVELS: Array<{ code: Level; label: string; blurb: string }> = [
  { code: "technical", label: "Technical", blurb: "Full summaries for clinicians and scientists" },
  { code: "plain", label: "Plain", blurb: "Plain-language TL;DRs only" },
  { code: "simple", label: "Simple", blurb: "Even simpler, about a 12-year-old reading age" },
];

export const LAYER_KEY = "onco.layer";
export const LAYER_EVENT = "onco:layer";
const EVENT = LAYER_EVENT;
const DEFAULT: Layer = { level: "technical", lang: "en" };

export function readLayer(): Layer {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(LAYER_KEY);
    if (!raw) return DEFAULT;
    const p = JSON.parse(raw) as Partial<Layer>;
    return { level: LEVELS.some((l) => l.code === p.level) ? (p.level as Level) : "technical", lang: LANGS.some((l) => l.code === p.lang) ? (p.lang as Lang) : "en" };
  } catch { return DEFAULT; }
}

/**
 * Reflect the layer on <html>: data attributes for CSS, `lang` for browser translation, `dir` for RTL. Only what
 * differs is written: each write to <html> invalidates the style of the whole document, and LayerScript has already
 * set all four before first paint, so on an ordinary load this writes nothing.
 */
export function applyLayer(l: Layer) {
  const root = document.documentElement;
  const dir = l.lang === "ar" ? "rtl" : "ltr";
  if (root.dataset.level !== l.level) root.dataset.level = l.level;
  if (root.dataset.lang !== l.lang) root.dataset.lang = l.lang;
  if (root.lang !== l.lang) root.lang = l.lang;
  if (root.dir !== dir) root.dir = dir;
}

export function writeLayer(next: Layer) {
  window.localStorage.setItem(LAYER_KEY, JSON.stringify(next));
  applyLayer(next);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
}

/*
 * One shared store for every reader of the layer. A page has a hundred or more (each KindName, TL, TldrText and
 * StatusName), and each used to schedule its own animation frame after mount that re-rendered it and rewrote the four
 * attributes on <html>. On the home page that was about 130 frames, each forcing a style recalculation of the whole
 * document: two seconds of blocked main thread on a mid-range phone (Lighthouse trace, 26 October 2026). Now the saved
 * layer is read once, hydration uses the server snapshot (the default), and React re-renders the readers together,
 * once, only when the reader's saved layer differs from the default.
 */
let current: Layer | null = null;
const listeners = new Set<() => void>();
function snapshot(): Layer { return (current ??= readLayer()); }
function refresh() {
  const next = readLayer();
  if (current && current.level === next.level && current.lang === next.lang) return;
  current = next;
  for (const cb of listeners) cb();
}
function subscribe(cb: () => void): () => void {
  if (listeners.size === 0) {
    window.addEventListener(EVENT, refresh);
    window.addEventListener("storage", refresh);
    applyLayer(snapshot());
  }
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) { window.removeEventListener(EVENT, refresh); window.removeEventListener("storage", refresh); }
  };
}
const serverSnapshot = () => DEFAULT;

/** Subscribe to the current layer. The default on the server and during hydration, then the reader's saved layer. */
export function useLayer(): [Layer, (next: Partial<Layer>) => void] {
  const layer = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const update = (next: Partial<Layer>) => writeLayer({ ...readLayer(), ...next });
  return [layer, update];
}
