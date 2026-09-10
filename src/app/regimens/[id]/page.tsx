import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { routeFor } from "@/lib/schema";
import { regimens } from "@/data/regimens";
import { EMETOGENICITY_LABEL, EMETOGENICITY_TIP, GCSF_LABEL, GCSF_TIP, cycleSummary, dayLabel, intentLabel, regimenById, regimenRoute, resolveRegimen, totalWeeks } from "@/lib/regimens";
import { withTermHovers } from "@/lib/term-hover";
import { Container, ChipList, GroupKicker, PageHeader, Section } from "@/components/ui";
import { DoseScheduleDiagram } from "@/components/DoseScheduleDiagram";
import { MoleculeSlot } from "@/components/MoleculeSlot";
import { Tip } from "@/components/Tip";
import { PrintButton } from "@/components/PrintButton";
import { CancerIcon } from "@/components/CancerIcon";

export function generateStaticParams() {
  return regimens.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const r = regimenById(id);
  return r ? pageMeta({ title: `${r.name} · Regimen`, description: `${r.name}: ${r.setting}. ${cycleSummary(r)}; ${r.components.map((k) => `${k.name} ${k.dose}`).join(", ")}.`, path: regimenRoute(r) }) : {};
}

const ROUTE_WORD: Record<string, string> = { IV: "IV", PO: "Oral", SC: "SC", IT: "Intrathecal", Intravesical: "Intravesical", RT: "Radiotherapy" };

export default async function RegimenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = regimenById(id);
  if (!r) notFound();
  const { cancers, trials, drugs, componentDrugs } = resolveRegimen(r);
  const weeks = totalWeeks(r);
  const idx = regimens.findIndex((x) => x.id === r.id);
  const next = regimens[(idx + 1) % regimens.length];
  const related = regimens.filter((x) => x.id !== r.id && x.cancers.some((c) => r.cancers.includes(c))).slice(0, 8);

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="map"><span className="kicker">·</span><Link href="/regimens/" className="kicker hover:underline">Regimen library</Link><span className="chip bg-foreground/5">{intentLabel(r)}</span></GroupKicker>}
        title={r.name} lede={r.setting}
        right={<div className="flex flex-col items-end gap-2 text-xs text-muted"><PrintButton /><span>Checked {r.asOf}</span></div>} />
      <Container className="pb-16">
        {r.aka?.length ? <p className="text-sm text-muted -mt-2 mb-6">Also called {r.aka.join(", ")}.</p> : null}

        <div className="card p-4 sm:p-5 overflow-hidden">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <h2 className="font-semibold">One cycle</h2>
            <span className="text-sm text-muted">{cycleSummary(r)}{weeks ? ` · about ${weeks} weeks in total` : ""}</span>
          </div>
          <DoseScheduleDiagram components={r.components} cycleDays={r.cycleDays} cycles={r.cycles} totalWeeks={weeks} />
        </div>

        <Section title="Components">
          <div className="card overflow-x-auto">
            <table className="onco">
              <thead><tr><th>Drug</th><th>Dose</th><th>Route</th><th>Days</th><th className="hidden md:table-cell">Note</th></tr></thead>
              <tbody>
                {r.components.map((k, i) => {
                  const d = componentDrugs[i];
                  return (
                    <tr key={`${k.name}-${i}`}>
                      <td className="min-w-[200px]">
                        <div className="flex items-start gap-2">
                          {d && <MoleculeSlot drugId={d.id} modality={d.modality} name={d.name} className="h-9 w-9" />}
                          <div>
                            {d ? <Tip title={d.name} text={d.tldr} href={routeFor(d)}><Link href={routeFor(d)} className="font-medium hover:underline">{k.name}</Link></Tip> : <span className="font-medium">{k.name}</span>}
                            {d && <div className="text-xs text-muted">{d.modality}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="tabular-nums">{k.dose}</td>
                      <td>{ROUTE_WORD[k.route] ?? k.route}</td>
                      <td className="tabular-nums whitespace-nowrap">{dayLabel(k)}</td>
                      <td className="hidden md:table-cell text-muted text-xs">{k.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        <div className="mt-10 grid gap-4 md:grid-cols-3 text-sm">
          <div className="card p-4"><div className="kicker mb-1">Cycles</div><div className="font-medium">{r.cycles}</div><div className="text-xs text-muted mt-1">{r.cycleDays}-day cycle</div></div>
          <div className="card p-4"><div className="kicker mb-1"><Tip title="Emetogenicity" text={EMETOGENICITY_TIP}><span className="underline decoration-dotted cursor-help">Emetogenicity</span></Tip></div><div className="font-medium">{EMETOGENICITY_LABEL[r.emetogenicity]}</div></div>
          <div className="card p-4"><div className="kicker mb-1"><Tip title="G-CSF" text={GCSF_TIP}><span className="underline decoration-dotted cursor-help">G-CSF</span></Tip></div><div className="font-medium">{GCSF_LABEL[r.gcsf]}</div></div>
        </div>

        {r.notes?.length ? (
          <Section title="Notes">
            <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed max-w-3xl">{r.notes.map((n, i) => <li key={i}>{withTermHovers(n)}</li>)}</ul>
          </Section>
        ) : null}

        <Section title="Used in">
          <div className="flex flex-wrap gap-2">
            {cancers.map((c) => <Link key={c.id} href={routeFor(c)} className="chip border bg-card border-border hover:bg-foreground/5 inline-flex items-center gap-1.5"><CancerIcon cancerId={c.id} className="h-3.5 w-3.5" />{c.name}</Link>)}
          </div>
          {trials.length > 0 && <div className="mt-4"><div className="kicker mb-1.5">Trials</div><ChipList items={trials} /></div>}
          {drugs.length > 0 && <div className="mt-4"><div className="kicker mb-1.5">Products</div><ChipList items={drugs} /></div>}
        </Section>

        <Section title="Source">
          <p className="text-sm"><a href={r.source.url} target="_blank" rel="noopener noreferrer" className="underline">{r.source.label}</a></p>
          <p className="text-xs text-muted mt-2 max-w-3xl">Reference doses for a typical adult from the cited protocol or label. Doses are adjusted for renal and hepatic function, age, performance status and prior toxicity, and institutional protocols vary. Verify against the current label and your local protocol before treating. Not medical advice.</p>
        </Section>

        {related.length > 0 && (
          <Section title="Other regimens for these cancers">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((x) => (
                <Link key={x.id} href={regimenRoute(x)} className="card block p-3 text-sm">
                  <div className="font-medium leading-snug">{x.name}</div>
                  <div className="text-xs text-muted mt-1 line-clamp-2">{x.setting}</div>
                  <div className="text-xs text-muted mt-1">{cycleSummary(x)}</div>
                </Link>
              ))}
            </div>
          </Section>
        )}

        <div className="mt-10 card p-4 flex flex-wrap items-center justify-between gap-3 text-sm max-w-3xl">
          <Link href="/regimens/" className="underline text-muted">All regimens</Link>
          <Link href={regimenRoute(next)} className="underline font-medium">{next.name} →</Link>
        </div>
      </Container>
    </>
  );
}
