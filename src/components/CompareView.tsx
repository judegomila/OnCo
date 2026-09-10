"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MoleculeSlot } from "./MoleculeSlot";
import { KIND_META, type Kind } from "@/lib/schema";
import { useT } from "@/lib/i18n/ui";
import { KIND_COLOR, statusClass } from "@/lib/text";
import { FacetSelect } from "./filters/FacetSelect";

export type CompareKind = "drug" | "technology" | "target" | "trial" | "cancer";
export type CompareItem = { id: string; kind: CompareKind; name: string; route: string; status?: string; tldr: string; fields: Array<[string, string]> };

const KINDS: CompareKind[] = ["drug", "technology", "target", "trial", "cancer"];
const DEFAULTS: Record<CompareKind, string[]> = {
  drug: ["sacituzumab-govitecan", "datopotamab-deruxtecan", "sacituzumab-tirumotecan"],
  technology: ["adc", "bispecific-adc", "radioligand-therapy"],
  target: ["trop2", "her2", "nectin4"],
  trial: ["ascent-03", "tropion-breast02"],
  cancer: ["tnbc", "breast-hr-positive"],
};
const MAX = 5;

export function CompareView({ items }: { items: CompareItem[] }) {
  const { kind: kindName, status: statusName } = useT();
  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  const [ids, setIds] = useState<string[]>(DEFAULTS.drug);
  const [diffOnly, setDiffOnly] = useState(false);

  // Initial state from ?ids=a,b,c (or legacy ?a=&b=), deferred to avoid a synchronous setState in the effect.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const p = new URLSearchParams(window.location.search);
      const list = (p.get("ids")?.split(",") ?? [p.get("a"), p.get("b")]).filter((x): x is string => !!x && byId.has(x));
      if (list.length) setIds(list.slice(0, MAX));
      if (p.get("diff") === "1") setDiffOnly(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [byId]);
  useEffect(() => {
    const p = new URLSearchParams();
    p.set("ids", ids.join(","));
    if (diffOnly) p.set("diff", "1");
    window.history.replaceState(null, "", `?${p}`);
  }, [ids, diffOnly]);

  const chosen = ids.map((id) => byId.get(id)).filter((x): x is CompareItem => !!x);
  const kind: CompareKind = chosen[0]?.kind ?? "drug";
  const pool = useMemo(() => items.filter((i) => i.kind === kind), [items, kind]);
  const options = useMemo(() => pool.map((i) => ({ value: i.id, label: i.name, className: "" })), [pool]);

  const rows = useMemo(() => {
    const keys: string[] = [];
    for (const it of chosen) for (const [k] of it.fields) if (!keys.includes(k)) keys.push(k);
    return keys.map((k) => {
      const vals = chosen.map((it) => it.fields.find((f) => f[0] === k)?.[1] ?? "—");
      const same = vals.every((v) => v === vals[0]);
      return { k, vals, same };
    });
  }, [chosen]);
  const shown = diffOnly ? rows.filter((r) => !r.same) : rows;

  const setSlot = (i: number, v: string | null) => setIds((cur) => { const next = [...cur]; if (v) next[i] = v; else next.splice(i, 1); return next.length ? next : cur; });
  const switchKind = (k: CompareKind) => { setIds(DEFAULTS[k]); };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <FacetSelect label="Kind" options={KINDS.map((k) => { const p = kindName(k, "plural") ?? KIND_META[k].plural; return { value: k, label: p[0].toUpperCase() + p.slice(1) }; })} value={kind} onChange={(v) => { if (v) switchKind(v as CompareKind); }} searchable={false} allLabel="Products" width="w-44" />
        {chosen.map((it, i) => (
          <FacetSelect key={`${i}-${it.id}`} label={`#${i + 1}`} options={options} value={it.id} onChange={(v) => setSlot(i, v as string | null)} allLabel="Remove" width="w-64" />
        ))}
        {ids.length < MAX && (
          <FacetSelect key={`add-${ids.length}`} label="Add" options={options.filter((o) => !ids.includes(o.value))} value={null} onChange={(v) => { if (v) setIds((c) => [...c, v as string]); }} placeholder="pick another…" width="w-52" />
        )}
        <label className="ml-auto flex items-center gap-2 text-sm"><input type="checkbox" checked={diffOnly} onChange={(e) => setDiffOnly(e.target.checked)} /> differences only</label>
      </div>

      <div className="overflow-x-auto card">
        {chosen.length === 2 && <p className="mb-3 text-sm"><Link href={`/path/?from=${chosen[0].id}&to=${chosen[1].id}`} className="underline">How are these two related?</Link></p>}
        <table className="onco">
          <thead>
            <tr>
              <th className="w-40">Field</th>
              {chosen.map((it) => (
                <th key={it.id} className="min-w-[220px] normal-case tracking-normal">
                  <div className="flex items-center gap-2 mb-1"><span className={`chip border ${KIND_COLOR[it.kind as Kind]}`}>{kindName(it.kind, "label") ?? KIND_META[it.kind].label}</span>{it.status && <span className={`chip ${statusClass(it.status)}`}>{statusName(it.status)}</span>}</div>
                  {it.kind === "drug" && <div className="mb-2"><MoleculeSlot drugId={it.id} name={it.name} className="h-20 w-20" /></div>}
                  <Link href={it.route} className="font-semibold text-base text-foreground hover:underline">{it.name}</Link>
                  <p className="text-xs text-muted mt-1 font-normal line-clamp-3">{it.tldr}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map(({ k, vals, same }) => (
              <tr key={k} className={same ? "" : "bg-amber-50/40 dark:bg-amber-950/10"}>
                <td className="font-medium text-muted">{k}{!same && <span className="ml-1 text-amber-600" title="differs">•</span>}</td>
                {vals.map((v, i) => <td key={i} className={`text-sm ${!same && v !== "—" ? "text-foreground" : "text-foreground/80"}`}>{v}</td>)}
              </tr>
            ))}
            {shown.length === 0 && <tr><td colSpan={chosen.length + 1} className="text-center text-muted py-8">No differing fields.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted mt-3">Rows marked • differ between the selected items. Fields come from the OnCo records; empty fields render as —. Add more data to a record on GitHub to fill a gap.</p>
    </div>
  );
}
