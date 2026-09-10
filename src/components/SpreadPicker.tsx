"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SPREAD_LABELS, type Spread } from "@/data/spread";
import { SpreadMap, WhatHelpsLine } from "./SpreadMap";
import { GentleSection } from "./GentleSection";
import { FacetSelect } from "./filters/FacetSelect";

export type SpreadOption = { spread: Spread; name: string; route: string };

/**
 * Cancer picker for the body page: what treats advanced disease first, then the map and its site list
 * behind a calm fold. The picker itself stays visible so the reader can switch cancers without opening the map.
 */
export function SpreadPicker({ options, initial }: { options: SpreadOption[]; initial?: string }) {
  const [id, setId] = useState<string>(initial ?? options[0]?.spread.cancer ?? "");
  const cur = useMemo(() => options.find((o) => o.spread.cancer === id) ?? options[0], [options, id]);
  if (!cur) return null;
  return (
    <div className="space-y-4">
      <div className="card p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <FacetSelect label="Cancer" options={options.map((o) => ({ value: o.spread.cancer, label: o.name }))} value={id} onChange={(v) => { if (typeof v === "string") setId(v); }} allLabel="Choose a cancer" width="w-72" highlight={false} />
          <Link href={`/atlas/spread/#${cur.spread.cancer}`} className="text-sm underline text-muted">All cancers side by side →</Link>
        </div>
        <h3 className="text-lg font-semibold mt-3"><Link href={cur.route} className="hover:underline">{cur.name}</Link>: {SPREAD_LABELS.short.toLowerCase()}</h3>
        <WhatHelpsLine spread={cur.spread} className="mt-2" />
      </div>
      <GentleSection title={`the map: ${SPREAD_LABELS.fold}`} why={SPREAD_LABELS.why} reassurance={SPREAD_LABELS.reassurance}>
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="card p-3"><SpreadMap spread={cur.spread} cancerName={cur.name} showWhatHelps={false} /></div>
          <div>
            <ol className="space-y-2">
              {cur.spread.sites.map((s, i) => (
                <li key={s.region} className="card p-3 text-sm">
                  <div className="flex items-baseline justify-between gap-2"><span className="font-medium">{i + 1}. {s.site}</span><span className="chip bg-foreground/5">{s.tier}</span></div>
                  {(s.pct || s.note) && <p className="text-muted mt-1">{[s.pct, s.note].filter(Boolean).join(". ")}.</p>}
                </li>
              ))}
            </ol>
            {cur.spread.note && <p className="text-sm text-muted mt-3">{cur.spread.note}</p>}
            <p className="text-xs text-muted mt-3">Sources: {cur.spread.sources.map((u, i) => <a key={u} href={u} rel="noopener" className="underline mr-1.5">{i + 1}</a>)} · Tiers summarise autopsy and registry series; numbers are quoted only where a source states them.</p>
          </div>
        </div>
      </GentleSection>
    </div>
  );
}
