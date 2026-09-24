import type { GeoGlyph as Glyph } from "@/lib/cancer-geography";

/** Line glyphs for the geography layer's pills and section titles: one per `GeoGlyph` name, plus the map controls. */
export type GeoGlyphName = Glyph | "incidence" | "mortality" | "both" | "women" | "men" | "globe" | "list" | "json" | "gap";

const PATHS: Record<GeoGlyphName, string> = {
  river: "M3 6c3 0 3 3 6 3s3-3 6-3 3 3 6 3M3 12c3 0 3 3 6 3s3-3 6-3 3 3 6 3M3 18c3 0 3 3 6 3s3-3 6-3 3 3 6 3",
  mountain: "M3 20l6-11 4 6 2-3 6 8zM9 9l2-4 2 4",
  coast: "M3 17c3 0 3 3 6 3s3-3 6-3 3 3 6 3M4 13l5-9 4 5 3-3 4 7",
  island: "M3 18c3 0 3 3 6 3s3-3 6-3 3 3 6 3M6 15c0-4 3-7 6-7s6 3 6 7M12 8V4M10 5l2-1 2 1",
  people: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20a6 6 0 0 1 12 0M12 20a5 5 0 0 1 10 0",
  registry: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5",
  scalpel: "M4 20l10-10M14 10l6-6M12 8l4 4M4 20l3-1 1-3",
  microbe: "M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3M10 11h.01M14 13h.01",
  grain: "M12 22V10M12 10c-4 0-6-3-6-6 3 0 6 2 6 6zM12 10c4 0 6-3 6-6-3 0-6 2-6 6zM12 16c-4 0-6-3-6-6 3 0 6 2 6 6zM12 16c4 0 6-3 6-6-3 0-6 2-6 6z",
  map: "M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14",
  flag: "M5 22V4M5 4h12l-2 4 2 4H5",
  incidence: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v8M8 12h8",
  mortality: "M3 17l5-6 4 3 4-6 5 5M3 21h18",
  both: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM15 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M12 20a6 6 0 0 1 9 0",
  women: "M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 13v8M9 18h6",
  men: "M10 21a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM14 10l6-6M15 4h5v5",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  json: "M8 4H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2",
  gap: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v5M12 16h.01",
};

export function GeoGlyphIcon({ name, className = "h-3.5 w-3.5" }: { name: GeoGlyphName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={PATHS[name]} />
    </svg>
  );
}
