"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { KIND_META } from "@/lib/schema";
import { KIND_COLOR, STATUS_LABEL, statusClass } from "@/lib/text";

export type CompareItem = {
  id: string; kind: "drug" | "technology"; name: string; route: string; status?: string; tldr: string;
  fields: Array<[string, string]>;
};

function Select({ label, value, items, onChange }: { label: string; value: string; items: CompareItem[]; onChange: (id: string) => void }) {
  const listId = `compare-${label}`;
  const [text, setText] = useState(items.find((i) => i.id === value)?.name ?? "");
  return (
    <label className="block text-sm">
      <span className="kicker block mb-1">{label}</span>
      <input list={listId} value={text} onChange={(e) => { setText(e.target.value); const hit = items.find((i) => i.name === e.target.value); if (hit) onChange(hit.id); }}
        className="w-full rounded-lg border border-border bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-accent/40" placeholder="Type a product or technology…" aria-label={label} />
      <datalist id={listId}>{items.map((i) => <option key={i.id} value={i.name} />)}</datalist>
    </label>
  );
}

export function CompareView({ items }: { items: CompareItem[] }) {
  const params = useSearchParams();
  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  const [a, setA] = useState(params.get("a") ?? "sacituzumab-govitecan");
  const [b, setB] = useState(params.get("b") ?? "datopotamab-deruxtecan");
  useEffect(() => { const p = new URLSearchParams({ a, b }); window.history.replaceState(null, "", `?${p}`); }, [a, b]);
  const A = byId.get(a), B = byId.get(b);
  const rows = useMemo(() => {
    const keys: string[] = [];
    for (const it of [A, B]) if (it) for (const [k] of it.fields) if (!keys.includes(k)) keys.push(k);
    return keys.map((k) => [k, A?.fields.find((f) => f[0] === k)?.[1] ?? "—", B?.fields.find((f) => f[0] === k)?.[1] ?? "—"] as const);
  }, [A, B]);

  const head = (it?: CompareItem) => it ? (
    <div>
      <div className="flex items-center gap-2 mb-1"><span className={`chip border ${KIND_COLOR[it.kind]}`}>{KIND_META[it.kind].label}</span>{it.status && <span className={`chip ${statusClass(it.status)}`}>{STATUS_LABEL[it.status] ?? it.status}</span>}</div>
      <Link href={it.route} className="font-semibold text-lg hover:underline">{it.name}</Link>
      <p className="text-sm text-muted mt-1">{it.tldr}</p>
    </div>
  ) : <span className="text-muted">Pick an item</span>;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <Select key={`a-${a}`} label="A" value={a} items={items} onChange={setA} />
        <Select key={`b-${b}`} label="B" value={b} items={items} onChange={setB} />
      </div>
      <button onClick={() => { setA(b); setB(a); }} className="text-sm underline text-muted mb-4">Swap</button>
      <div className="overflow-x-auto card">
        <table className="onco">
          <thead><tr><th className="w-40">Field</th><th>{head(A)}</th><th>{head(B)}</th></tr></thead>
          <tbody>
            {rows.map(([k, va, vb]) => (
              <tr key={k}>
                <td className="font-medium text-muted">{k}</td>
                <td className={va !== vb && va !== "—" ? "" : "text-muted"}>{va}</td>
                <td className={va !== vb && vb !== "—" ? "" : "text-muted"}>{vb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted mt-3">Fields that differ are shown in full colour. Comparison of documented attributes, not clinical equivalence.</p>
    </div>
  );
}
