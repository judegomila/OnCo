"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { GraphData, GraphNode } from "@/lib/graph-export";
import { adjacency, DEFAULT_PER_KIND, fitChars, HUE, layoutFocus, layoutOverview, NODE_R, ORDER, OVERVIEW_INNER, OVERVIEW_OUTER, RING, shortName, type Placed } from "@/lib/graph-layout";
import { KIND_META, type Kind } from "@/lib/schema";
import { KIND_COLOR } from "@/lib/text";
import { CancerIcon } from "./CancerIcon";
import { FrontIcon } from "./FrontIcon";
import { KindIcon } from "./KindIcon";
import { placeNear } from "./Tip";
import { FacetSelect } from "./filters/FacetSelect";

/** Scene boxes. The full box leaves room for radial labels and the arc chips; the compact one (phones) drops both. */
const FULL = { W: 960, H: 700 };
const COMPACT = { W: 480, H: 480 };
/** Radial labels stop at this radius; the arc chips start just beyond it. */
const LABEL_R = 300;
const CHIP_R = 316;
const CENTER_R = 24;
const PANEL_ITEMS = 6;

const COMPACT_Q = "(max-width: 639px)";
const subscribeCompact = (cb: () => void) => { const m = window.matchMedia(COMPACT_Q); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); };
const useCompact = () => useSyncExternalStore(subscribeCompact, () => window.matchMedia(COMPACT_Q).matches, () => false);

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const num = (n: number) => n.toLocaleString("en-GB");
const kindStyle = (k: Kind) => ({ "--k": HUE[k] }) as CSSProperties;
const stripParen = (s: string) => s.replace(/\s*\([^)]*\)\s*$/, "").trim();

/** Cancers get their organ glyph, fronts their front glyph, everything else the kind icon. */
function glyphFor(n: GraphNode, className: string) {
  if (n.kind === "cancer") return <CancerIcon cancerId={n.id} className={className} />;
  if (n.kind === "section") return <FrontIcon id={n.id} className={className} />;
  return <KindIcon kind={n.kind} className={className} />;
}

/** Kind icon in its hue, for HTML chips and lists. */
function KIcon({ k, className = "h-3.5 w-3.5" }: { k: Kind; className?: string }) {
  return <span className="inline-flex shrink-0" style={{ color: HUE[k] }}><KindIcon kind={k} className={className} /></span>;
}

/** Glyph inside the SVG scene: a nested <svg> sized in scene units, centred on the current origin. */
function SceneGlyph({ n, size }: { n: GraphNode; size: number }) {
  return <svg x={-size / 2} y={-size / 2} width={size} height={size} className="gx-ico" aria-hidden focusable="false">{glyphFor(n, "")}</svg>;
}

/**
 * SVG radial explorer. Overview: fronts on the inner ring, cancers on the outer. Focus: one object in the centre,
 * neighbours in arcs by kind. The side panel describes whatever is hovered or focused and lists its neighbours, so
 * the picture and the detail sit together. Layout is deterministic (src/lib/graph-layout.ts): nothing jitters.
 */
export function GraphExplorer({ data, initialFocus }: { data: GraphData; /** Node id to start on (the ?focus= query takes over after mount). */ initialFocus?: string }) {
  const router = useRouter();
  const compact = useCompact();
  const [focus, setFocus] = useState<number | null>(() => { const i = initialFocus ? data.nodes.findIndex((n) => n.id === initialFocus) : -1; return i >= 0 ? i : null; });
  const [trail, setTrail] = useState<number[]>([]);
  const [hidden, setHidden] = useState<Set<Kind>>(new Set(["term", "collection"]));
  const [expanded, setExpanded] = useState<Set<Kind>>(new Set());
  const [hover, setHover] = useState<number | null>(null);
  const [tip, setTip] = useState<{ left: number; top: number } | null>(null);

  const byId = useMemo(() => new Map(data.nodes.map((n, i) => [n.id, i])), [data.nodes]);
  const adj = useMemo(() => adjacency(data), [data]);
  const kindCounts = useMemo(() => { const m = new Map<Kind, number>(); for (const n of data.nodes) m.set(n.kind, (m.get(n.kind) ?? 0) + 1); return m; }, [data.nodes]);

  // ?focus= on mount, then keep the URL in step.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const f = new URLSearchParams(window.location.search).get("focus");
      if (f && byId.has(f)) setFocus(byId.get(f)!);
    });
    return () => cancelAnimationFrame(id);
  }, [byId]);
  useEffect(() => {
    const p = focus === null ? "" : `?focus=${data.nodes[focus].id}`;
    window.history.replaceState(null, "", p || window.location.pathname);
  }, [focus, data.nodes]);

  const box = compact ? COMPACT : FULL;
  const cx = box.W / 2, cy = box.H / 2;
  const scene = useMemo(() => (focus === null ? layoutOverview(data) : layoutFocus(data, adj, focus, hidden, expanded, compact ? 2 : 4)), [focus, data, adj, hidden, expanded, compact]);
  const showLabels = scene.labels && !compact;
  const posOf = useMemo(() => new Map(scene.placed.map((p) => [p.i, p])), [scene]);

  const go = useCallback((i: number) => {
    setTrail((t) => (focus === null ? [] : [...t.slice(-7), focus]));
    setFocus(i); setExpanded(new Set()); setHover(null); setTip(null);
  }, [focus]);
  const toOverview = () => { setFocus(null); setTrail([]); setExpanded(new Set()); setHover(null); setTip(null); };
  const jump = (k: number) => { const target = trail[k]; setTrail((t) => t.slice(0, k)); setFocus(target); setExpanded(new Set()); setHover(null); };
  const toggleHidden = (k: Kind) => setHidden((h) => { const s = new Set(h); if (s.has(k)) s.delete(k); else s.add(k); return s; });
  const toggleExpanded = (k: Kind) => setExpanded((x) => { const s = new Set(x); if (s.has(k)) s.delete(k); else s.add(k); return s; });

  const hoverSet = useMemo(() => new Set<number>(hover !== null ? adj[hover] : []), [hover, adj]);
  const dim = hover !== null && hover !== focus;
  const focusNode = focus !== null ? data.nodes[focus] : null;
  const hoverNode = hover !== null ? data.nodes[hover] : null;
  const options = useMemo(() => data.nodes.map((n) => ({ value: n.id, label: n.name, group: cap(KIND_META[n.kind].plural) })), [data.nodes]);
  const kindsPresent = focus !== null ? ORDER.filter((k) => adj[focus].some((j) => data.nodes[j].kind === k)) : [];
  const gradientKinds = useMemo(() => Array.from(new Set(scene.placed.map((p) => p.n.kind))), [scene]);
  const ringNodeR = scene.placed[0]?.r ?? NODE_R;

  // Edge geometry: a gentle quadratic from the centre with a small swirl, so spokes read as strands rather than rays.
  const spoke = (p: Placed) => `M${cx} ${cy} Q${cx + p.x / 2 + p.y * 0.1} ${cy + p.y / 2 - p.x * 0.1} ${cx + p.x} ${cy + p.y}`;
  // Overview: links of the hovered node bend through the middle, like bundled threads.
  const thread = (a: Placed, b: Placed) => `M${cx + a.x} ${cy + a.y} Q${cx + (a.x + b.x) * 0.18} ${cy + (a.y + b.y) * 0.18} ${cx + b.x} ${cy + b.y}`;

  const activate = (p: Placed) => { if (p.i === focus) router.push(p.n.route); else go(p.i); };
  const nodeProps = (p: Placed, needsTip: boolean) => ({
    role: "button" as const,
    tabIndex: 0,
    "aria-label": `${p.n.name} (${KIND_META[p.n.kind].label.toLowerCase()})`,
    onMouseEnter: () => setHover(p.i),
    onMouseMove: (e: React.MouseEvent) => { if (needsTip) setTip(placeNear(e.clientX, e.clientY)); },
    onMouseLeave: () => { setHover(null); setTip(null); },
    onFocus: () => setHover(p.i),
    onBlur: () => setHover(null),
    onClick: () => activate(p),
    onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(p); } },
  });

  const centre: Placed | null = focusNode && focus !== null ? { i: focus, n: focusNode, x: 0, y: 0, a: 0, r: CENTER_R, level: 0 } : null;
  const nodes = centre ? [...scene.placed, centre] : scene.placed;

  return (
    <div className={`gx ${dim ? "is-dim" : ""}`}>
      {/* Toolbar: pick a focus, walk the trail, and (when focused) switch kinds on and off. */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <FacetSelect label="Focus" options={options} value={focusNode?.id ?? null} onChange={(v) => { if (v) go(byId.get(v as string)!); else toOverview(); }} allLabel="Overview" width="w-72" />
        <nav aria-label="Trail" className="flex flex-wrap items-center gap-x-1.5 text-sm min-w-0">
          <button type="button" onClick={toOverview} className={focusNode ? "text-accent hover:underline underline-offset-2" : "font-medium text-foreground"} aria-current={focusNode ? undefined : "true"}>Overview</button>
          {trail.map((t, k) => (
            <span key={`${t}-${k}`} className="flex items-center gap-x-1.5 min-w-0">
              <span aria-hidden className="text-muted/70">›</span>
              <button type="button" onClick={() => jump(k)} className="text-accent hover:underline underline-offset-2 truncate max-w-[10rem]">{shortName(data.nodes[t].name, 28)}</button>
            </span>
          ))}
          {focusNode && (
            <span className="flex items-center gap-x-1.5 min-w-0">
              <span aria-hidden className="text-muted/70">›</span>
              <span aria-current="true" className="font-medium text-foreground truncate max-w-[14rem]">{shortName(focusNode.name, 36)}</span>
            </span>
          )}
        </nav>
        <span className="ml-auto text-xs text-muted hidden sm:inline">{focusNode ? "Click a node to refocus · click the centre to open its page" : "Hover a front or cancer to see its links · click to focus"}</span>
      </div>
      {focusNode && focus !== null && (
        <div className="flex flex-wrap gap-1.5 mb-3" role="group" aria-label="Kinds shown">
          {kindsPresent.map((k) => {
            const n = adj[focus].filter((j) => data.nodes[j].kind === k).length;
            const on = !hidden.has(k);
            return (
              <button key={k} type="button" aria-pressed={on} onClick={() => toggleHidden(k)} style={kindStyle(k)} className="chip border gx-kchip" title={on ? `Hide ${KIND_META[k].plural}` : `Show ${KIND_META[k].plural}`}>
                <KIcon k={k} className="h-3 w-3" />
                {cap(KIND_META[k].plural)} <span className="tabular-nums opacity-70">{n}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 lg:items-start">
        {/* Scene */}
        <div className="card relative flex-1 min-w-0 overflow-hidden" style={{ aspectRatio: `${box.W} / ${box.H}` }}>
          <svg viewBox={`0 0 ${box.W} ${box.H}`} className="absolute inset-0 h-full w-full select-none" role="group" aria-label={focusNode && focus !== null ? `${focusNode.name} and its ${adj[focus].length} links` : "OnCo knowledge graph: fronts and cancers"} onMouseLeave={() => { setHover(null); setTip(null); }}>
            <defs>
              {gradientKinds.map((k) => (
                <radialGradient key={k} id={`gx-g-${k}`} gradientUnits="userSpaceOnUse" cx={cx} cy={cy} r={LABEL_R}>
                  <stop offset="0" style={{ stopColor: "var(--foreground)", stopOpacity: 0.1 }} />
                  <stop offset="0.55" stopColor={HUE[k]} stopOpacity={0.45} />
                  <stop offset="1" stopColor={HUE[k]} stopOpacity={0.9} />
                </radialGradient>
              ))}
            </defs>

            {focus === null && (
              <g>
                <circle cx={cx} cy={cy} r={OVERVIEW_INNER} className="gx-ring" />
                <circle cx={cx} cy={cy} r={OVERVIEW_OUTER} className="gx-ring" />
                {compact && (
                  <g>
                    <text x={cx} y={cy - 4} textAnchor="middle" className="gx-center-label">OnCo</text>
                    <text x={cx} y={cy + 12} textAnchor="middle" className="gx-center-sub">{num(data.nodes.length)} objects</text>
                  </g>
                )}
                {hover !== null && posOf.has(hover) && adj[hover].map((j) => {
                  const q = posOf.get(j);
                  return q ? <path key={j} d={thread(posOf.get(hover)!, q)} className="gx-link" stroke={HUE[data.nodes[hover].kind]} /> : null;
                })}
              </g>
            )}

            {focus !== null && (
              <g>
                {scene.arcs.map((arc) => {
                  const pad = 0.02, r0 = RING - ringNodeR - 8;
                  const a0 = arc.a0 + pad, a1 = arc.a1 - pad;
                  if (a1 <= a0) return null;
                  const large = a1 - a0 > Math.PI ? 1 : 0;
                  return <path key={arc.kind} style={kindStyle(arc.kind)} className="gx-band" d={`M${cx + Math.cos(a0) * r0} ${cy + Math.sin(a0) * r0} A${r0} ${r0} 0 ${large} 1 ${cx + Math.cos(a1) * r0} ${cy + Math.sin(a1) * r0}`} />;
                })}
                {scene.placed.map((p) => <path key={p.n.id} d={spoke(p)} stroke={`url(#gx-g-${p.n.kind})`} className={`gx-edge ${hover === p.i || hover === focus ? "is-on" : ""}`} />)}
              </g>
            )}

            {nodes.map((p) => {
              const isCentre = p.i === focus;
              const isHover = hover === p.i;
              const on = isCentre || hoverSet.has(p.i);
              let label: string | null = null;
              if (showLabels && !isCentre) {
                // Inner-ring labels in the overview stop short of the outer ring; focus labels stop before the chips.
                const maxRadius = focus === null ? (p.level === 0 ? OVERVIEW_OUTER - 9 - 8 : Infinity) : LABEL_R;
                const chars = Math.min(30, fitChars(p.a, Math.hypot(p.x, p.y) + p.r + 8, box.W / 2, box.H / 2, maxRadius, 10, 5.5));
                label = chars >= 6 ? shortName(p.n.name, chars) : null;
              }
              const clipped = !isCentre && label !== stripParen(p.n.name);
              const deg = (p.a * 180) / Math.PI, left = Math.cos(p.a) < 0;
              return (
                <g key={p.n.id} className={`gx-node ${on ? "is-on" : ""} ${isHover ? "is-hover" : ""} ${isCentre ? "is-center" : ""}`} style={{ ...kindStyle(p.n.kind), transform: `translate(${cx + p.x}px, ${cy + p.y}px)` }} {...nodeProps(p, clipped)}>
                  <circle r={p.r} className="gx-bubble" />
                  {p.r >= 8 && <SceneGlyph n={p.n} size={isCentre ? p.r * 1.2 : p.r * 1.15} />}
                  {label && <text className="gx-label" textAnchor={left ? "end" : "start"} dy="0.35em" transform={left ? `rotate(${deg + 180}) translate(${-(p.r + 8)} 0)` : `rotate(${deg}) translate(${p.r + 8} 0)`}>{label}</text>}
                  {isCentre && compact && <text y={p.r + 16} textAnchor="middle" className="gx-center-label">{shortName(p.n.name, 26)}</text>}
                  <circle r={p.r + 5} fill="transparent" />
                </g>
              );
            })}
          </svg>

          {/* Centre card (desktop): who is in the middle, what kind, and a way to its page. */}
          {!compact && focusNode && focus !== null && (
            <div className="absolute z-[1] w-48 -translate-x-1/2 card px-3 py-2 text-center shadow-lift" style={{ left: "50%", top: `${((cy + CENTER_R + 8) / box.H) * 100}%` }}>
              <span className={`chip border ${KIND_COLOR[focusNode.kind]} mx-auto`}><KindIcon kind={focusNode.kind} className="h-3 w-3" />{KIND_META[focusNode.kind].label}</span>
              <p className="mt-1 text-sm font-semibold leading-snug line-clamp-2">{focusNode.name}</p>
              <p className="mt-0.5 text-xs text-muted">{num(adj[focus].length)} links · <Link href={focusNode.route} className="text-accent hover:underline underline-offset-2">Open page →</Link></p>
            </div>
          )}
          {!compact && focus === null && (
            <div className="absolute z-[1] w-32 -translate-x-1/2 -translate-y-1/2 card px-2 py-2 text-center" style={{ left: "50%", top: "50%" }}>
              <p className="text-sm font-semibold">OnCo</p>
              <p className="mt-0.5 text-[11px] text-muted leading-snug">{num(data.nodes.length)} objects<br />{num(data.edges.length)} links</p>
            </div>
          )}

          {/* Arc chips (desktop): one per kind group, outside the ring; click to expand, collapse or hide the group. */}
          {!compact && focus !== null && scene.arcs.map((arc) => {
            const mid = (arc.a0 + arc.a1) / 2, cos = Math.cos(mid), sin = Math.sin(mid);
            const y = cy + sin * CHIP_R;
            // Chips near the horizontal pin to the box edge so long names never spill out of the card.
            const pinned = Math.abs(cos) >= 0.85;
            const pos: CSSProperties = pinned
              ? { top: `${(y / box.H) * 100}%`, transform: "translateY(-50%)", ...(cos > 0 ? { right: 8 } : { left: 8 }) }
              : { left: `${((cx + cos * CHIP_R) / box.W) * 100}%`, top: `${(y / box.H) * 100}%`, transform: `translate(${-50 + 50 * cos}%, ${-50 + 50 * sin}%)` };
            const isX = expanded.has(arc.kind);
            const more = arc.count > arc.shown;
            const title = isX ? `Show fewer ${KIND_META[arc.kind].plural}` : more ? `Show all ${arc.count} ${KIND_META[arc.kind].plural}` : `Hide ${KIND_META[arc.kind].plural}`;
            return (
              <button key={arc.kind} type="button" title={title} style={{ ...kindStyle(arc.kind), ...pos }} className="chip border gx-arc-chip" onClick={() => { if (isX || more) toggleExpanded(arc.kind); else toggleHidden(arc.kind); }}>
                <KIcon k={arc.kind} className="h-3 w-3" />
                {cap(KIND_META[arc.kind].plural)} <span className="tabular-nums opacity-70">{more && !isX ? `${arc.shown} of ${arc.count}` : arc.count}</span>
                <span aria-hidden className="opacity-60">{isX ? "‹" : more ? "›" : "×"}</span>
              </button>
            );
          })}
        </div>

        {/* Side panel */}
        <aside className="lg:w-[21rem] shrink-0" aria-live="polite">
          <Panel data={data} adj={adj} idx={hover ?? focus} focus={focus} onFocus={go} kindCounts={kindCounts} />
        </aside>
      </div>

      <p className="mt-3 text-xs text-muted">
        {focusNode ? `Arcs are sized by how many links of each kind are shown, up to ${DEFAULT_PER_KIND} per kind until you expand a group. ` : ""}
        Terms and collections are hidden by default; toggle them above when something is in focus.
      </p>

      {tip && hoverNode && (
        <div role="tooltip" style={{ left: tip.left, top: tip.top, width: 288 }} className="fixed z-[80] max-w-[85vw] card shadow-xl p-3 text-sm text-left leading-snug pointer-events-none">
          <span className="block font-semibold text-foreground">{hoverNode.name}</span>
          <span className="block text-xs text-muted mb-1">{KIND_META[hoverNode.kind].label} · {num(hoverNode.degree)} links</span>
          <span className="block text-muted">{hoverNode.blurb}</span>
        </div>
      )}
    </div>
  );
}

/** What is hovered or focused: its TL;DR, a link to its page, and its neighbours grouped by kind. */
function Panel({ data, adj, idx, focus, onFocus, kindCounts }: { data: GraphData; adj: number[][]; idx: number | null; focus: number | null; onFocus: (i: number) => void; kindCounts: Map<Kind, number> }) {
  const [open, setOpen] = useState<Set<Kind>>(new Set());
  const node = idx !== null ? data.nodes[idx] : null;
  const groups = useMemo(() => {
    const m = new Map<Kind, number[]>();
    if (idx === null) return m;
    for (const j of adj[idx]) { const k = data.nodes[j].kind; (m.get(k) ?? m.set(k, []).get(k)!).push(j); }
    for (const g of m.values()) g.sort((a, b) => data.nodes[b].degree - data.nodes[a].degree || data.nodes[a].name.localeCompare(data.nodes[b].name));
    return m;
  }, [idx, adj, data.nodes]);
  const starts = useMemo(() => data.nodes.map((n, i) => ({ n, i })).filter(({ n }) => n.kind !== "section" && n.kind !== "term" && n.kind !== "collection").sort((a, b) => b.n.degree - a.n.degree).slice(0, 8), [data.nodes]);

  if (!node || idx === null) {
    return (
      <div className="card p-4 space-y-4">
        <div>
          <h2 className="text-sm font-semibold">Whole graph</h2>
          <p className="mt-1 text-sm text-muted leading-snug">Every page on OnCo is a node and every reference between pages is a link. Hover a front or a cancer to light up its links, or start from one of the busiest objects.</p>
        </div>
        <div>
          <h3 className="kicker mb-2">Start from</h3>
          <ul className="space-y-1">
            {starts.map(({ n, i }) => (
              <li key={n.id}>
                <button type="button" onClick={() => onFocus(i)} className="group flex w-full items-center gap-2 rounded-lg px-1.5 py-1 text-left text-sm hover:bg-surface">
                  <span className="gx-avatar inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={kindStyle(n.kind)}>{glyphFor(n, "h-3.5 w-3.5")}</span>
                  <span className="min-w-0 flex-1 truncate group-hover:underline underline-offset-2">{n.name}</span>
                  <span className="text-xs text-muted tabular-nums">{num(n.degree)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="kicker mb-2">Contents</h3>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
            {ORDER.filter((k) => kindCounts.has(k)).map((k) => (
              <li key={k} className="flex items-center gap-1.5 text-muted">
                <KIcon k={k} />
                <span className="truncate">{cap(KIND_META[k].plural)}</span>
                <span className="ml-auto tabular-nums text-foreground/80">{num(kindCounts.get(k)!)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const kinds = ORDER.filter((k) => groups.has(k));
  const isFocus = idx === focus;
  return (
    <div className="card p-4">
      <div className="flex items-start gap-3">
        <span className="gx-avatar inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={kindStyle(node.kind)}>{glyphFor(node, "h-6 w-6")}</span>
        <div className="min-w-0 flex-1">
          <span className={`chip border ${KIND_COLOR[node.kind]}`}><KindIcon kind={node.kind} className="h-3 w-3" />{KIND_META[node.kind].label}</span>
          <h2 className="mt-1 text-base font-semibold leading-snug">{node.name}</h2>
          <p className="text-xs text-muted">{num(node.degree)} links{isFocus ? " · in focus" : ""}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted leading-snug">{node.blurb}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href={node.route} className="btn btn-primary !h-9 text-sm">Open page →</Link>
        {!isFocus && <button type="button" onClick={() => onFocus(idx)} className="btn !h-9 text-sm">Put in focus</button>}
      </div>
      {kinds.length > 0 && (
        <div className="mt-4 space-y-3 border-t border-border pt-3">
          {kinds.map((k) => {
            const items = groups.get(k)!;
            const isOpen = open.has(k);
            const shown = isOpen ? items : items.slice(0, PANEL_ITEMS);
            return (
              <section key={k} aria-label={KIND_META[k].plural}>
                <div className="mb-1 flex items-center gap-1.5">
                  <KIcon k={k} />
                  <h3 className="text-xs font-semibold">{cap(KIND_META[k].plural)}</h3>
                  <span className="text-xs text-muted tabular-nums">{items.length}</span>
                </div>
                <ul className="space-y-0.5">
                  {shown.map((j) => {
                    const m = data.nodes[j];
                    return (
                      <li key={m.id} className="group flex items-center gap-1.5 text-sm">
                        <button type="button" onClick={() => onFocus(j)} title="Put in focus" className="min-w-0 flex-1 truncate text-left rounded px-1 py-0.5 hover:bg-surface hover:underline underline-offset-2">{m.name}</button>
                        <Link href={m.route} aria-label={`Open ${m.name}`} className="shrink-0 rounded px-1 text-muted opacity-60 group-hover:opacity-100 hover:text-accent">↗</Link>
                      </li>
                    );
                  })}
                </ul>
                {items.length > PANEL_ITEMS && (
                  <button type="button" onClick={() => setOpen((o) => { const s = new Set(o); if (s.has(k)) s.delete(k); else s.add(k); return s; })} className="mt-0.5 px-1 text-xs text-accent hover:underline underline-offset-2">
                    {isOpen ? "Show fewer" : `Show all ${items.length}`}
                  </button>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
