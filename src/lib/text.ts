/** Split a summary into paragraphs on blank lines. */
export function paragraphs(s: string): string[] {
  return s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

export const STATUS_LABEL: Record<string, string> = {
  approved: "Approved",
  "phase-3": "Phase 3",
  "phase-2": "Phase 2",
  "phase-1": "Phase 1",
  preclinical: "Preclinical",
  concept: "Concept",
  "standard-of-care": "Standard of care",
  established: "Established",
  emerging: "Emerging",
  historic: "Historic",
  withdrawn: "Withdrawn",
  active: "Active",
  completed: "Completed",
  recruiting: "Recruiting",
  positive: "Positive",
  negative: "Negative",
  mixed: "Mixed",
  planned: "Planned",
};

/** Tailwind classes per status; evidence tiers get a consistent visual language. */
export function statusClass(status?: string): string {
  switch (status) {
    case "approved":
    case "standard-of-care":
    case "positive":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200";
    case "phase-3":
    case "established":
    case "completed":
      return "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200";
    case "phase-2":
    case "recruiting":
    case "active":
    case "emerging":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200";
    case "phase-1":
    case "preclinical":
    case "concept":
    case "planned":
      return "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200";
    case "negative":
    case "withdrawn":
      return "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200";
    case "mixed":
    case "historic":
      return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
    default:
      return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
  }
}

export const KIND_COLOR: Record<string, string> = {
  cancer: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-900",
  section: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700",
  technology: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-900",
  target: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-200 dark:border-violet-900",
  drug: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900",
  company: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900",
  institution: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-200 dark:border-teal-900",
  pathway: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-200 dark:border-fuchsia-900",
  term: "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-700",
  trial: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-200 dark:border-indigo-900",
  pairing: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-200 dark:border-orange-900",
  roadmap: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-200 dark:border-cyan-900",
  idea: "bg-lime-50 text-lime-800 border-lime-200 dark:bg-lime-950/40 dark:text-lime-200 dark:border-lime-900",
  collection: "bg-stone-50 text-stone-700 border-stone-200 dark:bg-stone-900 dark:text-stone-200 dark:border-stone-700",
  person: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/40 dark:text-pink-200 dark:border-pink-900",
};
