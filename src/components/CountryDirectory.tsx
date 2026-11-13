"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/** One country, compact so 187 of them stay small in the hydration payload: code, name, region, deep dive. */
export type DirectoryRow = { c: string; n: string; r: string; d: boolean; /** Entries shown on this page (France's overseas departments): name and link. */ p?: Array<[string, string]> };

const fold = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

/**
 * Every country with a page on /countries/, grouped by IARC's world region, with a name filter and a switch for
 * deep dives only. A deep dive is set in bold with a "deep dive" tag; every other name opens its automatic page.
 */
export function CountryDirectory({ rows, regions }: { rows: DirectoryRow[]; regions: string[] }) {
  const [q, setQ] = useState("");
  const [divesOnly, setDivesOnly] = useState(false);
  const shown = useMemo(() => {
    const needle = fold(q.trim());
    return rows.filter((x) => (!divesOnly || x.d) && (!needle || fold(x.n).includes(needle) || x.c.toLowerCase() === needle || (x.p ?? []).some(([n]) => fold(n).includes(needle))));
  }, [rows, q, divesOnly]);
  const dives = rows.filter((x) => x.d).length;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a country…" aria-label="Find a country" className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 w-56" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={divesOnly} onChange={(e) => setDivesOnly(e.target.checked)} /> Deep dives only ({dives})</label>
        <span className="text-sm text-muted tabular-nums" aria-live="polite">{shown.length} of {rows.length}</span>
      </div>
      <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((r) => {
          const xs = shown.filter((x) => x.r === r);
          if (!xs.length) return null;
          return (
            <div key={r}>
              <h3 className="text-sm font-semibold mb-1">{r} <span className="text-muted font-normal tabular-nums">{xs.length}</span></h3>
              <ul className="text-sm leading-7 columns-2 gap-4">
                {xs.map((x) => (
                  <li key={x.c} className="break-inside-avoid">
                    <Link href={`/countries/${x.c.toLowerCase()}/`} prefetch={false} className={x.d ? "font-semibold hover:underline" : "hover:underline"}>{x.n}</Link>
                    {x.d && <span className="ms-1 text-[10px] uppercase tracking-wide text-accent">deep dive</span>}
                    {x.p && <span className="block text-xs text-muted leading-5">with {x.p.map(([n, h], i) => <span key={h}>{i ? ", " : ""}<Link href={h} prefetch={false} className="hover:underline">{n}</Link></span>)}</span>}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      {!shown.length && <p className="text-sm text-muted">No country matches.</p>}
    </div>
  );
}
