import type { Metadata } from "next";
import Link from "next/link";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader, StatusChip } from "@/components/ui";
import { graph } from "@/lib/graph";
import { routeFor, type Idea } from "@/lib/schema";
import { adoptions } from "@/data/adoptions";
import { DISCUSSIONS_URL, DISCUSSION_CATEGORY, newDiscussionUrl, discussionSearchUrl, issueUrl } from "@/lib/issue-links";
import { DiscussLink } from "@/components/DiscussLink";

export const metadata: Metadata = pageMeta({ title: "Idea votes and adoptions", description: "Which of OnCo's ideas people want to see tested, from GitHub Discussions reactions, and which have been picked up by a trial, programme, funder or publication, with the source.", path: "/idea-votes/" });

type Vote = { up: number; reactions: number; comments: number; url: string; title: string };
type VotesFile = { generated: string; total: number; votes: Record<string, Vote> };

function readVotes(): VotesFile | null {
  const p = join(process.cwd(), "public", "votes.json");
  if (!existsSync(p)) return null;
  try { return JSON.parse(readFileSync(p, "utf8")) as VotesFile; } catch { return null; }
}

const MATURITY_LABEL: Record<Idea["maturity"], string> = { speculative: "Speculative", "preclinical-evidence": "Preclinical evidence", "early-clinical": "Early clinical", "being-tested-at-scale": "Being tested at scale" };
const ADOPTION_LABEL = { trial: "Trial", programme: "Programme", publication: "Publication", funding: "Funding", policy: "Policy", product: "Product", other: "Other" } as const;

export default function IdeaVotesPage() {
  const g = graph();
  const ideas = g.kind("idea");
  const votes = readVotes();
  const ranked = votes
    ? ideas.map((i) => ({ i, v: votes.votes[i.id] })).filter((x): x is { i: Idea; v: Vote } => !!x.v && (x.v.up > 0 || x.v.comments > 0)).sort((a, b) => b.v.up - a.v.up || b.v.comments - a.v.comments || a.i.name.localeCompare(b.i.name))
    : [];
  const byMaturity = (["being-tested-at-scale", "early-clinical", "preclinical-evidence", "speculative"] as Idea["maturity"][]).map((m) => ({ m, n: ideas.filter((i) => i.maturity === m).length }));
  const waiting = ideas.filter((i) => !votes?.votes[i.id]).map((i) => ({ i, d: g.degree(i.id) })).sort((a, b) => b.d - a.d || a.i.name.localeCompare(b.i.name)).slice(0, 40);
  const adopted = adoptions.map((a) => ({ a, idea: g.get(a.ideaId) })).sort((x, y) => y.a.date.localeCompare(x.a.date));

  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Idea votes and adoptions"
        lede={`${ideas.length.toLocaleString("en-GB")} ideas, each with a hypothesis and a test that could confirm or kill it. Two signals sit on top: interest (thumbs-up on the idea's discussion thread) and uptake (a trial, programme, funder or paper that picked it up, with a source). Neither is an endorsement; both tell funders and researchers where attention is.`} />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-8">
          {[["#votes", "Most wanted"], ["#adopted", "Adopted"], ["#waiting", "Waiting for a vote"], ["#how", "How voting works"]].map(([href, label]) => (
            <a key={href} href={href} className="underline decoration-foreground/25 underline-offset-[3px] hover:decoration-foreground">{label}</a>
          ))}
        </nav>

        <div className="grid gap-3 sm:grid-cols-4 mb-10">
          {byMaturity.map((x) => <div key={x.m} className="card p-4"><div className="kicker mb-1">{MATURITY_LABEL[x.m]}</div><div className="text-2xl font-semibold tabular-nums">{x.n.toLocaleString("en-GB")}</div></div>)}
        </div>

        <section id="votes" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Most wanted</h2>
          {votes ? (
            <p className="text-sm text-muted mb-4 max-w-3xl">Reactions and comments on discussion threads in the <a className="underline" href={`${DISCUSSIONS_URL}/categories/${DISCUSSION_CATEGORY}`} rel="noopener">Objects</a> category, matched to idea ids, as of {votes.generated.slice(0, 10)}. {ranked.length} idea{ranked.length === 1 ? " has" : "s have"} at least one vote or comment.</p>
          ) : (
            <p className="text-sm text-muted mb-4 max-w-3xl">No vote snapshot has been published yet. Votes are read weekly from GitHub Discussions by <code>scripts/fetch-votes.ts</code> into <code>public/votes.json</code>; until the first run, this table is empty. You can still vote: see <a className="underline" href="#how">how voting works</a>.</p>
          )}
          {ranked.length > 0 && (
            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted"><tr><th className="p-3">#</th><th className="p-3">Idea</th><th className="p-3">Maturity</th><th className="p-3 text-right">Votes</th><th className="p-3 text-right">Comments</th><th className="p-3"></th></tr></thead>
                <tbody className="divide-y divide-border">
                  {ranked.map(({ i, v }, n) => (
                    <tr key={i.id}>
                      <td className="p-3 text-muted tabular-nums">{n + 1}</td>
                      <td className="p-3"><Link href={routeFor(i)} className="font-medium hover:underline">{i.name}</Link><div className="text-xs text-muted line-clamp-2">{i.tldr}</div></td>
                      <td className="p-3 text-xs">{MATURITY_LABEL[i.maturity]}</td>
                      <td className="p-3 text-right tabular-nums">{v.up}</td>
                      <td className="p-3 text-right tabular-nums">{v.comments}</td>
                      <td className="p-3 text-right"><a className="text-xs underline whitespace-nowrap" href={v.url} rel="noopener">Thread</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section id="adopted" className="scroll-mt-24 mt-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Adopted</h2>
          <p className="text-sm text-muted mb-4 max-w-3xl">Ideas that someone outside OnCo has picked up, each with the source that shows it: a trial registration, a programme page, a funding announcement, a publication or a policy document. Recorded in <code>src/data/adoptions.ts</code>; nothing is inferred.</p>
          {adopted.length ? (
            <ul className="card divide-y divide-border">
              {adopted.map(({ a, idea }) => (
                <li key={`${a.ideaId}-${a.date}-${a.by}`} className="p-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                  <span className="chip bg-foreground/5">{ADOPTION_LABEL[a.kind]}</span>
                  {idea ? <Link href={routeFor(idea)} className="font-medium hover:underline">{idea.name}</Link> : <span className="font-medium">{a.ideaId}</span>}
                  <span className="text-muted">picked up by {a.by}, {a.date}</span>
                  {a.note && <span className="text-muted">{a.note}</span>}
                  <a className="ml-auto text-xs underline" href={a.source} rel="noopener">Source</a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="card p-4 text-sm text-muted max-w-3xl">No adoption has been recorded yet. Know of a trial, programme or paper that took up one of these ideas? <a className="underline" href={issueUrl("suggest-edit", { field: "adoption", why: "An idea from OnCo has been picked up; please add it to src/data/adoptions.ts" }, { title: "edit: adoption" })} rel="noopener">Tell us with a source</a> and it will be listed here.</div>
          )}
        </section>

        <section id="waiting" className="scroll-mt-24 mt-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Waiting for a vote</h2>
          <p className="text-sm text-muted mb-4 max-w-3xl">The forty most connected ideas with no thread yet. Start one to open the vote; the first thumbs-up is yours.</p>
          <ul className="card divide-y divide-border">
            {waiting.map(({ i, d }) => (
              <li key={i.id} className="p-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <StatusChip status={i.status} />
                <Link href={routeFor(i)} className="font-medium hover:underline">{i.name}</Link>
                <span className="text-xs text-muted">{MATURITY_LABEL[i.maturity]} · {d} connections</span>
                <span className="ml-auto text-xs"><DiscussLink id={i.id} kind="idea" name={i.name} /></span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted mt-2">All ideas, filterable by maturity, actor and cost: <Link className="underline" href="/ideas/">/ideas/</Link>.</p>
        </section>

        <section id="how" className="scroll-mt-24 mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">How voting works</h2>
          <ol className="list-decimal pl-5 space-y-2 text-[15px] leading-relaxed">
            <li>Every idea has a <em>Discuss</em> link on its page. It searches the Objects category for a thread on that id; if there is none, <em>start a thread</em> opens the discussion form with the id filled in.</li>
            <li>Vote with a thumbs-up on the thread&apos;s first post. Comments count separately, as a signal of debate rather than support. A free GitHub account is all it takes.</li>
            <li>Once a week <code>scripts/fetch-votes.ts</code> reads reactions and comment counts for every thread in the category, matches the id in the title, and writes <code>public/votes.json</code>. This page is rebuilt from that file.</li>
            <li>Votes do not change a record. Changes to an idea (its hypothesis, test, maturity) still go through <Link className="underline" href="/suggest/">Suggest an edit</Link> with a source.</li>
          </ol>
          <p className="text-sm text-muted mt-3">Example: <a className="underline" href={discussionSearchUrl("idea-payload-switching")} rel="noopener">threads on idea-payload-switching</a>, or <a className="underline" href={newDiscussionUrl({ kind: "idea", id: "idea-payload-switching", name: "Payload-class switching as the rule for ADC sequencing" })} rel="noopener">start one</a>.</p>
        </section>
      </Container>
    </>
  );
}
