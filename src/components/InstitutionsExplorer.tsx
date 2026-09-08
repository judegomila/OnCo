"use client";

import { useMemo, useState } from "react";
import { WorldMap, type MapPoint } from "./WorldMap";
import { EntityBrowser, type BrowserRow, type ColDef, type FacetDef } from "./EntityBrowser";

export type InstitutionPoint = {
  id: string; name: string; city: string; country: string;
  /** Display label, identical to the value in the table's `type` facet (e.g. "Cancer center"). */
  type: string;
  lat: number; lon: number; route: string; logo?: string;
  /** Distinct OnCo objects linked to the institution; drives dot size. */
  links: number;
};

/** The facet key `buildBrowser` uses for institution type. */
const TYPE_FACET = "type";

/**
 * Fixed hue order for institution types (never cycled, never re-assigned when a filter hides a type).
 * Light and dark steps come from the validated categorical palette; the CSS below picks per theme.
 */
const TYPE_ORDER = ["Cancer center", "University", "Hospital", "Research institute", "Government", "Consortium"];
const LIGHT = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#4a3aa7", "#e87ba4"];
const DARK = ["#3987e5", "#d95926", "#199e70", "#c98500", "#9085e9", "#d55181"];

const vars = (hexes: string[]) => hexes.map((h, i) => `--inst-${i + 1}:${h};`).join("");
const PALETTE_CSS = `.inst-explorer{${vars(LIGHT)}}` +
  `@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .inst-explorer{${vars(DARK)}}}` +
  `[data-theme="dark"] .inst-explorer,[data-theme="contrast"] .inst-explorer{${vars(DARK)}}`;

/**
 * Institutions page body: a zoomable world map, a legend of institution types that filters both the
 * dots and the table, and the shared EntityBrowser. Clicking a dot opens the institution's page.
 */
export function InstitutionsExplorer({ points, rows, facets, columns, hideStatus, hideTldr, defaultSort, noun }: {
  points: InstitutionPoint[]; rows: BrowserRow[]; facets: FacetDef[]; columns: ColDef[];
  hideStatus?: boolean; hideTldr?: boolean; defaultSort?: { key: string; dir: 1 | -1 }; noun: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const types = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of points) counts.set(p.type, (counts.get(p.type) ?? 0) + 1);
    const known = TYPE_ORDER.filter((t) => counts.has(t));
    const extra = [...counts.keys()].filter((t) => !TYPE_ORDER.includes(t)).sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0) || a.localeCompare(b));
    return [...known, ...extra].map((label, i) => ({ label, count: counts.get(label) ?? 0, color: i < LIGHT.length ? `var(--inst-${i + 1})` : "var(--muted)" }));
  }, [points]);
  const colorOf = useMemo(() => new Map(types.map((t) => [t.label, t.color])), [types]);

  const maxWeight = useMemo(() => Math.max(1, ...points.map((p) => p.links)), [points]);
  const shown = useMemo<MapPoint[]>(() => {
    const keep = selected.length ? points.filter((p) => selected.includes(p.type)) : points;
    return keep.map((p) => ({ id: p.id, name: p.name, city: `${p.city}, ${p.country}`, type: p.type, lat: p.lat, lon: p.lon, weight: p.links, color: colorOf.get(p.type), route: p.route }));
  }, [points, selected, colorOf]);

  const toggle = (t: string) => setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  const external = useMemo(() => ({ key: TYPE_FACET, values: selected }), [selected]);

  return (
    <div className="inst-explorer">
      <style>{PALETTE_CSS}</style>
      <WorldMap points={shown} maxWeight={maxWeight} ariaLabel="World map of oncology institutions" note="Dot size = linked OnCo objects" emptyText="No institutions of the selected type." />

      <div role="group" aria-label="Filter by institution type" className="mt-3 mb-5 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="kicker mr-1">Type</span>
        <button type="button" onClick={() => setSelected([])} aria-pressed={selected.length === 0}
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium transition-colors ${selected.length === 0 ? "border-foreground/40 bg-surface" : "border-border bg-card hover:border-border-strong hover:bg-surface"}`}>
          All <span className="text-muted tabular-nums">{points.length}</span>
        </button>
        {types.map((t) => {
          const on = selected.includes(t.label);
          const dim = selected.length > 0 && !on;
          return (
            <button key={t.label} type="button" onClick={() => toggle(t.label)} aria-pressed={on} title={`${on ? "Hide" : "Show only"} ${t.label.toLowerCase()}s`}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium transition-colors ${on ? "border-foreground/40 bg-surface" : "border-border bg-card hover:border-border-strong hover:bg-surface"} ${dim ? "opacity-60 hover:opacity-100" : ""}`}>
              <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full ring-1 ring-card" style={{ background: t.color }} />
              {t.label} <span className="text-muted tabular-nums">{t.count}</span>
            </button>
          );
        })}
        {selected.length > 0 && <span className="ml-1 text-muted">Showing {shown.length} of {points.length} on the map and in the table.</span>}
      </div>

      <EntityBrowser rows={rows} facets={facets} columns={columns} noun={noun} hideStatus={hideStatus} hideTldr={hideTldr} defaultSort={defaultSort} external={external} onExternalChange={setSelected} />
    </div>
  );
}
