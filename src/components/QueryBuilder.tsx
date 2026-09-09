"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { KIND_META, KINDS, type Kind } from "@/lib/schema";
import { KIND_COLOR, STATUS_LABEL, statusClass } from "@/lib/text";
import { complete, describe as describeGql, GqlError, parse, run as runGql, type GqlData, type GqlNode, type Query } from "@/lib/gql";
import { FacetSelect } from "./filters/FacetSelect";
import { ResultsTable, Toolbar, type Column } from "./filters/ResultsTable";

export type QNode = GqlNode;
export type QueryData = GqlData;

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

/** Multi-hop questions the form cannot express. */
const TEXT_EXAMPLES: Array<{ title: string; q: string }> = [
  { title: "Targets of approved TNBC products", q: "cancer:tnbc -> drugs(status:approved) -> targets" },
  { title: "Companies behind phase-3 products for lung cancer", q: "cancer:nsclc -> drugs(status:phase-3) -> companies" },
  { title: "Trials of TROP2 products, positive only", q: "target:trop2 -> drugs -> trials(status:positive)" },
  { title: "Institutions linked to people who work on ADCs", q: "technology:adc -> people -> institutions" },
  { title: "Well-connected ideas without a bottleneck", q: "ideas(minlinks:4) no bottlenecks | limit:40" },
];

const plural = (k: Kind) => KIND_META[k].plural.replace(/\s+/g, "-");
const quote = (s: string) => /[\s(),:|!"']/.test(s) ? `"${s.replace(/"/g, "'")}"` : s;

/** The form's kind and clauses as a text query, so readers can see and edit the equivalent. */
export function toGql(kind: Kind, clauses: Clause[], nodes: QNode[]): string {
  const filters: string[] = [];
  const exists: string[] = [];
  for (const c of clauses) {
    switch (c.type) {
      case "status": if (c.values.length) filters.push(`status${c.not ? "!" : ""}:${c.values.join("+")}`); break;
      case "tag": if (c.tag) filters.push(`tag${c.not ? "!" : ""}:${quote(c.tag)}`); break;
      case "text": if (c.text.trim()) filters.push(`text${c.not ? "!" : ""}:${quote(c.text.trim())}`); break;
      case "linked-kind": exists.push(`${c.not ? "no" : "has"} ${plural(c.kind)}${c.status ? `(status:${c.status})` : ""}`); break;
      case "linked-id": { const n = nodes.find((x) => x.id === c.id); exists.push(`${c.not ? "no" : "has"} ${n ? n.kind : "*"}:${c.id}`); break; }
    }
  }
  return [`${plural(kind)}${filters.length ? `(${filters.join(", ")})` : ""}`, ...exists].join(" ");
}

export function QueryBuilder({ data }: { data: QueryData }) {
  const [mode, setMode] = useState<"form" | "text">("form");
  const [kind, setKind] = useState<Kind>("target");
  const [clauses, setClauses] = useState<Clause[]>(EXAMPLES[0].clauses);
  const [title, setTitle] = useState<string>(EXAMPLES[0].title);
  const [text, setText] = useState<string>(TEXT_EXAMPLES[0].q);
  const [showSuggest, setShowSuggest] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const index = useMemo(() => new Map(data.nodes.map((n, i) => [n.id, i])), [data]);
  const adj = useMemo(() => {
    const a: number[][] = data.nodes.map(() => []);
    for (const [x, y] of data.edges) { a[x].push(y); a[y].push(x); }
    return a;
  }, [data]);
  const statuses = useMemo(() => [...new Set(data.nodes.map((n) => n.status).filter((s): s is string => !!s))].sort(), [data]);
  const tags = useMemo(() => [...new Set(data.nodes.flatMap((n) => n.tags))].sort(), [data]);
  const idOptions = useMemo(() => data.nodes.filter((n) => n.degree >= 3).map((n) => ({ value: n.id, label: n.name, group: KIND_META[n.kind].plural })), [data]);

  // Shareable URL: ?q=<text query> switches to text mode.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const q = new URLSearchParams(window.location.search).get("q");
      if (q) { setText(q); setMode("text"); }
    });
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => {
    const p = new URLSearchParams();
    if (mode === "text" && text.trim()) p.set("q", text.trim());
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [mode, text]);

  const formResults = useMemo(() => {
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

  const parsed = useMemo((): { query?: Query; error?: GqlError } => {
    if (!text.trim()) return {};
    try { return { query: parse(text) }; } catch (e) { return { error: e instanceof GqlError ? e : new GqlError(String(e), 0) }; }
  }, [text]);
  const textResults = useMemo(() => parsed.query ? runGql(parsed.query, data) : null, [parsed, data]);
  const suggestions = useMemo(() => (mode === "text" && showSuggest ? complete(text, data) : { prefix: "", options: [] }), [mode, showSuggest, text, data]);
  const accept = (value: string) => {
    const base = text.slice(0, text.length - suggestions.prefix.length);
    const next = value === "->" || value === "has" || value === "no" ? `${base.trimEnd()} ${value} ` : value.endsWith(":") || value === "(" || value === "| limit:" ? `${base}${value}` : `${base}${value} `;
    setText(next);
    input.current?.focus();
  };

  const update = (i: number, patch: Partial<Clause>) => setClauses((cs) => cs.map((c, k) => (k === i ? ({ ...c, ...patch } as Clause) : c)));
  const remove = (i: number) => setClauses((cs) => cs.filter((_, k) => k !== i));
  const add = (type: Clause["type"]) => setClauses((cs) => [...cs, type === "linked-kind" ? { type, not: false, kind: "drug" } : type === "linked-id" ? { type, not: false, id: "tnbc" } : type === "status" ? { type, not: false, values: [] } : type === "tag" ? { type, not: false, tag: tags[0] ?? "" } : { type, not: false, text: "" }]);
  const load = (q: SavedQuery) => { setKind(q.kind); setClauses(q.clauses); setTitle(q.title); setMode("form"); };

  const describe = (c: Clause) => c.type === "linked-kind" ? `${c.not ? "no" : "has"} linked ${KIND_META[c.kind].label.toLowerCase()}${c.status ? ` with status ${STATUS_LABEL[c.status] ?? c.status}` : ""}` : c.type === "linked-id" ? `${c.not ? "not" : ""} linked to ${data.nodes[index.get(c.id) ?? -1]?.name ?? c.id}` : c.type === "status" ? `status ${c.not ? "not " : ""}in {${c.values.map((v) => STATUS_LABEL[v] ?? v).join(", ") || "any"}}` : c.type === "tag" ? `${c.not ? "no" : "has"} tag ${c.tag}` : `text ${c.not ? "does not contain" : "contains"} "${c.text}"`;

  type Row = QNode & { linked: number };
  const columns: Column<Row>[] = [
    { key: "kind", label: "Kind", hide: mode === "text" ? undefined : "hidden", render: (r) => <span className={`chip border ${KIND_COLOR[r.kind]}`}>{KIND_META[r.kind].label}</span> },
    { key: "name", label: "Name", render: (r) => <div className="min-w-[220px]"><Link href={r.route} className="font-medium hover:underline">{r.name}</Link><div className="text-xs text-muted line-clamp-2 max-w-lg">{r.tldr}</div></div> },
    { key: "status", label: "Phase / status", render: (r) => r.status ? <span className={`chip ${statusClass(r.status)}`}>{STATUS_LABEL[r.status] ?? r.status}</span> : null },
    { key: "tags", label: "Tags", hide: "hidden md:table-cell", render: (r) => <span className="text-xs text-muted">{r.tags.join(", ")}</span> },
    { key: "linked", label: "Links", render: (r) => <span className="tabular-nums text-muted">{r.linked}</span> },
  ];

  const rows: Row[] = mode === "form" ? formResults : (textResults?.nodes ?? []).map((n) => ({ ...n, linked: n.degree }));
  const resultKinds = mode === "text" ? [...new Set(rows.map((r) => r.kind))] : [kind];
  const noun = resultKinds.length === 1 ? KIND_META[resultKinds[0]].plural : "objects";
  const shareUrl = mode === "text" && text.trim() ? `/query/?q=${encodeURIComponent(text.trim())}` : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] [&>*]:min-w-0">
      <aside className="space-y-4">
        <div className="card p-3">
          <div className="kicker mb-2">Saved queries</div>
          <ul className="space-y-1 text-sm">{EXAMPLES.map((q) => <li key={q.title}><button type="button" onClick={() => load(q)} className={`text-left hover:underline ${mode === "form" && title === q.title ? "font-medium" : ""}`}>{q.title}</button></li>)}</ul>
        </div>
        <div className="card p-3">
          <div className="kicker mb-2">Multi-hop (text mode)</div>
          <ul className="space-y-1 text-sm">{TEXT_EXAMPLES.map((q) => <li key={q.q}><button type="button" onClick={() => { setText(q.q); setMode("text"); }} className={`text-left hover:underline ${mode === "text" && text === q.q ? "font-medium" : ""}`}>{q.title}</button></li>)}</ul>
        </div>
        <div className="card p-3 text-xs text-muted">Queries run in the browser over the compact graph (nodes, undirected links, status, tags). &quot;Linked&quot; means any relationship in either direction.</div>
      </aside>
      <div>
        <div className="flex items-center gap-2 mb-3 text-sm">
          <span className="text-muted">Mode</span>
          <button type="button" onClick={() => setMode("form")} className={`chip border ${mode === "form" ? "bg-foreground text-background border-foreground" : "bg-card border-border"}`}>Form</button>
          <button type="button" onClick={() => { if (mode === "form") setText(toGql(kind, clauses, data.nodes)); setMode("text"); }} className={`chip border ${mode === "text" ? "bg-foreground text-background border-foreground" : "bg-card border-border"}`}>Text</button>
          {mode === "form" && <span className="text-xs text-muted">Text mode adds hops: <span className="font-mono">cancer:tnbc -&gt; drugs -&gt; targets</span></span>}
        </div>

        {mode === "form" && (
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
        )}

        {mode === "text" && (
          <div className="card p-4 mb-4 space-y-2">
            <div className="relative">
              <input ref={input} value={text} onChange={(e) => { setText(e.target.value); setShowSuggest(true); }} onFocus={() => setShowSuggest(true)} onBlur={() => setTimeout(() => setShowSuggest(false), 120)} onKeyDown={(e) => { if (e.key === "Escape") setShowSuggest(false); if (e.key === "Tab" && suggestions.options[0]) { e.preventDefault(); accept(suggestions.options[0].value); } }}
                spellCheck={false} aria-label="Graph query" placeholder="cancer:tnbc -> drugs(status:approved) -> targets" className="w-full rounded-lg border border-border bg-card px-3 py-2.5 font-mono text-sm outline-none focus:ring-2 focus:ring-accent/40" />
              {suggestions.options.length > 0 && (
                <ul className="absolute z-30 mt-1 w-full max-w-md card shadow-xl max-h-64 overflow-auto text-sm" role="listbox">
                  {suggestions.options.map((o) => <li key={o.value} role="option" aria-selected={false} onMouseDown={(e) => { e.preventDefault(); accept(o.value); }} className="flex items-baseline gap-3 px-3 py-1.5 hover:bg-foreground/5 cursor-pointer"><span className="font-mono">{o.value}</span><span className="text-xs text-muted truncate">{o.hint}</span></li>)}
                </ul>
              )}
            </div>
            {parsed.error && <p className="text-xs text-rose-700 dark:text-rose-300">{parsed.error.message}{parsed.error.position ? ` (at character ${parsed.error.position + 1})` : ""}</p>}
            {parsed.query && textResults && (
              <p className="text-xs text-muted">{describeGql(parsed.query)}. Stages: {textResults.counts.map((n, i) => <span key={i}>{i > 0 && " → "}<span className="tabular-nums text-foreground/80">{n.toLocaleString("en-GB")}</span></span>)}.</p>
            )}
            <details className="text-xs text-muted">
              <summary className="cursor-pointer">Syntax</summary>
              <div className="mt-1 space-y-1 max-w-3xl">
                <p><span className="font-mono">kind[:id](filters)</span> then <span className="font-mono">-&gt;</span> to walk one hop to neighbours of another kind. <span className="font-mono">has kind(filters)</span> and <span className="font-mono">no kind(filters)</span> keep or drop items by whether such a neighbour exists. <span className="font-mono">| limit:20</span> caps the result.</p>
                <p>Filters: <span className="font-mono">status:approved+phase-3</span> (or), <span className="font-mono">status!:approved</span> (not), <span className="font-mono">tag:frontier</span>, <span className="font-mono">text:&quot;bispecific adc&quot;</span>, <span className="font-mono">name:trop</span>, <span className="font-mono">id:tnbc</span>, <span className="font-mono">minlinks:5</span>. Kinds accept singular or plural; <span className="font-mono">*</span> means any kind. Tab accepts the first suggestion.</p>
              </div>
            </details>
          </div>
        )}

        <Toolbar count={rows.length} noun={noun} left={<span className={`chip border ${resultKinds.length === 1 ? KIND_COLOR[resultKinds[0]] : "bg-foreground/5 border-border"}`}>{mode === "form" ? title : "Text query"}</span>} right={shareUrl ? <Link href={shareUrl} className="underline">share link</Link> : undefined} />
        <ResultsTable columns={columns} rows={rows} rowKey={(r) => r.id} empty={mode === "text" && parsed.error ? "Fix the query to see results." : "No objects match all clauses."} />
      </div>
    </div>
  );
}
