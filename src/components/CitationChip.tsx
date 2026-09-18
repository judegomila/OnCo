import { citationFor, citationSourceUrl, citationTooltip } from "@/lib/citations";
import { Tip } from "@/components/Tip";

/**
 * Small "cited N times" pill for a key paper, from the Europe PMC snapshot. Renders nothing when no count
 * has been fetched, so it can sit in any chip strip without a guard.
 */
export function CitationChip({ id, className = "" }: { id: string; className?: string }) {
  const c = citationFor(id);
  if (!c) return null;
  const n = c.citedBy;
  return (
    <Tip title="Citations" text={citationTooltip(c)} href={citationSourceUrl(c)} linkLabel="Open in Europe PMC →">
      <span tabIndex={0} className={`chip bg-foreground/5 tabular-nums cursor-help ${className}`} aria-label={`Cited ${n.toLocaleString("en-GB")} times in Europe PMC`}>
        <svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M7.2 6C4.9 6 3 7.9 3 10.2c0 2.1 1.5 3.8 3.5 4.1-.4 1.6-1.4 2.7-2.7 3.4l1 1.3c2.9-1.5 4.4-4.1 4.4-7.6C9.2 8 8.4 6 7.2 6Zm9.6 0c-2.3 0-4.2 1.9-4.2 4.2 0 2.1 1.5 3.8 3.5 4.1-.4 1.6-1.4 2.7-2.7 3.4l1 1.3c2.9-1.5 4.4-4.1 4.4-7.6C18.8 8 18 6 16.8 6Z" /></svg>
        {n.toLocaleString("en-GB")} {n === 1 ? "citation" : "citations"}
      </span>
    </Tip>
  );
}
