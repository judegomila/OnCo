"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { KIND_META, KINDS, type Kind } from "@/lib/schema";
import { KIND_COLOR, STATUS_LABEL, statusClass } from "@/lib/text";
import { FacetSelect } from "./filters/FacetSelect";
import { ResultsTable, Toolbar, type Column } from "./filters/ResultsTable";

export type QNode = { id: string; kind: Kind; name: string; route: string; status?: string; tags: string[]; tldr: string; degree: number };
export type QueryData = { nodes: QNode[]; edges: Array<[number, number]> };

type Clause =
  | { type: "linked-kind"; not: boolean; kind: Kind; status?: string }
  | { type: "linked-id"; not: boolean; id: string }
  | { type: "status"; not: boolean; values: string[] }
  | { type: "tag"; not: boolean; tag: string }
  | { type: "text"; not: boolean; text: string };

export type SavedQuery = { title: string; kind: Kind; clauses: Clause[] };

const EXAMPLES: SavedQuery[] = [
  { title: "Targets with an approved ADC but no PET tracer", kind: "target", clauses: [{ type: "linked-kind", not: false, kind: "drug", status: "approved" }, { type: "tag", not: false, tag: "adc-target" }, { type: "tag", not: true, tag: "pet-target" }] },
  { title: "Cancers with no phase-3 product in their graph", kind: "cancer", clauses: [{ type: "linked-kind", not: true, kind: "drug", status: "phase-3" }] },
  { title: "Companies with a product but no institution link", kind: "company", clauses: [{ type: "linked-kind", not: false, kind: "drug" }, { type: "linked-kind", not: true, kind: "institution" }] },
  { title: "Approved products with no linked trial", kind: "drug", clauses: [{ type: "status", not: false, values: ["approved"] }, { type: "linked-kind", not: true, kind: "trial" }] },
  { title: "Frontier technologies touching TNBC", kind: "technology", clauses: [{ type: "tag", not: false, tag: "frontier" }, { type: "linked-id", not: false, id: "tnbc" }] },
  { title: "Positive trials without a linked approved product", kind: "trial", clauses: [{ type: "status", not: false, values: ["positive"] }, { type: "linked-kind", not: true, kind: "drug", status: "approved" }] },
  { title: "Targets with products but no pathway", kind: "target", clauses: [{ type: "linked-kind", not: false, kind: "drug" }, { type: "linked-kind", not: true, kind: "pathway" }] },
  { title: "Ideas that mention ADCs", kind: "idea", clauses: [{ type: "text", not: false, text: "adc" }] },
];

export function QueryBuilder({ data }: { data: QueryData }) {
  const [kind, setKind] = useState<Kind>("target");
  const [clauses, setClauses] = useState<Clause[]>(EXAMPLES[0].clauses);
  const [title, setTitle] = useState<string>(EXAMPLES[0].title);

  const index = useMemo(() => new Map(data.nodes.map((n, i) => [n.id, i])), [data]);
  const adj = useMemo(() => {
    const a: number[][] = data.nodes.map(() => []);
    for (const [x, y] of data.edges) { a[x].push(y); a[y].push(x); }
    return a;
  }, [data]);
  const statuses = useMemo(() => [...new Set(data.nodes.map((n) => n.status).filter((s): s is string => !!s))].sort(), [data]);
  const tags = useMemo(() => [...new Set(data.nodes.flatMap((n) => n.tags))].sort(), [data]);
  const idOptions = useMemo(() => data.nodes.filter((n) => n.degree >= 3).map((n) => ({ value: n.id, label: n.name, group: KIND_META[n.kind].plural })), [data]);

  const results = useMemo(() => {
    const test = (i: number, c: Clause): boolean => {
      const n = data.nodes[i];
      let hit = false;
      switch (c.type) {
        case "linked-kind": hit = adj[i].some((j) => data.nodes[j].kind === c.kind && (!c.status || data.nodes[j].status === c.status)); break;
        case "linked-id": { const j = index.get(c.id); hit = j !== undefined && adj[i].includes(j); break; }
        case "status": hit = c.values.length === 0 || c.values.includes(n.status ?? ""); break;
        case "tag": hit = n.tags.includes(c.tag); break;
        case "text": hit = !c.text.trim() || `${n.name} ${n.tldr} ${n.tags.join(" ")}`.toLowerCase().includes(c.text.toLowerCase()); break;
      }
      return c.not ? !hit : hit;
    };
    return data.nodes.map((n, i) => ({ n, i })).filter(({ n, i }) => n.kind === kind && clauses.every((c) => test(i, c))).map(({ n, i }) => ({ ...n, linked: adj[i].length })).sort((a, b) => b.linked - a.linked || a.name.localeCompare(b.name));
  }, [data, adj, index, kind, clauses]);

  const update = (i: number, patch: Partial<Clause>) => setClauses((cs) => cs.map((c, k) => (k === i ? ({ ...c, ...patch } as Clause) : c)));
  const remove = (i: number) => setClauses((cs) => cs.filter((_, k) => k !== i));
  const add = (type: Clause["type"]) => setClauses((cs) => [...cs, type === "linked-kind" ? { type, not: false, kind: "drug" } : type === "linked-id" ? { type, not: false, id: "tnbc" } : type === "status" ? { type, not: false, values: [] } : type === "tag" ? { type, not: false, tag: tags[0] ?? "" } : { type, not: false, text: "" }]);
  const load = (q: SavedQuery) => { setKind(q.kind); setClauses(q.clauses); setTitle(q.title); };

  const describe = (c: Clause) => c.type === "linked-kind" ? `${c.not ? "no" : "has"} linked ${KIND_META[c.kind].label.toLowerCase()}${c.status ? ` with status ${STATUS_LABEL[c.status] ?? c.status}` : ""}` : c.type === "linked-id" ? `${c.not ? "not" : ""} linked to ${data.nodes[index.get(c.id) ?? -1]?.name ?? c.id}` : c.type === "status" ? `status ${c.not ? "not " : ""}in {${c.values.map((v) => STATUS_LABEL[v] ?? v).join(", ") || "any"}}` : c.type === "tag" ? `${c.not ? "no" : "has"} tag ${c.tag}` : `text ${c.not ? "does not contain" : "contains"} "${c.text}"`;

  type Row = QNode & { linked: number };
  const columns: Column<Row>[] = [
    { key: "name", label: "Name", render: (r) => <div className="min-w-[220px]"><Link href={r.route} className="font-medium hover:underline">{r.name}</Link><div className="text-xs text-muted line-clamp-2 max-w-lg">{r.tldr}</div></div> },
    { key: "status", label: "Phase / status", render: (r) => r.status ? <span className={`chip ${statusClass(r.status)}`}>{STATUS_LABEL[r.status] ?? r.status}</span> : null },
    { key: "tags", label: "Tags", hide: "hidden md:table-cell", render: (r) => <span className="text-xs text-muted">{r.tags.join(", ")}</span> },
    { key: "linked", label: "Links", render: (r) => <span className="tabular-nums text-muted">{r.linked}</span> },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] [&>*]:min-w-0">
      <aside className="space-y-4">
        <div className="card p-3">
          <div className="kicker mb-2">Saved queries</div>
          <ul className="space-y-1 text-sm">{EXAMPLES.map((q) => <li key={q.title}><button type="button" onClick={() => load(q)} className={`text-left hover:underline ${title === q.title ? "font-medium" : ""}`}>{q.title}</button></li>)}</ul>
        </div>
        <div className="card p-3 text-xs text-muted">Queries run in the browser over the compact graph (nodes, undirected links, status, tags). &quot;Linked&quot; means any relationship in either direction.</div>
      </aside>
      <div>
        <div className="card p-4 mb-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Find</span>
            <FacetSelect label="Kind" options={KINDS.filter((k) => k !== "section").map((k) => ({ value: k, label: KIND_META[k].plural[0].toUpperCase() + KIND_META[k].plural.slice(1) }))} value={kind} onChange={(v) => { if (v) { setKind(v as Kind); setTitle("Custom query"); } }} searchable={false} allLabel="Targets" width="w-44" />
            <span className="text-sm font-medium">where all of:</span>
          </div>
          {clauses.map((c, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2 text-sm pl-2 border-l-2 border-border">
              <button type="button" onClick={() => update(i, { not: !c.not })} className={`chip border ${c.not ? "bg-rose-100 text-rose-800 border-rose-200" : "bg-emerald-100 text-emerald-800 border-emerald-200"}`}>{c.not ? "NOT" : "IS"}</button>
              {c.type === "linked-kind" && <>
                <span className="text-muted">linked to a</span>
                <FacetSelect label="Kind" options={KINDS.map((k) => ({ value: k, label: KIND_META[k].label }))} value={c.kind} onChange={(v) => { if (v) update(i, { kind: v as Kind }); }} searchable={false} allLabel="Product" width="w-40" />
                <FacetSelect label="With status" options={statuses.map((s) => ({ value: s, label: STATUS_LABEL[s] ?? s }))} value={c.status ?? null} onChange={(v) => update(i, { status: (v as string) || undefined })} searchable={false} allLabel="Any" width="w-44" />
              </>}
              {c.type === "linked-id" && <><span className="text-muted">linked to</span><FacetSelect label="Object" options={idOptions} value={c.id} onChange={(v) => { if (v) update(i, { id: v as string }); }} allLabel="—" width="w-64" /></>}
              {c.type === "status" && <><span className="text-muted">status in</span><FacetSelect label="Status" options={statuses.map((s) => ({ value: s, label: STATUS_LABEL[s] ?? s }))} value={c.values} onChange={(v) => update(i, { values: v as string[] })} multi searchable={false} allLabel="Any" width="w-48" /></>}
              {c.type === "tag" && <><span className="text-muted">tagged</span><FacetSelect label="Tag" options={tags.map((t) => ({ value: t, label: t }))} value={c.tag} onChange={(v) => { if (v) update(i, { tag: v as string }); }} allLabel="—" width="w-52" /></>}
              {c.type === "text" && <><span className="text-muted">text contains</span><input value={c.text} onChange={(e) => update(i, { text: e.target.value })} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm w-56" placeholder="word or phrase" /></>}
              <button type="button" onClick={() => remove(i)} className="text-xs underline text-muted ml-auto">remove</button>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 text-xs pt-1">
            <span className="text-muted self-center">Add clause:</span>
            {(["linked-kind", "linked-id", "status", "tag", "text"] as const).map((t) => <button key={t} type="button" onClick={() => add(t)} className="chip border bg-card border-border hover:bg-foreground/5">{t === "linked-kind" ? "linked kind" : t === "linked-id" ? "linked object" : t}</button>)}
          </div>
          <p className="text-xs text-muted">Query: <span className="font-mono">{KIND_META[kind].plural}</span>{clauses.map((c, i) => <span key={i}> · {describe(c)}</span>)}</p>
        </div>
        <Toolbar count={results.length} noun={KIND_META[kind].plural} left={<span className={`chip border ${KIND_COLOR[kind]}`}>{title}</span>} />
        <ResultsTable columns={columns} rows={results} rowKey={(r) => r.id} empty="No objects match all clauses." />
      </div>
    </div>
  );
}
