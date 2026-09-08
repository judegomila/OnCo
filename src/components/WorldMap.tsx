"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { geoGraticule10, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";

/**
 * A point on the map. `weight` sets the dot area (square-root scaled against `maxWeight` or the
 * largest weight present); `color` is any CSS colour, including a `var(--…)` token.
 */
export type MapPoint = { id: string; name: string; city: string; type?: string; lat: number; lon: number; weight: number; color?: string; route: string };

type View = { k: number; x: number; y: number };

const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const W = 960, H = 480;
const MIN_K = 1, MAX_K = 14;
const HOME: View = { k: 1, x: 0, y: 0 };

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => { const mq = window.matchMedia(REDUCED); mq.addEventListener("change", cb); return () => mq.removeEventListener("change", cb); };

const clampView = (v: View): View => {
  const k = Math.min(MAX_K, Math.max(MIN_K, v.k));
  return { k, x: Math.min(0, Math.max(W * (1 - k), v.x)), y: Math.min(0, Math.max(H * (1 - k), v.y)) };
};
/** Zoom by `factor` keeping the map point under (px, py) (viewBox units) fixed on screen. */
const zoomAbout = (v: View, factor: number, px: number, py: number): View => {
  const k = Math.min(MAX_K, Math.max(MIN_K, v.k * factor));
  const f = k / v.k;
  return clampView({ k, x: px - (px - v.x) * f, y: py - (py - v.y) * f });
};

/**
 * Zoomable, pannable world map with weighted, coloured dots. Wheel or pinch to zoom, drag to pan,
 * double-click to zoom in, +/−/reset buttons, and keyboard (arrows pan, + / − zoom, 0 resets) when
 * the map is focused. The wheel only zooms once the map has been clicked or focused (or with Ctrl/⌘),
 * so the page still scrolls past it. Honours prefers-reduced-motion by skipping the zoom transition.
 */
export function WorldMap({ points, maxWeight, ariaLabel = "World map", note, emptyText = "No places match the current filter." }: {
  points: MapPoint[];
  /** Fix the dot scale so sizes stay stable while the caller filters `points`. */
  maxWeight?: number;
  ariaLabel?: string;
  /** Short caption in the bottom-left corner, e.g. what the dot size means. */
  note?: string;
  emptyText?: string;
}) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const [land, setLand] = useState<FeatureCollection<Geometry> | null>(null);
  const [view, setView] = useState<View>(HOME);
  const viewRef = useRef<View>(HOME);
  const [animate, setAnimate] = useState(false);
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const [hover, setHover] = useState<{ p: MapPoint; x: number; y: number; touch: boolean } | null>(null);

  // Live gesture state lives in refs so native listeners never see a stale closure.
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ moved: boolean; startX: number; startY: number; lastDist?: number; lastMid?: { x: number; y: number } }>({ moved: false, startX: 0, startY: 0 });
  const suppressClick = useRef(false);
  const justOpened = useRef<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(WORLD_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        if (!alive) return;
        setLand(feature(topo, topo.objects.countries as GeometryCollection) as unknown as FeatureCollection<Geometry>);
      })
      .catch(() => setLand(null));
    return () => { alive = false; };
  }, []);

  const projection = useMemo(() => geoNaturalEarth1().fitSize([W, H], { type: "Sphere" }), []);
  const path = useMemo(() => geoPath(projection), [projection]);
  const spherePath = useMemo(() => path({ type: "Sphere" }) ?? "", [path]);
  const graticulePath = useMemo(() => path(geoGraticule10()) ?? "", [path]);
  const landPaths = useMemo(() => (land ? land.features.map((f) => path(f) ?? "") : []), [land, path]);

  const maxW = Math.max(1, maxWeight ?? 0, ...points.map((p) => p.weight));
  const radius = (w: number) => 3.5 + 7 * Math.sqrt(Math.max(0, w) / maxW);

  const apply = useCallback((next: View, smooth: boolean) => {
    const v = clampView(next);
    viewRef.current = v;
    setAnimate(smooth && !reduced);
    setView(v);
  }, [reduced]);

  /** Client pixel → viewBox units (before the pan/zoom transform). */
  const toSvg = useCallback((clientX: number, clientY: number): { x: number; y: number } | null => {
    const svg = svgRef.current; const m = svg?.getScreenCTM();
    if (!svg || !m) return null;
    const p = new DOMPoint(clientX, clientY).matrixTransform(m.inverse());
    return { x: p.x, y: p.y };
  }, []);

  // Wheel needs a non-passive native listener so we can stop the page from scrolling while zooming.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      if (!active && !e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const at = toSvg(e.clientX, e.clientY); if (!at) return;
      const factor = Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.05 : 0.0022));
      apply(zoomAbout(viewRef.current, factor, at.x, at.y), false);
      setHover(null);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [active, apply, toSvg]);

  const zoomStep = (dir: 1 | -1) => apply(zoomAbout(viewRef.current, dir > 0 ? 1.8 : 1 / 1.8, W / 2, H / 2), true);
  const reset = () => apply(HOME, true);

  const onPointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    setActive(true); setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    gesture.current = { moved: false, startX: e.clientX, startY: e.clientY };
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current.lastDist = Math.hypot(a.x - b.x, a.y - b.y);
      gesture.current.lastMid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    }
  };
  const onPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const m = svgRef.current?.getScreenCTM(); if (!m) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (Math.hypot(e.clientX - gesture.current.startX, e.clientY - gesture.current.startY) > 4) gesture.current.moved = true;
    if (pointers.current.size === 1) {
      const v = viewRef.current;
      apply({ k: v.k, x: v.x + (e.clientX - prev.x) / m.a, y: v.y + (e.clientY - prev.y) / m.d }, false);
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const g = gesture.current;
      if (g.lastDist && g.lastMid) {
        const at = toSvg(mid.x, mid.y);
        let v = viewRef.current;
        if (at) v = zoomAbout(v, dist / g.lastDist, at.x, at.y);
        v = { k: v.k, x: v.x + (mid.x - g.lastMid.x) / m.a, y: v.y + (mid.y - g.lastMid.y) / m.d };
        apply(v, false);
      }
      g.lastDist = dist; g.lastMid = mid;
    }
    if (gesture.current.moved) setHover(null);
  };
  const onPointerUp = (e: ReactPointerEvent<SVGSVGElement>) => {
    pointers.current.delete(e.pointerId);
    if (!pointers.current.size) setDragging(false);
    gesture.current.lastDist = undefined; gesture.current.lastMid = undefined;
    if (gesture.current.moved) { suppressClick.current = true; window.setTimeout(() => { suppressClick.current = false; }, 0); }
  };
  const onDoubleClick = (e: ReactMouseEvent<SVGSVGElement>) => {
    const at = toSvg(e.clientX, e.clientY); if (!at) return;
    apply(zoomAbout(viewRef.current, 2, at.x, at.y), true);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const v = viewRef.current; const step = 60 / v.k;
    const map: Record<string, () => void> = {
      "+": () => zoomStep(1), "=": () => zoomStep(1), "-": () => zoomStep(-1), _: () => zoomStep(-1), "0": reset, Home: reset,
      ArrowLeft: () => apply({ ...v, x: v.x + step }, true), ArrowRight: () => apply({ ...v, x: v.x - step }, true),
      ArrowUp: () => apply({ ...v, y: v.y + step }, true), ArrowDown: () => apply({ ...v, y: v.y - step }, true),
      Escape: () => setHover(null),
    };
    const fn = map[e.key];
    if (fn) { e.preventDefault(); fn(); }
  };

  const placeTip = (p: MapPoint, e: ReactPointerEvent<SVGGElement>, touch: boolean) => setHover({ p, x: e.clientX, y: e.clientY, touch });
  const onDotClick = (p: MapPoint, e: ReactMouseEvent<SVGGElement>) => {
    e.stopPropagation();
    if (suppressClick.current) return;
    // On touch the first tap opens the card (there is no hover); a second tap on the same dot navigates.
    if (justOpened.current === p.id) { justOpened.current = null; return; }
    router.push(p.route);
  };

  const ordered = useMemo(() => {
    const list = [...points].sort((a, b) => b.weight - a.weight);
    if (hover) { const i = list.findIndex((p) => p.id === hover.p.id); if (i >= 0) list.push(...list.splice(i, 1)); }
    return list;
  }, [points, hover]);

  const gStyle: CSSProperties = {
    transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`,
    transformOrigin: "0 0",
    transition: animate && !reduced ? "transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1)" : "none",
  };
  const tipStyle: CSSProperties | undefined = hover ? (() => {
    const w = 260, h = 110, pad = 14;
    const flipX = hover.x + pad + w > window.innerWidth, flipY = hover.y + pad + h > window.innerHeight;
    return { left: flipX ? hover.x - pad - w : hover.x + pad, top: flipY ? hover.y - pad - h : hover.y + pad, width: w };
  })() : undefined;
  const zoomed = view.k > 1.001;

  return (
    <div className="card relative overflow-hidden select-none" onPointerLeave={() => { if (!hover?.touch) setHover(null); }}>
      <div role="group" tabIndex={0} aria-label={`${ariaLabel}. Arrow keys pan, plus and minus zoom, 0 resets.`}
        onKeyDown={onKeyDown} onFocus={() => setActive(true)} onBlur={() => setActive(false)}
        className="outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-xl">
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel}
          className="block w-full h-auto max-h-[460px]"
          style={{ background: "var(--card)", touchAction: zoomed ? "none" : "pan-y", cursor: dragging ? "grabbing" : "grab" }}
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
          onDoubleClick={onDoubleClick} onClick={() => { if (hover?.touch && !suppressClick.current) setHover(null); }}>
          <g style={gStyle}>
            <path d={spherePath} style={{ fill: "color-mix(in srgb, var(--foreground) 3%, var(--card))", stroke: "var(--border)" }} strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <path d={graticulePath} fill="none" style={{ stroke: "var(--border)" }} strokeWidth={0.6} strokeOpacity={0.7} vectorEffect="non-scaling-stroke" />
            {landPaths.map((d, i) => (
              <path key={i} d={d} style={{ fill: "color-mix(in srgb, var(--foreground) 9%, var(--card))", stroke: "var(--border)" }} strokeWidth={0.7} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            ))}
            {!land && <text x={W / 2} y={H / 2} textAnchor="middle" style={{ fontSize: 14, fill: "var(--muted)" }}>Loading map…</text>}
            {ordered.map((p) => {
              const xy = projection([p.lon, p.lat]);
              if (!xy) return null;
              const r = radius(p.weight) / view.k;
              const on = hover?.p.id === p.id;
              return (
                <g key={p.id} className="cursor-pointer" role="link" aria-label={`${p.name}, ${p.city}`}
                  onPointerEnter={(e) => { if (e.pointerType === "mouse") placeTip(p, e, false); }}
                  onPointerMove={(e) => { if (e.pointerType === "mouse" && !dragging) placeTip(p, e, false); }}
                  onPointerLeave={(e) => { if (e.pointerType === "mouse") setHover(null); }}
                  onPointerDown={(e) => { if (e.pointerType !== "mouse" && hover?.p.id !== p.id) { placeTip(p, e, true); justOpened.current = p.id; } }}
                  onClick={(e) => onDotClick(p, e)}>
                  <circle cx={xy[0]} cy={xy[1]} r={r + 4 / view.k} fill="transparent" />
                  <circle cx={xy[0]} cy={xy[1]} r={r} fill={p.color ?? "var(--accent-solid)"} fillOpacity={on ? 1 : 0.82}
                    style={{ stroke: on ? "var(--foreground)" : "var(--card)" }} strokeWidth={on ? 1.5 : 1} vectorEffect="non-scaling-stroke" />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Zoom control */}
      <div className="absolute right-2.5 top-2.5 flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card" role="toolbar" aria-label="Map zoom">
        <button type="button" onClick={() => zoomStep(1)} disabled={view.k >= MAX_K} aria-label="Zoom in" title="Zoom in (+)" className="h-8 w-8 text-base leading-none hover:bg-surface disabled:opacity-40">+</button>
        <button type="button" onClick={() => zoomStep(-1)} disabled={view.k <= MIN_K} aria-label="Zoom out" title="Zoom out (−)" className="h-8 w-8 border-t border-border text-base leading-none hover:bg-surface disabled:opacity-40">−</button>
        <button type="button" onClick={reset} disabled={!zoomed} aria-label="Reset view" title="Reset view (0)" className="h-8 w-8 border-t border-border hover:bg-surface disabled:opacity-40 flex items-center justify-center">
          <svg aria-hidden viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 8a5.5 5.5 0 1 0 1.6-3.9" /><path d="M2.5 2.5v3h3" /></svg>
        </button>
      </div>

      <div className="absolute left-3 bottom-2.5 text-[11px] text-muted pointer-events-none max-w-[70%] leading-tight">
        {note && <span>{note} · </span>}
        <span className="hidden sm:inline">{active ? "Scroll to zoom, drag to pan, double-click to zoom in." : "Click the map, then scroll to zoom. Drag to pan."}</span>
        <span className="sm:hidden">Pinch to zoom, drag to pan.</span>
      </div>
      {land && points.length === 0 && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-sm text-muted pointer-events-none">{emptyText}</div>
      )}

      {hover && tipStyle && (
        <div role="tooltip" className={`fixed z-50 card shadow-pop p-3 text-sm text-left leading-snug ${hover.touch ? "" : "pointer-events-none"}`} style={tipStyle}>
          <div className="flex items-start gap-2">
            <span aria-hidden className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: hover.p.color ?? "var(--accent-solid)" }} />
            <div className="min-w-0">
              <div className="font-semibold text-foreground">{hover.p.name}</div>
              <div className="text-muted">{hover.p.city}{hover.p.type ? ` · ${hover.p.type}` : ""}</div>
              <Link href={hover.p.route} className="mt-1.5 inline-block text-xs underline text-foreground">Open page →</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
