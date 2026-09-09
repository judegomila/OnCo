import type { Metadata } from "next";
import Link from "next/link";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { REPO } from "@/lib/issue-links";

export const metadata: Metadata = pageMeta({ title: "Weekly issue", description: "OnCo's weekly issue: what changed in the corpus, regulatory events, upcoming readouts and what the journals published, rendered from the data with no tracking.", path: "/newsletter/" });

/**
 * Signup endpoint for the email list. Leave empty until a Buttondown (https://buttondown.com/api/emails/embed-subscribe/<username>)
 * or Listmonk (<host>/subscription/form) endpoint exists; the page then shows the feed and archive only.
 * The form posts the address and nothing else: no pixels, no scripts, no third-party assets.
 */
const SIGNUP_ACTION = "";

type Issue = { date: string; title: string; path: string; summary: string; counts: Record<string, number> };

function readIndex(): Issue[] {
  const p = join(process.cwd(), "public", "newsletter", "index.json");
  if (!existsSync(p)) return [];
  try { return (JSON.parse(readFileSync(p, "utf8")) as Issue[]).sort((a, b) => b.date.localeCompare(a.date)); } catch { return []; }
}

const COUNT_LABEL: Record<string, string> = { changes: "changelog entries", regulatory: "regulatory events", calendar: "upcoming dates", pulse: "publications", corrections: "corrections" };

export default function NewsletterPage() {
  const issues = readIndex();
  const latest = issues[0];
  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Weekly issue"
        lede="One email a week, generated from the corpus: what changed in OnCo, dated regulatory events, the readouts and decisions due in the next month, what the leading journals published, and any corrections. No tracking pixels, no click tracking, no third-party scripts. The same issue is published here and as an Atom feed." />
      <Container className="pb-16 max-w-3xl">
        <section className="card p-5">
          <div className="kicker mb-1">Subscribe</div>
          {SIGNUP_ACTION ? (
            <form action={SIGNUP_ACTION} method="post" target="_blank" className="mt-2 flex flex-wrap gap-2 items-center">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="you@example.org" className="rounded-lg border border-border bg-background px-3 py-2 text-sm min-w-[16rem]" />
              <button type="submit" className="btn btn-primary text-sm">Subscribe</button>
              <p className="text-xs text-muted basis-full">Your address is used only to send the weekly issue. Unsubscribe from any issue. No tracking.</p>
            </form>
          ) : (
            <p className="text-sm mt-1">Email delivery is not switched on yet. Until it is, subscribe by feed: <a className="underline" href="/newsletter/feed.xml">Atom feed</a>. Every issue is also archived below, and the <Link className="underline" href="/changelog/">changelog</Link> carries the same changes as they land.</p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Archive</h2>
          {issues.length ? (
            <ul className="card divide-y divide-border">
              {issues.map((i) => (
                <li key={i.date} className="p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <a className="font-medium underline" href={i.path}>{i.title}</a>
                    <span className="text-xs text-muted tabular-nums">{i.date}{i === latest ? " · latest" : ""}</span>
                  </div>
                  <p className="text-sm text-muted mt-1">{i.summary}</p>
                  <p className="text-xs text-muted mt-1">{Object.entries(i.counts).filter(([, n]) => n > 0).map(([k, n]) => `${n} ${COUNT_LABEL[k] ?? k}`).join(" · ")}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="card p-4 text-sm text-muted">No issue has been generated yet. <code>scripts/newsletter.ts</code> writes one to <code>public/newsletter/</code>; the weekly workflow runs it on Mondays.</div>
          )}
        </section>

        <section className="mt-10 text-sm text-muted space-y-2">
          <h2 className="text-xl font-semibold text-foreground mb-1">How it is made</h2>
          <p>Each issue is rendered by <a className="underline" href={`${REPO}/blob/main/scripts/newsletter.ts`} rel="noopener">scripts/newsletter.ts</a> from the same data as the site: the <Link className="underline" href="/changelog/">changelog</Link> (the newsletter is the changelog, with context), products&apos; dated <Link className="underline" href="/regulatory/">regulatory events</Link> from the past week, the <Link className="underline" href="/calendar/">readout calendar</Link> for the next thirty days, the <Link className="underline" href="/pulse/">research pulse</Link>, and <Link className="underline" href="/corrections/">corrections</Link>. Every item links to its OnCo page and, through it, to the primary source.</p>
          <p>Something wrong in an issue? It is wrong in the corpus too: fix it once via <Link className="underline" href="/suggest/">Suggest an edit</Link> and the next issue is right.</p>
        </section>
      </Container>
    </>
  );
}
