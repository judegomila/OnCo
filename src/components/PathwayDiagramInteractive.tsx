"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import type { PathwayDiagramView } from "@/lib/pathway-products";
import { mechanismEvidenceLabel, supportsPathIllustration } from "@/lib/mechanism-evidence";
import { STATUS_LABEL, statusClass } from "@/lib/text";

/** A rim in the card colour behind small labels, so an edge running under one does not strike through it. */
const HALO = { paintOrder: "stroke", strokeWidth: 3, strokeLinejoin: "round" } as const;

type Hover = { kind: "node"; id: string; x: number; y: number } | { kind: "edge"; i: number; x: number; y: number };

/**
 * Pathway diagram that lights up. Pick a product: the nodes it hits glow, everything else dims,
 * and the escape routes (activating inputs that feed the pathway downstream of the block) are marked.
 * Every node and edge has a tooltip (hover, keyboard focus, or a first tap on a touch screen) and every node
 * opens a page: its target, the term or target sharing its name, or the pathway itself.
 * Renders the full static SVG on the server, so it works without JavaScript. The layout (box sizes, wrapped labels,
 * orthogonal edge routes with rounded corners, the fitted canvas) arrives ready-made from src/lib/pathway-routing.ts.
 */
export function PathwayDiagramInteractive({ view, large = false }: { view: PathwayDiagramView; large?: boolean }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<Hover | null>(null);
  const [pinned, setPinned] = useState(false);
  const coarse = useRef(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => { coarse.current = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches; }, []);
  useEffect(() => {
    if (!pinned) return;
    const off = (e: PointerEvent) => { if (box.current && !box.current.contains(e.target as Node)) { setHover(null); setPinned(false); } };
    window.addEventListener("pointerdown", off);
    return () => window.removeEventListener("pointerdown", off);
  }, [pinned]);
  const product = view.products.find((p) => p.id === selected) ?? null;

  const { boxes, paths, view: vb, legend } = view.drawing;
  const byId = useMemo(() => new Map(view.nodes.map((n) => [n.id, n])), [view.nodes]);

  // Nodes hit by the product; downstream nodes (reachable via "activates" from a hit node); escape edges: activating
  // edges into a downstream node whose source is NOT itself downstream of the hit (i.e. a bypass input).
  const { hit, downstream, escapes } = useMemo(() => {
    const hit = new Set(product?.nodeIds ?? []);
    const downstream = new Set<string>();
    if (hit.size) {
      const q = [...hit];
      while (q.length) {
        const cur = q.pop()!;
        for (const e of view.edges) if (supportsPathIllustration(e) && e.from === cur && e.type === "activates" && !downstream.has(e.to) && !hit.has(e.to)) { downstream.add(e.to); q.push(e.to); }
      }
    }
    const escapes = new Set<number>();
    if (hit.size) view.edges.forEach((e, i) => { if (supportsPathIllustration(e) && e.type === "activates" && downstream.has(e.to) && !hit.has(e.from) && !downstream.has(e.from)) escapes.add(i); });
    return { hit, downstream, escapes };
  }, [product, view.edges]);

  const escapeSources = [...escapes].map((i) => view.nodes.find((n) => n.id === view.edges[i].from)?.label).filter(Boolean);
  const hitLabels = view.nodes.filter((n) => hit.has(n.id)).map((n) => n.label);

  const show = (h: Hover) => { if (!pinned) setHover(h); };
  const hide = () => { if (!pinned) setHover(null); };
  // On a touch screen the first tap on a node shows its tooltip (with the link inside); the second follows the link.
  const tapNode = (e: MouseEvent, id: string, x: number, y: number) => {
    if (!coarse.current) return;
    if (hover?.kind === "node" && hover.id === id && pinned) return;
    e.preventDefault();
    setHover({ kind: "node", id, x, y });
    setPinned(true);
  };
  const tapEdge = (i: number, x: number, y: number) => {
    setHover({ kind: "edge", i, x, y });
    setPinned(true);
  };

  const productsHitting = (nodeId: string) => view.products.filter((p) => p.nodeIds.includes(nodeId));
  const opensLabel: Record<string, string> = { target: "Open the target page", term: "Open the glossary entry", technology: "Open the technology page", pathway: "Open the pathway page" };

  const tipBody = (() => {
    if (!hover) return null;
    if (hover.kind === "node") {
      const n = byId.get(hover.id);
      if (!n) return null;
      const hitting = productsHitting(n.id);
      return (
        <>
          <div className="font-medium leading-snug">{n.targetName && n.targetName !== n.label ? `${n.label} (${n.targetName})` : n.label}</div>
          {n.tip ? <p className="mt-1 text-muted leading-snug">{n.tip}</p> : <p className="mt-1 text-muted leading-snug">A step in {view.name}.</p>}
          {hitting.length > 0 && <p className="mt-1 text-xs text-muted leading-snug">Hit by {hitting.length === 1 ? hitting[0].name : `${hitting.length} products (${hitting.slice(0, 3).map((p) => p.name).join(", ")}${hitting.length > 3 ? ", …" : ""})`}.</p>}
          {n.href && <Link href={n.href} className="mt-1.5 inline-block text-xs font-medium text-accent hover:underline">{opensLabel[n.opens ?? "pathway"]} →</Link>}
        </>
      );
    }
    const e = view.edges[hover.i];
    if (!e) return null;
    const a = byId.get(e.from), b = byId.get(e.to);
    const isEscape = escapes.has(hover.i), blocked = supportsPathIllustration(e) && !!product && hit.has(e.from) && e.type === "activates";
    const qualifier = mechanismEvidenceLabel(e);
    return (
      <>
        <div className="font-medium leading-snug">{qualifier && `${qualifier}: `}{a?.label} {e.type === "inhibits" ? "inhibits" : "activates"} {b?.label}</div>
        <p className="mt-1 text-muted leading-snug">
          {e.evidence?.length ? e.evidence.map(item => `${item.context}: ${item.statement}`).join(" ") : e.type === "inhibits" ? "A brake: the first switches the second off or holds it down." : "A relay: the first switches the second on."}
          {isEscape && ` With ${product?.name} selected this is an escape route: it feeds the pathway below the block.`}
          {blocked && ` ${product?.name} sits on this step, so the signal stops here.`}
        </p>
      </>
    );
  })();

  return (
    <div className="card overflow-hidden">
      {view.products.length > 0 && (
        <div className="px-3 pt-3 flex flex-wrap items-center gap-1.5 text-sm">
          <span className="text-muted mr-1">Light up a product:</span>
          <button type="button" onClick={() => setSelected(null)} className={`chip border ${!selected ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-foreground/5"}`}>None</button>
          {view.products.slice(0, 18).map((p) => (
            <button key={p.id} type="button" onClick={() => setSelected(p.id === selected ? null : p.id)} aria-pressed={p.id === selected}
              className={`chip border ${p.id === selected ? "bg-accent-solid text-accent-fg border-accent-solid" : "bg-card border-border hover:bg-foreground/5"}`}>{p.name}</button>
          ))}
          {view.products.length > 18 && <span className="text-xs text-muted">+{view.products.length - 18} more via the Connected tab</span>}
        </div>
      )}
      <div className="p-2 overflow-x-auto">
        <div ref={box} className={`relative ${large ? "min-w-[720px]" : "min-w-[640px]"}`} onMouseLeave={hide}>
          <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} className="w-full h-auto" role="group" aria-label={`${view.name} pathway diagram${product ? `, highlighting ${product.name}` : ""}`}>
            <defs>
              <marker id={`arrow-${view.id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker>
              <marker id={`bar-${view.id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><rect x="7" y="0" width="3" height="10" fill="currentColor" /></marker>
              <filter id={`glow-${view.id}`} x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            {view.edges.map((e, i) => {
              const route = paths[i];
              if (!route) return null;
              const inhibit = e.type === "inhibits";
              const isEscape = escapes.has(i);
              const dimmed = !!product && !isEscape && !hit.has(e.from) && !hit.has(e.to) && !downstream.has(e.to);
              const blocked = supportsPathIllustration(e) && !!product && hit.has(e.from) && e.type === "activates";
              const qualifier = mechanismEvidenceLabel(e);
              const hovered = hover?.kind === "edge" && hover.i === i;
              const cls = isEscape ? "text-amber-500" : inhibit ? "text-rose-500" : blocked ? "text-accent" : hovered ? "text-foreground" : "text-foreground/60";
              const { d, mx, my } = route, vertical = route.dir === "v";
              const from = byId.get(e.from)?.label ?? e.from, to = byId.get(e.to)?.label ?? e.to;
              return (
                <g key={i} className={`transition-opacity ${dimmed && !hovered ? "opacity-20" : ""}`}>
                  <title>{`${qualifier ? `${qualifier}: ` : ""}${from} ${inhibit ? "inhibits" : "activates"} ${to}`}</title>
                  <path d={d} fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={isEscape ? 2.6 : blocked ? 2.2 : hovered ? 2.4 : 1.6}
                    strokeDasharray={inhibit ? "5 4" : blocked ? "2 5" : undefined} className={cls}
                    markerEnd={inhibit ? `url(#bar-${view.id})` : `url(#arrow-${view.id})`} />
                  {/* Wide invisible hit path along the route so the thin edge is easy to hover or tap. */}
                  <path d={d} fill="none" stroke="transparent" strokeWidth={14} className="cursor-help"
                    onMouseEnter={() => show({ kind: "edge", i, x: mx, y: my })} onMouseMove={() => show({ kind: "edge", i, x: mx, y: my })} onClick={() => tapEdge(i, mx, my)} />
                  {/* Beside a vertical run, above (escape) or below (blocked) a horizontal one. */}
                  {isEscape && <text x={vertical ? mx + 6 : mx} y={vertical ? my + 3 : my - 6} textAnchor={vertical ? "start" : "middle"} className="fill-amber-600 stroke-card pointer-events-none" style={{ fontSize: 10, fontWeight: 600, ...HALO }}>escape</text>}
                  {blocked && <text x={vertical ? mx + 6 : mx} y={vertical ? my + 3 : my + 13} textAnchor={vertical ? "start" : "middle"} className="fill-accent stroke-card pointer-events-none" style={{ fontSize: 10, fontWeight: 600, ...HALO }}>blocked</text>}
                  {qualifier && <text x={vertical ? mx + 6 : mx} y={vertical ? my + 3 : my - 6} textAnchor={vertical ? "start" : "middle"} className="fill-muted stroke-card pointer-events-none" style={{ fontSize: 10, ...HALO }}>context</text>}
                </g>
              );
            })}
            {view.nodes.map((n, ni) => {
              const c = boxes[ni];
              const top = c.cy - c.h / 2;
              const isHit = hit.has(n.id), isDown = downstream.has(n.id);
              const hovered = hover?.kind === "node" && hover.id === n.id;
              const dimmed = !!product && !isHit && !isDown && !hovered;
              const boxEl = (
                <g className={`transition-opacity ${dimmed ? "opacity-30" : ""}`} filter={isHit ? `url(#glow-${view.id})` : undefined}
                  onMouseEnter={() => show({ kind: "node", id: n.id, x: c.cx, y: top })} onFocus={() => show({ kind: "node", id: n.id, x: c.cx, y: top })}>
                  <title>{n.tip ? `${n.label}: ${n.tip}` : n.label}</title>
                  <rect x={c.cx - c.w / 2} y={top} width={c.w} height={c.h} rx={8} strokeWidth={isHit || hovered ? 2.2 : 1.2}
                    className={isHit ? "fill-rose-100 stroke-accent dark:fill-rose-950" : isDown ? "fill-amber-50 stroke-amber-400 dark:fill-amber-950/40" : n.targetId ? `fill-violet-50 ${hovered ? "stroke-violet-600" : "stroke-violet-400"} dark:fill-violet-950` : `fill-card ${hovered ? "stroke-foreground/60" : "stroke-border"}`} />
                  <text x={c.cx} y={c.cy + 4 - (c.lines.length - 1) * 7} textAnchor="middle" className="fill-foreground" style={{ fontSize: 12.5, fontWeight: n.targetId || isHit ? 600 : 500 }}>
                    {c.lines.map((l, k) => <tspan key={k} x={c.cx} dy={k ? 14 : 0}>{l}</tspan>)}
                  </text>
                  {isHit && <text x={c.cx} y={top - 5} textAnchor="middle" className="fill-accent stroke-card" style={{ fontSize: 10, fontWeight: 700, ...HALO }}>◉ {product?.name}</text>}
                </g>
              );
              return n.href
                ? <Link key={n.id} href={n.href} aria-label={`${n.label}, ${(opensLabel[n.opens ?? "pathway"] ?? "open page").toLowerCase()}`} onClick={(e) => tapNode(e, n.id, c.cx, top)}>{boxEl}</Link>
                : <g key={n.id} tabIndex={0} onClick={(e) => tapNode(e, n.id, c.cx, top)}>{boxEl}</g>;
            })}
            <g transform={`translate(${legend.x}, ${legend.y})`} className="text-foreground/60" style={{ fontSize: 11 }}>
              <line x1={0} y1={0} x2={30} y2={0} stroke="currentColor" markerEnd={`url(#arrow-${view.id})`} /><text x={36} y={4} className="fill-muted">activates</text>
              <line x1={110} y1={0} x2={140} y2={0} stroke="currentColor" strokeDasharray="5 4" className="text-rose-500" markerEnd={`url(#bar-${view.id})`} /><text x={146} y={4} className="fill-muted">inhibits</text>
              <rect x={220} y={-8} width={14} height={14} rx={3} className="fill-violet-50 stroke-violet-400 dark:fill-violet-950" /><text x={240} y={4} className="fill-muted">druggable target (click)</text>
              <rect x={400} y={-8} width={14} height={14} rx={3} className="fill-rose-100 stroke-accent dark:fill-rose-950" /><text x={420} y={4} className="fill-muted">hit by selected product</text>
              <line x1={580} y1={0} x2={610} y2={0} stroke="currentColor" strokeWidth={2.4} className="text-amber-500" markerEnd={`url(#arrow-${view.id})`} /><text x={616} y={4} className="fill-muted">escape route</text>
            </g>
          </svg>
          {hover && tipBody && (
            <div role="tooltip" className={`absolute z-20 w-64 max-w-[70%] card shadow-xl p-3 text-sm ${pinned ? "pointer-events-auto" : "pointer-events-none"}`}
              style={{ left: `${((hover.x - vb.x) / vb.w) * 100}%`, top: `${((hover.y - vb.y) / vb.h) * 100}%`, transform: `translate(${hover.x - vb.x > vb.w * 0.7 ? "-100%" : hover.x - vb.x < vb.w * 0.3 ? "0" : "-50%"}, -100%) translateY(-6px)` }}
              onMouseEnter={() => setPinned(true)} onMouseLeave={() => { setPinned(false); setHover(null); }}>
              {tipBody}
            </div>
          )}
        </div>
      </div>
      {view.edges.some(edge => edge.evidence?.length) && (
        <details className="border-t border-border px-4 py-3 text-sm">
          <summary className="min-h-11 cursor-pointer py-3 font-medium">Relationship evidence and context</summary>
          <ul className="mt-3 space-y-4">
            {view.edges.flatMap((edge, i) => (edge.evidence ?? []).map((item, j) => (
              <li key={`${i}-${j}`}>
                <div className="font-medium">{mechanismEvidenceLabel({ evidence: [item] })}: {byId.get(edge.from)?.label ?? edge.from} → {byId.get(edge.to)?.label ?? edge.to}</div>
                <p className="mt-1">{item.statement}</p>
                <p className="mt-1 text-muted">Context: {item.context}</p>
                {item.limitation && <p className="mt-1 text-muted">{item.limitation}</p>}
                <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  {item.sources.map(source => <li key={source.url}><a href={source.url} className="inline-flex min-h-11 items-center underline underline-offset-2 break-words">{source.label}</a></li>)}
                </ul>
                <p className="mt-1 text-xs text-muted">Checked {item.checkedOn}{item.sourceVersion && ` · ${item.sourceVersion}`}</p>
              </li>
            )))}
          </ul>
        </details>
      )}
      {product && (
        <div className="px-4 py-3 border-t border-border text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={product.route} className="font-medium hover:underline">{product.name}</Link>
            {product.status && <span className={`chip ${statusClass(product.status)}`}>{STATUS_LABEL[product.status] ?? product.status}</span>}
            <span className="text-muted">{product.modality}</span>
          </div>
          <p className="mt-1 text-muted">
            Hits <span className="text-foreground">{hitLabels.join(", ")}</span>.
            {view.edges.some(edge => edge.evidence?.length)
              ? <> Relationship sources retain the studied contexts; target highlighting illustrates connections.</>
              : escapeSources.length > 0
              ? <> Known escape routes feed the pathway below the block via <span className="text-foreground">{escapeSources.join(", ")}</span>; this is why single agents fail and vertical or parallel combinations are used.</>
              : <> No bypass inputs are drawn downstream of this block in this diagram.</>}
          </p>
          {view.interventions.length > 0 && (
            <p className="mt-1 text-xs text-muted">Countermeasures listed for this pathway: {view.interventions.slice(0, 3).join("; ")}{view.interventions.length > 3 ? "; …" : ""}</p>
          )}
        </div>
      )}
    </div>
  );
}
