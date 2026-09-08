import logoIndex from "../../public/logos/index.json";

export type LogoSource = "wikidata" | "clearbit" | "favicon";
export type LogoEntry = { file: string; source: LogoSource; license?: string; attribution?: string; qid?: string; name?: string };

const INDEX = logoIndex as Record<string, LogoEntry>;

/** Domain of a website URL without "www." (empty string when unparsable). */
export function domainOf(website?: string): string {
  try { return website ? new URL(website).hostname.replace(/^www\./, "") : ""; } catch { return ""; }
}

/** Hotlinked favicon fallback (Google's service), used only when no self-hosted file exists. */
export function faviconUrl(website?: string, size = 128): string | undefined {
  const d = domainOf(website);
  return d ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(d)}&sz=${size}` : undefined;
}

/**
 * Resolve the best logo for an entity: the self-hosted file from public/logos when the fetch script
 * found one, otherwise the favicon service. `source` tells the caller how trustworthy the image is.
 */
export function logoFor(id: string | undefined, website?: string): { src?: string; source: LogoSource | "none"; entry?: LogoEntry } {
  const entry = id ? INDEX[id] : undefined;
  if (entry) return { src: `/logos/${entry.file}`, source: entry.source, entry };
  const src = faviconUrl(website);
  return src ? { src, source: "favicon" } : { source: "none" };
}

/** Convenience for table rows: just the URL (or undefined). */
export function logoSrc(id: string | undefined, website?: string): string | undefined {
  return logoFor(id, website).src;
}

/** Coverage summary for the about/audit pages. */
export function logoCoverage(): Record<LogoSource, number> & { total: number } {
  const out = { wikidata: 0, clearbit: 0, favicon: 0, total: 0 };
  for (const e of Object.values(INDEX)) { out[e.source]++; out.total++; }
  return out;
}
