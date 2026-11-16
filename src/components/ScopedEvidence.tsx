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

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return <div><dt className="font-medium">{label}</dt><dd>{children}</dd></div>;
}

export function RegulatoryClaims({ claims }: { claims: RegulatoryClaim[] }) {
  return <div className="space-y-5 text-sm" data-regulatory-claims>{claims.map((c, i) => <section key={i} className="min-w-0">
    <h3 className="font-medium">{c.subject.name} · {c.claimType.replaceAll("-", " ")}</h3>
    <p className="text-muted">{c.subject.type.replaceAll("-", " ")} · {c.authority} · {c.jurisdiction}</p>
    <p className="mt-1">{c.scope}</p><p className="mt-1">{c.statement}</p>
    <dl className="space-y-1 mt-2">
      {!!c.intendedUse?.diseaseIds?.length && <Detail label="Disease"><EntityNames ids={c.intendedUse.diseaseIds} /></Detail>}
      {!!c.intendedUse?.therapyIds?.length && <Detail label="Therapy"><EntityNames ids={c.intendedUse.therapyIds} /></Detail>}
      {c.intendedUse?.specimen && <Detail label="Specimen">{c.intendedUse.specimen}</Detail>}
      {c.intendedUse?.decisionRule && <Detail label="Decision rule">{c.intendedUse.decisionRule}</Detail>}
      {c.intendedUse?.setting && <Detail label="Setting">{c.intendedUse.setting}</Detail>}
      {c.effectiveOn && <Detail label="Effective date">{c.effectiveOn}</Detail>}
      {c.endedOn && <Detail label="End date">{c.endedOn}</Detail>}
    </dl>
    <ObservationSources observation={c} />
  </section>)}</div>;
}

export function ConjugateComposition({ composition: c }: { composition: ConjugateComposition }) {
  return <div className="text-sm space-y-4" data-conjugate-composition>
    <dl><Detail label="Delivery target">{c.deliveryTargetIds?.length ? <EntityNames ids={c.deliveryTargetIds} /> : "Not recorded here"}</Detail></dl>
    {c.payloads.map(p => <section key={p.id} className="min-w-0" data-payload-component={p.id}>
      <h3 className="font-medium">{p.chemical.entityId ? <EntityReference id={p.chemical.entityId} label={p.chemical.name} /> : p.chemical.name}</h3>
      <p>{p.cargoKind.replaceAll("-", " ")} · {p.mechanism}</p>
      <dl className="space-y-2 mt-2">
        {!!p.classIds?.length && <Detail label="Payload class"><EntityNames ids={p.classIds} /></Detail>}
        {!!p.molecularTargets?.length && <Detail label="Payload molecular targets">{p.molecularTargets.map((t, i) => <span key={i}>{i > 0 && ", "}{t.entityId ? <EntityReference id={t.entityId} label={t.name} /> : t.name}</span>)}</Detail>}
        {p.attachedSpecies && <Detail label="Attached species">{p.attachedSpecies}</Detail>}
        <Detail label="Released species">{p.releasedSpecies?.length ? <ul className="space-y-2">{p.releasedSpecies.map((s, i) => <li key={i}>{s.chemical.name}: {s.context}<ObservationSources observation={s} inherited={p} /></li>)}</ul> : "Not recorded here"}</Detail>
        <Detail label="Mean loading">{p.loadingObservations?.length ? <ul className="space-y-2">{p.loadingObservations.map((l, i) => <li key={i}>{l.value} {l.unit === "payload-molecules/antibody" ? "payload molecules per antibody" : "radionuclide atoms per antibody"}. {l.scope}{l.method && <> Method: {l.method}.</>}{l.distributionNote && <> {l.distributionNote}</>}<ObservationSources observation={l} inherited={p} /></li>)}</ul> : "Not recorded here"}</Detail>
      </dl>
      {p.note && <p className="mt-2">{p.note}</p>}
      <ObservationSources observation={p} inherited={c} />
    </section>)}
    {c.note && <p>{c.note}</p>}
    <ObservationSources observation={c} />
  </div>;
}
