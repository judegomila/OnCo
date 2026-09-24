import Link from "next/link";
import { TARGET_DISTRIBUTION_LABEL, TARGET_SPECIFICITY_LABEL, type TargetDistribution, type TargetSpecificity } from "@/lib/kinds";
import { DISTRIBUTION_GLYPH, distributionTableHref, distributionTip, SPECIFICITY_GLYPH, specificityTableHref, specificityTip, tumourAgnosticTableHref } from "@/lib/target-specificity";
import { Tip } from "./Tip";

/** One glyph path drawn at 24 by 24 with a 2 px stroke, the gene hub's convention. */
export function SpecificityGlyph({ d, className = "h-3.5 w-3.5" }: { d: string; className?: string }) {
  return <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
}

const pill = "chip border bg-card border-border hover:bg-foreground/5 hover:border-accent/50 inline-flex items-center gap-1.5 text-xs";

/**
 * The specificity and distribution pills on a target page: is the target unique to cancer cells, shared with normal
 * tissue or a lineage, everywhere, inherited, or on immune cells; and does it matter in one cancer type, a few or many.
 * Each pill carries a one-sentence tooltip (the class, then what it means for a medicine) and links to the target
 * browser filtered to the class. Renders nothing for a target without a classification. Server component.
 */
export function TargetSpecificityPills({ target, className = "" }: {
  target: { id: string; specificity?: TargetSpecificity; distribution?: TargetDistribution; tumourAgnostic?: boolean; specificityNote?: string; specificitySources: { label: string; url: string; note?: string }[] };
  className?: string;
}) {
  const { specificity, distribution, tumourAgnostic } = target;
  if (!specificity && !distribution) return null;
  return (
    <div className={className} data-target-specificity>
      <div className="flex flex-wrap items-center gap-1.5">
        <Link href="/targets/specificity/" className="kicker inline-flex items-center gap-1 hover:text-foreground mr-1" title="What the specificity classes mean, with examples">Specificity</Link>
        {specificity && (
          <Tip title={TARGET_SPECIFICITY_LABEL[specificity]} text={specificityTip(specificity)} href={specificityTableHref(specificity)} linkLabel="All targets in this class →" inline={false}>
            <Link href={specificityTableHref(specificity)} className={pill} data-specificity={specificity}><SpecificityGlyph d={SPECIFICITY_GLYPH[specificity]} className="h-3.5 w-3.5 text-accent" />{TARGET_SPECIFICITY_LABEL[specificity]}</Link>
          </Tip>
        )}
        {distribution && (
          <Tip title={TARGET_DISTRIBUTION_LABEL[distribution]} text={distributionTip(distribution, tumourAgnostic)} href={distributionTableHref(distribution)} linkLabel="All targets with this distribution →" inline={false}>
            <Link href={distributionTableHref(distribution)} className={pill} data-distribution={distribution}><SpecificityGlyph d={DISTRIBUTION_GLYPH[distribution]} className="h-3.5 w-3.5 text-accent" />{TARGET_DISTRIBUTION_LABEL[distribution]}</Link>
          </Tip>
        )}
        {tumourAgnostic && (
          <Tip title="Tumour-agnostic" text="A label approval or threshold for a medicine aimed at this target is tissue-agnostic: any tumour that carries the alteration or the expression level may be treated, whatever organ it started in. Broad tumour profiling is how it is found." href={tumourAgnosticTableHref()} linkLabel="All tumour-agnostic targets →" inline={false}>
            <Link href={tumourAgnosticTableHref()} className={`${pill} bg-accent/10 border-accent/30`} data-tumour-agnostic><SpecificityGlyph d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-2.7L7 19l1-6-4-4 5.5-.5z" className="h-3.5 w-3.5 text-accent" />Tumour-agnostic approval</Link>
          </Tip>
        )}
      </div>
      {target.specificityNote && (
        <details className="mt-2 text-sm text-muted max-w-3xl">
          <summary className="cursor-pointer hover:text-foreground">Why it reads this way, and the data behind it</summary>
          <p className="mt-1 leading-relaxed">{target.specificityNote}</p>
          {target.specificitySources.length > 0 && (
            <p className="mt-1 text-xs">
              <span className="font-medium text-foreground">Sources:</span>{" "}
              {target.specificitySources.map((s, i) => <span key={s.url}>{i > 0 && "; "}<a className="underline hover:text-foreground" href={s.url} rel="noopener" title={s.note}>{s.label}</a></span>)}
            </p>
          )}
        </details>
      )}
    </div>
  );
}
