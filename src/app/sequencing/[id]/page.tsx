import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { evidenceLabel } from "@/lib/evidence";
import { withTermHovers } from "@/lib/term-hover";
import { sequencingFor, type SeqRef } from "@/lib/sequencing";
import { STATUS_LABEL, statusClass } from "@/lib/text";
import { Container, GroupKicker, PageHeader, Section } from "@/components/ui";
import { GuidelineChip } from "@/components/GuidelineChip";
import { Tip } from "@/components/Tip";
import { CancerIcon } from "@/components/CancerIcon";
import { PrintButton } from "@/components/PrintButton";
import { regimensFor, regimenRoute } from "@/lib/regimens";

export function generateStaticParams() {
  return graph().kind("cancer").filter((c) => c.standardOfCare.length).map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = sequencingFor(id);
  return t ? pageMeta({ title: `${t.cancer.name} · Sequencing`, description: `Lines of therapy for ${t.cancer.name} by biomarker subgroup: ${t.rows.length} standard-of-care settings across ${t.lines.length} lines, with guideline categories, evidence scores and sequence cautions.`, path: `/sequencing/${id}/` }) : {};
}

function EvidenceMini({ score }: { score: number | null }) {
  if (score === null) return <span className="text-muted text-xs">—</span>;
  const tone = score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-sky-500" : score >= 30 ? "bg-amber-500" : "bg-zinc-400";
  return (
    <Tip title={`Evidence ${score}/100 · ${evidenceLabel(score)}`} text="Best evidence-strength score among the products and trials linked to this row. How much and what kind of evidence, not how big the benefit." href="/evidence/" linkLabel="How it is scored →">
      <span className="inline-flex items-center gap-1.5 text-xs cursor-help"><span className="h-1.5 w-12 rounded bg-foreground/10 overflow-hidden"><span className={`block h-full ${tone}`} style={{ width: `${score}%` }} /></span><span className="tabular-nums">{score}</span></span>
    </Tip>
  );
}

function Ref({ r }: { r: SeqRef }) {
  return (
    <Tip title={r.name} text={r.tldr} href={r.route}>
      <Link href={r.route} className={`chip border text-[11px] ${r.kind === "drug" ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900" : r.kind === "trial" ? "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-200 dark:border-indigo-900" : "bg-card border-border"}`}>{r.name}</Link>
    </Tip>
  );
}

export default async function SequencingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = sequencingFor(id);
  if (!t) notFound();
  const regimens = regimensFor(id);
  const cellId = (line: string, sg: string) => `${line}--${sg.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="map"><span className="kicker">·</span><Link href="/sequencing/" className="kicker hover:underline">Sequencing</Link></GroupKicker>}
        title={`${t.cancer.name}: lines of therapy`}
        lede={`${t.rows.length} standard-of-care settings across ${t.lines.length} lines and ${t.subgroups.length} biomarker subgroup${t.subgroups.length === 1 ? "" : "s"}. Rows come from the cancer page's standard of care; the grid places each on its line and subgroup.`}
        logo={<span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><CancerIcon cancerId={t.cancer.id} className="h-8 w-8" /></span>}
        right={<div className="flex flex-col items-end gap-2 text-xs text-muted"><PrintButton /><Link href={`${t.cancer.route}#care`} className="underline">Cancer page →</Link></div>} />
      <Container className="pb-16">
        {/* Summary grid: line × subgroup, counts link to the rows below. */}
        <div className="card overflow-x-auto">
          <table className="onco text-xs">
            <thead><tr><th className="min-w-[180px]">Line</th>{t.subgroups.map((s) => <th key={s} className="text-center">{s}</th>)}</tr></thead>
            <tbody>
              {t.lines.map((l) => (
                <tr key={l.line}>
                  <td className="font-medium">{l.label}</td>
                  {t.subgroups.map((s) => {
                    const n = l.rows.filter((r) => r.subgroup === s).length;
                    return <td key={s} className="text-center">{n ? <a href={`#${cellId(l.line, s)}`} className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-accent-soft text-accent font-semibold tabular-nums px-1.5 hover:brightness-95">{n}</a> : <span className="text-muted/30">·</span>}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {t.lines.map((l) => (
          <Section key={l.line} title={l.label} id={l.line}>
            <div className="card overflow-x-auto">
              <table className="onco">
                <thead><tr><th className="min-w-[140px]">Subgroup</th><th className="min-w-[180px]">Setting</th><th className="min-w-[280px]">Approach</th><th className="min-w-[200px]">Products and trials</th><th className="hidden lg:table-cell">Guideline</th><th>Evidence</th></tr></thead>
                <tbody>
                  {l.rows.slice().sort((a, b) => t.subgroups.indexOf(a.subgroup) - t.subgroups.indexOf(b.subgroup)).map((r, i) => (
                    <tr key={i} id={i === 0 || l.rows[i - 1]?.subgroup !== r.subgroup ? cellId(l.line, r.subgroup) : undefined}>
                      <td><span className={`chip ${r.subgroup === "All comers" ? "bg-foreground/5 text-muted" : "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200"}`}>{r.subgroup}</span></td>
                      <td className="font-medium text-sm">{r.setting}</td>
                      <td className="text-sm text-foreground/85 max-w-md">{withTermHovers(r.approach, { skipId: t.cancer.id, max: 6 })}</td>
                      <td><div className="flex flex-wrap gap-1">{r.refs.map((x) => <Ref key={x.id} r={x} />)}</div></td>
                      <td className="hidden lg:table-cell"><GuidelineChip g={r.guideline} /></td>
                      <td><EvidenceMini score={r.evidence} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        ))}

        {t.pairings.length > 0 && (
          <Section title="Sequence and caution pairings">
            <div className="grid gap-3 md:grid-cols-2">
              {t.pairings.map((p) => (
                <Link key={p.id} href={p.route} className={`card block p-4 ${p.caution ? "border-amber-300 dark:border-amber-900" : ""}`}>
                  <div className="flex items-center gap-2 mb-1"><span className={`chip ${p.caution ? "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100" : "bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/40 dark:text-orange-200 dark:border-orange-900"}`}>{p.caution ? "Caution" : "Sequence"}</span>
                    {p.a && p.a.status && <span className={`chip ${statusClass(p.a.status)}`}>{STATUS_LABEL[p.a.status] ?? p.a.status}</span>}</div>
                  <div className="font-medium leading-snug">{p.name}</div>
                  <p className="text-sm text-muted mt-1">{p.tldr}</p>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {regimens.length > 0 && (
          <Section title="Regimens in the library">
            <div className="flex flex-wrap gap-1.5">{regimens.map((r) => <Link key={r.id} href={regimenRoute(r)} className="chip border bg-card border-border hover:bg-foreground/5">{r.name}</Link>)}</div>
          </Section>
        )}

        <p className="mt-10 text-xs text-muted max-w-3xl">Lines and subgroups are parsed from the setting text of each standard-of-care row and can misclassify an unusual phrasing; the row&rsquo;s own setting is always shown. Guideline chips reflect the NCCN category and ESMO-MCBS grade recorded on the cancer page, checked on its stated date. Not medical advice.</p>
      </Container>
    </>
  );
}
