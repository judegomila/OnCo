import type { ReactNode } from "react";
import type { SectionGlyphName } from "@/lib/record-sections";

/** One line glyph per record section (src/lib/record-sections.ts), drawn inline so the strip and the cards need no dependency. Works in server and client trees. */
export function SectionGlyph({ name, className = "h-4 w-4" }: { name: SectionGlyphName; className?: string }) {
  const paths: Record<SectionGlyphName, ReactNode> = {
    compass: <><circle cx="12" cy="12" r="9" /><path d="M15 9l-2 5-5 2 2-5 5-2Z" /></>,
    anatomy: <><path d="M12 3c-3 0-5 2-5 5 0 2 1 3 1 5v8h8v-8c0-2 1-3 1-5 0-3-2-5-5-5Z" /><path d="M9 13h6" /></>,
    magnifier: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></>,
    pill: <><rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)" /><path d="M9.2 14.8l5.6-5.6" /></>,
    flask: <><path d="M9 3h6" /><path d="M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3" /><path d="M7 15h10" /></>,
    dna: <><path d="M6 3c0 6 12 6 12 12M18 3c0 6-12 6-12 12" /><path d="M6 21c0-2 1-3 3-4M18 21c0-2-1-3-3-4" /><path d="M7.5 7.5h9M7.5 16.5h9" /></>,
    pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
    heart: <><path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7.2 4.5 4.5 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" /></>,
    rocket: <><path d="M14 4c3 0 6 3 6 6l-8 8-4-4 6-10Z" /><path d="M8 14l-4 1 3-5M10 16l-1 4 5-3" /><circle cx="15" cy="9" r="1.2" /></>,
    braces: <><path d="M8 4c-2 0-3 1-3 3v3c0 1-1 2-2 2 1 0 2 1 2 2v3c0 2 1 3 3 3" /><path d="M16 4c2 0 3 1 3 3v3c0 1 1 2 2 2-1 0-2 1-2 2v3c0 2-1 3-3 3" /></>,
  };
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{paths[name]}</svg>;
}
