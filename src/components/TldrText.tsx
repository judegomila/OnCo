"use client";

import { useLayer, type Lang } from "@/lib/layer";
import { simple } from "@/data/simple";
import { tldr_es } from "@/data/i18n/es";
import { tldr_zh } from "@/data/i18n/zh";
import { tldr_pt } from "@/data/i18n/pt";
import { tldr_hi } from "@/data/i18n/hi";
import { reviewed } from "@/data/i18n/reviewed";

const TABLES = { es: tldr_es, zh: tldr_zh, pt: tldr_pt, hi: tldr_hi } as const;

type Mark = { text: string; title: string; tone: "muted" | "ok" };

/** Which mark to show beside a translated TL;DR: reviewed by a named speaker, machine-assisted, or English fallback. */
export function translationMark(id: string, lang: Lang, hasTranslation: boolean): Mark | null {
  if (lang === "en") return null;
  if (!hasTranslation) return { text: "EN", title: "No translation yet; showing English. Propose one via Suggest an edit.", tone: "muted" };
  const r = reviewed[id]?.filter((x) => x.lang === lang).sort((a, b) => b.date.localeCompare(a.date))[0];
  if (r) return { text: "Reviewed", title: `Translation reviewed by ${r.reviewer}${r.role ? `, ${r.role}` : ""} on ${r.date}.`, tone: "ok" };
  return { text: "MT", title: "Machine-assisted translation, not yet reviewed by a named speaker. Report a problem via Suggest an edit.", tone: "muted" };
}

/**
 * Renders the TL;DR for an entity in the reader's chosen level and language.
 *  - level "simple": the simplified text when one exists (English only), else the TL;DR
 *  - lang != en:      the translated TL;DR when one exists, marked "Reviewed" or "MT" (machine-assisted),
 *                     else English with an EN mark
 * Server renders the English TL;DR; the client swaps after hydration.
 */
export function TldrText({ id, tldr, simple: simpleProp, className = "" }: { id: string; tldr: string; simple?: string; className?: string }) {
  const [layer] = useLayer();
  let text = tldr;
  let mark: Mark | null = null;
  if (layer.level === "simple") {
    const s = simpleProp ?? simple[id];
    if (s) text = s;
  } else if (layer.lang !== "en") {
    const t = TABLES[layer.lang][id];
    if (t) text = t;
    mark = translationMark(id, layer.lang, !!t);
  }
  return (
    <span className={className} lang={layer.level === "simple" ? "en" : layer.lang}>
      {text}
      {mark && (
        <span className={`ml-1.5 align-middle text-[10px] font-semibold border rounded px-1 ${mark.tone === "ok" ? "text-emerald-800 border-emerald-300 dark:text-emerald-200 dark:border-emerald-800" : "text-muted border-border"}`} title={mark.title}>{mark.text}</span>
      )}
    </span>
  );
}

/** True when translations or simplified text exist for an id, for badges and coverage pages. */
export function coverageFor(id: string) {
  return { simple: id in simple, es: id in tldr_es, zh: id in tldr_zh, pt: id in tldr_pt, hi: id in tldr_hi };
}

/** Languages in which this id's translation has a named review. */
export function reviewedLangs(id: string): Lang[] {
  return [...new Set((reviewed[id] ?? []).map((r) => r.lang))];
}
