/**
 * The ranking views for /ideas/rankings/: ids, English names, glyphs and the formula of each in one plain sentence.
 * Pure and dependency-free so the client-side view pills (src/components/IdeaRankings.tsx) can import it without
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
