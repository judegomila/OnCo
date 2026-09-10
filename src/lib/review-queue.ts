import type { Lang } from "./layer";
import { graph } from "./graph";
import { evidenceFor } from "./evidence";
import { KIND_META, KINDS, routeFor, type Entity, type Kind } from "./schema";
import { reviews, type Review } from "@/data/reviews";
import { reviewed, type TranslationReview } from "@/data/i18n/reviewed";
import { tldr_es } from "@/data/i18n/es";
import { tldr_zh } from "@/data/i18n/zh";
import { tldr_pt } from "@/data/i18n/pt";
import { tldr_hi } from "@/data/i18n/hi";
import { tldr_fr } from "@/data/i18n/fr";
import { tldr_de } from "@/data/i18n/de";
import { tldr_ja } from "@/data/i18n/ja";
import { tldr_ar } from "@/data/i18n/ar";
import { issueUrl, entityRef, pageUrl } from "./issue-links";

/**
 * Translated languages. Mirrors LANGS in src/lib/layer.ts minus English; kept here as a value because
 * layer.ts is a client module and its exports are not plain values in server code. The test compares the two.
 */
export const TRANSLATED_LANGS: Array<{ code: Exclude<Lang, "en">; label: string; native: string }> = [
  { code: "es", label: "Spanish", native: "Español" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "ar", label: "Arabic", native: "العربية" },
];

/**
 * Review queue and coverage.
 *
 * Which pages most need a named reviewer? Score each entity 0-100 from three disclosed parts:
 *   reach      how connected the page is (graph degree, log-scaled):        0-40
 *   stakes     how much evidence it carries (evidence score, or a kind default): 0-30
 *   staleness  days since `asOf`, one year = full marks:                    0-30
 * Pages with a review under a year old on every track they need sort below the rest.
 * Tracks follow .github/REVIEWERS.md: clinical, scientific, regulatory, advocate.
 */
export type Track = "clinical" | "scientific" | "regulatory" | "advocate";

export const TRACK_META: Record<Track, { label: string; badge: Review["track"]; checks: string }> = {
  clinical: { label: "Expert (clinical)", badge: "expert", checks: "Standard-of-care rows against current NCCN and ESMO guidance; trial figures against the primary publication." },
  scientific: { label: "Expert (scientific)", badge: "expert", checks: "Mechanism, biology and evidence tier accurately stated; nothing speculative presented as settled." },
  regulatory: { label: "Expert (regulatory)", badge: "expert", checks: "Approval dates, regions and indications match the label or agency notice." },
  advocate: { label: "Patient advocate", badge: "advocate", checks: "TL;DR, simple text and questions clear, non-alarming and accurate at the stated reading level." },
};

/** Which review tracks a kind of page needs. Organisations and people are attributed, not reviewed. */
export function tracksFor(kind: Kind): Track[] {
  switch (kind) {
    case "cancer": return ["clinical", "advocate"];
    case "trial": return ["clinical"];
    case "drug": return ["regulatory", "clinical", "advocate"];
    case "target": case "pathway": case "technology": case "idea": case "roadmap": case "pairing": case "paper": case "bottleneck": return ["scientific"];
    case "term": case "section": return ["advocate"];
    default: return [];
  }
}

const KIND_STAKES: Partial<Record<Kind, number>> = { cancer: 30, section: 22, term: 12, pathway: 18, idea: 10, roadmap: 14, pairing: 14, paper: 18, bottleneck: 10 };

export type QueueItem = {
  id: string; kind: Kind; name: string; route: string;
  score: number; parts: { reach: number; stakes: number; staleness: number };
  degree: number; daysOld: number; evidence: number | null;
  tracks: Track[]; missing: Track[]; reviewedOn: Review["track"][];
  issueUrl: string;
};

const clamp = (x: number, hi: number) => Math.max(0, Math.min(hi, Math.round(x)));
const daysBetween = (a: string, now: Date) => Math.max(0, Math.round((now.getTime() - new Date(a).getTime()) / 86_400_000));

/** Tracks still missing a review under `maxAgeDays` old for this entity. */
export function missingTracks(id: string, kind: Kind, now = new Date(), maxAgeDays = 365): Track[] {
  const need = tracksFor(kind);
  const have = (reviews[id] ?? []).filter((r) => daysBetween(r.date, now) <= maxAgeDays).map((r) => r.track);
  return need.filter((t) => !have.includes(TRACK_META[t].badge));
}

/** The "Review this page" issue, prefilled with the entity, its page and the track it needs first. */
export function reviewIssueUrl(e: { id: string; kind: Kind; name: string }, track?: Track): string {
  return issueUrl("review", { entity: `${entityRef(e.kind, e.id)} · ${e.name}`, page: pageUrl(e.kind, e.id), track: track ?? tracksFor(e.kind)[0] }, { title: `review: ${e.id}` });
}

let cache: { key: string; items: QueueItem[] } | undefined;

/** Every reviewable page, highest need first. Cached per day. */
export function reviewQueue(now = new Date()): QueueItem[] {
  const key = now.toISOString().slice(0, 10);
  if (cache && cache.key === key) return cache.items;
  const g = graph();
  const items: QueueItem[] = [];
  for (const e of g.entities) {
    const tracks = tracksFor(e.kind);
    if (!tracks.length) continue;
    const degree = g.degree(e.id);
    const ev = evidenceFor(e)?.score ?? null;
    const daysOld = daysBetween(e.asOf, now);
    const reach = clamp(8 * Math.log2(1 + degree), 40);
    const stakes = clamp(ev !== null ? ev * 0.3 : (KIND_STAKES[e.kind] ?? 10), 30);
    const staleness = clamp((daysOld / 365) * 30, 30);
    const missing = missingTracks(e.id, e.kind, now);
    items.push({
      id: e.id, kind: e.kind, name: e.name, route: routeFor(e),
      score: reach + stakes + staleness, parts: { reach, stakes, staleness },
      degree, daysOld, evidence: ev, tracks, missing, reviewedOn: (reviews[e.id] ?? []).map((r) => r.track),
      issueUrl: reviewIssueUrl(e, missing[0]),
    });
  }
  items.sort((a, b) => (b.missing.length > 0 ? 1 : 0) - (a.missing.length > 0 ? 1 : 0) || b.score - a.score || a.name.localeCompare(b.name));
  cache = { key, items };
  return items;
}

export type KindCoverage = { kind: Kind; label: string; total: number; expert: number; advocate: number; any: number; needs: Track[] };

/** Reviewed pages per kind and per badge track. */
export function reviewCoverage(): { byKind: KindCoverage[]; total: number; reviewed: number; byTrack: Record<Review["track"], number>; reviewsCount: number } {
  const g = graph();
  const byKind: KindCoverage[] = [];
  let total = 0, anyReviewed = 0, reviewsCount = 0;
  const byTrack: Record<Review["track"], number> = { expert: 0, advocate: 0 };
  for (const k of KINDS) {
    const needs = tracksFor(k);
    if (!needs.length) continue;
    const list = g.kind(k);
    let expert = 0, advocate = 0, any = 0;
    for (const e of list) {
      const rs = reviews[e.id] ?? [];
      if (rs.length) any++;
      if (rs.some((r) => r.track === "expert")) expert++;
      if (rs.some((r) => r.track === "advocate")) advocate++;
    }
    byKind.push({ kind: k, label: KIND_META[k].plural, total: list.length, expert, advocate, any, needs });
    total += list.length; anyReviewed += any;
  }
  for (const rs of Object.values(reviews)) for (const r of rs) { byTrack[r.track]++; reviewsCount++; }
  return { byKind, total, reviewed: anyReviewed, byTrack, reviewsCount };
}

export type ReviewerLevel = { label: string; min: number; blurb: string };
/** Editorial levels by number of signed-off pages. Labels, not credentials. */
export const LEVELS: ReviewerLevel[] = [
  { label: "Reviewer", min: 1, blurb: "One or more pages signed off." },
  { label: "Regular reviewer", min: 5, blurb: "Five or more pages." },
  { label: "Senior reviewer", min: 20, blurb: "Twenty or more pages." },
];
export function reviewerLevel(count: number): ReviewerLevel {
  return [...LEVELS].reverse().find((l) => count >= l.min) ?? LEVELS[0];
}

export type RosterEntry = {
  reviewer: string; role: string; url?: string; personId?: string;
  count: number; tracks: Review["track"][]; entities: Array<{ id: string; name: string; route: string; kind: Kind; date: string; track: Review["track"] }>;
  first: string; last: string; coi: string[]; level: ReviewerLevel;
};

/** One row per reviewer, from reviews.ts. Empty until the first sign-off lands. */
export function reviewerRoster(): RosterEntry[] {
  const g = graph();
  const map = new Map<string, RosterEntry>();
  for (const [id, rs] of Object.entries(reviews)) {
    const e = g.get(id);
    for (const r of rs) {
      const key = r.personId ?? r.reviewer.toLowerCase();
      const cur = map.get(key) ?? { reviewer: r.reviewer, role: r.role, url: r.url, personId: r.personId, count: 0, tracks: [], entities: [], first: r.date, last: r.date, coi: [], level: LEVELS[0] };
      cur.count++;
      if (!cur.tracks.includes(r.track)) cur.tracks.push(r.track);
      if (!cur.coi.includes(r.coi)) cur.coi.push(r.coi);
      if (r.date < cur.first) cur.first = r.date;
      if (r.date > cur.last) { cur.last = r.date; cur.role = r.role; cur.url = r.url ?? cur.url; }
      if (e) cur.entities.push({ id, name: e.name, route: routeFor(e), kind: e.kind, date: r.date, track: r.track });
      map.set(key, cur);
    }
  }
  return [...map.values()].map((x) => ({ ...x, level: reviewerLevel(x.count), entities: x.entities.sort((a, b) => b.date.localeCompare(a.date)) })).sort((a, b) => b.count - a.count || a.reviewer.localeCompare(b.reviewer));
}

/** Reviews signed by one reviewer, for the badge's level chip. */
export function reviewerCount(r: Review): number {
  let n = 0;
  for (const rs of Object.values(reviews)) for (const x of rs) if ((r.personId && x.personId === r.personId) || x.reviewer.toLowerCase() === r.reviewer.toLowerCase()) n++;
  return n;
}

export type LangCoverage = { lang: Exclude<Lang, "en">; label: string; native: string; translated: number; reviewed: number; reviewers: number };

const TABLES: Record<Exclude<Lang, "en">, Record<string, string>> = { es: tldr_es, zh: tldr_zh, pt: tldr_pt, hi: tldr_hi, fr: tldr_fr, de: tldr_de, ja: tldr_ja, ar: tldr_ar };

/** Translated TL;DRs per language and how many carry a named review. */
export function translationCoverage(): LangCoverage[] {
  return TRANSLATED_LANGS.map((l) => {
    const code = l.code;
    const table = TABLES[code];
    let rev = 0;
    const names = new Set<string>();
    for (const [id, rs] of Object.entries(reviewed)) {
      const hits = rs.filter((r: TranslationReview) => r.lang === code);
      if (hits.length && id in table) { rev++; hits.forEach((h) => names.add(h.reviewer.toLowerCase())); }
    }
    return { lang: code, label: l.label, native: l.native, translated: Object.keys(table).length, reviewed: rev, reviewers: names.size };
  });
}

/** Kinds that have at least one review track, for filters. */
export function reviewableKinds(): Kind[] {
  return KINDS.filter((k) => tracksFor(k).length > 0);
}

export function entityForQueue(id: string): Entity | undefined {
  return graph().get(id);
}
