import type { ChemicalPropertyObservation, ConjugateComposition, RegulatoryClaim } from "./scoped-evidence";
import type { Drug, Pathway, Term, Trial } from "./schema";

type Observation = { checkedOn: string; sourceDate?: string; sourceVersion?: string };
const dates = (o: Observation) => [`Checked ${o.checkedOn}`, o.sourceDate ? `Source dated ${o.sourceDate}` : "", o.sourceVersion].filter(Boolean).join(". ");

/** Keep the scope beside the searchable statement; a status word alone loses its subject and use. */
export function regulatoryClaimText(c: RegulatoryClaim): string {
  return [c.subject.type, c.subject.name, c.claimType, c.authority, c.jurisdiction, c.scope, c.statement,
    c.intendedUse?.specimen, c.intendedUse?.decisionRule, c.intendedUse?.setting,
    ...(c.intendedUse?.diseaseIds ?? []), ...(c.intendedUse?.therapyIds ?? []),
    c.effectiveOn ? `Effective ${c.effectiveOn}` : "", c.endedOn ? `Ended ${c.endedOn}` : "", dates(c)].filter(Boolean).join(". ");
}

export function compositionText(c: ConjugateComposition): string {
  return ["Conjugate composition", ...(c.deliveryTargetIds ?? []), c.note,
    ...c.payloads.map(p => [p.chemical.name, p.cargoKind, p.mechanism, ...(p.classIds ?? []),
      ...(p.molecularTargets ?? []).map(t => t.name), p.attachedSpecies, p.note,
      ...(p.releasedSpecies ?? []).map(s => `${s.chemical.name}: ${s.context}. ${dates(s)}`),
      ...(p.loadingObservations ?? []).map(l => `${l.quantity} ${l.value} ${l.unit}: ${l.scope}. ${l.method ?? ""} ${l.distributionNote ?? ""}. ${dates(l)}`),
      dates(p),
    ].filter(Boolean).join(". ")), dates(c)].filter(Boolean).join(". ");
}

export function chemicalObservationText(observation: ChemicalPropertyObservation): string {
  return [observation.species.name, observation.conjugate?.name, observation.property, observation.evidenceType, ...(observation.transporters ?? []), observation.statement,
    observation.context, observation.method, observation.limitation, dates(observation), ...observation.sources.map(source => `${source.label}: ${source.url}`)].filter(Boolean).join(". ");
}

export type ScopedFields = Partial<Pick<Drug, "regulatoryClaims" | "conjugateComposition"> & Pick<Trial, "participation"> & Pick<Pathway, "edges"> & Pick<Term, "chemicalObservations">> & { id?: string };
const SCOPED_FIELDS = new Set(["regulatory claim", "regulatory claims", "conjugate composition", "chemical properties", "mechanism evidence", "registry facility", "cohort observation", "trial access observations"]);
export const isScopedEvidenceField = (field: string) => SCOPED_FIELDS.has(field);

/** Atomic passages: extracting a decision rule or an edge statement must retain its subject/context. */
export function scopedEvidencePassages(e: ScopedFields): Array<{ field: string; text: string }> {
  return [
    ...(e.regulatoryClaims ?? []).map(c => ({ field: "regulatory claim", text: regulatoryClaimText(c) })),
    ...(e.conjugateComposition ? [{ field: "conjugate composition", text: compositionText(e.conjugateComposition) }] : []),
    // Keep coexisting results together: selecting only one can hide a differing source or assay.
    ...(e.chemicalObservations?.length ? [{ field: "chemical properties", text: e.chemicalObservations.map(chemicalObservationText).join("\n\n") }] : []),
    ...(e.edges ?? []).flatMap(edge => (edge.evidence ?? []).map(v => ({ field: "mechanism evidence", text: `${edge.from} to ${edge.to}: ${v.basis}. ${v.context}. ${v.statement}. ${v.limitation ?? ""}. ${dates(v)}` }))),
    ...(e.participation ?? []).flatMap(p => [
      ...(p.facilities ?? []).map(f => ({ field: "registry facility", text: `Registry facility ${f.facility ?? "name not stated"}. ${[f.city, f.state, f.country].filter(Boolean).join(", ")}. Facility status ${f.status ?? "not stated"}. Read ${p.fetchedAt.slice(0, 10)}. Facility status does not establish cohort or slot availability.` })),
      ...(p.cohortObservations ?? []).map(c => ({ field: "cohort observation", text: `${c.facility}. ${c.cohort}. Cohort availability ${c.availability}. ${c.availableSlots === undefined ? "Slots not stated" : `${c.availableSlots} slots reported`}. ${c.note ?? ""}. ${dates(c)}` })),
    ]),
  ];
}
