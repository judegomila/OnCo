import { reviews, type Review } from "@/data/reviews";

const TRACK: Record<Review["track"], { label: string; cls: string }> = {
  expert: { label: "Expert-reviewed", cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" },
  advocate: { label: "Patient-advocate reviewed", cls: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200" },
};

/**
 * Shows who reviewed a page, on which track, when, and their declared conflicts of interest.
 * Renders an "unreviewed" note otherwise, so the absence of review is visible rather than implied.
 */
export function ReviewBadge({ id }: { id: string }) {
  const list = reviews[id] ?? [];
  if (!list.length) {
    return (
      <div className="card p-3 text-xs text-muted">
        <span className="chip bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 mr-2">Not yet reviewed</span>
        Clinicians, scientists, and patient advocates can sign off on this page via the <a className="underline" href="https://github.com/judegomila/OnCo/blob/main/CONTRIBUTING.md#review-tracks" rel="noopener">review tracks</a>.
      </div>
    );
  }
  return (
    <div className="card p-3 text-xs space-y-2">
      {list.map((r, i) => (
        <div key={i}>
          <span className={`chip mr-2 ${TRACK[r.track].cls}`}>{TRACK[r.track].label} {r.date}</span>
          <span className="font-medium">{r.url ? <a className="underline" href={r.url} rel="noopener">{r.reviewer}</a> : r.reviewer}</span>
          <span className="text-muted">, {r.role}</span>
          {r.note && <div className="text-muted mt-1">{r.note}</div>}
          <div className="text-muted mt-1"><span className="kicker mr-1">Conflicts of interest</span>{r.coi}</div>
        </div>
      ))}
    </div>
  );
}
