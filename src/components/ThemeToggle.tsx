"use client";

import { useEffect, useState } from "react";

export type Theme = "system" | "light" | "dark" | "contrast";
const KEY = "onco:theme";
const ORDER: Theme[] = ["light", "dark", "contrast", "system"];
const LABEL: Record<Theme, string> = { system: "Auto", light: "Light", dark: "Dark", contrast: "High contrast" };
const ICON: Record<Theme, string> = { system: "◐", light: "☀", dark: "☾", contrast: "◑" };

function apply(t: Theme) {
  const root = document.documentElement;
  if (t === "system") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", t);
}

/**
 * Theme switch: auto (follows the OS), light, dark, high contrast. Persisted in localStorage and
 * applied via data-theme on <html>; CSS variables for each live near the top of globals.css.
 * Render <ThemeScript /> in <head> (or the top of <body>) to apply the saved theme before paint.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const saved = localStorage.getItem(KEY) as Theme | null;
      if (saved && ORDER.includes(saved)) setTheme(saved);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  const set = (t: Theme) => { setTheme(t); localStorage.setItem(KEY, t); apply(t); };
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
  return (
    <button type="button" onClick={() => set(next)} title={`Theme: ${LABEL[theme]}. Click for ${LABEL[next]}.`} aria-label={`Theme: ${LABEL[theme]}. Switch to ${LABEL[next]}`}
      className={`ctl px-0 md:px-3 ${className}`}>
      <span aria-hidden className="text-base leading-none">{ICON[theme]}</span>
      <span className="hidden md:inline text-muted">{LABEL[theme]}</span>
    </button>
  );
}

/** Inline script that applies the saved theme before first paint (avoids a flash). */
export function ThemeScript() {
  // Light is the default; "system" follows the OS only when a reader chooses it.
  const js = `try{var t=localStorage.getItem("${KEY}")||"light";if(t!=="system"){document.documentElement.setAttribute("data-theme",t)}}catch(e){document.documentElement.setAttribute("data-theme","light")}`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
