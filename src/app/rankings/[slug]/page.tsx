import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { KIND_META } from "@/lib/kinds";
import { coverageSentence, ranking, rankings, TOP, type RankingRow } from "@/lib/rankings";
import { Container, GroupKicker, PageHeader, Section } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { KindIcon } from "@/components/KindIcon";
import { RowAvatar } from "@/components/RowAvatar";
import { Tip } from "@/components/Tip";

export function generateStaticParams() {
  return rankings().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = ranking(slug);
  if (!r) return {};
  return pageMeta({ title: r.title, description: `${r.basis} Top ${r.rows.length} of ${r.total}, computed from the OnCo corpus, with the basis stated and the field coverage disclosed.`, path: `/rankings/${r.slug}/` });
}

/** Logo or portrait when the row has one, otherwise the kind glyph, so every row carries a visual. */
function RowGlyph({ row }: { row: RankingRow }) {
  if (row.image || row.kind === "company" || row.kind === "institution" || row.kind === "person") return <RowAvatar src={row.image} name={row.name} round={row.round} />;
  return <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-accent-soft text-accent" aria-hidden="true"><KindIcon kind={row.kind} className="h-4 w-4" /></span>;
}

export default async function RankingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = ranking(slug);
  if (!r) notFound();
  const others = rankings().filter((x) => x.slug !== r.slug);
  const plural = KIND_META[r.kind].plural;
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Rankings", href: "/rankings/" }, { label: r.title, href: `/rankings/${r.slug}/` }]} />
      <PageHeader
        kicker={<GroupKicker id="find"><span className="kicker">·</span><Link href="/rankings/" className="kicker hover:underline">Rankings</Link><span className="kicker">·</span><Link href={`/${KIND_META[r.kind].route}/`} className="kicker hover:underline">All {plural}</Link></GroupKicker>}
        title={r.title}
        lede={`${r.basis} Top ${r.rows.length} of ${r.total.toLocaleString("en-GB")} ${plural} with a value; ties are broken by name. ${coverageSentence(r.coverage)}`}
        right={<a href={`/rankings/${r.slug}/data.json`} type="application/json" className="chip border bg-card border-border hover:bg-foreground/5 text-sm"><KindIcon kind={r.kind} className="h-3.5 w-3.5" /><span>JSON</span></a>}
      />
      <Container className="pb-16">
        <div className="card results-table overflow-x-auto">
          <table className="onco">
            <thead>
              <tr>
                <th scope="col" className="w-10">#</th>
                <th scope="col">{KIND_META[r.kind].label}</th>
                <th scope="col" className="text-right"><Tip text={r.how} title={r.metricLabel}><span className="underline decoration-dotted decoration-foreground/30 underline-offset-[3px] cursor-help">{r.metricLabel}</span></Tip></th>
                <th scope="col" className="hidden sm:table-cell">{r.contextLabel}</th>
              </tr>
            </thead>
            <tbody>
              {r.rows.map((row) => (
                <tr key={row.id} id={row.id}>
                  <td className="tabular-nums">{row.rank}</td>
                  <td>
                    <Link href={row.route} className="flex items-center gap-2.5 hover:underline" title={`Open ${row.name}`}>
                      <RowGlyph row={row} />
                      <span className="min-w-0">{row.name}</span>
                    </Link>
                  </td>
                  <td className="text-right tabular-nums whitespace-nowrap">{row.metric}</td>
                  <td className="hidden sm:table-cell text-sm text-muted">{row.context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {r.total > TOP && <p className="mt-2 text-xs text-muted">{(r.total - r.rows.length).toLocaleString("en-GB")} more {plural} have a value below the top {TOP}; the full list of {plural} is at <Link className="underline" href={`/${KIND_META[r.kind].route}/`}>/{KIND_META[r.kind].route}/</Link>.</p>}

        <Section id="how" title="How this is counted">
          <div className="card p-4 text-sm space-y-2 max-w-3xl">
            <p>{r.how}</p>
            <p><span className="font-medium text-foreground">Coverage.</span> {coverageSentence(r.coverage)} Rows with a value of zero are not listed. Nothing is weighted, imputed or averaged; the ordering is by the number shown, then by name.</p>
            <p className="text-muted">Machine-readable copy: <a className="underline" href={`/rankings/${r.slug}/data.json`} type="application/json">/rankings/{r.slug}/data.json</a>. Registry: <code>src/lib/rankings.ts</code>.</p>
          </div>
        </Section>

        <Section id="more" title="Other rankings">
          <ul className="flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/rankings/${o.slug}/`} className="chip border bg-card border-border hover:bg-foreground/5 text-sm" title={o.basis}><KindIcon kind={o.kind} className="h-3.5 w-3.5" /><span>{o.title}</span></Link>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </>
  );
}
