import Link from "next/link";
import { SUPPORTIVE_GLYPH, SUPPORTIVE_LABEL, supportiveTableHref, supportiveTip } from "@/lib/supportive-care";
import { Tip } from "./Tip";

/** The supportive care glyph (a hand holding a heart), drawn at 24 by 24 with a 2 px stroke like the other pill glyphs. */
export function SupportiveGlyph({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={SUPPORTIVE_GLYPH} /></svg>;
}

const pill = "chip border bg-card border-border hover:bg-foreground/5 hover:border-accent/50 inline-flex items-center gap-1.5 text-xs";

/**
 * The "Supportive care" pill on a drug page: one glyph, one label, a one-line tooltip saying the medicine controls
 * symptoms or toxicity rather than treating the cancer, and a link to /drugs/ filtered to supportive care. Rendered
 * only for records with `supportive: true`. Server component.
 */
export function SupportivePill({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`} data-supportive-care>
      <Tip title={SUPPORTIVE_LABEL} text={supportiveTip()} href={supportiveTableHref()} linkLabel="All supportive care medicines →" inline={false}>
        <Link href={supportiveTableHref()} className={`${pill} bg-teal-50 border-teal-200 text-teal-900 dark:bg-teal-950/40 dark:border-teal-800 dark:text-teal-100`}><SupportiveGlyph className="h-3.5 w-3.5 text-teal-700 dark:text-teal-300" />{SUPPORTIVE_LABEL}</Link>
      </Tip>
      <span className="text-xs text-muted">Controls symptoms or treatment toxicity; not a treatment of the cancer.</span>
    </div>
  );
}

/** Inline mark for supportive care references inside a standard-of-care row: glyph plus a short label, linking to the filtered table. */
export function SupportiveMark() {
  return (
    <Link href={supportiveTableHref()} className="inline-flex items-center gap-1 text-xs text-muted hover:text-foreground" title={supportiveTip()}>
      <SupportiveGlyph className="h-3.5 w-3.5 text-teal-700 dark:text-teal-300" />Supportive care, not a treatment of the cancer:
    </Link>
  );
}
