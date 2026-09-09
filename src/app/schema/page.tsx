import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, KindChip, PageHeader } from "@/components/ui";
import { schemaDocs, type FieldDoc } from "@/lib/schema-docs";
import { STATUS_LABEL } from "@/lib/text";

export const metadata: Metadata = pageMeta({ title: "Data dictionary", description: "Every kind of OnCo record, every field, its type, whether it is required, and what it means, with a real example per kind.", path: "/schema/" });

const REPO = "https://github.com/judegomila/OnCo";

export default function SchemaPage() {
  const docs = schemaDocs();
  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Data dictionary"
        lede="The corpus is a graph of typed records validated on every build. This page is generated from the schema itself: the base fields every record shares, then each of the eighteen kinds with its own fields and a real example. Relationship fields hold ids of other records; backlinks are derived, so a link is declared once." />
      <Container className="pb-16">
        <div className="card p-4 mb-8 text-sm border-accent/30 bg-accent-soft/40 max-w-3xl">
          <div className="kicker mb-1">Where the schema lives</div>
          <p>Source of truth: <a className="underline" href={`${REPO}/blob/main/src/lib/schema.ts`} rel="noopener">src/lib/schema.ts</a> (Zod). Machine-readable JSON Schema: <a className="underline" href="/api/v1/schema.json">/api/v1/schema.json</a>, published with the <Link className="underline" href="/api/">open API</Link>. Ids match <code className="text-xs">{docs.idPattern}</code>; dates are <code className="text-xs">YYYY-MM-DD</code>.</p>
        </div>

        <nav className="flex flex-wrap gap-1.5 mb-8 text-sm">
          <a href="#base" className="chip border bg-foreground/5 hover:bg-foreground/10">Base fields</a>
          {docs.kinds.map((k) => <a key={k.kind} href={`#${k.kind}`} className="chip border bg-foreground/5 hover:bg-foreground/10">{k.label}</a>)}
          <a href="#statuses" className="chip border bg-foreground/5 hover:bg-foreground/10">Statuses</a>
        </nav>

        <section id="base" className="scroll-mt-24 mb-12">
          <h2 className="text-xl font-semibold mb-2">Base fields (every kind)</h2>
          <p className="text-sm text-muted mb-4 max-w-3xl">Identity, the two-register text (TL;DR for anyone, summary for specialists), the date the facts were checked, sources, and the relationship arrays that make the graph.</p>
          <FieldTable fields={docs.base} />
        </section>

        {docs.kinds.map((k) => (
          <section key={k.kind} id={k.kind} className="scroll-mt-24 mb-12">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h2 className="text-xl font-semibold">{k.label}</h2>
              <KindChip kind={k.kind} />
              <Link href={`/${k.route}/`} className="text-sm underline text-muted hover:text-foreground">{k.count} {k.plural}</Link>
            </div>
            <p className="text-sm text-muted mb-4 max-w-3xl">{k.blurb}</p>
            <FieldTable fields={k.fields} />
            {k.example && (
              <details className="card mt-4">
                <summary className="cursor-pointer px-4 py-3 text-sm font-medium">Example: {k.exampleId} <span className="text-muted font-normal">(arrays trimmed to three items, long strings shortened)</span></summary>
                <pre className="px-4 pb-4 text-xs overflow-auto max-h-[32rem]"><code>{JSON.stringify(k.example, null, 2)}</code></pre>
                <div className="px-4 pb-4 text-xs text-muted">Full record: <a className="underline" href={`/api/v1/entities/${k.exampleId}.json`}>/api/v1/entities/{k.exampleId}.json</a> · page: <Link className="underline" href={`/${k.route}/${k.exampleId}/`}>/{k.route}/{k.exampleId}/</Link></div>
              </details>
            )}
          </section>
        ))}

        <section id="statuses" className="scroll-mt-24">
          <h2 className="text-xl font-semibold mb-2">Statuses</h2>
          <p className="text-sm text-muted mb-4 max-w-3xl">One shared list across kinds. Products use the approval and phase values; trials use recruiting, active, completed and the outcome values; technologies use established, emerging and historic.</p>
          <div className="card overflow-x-auto"><table className="onco"><thead><tr><th>Value</th><th>Shown as</th></tr></thead>
            <tbody>{docs.statuses.map((s) => <tr key={s}><td><code className="text-xs">{s}</code></td><td className="text-muted">{STATUS_LABEL[s] ?? s}</td></tr>)}</tbody></table></div>
        </section>
      </Container>
    </>
  );
}

function FieldTable({ fields }: { fields: FieldDoc[] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="onco"><thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          {fields.map((f) => (
            <tr key={f.name}>
              <td><code className="text-xs">{f.name}</code></td>
              <td className="text-muted"><code className="text-xs break-words">{f.type}</code>{f.default !== undefined && <div className="text-xs">default {f.default}</div>}</td>
              <td className="text-muted">{f.required ? "yes" : "no"}</td>
              <td className="text-muted">
                {f.description ?? ""}
                {f.children && f.children.length > 0 && (
                  <ul className="mt-1 space-y-0.5 text-xs">
                    {f.children.map((c) => <li key={c.name}><code>{c.name}</code>: {c.type}{c.required ? "" : " (optional)"}{c.description ? `; ${c.description}` : ""}</li>)}
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
