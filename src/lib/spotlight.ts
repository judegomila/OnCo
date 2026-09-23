import type { Graph } from "./graph";
import { phaseLabel, routeFor, type Entity } from "./schema";
import { paragraphs } from "./text";
import {
  SPOTLIGHT_KINDS, SPOTLIGHT_RULE, SPOTLIGHT_SCHEDULE, spotlightKindFor, spotlightKindLabel,
  type SpotlightFact, type SpotlightFile, type SpotlightKind, type SpotlightPill, type SpotlightRecord, type SpotlightSet,
} from "./spotlight-schedule";

/**
 * The home page spotlight, one set per kind in rotation (src/lib/spotlight-schedule.ts). Each set is one hero record
 * with its TL;DR, three facts in the kind's own vocabulary and up to eight connected records as pills, plus two
 * runners-up. Written once to /api/v1/spotlight.json (scripts/build-api.ts); the build day's set is also rendered
 * into the home page HTML so the page is complete without JavaScript, and the client swaps in the reader's day.
 *
 * Rule (SPOTLIGHT_RULE): the most connected record of the kind, ties broken by the length of its own prose. Texts are
 * clipped at word boundaries so every set has the same footprint and the card keeps its height across the swap.
 */

const TLDR_MAX = 360;
const FACT_MAX = 240;
const PILLS = 8;
/** Glossary terms and journals link to almost everything; they would crowd the pills without saying much. */
const PILL_SKIP = new Set<Entity["kind"]>(["term", "journal"]);

/** Cut at a word boundary with an ellipsis; unchanged when it already fits. */
export function clip(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const atWord = cut.lastIndexOf(" ");
  return `${(atWord > max / 2 ? cut.slice(0, atWord) : cut).replace(/[,;:(\-\s]+$/, "")}…`;
}

const connectedCount = (g: Graph, id: string) => [...g.neighbours(id).values()].reduce((n, l) => n + l.length, 0);
const prose = (e: Entity) => e.tldr.length + e.summary.length;

/** Records of a kind in rule order: most connected first, ties by prose length, then by name so the order is stable. */
export function rankForSpotlight(g: Graph, kind: SpotlightKind): Entity[] {
  return g.kind(kind)
    .map((e) => ({ e, n: connectedCount(g, e.id), p: prose(e) }))
    .sort((a, b) => b.n - a.n || b.p - a.p || a.e.name.localeCompare(b.e.name))
    .map((x) => x.e);
}

const fact = (kicker: string, text: string | undefined | null): SpotlightFact | null => (text && text.trim() ? { kicker, text: clip(text, FACT_MAX) } : null);
const list = (xs: string[]) => xs.filter(Boolean).join(", ");

/** Three facts in the kind's own words; short kinds fall back to the summary and the connection count. */
function factsFor(g: Graph, e: Entity): SpotlightFact[] {
  const own: Array<SpotlightFact | null> = [];
  switch (e.kind) {
    case "cancer": {
      const last = e.history.at(-1);
      own.push(fact("State of the art", e.stateOfArt[0]), fact("Newest", last ? `${last.title}${last.note ? `: ${last.note}` : ""}` : undefined), fact("Open problem", e.openProblems[0]));
      break;
    }
    case "drug": {
      const latest = [...e.approvals].sort((a, b) => b.year - a.year)[0];
      own.push(fact("Mechanism", e.mechanism), fact("Latest approval", latest ? `${latest.year}, ${latest.region}: ${latest.indication}` : undefined), fact("Modality", e.modality));
      break;
    }
    case "trial":
      own.push(fact("Design", `${phaseLabel(e.phase)}; ${e.setting}`), fact("Result", e.result), e.enrolled ? fact("Enrolled", `${e.enrolled.toLocaleString("en-GB")} participants${e.sponsor ? `, sponsored by ${e.sponsor}` : ""}`) : fact("Sponsor", e.sponsor));
      break;
    case "technology":
      own.push(fact("Principle", e.principle), fact("Strength", e.strengths[0]), fact("Limitation", e.limitations[0]));
      break;
    case "target":
      own.push(fact("Biology", e.biology), fact("Where found", list(e.whereFound)), fact("Class", e.targetClass?.replace(/-/g, " ")));
      break;
    case "idea":
      own.push(fact("Hypothesis", e.hypothesis), fact("Proposed test", e.test), fact("Maturity", `${e.maturity.replace(/-/g, " ")}${e.actor ? `; actor: ${e.actor}` : ""}`));
      break;
    case "roadmap": {
      const current = [...e.steps].reverse().find((s) => s.status === "current" || s.status === "historic");
      const next = e.steps.find((s) => s.status === "emerging" || s.status === "speculative");
      own.push(fact("Steps", `${e.steps.length} steps, starting ${e.steps[0].era}: ${e.steps[0].title}`), fact("Now", current?.title), fact("Next", next?.title));
      break;
    }
    case "person":
      own.push(fact("Role", e.role), fact("Specialisms", list(e.specialisms)), fact("Papers", e.papers.length ? `${e.papers.length} listed${e.hIndex ? `; h-index ${e.hIndex}` : ""}` : undefined));
      break;
    case "institution":
      own.push(fact("Where", `${e.city}, ${e.country}`), fact("Type", `${e.institutionType.replace(/-/g, " ")}${e.nci ? `; NCI ${e.nci}` : ""}`), fact("Programmes", list(e.programs.slice(0, 4))));
      break;
    case "company":
      own.push(fact("Headquarters", e.hq), fact("Type", `${e.companyType.replace(/-/g, " ")}${e.stage ? `; ${e.stage.replace(/-/g, " ")}` : ""}`), e.founded ? fact("Founded", `${e.founded}${e.ticker ? `; ticker ${e.ticker}` : ""}`) : fact("Ticker", e.ticker));
      break;
    case "paper":
      own.push(fact("Finding", e.findings[0]), fact("What it means", e.whatItMeans), fact("Published", `${e.journal}, ${e.year}`));
      break;
    case "collection":
      own.push(fact("Holds", e.holds), fact("Maintainer", e.maintainer), fact("Licence", e.license));
      break;
    case "pairing":
      own.push(fact("Rationale", e.rationale), fact("Evidence", e.evidence), fact("Type", e.pairingType.replace(/-/g, " ")));
      break;
    case "bottleneck":
      own.push(fact("Cause", e.causes[0]), fact("Current efforts", e.currentEfforts[0]), fact("Success looks like", e.successLooksLike));
      break;
    default:
      break;
  }
  const facts = own.filter((f): f is SpotlightFact => !!f);
  const fallbacks = [fact("Summary", paragraphs(e.summary)[0]), fact("Connected", `${connectedCount(g, e.id).toLocaleString("en-GB")} linked records across the site`)];
  for (const f of fallbacks) if (facts.length < 3 && f && !facts.some((x) => x.kicker === f.kicker)) facts.push(f);
  return facts.slice(0, 3);
}

/** The hero's most connected neighbours as pills, glossary terms and journals left out. */
function pillsFor(g: Graph, e: Entity): SpotlightPill[] {
  const all = [...g.neighbours(e.id).entries()].filter(([k]) => !PILL_SKIP.has(k)).flatMap(([, l]) => l);
  return all
    .map((n) => ({ n, d: g.degree(n.id) }))
    .sort((a, b) => b.d - a.d || a.n.name.localeCompare(b.n.name))
    .slice(0, PILLS)
    .map(({ n }) => ({ id: n.id, kind: n.kind, name: n.name, route: routeFor(n) }));
}

export function spotlightRecord(g: Graph, e: Entity): SpotlightRecord {
  return { id: e.id, kind: e.kind, name: e.name, route: routeFor(e), tldr: clip(e.tldr, TLDR_MAX), facts: factsFor(g, e), pills: pillsFor(g, e), connected: connectedCount(g, e.id) };
}

export function spotlightSet(g: Graph, kind: SpotlightKind): SpotlightSet {
  const [hero, ...rest] = rankForSpotlight(g, kind);
  if (!hero) throw new Error(`spotlight: no ${kind} records`);
  return { kind, label: spotlightKindLabel(kind), hero: spotlightRecord(g, hero), runnersUp: rest.slice(0, 2).map((e) => ({ id: e.id, name: e.name, route: routeFor(e) })) };
}

let cached: WeakMap<Graph, Record<SpotlightKind, SpotlightSet>> | undefined;

/** Every kind's set, computed once per graph. */
export function spotlightSets(g: Graph): Record<SpotlightKind, SpotlightSet> {
  cached ??= new WeakMap();
  let sets = cached.get(g);
  if (!sets) {
    sets = Object.fromEntries(SPOTLIGHT_KINDS.map((k) => [k, spotlightSet(g, k)])) as Record<SpotlightKind, SpotlightSet>;
    cached.set(g, sets);
  }
  return sets;
}

/** The contents of /api/v1/spotlight.json. `today` is the build date; the page embeds that kind's set. */
export function spotlightFile(g: Graph, today = new Date()): SpotlightFile {
  return { rule: SPOTLIGHT_RULE, schedule: SPOTLIGHT_SCHEDULE, kinds: [...SPOTLIGHT_KINDS], buildKind: spotlightKindFor(today), sets: spotlightSets(g) };
}
