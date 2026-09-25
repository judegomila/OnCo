/** The monoline glyph of an engine format (src/lib/modular-formats.ts), 24x24, currentColor; server-safe. */
export function FormatGlyph({ glyph, className = "h-5 w-5" }: { glyph: string; className?: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={glyph} /></svg>;
}

/** Section icons of a modality hub, same grammar. */
export const HUB_SECTION_GLYPH: Record<string, string> = {
  how: "M9 18h6M10 21h4M12 3a6 6 0 0 1 3.5 10.9c-.7.5-1 1.2-1 2.1h-5c0-.9-.3-1.6-1-2.1A6 6 0 0 1 12 3Z",
  engine: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM17.5 14v7M14 17.5h7",
  approved: "M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Zm-3 9 2 2 4-4",
  phase3: "M4 5h16l-6 7v5l-4 2v-7L4 5Z",
  parts: "M7 7h6v6H7zM13 10h4M17 8v4M4 17l3-3m0 3-3-3M18 17l2 2m0-2-2 2",
  companies: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01",
  trials: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M8 15h8",
  sideEffects: "M12 3 3 20h18L12 3Zm0 6v5m0 3v1",
  resistance: "M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3ZM5 19 19 5",
  papers: "M6 3h8l4 4v14H6V3Zm8 0v4h4M9 12h6M9 16h6",
  eras: "M4 12h16M7 12v-3m5 3V6m5 6V9M7 12v3m5-3v6m5-6v3",
  ideas: "M12 3a6 6 0 0 1 6 6c0 2.5-1.5 4-3 5.5V17H9v-2.5C7.5 13 6 11.5 6 9a6 6 0 0 1 6-6Zm-3 17h6",
  manufacturing: "M3 21V10l5 3V10l5 3V7l5 3v11H3ZM7 17h2m3 0h2",
};
