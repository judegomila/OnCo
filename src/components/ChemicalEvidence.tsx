import type { ChemicalPropertyObservation } from "@/lib/scoped-evidence";
import { ObservationSources } from "./ScopedEvidence";

/** What was measured, in a reader's words first; the laboratory's term is the tooltip. */
const endpoint: Record<ChemicalPropertyObservation["property"], [plain: string, precise: string]> = {
  "chemical-identity": ["Which chemical it is", "Chemical identity"],
  release: ["How it is released", "Release and processing"],
  "membrane-access": ["Crossing cell membranes", "Membrane access (permeability)"],
  "bystander-killing": ["Effect on neighbouring cells", "Bystander killing"],
  "transporter-substrate": ["Pumped out by cells", "Transporter substrate (efflux)"],
  "transporter-inhibition": ["Blocking a cell pump", "Transporter inhibition"],
  "conjugate-loading": ["Drug molecules per antibody", "Conjugate loading (drug-to-antibody ratio) of the named product"],
};

const evidenceType: Record<ChemicalPropertyObservation["evidenceType"], string> = {
  experimental: "from an experiment",
  "label-stated": "stated on the product label",
  "conference-abstract": "from a conference abstract",
};

export function ChemicalEvidence({ id, name, observations }: { id: string; name: string; observations: readonly ChemicalPropertyObservation[] }) {
  return <details id={`chemical-evidence-${id}`} className="border-b border-border py-3 scroll-mt-28">
    <summary className="cursor-pointer font-medium">{name}: what was measured, and on which chemical</summary>
    {observations.length ? <ul className="mt-3 space-y-4 text-sm max-w-3xl">
      {observations.map((observation, i) => <li key={i}>
        <p><strong>{observation.species.name}</strong> · <span title={endpoint[observation.property][1]}>{endpoint[observation.property][0]}</span> · {evidenceType[observation.evidenceType]}</p>
        <p>{observation.statement}</p>
        {observation.conjugate && <p>Product: {observation.conjugate.name}</p>}
        {observation.transporters && <p><span title="Transporters: proteins that carry a drug out of, or into, a cell">Cell pumps tested:</span> {observation.transporters.join(", ")}</p>}
        <p className="text-muted">Where: {observation.context} How: {observation.method}</p>
        {observation.limitation && <p className="text-muted">{observation.limitation}</p>}
        <ObservationSources observation={observation} />
      </li>)}
    </ul> : <p className="mt-3 text-sm text-muted">Not recorded here. OnCo has not yet added a sourced measurement that names the exact chemical and the test. That is a gap in our records. It does not mean the answer is no.</p>}
  </details>;
}
