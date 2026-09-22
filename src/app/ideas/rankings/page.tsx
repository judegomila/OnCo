import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { T, TN } from "@/components/T";
import { Tip } from "@/components/Tip";
import { RowVisualFallback } from "@/components/RowVisualFallback";
import { RankGlyph, type RankGlyphName } from "@/components/RankGlyph";
import { IdeaRankings } from "@/components/IdeaRankings";
import { GLOBOCAN } from "@/lib/globocan";
import { COST_LABEL, MATURITY_LABEL, explain, formatScore, rankAll, scoreParts, type RankedRow, type RankedView, type ScoreParts, type ViewId } from "@/lib/idea-rankings";

export const metadata: Metadata = pageMeta({
  title: "Idea rankings",
  description: "OnCo's ideas ordered six ways: best bang for buck, most important, hardest, closest to reality, cherry picked and most wanted. Every score is built from fields the records already carry (GLOBOCAN burden of the linked cancers, breadth, linked evidence, cost band, horizon, maturity) and shows its formula.",
  path: "/ideas/rankings/",
});

const LIMIT = 50;
const compact = new Intl.NumberFormat("en-GB", { notation: "compact", maximumFractionDigits: 1 });
const full = (n: number) => n.toLocaleString("en-GB");
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** Views whose exclusions have a dictionary sentence (the others rank every idea). */
const EXCLUDED_KEY: Partial<Record<ViewId, string>> = { "bang-for-buck": "rank.excluded.bang-for-buck", "most-important": "rank.excluded.most-important", hardest: "rank.excluded.hardest" };

export default function IdeaRankingsPage() {
  const views = rankAll(LIMIT);
  const total = scoreParts().length;
  const available = Object.fromEntries(views.map((v) => [v.view.id, v.available])) as Record<ViewId, boolean>;
  const counts = Object.fromEntries(views.map((v) => [v.view.id, v.ranked])) as Record<ViewId, number>;
  const panels = Object.fromEntries(views.map((v) => [v.view.id, <ViewPanel key={v.view.id} v={v} total={total} />])) as Record<ViewId, ReactNode>;

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="map"><span className="text-muted" aria-hidden>/</span><Link href="/ideas/" className="kicker py-1.5 -my-1.5 hover:text-foreground"><T k="kind.idea.plural" fallback="ideas" /></Link></GroupKicker>}
        title={<T k="rank.title" fallback="Idea rankings" />} seed="Idea rankings"
        ledeNode={<T k="rank.lede" vars={{ n: full(total) }} />}
        right={<Link href="/ideas/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium inline-flex items-center gap-1.5"><RankGlyph name="breadth" className="h-4 w-4 text-accent" /><T k="rank.allIdeas" fallback="All ideas" /> →</Link>}
      />
      <Container className="pb-16">
        <IdeaRankings available={available} counts={counts} panels={panels} initial="bang-for-buck" />
        <p className="text-xs text-muted mt-8 max-w-3xl"><T k="rank.source" vars={{ date: GLOBOCAN.fetched }} /> <a className="underline" href={GLOBOCAN.sourceUrl} rel="noopener">{GLOBOCAN.source}</a>. <Link className="underline" href="/idea-votes/">Idea votes</Link> has the discussion threads behind Most wanted.</p>
      </Container>
    </>
  );
}

function ViewPanel({ v, total }: { v: RankedView; total: number }) {
  const id = v.view.id;
  const excludedKey = EXCLUDED_KEY[id];
  return (
    <section aria-labelledby={`h-${id}`}>
      <h2 id={`h-${id}`} className="text-xl font-semibold tracking-tight flex items-center gap-2"><RankGlyph name={v.view.glyph} className="h-5 w-5 text-accent" /><T k={`rank.view.${id}`} fallback={v.view.label} /></h2>
      <p className="text-sm text-muted mt-1 max-w-3xl"><T k={`rank.formula.${id}`} fallback={v.view.formula} /></p>
      <p className="text-xs text-muted mt-1 max-w-3xl">
        {id === "cherry-picked" ? <T k="rank.editPicks" /> : <T k="rank.top" vars={{ n: full(v.rows.length), total: full(v.ranked) }} />}
        {excludedKey && v.excluded.n > 0 && <> <TN k="rank.notRanked" vars={{ n: full(v.excluded.n), total: full(total), why: <T k={excludedKey} /> }} /></>}
      </p>
      <ol className="card divide-y divide-border mt-3">
        {v.rows.map((r) => <Row key={r.parts.id} r={r} view={id} />)}
      </ol>
    </section>
  );
}

function Row({ r, view }: { r: RankedRow; view: ViewId }) {
  const p = r.parts;
  const shownCancers = p.cancers.slice(0, 3);
  const moreCancers = p.cancers.length - shownCancers.length;
  return (
    <li className="p-3 flex gap-3 items-start">
      <span className="w-6 shrink-0 text-right tabular-nums text-sm text-muted pt-0.5">{r.rank}</span>
      <RowVisualFallback kind="idea" name={p.name} route={p.route} className="h-7 w-7" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Link href={p.route} className="font-medium hover:underline">{p.name}</Link>
          {r.score !== null && (
            <Tip title={`Score: ${formatScore(view, r.score)}`} text={explain(view, p, r.score)}>
              <span className="chip bg-accent-soft text-accent cursor-help"><RankGlyph name="rank" className="h-3 w-3" /><span><T k="rank.score" fallback="Score" /> {formatScore(view, r.score)}</span></span>
            </Tip>
          )}
        </div>
        <p className="text-xs text-muted line-clamp-1">{p.tldr}</p>
        {r.reason && <p className="text-sm mt-1 max-w-3xl"><span className="kicker me-2"><T k="rank.reason" fallback="Why it is picked" /></span>{r.reason}</p>}
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <BurdenChip p={p} />
          <Chip glyph="breadth" label={<><T k="rank.part.breadth" fallback="Cancers" /> {p.breadth}</>} tip={p.breadth ? `${plural(p.breadth, "linked cancer")}: ${p.cancers.map((c) => c.name).join(", ")}.` : "No cancer linked to this idea."} href={p.route} />
          <Chip glyph="evidence" label={<><T k="rank.part.evidence" fallback="Evidence" /> {p.evidence}</>} tip={`${plural(p.trials, "trial")} (${p.phase3} phase 3, counted twice), ${plural(p.drugs, "treatment")}, ${plural(p.papers, "key paper")}, linked in either direction.`} href={p.route} />
          <Chip glyph="cost" label={<><T k="rank.part.cost" fallback="Cost" /> {p.cost ? COST_LABEL[p.cost] : "?"}</>}
            tip={p.cost ? `Cost band to try it: ${COST_LABEL[p.cost]} (rank ${p.costRank} of 3; small under $1M, medium $1-50M, large over $50M). Click to filter the ideas list.` : "No cost band recorded, so this idea is left out of the views that need one."}
            href={p.cost ? `/ideas/?cost=${encodeURIComponent(COST_LABEL[p.cost])}` : p.route} />
          <Chip glyph="horizon" label={<><T k="rank.part.horizon" fallback="Horizon" /> {p.horizon !== undefined ? <T k="rank.years" vars={{ n: p.horizon }} fallback={`${p.horizon} yr`} /> : "?"}</>}
            tip={p.horizon !== undefined ? `${plural(p.horizon, "year")} to first evidence of impact, as recorded on the idea.` : "No horizon recorded, so this idea is left out of the views that need one."} href={p.route} />
          <Chip glyph="maturity" label={<><T k="rank.part.maturity" fallback="Maturity" /> {MATURITY_LABEL[p.maturity]}</>}
            tip={`Maturity: ${MATURITY_LABEL[p.maturity]} (rank ${p.maturityRank} of 4). Click to filter the ideas list.`}
            href={`/ideas/?maturity=${encodeURIComponent(MATURITY_LABEL[p.maturity])}`} />
          {shownCancers.map((c) => (
            <Tip key={c.id} title={c.name} text={c.site ? `Burden read from the GLOBOCAN site "${c.site}"${c.viaParent ? ` through its parent cancer` : ""}.` : "No GLOBOCAN site estimate for this cancer; it adds nothing to the burden."}>
              <Link href={c.route} className="chip bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-900"><span>{c.name}</span></Link>
            </Tip>
          ))}
          {moreCancers > 0 && <Link href={p.route} className="chip bg-foreground/5 hover:bg-foreground/10"><span><T k="rank.more" vars={{ n: moreCancers }} fallback={`+${moreCancers} more`} /></span></Link>}
        </div>
      </div>
    </li>
  );
}

function Chip({ glyph, label, tip, href }: { glyph: RankGlyphName; label: ReactNode; tip: string; href: string }) {
  return (
    <Tip text={tip}>
      <Link href={href} className="chip bg-foreground/5 hover:bg-foreground/10"><RankGlyph name={glyph} className="h-3 w-3" /><span>{label}</span></Link>
    </Tip>
  );
}

function BurdenChip({ p }: { p: ScoreParts }) {
  if (p.burden <= 0) {
    return (
      <Tip text="No linked cancer has a GLOBOCAN site estimate, so burden is 0 and the idea is left out of the burden-based views.">
        <Link href={p.route} className="chip bg-foreground/5 hover:bg-foreground/10"><RankGlyph name="burden" className="h-3 w-3" /><span><T k="rank.part.burden" fallback="Burden" /> 0</span></Link>
      </Tip>
    );
  }
  const first = p.cancers.find((c) => c.site);
  const sites = p.sites.map((s) => `${s.label} ${full(s.cases ?? 0)}`).join("; ");
  const viaParent = p.cancers.filter((c) => c.viaParent).map((c) => `${c.name} uses the site of its parent cancer`).join("; ");
  const tip = `${full(p.burden)} new cases a year worldwide (GLOBOCAN ${GLOBOCAN.year}, both sexes, all ages), summed over ${plural(p.sites.length, "site")} counted once each: ${sites}.${viaParent ? ` ${viaParent}.` : ""}`;
  return (
    <Tip text={tip}>
      <Link href={first ? `/cases/?cancer=${encodeURIComponent(first.id)}` : p.route} className="chip bg-foreground/5 hover:bg-foreground/10"><RankGlyph name="burden" className="h-3 w-3" /><span><T k="rank.part.burden" fallback="Burden" /> {compact.format(p.burden)} <T k="rank.casesYear" fallback="cases/yr" /></span></Link>
    </Tip>
  );
}
