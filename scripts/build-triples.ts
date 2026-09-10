/**
 * Emits the corpus as RDF N-Triples at public/api/v1/onco.nt.
 *
 * Vocabulary: schema.org types and properties where they fit (name, description, url, sameAs for Wikipedia,
 * dateModified), owl:sameAs to Wikidata items from src/data/wikidata-ids.ts, and an OnCo namespace
 * (https://onco.cc/ns#) for the typed relationship fields (cancers, targets, drugs, ...) and kind-specific
 * scalars (status, modality, phase). Every subject is the record's own page URL, so the graph dereferences.
 *
 *   npx tsx scripts/build-triples.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { REL_FIELDS, routeFor, type Entity, type Kind } from "../src/lib/schema";
import { wikidataIds } from "../src/data/wikidata-ids";

const SITE = "https://onco.cc";
const NS = `${SITE}/ns#`;
const SCHEMA = "https://schema.org/";
const RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const OWL_SAME_AS = "http://www.w3.org/2002/07/owl#sameAs";
const XSD = "http://www.w3.org/2001/XMLSchema#";

const TYPE: Record<Kind, string> = {
  cancer: "MedicalCondition", section: "DefinedTerm", technology: "MedicalTherapy", target: "BioChemEntity", drug: "Drug", company: "Organization",
  institution: "MedicalOrganization", pathway: "BioChemEntity", term: "DefinedTerm", trial: "MedicalTrial", pairing: "MedicalTherapy", roadmap: "CreativeWork",
  idea: "CreativeWork", collection: "Dataset", person: "Person", bottleneck: "Thing", paper: "ScholarlyArticle", journal: "Periodical",
};

const iri = (s: string) => `<${s}>`;
const lit = (s: string, lang?: string) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "")}"${lang ? `@${lang}` : ""}`;
const typed = (s: string, t: string) => `"${s}"^^<${XSD}${t}>`;

function scalars(e: Entity): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  if (e.status) out.push([`${NS}status`, lit(e.status)]);
  for (const t of e.tags) out.push([`${NS}tag`, lit(t)]);
  switch (e.kind) {
    case "drug": out.push([`${NS}modality`, lit(e.modality)]); if (e.brand) out.push([`${SCHEMA}alternateName`, lit(e.brand)]); for (const a of e.approvals) out.push([`${NS}approval`, lit(`${a.region} ${a.year}: ${a.indication}`)]); break;
    case "trial": out.push([`${NS}phase`, lit(e.phase)]); if (e.nct) out.push([`${SCHEMA}identifier`, lit(e.nct)]); break;
    case "target": if (e.symbol) out.push([`${SCHEMA}alternateName`, lit(e.symbol)]); out.push([`${NS}targetClass`, lit(e.targetClass)]); break;
    case "company": out.push([`${SCHEMA}addressCountry`, lit(e.country)]); out.push([`${SCHEMA}url`, iri(e.website)]); break;
    case "institution": out.push([`${SCHEMA}addressCountry`, lit(e.country)], [`${SCHEMA}addressLocality`, lit(e.city)], [`${SCHEMA}latitude`, typed(String(e.lat), "decimal")], [`${SCHEMA}longitude`, typed(String(e.lng), "decimal")], [`${SCHEMA}url`, iri(e.website)]); break;
    case "paper": if (e.doi) out.push([`${SCHEMA}sameAs`, iri(`https://doi.org/${e.doi}`)]); out.push([`${SCHEMA}datePublished`, typed(String(e.year), "gYear")], [`${SCHEMA}author`, lit(e.authors)]); break;
    case "journal": out.push([`${SCHEMA}publisher`, lit(e.publisher)], [`${SCHEMA}url`, iri(e.url)]); if (e.issn) out.push([`${SCHEMA}issn`, lit(e.issn)]); break;
    case "person": out.push([`${SCHEMA}jobTitle`, lit(e.role)]); if (e.orcid) out.push([`${SCHEMA}sameAs`, iri(`https://orcid.org/${e.orcid}`)]); break;
    case "collection": out.push([`${SCHEMA}url`, iri(e.url)]); if (e.license) out.push([`${SCHEMA}license`, lit(e.license)]); break;
    default: break;
  }
  return out;
}

const g = graph();
const lines: string[] = [];
const page = (e: { kind: Kind; id: string }) => `${SITE}${routeFor(e)}`;
let sameAs = 0;
for (const e of g.entities) {
  const s = iri(page(e));
  const add = (p: string, o: string) => lines.push(`${s} ${iri(p)} ${o} .`);
  add(RDF_TYPE, iri(`${SCHEMA}${TYPE[e.kind]}`));
  add(`${NS}kind`, lit(e.kind));
  add(`${SCHEMA}identifier`, lit(e.id));
  add(`${SCHEMA}name`, lit(e.name, "en"));
  for (const a of e.aka) add(`${SCHEMA}alternateName`, lit(a, "en"));
  add(`${SCHEMA}description`, lit(e.tldr, "en"));
  add(`${SCHEMA}url`, s);
  add(`${SCHEMA}dateModified`, typed(e.asOf, "date"));
  if (e.wikipedia) add(`${SCHEMA}sameAs`, iri(e.wikipedia));
  const qid = wikidataIds[e.id];
  if (qid) { add(OWL_SAME_AS, iri(`http://www.wikidata.org/entity/${qid}`)); sameAs++; }
  for (const l of e.links) add(`${SCHEMA}citation`, iri(l.url));
  for (const [p, o] of scalars(e)) add(p, o);
  for (const f of REL_FIELDS) for (const to of e[f]) add(`${NS}${f}`, iri(page(g.must(to))));
  if (e.kind === "pairing") { add(`${NS}pairs`, iri(page(g.must(e.a)))); add(`${NS}pairs`, iri(page(g.must(e.b)))); }
  if (e.kind === "cancer") { for (const p of e.pipeline) add(`${NS}pipeline`, iri(page(g.must(p)))); for (const r of e.standardOfCare) for (const ref of r.refs) add(`${NS}standardOfCare`, iri(page(g.must(ref)))); }
  if (e.kind === "person" && e.institutionId) add(`${SCHEMA}affiliation`, iri(page(g.must(e.institutionId))));
}
lines.push(`${iri(`${SITE}/api/v1/onco.nt`)} ${iri(RDF_TYPE)} ${iri(`${SCHEMA}Dataset`)} .`);
lines.push(`${iri(`${SITE}/api/v1/onco.nt`)} ${iri(`${SCHEMA}license`)} ${iri("https://creativecommons.org/licenses/by/4.0/")} .`);
lines.push(`${iri(`${SITE}/api/v1/onco.nt`)} ${iri(`${SCHEMA}name`)} ${lit("OnCo knowledge graph", "en")} .`);

const out = join(process.cwd(), "public", "api", "v1");
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "onco.nt"), lines.join("\n") + "\n");
console.log(`triples: ${lines.length} triples for ${g.entities.length} records, ${sameAs} owl:sameAs links to Wikidata`);
