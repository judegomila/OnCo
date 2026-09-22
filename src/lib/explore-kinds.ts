import { KIND_META, type Kind } from "./kinds";

/**
 * The Explore page's sections and how they are paged. Pure, so the client view, the server page, the API
 * writer (scripts/build-explore.ts) and the tests read one definition.
 *
 * Explore used to ship every row of every kind (12,000 rows, 7 MB of JSON) inside the page, twice over: once
 * as the rendered table and once in the payload React hydrates from. Now the page carries the first
 * EXPLORE_PAGE rows of each kind, ranked as the view ranks them by default, plus the per-cancer counts that
 * the kind chooser prints. The rest of a kind lives in one static file, fetched the first time the reader
 * scrolls past the rows on the page, presses "Show more", or sets a cancer, filter or sort that needs the
 * whole set; filtering and sorting then run in the browser over the loaded file.
 */
export const EXPLORE_KINDS: Kind[] = ["drug", "technology", "target", "trial", "pairing", "idea", "company", "institution", "pathway", "term", "roadmap", "collection"];

/** Rows of a section on the page at first paint, and the step by which the table grows. */
export const EXPLORE_PAGE = 30;

/** Site-relative URL of the file holding every row of one kind. */
export const exploreFile = (kind: Kind): string => `/api/v1/explore/${KIND_META[kind].plural}.json`;

/** Counts per kind for every cancer (keyed by cancer id) and for all cancers together (key ""). */
export type ExploreCounts = Record<string, Partial<Record<Kind, number>>>;
