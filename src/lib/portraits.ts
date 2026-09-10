import portraitIndex from "../../public/portraits/index.json";

/**
 * Portraits fetched by scripts/fetch-portraits.ts: Wikimedia Commons images attached to the person's
 * Wikidata item (P18), restricted to CC0 / CC BY / CC BY-SA / public-domain files. Each entry carries the
 * licence, author and a ready-made attribution line; pages must show the attribution (see Portrait.tsx).
 */
export type PortraitEntry = {
  id: string;
  qid: string;
  /** File under public/portraits/. */
  file: string;
  /** Commons file title without the "File:" prefix. */
  commonsFile: string;
  license: string;
  licenseUrl?: string;
  author: string;
  /** e.g. "Photo: Jane Doe, CC BY-SA 4.0, via Wikimedia Commons". */
  attribution: string;
  /** Commons file page. */
  source: string;
  fetched: string;
};
export type PortraitIndex = {
  generated: string;
  portraits: Record<string, PortraitEntry>;
  unresolved: Record<string, { reason: string; qid?: string; checked: string }>;
  rejected: Record<string, Array<{ qid: string; label: string; description: string; reason: string }>>;
};

const INDEX = portraitIndex as unknown as PortraitIndex;

export type Portrait = { src: string; attribution: string; license: string; licenseUrl?: string; author: string; source: string; qid: string };

/** Self-hosted portrait for a person id, or undefined when none passed the licence and identity checks. */
export function portraitFor(id: string | undefined): Portrait | undefined {
  const e = id ? INDEX.portraits?.[id] : undefined;
  if (!e) return undefined;
  return { src: `/portraits/${e.file}`, attribution: e.attribution, license: e.license, licenseUrl: e.licenseUrl, author: e.author, source: e.source, qid: e.qid };
}

/** Just the URL, for table rows. */
export function portraitSrc(id: string | undefined): string | undefined {
  return portraitFor(id)?.src;
}

/** Surname initial in the style of the heroes page ("Dame Cally Palmer" -> "P"). */
export function portraitInitial(name: string): string {
  const surname = name.replace(/^(Dame|Sir|Dr\.?|Prof\.?|Professor|Lord|Baroness|Baron)\s+/i, "").replace(/"[^"]*"\s*/g, "").replace(/\s*\(.*?\)\s*/g, " ").replace(/,.*$/, "").trim().split(/\s+/).pop() ?? name;
  return surname.charAt(0).toUpperCase();
}

/** Coverage summary for the about/audit pages. */
export function portraitCoverage(): { total: number; byLicense: Record<string, number>; unresolved: number } {
  const byLicense: Record<string, number> = {};
  for (const e of Object.values(INDEX.portraits ?? {})) byLicense[e.license] = (byLicense[e.license] ?? 0) + 1;
  return { total: Object.keys(INDEX.portraits ?? {}).length, byLicense, unresolved: Object.keys(INDEX.unresolved ?? {}).length };
}
