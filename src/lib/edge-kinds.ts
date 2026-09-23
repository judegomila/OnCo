/**
 * The kinds of signal on /edge/, shared by the server-side aggregator (src/lib/edge.ts), the page and the
 * client-side filter pills (src/components/EdgeFilter.tsx). No file-system imports here so the client bundle
 * stays small: glyph paths, labels, the page each kind deep-links to, the date labels, and the pure functions
 * behind the filter (URL state in `?type=` and `?for=`, and the match of an item against a chosen set of records).
 */
export const EDGE_KINDS = ["approval", "withdrawal", "result", "paper", "preprint", "law", "proposal", "issue"] as const;
export type EdgeKind = (typeof EDGE_KINDS)[number];

/** Monoline 24x24 glyph per kind (same grammar as KindIcon and RouteIcon: 1.5px stroke, currentColor). */
export const EDGE_KIND_META: Record<EdgeKind, { label: string; plural: string; path: string; /** Tailwind classes for the kind pill. */ tone: string; /** Where the same material lives in full on the site. */ href: string; /** One line for the Sources footer. */ source: string; cadence: string }> = {
  approval: { label: "Approval", plural: "Approvals", path: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-4 9 3 3 5-6", tone: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200", href: "/regulatory/",
    source: "FDA Oncology Center of Excellence approval notifications (public/fda/recent.json), dated approvals recorded on product pages, and European Commission authorisations from the regional approvals table with an EPAR or regulator link.",
    cadence: "FDA feed Wednesdays 06:07 UTC (refresh-fda.yml); EU rows checked against the EMA register Wednesdays 06:37 UTC (refresh-regional.yml); product pages by hand." },
  withdrawal: { label: "Withdrawal", plural: "Withdrawals", path: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM9 9l6 6m0-6-6 6", tone: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200", href: "/regulatory/",
    source: "Dated withdrawals recorded on product pages and withdrawn EU authorisations in the regional approvals table, each with a source link.",
    cadence: "Same schedule as approvals." },
  result: { label: "Result", plural: "Results", path: "M4 20h16M7 16V9M12 16V5M17 16v-6", tone: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200", href: "/explained/",
    source: "Trials in the corpus with a reported year and structured outcomes, linked to the primary paper, sponsor release or registry entry the outcome cites.",
    cadence: "Curated by hand; ClinicalTrials.gov status refreshed Mondays 06:17 UTC (refresh-trials.yml)." },
  paper: { label: "Paper", plural: "Papers", path: "M7 3h7l5 5v13H7V3Zm7 0v5h5M10 12h5M10 16h5", tone: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200", href: "/papers/",
    source: "The newest Europe PMC matches for every product, target, cancer and technology (public/papers), journal versions of tracked preprints, and papers the roadmap watch found for landmark trials. One entry per DOI, however many records it matched.",
    cadence: "Literature snapshot Tuesdays 05:41 UTC (refresh-papers.yml); roadmap watch Thursdays 05:29 UTC (roadmap-watch.yml)." },
  preprint: { label: "Preprint", plural: "Preprints", path: "M7 3h7l5 5v13H7V3Zm7 0v5h5M10 12h2m2 0h1M10 16h2m2 0h1", tone: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200", href: "/preprints/",
    source: "bioRxiv, medRxiv, Research Square and other preprints of the last 90 days that match a target, product or technology query (public/preprints). Not peer reviewed.",
    cadence: "Wednesdays 06:17 UTC (refresh-preprints.yml)." },
  law: { label: "Law", plural: "Law & policy", path: "M12 4v16M6 8h12M6 8l-3 6h6l-3-6Zm12 0-3 6h6l-3-6ZM9 20h6", tone: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200", href: "/law/",
    source: "Statutes, regulations, guidance and court rulings in the law index, dated to the year the instrument was made, each linked to its primary text.",
    cadence: "Curated by hand; new instruments are added when they are enacted." },
  proposal: { label: "Proposal", plural: "Proposals", path: "M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.6.5.9 1.1 1 1.9h5c.1-.8.4-1.4 1-1.9A6 6 0 0 0 12 3Z", tone: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-200", href: "/status/",
    source: "Changes the nightly bot proposes for the corpus from the FDA feed, the EMA register and registry status changes (public/proposals/latest.json). Proposals, not facts: each waits for a human to apply it.",
    cadence: "Daily 03:23 UTC (propose.yml)." },
  issue: { label: "Issue", plural: "Weekly issues", path: "M3 6h18v12H3zM3 6l9 7 9-7", tone: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200", href: "/newsletter/",
    source: "OnCo's own weekly issue: what changed, regulatory events, upcoming readouts and what the journals published.",
    cadence: "Mondays 07:31 UTC (newsletter.yml); the archive is rebuilt with every deploy." },
};

export type EdgePrecision = "day" | "month" | "quarter" | "year";

/** "2026-09-13" -> "13 September 2026". */
export function plainDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** Label for an item's date at its own precision. */
export function edgeDateLabel(it: { date: string; precision: EdgePrecision }): string {
  if (it.precision === "day") return plainDate(it.date);
  if (it.precision === "month") { const [y, m] = it.date.split("-").map(Number); return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }); }
  if (it.precision === "quarter") { const q = /^(\d{4})-Q([1-4])$/.exec(it.date); return q ? `Q${q[2]} ${q[1]}` : it.date; }
  return it.date;
}

/** Group key for the day-grouped feed: the day, the month, or the year for year- and quarter-dated items. */
export const edgeGroupKey = (it: { date: string; precision: EdgePrecision }) => (it.precision === "day" || it.precision === "month" ? it.date : it.date.slice(0, 4));

/** Heading for a group key: the weekday and date, the month, or the year, with a note when the day is not recorded. */
export const edgeGroupLabel = (key: string): string =>
  /^\d{4}-\d{2}-\d{2}$/.test(key) ? new Date(`${key}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
  : /^\d{4}-\d{2}$/.test(key) ? `${edgeDateLabel({ date: key, precision: "month" })}, day not recorded`
  : `${key}, day not recorded`;

/**
 * The filter's URL form: `?type=approvals,results` (kinds by their plural slug, comma separated, any order) and
 * `?for=<cancer id>` for one cancer's view, or `?for=me` for the browser's For me cancer (the id itself stays in
 * the browser). Unknown values are dropped, so a stale link degrades to the unfiltered page.
 */
export const EDGE_TYPE_PARAM = "type";
export const EDGE_FOR_PARAM = "for";
export const EDGE_FOR_ME = "me";
export type EdgeFilterState = { types: EdgeKind[]; for?: string };

/** The `?type=` slug of a kind: its plural in kebab case ("Weekly issues" -> "weekly-issues"; "Law & policy" -> "law"). */
export const edgeTypeSlug = (k: EdgeKind): string => (k === "law" ? "law" : EDGE_KIND_META[k].plural.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, ""));
const SLUG_TO_KIND = new Map<string, EdgeKind>(EDGE_KINDS.flatMap((k) => [[edgeTypeSlug(k), k], [k, k]] as Array<[string, EdgeKind]>));
export const edgeKindFromSlug = (s: string): EdgeKind | undefined => SLUG_TO_KIND.get(s.trim().toLowerCase());

export function parseEdgeQuery(search: string | URLSearchParams): EdgeFilterState {
  const p = typeof search === "string" ? new URLSearchParams(search) : search;
  const seen = new Set<EdgeKind>();
  for (const raw of p.getAll(EDGE_TYPE_PARAM)) for (const s of raw.split(",")) { const k = edgeKindFromSlug(s); if (k) seen.add(k); }
  const types = EDGE_KINDS.filter((k) => seen.has(k));
  const f = p.get(EDGE_FOR_PARAM)?.trim();
  return { types, for: f && /^[a-z0-9-]+$/i.test(f) ? f : undefined };
}

/** The query string for a state (with its leading `?`, or "" when nothing is chosen), leaving other keys of `from` alone. Every kind chosen is no filter. */
export function edgeQuery(state: EdgeFilterState, from?: string | URLSearchParams): string {
  const p = new URLSearchParams(from);
  p.delete(EDGE_TYPE_PARAM); p.delete(EDGE_FOR_PARAM);
  if (state.types.length && state.types.length < EDGE_KINDS.length) p.set(EDGE_TYPE_PARAM, EDGE_KINDS.filter((k) => state.types.includes(k)).map(edgeTypeSlug).join(","));
  if (state.for) p.set(EDGE_FOR_PARAM, state.for);
  const s = p.toString();
  return s ? `?${s.replace(/%2C/g, ",")}` : "";
}

/** The path of a filtered Edge view, for links from cards, the week strip and cancer pages. */
export const edgeHref = (state: EdgeFilterState) => `/edge/${edgeQuery(state)}`;

export type EdgeFilterable = { kind: EdgeKind; refIds: readonly string[] };

/**
 * Does an item pass the filter? Types are a union (any chosen kind; none chosen means every kind); `ids` is the
 * record set of one cancer (src/lib/for-me-related.ts `edgeIds`) and an item passes when one of its linked records
 * is in it; the two combine as an intersection. `ids` undefined means no cancer filter.
 */
export function edgeMatches(it: EdgeFilterable, types: readonly EdgeKind[], ids?: ReadonlySet<string>): boolean {
  if (types.length && !types.includes(it.kind)) return false;
  if (ids && !it.refIds.some((id) => ids.has(id))) return false;
  return true;
}

export const filterEdge = <T extends EdgeFilterable>(items: readonly T[], types: readonly EdgeKind[], ids?: ReadonlySet<string>): T[] => items.filter((it) => edgeMatches(it, types, ids));

/** Items of each kind in a list, for the pill counts. */
export function countEdgeKinds(items: readonly EdgeFilterable[]): Record<EdgeKind, number> {
  const out = Object.fromEntries(EDGE_KINDS.map((k) => [k, 0])) as Record<EdgeKind, number>;
  for (const it of items) out[it.kind]++;
  return out;
}

/**
 * The shape of one item in /edge/feed.json (JSON Feed 1.1 with the `_onco` extension, scripts/build-feeds.ts),
 * as the filter reads it when the page's 200 items are fewer than the feed's 500.
 */
export type EdgeFeedJsonItem = { id: string; url: string; title: string; content_text: string; date_published: string; tags: string[]; _onco: { kind: EdgeKind; date: string; precision: EdgePrecision; venue?: string; doi?: string; records: Array<{ id: string; kind: string; name: string; url: string }> } };
