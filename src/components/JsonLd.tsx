import type { Entity } from "@/lib/schema";
import { routeFor } from "@/lib/schema";
import { graph } from "@/lib/graph";

const SITE = "https://onco-umber.vercel.app";

/** schema.org JSON-LD for an entity page, so search engines and crawlers read the map. */
export function JsonLd({ e }: { e: Entity }) {
  const g = graph();
  const url = `${SITE}${routeFor(e)}`;
  const base = { "@context": "https://schema.org", name: e.name, description: e.tldr, url, alternateName: e.aka.length ? e.aka : undefined, sameAs: e.wikipedia };
  let data: Record<string, unknown>;
  switch (e.kind) {
    case "drug":
      data = { ...base, "@type": "Drug", nonProprietaryName: e.name, manufacturer: e.companies.map((id) => ({ "@type": "Organization", name: g.must(id).name })), mechanismOfAction: e.mechanism, drugClass: e.modality };
      break;
    case "cancer":
      data = { ...base, "@type": "MedicalCondition", possibleTreatment: e.drugs.slice(0, 20).map((id) => ({ "@type": "Drug", name: g.must(id).name })) };
      break;
    case "trial":
      data = { ...base, "@type": "MedicalStudy", identifier: e.nct, sponsor: e.sponsor ? { "@type": "Organization", name: e.sponsor } : undefined, studySubject: e.drugs.map((id) => ({ "@type": "Drug", name: g.must(id).name })) };
      break;
    case "company":
    case "institution":
      data = { ...base, "@type": "Organization", url: e.website, sameAs: [e.wikipedia, url].filter(Boolean) };
      break;
    case "term":
      data = { ...base, "@type": "DefinedTerm", inDefinedTermSet: `${SITE}/terms/` };
      break;
    default:
      data = { ...base, "@type": "Thing" };
  }
  const clean = JSON.parse(JSON.stringify(data));
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clean) }} />;
}
