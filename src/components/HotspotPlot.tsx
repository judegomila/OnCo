import type { HotspotKind, HotspotMap } from "@/data/hotspots";
import { RefChips } from "./RefChips";
import { Tip } from "./Tip";

const KIND: Record<HotspotKind, { label: string; color: string; tip: string }> = {
  activating: { label: "Activating", color: "#7c3aed", tip: "Turns the protein on or keeps it on; the alteration drugs are designed against." },
  resistance: { label: "Resistance", color: "#b91c1c", tip: "Arises under treatment and blocks one or more drugs." },
  "loss-of-function": { label: "Loss of function", color: "#d97706", tip: "Disables a tumour suppressor; nothing to inhibit, so the strategy is reactivation or synthetic lethality." },
  other: { label: "Other", color: "#0d9488", tip: "Neomorphic or structural alterations that do not fit the classes above." },
};

const DOMAIN_TONES = ["#c4b5fd", "#a5f3fc", "#fde68a", "#bbf7d0", "#fbcfe8", "#fed7aa", "#e9d5ff", "#bae6fd"];

/**
 * Lollipop plot of hotspot residues along a protein, with domains as coloured bars and drug chips per residue.
 * Static SVG (server-rendered), so it prints and needs no JavaScript; hover popovers come from `Tip`.
 */
export function HotspotPlot({ map, compact = false }: { map: HotspotMap; compact?: boolean }) {
  const W = 1000, PAD = 24, TRACK_Y = 150, TRACK_H = 22, TOP = 18;
  const x = (pos: number) => PAD + ((Math.max(1, Math.min(map.length, pos)) - 1) / (map.length - 1)) * (W - PAD * 2);
  // Stagger heights so adjacent labels do not collide: sort by position, alternate three levels when close.
  const sorted = [...map.hotspots].map((h, i) => ({ h, i })).sort((a, b) => a.h.position - b.h.position);
  const levels = new Map<number, number>();
  let lastX = -Infinity, level = 0;
  for (const { h, i } of sorted) {
    const px = x(h.position);
    level = px - lastX < 70 ? (level + 1) % 3 : 0;
    levels.set(i, level);
    lastX = px;
  }
  const headY = (lvl: number) => TOP + 8 + lvl * 34;
  const ticks = [1, ...[0.25, 0.5, 0.75].map((f) => Math.round(map.length * f)), map.length];

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${TRACK_Y + TRACK_H + 46}`} className="w-full min-w-[640px] h-auto" role="img" aria-label={`Mutation hotspots along ${map.gene} (${map.length} amino acids)`}>
          {/* Protein backbone */}
          <rect x={PAD} y={TRACK_Y} width={W - PAD * 2} height={TRACK_H} rx={4} className="fill-foreground/10" />
          {/* Domains */}
          {map.domains.map((d, i) => {
            const x0 = x(d.start), x1 = x(d.end);
            return (
              <g key={d.name}>
                <rect x={x0} y={TRACK_Y} width={Math.max(2, x1 - x0)} height={TRACK_H} rx={3} fill={DOMAIN_TONES[i % DOMAIN_TONES.length]} stroke="rgba(0,0,0,0.15)" strokeWidth={0.5}>
                  <title>{d.name} ({d.start} to {d.end})</title>
                </rect>
                {x1 - x0 > 70 && <text x={(x0 + x1) / 2} y={TRACK_Y + TRACK_H / 2 + 4} textAnchor="middle" fontSize={10} fill="#1f2937" className="select-none">{d.name.length > (x1 - x0) / 6 ? d.name.slice(0, Math.max(3, Math.floor((x1 - x0) / 6) - 1)) + "…" : d.name}</text>}
              </g>
            );
          })}
          {/* Axis ticks */}
          {ticks.map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={TRACK_Y + TRACK_H} y2={TRACK_Y + TRACK_H + 6} className="stroke-foreground/40" strokeWidth={1} />
              <text x={x(t)} y={TRACK_Y + TRACK_H + 18} textAnchor="middle" fontSize={10} className="fill-muted">{t}</text>
            </g>
          ))}
          <text x={W / 2} y={TRACK_Y + TRACK_H + 38} textAnchor="middle" fontSize={11} className="fill-muted">{map.gene} residue ({map.length} aa, {map.uniprot})</text>
          {/* Lollipops */}
          {map.hotspots.map((h, i) => {
            const px = x(h.position), lvl = levels.get(i) ?? 0, hy = headY(lvl), k = KIND[h.kind];
            const spanW = h.end ? Math.max(4, x(h.end) - px) : 0;
            return (
              <g key={`${h.label}-${i}`}>
                {h.end && <rect x={px} y={TRACK_Y - 3} width={spanW} height={TRACK_H + 6} fill={k.color} opacity={0.25} rx={2} />}
                <line x1={h.end ? px + spanW / 2 : px} x2={h.end ? px + spanW / 2 : px} y1={hy + 9} y2={TRACK_Y} stroke={k.color} strokeWidth={1.5} />
                <circle cx={h.end ? px + spanW / 2 : px} cy={hy} r={h.drugs.length ? 9 : 6} fill={k.color} stroke="white" strokeWidth={1.5}>
                  <title>{h.label}{h.frequency ? ` · ${h.frequency}` : ""}</title>
                </circle>
                <text x={h.end ? px + spanW / 2 : px} y={hy - 13} textAnchor="middle" fontSize={11} fontWeight={600} className="fill-foreground">{h.label.length > 22 ? h.label.slice(0, 20) + "…" : h.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
        {(Object.keys(KIND) as HotspotKind[]).filter((k) => map.hotspots.some((h) => h.kind === k)).map((k) => (
          <Tip key={k} title={KIND[k].label} text={KIND[k].tip}><span className="inline-flex items-center gap-1.5 cursor-help"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: KIND[k].color }} />{KIND[k].label}</span></Tip>
        ))}
        <span>Larger dot: a product in the corpus addresses the residue.</span>
        {map.isoformNote && <span>{map.isoformNote}</span>}
      </div>

      {!compact && (
        <div className="card overflow-x-auto">
          <table className="onco">
            <thead><tr><th>Residue</th><th>Kind</th><th className="hidden md:table-cell">How common</th><th>What it does</th><th>Addressed by</th><th className="hidden lg:table-cell">Defeats</th><th className="hidden lg:table-cell">Source</th></tr></thead>
            <tbody>
              {map.hotspots.map((h, i) => (
                <tr key={`${h.label}-${i}`}>
                  <td className="font-medium whitespace-nowrap"><span className="inline-block h-2 w-2 rounded-full mr-1.5 align-middle" style={{ background: KIND[h.kind].color }} />{h.label}<div className="text-xs text-muted font-normal">{h.end ? `${h.position} to ${h.end}` : h.position}</div></td>
                  <td className="text-muted whitespace-nowrap">{KIND[h.kind].label}</td>
                  <td className="hidden md:table-cell text-muted max-w-[220px]">{h.frequency ?? <span className="text-muted/60">not sourced</span>}</td>
                  <td className="text-muted max-w-sm">{h.note}</td>
                  <td className="min-w-[160px]">{h.drugs.length ? <RefChips ids={h.drugs} /> : <span className="text-muted">none in corpus</span>}{h.refs && h.refs.length > 0 && <RefChips ids={h.refs} className="mt-1 opacity-80" />}</td>
                  <td className="hidden lg:table-cell min-w-[140px]">{h.defeats?.length ? <RefChips ids={h.defeats} /> : <span className="text-muted">-</span>}</td>
                  <td className="hidden lg:table-cell">{h.source && <a className="underline text-xs text-muted" href={h.source.url} rel="noopener">{h.source.label}</a>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-3 py-2 text-xs text-muted">Frequencies are quoted from the source on each row; a blank means no figure was sourced, not that it is rare. Domain boundaries are approximate. Sources for the map: {map.sources.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a className="underline" href={s.url} rel="noopener">{s.label}</a></span>)}.</p>
        </div>
      )}
    </div>
  );
}
