import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EngineView, type GridCell, type GridItem } from "@/components/EngineView";
import { formatIndex } from "@/lib/modular";
import { COMPONENT_LABEL, engineFile, engineRoute, engineTableId, FORMATS, formatById, STATE_META, type FormatId } from "@/lib/modular-formats";
import { engineColumns, engineRows } from "@/lib/tables/engine";
import { pageRows } from "@/lib/static-tables";
import { proposedCells, PROPOSAL_STATUS, scoreParts } from "@/lib/combination-ideas-adapter";
import { Tip } from "@/components/Tip";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";

export function generateStaticParams() {
  return FORMATS.map((f) => ({ format: f.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ format: string }> }): Promise<Metadata> {
  const { format } = await params;
  const def = formatById(format);
  if (!def) return {};
  return pageMeta({ title: `${def.name}: open drug engine`, description: `Every ${def.name.toLowerCase().replace(/s$/, "")} in OnCo taken apart into ${def.components.map((k) => COMPONENT_LABEL[k].toLowerCase()).join(", ")}, and the ${COMPONENT_LABEL[def.axes[0]].toLowerCase()} by ${COMPONENT_LABEL[def.axes[1]].toLowerCase()} grid: approved, in development, tried and stopped with the recorded reason, or untried.`, path: engineRoute(def.id) });
}

const n = (x: number) => x.toLocaleString("en-GB");
const short = (s: string, max: number) => (s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s);
const SIDEBAR_MAX = 12;

export default async function EngineFormatPage({ params }: { params: Promise<{ format: string }> }) {
  const { format } = await params;
  const f = formatIndex(format as FormatId);
  if (!f) notFound();
  const def = f.format;
  const [ka, kb] = def.axes;
  const rows: GridItem[] = f.rows.map((r) => ({ id: r.id, name: r.name, href: r.href }));
  const cols: GridItem[] = f.cols.map((c) => ({ id: c.id, name: c.name, href: c.href }));
  const rowIx = new Map(rows.map((r, i) => [r.id, i])), colIx = new Map(cols.map((c, i) => [c.id, i]));
  const cells: GridCell[] = f.cells.map((c) => ({ r: rowIx.get(c.a.id)!, c: colIx.get(c.b.id)!, s: c.state, n: c.drugs.length, d: c.drugs.slice(0, 3).map((d) => d.name) }));
  const table = pageRows(engineTableId(def.id), engineRows(f));
  const columns = engineColumns(f);
  const { cells: ideas, unmatched: unplaced } = proposedCells(f);
  const tried = new Set(f.cells.map((c) => `${c.a.id}|${c.b.id}`));
  const isTried = (a: string, b: string) => tried.has(`${a}|${b}`) || tried.has(`${b}|${a}`);
  const g = graph();
  const realCols = f.cols.filter((c) => c.id !== "not-recorded").length;
  const stoppedDrugs = f.drugs.filter((d) => d.state === "stopped").length;

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pipeline funnel", href: "/pipeline/" }, { label: "Open drug engine", href: "/pipeline/engine/" }, { label: def.name, href: engineRoute(def.id) }]} />
      <PageHeader kicker={<GroupKicker id="intel"><Link href="/pipeline/engine/" className="kicker hover:underline">· Open drug engine</Link></GroupKicker>} title={def.name}
        lede={`${def.blurb} The grid below is ${COMPONENT_LABEL[ka].toLowerCase()} against ${COMPONENT_LABEL[kb].toLowerCase()}: ${n(f.rows.length)} by ${n(realCols)} from ${n(f.drugs.length)} medicines, ${n(f.counts.approved)} combinations approved, ${n(f.counts.development)} in development, ${n(f.counts.stopped)} tried and stopped, ${n(f.counts.untried)} untried in this corpus.`}
        right={<div className="flex flex-wrap gap-2"><a href={engineFile(def.id)} className="chip border bg-card border-border hover:bg-foreground/5 text-sm" title="This format's medicines, cells, components, evidence and stopped reasons as one JSON file">JSON for agents</a><Link href="/pipeline/engine/" className="chip border bg-card border-border hover:bg-foreground/5 text-sm">All formats →</Link></div>} />
      <Container className="pb-16">
        <div className="flex flex-wrap gap-1.5 mb-6 text-xs">
          {FORMATS.map((x) => <Link key={x.id} href={engineRoute(x.id)} className={`chip border ${x.id === def.id ? "bg-accent-solid text-accent-fg border-accent-solid" : "border-border bg-card hover:bg-accent-soft hover:text-accent hover:border-accent"}`} aria-current={x.id === def.id ? "page" : undefined}>{x.name}</Link>)}
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <EngineView axisKeys={[ka, kb]} axisLabels={[COMPONENT_LABEL[ka], COMPONENT_LABEL[kb]]} rows={rows} cols={cols} cells={cells} table={{ rows: table.rows, more: table.more, columns }} />
          </div>
          <aside className="space-y-6 lg:sticky lg:top-20 self-start" aria-label="Components">
            <h2 className="text-lg font-semibold tracking-tight">The parts</h2>
            {def.components.map((k) => {
              const list = f.components[k] ?? [];
              if (!list.length) return <div key={k} className="card p-4 text-sm"><h3 className="font-medium">{COMPONENT_LABEL[k]}</h3><p className="text-xs text-muted mt-1">Not recorded for any medicine in this format.</p></div>;
              const shown = list.slice(0, SIDEBAR_MAX);
              const isAxis = k === ka || k === kb;
              return (
                <div key={k} className="card p-4 text-sm">
                  <h3 className="font-medium flex items-baseline justify-between gap-2">{COMPONENT_LABEL[k]} <span className="text-xs text-muted tabular-nums">{n(list.length)} value{list.length === 1 ? "" : "s"}</span></h3>
                  <ul className="mt-2 space-y-1">
                    {shown.map((c) => (
                      <li key={c.id} className="flex items-center justify-between gap-2 text-xs">
                        <span className="min-w-0 truncate">{c.href ? <Link href={c.href} className="hover:underline" title={`${c.name}: its own page`}>{c.name}</Link> : <span title={`${c.name}: no page of its own`}>{c.name}</span>}</span>
                        <Link href={`${engineRoute(def.id)}?${k}=${encodeURIComponent(c.id)}#table`} className="chip border border-border bg-card tabular-nums hover:bg-accent-soft hover:text-accent hover:border-accent" title={`${n(c.count)} medicine${c.count === 1 ? "" : "s"} (${n(c.states.approved)} approved, ${n(c.states.development)} in development, ${n(c.states.stopped)} stopped). ${isAxis ? "Filter the grid table to this value." : "Filter the table to the cells that use it."}`}>{n(c.count)}</Link>
                      </li>
                    ))}
                  </ul>
                  {list.length > shown.length && <p className="text-xs text-muted mt-2">And {n(list.length - shown.length)} more; every value is a filter pill on the {COMPONENT_LABEL[k]} column of the table.</p>}
                </div>
              );
            })}
          </aside>
        </div>

        <section id="stopped" className="mt-12 scroll-mt-20">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h2 className="text-lg font-semibold tracking-tight">Stopped, and why</h2>
            <span className="text-xs text-muted">{n(stoppedDrugs)} medicine{stoppedDrugs === 1 ? "" : "s"} recorded as stopped; {n(f.stopped.length)} recorded reason{f.stopped.length === 1 ? "" : "s"}, including stopped studies of medicines still in development</span>
          </div>
          {f.stopped.length === 0 ? <p className="text-sm text-muted">No stopped study, withdrawn approval or negative result is recorded for a medicine in this format.</p> : (
            <ol className="grid gap-3 md:grid-cols-2">
              {f.stopped.map((r, i) => (
                <li key={`${r.drugId}-${r.record}-${i}`} className="card p-4 text-sm">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <Link href={r.drugRoute} className="font-medium hover:underline">{r.drugName}</Link>
                    <span className={`chip ${STATE_META[r.drugState].chip} text-xs`} title={STATE_META[r.drugState].tip}>{STATE_META[r.drugState].label}</span>
                  </div>
                  <blockquote className="text-muted leading-relaxed border-s-2 border-border ps-3">{short(r.quote, 320)}</blockquote>
                  <p className="text-xs mt-2">{/^https?:/.test(r.href) ? <a href={r.href} rel="noopener" className="underline">{r.label}</a> : <Link href={r.href} className="underline">{r.label}</Link>}{r.kind === "trial" && g.get(r.record)?.kind === "trial" ? <span className="text-muted"> · trial record</span> : r.kind === "regional" ? <span className="text-muted"> · regulator row</span> : r.kind === "registry" ? <span className="text-muted"> · registry index</span> : null}</p>
                </li>
              ))}
            </ol>
          )}
        </section>

        {ideas.length > 0 && (
          <section id="proposed" className="mt-12 scroll-mt-20">
            <div className="flex items-baseline justify-between gap-4 mb-3">
              <h2 className="text-lg font-semibold tracking-tight">Proposed, not yet tried</h2>
              <span className="text-xs text-muted">{n(ideas.length)} proposal{ideas.length === 1 ? "" : "s"} from the <Link href="/pipeline/engine/#open-pipeline" className="underline">open pipeline</Link>, scored and searched (docs/OPEN-PIPELINE.md); hypotheses, not records of a medicine</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3 text-xs">
              {Object.entries(PROPOSAL_STATUS).map(([k, s]) => { const count = ideas.filter((i) => i.status === k).length; return count ? <Tip key={k} title={s.label} text={s.tip}><span className={`chip ${s.chip} cursor-help`}>{s.label} <span className="tabular-nums opacity-80">{count}</span></span></Tip> : null; })}
              {unplaced.length > 0 && <span className="chip border border-border bg-card text-muted" title={unplaced.map((u) => `${u.id}: ${u.axis} "${u.value}" ${u.why}`).join("; ")}>{unplaced.length} value{unplaced.length === 1 ? "" : "s"} not matched to the grid</span>}
            </div>
            <div className="overflow-x-auto card">
              <table className="onco text-sm">
                <thead><tr><th>Score</th><th>{COMPONENT_LABEL[ka]}</th><th>{COMPONENT_LABEL[kb]}</th><th>Status</th><th>Rationale</th><th>Evidence</th><th>Now in the corpus</th></tr></thead>
                <tbody>
                  {ideas.map((i) => {
                    const a = f.rows.find((r) => r.id === i.a), b = f.cols.find((c) => c.id === i.b);
                    const ta = !a && g.get(i.a), tb = !b && g.get(i.b);
                    const st = PROPOSAL_STATUS[i.status];
                    return (
                      <tr key={i.id} id={`proposal-${i.id}`}>
                        <td className="tabular-nums font-semibold"><Tip title={i.name} text={scoreParts(i.score)}><span className="underline decoration-dotted decoration-foreground/30 underline-offset-[3px] cursor-help">{i.score.total}</span></Tip></td>
                        <td className="font-medium">{a?.href ? <Link href={a.href} className="hover:underline">{a.name}</Link> : ta ? <Link href={routeFor(ta)} className="hover:underline" title="A target no medicine of this format has used yet: a new row">{ta.name}</Link> : <span title={i.unmatched.includes(i.raw.a) ? "Not matched to a grid row" : undefined} className={i.unmatched.includes(i.raw.a) ? "text-muted italic" : ""}>{a?.name ?? i.raw.a}</span>}</td>
                        <td>{b?.href ? <Link href={b.href} className="hover:underline">{b.name}</Link> : tb ? <Link href={routeFor(tb)} className="hover:underline">{tb.name}</Link> : <span title={i.unmatched.includes(i.raw.b) ? "Not matched to a grid column" : undefined} className={i.unmatched.includes(i.raw.b) ? "text-muted italic" : ""}>{b?.name ?? i.raw.b}</span>}</td>
                        <td>{st ? <span className={`chip ${st.chip} text-xs`} title={st.tip}>{st.label}</span> : <span className="chip border border-border text-xs">{i.statusLabel}</span>}</td>
                        <td className="text-muted max-w-md"><span className="font-medium text-foreground">{i.name}.</span> {i.rationale}<span className="block text-xs mt-1">Caveat: {i.caveat}</span><span className="block text-xs mt-1">Proposed by {i.proposedBy}, searched {i.on}.</span></td>
                        <td><div className="flex flex-wrap gap-1.5">{i.evidence.map((ev, k) => <a key={`${ev.url}-${k}`} href={ev.url} rel="noopener" title={ev.quote} className={`chip border border-border bg-card text-xs hover:ring-2 hover:ring-accent/30 ${ev.adjacent ? "text-muted" : ""}`}>{ev.label}</a>)}{i.refs.map((id) => { const e = g.get(id); return e ? <Link key={id} href={routeFor(e)} className="chip border border-border bg-card text-xs hover:ring-2 hover:ring-accent/30">{e.name}</Link> : null; })}{!i.evidence.length && !i.refs.length && <span className="text-xs text-muted">None found</span>}</div></td>
                        <td>{i.matched && isTried(i.a, i.b) ? <Link href={`${engineRoute(def.id)}?${ka}=${encodeURIComponent(i.a)}&${kb}=${encodeURIComponent(i.b)}#table`} className="chip tone-live text-xs">Now tried: see the cell</Link> : <span className="chip border border-dashed border-border text-muted text-xs">Untried</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section id="unresolved" className="mt-12 scroll-mt-20">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h2 className="text-lg font-semibold tracking-tight">Not placed</h2>
            <span className="text-xs text-muted">{n(f.unresolved.length)} of {n(f.coverage.total)} medicines in this format ({100 - f.coverage.pct}%)</span>
          </div>
          {f.unresolved.length === 0 ? <p className="text-sm text-muted">Every medicine in this format has its {COMPONENT_LABEL[ka].toLowerCase()} on a record.</p> : (
            <>
              <p className="text-sm text-muted mb-3 max-w-3xl">These medicines belong to the format but their {COMPONENT_LABEL[ka].toLowerCase()} is on no record the engine reads: the targets field is empty, the target lists no such drug, the trials linked to it name no target of its own, and the modality, mechanism and summary text name none the corpus knows. They are listed here rather than placed by guesswork; adding the {COMPONENT_LABEL[ka].toLowerCase()} to the record puts them in the grid on the next build.</p>
              <div className="flex flex-wrap gap-1.5">
                {f.unresolved.map((u) => <Link key={u.id} href={u.route} className="chip border border-border bg-card text-xs hover:bg-accent-soft hover:text-accent hover:border-accent" title={`${u.modality}. Missing: ${u.missing.map((k) => COMPONENT_LABEL[k].toLowerCase()).join(", ")}.`}>{u.name}</Link>)}
              </div>
            </>
          )}
        </section>

        <section className="mt-12 grid md:grid-cols-2 gap-6 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How this grid is read from the records</h2>
            <p>Each medicine&apos;s parts come from its own record: the targets field first, else the target records that list the medicine, else a sibling conjugate that shares its antibody name, else the trials linked to it, else the target names the corpus knows found in its modality, mechanism or summary text. {def.id === "adc" ? "Payloads come from the ADC payload registry, the payload field, or the INN stem of the name (deruxtecan is DXd, vedotin is MMAE, tesirine is a PBD dimer); the linker type from the linker registry or field; the DAR from the payload field where it is written." : def.id === "radioligand" ? "The isotope is read from the name, modality or mechanism (177Lu, 225Ac, 212Pb, 223Ra, 131I and the rest); its emission is a fixed physics table; the chelator and ligand class from the mechanism text." : def.id === "car-t" ? "The costimulatory domain, binder, vector and cell source are read from the mechanism and modality text (4-1BB or CD28, scFv or VHH, lentiviral or retroviral, autologous or allogeneic); a part the text does not name is shown as not recorded." : def.id === "bispecific" ? "The two arms come from the targets field, with the effector arm (CD3, CD28, CD137, CD47) taking the column; where a record names one arm, the other is read from the modality or mechanism text, and the format (BiTE, DuoBody, 2:1, ImmTAC) from the same text." : def.id === "degrader" ? "The E3 ligase is read from the mechanism and modality text (cereblon for CELMoDs, IMiDs and most PROTACs, VHL where stated); a degrader whose text names no ligase is shown as not recorded." : "The second part is read from the medicine's technology links first and from its modality and mechanism text second; a part no record names is shown as not recorded."} Every part carries the fields it was read from and a confidence in the JSON file.</p>
          </div>
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">What the states mean, and do not</h2>
            <p>Approved: a medicine in the cell has an approval row or a regulator&apos;s approved entry and is not recorded as withdrawn. In development: a recruiting, active or planned trial, a development-phase record status, or active studies in the ClinicalTrials.gov index, and no approval. Tried and stopped: every medicine in the cell is withdrawn, negative or historic, or its only trial evidence is a terminated, withdrawn or negative study, or its approval was withdrawn. Untried: no medicine in this corpus combines the two parts.</p>
            <p>A cell is coloured by its strongest medicine; the table shows each medicine with its own state. The reasons quoted under Stopped, and why are the records&apos; words, including the registry&apos;s whyStopped text where the sponsor wrote one, and include stopped studies of medicines that are still in development elsewhere. Nothing here is medical advice.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
