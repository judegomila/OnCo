"use client";

import { MoleculeThumb } from "./MoleculeThumb";
import { STRUCTURES } from "@/lib/structures";
import { Tip } from "./Tip";

/** What kind of product this is when there is no small molecule to draw, inferred from the modality text. */
export function placeholderKind(modality?: string): { id: string; label: string; why: string } {
  const m = (modality ?? "").toLowerCase();
  if (/antibody-drug|adc|conjugate/.test(m)) return { id: "adc", label: "Antibody-drug conjugate", why: "An antibody carrying a payload: too large for a small-molecule drawing. The payload itself has a structure on its own page." };
  if (/bispecific|engager|antibody|mab\b|checkpoint/.test(m)) return { id: "antibody", label: "Antibody", why: "A protein of about 150,000 atoms; shown as its Y shape rather than a wireframe." };
  if (/car-t|car t|tcr|til\b|cell therapy|cell-therapy|nk cell|lymphocyte/.test(m)) return { id: "cell", label: "Cell therapy", why: "Living cells, not a molecule." };
  if (/vaccine|mrna|oncolytic|virus|gene therapy/.test(m)) return { id: "vaccine", label: "Vaccine or viral therapy", why: "Nucleic acid, protein or a whole virus rather than one molecule." };
  if (/radioligand|radiopharm|isotope|lutetium|actinium|radium|iodine/.test(m)) return { id: "radio", label: "Radiopharmaceutical", why: "A radioactive atom on a carrier; the carrier's structure is shown where known." };
  if (/test|assay|diagnostic|sequencing|panel|device|software|imaging/.test(m)) return { id: "test", label: "Test or device", why: "Not a drug, so there is no molecule." };
  if (/cytokine|fusion|enzyme|protein|peptide|hormone analogue/.test(m)) return { id: "protein", label: "Protein therapeutic", why: "A large protein; no small-molecule drawing." };
  return { id: "none", label: "No structure yet", why: "We have not sourced a structure for this product yet." };
}

function Glyph({ id }: { id: string }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "antibody": return <svg viewBox="0 0 32 32" aria-hidden {...s}><path d="M16 29V15M16 15 7 5M16 15l9-10M9.5 7.5 12 10M22.5 7.5 20 10" /></svg>;
    case "adc": return <svg viewBox="0 0 32 32" aria-hidden {...s}><path d="M16 29V15M16 15 7 5M16 15l9-10" /><circle cx="24" cy="24" r="3.2" fill="currentColor" stroke="none" /><path d="M16 22h3" /></svg>;
    case "cell": return <svg viewBox="0 0 32 32" aria-hidden {...s}><path d="M16 4c6 0 12 5 12 12s-5 12-12 12S4 23 4 16 10 4 16 4Z" /><circle cx="14" cy="15" r="4" /><circle cx="22" cy="21" r="1.2" fill="currentColor" stroke="none" /></svg>;
    case "vaccine": return <svg viewBox="0 0 32 32" aria-hidden {...s}><path d="M6 26l6-6M10 22l10-10 2 2-10 10M18 10l4-4M20 6l6 6M24 8l2-2" /></svg>;
    case "radio": return <svg viewBox="0 0 32 32" aria-hidden {...s}><circle cx="16" cy="16" r="2.2" fill="currentColor" stroke="none" /><ellipse cx="16" cy="16" rx="12" ry="5" /><ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(120 16 16)" /></svg>;
    case "test": return <svg viewBox="0 0 32 32" aria-hidden {...s}><rect x="6" y="6" width="20" height="20" rx="3" /><path d="M11 16h10M11 12h6M11 20h8" /></svg>;
    case "protein": return <svg viewBox="0 0 32 32" aria-hidden {...s}><path d="M6 20c3-8 6 8 9 0s6-8 9 0M8 12c2-3 4 3 6 0s4-3 6 0" /></svg>;
    default: return <svg viewBox="0 0 32 32" aria-hidden {...s} strokeDasharray="3 3"><path d="M16 4l10 6v12l-10 6-10-6V10Z" /></svg>;
  }
}

/**
 * A fixed-size slot for a product's molecule. Shows the rotating wireframe when a structure exists and an
 * explained placeholder glyph when it does not, so tables and cards line up whichever it is.
 */
export function MoleculeSlot({ drugId, modality, className = "h-10 w-10", name }: { drugId: string; modality?: string; className?: string; name?: string }) {
  if (STRUCTURES[drugId]) return <span className={`inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-card overflow-hidden ${className}`}><MoleculeThumb drugId={drugId} className="h-full w-full" /></span>;
  const p = placeholderKind(modality);
  return (
    <Tip title={p.label} text={p.why}>
      <span className={`inline-flex shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-surface text-muted/70 overflow-hidden cursor-help ${className}`} aria-label={`${name ?? drugId}: ${p.label.toLowerCase()}, no molecule drawing`}>
        <span className="h-[60%] w-[60%]"><Glyph id={p.id} /></span>
      </span>
    </Tip>
  );
}
