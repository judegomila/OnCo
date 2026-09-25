import { citationFor, citationSourceUrl, citationTooltip } from "@/lib/citations";
import { Tip } from "@/components/Tip";

/** The quotation-marks mark. One path, drawn inline on a single chip and from the sprite in a list of papers. */
const CITE_PATH = "M7.2 6C4.9 6 3 7.9 3 10.2c0 2.1 1.5 3.8 3.5 4.1-.4 1.6-1.4 2.7-2.7 3.4l1 1.3c2.9-1.5 4.4-4.1 4.4-7.6C9.2 8 8.4 6 7.2 6Zm9.6 0c-2.3 0-4.2 1.9-4.2 4.2 0 2.1 1.5 3.8 3.5 4.1-.4 1.6-1.4 2.7-2.7 3.4l1 1.3c2.9-1.5 4.4-4.1 4.4-7.6C18.8 8 18 6 16.8 6Z";

/**
 * Hidden `<symbol>` for `<CitationChip sprite/>`; render it once in a list that shows a count per paper. The path is
 * 380 bytes, so a page that draws it per card grows with how many of its papers the Europe PMC snapshot covers
 * (scripts/fetch-citations.ts, refreshed weekly): a roadmap with 42 key papers paid 16 KB of markup for the glyph
 * alone, and a refresh that covered the rest of them moved the page past its budget (src/app/heavy-pages.test.ts).
 */
export function CitationChipDefs() {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" style={{ position: "absolute" }}>
      <symbol id="cite-mark" viewBox="0 0 24 24"><path d={CITE_PATH} /></symbol>
    </svg>
  );
}

/**
 * Small "cited N times" pill for a key paper, from the Europe PMC snapshot. Renders nothing when no count
 * has been fetched, so it can sit in any chip strip without a guard. With `sprite` the glyph is a `<use>` of
 * the symbol <CitationChipDefs/> registered on the page, which keeps a list of papers light.
 */
export function CitationChip({ id, className = "", sprite = false }: { id: string; className?: string; sprite?: boolean }) {
  const c = citationFor(id);
  if (!c) return null;
  const n = c.citedBy;
  return (
    <Tip title="Citations" text={citationTooltip(c)} href={citationSourceUrl(c)} linkLabel="Open in Europe PMC →">
      <span tabIndex={0} className={`chip cite ${className}`} aria-label={`Cited ${n.toLocaleString("en-GB")} times in Europe PMC`}>
        <svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">{sprite ? <use href="#cite-mark" /> : <path d={CITE_PATH} />}</svg>
        {n.toLocaleString("en-GB")} {n === 1 ? "citation" : "citations"}
      </span>
    </Tip>
  );
}
