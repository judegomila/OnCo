import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, KindChip, PageHeader } from "@/components/ui";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { issueUrl } from "@/lib/issue-links";
import { LEVELS, reviewerRoster } from "@/lib/review-queue";

export const metadata: Metadata = pageMeta({ title: "Reviewer roster", description: "The clinicians, scientists and patient advocates who have signed off OnCo pages: what they reviewed, on which track, and their declared conflicts of interest.", path: "/reviewers/" });

const TRACK_LABEL = { expert: "Expert", advocate: "Patient advocate" } as const;

export default function ReviewersPage() {
  const roster = reviewerRoster();
  const g = graph();
  const joinUrl = issueUrl("review", {}, { title: "review: " });

  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Reviewer roster"
        lede={roster.length
          ? `${roster.length} named reviewer${roster.length === 1 ? "" : "s"} have signed off ${roster.reduce((a, r) => a + r.count, 0)} page reviews. Every entry names the person, their role, what they reviewed and their conflicts of interest.`
          : "Nobody has signed off a page yet. Review badges name a person, a date and a conflict-of-interest statement; this roster lists everyone who has done so, with a level by count of pages reviewed. The first name here could be yours."} />
      <Container className="pb-16">
        <div className="grid gap-3 sm:grid-cols-3 mb-8 max-w-3xl">
          {LEVELS.map((l) => (
            <div key={l.label} className="card p-4"><div className="kicker mb-1">{l.label}</div><div className="text-sm">{l.blurb}</div><div className="text-xs text-muted mt-1">{roster.filter((r) => r.level.label === l.label).length} on the roster</div></div>
          ))}
        </div>
        <p className="text-xs text-muted mb-8 max-w-3xl">Levels are editorial labels by number of signed-off pages, not credentials. Roles and affiliations are as stated by the reviewer and verified by a maintainer through the profile URL. A review is a statement about a page on a date, not an endorsement of any product.</p>

        {roster.length > 0 && (
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted"><tr><th className="p-3">Reviewer</th><th className="p-3">Role</th><th className="p-3">Level</th><th className="p-3 text-right">Pages</th><th className="p-3">Tracks</th><th className="p-3">Active</th><th className="p-3">Conflicts of interest</th></tr></thead>
              <tbody className="divide-y divide-border">
                {roster.map((r) => {
                  const person = r.personId ? g.get(r.personId) : undefined;
                  return (
                    <tr key={r.reviewer} className="align-top">
                      <td className="p-3 font-medium">
                        {person ? <Link className="underline" href={routeFor(person)}>{r.reviewer}</Link> : r.url ? <a className="underline" href={r.url} rel="noopener">{r.reviewer}</a> : r.reviewer}
                        <details className="mt-1 text-xs font-normal"><summary className="cursor-pointer text-muted">Pages reviewed</summary>
                          <ul className="mt-1 space-y-0.5">{r.entities.map((e) => <li key={`${e.id}-${e.track}-${e.date}`} className="flex items-center gap-1.5"><KindChip kind={e.kind} /><Link className="hover:underline" href={e.route}>{e.name}</Link><span className="text-muted">{TRACK_LABEL[e.track].toLowerCase()}, {e.date}</span></li>)}</ul>
                        </details>
                      </td>
                      <td className="p-3 text-muted">{r.role}</td>
                      <td className="p-3"><span className="chip bg-foreground/5">{r.level.label}</span></td>
                      <td className="p-3 text-right tabular-nums">{r.count}</td>
                      <td className="p-3 text-xs">{r.tracks.map((t) => TRACK_LABEL[t]).join(", ")}</td>
                      <td className="p-3 text-xs text-muted whitespace-nowrap">{r.first === r.last ? r.first : `${r.first} to ${r.last}`}</td>
                      <td className="p-3 text-xs text-muted">{r.coi.join("; ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <section className="mt-12 max-w-3xl">
          <h2 className="text-xl font-semibold mb-2">Join the roster</h2>
          <p className="text-[15px] leading-relaxed">Pick a page from the <Link className="underline" href="/review/">review queue</Link>, read it against its sources, and open the <a className="underline" href={joinUrl} rel="noopener">review issue form</a>. You will be asked for your name, role, a profile URL for verification, what you checked, what you found, and a conflict-of-interest statement covering the last three years. A maintainer verifies identity and records the review; the badge appears on the page and your name appears here. Reviews without a COI statement are not recorded.</p>
          <p className="text-sm text-muted mt-3">Have a <Link className="underline" href="/people/">person record</Link> in OnCo? Say so in the form and the badge links to it.</p>
        </section>
      </Container>
    </>
  );
}
