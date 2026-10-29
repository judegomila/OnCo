import logoIndex from "../../public/logos/index.json";

export type LogoSource = "wikidata" | "clearbit" | "favicon";
export type LogoEntry = { file: string; source: LogoSource; license?: string; attribution?: string; qid?: string; name?: string };

const INDEX = logoIndex as Record<string, LogoEntry>;

/** Domain of a website URL without "www." (empty string when unparsable). */
export function domainOf(website?: string): string {
  try { return website ? new URL(website).hostname.replace(/^www\./, "") : ""; } catch { return ""; }
}

/**
 * Resolve the logo for an entity: the self-hosted file from public/logos when the fetch script found one, otherwise
 * nothing, and the caller draws OnCo's own initials tile (src/lib/monogram.ts). There is no third-party fallback: until
 * 29 October 2026 a missing file fell back to Google's favicon service, which showed website-builder stock icons for
 * organisations whose own icon was the builder's. `website` is accepted for existing callers and no longer used.
 */
export function logoFor(id: string | undefined, _website?: string): { src?: string; source: LogoSource | "none"; entry?: LogoEntry } {
  void _website; // kept in the signature for existing callers; a website no longer produces an image
  const entry = id ? INDEX[id] : undefined;
  if (entry) return { src: `/logos/${entry.file}`, source: entry.source, entry };
  return { source: "none" };
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
