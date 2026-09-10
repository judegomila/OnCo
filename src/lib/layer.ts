"use client";

import { useEffect, useState } from "react";

/**
 * Reading layer: which text a reader sees.
 *  level    technical (full summary) | plain (TL;DR only) | simple (12-year-old TL;DR)
 *  lang     en | es | zh | pt | hi   (applies to the TL;DR layer)
 * Persisted in localStorage; broadcast via a window event so every widget updates.
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
export const LEVELS: Array<{ code: Level; label: string; blurb: string }> = [
  { code: "technical", label: "Technical", blurb: "Full summaries for clinicians and scientists" },
  { code: "plain", label: "Plain", blurb: "Plain-English TL;DRs only" },
  { code: "simple", label: "Simple", blurb: "Even simpler, about a 12-year-old reading age" },
];

const KEY = "onco.layer";
const EVENT = "onco:layer";
const DEFAULT: Layer = { level: "technical", lang: "en" };

export function readLayer(): Layer {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    const p = JSON.parse(raw) as Partial<Layer>;
    return { level: LEVELS.some((l) => l.code === p.level) ? (p.level as Level) : "technical", lang: LANGS.some((l) => l.code === p.lang) ? (p.lang as Lang) : "en" };
  } catch { return DEFAULT; }
}

export function writeLayer(next: Layer) {
  window.localStorage.setItem(KEY, JSON.stringify(next));
  document.documentElement.dataset.level = next.level;
  document.documentElement.dataset.lang = next.lang;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
}

/** Subscribe to the current layer. Starts at the default on the server and first client render, then syncs. */
export function useLayer(): [Layer, (next: Partial<Layer>) => void] {
  const [layer, setLayer] = useState<Layer>(DEFAULT);
  useEffect(() => {
    const sync = () => setLayer(readLayer());
    const id = requestAnimationFrame(() => { sync(); const l = readLayer(); document.documentElement.dataset.level = l.level; document.documentElement.dataset.lang = l.lang; });
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => { cancelAnimationFrame(id); window.removeEventListener(EVENT, sync); window.removeEventListener("storage", sync); };
  }, []);
  const update = (next: Partial<Layer>) => writeLayer({ ...readLayer(), ...next });
  return [layer, update];
}
