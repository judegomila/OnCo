import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { T } from "@/components/T";
import { RankGlyph } from "@/components/RankGlyph";
import { IdeaRankings, type RankingsPanelData } from "@/components/IdeaRankings";
import { GLOBOCAN } from "@/lib/globocan";
import { RANK_PAGE, rankAll, scoreParts, type ViewId } from "@/lib/idea-rankings";

export const metadata: Metadata = pageMeta({
  title: "Idea rankings",
  description: "OnCo's ideas ordered six ways: best bang for buck, most important, hardest, closest to reality, cherry picked and most wanted. Every score is built from fields the records already carry (GLOBOCAN burden of the linked cancers, breadth, linked evidence, cost band, horizon, maturity) and shows its formula.",
  path: "/ideas/rankings/",
});

const full = (n: number) => n.toLocaleString("en-GB");

/**
 * The page carries the first RANK_PAGE rows of every view as plain data (the client list renders them on the server
 * too, so the HTML has the top of each ranking); the rest of a view is fetched from /api/v1/ideas/rankings/<view>.json,
 * written by scripts/build-idea-rankings.ts. The page used to carry the top 50 of every view as rendered React
 * trees: 2.2 MB of HTML and payload.
 */
export default function IdeaRankingsPage() {
  const ranked = rankAll(RANK_PAGE);
  const total = scoreParts().length;
  const views = Object.fromEntries(ranked.map((v) => [v.view.id, { rows: v.rows, ranked: v.ranked, excluded: v.excluded.n, available: v.available }])) as Record<ViewId, RankingsPanelData>;

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="map"><span className="text-muted" aria-hidden>/</span><Link href="/ideas/" className="kicker py-1.5 -my-1.5 hover:text-foreground"><T k="kind.idea.plural" fallback="ideas" /></Link></GroupKicker>}
        title={<T k="rank.title" fallback="Idea rankings" />} seed="Idea rankings"
        ledeNode={<T k="rank.lede" vars={{ n: full(total) }} />}
        right={<Link href="/ideas/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium inline-flex items-center gap-1.5"><RankGlyph name="breadth" className="h-4 w-4 text-accent" /><T k="rank.allIdeas" fallback="All ideas" /> →</Link>}
      />
      <Container className="pb-16">
        <IdeaRankings views={views} total={total} globocanYear={GLOBOCAN.year} initial="bang-for-buck" />
        <p className="text-xs text-muted mt-8 max-w-3xl"><T k="rank.source" vars={{ date: GLOBOCAN.fetched }} /> <a className="underline" href={GLOBOCAN.sourceUrl} rel="noopener">{GLOBOCAN.source}</a>. <Link className="underline" href="/idea-votes/">Idea votes</Link> has the discussion threads behind Most wanted.</p>
      </Container>
    </>
  );
}
