import Link from "next/link";
import type { Entity } from "@/lib/schema";
import { classify } from "@/lib/modular";
import { formatById, formatsForTechnology, modalityRoute, type FormatDef } from "@/lib/modular-formats";
import { FormatGlyph } from "./FormatGlyph";
import { Tip } from "./Tip";

/**
 * "Modality" pills on a record page: the hub(s) of the format a technology record describes (FORMAT_TECHNOLOGIES) or
 * the format the open drug engine files a medicine under. Renders nothing for other records and for medicines the
 * engine keeps outside its formats (chemotherapies, tests, devices). Server component; the glyphs are inline.
 */
export function ModalityPills({ e, className = "" }: { e: Entity; className?: string }) {
  let formats: FormatDef[] = [];
  if (e.kind === "technology") formats = formatsForTechnology(e.id);
  else if (e.kind === "drug") { const c = classify(e); if ("format" in c) { const f = formatById(c.format); if (f) formats = [f]; } }
  if (!formats.length) return null;
  return (
    <div className={`flex flex-wrap items-center gap-1.5 text-sm ${className}`} data-modality-pills>
      <Link href={modalityRoute()} className="kicker inline-flex items-center gap-1 hover:text-foreground mr-1">Modality</Link>
      {formats.map((f) => (
        <Tip key={f.id} title={f.name} text={f.blurb} href={modalityRoute(f.id)} linkLabel="Open the hub →" inline={false}>
          <Link href={modalityRoute(f.id)} className="chip border bg-card border-border hover:bg-foreground/5 hover:border-accent/50 inline-flex items-center gap-1.5">
            <FormatGlyph glyph={f.glyph} className="h-3.5 w-3.5 text-accent" /><span>{f.name}</span>
          </Link>
        </Tip>
      ))}
    </div>
  );
}
