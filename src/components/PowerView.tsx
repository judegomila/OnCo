"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { KIND_META, type Kind } from "@/lib/schema";
import { scoreRow, WEIGHTS, type PowerRow, type Signals } from "@/lib/relevance";
import { KIND_COLOR, STATUS_LABEL, statusClass } from "@/lib/text";

export type PowerCancer = { id: string; name: string; group: string; route: string };
const KINDS_ORDER: Kind[] = ["drug", "technology", "target", "trial", "pairing", "idea", "company", "institution", "pathway", "term", "roadmap", "collection"];
type SortKey = "score" | "evidence" | "degree" | "year" | "name";

function scoreParts(sig: Signals | undefined): Array<[string, number]> {
  if (!sig) return [];
  return (Object.keys(WEIGHTS) as Array<keyof typeof WEIGHTS>).filter((k) => sig[k]).map((k) => [k, WEIGHTS[k]]);
}

export function PowerView({ rows, cancers, initialCancer, initialKind }: { rows: PowerRow[]; cancers: PowerCancer[]; initialCancer?: string; initialKind?: Kind }) {
  const [cancer, setCancer] = useState<string | null>(initialCancer ?? null);
  const [kind, setKind] = useState<Kind>(initialKind ?? "drug");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("score");
  const [dir, setDir] = useState<1 | -1>(-1);

  // Keep URL shareable.
  useEffect(() => {
    const p = new URLSearchParams();
    if (cancer) p.set("cancer", cancer);
    if (kind !== "drug") p.set("kind", kind);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [cancer, kind]);

  const groups = useMemo(() => [...new Set(cancers.map((c) => c.group))], [cancers]);
  const cancerName = cancers.find((c) => c.id === cancer)?.name;

  const kindCounts = useMemo(() => {
    const m: Partial<Record<Kind, number>> = {};
    for (const r of rows) if (!cancer || r.rel[cancer]) m[r.kind] = (m[r.kind] ?? 0) + 1;
    return m;
  }, [rows, cancer]);

  const scored = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = rows
      .filter((r) => r.kind === kind)
      .map((r) => ({ r, score: scoreRow(r, cancer) }))
      .filter(({ r, score }) => score >= 0 && (!status.length || status.includes(r.status ?? "")) && (!needle || `${r.name} ${r.tldr} ${r.meta} ${r.tags.join(" ")}`.toLowerCase().includes(needle)));
    list.sort((a, b) => {
      const va = sort === "score" ? a.score : sort === "evidence" ? a.r.evidence : sort === "degree" ? a.r.degree : sort === "year" ? (a.r.year ?? 0) : 0;
      const vb = sort === "score" ? b.score : sort === "evidence" ? b.r.evidence : sort === "degree" ? b.r.degree : sort === "year" ? (b.r.year ?? 0) : 0;
      if (sort === "name") return dir * a.r.name.localeCompare(b.r.name);
      return dir * (va - vb) || a.r.name.localeCompare(b.r.name);
    });
    return list;
  }, [rows, kind, cancer, q, status, sort, dir]);

  const statusOptions = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of rows) if (r.kind === kind && (!cancer || r.rel[cancer]) && r.status) m.set(r.status, (m.get(r.status) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows, kind, cancer]);

  const th = (key: SortKey, label: string, className = "") => (
    <th className={className}>
      <button onClick={() => { if (sort === key) setDir((d) => (d === 1 ? -1 : 1)); else { setSort(key); setDir(key === "name" ? 1 : -1); } }} className={`inline-flex items-center gap-1 ${sort === key ? "text-foreground" : ""}`}>
        {label}{sort === key && <span aria-hidden>{dir === -1 ? "↓" : "↑"}</span>}
      </button>
    </th>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <aside className="space-y-5 lg:sticky lg:top-20 self-start max-h-[85vh] overflow-auto pr-1">
        <div>
          <div className="kicker mb-1.5">Cancer type</div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            <button onClick={() => setCancer(null)} className={`chip border text-[12px] ${cancer === null ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-foreground/5"}`}>All cancers</button>
          </div>
          {groups.map((grp) => (
            <div key={grp} className="mb-2">
              <div className="text-[11px] text-muted capitalize mb-1">{grp}</div>
              <div className="flex flex-wrap gap-1.5">
                {cancers.filter((c) => c.group === grp).map((c) => (
                  <button key={c.id} onClick={() => setCancer(c.id)} className={`chip border text-[12px] ${cancer === c.id ? "bg-accent text-white border-accent" : "bg-card border-border hover:bg-foreground/5"}`}>{c.name.replace(/ \(.*\)$/, "")}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="kicker mb-1.5">Evidence</div>
          <div className="flex flex-wrap gap-1.5">
            {statusOptions.map(([s, n]) => {
              const on = status.includes(s);
              return <button key={s} onClick={() => setStatus((x) => (on ? x.filter((y) => y !== s) : [...x, s]))} className={`chip border text-[12px] ${on ? "bg-accent text-white border-accent" : statusClass(s) + " border-transparent hover:brightness-95"}`}>{STATUS_LABEL[s] ?? s}<span className={`ml-1 ${on ? "text-white/80" : "opacity-70"}`}>{n}</span></button>;
            })}
          </div>
        </div>
        <details className="card p-3 text-xs text-muted">
          <summary className="cursor-pointer font-medium text-foreground">How the rank is computed</summary>
          <p className="mt-2">For a chosen cancer: standard-of-care mention +{WEIGHTS.soc}, in its pipeline +{WEIGHTS.pipeline}, in its history +{WEIGHTS.history}, directly linked +{WEIGHTS.direct}, linked through one of its drugs +{WEIGHTS.indirect}. Always: evidence tier (approved 10 … concept 0) plus half a point per connection in the graph, capped at 10. It ranks documentation and evidence, not clinical benefit.</p>
        </details>
      </aside>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {KINDS_ORDER.map((k) => {
            const n = kindCounts[k] ?? 0;
            if (!n) return null;
            return <button key={k} onClick={() => setKind(k)} className={`chip border text-[12px] py-1 ${kind === k ? "bg-foreground text-background border-foreground" : `${KIND_COLOR[k]} hover:brightness-95`}`}>{KIND_META[k].plural}<span className={`ml-1 ${kind === k ? "text-background/70" : "opacity-70"}`}>{n}</span></button>;
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-sm">
          <div>
            <span className="font-semibold tabular-nums">{scored.length}</span> <span className="text-muted">{KIND_META[kind].plural}{cancerName ? ` ranked for ${cancerName}` : " across all cancers"}</span>
            {cancer && <Link href={cancers.find((c) => c.id === cancer)!.route} className="ml-2 underline text-muted">cancer page →</Link>}
          </div>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Filter ${KIND_META[kind].plural}…`} aria-label="Filter" className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 w-64" />
        </div>

        <div className="overflow-x-auto card">
          <table className="onco">
            <thead>
              <tr>
                <th>#</th>
                {th("name", "Name")}
                <th>Evidence</th>
                <th className="hidden md:table-cell">Why it ranks</th>
                {th("degree", "Links", "hidden sm:table-cell")}
                {th("year", "Year", "hidden sm:table-cell")}
                {th("score", "Score")}
              </tr>
            </thead>
            <tbody>
              {scored.map(({ r, score }, i) => {
                const parts = cancer ? scoreParts(r.rel[cancer]) : [];
                return (
                  <tr key={r.id}>
                    <td className="tabular-nums text-muted">{i + 1}</td>
                    <td className="min-w-[220px]">
                      <Link href={r.route} className="font-medium hover:underline">{r.name}</Link>
                      <div className="text-xs text-muted line-clamp-2 max-w-md">{r.meta && <span className="text-foreground/70">{r.meta} · </span>}{r.tldr}</div>
                    </td>
                    <td>{r.status && <span className={`chip ${statusClass(r.status)}`}>{STATUS_LABEL[r.status] ?? r.status}</span>}</td>
                    <td className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {parts.map(([k, w]) => <span key={k} className="chip bg-foreground/5 text-[10px]">{k === "soc" ? "standard of care" : k} +{w}</span>)}
                        {!cancer && <span className="text-xs text-muted">evidence + links</span>}
                      </div>
                    </td>
                    <td className="tabular-nums text-muted hidden sm:table-cell">{r.degree}</td>
                    <td className="tabular-nums text-muted hidden sm:table-cell">{r.year ?? "—"}</td>
                    <td className="tabular-nums font-semibold">{score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {scored.length === 0 && <div className="p-8 text-center text-muted text-sm">Nothing matches. Choose another kind or clear filters.</div>}
        </div>
      </div>
    </div>
  );
}
