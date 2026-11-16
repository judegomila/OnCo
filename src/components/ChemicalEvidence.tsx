import type { ChemicalPropertyObservation } from "@/lib/scoped-evidence";
import { ObservationSources } from "./ScopedEvidence";

const endpoint: Record<ChemicalPropertyObservation["property"], string> = {
  "chemical-identity": "Chemical identity",
  release: "Release and processing",
  "membrane-access": "Membrane access",
  "bystander-killing": "Bystander killing",
  "transporter-substrate": "Transporter substrate",
  "transporter-inhibition": "Transporter inhibition",
  "conjugate-loading": "Named conjugate loading",
};

export function ChemicalEvidence({ id, name, observations }: { id: string; name: string; observations: readonly ChemicalPropertyObservation[] }) {
  return <details id={`chemical-evidence-${id}`} className="border-b border-border py-3">
    <summary className="cursor-pointer font-medium">{name}: species and evidence</summary>
    {observations.length ? <ul className="mt-3 space-y-4 text-sm">
      {observations.map((observation, i) => <li key={i}>
        <p><strong>{observation.species.name}</strong> · {endpoint[observation.property]} · {observation.evidenceType.replaceAll("-", " ")}</p>
        <p>{observation.statement}</p>
        {observation.conjugate && <p>Conjugate: {observation.conjugate.name}</p>}
        {observation.transporters && <p>Transporters: {observation.transporters.join(", ")}</p>}
        <p className="text-muted">Context: {observation.context} Method: {observation.method}</p>
        {observation.limitation && <p className="text-muted">{observation.limitation}</p>}
        <ObservationSources observation={observation} />
      </li>)}
    </ul> : <p className="mt-3 text-sm text-muted">No observation is recorded for a specified chemical species and assay. This does not mean a negative result.</p>}
  </details>;
}
