import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { DECISION_TOOLS, toolRoute } from "@/lib/decision-tools";
import { COMPARE_SETS, compareRoute } from "@/lib/cancer-compare";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { CancerIcon } from "@/components/CancerIcon";
import { ToolGlyph } from "@/components/ToolGlyph";

export const metadata: Metadata = pageMeta({ title: "Decision aids", description: "Interactive aids that answer a few questions with the guideline statement that applies, quoted word for word with its source: gallbladder polyps under the 2022 European guideline, incidental gallbladder cancer after cholecystectomy, and cancers compared side by side. Educational aids, not advice.", path: "/tools/" });

export default function ToolsIndexPage() {
  const g = graph();
  return (
    <>
      <PageHeader kicker={<GroupKicker id="live" />} title="Decision aids"
        lede="A few questions about your report, and in return the exact statement a guideline or expert consensus makes for that combination, quoted with its source, a plain line on what it means, and the questions to take to your team. Each aid is data: every branch quotes a published statement and nothing is scored or inferred. Educational aids to prepare for an appointment, not advice. Nothing you enter leaves the page." />
      <Container className="pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          {DECISION_TOOLS.map((t) => {
            const c = g.must(t.cancerId);
            return (
              <Link key={t.id} href={toolRoute(t.id)} className="card p-5 hover:border-accent transition-colors flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><ToolGlyph name={t.icon} className="h-5 w-5" /></span>
                  <div className="min-w-0">
                    <div className="font-semibold leading-snug">{t.short}</div>
                    <div className="text-xs text-muted inline-flex items-center gap-1"><CancerIcon cancerId={c.id} className="h-3.5 w-3.5" />{c.name}</div>
                  </div>
                </div>
                <p className="text-sm text-foreground/85 mt-3 flex-1">{t.title}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                  <span className="chip bg-foreground/5">{t.inputs.length} questions</span>
                  <span className="chip bg-foreground/5">{t.cards.length} statements</span>
                  <span className="chip bg-foreground/5">Checked {t.asOf}</span>
                </div>
              </Link>
            );
          })}
          {COMPARE_SETS.map((s) => {
            const c = g.must(s.anchorId);
            return (
              <Link key={s.anchorId} href={compareRoute(s.anchorId)} className="card p-5 hover:border-accent transition-colors flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><ToolGlyph name="layers" className="h-5 w-5" /></span>
                  <div className="min-w-0">
                    <div className="font-semibold leading-snug">Compared with its neighbours</div>
                    <div className="text-xs text-muted inline-flex items-center gap-1"><CancerIcon cancerId={c.id} className="h-3.5 w-3.5" />{c.name}</div>
                  </div>
                </div>
                <p className="text-sm text-foreground/85 mt-3 flex-1">{s.title}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                  <span className="chip bg-foreground/5">{s.ids.length} cancers</span>
                  <span className="chip bg-foreground/5">{s.rows.length} rows</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 text-sm">
          <div className="card p-4 space-y-1.5">
            <h2 className="font-semibold">How the aids are built</h2>
            <p className="text-muted">Each aid lists its questions, every card it can show and a small rule that maps a complete set of answers to cards. Every card quotes the statement it implements word for word, with the grade the authors gave it and a link to the page it was read from. The rule is tested against every combination of answers. Where a guideline is silent the card says so and points at the multidisciplinary team.</p>
          </div>
          <div className="card p-4 space-y-1.5">
            <h2 className="font-semibold">Limits</h2>
            <p className="text-muted">An aid cannot see your scans, your history or your fitness for an operation, and guidelines change: check the linked source for a newer version. The <Link href="/cancers/" className="underline">cancer pages</Link> carry the decisions by treatment setting, the <Link href="/staging/" className="underline">staging page</Link> the scores, and the <Link href="/prep/" className="underline">appointment prep pack</Link> collects the questions. Educational aids, not medical advice.</p>
          </div>
        </div>
        <p className="text-xs text-muted mt-6">Cancers with an aid: {DECISION_TOOLS.map((t) => t.cancerId).filter((v, i, a) => a.indexOf(v) === i).map((id) => { const c = g.must(id); return <Link key={id} href={routeFor(c)} className="underline me-2">{c.name}</Link>; })}</p>
      </Container>
    </>
  );
}
