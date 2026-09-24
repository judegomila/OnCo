import Link from "next/link";
import { CHECKPOINT_HUB, checkpointRefsFor } from "@/lib/checkpoints";
import { CheckpointGlyph } from "./CheckpointGlyph";
import { Tip } from "./Tip";

/**
 * "Checkpoint families" pills on a record page: the member's own row in its hub (for the targets in the map) or the
 * hub(s) a glossary term, pathway, technology or mechanics stage concerns. Renders nothing for other records.
 * Server component; the glyphs are inline.
 */
export function CheckpointPills({ id, className = "" }: { id: string; className?: string }) {
  const refs = checkpointRefsFor(id);
  if (!refs.member && refs.hubs.length === 0) return null;
  return (
    <div className={`flex flex-wrap items-center gap-1.5 text-sm ${className}`} data-checkpoint-pills>
      <Link href="/checkpoints/" className="kicker inline-flex items-center gap-1 hover:text-foreground mr-1"><CheckpointGlyph id="families" className="h-3.5 w-3.5" />Checkpoint families</Link>
      {refs.member ? (
        <Tip title={`${refs.member.member.label} · ${refs.member.cls.name}`} text={refs.member.member.expressedOn.text} href={refs.member.route} linkLabel="Open its row →" inline={false}>
          <Link href={refs.member.route} className="chip border bg-card border-border hover:bg-foreground/5 hover:border-accent/50 inline-flex items-center gap-1.5">
            <CheckpointGlyph id={refs.member.cls.tone} className="h-3.5 w-3.5 text-accent" /><span>{refs.member.cls.name}</span>
          </Link>
        </Tip>
      ) : refs.hubs.map((root) => (
        <Tip key={root} title={CHECKPOINT_HUB[root].title} text={root === "immune" ? "Receptors and ligands that hold immune cells back, with every drug against them." : "The gates a dividing cell passes and the drugs that force or hold them."} href={CHECKPOINT_HUB[root].route} linkLabel="Open the hub →" inline={false}>
          <Link href={CHECKPOINT_HUB[root].route} className="chip border bg-card border-border hover:bg-foreground/5 hover:border-accent/50 inline-flex items-center gap-1.5">
            <CheckpointGlyph id={root} className="h-3.5 w-3.5 text-accent" /><span>{CHECKPOINT_HUB[root].title}</span>
          </Link>
        </Tip>
      ))}
    </div>
  );
}
