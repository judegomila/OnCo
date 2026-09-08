import type { Drug } from "@/lib/schema";

type Tox = Drug["toxicity"][number];

/** Adverse events with any-grade and grade 3+ bars. Percentages only where read from a source. */
export function ToxicityTable({ toxicity, compact = false }: { toxicity: Tox[]; compact?: boolean }) {
  if (!toxicity.length) return null;
  const sources = [...new Set(toxicity.map((t) => t.source).filter((s): s is string => !!s))];
  const notes = [...new Set(toxicity.map((t) => t.note).filter((n): n is string => !!n))];
  const hasNumbers = toxicity.some((t) => t.anyGradePct !== undefined || t.grade3PlusPct !== undefined);
  return (
    <div className={compact ? "" : "card p-4"}>
      {!compact && <div className="kicker mb-2">Toxicity profile</div>}
      <table className="onco">
        <thead><tr><th>Adverse event</th>{hasNumbers && <><th className="w-40">Any grade</th><th className="w-40">Grade 3+</th></>}</tr></thead>
        <tbody>
          {toxicity.map((t, i) => (
            <tr key={i}>
              <td>{t.event}{t.note && !notes.includes(t.note) && <div className="text-xs text-muted">{t.note}</div>}{t.note && notes.length > 1 && notes.includes(t.note) && <div className="text-xs text-muted">{t.note}</div>}</td>
              {hasNumbers && <>
                <td><Bar pct={t.anyGradePct} tone="bg-amber-400/70" /></td>
                <td><Bar pct={t.grade3PlusPct} tone="bg-rose-500/80" /></td>
              </>}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-muted mt-2">
        {notes.length === 1 && <>{notes[0]}. </>}
        {sources.length > 0 ? <>Rates read from {sources.map((s, i) => <a key={s} className="underline" href={s} rel="noopener">{sources.length > 1 ? `source ${i + 1}` : s.includes("dailymed") ? "the US prescribing information" : "the source"}</a>)}. </> : <>Events listed without rates were not read from a primary source; see the label. </>}
        Blank cells mean the figure was not sourced, not that it is zero.
      </p>
    </div>
  );
}

function Bar({ pct, tone }: { pct?: number; tone: string }) {
  if (pct === undefined) return <span className="text-muted">—</span>;
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 rounded bg-foreground/5 overflow-hidden"><div className={`h-full ${tone}`} style={{ width: `${Math.min(100, pct)}%` }} /></div>
      <span className="tabular-nums text-xs w-10 text-right">{pct}%</span>
    </div>
  );
}
