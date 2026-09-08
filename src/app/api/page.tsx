import type { Metadata } from "next";
import { KIND_META, KINDS } from "@/lib/schema";
import { graph } from "@/lib/graph";
import { Container, GroupKicker, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Open API", description: "The OnCo corpus as static JSON." };

export default function ApiDocs() {
  const g = graph();
  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Open API" lede="The whole corpus is published as static JSON under /api/v1/ with permissive CORS. No key, no rate limit beyond the CDN. Licence CC BY 4.0." />
      <Container className="pb-16 max-w-3xl">
        <div className="card overflow-x-auto">
        <table className="onco">
          <thead><tr><th>Path</th><th>Contents</th></tr></thead>
          <tbody>
            <tr><td><a className="underline font-mono text-sm" href="/api/v1/all.json">/api/v1/all.json</a></td><td>All {g.entities.length} entities, fully resolved with defaults, plus an <code>incoming</code> map of backlinks per id.</td></tr>
            <tr><td><a className="underline font-mono text-sm" href="/api/v1/search.json">/api/v1/search.json</a></td><td>Compact documents (id, kind, name, tldr, route) used by the site search.</td></tr>
            {KINDS.map((k) => <tr key={k}><td><a className="underline font-mono text-sm" href={`/api/v1/${KIND_META[k].plural}.json`}>/api/v1/{KIND_META[k].plural}.json</a></td><td>{g.kind(k).length} {KIND_META[k].plural}</td></tr>)}
            <tr><td><span className="font-mono text-sm">/api/v1/entities/&lt;id&gt;.json</span></td><td>One entity with its neighbours, e.g. <a className="underline" href="/api/v1/entities/tnbc.json">tnbc.json</a>, <a className="underline" href="/api/v1/entities/trop2.json">trop2.json</a>.</td></tr>
            <tr><td><a className="underline font-mono text-sm" href="/api/v1/ranking.json">/api/v1/ranking.json</a></td><td>Institution ranking rows with the score components.</td></tr>
            <tr><td><a className="underline font-mono text-sm" href="/api/v1/meta.json">/api/v1/meta.json</a></td><td>Build date, counts, schema version.</td></tr>
          </tbody>
        </table>
        </div>
        <h2 className="text-xl font-semibold mt-10 mb-2">Schema</h2>
        <p className="text-[15px] leading-relaxed">Every entity shares base fields (<code>id, kind, name, aka, tldr, summary, status, asOf, wikipedia, links, tags</code>) and relationship arrays (<code>related, cancers, sections, technologies, targets, drugs, companies, institutions, pathways, terms, trials</code>) holding ids. Kind-specific fields are documented in <code>src/lib/schema.ts</code> in the repository, which is the source of truth and is enforced at build time.</p>
        <h2 className="text-xl font-semibold mt-10 mb-2">Example</h2>
        <pre className="card p-4 text-xs overflow-auto"><code>{`curl -s https://onco-umber.vercel.app/api/v1/entities/trop2.json | jq '.entity.name, .neighbours.drug[].name'`}</code></pre>
      </Container>
    </>
  );
}
