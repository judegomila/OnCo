import { EDGE_KINDS, EDGE_KIND_META, type EdgeKind } from "@/lib/edge-kinds";

/** The Edge mark: a signal rising to its newest point. Shared with RouteIcon ("/edge/"). */
export const EDGE_PATH = "M3 17l6-6 4 4 8-8M15 7h6v6";

const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/**
 * Monoline glyph for an Edge kind; `all` draws the Edge mark itself. Server-safe (no hooks), used by the page and the
 * filter pills. With `symbol`, the glyph is a `<use>` of the shared definitions from <EdgeGlyphDefs/> (one path per
 * kind on the page instead of one per card), which keeps the 200-card feed light.
 */
export function EdgeGlyph({ kind, className = "h-4 w-4", symbol = false }: { kind: EdgeKind | "all"; className?: string; symbol?: boolean }) {
  if (symbol) return <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className} {...STROKE}><use href={`#edge-${kind}`} /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className} {...STROKE}><path d={kind === "all" ? EDGE_PATH : EDGE_KIND_META[kind].path} /></svg>;
}

/** Hidden `<symbol>` per kind for `<EdgeGlyph symbol/>`; render once on the page, before the first use. */
export function EdgeGlyphDefs() {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" style={{ position: "absolute" }}>
      <symbol id="edge-all" viewBox="0 0 24 24"><path d={EDGE_PATH} /></symbol>
      {EDGE_KINDS.map((k) => <symbol key={k} id={`edge-${k}`} viewBox="0 0 24 24"><path d={EDGE_KIND_META[k].path} /></symbol>)}
    </svg>
  );
}
