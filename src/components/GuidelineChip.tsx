type Guideline = { nccn?: string; esmoMcbs?: string; version?: string; url?: string };

const clip = (s: string) => (s.length > 44 ? s.slice(0, 43) + "…" : s);

/** NCCN category and ESMO-MCBS grade chips for a standard-of-care row, with a link to the guideline or scorecard source. */
export function GuidelineChip({ g }: { g?: Guideline }) {
  if (!g) return null;
  const chips = (
    <>
      {g.nccn && <span className="chip bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200" title={`NCCN: ${g.nccn}`}>NCCN · {clip(g.nccn)}</span>}
      {g.esmoMcbs && <span className="chip bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200" title={`ESMO-MCBS: ${g.esmoMcbs}`}>ESMO-MCBS · {clip(g.esmoMcbs)}</span>}
      {!g.nccn && !g.esmoMcbs && g.version && <span className="chip bg-foreground/5 text-muted">{g.version}</span>}
    </>
  );
  const cls = "inline-flex flex-wrap gap-1.5 items-center";
  return g.url
    ? <a href={g.url} rel="noopener" className={`${cls} hover:opacity-90`} title={g.version}>{chips}</a>
    : <span className={cls} title={g.version}>{chips}</span>;
}
