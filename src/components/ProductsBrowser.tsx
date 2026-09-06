"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { STATUS_LABEL, statusClass } from "@/lib/text";

export type ProductRow = {
  id: string; name: string; brand?: string; code?: string; tldr: string; route: string; status?: string;
  modality: string; modalityClass: string; payloadClass?: string;
  targets: Array<{ id: string; name: string }>; cancers: Array<{ id: string; name: string }>; companies: Array<{ id: string; name: string }>; sections: Array<{ id: string; name: string }>;
  firstApproval?: number; latestApproval?: number; hasStructure: boolean;
};

type Facet = "status" | "modalityClass" | "payloadClass" | "targets" | "cancers" | "companies" | "sections";
const FACETS: Array<{ key: Facet; label: string }> = [
  { key: "status", label: "Phase / status" }, { key: "modalityClass", label: "Modality" }, { key: "payloadClass", label: "ADC payload" },
  { key: "sections", label: "Front" }, { key: "targets", label: "Target" }, { key: "cancers", label: "Cancer" }, { key: "companies", label: "Company" },
];
const STATUS_ORDER = ["approved", "phase-3", "phase-2", "phase-1", "established", "preclinical"];

function values(r: ProductRow, f: Facet): string[] {
  const v = r[f];
  if (v === undefined) return [];
  if (Array.isArray(v)) return v.map((x) => x.name);
  return [String(v)];
}

export function ProductsBrowser({ rows }: { rows: ProductRow[] }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Partial<Record<Facet, string[]>>>({});
  const [sort, setSort] = useState<"name" | "status" | "newest">("status");
  const [view, setView] = useState<"cards" | "table">("cards");

  const toggle = (f: Facet, v: string) => setSel((s) => { const cur = s[f] ?? []; return { ...s, [f]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] }; });
  const active = Object.values(sel).some((a) => a && a.length);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (needle && !`${r.name} ${r.brand ?? ""} ${r.code ?? ""} ${r.tldr} ${r.modality} ${values(r, "targets").join(" ")}`.toLowerCase().includes(needle)) return false;
      for (const f of FACETS.map((x) => x.key)) {
        const want = sel[f];
        if (!want || !want.length) continue;
        const have = values(r, f);
        if (!want.some((w) => have.includes(w))) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "newest") return (b.latestApproval ?? 0) - (a.latestApproval ?? 0) || a.name.localeCompare(b.name);
      const ia = STATUS_ORDER.indexOf(a.status ?? ""), ib = STATUS_ORDER.indexOf(b.status ?? "");
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.name.localeCompare(b.name);
    });
  }, [rows, q, sel, sort]);

  // Facet counts computed against the current result set (excluding the facet's own selection) so options stay discoverable.
  const facetOptions = useMemo(() => {
    const out: Record<Facet, Array<[string, number]>> = { status: [], modalityClass: [], payloadClass: [], targets: [], cancers: [], companies: [], sections: [] };
    for (const { key } of FACETS) {
      const counts = new Map<string, number>();
      const base = rows.filter((r) => {
        const needle = q.trim().toLowerCase();
        if (needle && !`${r.name} ${r.brand ?? ""} ${r.code ?? ""} ${r.tldr} ${r.modality}`.toLowerCase().includes(needle)) return false;
        for (const f of FACETS.map((x) => x.key)) {
          if (f === key) continue;
          const want = sel[f]; if (!want || !want.length) continue;
          if (!want.some((w) => values(r, f).includes(w))) return false;
        }
        return true;
      });
      for (const r of base) for (const v of values(r, key)) counts.set(v, (counts.get(v) ?? 0) + 1);
      let arr = [...counts.entries()];
      arr = key === "status" ? arr.sort((a, b) => STATUS_ORDER.indexOf(a[0]) - STATUS_ORDER.indexOf(b[0])) : arr.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
      out[key] = arr;
    }
    return out;
  }, [rows, q, sel]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-5 lg:sticky lg:top-20 self-start max-h-[85vh] overflow-auto pr-1">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by name, brand, code, target…" aria-label="Filter products" className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/40" />
        {FACETS.map(({ key, label }) => {
          const opts = facetOptions[key];
          if (!opts.length) return null;
          const shown = key === "targets" || key === "companies" || key === "cancers" ? opts.slice(0, 18) : opts;
          return (
            <div key={key}>
              <div className="kicker mb-1.5">{label}</div>
              <div className="flex flex-wrap gap-1.5">
                {shown.map(([v, n]) => {
                  const on = (sel[key] ?? []).includes(v);
                  return (
                    <button key={v} onClick={() => toggle(key, v)} className={`chip border text-[12px] ${on ? "bg-accent text-white border-accent" : key === "status" ? statusClass(v) + " border-transparent hover:brightness-95" : "bg-card border-border hover:bg-foreground/5"}`}>
                      {key === "status" ? STATUS_LABEL[v] ?? v : v}<span className={`ml-1 ${on ? "text-white/80" : "text-muted"}`}>{n}</span>
                    </button>
                  );
                })}
                {opts.length > shown.length && <span className="text-xs text-muted self-center">+{opts.length - shown.length} more via search</span>}
              </div>
            </div>
          );
        })}
        {(active || q) && <button onClick={() => { setSel({}); setQ(""); }} className="text-sm underline text-muted">Clear all</button>}
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-sm">
          <div><span className="font-semibold tabular-nums">{filtered.length}</span> <span className="text-muted">of {rows.length} products</span></div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-muted">Sort
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="rounded-md border border-border bg-card px-2 py-1 text-sm">
                <option value="status">evidence tier</option><option value="newest">newest approval</option><option value="name">name</option>
              </select>
            </label>
            <div className="flex rounded-md border border-border overflow-hidden">
              <button onClick={() => setView("cards")} className={`px-2.5 py-1 ${view === "cards" ? "bg-foreground text-background" : "bg-card"}`}>Cards</button>
              <button onClick={() => setView("table")} className={`px-2.5 py-1 ${view === "table" ? "bg-foreground text-background" : "bg-card"}`}>Table</button>
            </div>
          </div>
        </div>

        {filtered.length === 0 && <div className="card p-8 text-center text-muted">No products match. Clear a filter.</div>}

        {view === "cards" ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((r) => (
              <Link key={r.id} href={r.route} className="card p-4 hover:shadow-md hover:-translate-y-px transition flex flex-col">
                <div className="flex items-center gap-2 mb-1.5">{r.status && <span className={`chip ${statusClass(r.status)}`}>{STATUS_LABEL[r.status] ?? r.status}</span>}<span className="text-xs text-muted truncate">{r.modalityClass}</span>{r.hasStructure && <span className="ml-auto text-[10px] text-muted" title="3D structure on page">⟳ 3D</span>}</div>
                <div className="font-semibold leading-snug">{r.name}{r.brand && <span className="text-muted font-normal"> · {r.brand}</span>}</div>
                <p className="text-sm text-muted mt-1 line-clamp-2 flex-1">{r.tldr}</p>
                <div className="mt-2 flex flex-wrap gap-1 text-[11px] text-muted">
                  {r.targets.slice(0, 3).map((t) => <span key={t.id} className="chip bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-200">{t.name}</span>)}
                  {r.companies.slice(0, 2).map((c) => <span key={c.id} className="chip bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">{c.name}</span>)}
                  {r.latestApproval && <span className="chip bg-foreground/5">{r.firstApproval && r.firstApproval !== r.latestApproval ? `${r.firstApproval}–${r.latestApproval}` : r.latestApproval}</span>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="onco">
              <thead><tr><th>Product</th><th>Evidence</th><th>Modality</th><th>Targets</th><th>Cancers</th><th>Companies</th><th>Approved</th></tr></thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td><Link href={r.route} className="font-medium hover:underline">{r.name}</Link>{(r.brand || r.code) && <div className="text-xs text-muted">{[r.brand, r.code].filter(Boolean).join(" · ")}</div>}</td>
                    <td>{r.status && <span className={`chip ${statusClass(r.status)}`}>{STATUS_LABEL[r.status] ?? r.status}</span>}</td>
                    <td className="text-muted">{r.modality}</td>
                    <td className="text-muted">{r.targets.map((t) => t.name).join(", ")}</td>
                    <td className="text-muted">{r.cancers.map((c) => c.name).join(", ")}</td>
                    <td className="text-muted">{r.companies.map((c) => c.name).join(", ")}</td>
                    <td className="tabular-nums text-muted">{r.firstApproval ?? "—"}{r.latestApproval && r.latestApproval !== r.firstApproval ? `–${r.latestApproval}` : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
