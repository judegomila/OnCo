"use client";

import { useT, type UiKey } from "@/lib/i18n/ui";
import { THEME_KEY, THEMES, useTheme, type Theme } from "@/lib/theme";

export type { Theme } from "@/lib/theme";

/** Drawn icons (not text glyphs), so each one sits on the control's centre like the other header icons. */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
export const THEME_ICON: Record<Theme, React.ReactElement> = {
  light: <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...S}><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" /></svg>,
  dark: <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...S}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" /></svg>,
  contrast: <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...S}><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5v17A8.5 8.5 0 0 0 12 3.5Z" fill="currentColor" stroke="none" /></svg>,
  system: <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...S}><rect x="3" y="4.5" width="18" height="12" rx="2" /><path d="M8 20h8M12 16.5V20" /></svg>,
};

/**
 * Theme switch: light (default), dark, high contrast, auto (follows the OS). The store (localStorage key, the
 * `data-theme` attribute on <html>, the change event) lives in src/lib/theme.ts so the account menu and the
 * signed-in preference sync read and write the same value. Render <ThemeScript /> at the top of <body> to apply
 * the saved theme before paint. `data-onco-toggle` lets the account menu's preference chip press this control.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, set] = useTheme();
  const { t } = useT();
  const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
  const label = (th: Theme) => t(`theme.${th}` as UiKey);
  return (
    <button type="button" onClick={() => set(next)} data-onco-toggle="theme" title={t("theme.title", { current: label(theme), next: label(next) })} aria-label={t("theme.aria", { current: label(theme), next: label(next) })}
      className={`ctl ctl-icon ${className}`}>
      {THEME_ICON[theme]}
    </button>
  );
}

/** Inline script that applies the saved theme before first paint (avoids a flash). */
export function ThemeScript() {
  // Light is the default; "system" follows the OS only when a reader chooses it.
  const js = `try{var t=localStorage.getItem("${THEME_KEY}")||"light";if(t!=="system"){document.documentElement.setAttribute("data-theme",t)}}catch(e){document.documentElement.setAttribute("data-theme","light")}`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
