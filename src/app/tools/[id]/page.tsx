import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { DECISION_TOOLS, TONE_CLASS, TONE_ICON, TONE_LABEL, toolById, toolRoute } from "@/lib/decision-tools";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CancerIcon } from "@/components/CancerIcon";
import { PrintButton } from "@/components/PrintButton";
import { DecisionToolView } from "@/components/DecisionToolView";
import { ToolGlyph } from "@/components/ToolGlyph";

/**
 * One decision aid (/tools/<id>/). The interactive part is DecisionToolView; below it the page prints every
 * statement the aid can show, with its source, so the quotes are on the page without JavaScript and indexable.
 */
export function generateStaticParams() {
  return DECISION_TOOLS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = toolById(id);
  return t ? pageMeta({ title: t.title, description: t.lede, path: toolRoute(t.id) }) : {};
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = toolById(id);
  if (!tool) notFound();
  const c = graph().must(tool.cancerId);
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Decision aids", href: "/tools/" }, { label: tool.short, href: toolRoute(tool.id) }]} />
      <PageHeader
        kicker={<GroupKicker id="live"><span className="kicker">·</span><Link href={routeFor(c)} className="kicker hover:underline">{c.name}</Link></GroupKicker>}
        title={tool.title}
        lede={tool.lede}
        logo={<span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><CancerIcon cancerId={c.id} className="h-8 w-8" /></span>}
        right={<div className="flex flex-col items-end gap-2 text-xs text-muted"><PrintButton /><Link href={`${routeFor(c)}decisions/`} className="underline">Decisions for this cancer →</Link><Link href="/tools/" className="underline">All decision aids →</Link></div>} />
      <Container className="pb-16">
        <DecisionToolView toolId={tool.id} />

        <section className="mt-12" id="statements">
          <h2 className="text-xl font-semibold tracking-tight inline-flex items-center gap-2"><span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent"><ToolGlyph name="flag" className="h-4 w-4" /></span>Every statement this aid can show</h2>
          <p className="text-sm text-muted mt-1 max-w-3xl">The aid picks from these {tool.cards.length} cards; each quotes its source word for word. Read them all here, with or without the questions above.</p>
          <ol className="mt-4 space-y-3">
            {tool.cards.map((card) => (
              <li key={card.id} id={`card-${card.id}`} className={`card p-4 border ${TONE_CLASS[card.tone].card} scroll-mt-24`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`chip border inline-flex items-center gap-1 ${TONE_CLASS[card.tone].pill}`}><ToolGlyph name={TONE_ICON[card.tone]} className="h-3 w-3" />{TONE_LABEL[card.tone]}</span>
                </div>
                <h3 className="font-semibold mt-2 leading-snug">{card.title}</h3>
                <div className="mt-3 space-y-3">
                  {card.quotes.map((q, i) => (
                    <blockquote key={i} className="border-s-2 border-accent/50 ps-3 text-[15px] leading-relaxed">
                      <p>&ldquo;{q.text}&rdquo;</p>
                      <footer className="text-xs text-muted mt-1">{q.grade && <span className="chip bg-foreground/5 me-1.5">{q.grade}</span>}<a href={q.source.url} className="underline" rel="noopener noreferrer">{q.source.label}</a></footer>
                    </blockquote>
                  ))}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/90"><span className="font-medium">What this means: </span>{card.meaning}</p>
                {card.questions && card.questions.length > 0 && <ul className="mt-2 text-sm list-disc ps-5 space-y-0.5 text-foreground/85">{card.questions.map((qq, i) => <li key={i}>{qq}</li>)}</ul>}
                {card.links && card.links.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{card.links.map((l) => <Link key={l.href} href={l.href} className="chip border bg-card border-border hover:bg-foreground/5 text-xs">{l.label}</Link>)}</div>}
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-2 text-sm">
          <div className="card p-4 space-y-1.5">
            <h2 className="font-semibold inline-flex items-center gap-1.5"><ToolGlyph name="info" className="h-4 w-4 text-accent" />How this aid works</h2>
            <p className="text-muted">Each combination of answers maps to a fixed set of cards, and every card quotes the statement it implements with the page it was read from; nothing is scored or inferred. Where the sources disagree, both are quoted. The mapping is data in the OnCo repository and is tested against every combination of answers. Checked {tool.asOf}.</p>
            <ul className="text-muted list-disc ps-5 space-y-0.5">{tool.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
          </div>
          <div className="card p-4 space-y-1.5">
            <h2 className="font-semibold inline-flex items-center gap-1.5"><ToolGlyph name="compass" className="h-4 w-4 text-accent" />Sources and related pages</h2>
            <ul className="text-muted list-disc ps-5 space-y-0.5">{tool.sources.map((s) => <li key={s.url}><a href={s.url} className="underline" rel="noopener noreferrer">{s.label}</a></li>)}</ul>
            <div className="flex flex-wrap gap-1.5 pt-1">{tool.links.map((l) => <Link key={l.href} href={l.href} className="chip border bg-card border-border hover:bg-foreground/5 text-xs">{l.label}</Link>)}</div>
            <p className="text-muted pt-1">This is an educational aid to prepare for a conversation with your surgical team. It is not medical advice, and it cannot see your scans or your history. OnCo is orientation, not medical advice.</p>
          </div>
        </div>
      </Container>
    </>
  );
}
