import Link from "next/link";
import { Tip } from "./Tip";

export type BottleneckLite = { id: string; name: string; tldr: string; route: string; stage: string; severity: "critical" | "major" | "moderate"; ideas: number };

/** Order and plain names of the stages the war on cancer runs through, left to right. */
export const STAGES: Array<{ id: string; label: string; hint: string }> = [
  { id: "biology", label: "Understand the disease", hint: "Biology we cannot yet see, model or drug." },
  { id: "prevention-detection", label: "Prevent and find early", hint: "Stopping cancer or catching it while it is curable." },
  { id: "trials", label: "Test in people", hint: "Getting answers from clinical trials faster and for everyone." },
  { id: "regulation-manufacturing", label: "Approve and make", hint: "Regulators, factories, isotopes and prices." },
  { id: "access-delivery", label: "Deliver care", hint: "Getting proven care to every patient, everywhere." },
  { id: "data-knowledge", label: "Learn from every patient", hint: "Data, evidence, knowledge and AI that reach practice." },
  { id: "funding-incentives", label: "Pay for the right things", hint: "Money and incentives pointed at what matters." },
  { id: "people-culture", label: "People and culture", hint: "Patients, quality of life and trust." },
];

const SEV: Record<BottleneckLite["severity"], { dot: string; ring: string; label: string }> = {
  critical: { dot: "bg-red-600", ring: "border-red-300 dark:border-red-900", label: "Critical: slows everything downstream" },
  major: { dot: "bg-amber-500", ring: "border-amber-300 dark:border-amber-900", label: "Major: a large, recognised drag" },
  moderate: { dot: "bg-zinc-400", ring: "border-border", label: "Moderate: real but contained" },
};

/**
 * The war on cancer as a pipeline: eight stages left to right, the bottlenecks that bite at each,
 * sized by severity and annotated with how many ideas attack them. Server component; hover for TL;DRs.
 */
export function BottleneckMap({ items }: { items: BottleneckLite[] }) {
  const totalIdeas = items.reduce((a, b) => a + b.ideas, 0);
  return (
    <div className="mb-10">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
        <div className="kicker">The pipeline and where it clogs</div>
        <div className="text-sm text-muted tabular-nums">{items.length} bottlenecks · {totalIdeas.toLocaleString()} ideas aimed at them</div>
        <div className="ml-auto flex items-center gap-3 text-xs text-muted">
          {(["critical", "major", "moderate"] as const).map((s) => <span key={s} className="inline-flex items-center gap-1"><span className={`inline-block h-2.5 w-2.5 rounded-full ${SEV[s].dot}`} />{s}</span>)}
        </div>
      </div>
      {/* Flow line */}
      <div className="relative">
        <div aria-hidden className="absolute left-0 right-0 top-5 hidden lg:block h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          {STAGES.map((st, i) => {
            const here = items.filter((b) => b.stage === st.id).sort((a, b) => (a.severity === b.severity ? b.ideas - a.ideas : a.severity === "critical" ? -1 : b.severity === "critical" ? 1 : a.severity === "major" ? -1 : 1));
            const nIdeas = here.reduce((a, b) => a + b.ideas, 0);
            const nCrit = here.filter((b) => b.severity === "critical").length;
            return (
              <li key={st.id} className="card p-3 relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold tabular-nums">{i + 1}</span>
                  <Tip title={st.label} text={st.hint}><span className="text-sm font-semibold leading-tight cursor-help">{st.label}</span></Tip>
                </div>
                <div className="text-xs text-muted tabular-nums mb-2">{here.length} bottlenecks{nCrit ? ` · ${nCrit} critical` : ""} · {nIdeas} ideas</div>
                <ul className="space-y-1">
                  {here.map((b) => (
                    <li key={b.id}>
                      <Tip title={b.name} text={b.tldr} href={b.route}>
                        <Link href={b.route} className={`flex items-start gap-1.5 rounded-md border px-2 py-1 text-xs leading-snug hover:bg-foreground/5 ${SEV[b.severity].ring}`}>
                          <span className={`mt-1 inline-block h-2 w-2 shrink-0 rounded-full ${SEV[b.severity].dot}`} aria-label={SEV[b.severity].label} />
                          <span className="flex-1 min-w-0 break-words">{b.name}</span>
                          <span className="text-muted tabular-nums shrink-0">{b.ideas}</span>
                        </Link>
                      </Tip>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="text-xs text-muted mt-2">Numbers on the right of each bottleneck are ideas in the corpus that attack it. Hover anything for the one-line version.</p>
    </div>
  );
}
