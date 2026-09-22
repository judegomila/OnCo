import type { ViewGlyph } from "@/lib/idea-rankings-views";

export type RankGlyphName = ViewGlyph | "rank" | "burden" | "breadth" | "evidence" | "cost" | "horizon" | "maturity";

/** Monoline 24-grid paths, one per pill or chip on the idea rankings. Stroke follows the text colour. */
const PATHS: Record<RankGlyphName, string> = {
  rank: "M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3",
  coin: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v10M9.5 9.5h3.75a1.75 1.75 0 0 1 0 3.5H10.5a1.75 1.75 0 0 0 0 3.5H14.5",
  flag: "M5 21V4M5 4h13l-2 4 2 4H5",
  mountain: "M3 20l6-11 3 5 2-3 7 9H3zM9 9l1.5-2.5L12 9",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12h.01",
  star: "M12 3l2.7 5.6 6.1.8-4.5 4.3 1.2 6.1L12 17l-5.5 2.8 1.2-6.1L3.2 9.4l6.1-.8L12 3z",
  thumb: "M7 11v9H4v-9h3zM7 11l4-8a2.5 2.5 0 0 1 2.5 2.5V9H19a2 2 0 0 1 2 2.3l-1.2 6.5A2 2 0 0 1 17.8 20H7",
  burden: "M9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3M16 3.5a3 3 0 0 1 0 5.5M18 13a4 4 0 0 1 3 4v3",
  breadth: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  evidence: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M7.5 15h9",
  cost: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v10M9.5 9.5h3.75a1.75 1.75 0 0 1 0 3.5H10.5a1.75 1.75 0 0 0 0 3.5H14.5",
  horizon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3.5 2",
  maturity: "M3 20h5v-4h4v-4h4V8h5M3 20V4",
};

const symbolId = (name: RankGlyphName) => `rank-glyph-${name}`;

/**
 * One glyph. By default the path is inline; with `sprite` the svg only references a symbol from RankGlyphDefs,
 * which the page renders once: a list of a hundred rows with seven chips each then carries each path one time
 * instead of seven hundred. The stroke still follows the text colour (currentColor resolves where the symbol is used).
 */
export function RankGlyph({ name, className = "h-4 w-4", sprite = false }: { name: RankGlyphName; className?: string; sprite?: boolean }) {
  if (sprite) {
    return (
      <svg className={className} aria-hidden focusable="false"><use href={`#${symbolId(name)}`} /></svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}

/** The symbol sheet every `sprite` glyph on the page references; render it once, anywhere in the document. */
export function RankGlyphDefs() {
  return (
    <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden focusable="false">
      {(Object.keys(PATHS) as RankGlyphName[]).map((name) => (
        <symbol key={name} id={symbolId(name)} viewBox="0 0 24 24"><path d={PATHS[name]} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" /></symbol>
      ))}
    </svg>
  );
}
