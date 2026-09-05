"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { KIND_META, type Kind } from "@/lib/schema";
import { KIND_COLOR, STATUS_LABEL, statusClass } from "@/lib/text";

export type Lite = { id: string; name: string; tldr: string; route: string; status?: string };
export type PickerCancer = { id: string; name: string; group: string; tldr: string; route: string; stateOfArt: string[]; pipeline: Lite[]; groups: Partial<Record<Kind, Lite[]>> };

const ORDER: Kind[] = ["technology", "drug", "target", "trial", "pairing", "idea", "pathway", "company", "institution", "roadmap", "term", "collection", "section"];

export function CancerPicker({ cancers }: { cancers: PickerCancer[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [onlyApproved, setOnlyApproved] = useState(false);
  const groups = useMemo(() => [...new Set(cancers.map((c) => c.group))], [cancers]);
  const chosen = cancers.filter((c) => selected.includes(c.id));

  const merged = useMemo(() => {
    const out = new Map<Kind, Map<string, Lite & { n: number }>>();
    for (const c of chosen) for (const [k, list] of Object.entries(c.groups) as Array<[Kind, Lite[]]>) {
      const m = out.get(k) ?? new Map();
      for (const e of list) { const prev = m.get(e.id); m.set(e.id, { ...e, n: (prev?.n ?? 0) + 1 }); }
      out.set(k, m);
    }
    return out;
  }, [chosen]);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <div className="space-y-5 lg:sticky lg:top-20 self-start max-h-[80vh] overflow-auto pr-1">
        {groups.map((grp) => (
          <div key={grp}>
            <div className="kicker mb-1.5 capitalize">{grp}</div>
            <div className="flex flex-wrap gap-1.5">
              {cancers.filter((c) => c.group === grp).map((c) => (
                <button key={c.id} onClick={() => toggle(c.id)} className={`chip border text-[13px] py-1 ${selected.includes(c.id) ? "bg-accent text-white border-accent" : "bg-card border-border hover:bg-foreground/5"}`}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        ))}
        {selected.length > 0 && <button onClick={() => setSelected([])} className="text-sm underline text-muted">Clear</button>}
      </div>

      <div>
        {chosen.length === 0 && (
          <div className="card p-8 text-center text-muted">Select a cancer type on the left to begin. Try triple-negative breast cancer, the first fully built page.</div>
        )}
        {chosen.map((c) => (
          <div key={c.id} className="card p-5 mb-4">
            <div className="flex items-baseline justify-between gap-3"><h2 className="text-xl font-semibold"><Link href={c.route} className="hover:underline">{c.name}</Link></h2><Link href={c.route} className="text-sm underline shrink-0">Full page →</Link></div>
            <p className="text-[15px] mt-1">{c.tldr}</p>
            <div className="grid gap-4 sm:grid-cols-2 mt-4 text-sm">
              <div><div className="kicker mb-1">State of the art</div><ul className="list-disc pl-5 space-y-1">{c.stateOfArt.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
              <div><div className="kicker mb-1">Coming down the pipeline</div><div className="flex flex-wrap gap-1.5">{c.pipeline.map((p) => <Link key={p.id} href={p.route} className="chip border bg-card border-border hover:bg-foreground/5">{p.name}</Link>)}</div></div>
            </div>
          </div>
        ))}
        {chosen.length > 0 && (
          <>
            <div className="flex items-center justify-between mt-8 mb-3">
              <h2 className="text-xl font-semibold">Everything relevant {chosen.length > 1 ? "to your selection" : ""}</h2>
              <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={onlyApproved} onChange={(e) => setOnlyApproved(e.target.checked)} /> approved / standard of care only</label>
            </div>
            <div className="space-y-6">
              {ORDER.map((k) => {
                const m = merged.get(k);
                if (!m || m.size === 0) return null;
                let items = [...m.values()].sort((a, b) => b.n - a.n || a.name.localeCompare(b.name));
                if (onlyApproved) items = items.filter((e) => !e.status || ["approved", "standard-of-care", "established", "positive"].includes(e.status));
                if (!items.length) return null;
                return (
                  <section key={k}>
                    <div className="flex items-baseline gap-2 mb-2"><h3 className="font-semibold capitalize">{KIND_META[k].plural}</h3><span className="text-xs text-muted">{items.length}</span></div>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((e) => (
                        <Link key={e.id} href={e.route} className={`card p-3 hover:shadow-md transition border ${KIND_COLOR[k]}`}>
                          <div className="flex items-center gap-2">{e.status && <span className={`chip ${statusClass(e.status)}`}>{STATUS_LABEL[e.status] ?? e.status}</span>}{chosen.length > 1 && e.n > 1 && <span className="text-xs text-muted">{e.n} of your cancers</span>}</div>
                          <div className="font-medium mt-1 leading-snug">{e.name}</div>
                          <p className="text-xs text-muted mt-0.5 line-clamp-2">{e.tldr}</p>
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
