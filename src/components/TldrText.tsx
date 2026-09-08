"use client";

import { useLayer } from "@/lib/layer";
import { simple } from "@/data/simple";
import { tldr_es } from "@/data/i18n/es";
import { tldr_zh } from "@/data/i18n/zh";
import { tldr_pt } from "@/data/i18n/pt";
import { tldr_hi } from "@/data/i18n/hi";

const TABLES = { es: tldr_es, zh: tldr_zh, pt: tldr_pt, hi: tldr_hi } as const;

/**
 * Renders the TL;DR for an entity in the reader's chosen level and language.
 *  - level "simple": the simplified text when one exists (English only), else the TL;DR
 *  - lang != en:      the translated TL;DR when one exists, else English with an EN mark
 * Server renders the English TL;DR; the client swaps after hydration.
 */
export function TldrText({ id, tldr, simple: simpleProp, className = "" }: { id: string; tldr: string; simple?: string; className?: string }) {
  const [layer] = useLayer();
  let text = tldr;
  let mark: string | null = null;
  if (layer.level === "simple") {
    const s = simpleProp ?? simple[id];
    if (s) text = s;
  } else if (layer.lang !== "en") {
    const t = TABLES[layer.lang][id];
    if (t) text = t; else mark = "EN";
  }
  const dir = layer.lang === "hi" || layer.lang === "zh" ? undefined : undefined;
  return (
    <span className={className} lang={layer.level === "simple" ? "en" : layer.lang} dir={dir}>
      {text}
      {mark && <span className="ml-1.5 align-middle text-[10px] font-semibold text-muted border border-border rounded px-1" title="No translation yet; showing English">{mark}</span>}
    </span>
  );
}

/** True when translations or simplified text exist for an id, for badges and coverage pages. */
export function coverageFor(id: string) {
  return { simple: id in simple, es: id in tldr_es, zh: id in tldr_zh, pt: id in tldr_pt, hi: id in tldr_hi };
}
