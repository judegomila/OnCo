import Link from "next/link";
import { MECHANICS } from "@/data/mechanics-atlas";
import { firstSentence } from "@/lib/mechanics";
import { MechanicsGlyph } from "./MechanicsGlyph";
import { MotionScope } from "./MotionScope";
import { Tip } from "./Tip";

/**
 * The journey through the atlas as one continuous figure: a horizontal spine with a glyph per stage, grouped
 * under chapter labels, that scrolls sideways when the screen is narrower than the 56 stages. The active stage is
 * pink; a small pulse travels the spine (CSS only, class `motion-css`, paused off screen and under reduced motion).
 * Each node is a link to the stage page with the stage's first sentence as a tooltip. Server component; the
 * markup is one <ol> per chapter and stays small because the glyphs come from the sprite (MechanicsGlyphDefs).
 */
export function MechanicsJourney({ active, compact = false, hash }: { active?: string; compact?: boolean; hash?: string }) {
  const size = compact ? "h-8 w-8" : "h-10 w-10";
  const glyph = compact ? "h-4 w-4" : "h-5 w-5";
  return (
    <MotionScope className="mech-journey relative -mx-4 sm:-mx-6 px-4 sm:px-6 overflow-x-auto no-scrollbar">
      <ol className="relative flex items-start gap-6 sm:gap-8 min-w-max py-2" aria-label="The journey through the atlas">
        <span aria-hidden className="mech-spine absolute left-4 right-4 sm:left-6 sm:right-6" style={{ top: compact ? "calc(1.25rem + 1rem)" : "calc(1.25rem + 1.25rem)" }} />
        <span aria-hidden className="mech-pulse motion-css absolute" style={{ top: compact ? "calc(1.25rem + 1rem)" : "calc(1.25rem + 1.25rem)" }} />
        {MECHANICS.map((c, ci) => (
          <li key={c.id} className="relative">
            <Link href={`/mechanics/#c-${c.id}`} className="kicker block whitespace-nowrap hover:text-foreground h-5 leading-5">
              <span className="tabular-nums mr-1 opacity-70">{ci + 1}</span>{c.title}
            </Link>
            <ol className="mt-0 flex items-start gap-1.5 sm:gap-2">
              {c.stages.map((s, si) => {
                const on = s.id === active;
                return (
                  <li key={s.id} className="relative">
                    <Tip title={`${ci + 1}.${si + 1} ${s.title}`} text={firstSentence(s.plain)} href={`/mechanics/${s.id}/${hash ?? ""}`} linkLabel="Open the stage →" inline={false}>
                      <Link href={`/mechanics/${s.id}/${hash ?? ""}`} aria-current={on ? "page" : undefined}
                        className={`mech-node relative inline-flex ${size} items-center justify-center rounded-full border transition-[transform,box-shadow] ${on ? "bg-accent text-white border-accent shadow-md scale-110" : "bg-card border-border text-foreground/80 hover:text-accent hover:border-accent/60 hover:-translate-y-0.5"}`}>
                        <MechanicsGlyph id={s.id} className={glyph} sprite />
                        <span className="sr-only">{s.title}</span>
                      </Link>
                    </Tip>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </MotionScope>
  );
}
