import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { digests } from "@/data/digests";
import { Container, PageHeader } from "@/components/ui";
import { RefChips } from "@/components/RefChips";

export function generateStaticParams() {
  return digests.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const d = digests.find((x) => x.id === id);
  return d ? { title: `${d.congress} digest`, description: d.tldr } : {};
}

export default async function DigestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = digests.find((x) => x.id === id);
  if (!d) notFound();
  return (
    <>
      <PageHeader kicker={<><Link href="/digests/" className="kicker hover:underline">Congress digests</Link><span className="kicker">· {d.dates} · {d.location}</span></>} title={d.congress} lede={d.tldr} />
      <Container className="pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <ol className="space-y-4">
            {d.items.map((it, i) => (
              <li key={i} className="card p-5">
                <div className="flex items-baseline gap-3"><span className="font-mono text-muted text-sm">{String(i + 1).padStart(2, "0")}</span><h2 className="font-semibold">{it.title}</h2></div>
                <p className="text-[15px] leading-relaxed mt-2">{it.finding}</p>
                <RefChips ids={it.refs} className="mt-3" />
                <a className="text-xs underline text-muted mt-2 inline-block break-all" href={it.source} rel="noopener">Source</a>
              </li>
            ))}
          </ol>
          <aside className="card p-4 text-sm self-start lg:sticky lg:top-20">
            <div className="kicker mb-2">Sources</div>
            <ul className="space-y-1">{d.sources.map((s) => <li key={s.url}><a className="underline break-words" href={s.url} rel="noopener">{s.label}</a></li>)}</ul>
            <div className="kicker mt-4 mb-2">Other digests</div>
            <ul className="space-y-1">{digests.filter((x) => x.id !== d.id).map((x) => <li key={x.id}><Link className="hover:underline" href={`/digests/${x.id}/`}>{x.congress}</Link></li>)}</ul>
          </aside>
        </div>
      </Container>
    </>
  );
}
