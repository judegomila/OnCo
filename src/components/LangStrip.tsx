"use client";

import { useEffect, useState } from "react";
import { useLayer } from "@/lib/layer";
import { useT, langNative } from "@/lib/i18n/ui";

const KEY = "onco.langstrip.dismissed";

type Browser = { name: string; url: string };

/** Help page for the browser's built-in page translation, picked from the user agent. */
export function translationHelp(ua: string): Browser {
  if (/Edg\//.test(ua)) return { name: "Microsoft Edge", url: "https://support.microsoft.com/microsoft-edge/use-microsoft-translator-in-microsoft-edge-browser-4ad1c6cb-01a4-4227-be9d-a81e127fcb0b" };
  if (/Firefox\//.test(ua)) return { name: "Firefox", url: "https://support.mozilla.org/kb/website-translation" };
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return { name: "Chrome", url: "https://support.google.com/chrome/answer/173424" };
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return { name: "Safari", url: "https://support.apple.com/guide/safari/translate-a-webpage-ibrw646b2ca2/mac" };
  return { name: "Chrome", url: "https://support.google.com/chrome/answer/173424" };
}

/**
 * Compact, dismissible strip under the header when the site language is not English. Says, in that language,
 * that headings and menus are translated while detailed text stays English, with a link to the browser's own
 * translation help. Dismissal is remembered per language in localStorage. Renders nothing on the server and
 * for English, so it never affects hydration.
 */
export function LangStrip() {
  const [layer] = useLayer();
  const { t, lang } = useT();
  const [dismissed, setDismissed] = useState<string | null>(null);
  const [browser, setBrowser] = useState<Browser | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try { setDismissed(localStorage.getItem(KEY) ?? ""); } catch { setDismissed(""); }
      setBrowser(translationHelp(navigator.userAgent));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (lang === "en" || layer.lang === "en" || dismissed === null || dismissed === lang) return null;
  const dismiss = () => { setDismissed(lang); try { localStorage.setItem(KEY, lang); } catch { /* ignore */ } };
  const b = browser ?? translationHelp("");

  return (
    <div lang={lang} role="status" className="no-print border-b border-border bg-accent-soft/60 text-[13px] leading-snug">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2 flex items-start gap-3">
        <p className="flex-1 min-w-0 text-foreground/85">
          {t("strip.text", { language: langNative(lang) })}{" "}
          <a href={b.url} rel="noopener" className="underline text-accent hover:text-foreground whitespace-nowrap">{t("strip.help", { browser: b.name })}</a>
        </p>
        <button type="button" onClick={dismiss} aria-label={t("strip.dismiss")} title={t("strip.dismiss")} className="ctl ctl-icon h-7 w-7 shrink-0 -my-0.5">
          <svg aria-hidden viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M5 5l10 10M15 5L5 15" /></svg>
        </button>
      </div>
    </div>
  );
}
