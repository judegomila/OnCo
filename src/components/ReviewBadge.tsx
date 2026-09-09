import Link from "next/link";
import { reviews, type Review } from "@/data/reviews";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { reviewIssueUrl, reviewerCount, reviewerLevel, tracksFor, TRACK_META } from "@/lib/review-queue";

const TRACK: Record<Review["track"], { label: string; cls: string }> = {
  expert: { label: "Expert-reviewed", cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" },
  advocate: { label: "Patient-advocate reviewed", cls: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200" },
};

/**
 * Shows who reviewed a page, on which track, when, and their declared conflicts of interest, with a
 * level chip from how many pages that reviewer has signed off and a link to the roster. Renders an
 * "unreviewed" note otherwise, so the absence of review is visible rather than implied, with the
 * "Review this page" issue form as the way in.
 */
export function ReviewBadge({ id }: { id: string }) {
  const list = reviews[id] ?? [];
  const e = graph().get(id);
  if (!list.length) {
    const needs = e ? tracksFor(e.kind) : [];
    return (
      <div className="card p-3 text-xs text-muted">
        <span className="chip bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 mr-2">Not yet reviewed</span>
        {needs.length ? <>Needs {needs.map((t) => TRACK_META[t].label.toLowerCase()).join(" and ")} review. </> : null}
        {e && needs.length ? <><a className="underline" href={reviewIssueUrl(e)} rel="noopener">Review this page</a> or see the </> : "See the "}
        <Link className="underline" href="/review/">review queue</Link> and <Link className="underline" href="/reviewers/">roster</Link>.
      </div>
    );
  }
  return (
    <div className="card p-3 text-xs space-y-2">
      {list.map((r, i) => {
        const n = reviewerCount(r);
        const level = reviewerLevel(n);
        const person = r.personId ? graph().get(r.personId) : undefined;
        const href = person ? routeFor(person) : r.url;
        return (
          <div key={i}>
            <span className={`chip mr-2 ${TRACK[r.track].cls}`}>{TRACK[r.track].label} {r.date}</span>
            <span className="font-medium">{href ? <a className="underline" href={href} rel={person ? undefined : "noopener"}>{r.reviewer}</a> : r.reviewer}</span>
            <span className="text-muted">, {r.role}</span>
            <Link href="/reviewers/" className="chip ml-2 bg-foreground/5 hover:bg-foreground/10" title={`${level.label}: ${n} page${n === 1 ? "" : "s"} signed off. See the roster.`}>{level.label} · {n}</Link>
            {r.note && <div className="text-muted mt-1">{r.note}</div>}
            <div className="text-muted mt-1"><span className="kicker mr-1">Conflicts of interest</span>{r.coi}</div>
          </div>
        );
      })}
      {e && <div className="text-muted"><a className="underline" href={reviewIssueUrl(e)} rel="noopener">Add a review</a> on another track or a later date.</div>}
    </div>
  );
}
