import Link from "next/link";
import { ScrollRow } from "./ScrollRow";
import type { Biomarker } from "@/lib/schema";
import { routeFor } from "@/lib/kinds";
import { graph } from "@/lib/graph";
import { hasApproval, isGenomeWide, MEASUREMENT_META, parentTarget, readoutsForDrug, readoutsForTarget, readoutsForTerm, siblingReadouts, thresholdDrugs, trialsNaming } from "@/lib/biomarkers";
import { TUMOUR_TESTS } from "@/data/tumour-tests";
import { assays } from "@/data/assays";
import { statusClass } from "@/lib/text";
import { TargetSchematic } from "./TargetSchematic";
import { KindIcon } from "./KindIcon";
import { TL } from "./T";

/**
 * The biomarker readout page body and the strips other pages borrow: the parent target's "Readouts and scores", the
 * drug page's "Readouts the label requires" and the glossary term's "This readout has its own page". Server-rendered;
 * every chip is a link and no anchor nests inside another.
 */

const pill = "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-sm hover:border-accent hover:bg-accent-soft";

/** Measurement pill with its glyph; links to the browser filtered by measurement. */
export function MeasurementPill({ bm, className = "" }: { bm: Biomarker; className?: string }) {
  const m = MEASUREMENT_META[bm.measurement];
  return <Link href={`/biomarkers/?measurement=${encodeURIComponent(m.label)}`} title={m.tip} className={`${pill} ${className}`}><span aria-hidden className="text-accent tabular-nums">{m.glyph}</span><span>{m.label}</span></Link>;
}

/** "Part of" strip: the parent target and the sibling readouts, shown before anything else on a readout page. */
function PartOf({ bm }: { bm: Biomarker }) {
  const parent = parentTarget(bm);
  const sibs = siblingReadouts(bm);
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 text-sm" aria-label="Parent gene and sibling readouts">
      {parent
        ? <><span className="text-muted"><TL text="Part of" /></span><Link href={routeFor(parent)} title={parent.tldr} className={pill}><KindIcon kind="target" className="h-4 w-4 shrink-0 text-accent" /><span>{parent.name}</span>{parent.symbol && <span className="text-muted">· {parent.symbol}</span>}</Link></>
        : <span className={`${pill} border-dashed`} title={bm.noParentReason ?? "This readout measures the genome as a whole rather than one gene or protein, so it has no parent target."}><span aria-hidden className="text-accent">∑</span><span>{bm.noParentReason ? "No single parent gene" : "Genome-wide readout"}</span></span>}
      {sibs.length > 0 && <><span className="text-muted">{parent ? <TL text="Other readouts" /> : <TL text="Other genome-wide readouts" />}</span>{sibs.map((s) => <Link key={s.id} href={routeFor(s)} title={s.tldr} className={pill}><span aria-hidden className="text-accent tabular-nums">{MEASUREMENT_META[s.measurement].glyph}</span><span>{s.name.replace(/\s*\(.*$/, "")}</span></Link>)}</>}
      <Link href="/biomarkers/" className={`${pill} border-dashed text-muted`}><KindIcon kind="biomarker" className="h-3.5 w-3.5 shrink-0" /><span>All readouts</span></Link>
    </div>
  );
}

function Kicker({ text }: { text: string }) { return <div className="kicker mb-2"><TL text={text} /></div>; }

/** The readout page: part-of strip, measurement, scoring rule, thresholds, companion diagnostics, tests, trials, and the patient paragraph. */
export function BiomarkerDetail({ bm }: { bm: Biomarker }) {
  const g = graph();
  const parent = parentTarget(bm);
  const current = bm.thresholds.filter((t) => t.status === "current");
  const past = bm.thresholds.filter((t) => t.status !== "current");
  const tests = TUMOUR_TESTS.filter((t) => bm.tests.includes(t.id));
  const assayRows = assays.filter((a) => bm.assays.includes(a.id));
  const trials = trialsNaming(bm);
  const named = thresholdDrugs(bm);
  const ent = (id: string) => g.get(id);
  return (
    <div className="mt-8 space-y-8">
      <PartOf bm={bm} />
      {parent && <TargetSchematic target={{ id: parent.id, name: parent.name, targetClass: parent.targetClass, tldr: parent.tldr }} />}
      <div className="flex flex-wrap items-center gap-2">
        <MeasurementPill bm={bm} />
        <Link href={`/biomarkers/?approval=${encodeURIComponent(hasApproval(bm) ? "Has approval threshold" : "No approval threshold")}`} className={`chip border ${hasApproval(bm) ? statusClass("approved") : "bg-foreground/5 border-border text-muted"}`} title={hasApproval(bm) ? `${current.length} approval threshold${current.length === 1 ? "" : "s"} on a current label` : "No approval uses this readout as a threshold; the guideline or trial that defines it is cited below."}>{hasApproval(bm) ? `${current.length} approval threshold${current.length === 1 ? "" : "s"}` : "No approval threshold"}</Link>
        {isGenomeWide(bm.measurement) && <span className="chip bg-foreground/5" title="Measured across the genome rather than on one gene">genome-wide</span>}
      </div>

      <section className="card p-4 bg-accent-soft/60 border-accent/20">
        <Kicker text="What it means for a patient" />
        <p className="text-[15px] leading-relaxed">{bm.forPatient}</p>
        <p className="text-xs text-muted mt-2">Written only from the label or guideline text cited on this page. Not medical advice; your own report and the reading your team gives it come first.</p>
      </section>

      <section>
        <Kicker text="Scoring rule" />
        <p className="text-[15px] leading-relaxed max-w-3xl">{bm.scoringRule.text}</p>
        <blockquote className="mt-2 border-s-2 border-accent/40 ps-3 text-sm text-muted" lang="en">“{bm.scoringRule.quote}”<br /><a className="underline" href={bm.scoringRule.source} rel="noopener">{bm.scoringRule.sourceLabel}</a></blockquote>
      </section>

      <section id="thresholds">
        <Kicker text="Thresholds used in approvals" />
        {current.length === 0 && (
          <p className="text-sm text-muted max-w-3xl">No approval uses this readout as a threshold{bm.definedBy ? <>. It is defined by <a className="underline" href={bm.definedBy.url} rel="noopener">{bm.definedBy.label}</a>.</> : "."}</p>
        )}
        {current.length > 0 && <ThresholdTable rows={current} />}
        {past.length > 0 && <details className="mt-3 text-sm"><summary className="cursor-pointer text-muted">{past.length} historic or withdrawn threshold{past.length === 1 ? "" : "s"}</summary><div className="mt-2"><ThresholdTable rows={past} /></div></details>}
        {bm.definedBy && current.length > 0 && <p className="text-xs text-muted mt-2">Also defined by <a className="underline" href={bm.definedBy.url} rel="noopener">{bm.definedBy.label}</a>.</p>}
      </section>

      {named.length > 0 && (
        <section>
          <Kicker text="Drugs whose label names it" />
          <div className="flex flex-wrap gap-1.5">{named.map((d) => <Link key={d.id} href={routeFor(d)} title={d.tldr} className={pill}><KindIcon kind="drug" className="h-3.5 w-3.5 text-accent" /><span>{d.name}</span></Link>)}</div>
        </section>
      )}

      {bm.companionDiagnostics.length > 0 && (
        <section id="companion-diagnostics">
          <Kicker text="Companion diagnostics (FDA list)" />
          <ScrollRow className="card"><table className="onco text-sm"><thead><tr><th>Device</th><th>Maker</th><th>Indication and sample</th><th>Drug</th><th>PMA / 510(k)</th></tr></thead>
            <tbody>{bm.companionDiagnostics.map((c, i) => {
              const co = c.companyId ? ent(c.companyId) : undefined;
              return <tr key={i}><td className="font-medium">{c.device}</td><td>{co ? <Link className="underline" href={routeFor(co)}>{c.maker}</Link> : c.maker}</td><td className="text-muted">{c.indication}</td><td>{c.drugs.map((id) => { const d = ent(id); return d ? <Link key={id} className="underline me-2" href={routeFor(d)}>{d.name}</Link> : null; })}</td><td className="text-muted tabular-nums"><a className="underline" href={c.source} rel="noopener">{c.pma ?? "FDA list"}</a></td></tr>;
            })}</tbody></table></ScrollRow>
        </section>
      )}

      {(tests.length > 0 || assayRows.length > 0) && (
        <section id="tests">
          <Kicker text="Tests that measure it" />
          <div className="flex flex-wrap gap-1.5">
            {assayRows.map((a) => <Link key={a.id} href={`/assays/#${a.id}`} title={a.cutoff} className={pill}><span aria-hidden className="text-accent">⚗</span><span>{a.name}</span></Link>)}
            {tests.map((t) => <Link key={t.id} href={`/tumour-testing/#${t.id}`} title={t.returns} className={pill}><span aria-hidden className="text-accent">≡</span><span>{t.name}</span></Link>)}
          </div>
        </section>
      )}

      {trials.length > 0 && (
        <section id="trials">
          <Kicker text="Trials that name this readout" />
          <p className="text-xs text-muted mb-2">Matched on the name and aliases of the readout in the title, setting and summary of each trial; a match is a mention, not proof the readout was an entry criterion.</p>
          <ul className="grid gap-2 sm:grid-cols-2">{trials.map((t) => <li key={t.id}><Link href={routeFor(t)} className="card p-3 block hover:shadow-md transition"><div className="text-xs text-muted mb-0.5">{t.nct ?? "no registry id"}{t.yearReported ? ` · ${t.yearReported}` : ""}</div><div className="text-sm font-medium leading-snug line-clamp-2">{t.name}</div></Link></li>)}</ul>
        </section>
      )}
    </div>
  );
}

function ThresholdTable({ rows }: { rows: Biomarker["thresholds"] }) {
  const g = graph();
  return (
    <ScrollRow className="card"><table className="onco text-sm"><thead><tr><th>Threshold</th><th>Drug</th><th>Cancer</th><th>Regulator</th><th>Source</th></tr></thead>
      <tbody>{rows.map((t, i) => {
        const d = g.get(t.drugId); const c = g.get(t.cancerId);
        return (
          <tr key={i} className={t.status !== "current" ? "opacity-70" : undefined}>
            <td className="font-medium"><span title={t.quote ?? undefined}>{t.value}</span>{t.status !== "current" && <span className={`chip ms-2 ${statusClass(t.status === "withdrawn" ? "withdrawn" : "historic")}`}>{t.status}</span>}{t.note && <div className="text-xs text-muted mt-0.5 max-w-md">{t.note}</div>}</td>
            <td>{d ? <Link className="underline" href={routeFor(d)}>{d.name}</Link> : t.drugId}</td>
            <td>{c ? <Link className="underline" href={routeFor(c)}>{c.name}</Link> : t.cancerId}</td>
            <td>{t.regulator}</td>
            <td><a className="underline" href={t.source} rel="noopener" title={t.quote ?? undefined}>label</a></td>
          </tr>
        );
      })}</tbody></table></ScrollRow>
  );
}

/** Target page block: the readouts and scores that hang off this gene or protein. */
export function ReadoutStrip({ targetId }: { targetId: string }) {
  const rows = readoutsForTarget(targetId);
  if (!rows.length) return null;
  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2"><div className="kicker"><TL text="Readouts and scores" /></div><Link href="/biomarkers/" className="text-sm text-accent hover:underline">All readouts →</Link></div>
      <p className="text-sm text-muted mb-3">What a pathology or genomic report can say about this target, each with the thresholds approvals use.</p>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{rows.map((bm) => {
        const m = MEASUREMENT_META[bm.measurement]; const n = bm.thresholds.filter((t) => t.status === "current").length;
        return <li key={bm.id}><Link href={routeFor(bm)} className="card p-3 block h-full hover:shadow-md transition" title={bm.tldr}><div className="flex flex-wrap items-center gap-1.5 mb-1 text-xs"><span className="chip bg-foreground/5" title={m.tip}><span aria-hidden className="text-accent me-1">{m.glyph}</span>{m.label}</span>{n > 0 ? <span className={`chip ${statusClass("approved")}`}>{n} approval{n === 1 ? "" : "s"}</span> : <span className="chip bg-foreground/5 text-muted">no approval threshold</span>}</div><div className="text-sm font-medium leading-snug">{bm.name}</div></Link></li>;
      })}</ul>
    </section>
  );
}

/** Drug page block: the readouts this drug's label requires (threshold-named) or that list the drug. */
export function ReadoutsForDrug({ drugId }: { drugId: string }) {
  const rows = readoutsForDrug(drugId);
  if (!rows.length) return null;
  const required = rows.filter((r) => r.required);
  const other = rows.filter((r) => !r.required);
  return (
    <div className="mt-6">
      <div className="kicker mb-2"><TL text={required.length ? "Biomarker the label requires" : "Biomarker readouts"} /></div>
      <div className="flex flex-wrap gap-1.5">
        {required.map(({ biomarker: bm }) => <Link key={bm.id} href={routeFor(bm)} title={bm.tldr} className={`${pill} border-accent/40 bg-accent-soft`}><span aria-hidden className="text-accent tabular-nums">{MEASUREMENT_META[bm.measurement].glyph}</span><span>{bm.name.replace(/\s*\(.*$/, "")}</span><span className="text-xs text-muted">required</span></Link>)}
        {other.map(({ biomarker: bm }) => <Link key={bm.id} href={routeFor(bm)} title={bm.tldr} className={pill}><span aria-hidden className="text-accent tabular-nums">{MEASUREMENT_META[bm.measurement].glyph}</span><span>{bm.name.replace(/\s*\(.*$/, "")}</span></Link>)}
      </div>
    </div>
  );
}

/** Glossary term block: the readout page(s) that carry the thresholds for this term. */
export function ReadoutsForTerm({ termId }: { termId: string }) {
  const rows = readoutsForTerm(termId);
  if (!rows.length) return null;
  return (
    <div className="mt-6 card p-4 bg-accent-soft/60 border-accent/20 text-sm">
      <div className="kicker mb-1"><TL text="This readout has its own page" /></div>
      <p className="text-muted mb-2">The glossary entry explains the word; the readout page carries the scoring rule, the thresholds approvals use, the companion diagnostics and the tests.</p>
      <div className="flex flex-wrap gap-1.5">{rows.map((bm) => <Link key={bm.id} href={routeFor(bm)} title={bm.tldr} className={pill}><KindIcon kind="biomarker" className="h-3.5 w-3.5 text-accent" /><span>{bm.name}</span></Link>)}</div>
    </div>
  );
}
