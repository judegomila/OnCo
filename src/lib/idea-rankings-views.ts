/**
 * The ranking views for /ideas/rankings/: ids, English names, glyphs and the formula of each in one plain sentence,
 * plus the display side of a ranked row (labels, score format, tooltip formula) and how the lists are paged.
 * Pure and dependency-free so the client-side list (src/components/IdeaRankings.tsx) can import it without
 * pulling the graph, GLOBOCAN JSON or node:fs into the browser bundle. The scoring lives in idea-rankings.ts.
 */
export const VIEW_IDS = ["bang-for-buck", "most-important", "hardest", "closest-to-reality", "cherry-picked", "most-wanted"] as const;
export type ViewId = (typeof VIEW_IDS)[number];

export type ViewGlyph = "coin" | "flag" | "mountain" | "target" | "star" | "thumb";

export type ViewDef = {
  id: ViewId;
  /** English name (the dictionaries carry `rank.view.<id>`). */
  label: string;
  /** The formula in one plain sentence (the dictionaries carry `rank.formula.<id>`). */
  formula: string;
  glyph: ViewGlyph;
};

export const VIEWS: readonly ViewDef[] = [
  { id: "bang-for-buck", label: "Best bang for buck", glyph: "coin", formula: "Score = burden (annual new cases of the linked cancers, GLOBOCAN 2022) divided by the cost band (small 1, medium 2, large 3) and divided again by one plus the horizon in years; ties go to more evidence." },
  { id: "most-important", label: "Most important", glyph: "flag", formula: "Score = burden times breadth (the number of linked cancers); ties go to more evidence." },
  { id: "hardest", label: "Hardest", glyph: "mountain", formula: "Score = cost band (1 to 3) plus horizon years divided by 5, plus distance from being tested at scale (0 to 3), plus missing evidence (3 minus linked evidence, never below 0); ties go to more burden." },
  { id: "closest-to-reality", label: "Closest to reality", glyph: "target", formula: "Score = maturity rank (speculative 1 to being tested at scale 4) times 3, plus linked evidence; ties go to more burden." },
  { id: "cherry-picked", label: "Cherry picked", glyph: "star", formula: "An editorial list kept by hand in src/data/idea-picks.ts, seeded from the ideas that rank best across the four computed views, with one sentence of reasoning each." },
  { id: "most-wanted", label: "Most wanted", glyph: "thumb", formula: "Thumbs-up on each idea's GitHub discussion thread, counted weekly into public/votes.json." },
];

export const viewDef = (id: ViewId): ViewDef => VIEWS.find((v) => v.id === id)!;
export const isViewId = (s: string | null | undefined): s is ViewId => !!s && (VIEW_IDS as readonly string[]).includes(s);

/**
 * Paging. The page used to carry the top 50 of every view in its HTML and again in the hydration payload (2.2 MB).
 * Now it carries the first RANK_PAGE rows of each view, so crawlers and readers without JavaScript still see the top
 * of every ranking, and the browser fetches the whole view from one static file when the reader scrolls past them
 * or presses "Show more", growing the list by RANK_PAGE each time.
 */
export const RANK_PAGE = 30;

/** Site-relative URL of the file holding every ranked row of one view (written by scripts/build-idea-rankings.ts). */
export const rankingsFile = (view: ViewId): string => `/api/v1/ideas/rankings/${view}.json`;

export const MATURITY_ORDER = ["speculative", "preclinical-evidence", "early-clinical", "being-tested-at-scale"] as const;
export type Maturity = (typeof MATURITY_ORDER)[number];
export const MATURITY_LABEL: Record<Maturity, string> = { speculative: "Speculative", "preclinical-evidence": "Preclinical evidence", "early-clinical": "Early clinical", "being-tested-at-scale": "Being tested at scale" };
export const maturityRank = (m: Maturity): number => MATURITY_ORDER.indexOf(m) + 1;

export const COST_ORDER = ["small", "medium", "large"] as const;
export type Cost = (typeof COST_ORDER)[number];
export const COST_LABEL: Record<Cost, string> = { small: "Small", medium: "Medium", large: "Large" };
/** 1 to 3; 0 when the record has no cost band. */
export const costRank = (c: Cost | undefined): number => (c ? COST_ORDER.indexOf(c) + 1 : 0);

export type BurdenSite = { code: number; label: string; cases: number | null; /** OnCo cancer ids that reached this site, directly or through a parent. */ cancerIds: string[] };

/** Everything the formulas read for one idea, plus what the row prints. Plain data: it travels as props and as the per-view JSON file. */
export type ScoreParts = {
  id: string;
  name: string;
  tldr: string;
  route: string;
  cancers: Array<{ id: string; name: string; route: string; /** The site this cancer's burden was read from, when it reached one. */ site?: string; viaParent?: string }>;
  burden: number;
  sites: BurdenSite[];
  breadth: number;
  evidence: number;
  trials: number;
  phase3: number;
  drugs: number;
  papers: number;
  cost?: Cost;
  costRank: number;
  horizon?: number;
  maturity: Maturity;
  maturityRank: number;
};

export type RankedRow = { rank: number; parts: ScoreParts; score: number | null; /** Cherry picked: the editorial sentence. */ reason?: string };

const fmt = (n: number) => n.toLocaleString("en-GB", { maximumFractionDigits: 0 });
const fmt1 = (n: number) => n.toLocaleString("en-GB", { maximumFractionDigits: 1 });

/** The score written out for the display chip: whole numbers for case-based scores, one decimal for the small sums. */
export function formatScore(view: ViewId, score: number): string {
  return view === "hardest" || view === "closest-to-reality" ? fmt1(score) : fmt(score);
}

/** The formula with this idea's own numbers in it, for the tooltip on the score. */
export function explain(view: ViewId, p: ScoreParts, score: number): string {
  switch (view) {
    case "bang-for-buck":
      return `${fmt(p.burden)} cases ÷ cost ${p.costRank} ÷ (1 + ${p.horizon} years) = ${fmt(score)}`;
    case "most-important":
      return `${fmt(p.burden)} cases × ${p.breadth} cancer${p.breadth === 1 ? "" : "s"} = ${fmt(score)}`;
    case "hardest":
      return `cost ${p.costRank} + ${p.horizon} ÷ 5 years + ${4 - p.maturityRank} from tested at scale + ${Math.max(0, 3 - p.evidence)} missing evidence = ${fmt1(score)}`;
    case "closest-to-reality":
      return `maturity ${p.maturityRank} × 3 + ${p.evidence} evidence = ${fmt1(score)}`;
    case "most-wanted":
      return `${fmt(score)} thumbs-up on the discussion thread`;
    case "cherry-picked":
      return "Editorial pick";
  }
}
