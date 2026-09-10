import type { ReactNode } from "react";

/**
 * A closed-by-default fold for content that is accurate but hard to read at first glance: survival
 * tables, death counts, spread maps. The summary line says what is inside and why a reader might
 * want it; a short reassurance paragraph sits above the content. Plain `<details>`, so it works in
 * server components and without JavaScript, and it matches the card and kicker styles used elsewhere.
 */
export function GentleSection({ title, why, reassurance, children, defaultOpen = false, id, className = "", kicker }: {
  /** Noun phrase completing "Show …", e.g. "the survival table". */
  title: string;
  /** One line on why a reader might want this. */
  why?: string;
  /** Short calm paragraph shown above the content once opened. */
  reassurance?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  id?: string;
  className?: string;
  /** Optional small label above the summary line. */
  kicker?: string;
}) {
  return (
    <details id={id} open={defaultOpen || undefined} className={`card group ${className}`}>
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden p-4 flex items-start gap-3 hover:bg-foreground/[0.03] rounded-xl">
        <span aria-hidden className="mt-1 text-muted transition-transform group-open:rotate-90">▸</span>
        <span className="min-w-0">
          {kicker && <span className="kicker block mb-0.5">{kicker}</span>}
          <span className="font-medium"><span className="group-open:hidden">Show </span><span className="hidden group-open:inline">Hide </span>{title}</span>
          {why && <span className="block text-sm text-muted mt-0.5">{why}</span>}
        </span>
      </summary>
      <div className="px-4 pb-4">
        {reassurance && <p className="text-sm text-muted mb-3 border-l-2 border-accent/50 pl-3 leading-relaxed">{reassurance}</p>}
        {children}
      </div>
    </details>
  );
}

/** Default reassurance for population statistics; reused on several pages so the wording stays consistent. */
export const AVERAGES_NOTE = "These are averages across everyone diagnosed, often years ago. Stage, subtype, age, fitness and the treatment received matter more than the average, and for many cancers the numbers are improving quickly.";
