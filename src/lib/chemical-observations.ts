import { ChemicalPropertyObservationSchema, type ChemicalPropertyObservation } from "./scoped-evidence";

export function readChemicalObservations(record: { id?: string; chemicalObservations?: unknown }): ChemicalPropertyObservation[] {
  if (record.chemicalObservations === undefined) return [];
  return ChemicalPropertyObservationSchema.array().parse(record.chemicalObservations);
}

/** Exact species and endpoint lookup. Missing evidence is never a negative measurement. */
export function queryChemicalObservations(observations: readonly ChemicalPropertyObservation[], query: {
  speciesName: string;
  property: ChemicalPropertyObservation["property"];
  transporter?: string;
  conjugateName?: string;
}) {
  const normalise = (value: string) => value.trim().toLocaleLowerCase("en");
  const matches = observations.filter(observation => normalise(observation.species.name) === normalise(query.speciesName)
    && observation.property === query.property
    && (!query.transporter || observation.transporters?.some(name => normalise(name) === normalise(query.transporter!)))
    && (!query.conjugateName || (observation.conjugate && normalise(observation.conjugate.name) === normalise(query.conjugateName))));
  return { status: matches.length ? "recorded" as const : "not-recorded" as const, observations: matches };
}

export function chemicalEvidenceSummary(observations: readonly ChemicalPropertyObservation[], properties: readonly ChemicalPropertyObservation["property"][]) {
  const selected = observations.filter(observation => properties.includes(observation.property));
  return selected.length ? selected.map(observation => `${observation.conjugate ? `${observation.conjugate.name}: ` : ""}${observation.species.name}: ${observation.statement}`).join(" ") : "Not recorded for a specified species and assay.";
}
