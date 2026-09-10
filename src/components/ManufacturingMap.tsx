"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { WorldMap, type MapPoint } from "./WorldMap";
import { FacetSelect } from "./filters/FacetSelect";
import { Toolbar } from "./filters/ResultsTable";
import { CAPABILITY_COLOR, CAPABILITY_LABEL, type Capability, type SiteOwnership } from "@/data/manufacturing";

export type SiteRow = {
  id: string; name: string; operator: string; operatorRoute?: string; ownership: SiteOwnership;
  city: string; country: string; lat: number; lng: number;
  capabilities: Capability[]; capacity: string;
  customers: Array<{ id: string; name: string; route: string }>;
  drugs: Array<{ id: string; name: string; route: string }>;
  bottleneck?: { id: string; name: string; route: string };
  source: { label: string; url: string };
};

const OWNERSHIP_LABEL: Record<SiteOwnership, string> = { cdmo: "Contract manufacturer", "in-house": "In-house", public: "Public" };

export function ManufacturingMap({ sites }: { sites: SiteRow[] }) {
  const [caps, setCaps] = useState<Capability[]>([]);
  const [own, setOwn] = useState<string[]>([]);

  const filtered = useMemo(() => sites.filter((s) => (!caps.length || s.capabilities.some((c) => caps.includes(c))) && (!own.length || own.includes(s.ownership))), [sites, caps, own]);
  const points: MapPoint[] = useMemo(() => filtered.map((s) => {
    const primary = (caps.length ? s.capabilities.find((c) => caps.includes(c)) : s.capabilities[0]) ?? s.capabilities[0];
    return { id: s.id, name: s.name, city: `${s.city}, ${s.country}`, type: s.capabilities.map((c) => CAPABILITY_LABEL[c]).join(", "), lat: s.lat, lon: s.lng, weight: s.capabilities.length, color: CAPABILITY_COLOR[primary], route: `#${s.id}` };
  }), [filtered, caps]);

  const capOptions = useMemo(() => { const m = new Map<Capability, number>(); for (const s of sites) for (const c of s.capabilities) m.set(c, (m.get(c) ?? 0) + 1); return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, label: CAPABILITY_LABEL[value], count })); }, [sites]);

  return (
    <div>
      <Toolbar count={filtered.length} total={sites.length} noun="sites"
        left={<>
          <FacetSelect label="Capability" options={capOptions} value={caps} onChange={(v) => setCaps(v as Capability[])} multi searchable={false} allLabel="Any" width="w-60" />
          <FacetSelect label="Ownership" options={(["cdmo", "in-house"] as SiteOwnership[]).map((o) => ({ value: o, label: OWNERSHIP_LABEL[o], count: sites.filter((s) => s.ownership === o).length }))} value={own} onChange={(v) => setOwn(v as string[])} multi searchable={false} allLabel="Any" width="w-52" />
          {(caps.length || own.length) ? <button type="button" onClick={() => { setCaps([]); setOwn([]); }} className="text-sm underline text-muted">Reset</button> : null}
        </>} />
      <WorldMap points={points} maxWeight={4} ariaLabel="Manufacturing sites" note="Dot colour is the site's main capability; size is how many capabilities it has. Click a dot to jump to its row." emptyText="No sites match the current filter." />
      <div className="flex flex-wrap gap-3 text-xs text-muted mt-3">
        {(Object.keys(CAPABILITY_LABEL) as Capability[]).map((c) => <span key={c}><span className="inline-block h-2.5 w-2.5 rounded-full align-middle mr-1" style={{ background: CAPABILITY_COLOR[c] }} />{CAPABILITY_LABEL[c]}</span>)}
      </div>

      <div className="card overflow-x-auto mt-6">
        <table className="onco">
          <thead><tr><th>Site</th><th>Operator</th><th>Capabilities</th><th>What the operator says it does</th><th>Customers and products</th><th>Source</th></tr></thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} id={s.id}>
                <td className="min-w-[170px]">{s.name}<div className="text-xs text-muted font-normal">{s.city}, {s.country}</div></td>
                <td className="min-w-[150px]">{s.operatorRoute ? <Link href={s.operatorRoute} className="hover:underline">{s.operator}</Link> : s.operator}<div className="text-xs text-muted">{OWNERSHIP_LABEL[s.ownership]}</div></td>
                <td className="min-w-[160px]"><div className="flex flex-wrap gap-1">{s.capabilities.map((c) => <span key={c} className="chip border border-transparent text-white" style={{ background: CAPABILITY_COLOR[c] }}>{CAPABILITY_LABEL[c]}</span>)}</div></td>
                <td className="text-muted max-w-md text-sm">{s.capacity}{s.bottleneck && <div className="text-xs mt-1">Relieves: <Link href={s.bottleneck.route} className="underline">{s.bottleneck.name}</Link></div>}</td>
                <td className="min-w-[180px]"><div className="flex flex-wrap gap-1">{s.customers.map((c) => <Link key={c.id} href={c.route} className="chip border bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900">{c.name}</Link>)}{s.drugs.map((d) => <Link key={d.id} href={d.route} className="chip border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900">{d.name}</Link>)}{!s.customers.length && !s.drugs.length && <span className="text-xs text-muted">not public</span>}</div></td>
                <td><a className="underline text-xs" href={s.source.url} rel="noopener">{s.source.label}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="px-6 py-12 text-center text-muted text-sm">Nothing matches. Clear a filter.</div>}
      </div>
    </div>
  );
}
