"use client";

import { useEffect, useState } from "react";

/**
 * The colour theme store behind the header ThemeToggle: light (default), dark, high contrast or the OS setting.
 * One localStorage key, applied as `data-theme` on <html> (CSS variables for each live near the top of globals.css),
 * and broadcast on a window event so the toggle, the account menu and the signed-in preference sync all follow one
 * write. The pre-paint script that avoids a flash is ThemeScript in src/components/ThemeToggle.tsx.
 */
export type Theme = "system" | "light" | "dark" | "contrast";
export const THEMES: readonly Theme[] = ["light", "dark", "contrast", "system"];
export const THEME_KEY = "onco:theme";
export const THEME_EVENT = "onco:theme";

export function isTheme(v: unknown): v is Theme { return typeof v === "string" && (THEMES as readonly string[]).includes(v); }

export function readTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try { const saved = window.localStorage.getItem(THEME_KEY); return isTheme(saved) ? saved : "light"; } catch { return "light"; }
}

export function applyTheme(t: Theme) {
  const root = document.documentElement;
  if (t === "system") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", t);
}

/** Persist, apply and announce a theme; every subscriber (toggle, menu chips, preference sync) updates from the event. */
export function writeTheme(t: Theme) {
  try { window.localStorage.setItem(THEME_KEY, t); } catch { /* storage blocked */ }
  applyTheme(t);
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: t }));
}

/** The current theme, light on the server and first client render, then synced with storage and every write. */
export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const th = readTheme();
      setTheme(th);
      // If React recovered from a hydration mismatch it re-rendered <html> without the attribute the pre-paint script set; put it back.
      if (th !== "system" && document.documentElement.getAttribute("data-theme") !== th) applyTheme(th);
    });
    const onEvent = (e: Event) => { const d = (e as CustomEvent<Theme>).detail; if (isTheme(d)) setTheme(d); };
    const onStorage = (e: StorageEvent) => { if (e.key === THEME_KEY) { const th = readTheme(); setTheme(th); applyTheme(th); } };
    window.addEventListener(THEME_EVENT, onEvent);
    window.addEventListener("storage", onStorage);
    return () => { cancelAnimationFrame(id); window.removeEventListener(THEME_EVENT, onEvent); window.removeEventListener("storage", onStorage); };
  }, []);
  return [theme, writeTheme];
}
