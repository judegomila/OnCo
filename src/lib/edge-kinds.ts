/**
 * The kinds of signal on /edge/, shared by the server-side aggregator (src/lib/edge.ts), the page and the
 * client-side filter pills (src/components/EdgeFilter.tsx). No file-system imports here so the client bundle
 * stays small: glyph paths, labels, the filter groups and the page each kind deep-links to.
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

/** Filter pills in display order. "all" first; withdrawals and issues have no pill of their own and show under "all" and "approvals". */
export const EDGE_FILTERS: ReadonlyArray<{ id: "all" | EdgeKind; label: string; kinds: readonly EdgeKind[] }> = [
  { id: "all", label: "All", kinds: EDGE_KINDS },
  { id: "paper", label: "Papers", kinds: ["paper"] },
  { id: "result", label: "Results", kinds: ["result"] },
  { id: "approval", label: "Approvals", kinds: ["approval", "withdrawal"] },
  { id: "law", label: "Law", kinds: ["law"] },
  { id: "preprint", label: "Preprints", kinds: ["preprint"] },
  { id: "proposal", label: "Proposals", kinds: ["proposal"] },
];
