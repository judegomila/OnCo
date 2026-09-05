"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";

export type MapPoint = { id: string; name: string; city: string; lat: number; lng: number; score: number; rank: number; route: string };

const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function WorldMap({ points }: { points: MapPoint[] }) {
  const [land, setLand] = useState<FeatureCollection<Geometry> | null>(null);
  const [hover, setHover] = useState<MapPoint | null>(null);
  const W = 960, H = 480;

  useEffect(() => {
    let alive = true;
    fetch(WORLD_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        if (!alive) return;
        const fc = feature(topo, topo.objects.countries as GeometryCollection) as unknown as FeatureCollection<Geometry>;
        setLand(fc);
      })
      .catch(() => setLand(null));
    return () => { alive = false; };
  }, []);

  const projection = useMemo(() => geoNaturalEarth1().fitSize([W, H], { type: "Sphere" }), []);
  const path = useMemo(() => geoPath(projection), [projection]);
  const maxScore = Math.max(1, ...points.map((p) => p.score));

  return (
    <div className="card p-2 relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="World map of oncology institutions">
        <path d={path({ type: "Sphere" }) ?? ""} className="fill-sky-50 dark:fill-sky-950/30" />
        {land && land.features.map((f, i) => (
          <path key={i} d={path(f) ?? ""} className="fill-zinc-200 dark:fill-zinc-800 stroke-background" strokeWidth={0.5} />
        ))}
        {!land && <text x={W / 2} y={H / 2} textAnchor="middle" className="fill-muted" style={{ fontSize: 14 }}>Loading map…</text>}
        {points.map((p) => {
          const xy = projection([p.lng, p.lat]);
          if (!xy) return null;
          const r = 3 + 9 * (p.score / maxScore);
          return (
            <Link key={p.id} href={p.route}>
              <circle cx={xy[0]} cy={xy[1]} r={r} className="fill-accent/70 stroke-background hover:fill-accent" strokeWidth={1}
                onMouseEnter={() => setHover(p)} onMouseLeave={() => setHover(null)} />
            </Link>
          );
        })}
      </svg>
      <div className="absolute left-3 bottom-3 text-xs text-muted">Dot size = OnCo score. Hover for name, click for page.</div>
      {hover && (
        <div className="absolute right-3 top-3 card px-3 py-2 text-sm shadow">
          <div className="font-medium">#{hover.rank} {hover.name}</div>
          <div className="text-muted">{hover.city} · score {hover.score}</div>
        </div>
      )}
    </div>
  );
}
