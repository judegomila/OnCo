import type { RegStatus, SampleType, TestScope } from "@/data/tumour-tests";

/**
 * Glyphs and tints for the tumour testing page, shared by the server-rendered cards and the client table so a
 * sample, scope or status looks the same wherever it appears.
 */
export const SCOPE_ORDER: TestScope[] = ["exome-transcriptome", "exome", "genome", "targeted-panel", "mrd", "screening"];
export const SAMPLE_ORDER: SampleType[] = ["tissue", "blood", "both"];
export const SAMPLE_LABEL: Record<SampleType, string> = { tissue: "Tissue", blood: "Blood", both: "Tissue or blood" };
export const SAMPLE_PLAIN: Record<SampleType, string> = {
  tissue: "Needs a piece of the tumour, from a biopsy or surgery.",
  blood: "Needs a blood draw and reads the tumour DNA circulating in it.",
  both: "Runs on tumour tissue or on blood, or offers a version of each.",
};
export const SAMPLE_CLASS: Record<SampleType, string> = {
  tissue: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  blood: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
  both: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200",
};
export const SCOPE_CLASS: Record<TestScope, string> = {
  "exome-transcriptome": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  exome: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200",
  genome: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
  "targeted-panel": "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  mrd: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200",
  screening: "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-200",
};
export const REG_CLASS: Record<RegStatus, string> = {
  fda: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
  ce: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200",
  ldt: "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300",
  ruo: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200",
};

const ICON_PROPS = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const SampleIcon = ({ sample, className = "h-3 w-3" }: { sample: SampleType; className?: string }) =>
  sample === "blood" ? <svg {...ICON_PROPS} className={className}><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" /></svg>
  : sample === "tissue" ? <svg {...ICON_PROPS} className={className}><rect x="4" y="4" width="16" height="16" rx="3" /><circle cx="10" cy="10" r="2" /><circle cx="15" cy="14" r="1.5" /></svg>
  : <svg {...ICON_PROPS} className={className}><rect x="3" y="5" width="9" height="14" rx="2" /><path d="M17 5s4 4.5 4 7a4 4 0 0 1-8 0c0-2.5 4-7 4-7z" /></svg>;

export const ScopeIcon = ({ scope, className = "h-3 w-3" }: { scope: TestScope; className?: string }) => {
  switch (scope) {
    case "targeted-panel": return <svg {...ICON_PROPS} className={className}><path d="M4 12h4M10 12h4M16 12h4" /><path d="M6 8v8M12 8v8M18 8v8" /></svg>;
    case "exome": return <svg {...ICON_PROPS} className={className}><path d="M3 12h18" /><rect x="5" y="9" width="4" height="6" /><rect x="14" y="9" width="5" height="6" /></svg>;
    case "exome-transcriptome": return <svg {...ICON_PROPS} className={className}><path d="M3 9h18" /><rect x="5" y="6" width="4" height="6" /><rect x="14" y="6" width="5" height="6" /><path d="M4 17c3-3 5 3 8 0s5 3 8 0" /></svg>;
    case "genome": return <svg {...ICON_PROPS} className={className}><path d="M8 3c0 6 8 6 8 12s-8 6-8 6" /><path d="M16 3c0 6-8 6-8 12s8 6 8 6" /></svg>;
    case "mrd": return <svg {...ICON_PROPS} className={className}><path d="M3 12h4l2-5 3 10 2-5h7" /></svg>;
    case "screening": return <svg {...ICON_PROPS} className={className}><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></svg>;
  }
};

export const StatusIcon = ({ status, className = "h-3 w-3" }: { status: RegStatus; className?: string }) => {
  switch (status) {
    case "fda": return <svg {...ICON_PROPS} className={className}><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "ce": return <svg {...ICON_PROPS} className={className}><path d="M14 7a5 5 0 1 0 0 10" /><path d="M3 12h4M17 12h4" /></svg>;
    case "ldt": return <svg {...ICON_PROPS} className={className}><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" /><path d="M8 15h8" /></svg>;
    case "ruo": return <svg {...ICON_PROPS} className={className}><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /><path d="M11 8v3l2 1" /></svg>;
  }
};

/** Funnel glyph for filter buttons; `filled` marks an active filter. */
export const FilterGlyph = ({ filled, className = "h-3 w-3" }: { filled: boolean; className?: string }) => (
  <svg {...ICON_PROPS} className={className} fill={filled ? "currentColor" : "none"}><path d="M3 5h18l-7 8v6l-4-2v-4L3 5z" /></svg>
);
