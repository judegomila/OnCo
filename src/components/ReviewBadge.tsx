import { reviews } from "@/data/reviews";

/**
 * Shows who reviewed a page and when. Renders an "unreviewed" note otherwise, so the absence
 * of review is visible rather than implied. Integrate in EntityDetail's aside.
 */
export function ReviewBadge({ id }: { id: string }) {
  const r = reviews[id];
  if (!r) {
    return (
      <div className="card p-3 text-xs text-muted">
        <span className="chip bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 mr-2">Not yet expert-reviewed</span>
        Clinicians and scientists can sign off on this page via the <a className="underline" href="https://github.com/judegomila/OnCo/blob/main/CONTRIBUTING.md#expert-review-track" rel="noopener">review track</a>.
      </div>
    );
  }
  return (
    <div className="card p-3 text-xs">
      <span className="chip bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 mr-2">Expert-reviewed {r.date}</span>
      <span className="font-medium">{r.url ? <a className="underline" href={r.url} rel="noopener">{r.reviewer}</a> : r.reviewer}</span>
      <span className="text-muted">, {r.role}</span>
      {r.note && <div className="text-muted mt-1">{r.note}</div>}
    </div>
  );
}
