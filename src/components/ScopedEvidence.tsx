import Link from "next/link";
import type { ReactNode } from "react";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/kinds";
import type { ConjugateComposition, RegulatoryClaim } from "@/lib/scoped-evidence";

type Observation = { checkedOn: string; sourceDate?: string; sourceVersion?: string; sources: Array<{ label: string; url: string }> };

export function ObservationSources({ observation: o, inherited }: { observation: Observation; inherited?: Observation }) {
  // The containing observation already displays an identical citation/date. Different source versions
  // or check dates remain visible on the specific observation rather than silently inheriting them.
  const key = (v: Observation) => JSON.stringify([v.sources, v.checkedOn, v.sourceDate, v.sourceVersion]);
  if (inherited && key(o) === key(inherited)) return null;
  return <div className="text-xs text-muted mt-1">
    <p>Checked {o.checkedOn}.{o.sourceDate && <> Source dated {o.sourceDate}.</>}{o.sourceVersion && <> {o.sourceVersion}.</>}</p>
    <ul>{o.sources.map((s, i) => <li key={`${s.url}-${i}`}><a className="inline-flex min-h-11 items-center underline break-words max-w-full" href={s.url} rel="noopener">{s.label}</a></li>)}</ul>
  </div>;
}

function EntityNames({ ids }: { ids: string[] }) {
  return ids.map((id, i) => <span key={id}>{i > 0 && ", "}<EntityReference id={id} /></span>);
}

function EntityReference({ id, label }: { id: string; label?: string }) {
  const e = graph().must(id);
  return <Link className="inline-flex min-h-11 min-w-11 max-w-full items-center underline [overflow-wrap:anywhere]" href={routeFor(e)}>{label ?? e.name}</Link>;
}

/** A plain label a patient can follow; the term of art, where there is one, is the tooltip. */
function Detail({ label, term, children }: { label: string; term?: string; children: ReactNode }) {
  return <div><dt className="font-medium" title={term}>{label}</dt><dd>{children}</dd></div>;
}

const GAP = "Not recorded here";
const GAP_NOTE = "\u201cNot recorded here\u201d marks a gap in OnCo\u2019s record, not a finding: the source read for this entry does not state it.";

const CLAIM_TYPE: Record<RegulatoryClaim["claimType"], string> = {
  "laboratory-certification": "laboratory certification", "development-designation": "development designation", "marketing-authorization": "approved for sale",
  clearance: "cleared", "emergency-authorization": "emergency authorisation", "conformity-mark": "conformity mark", "registration-listing": "registered",
  "laboratory-developed": "developed and run by one laboratory", "research-use": "research use only", withdrawal: "withdrawn", other: "other",
};
const SUBJECT_TYPE: Record<RegulatoryClaim["subject"]["type"], string> = { laboratory: "A laboratory", product: "A test product", "test-system": "A test system" };
const CARGO_KIND: Record<ConjugateComposition["payloads"][number]["cargoKind"], string> = { "small-molecule": "Small-molecule drug", protein: "Protein", oligonucleotide: "Oligonucleotide", radionuclide: "Radioactive atom", other: "Other cargo" };

export function RegulatoryClaims({ claims }: { claims: RegulatoryClaim[] }) {
  return <div className="space-y-5 text-sm" data-regulatory-claims>{claims.map((c, i) => <section key={i} className="min-w-0">
    <h3 className="font-medium">{c.subject.name} · <span title={c.claimType.replaceAll("-", " ")}>{CLAIM_TYPE[c.claimType]}</span></h3>
    <p className="text-muted">{SUBJECT_TYPE[c.subject.type]} · {c.authority} · {c.jurisdiction}</p>
    <p className="mt-1">{c.scope}</p><p className="mt-1">{c.statement}</p>
    <dl className="space-y-1 mt-2">
      {!!c.intendedUse?.diseaseIds?.length && <Detail label="Cancer"><EntityNames ids={c.intendedUse.diseaseIds} /></Detail>}
      {!!c.intendedUse?.therapyIds?.length && <Detail label="Treatment it is used with"><EntityNames ids={c.intendedUse.therapyIds} /></Detail>}
      {c.intendedUse?.specimen && <Detail label="Sample tested" term="Specimen">{c.intendedUse.specimen}</Detail>}
      {c.intendedUse?.decisionRule && <Detail label="Cut-off" term="Decision rule: the result that counts as positive for this use">{c.intendedUse.decisionRule}</Detail>}
      {c.intendedUse?.setting && <Detail label="Setting">{c.intendedUse.setting}</Detail>}
      {c.effectiveOn && <Detail label="In force from">{c.effectiveOn}</Detail>}
      {c.endedOn && <Detail label="Ended">{c.endedOn}</Detail>}
    </dl>
    <ObservationSources observation={c} />
  </section>)}</div>;
}

export function ConjugateComposition({ composition: c }: { composition: ConjugateComposition }) {
  const gaps = !c.deliveryTargetIds?.length || c.payloads.some(p => !p.releasedSpecies?.length || !p.loadingObservations?.length);
  return <div className="text-sm space-y-4 max-w-3xl" data-conjugate-composition>
    <dl><Detail label="What the antibody homes in on" term="Delivery target: the molecule on the cell surface that the antibody binds">{c.deliveryTargetIds?.length ? <EntityNames ids={c.deliveryTargetIds} /> : GAP}</Detail></dl>
    {c.payloads.map(p => <section key={p.id} className="min-w-0" data-payload-component={p.id}>
      <h3 className="font-medium">{p.chemical.entityId ? <EntityReference id={p.chemical.entityId} label={p.chemical.name} /> : p.chemical.name}</h3>
      <p>{CARGO_KIND[p.cargoKind]} · {p.mechanism}</p>
      <dl className="space-y-2 mt-2">
        {!!p.classIds?.length && <Detail label="Family of drug" term="Payload class"><EntityNames ids={p.classIds} /></Detail>}
        {!!p.molecularTargets?.length && <Detail label="What the drug acts on inside the cell" term="Molecular target of the payload, which is not the target the antibody binds">{p.molecularTargets.map((t, i) => <span key={i}>{i > 0 && ", "}{t.entityId ? <EntityReference id={t.entityId} label={t.name} /> : t.name}</span>)}</Detail>}
        {p.attachedSpecies && <Detail label="Form attached to the antibody" term="Attached species: the linker and drug as joined to the antibody">{p.attachedSpecies}</Detail>}
        <Detail label="Forms found after the body breaks it down" term="Released species and catabolites, each with where it was measured">{p.releasedSpecies?.length ? <ul className="space-y-2">{p.releasedSpecies.map((s, i) => <li key={i}>{s.chemical.name}: {s.context}<ObservationSources observation={s} inherited={p} /></li>)}</ul> : GAP}</Detail>
        <Detail label="Average number of drug molecules on each antibody" term="Mean loading, also called the drug-to-antibody ratio (DAR)">{p.loadingObservations?.length ? <ul className="space-y-2">{p.loadingObservations.map((l, i) => <li key={i}>{l.value} {l.unit === "payload-molecules/antibody" ? "payload molecules per antibody" : "radionuclide atoms per antibody"}. {l.scope}{l.method && <> Method: {l.method}.</>}{l.distributionNote && <> {l.distributionNote}</>}<ObservationSources observation={l} inherited={p} /></li>)}</ul> : GAP}</Detail>
      </dl>
      {p.note && <p className="mt-2">{p.note}</p>}
      <ObservationSources observation={p} inherited={c} />
    </section>)}
    {c.note && <p>{c.note}</p>}
    {gaps && <p className="text-xs text-muted">{GAP_NOTE}</p>}
    <ObservationSources observation={c} />
  </div>;
}
