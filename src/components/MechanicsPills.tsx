import Link from "next/link";
import { stagesFor, firstSentence } from "@/lib/mechanics";
import { MechanicsGlyph } from "./MechanicsGlyph";
import { RouteIcon } from "./RouteIcon";
import { Tip } from "./Tip";

/**
 * "Mechanics" pills on a target, pathway, term, technology or drug page: the stages of the mechanics atlas the
 * record appears in (listed on the stage, or drawn as a node in one of its diagrams). Renders nothing when the
 * record is not in the atlas. Server component; glyphs are inline (a few per page).
 */
export function MechanicsPills({ id, className = "" }: { id: string; className?: string }) {
  const stages = stagesFor(id);
  if (!stages.length) return null;
  return (
    <div className={`flex flex-wrap items-center gap-1.5 text-sm ${className}`}>
      <Link href="/mechanics/" className="kicker inline-flex items-center gap-1 hover:text-foreground mr-1"><RouteIcon href="/mechanics/" className="h-3.5 w-3.5" />Mechanics</Link>
      {stages.map((s) => (
        <Tip key={s.stage.id} title={`${s.number} ${s.stage.title}`} text={firstSentence(s.stage.plain)} href={s.route} linkLabel="Open the stage →" inline={false}>
          <Link href={s.route} className="chip border bg-card border-border hover:bg-foreground/5 hover:border-accent/50 inline-flex items-center gap-1.5">
            <MechanicsGlyph id={s.stage.id} className="h-3.5 w-3.5 text-accent" /><span><span className="text-muted tabular-nums mr-1">{s.number}</span>{s.stage.title}</span>
          </Link>
        </Tip>
      ))}
    </div>
  );
}
