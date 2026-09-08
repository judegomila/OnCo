"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BodyRegion } from "@/data/body-regions";

export type BodyCancer = { id: string; name: string; tldr: string; route: string; products: number };
export type BodyTech = { id: string; name: string; tldr: string; route: string; status?: string };

type Props = { regions: BodyRegion[]; cancers: Record<string, BodyCancer>; technologies: Record<string, BodyTech> };

/**
 * Clickable front-view body map. Line art in the wireframe aesthetic; regions are semi-transparent
 * hit areas. Mode "cancers": hover shows the cancers of that region; mode "technologies": the local
 * technologies (imaging, ablation, radiation, surgery) that apply there.
 */
export function BodyMap({ regions, cancers, technologies }: Props) {
  const [mode, setMode] = useState<"cancers" | "technologies">("cancers");
  const [active, setActive] = useState<string | null>(null);
  const region = regions.find((r) => r.id === active) ?? null;

  const counts = useMemo(() => Object.fromEntries(regions.map((r) => [r.id, mode === "cancers" ? r.cancers.length : r.technologies.length])), [regions, mode]);
  const max = Math.max(1, ...Object.values(counts));

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <div className="card p-3">
        <div className="flex gap-1 mb-2 text-sm">
          <button type="button" onClick={() => setMode("cancers")} aria-pressed={mode === "cancers"} className={`chip border ${mode === "cancers" ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-foreground/5"}`}>Where cancers arise</button>
          <button type="button" onClick={() => setMode("technologies")} aria-pressed={mode === "technologies"} className={`chip border ${mode === "technologies" ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-foreground/5"}`}>Where technologies apply</button>
        </div>
        <svg viewBox="0 0 400 900" className="w-full h-auto" role="img" aria-label="Front view of the human body with clickable regions">
          <g fill="none" stroke="currentColor" strokeWidth={1.4} className="text-foreground/55" strokeLinejoin="round" strokeLinecap="round">
            {/* head and neck */}
            <path d="M200 18 C150 18 128 56 130 96 C132 128 152 150 178 158 L180 176 L220 176 L222 158 C248 150 268 128 270 96 C272 56 250 18 200 18 Z" />
            {/* torso */}
            <path d="M180 176 C150 186 118 196 104 228 C96 250 92 300 94 350 L102 420 L100 500 L108 590 L110 640 L136 712 L264 712 L290 640 L292 590 L300 500 L298 420 L306 350 C308 300 304 250 296 228 C282 196 250 186 220 176" />
            {/* arms */}
            <path d="M104 228 C80 250 62 300 56 360 L48 470 L44 560 L64 566 L80 470 L96 380 L102 320" />
            <path d="M296 228 C320 250 338 300 344 360 L352 470 L356 560 L336 566 L320 470 L304 380 L298 320" />
            {/* hands */}
            <path d="M44 560 L36 600 L52 606 L64 566" /><path d="M356 560 L364 600 L348 606 L336 566" />
            {/* legs */}
            <path d="M136 712 L130 790 L134 860 L128 892 L172 892 L180 860 L192 780 L200 712" />
            <path d="M264 712 L270 790 L266 860 L272 892 L228 892 L220 860 L208 780 L200 712" />
            {/* midline and ribs, faint */}
            <path d="M200 176 L200 712" strokeDasharray="2 8" className="text-foreground/25" />
            <path d="M130 270 Q200 290 270 270 M126 300 Q200 322 274 300 M126 330 Q200 352 274 330 M130 360 Q200 380 270 360" className="text-foreground/20" />
          </g>
          {regions.map((r) => {
            const on = r.id === active;
            const n = counts[r.id] ?? 0;
            const alpha = 0.12 + 0.5 * (n / max);
            const isSide = ["skin", "bone", "blood", "lymph", "neuroendocrine"].includes(r.id);
            return (
              <g key={r.id} tabIndex={0} role="button" aria-label={`${r.label}: ${n} ${mode}`} onMouseEnter={() => setActive(r.id)} onFocus={() => setActive(r.id)} onClick={() => setActive(r.id)} className="cursor-pointer outline-none">
                <path d={r.path} fill={on ? "var(--accent)" : mode === "cancers" ? "#f43f5e" : "#0ea5e9"} fillOpacity={on ? 0.55 : alpha} stroke={on ? "var(--accent)" : "currentColor"} strokeWidth={on ? 2 : 1} strokeDasharray={isSide ? "4 3" : undefined} className={on ? "" : "text-foreground/40"} />
                <text x={r.at[0]} y={r.at[1]} textAnchor="middle" className="fill-foreground pointer-events-none" style={{ fontSize: isSide ? 10 : 11, fontWeight: on ? 700 : 500 }}>{r.label.length > 18 ? r.label.split(" ")[0] : r.label}</text>
              </g>
            );
          })}
          <text x={200} y={12} textAnchor="middle" className="fill-muted" style={{ fontSize: 10 }}>front view · dashed boxes are system-wide (skin, bone, blood, lymph, neuroendocrine)</text>
        </svg>
      </div>

      <div>
        {!region && (
          <div className="card p-6 text-muted text-sm">Hover or tap a region. Shade shows how many {mode === "cancers" ? "cancer types arise there" : "local technologies apply there"}.</div>
        )}
        {region && (
          <div className="card p-5">
            <div className="kicker mb-1">{mode === "cancers" ? "Cancers arising in" : "Technologies applied to"}</div>
            <h2 className="text-xl font-semibold">{region.label}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {mode === "cancers"
                ? region.cancers.map((id) => { const c = cancers[id]; if (!c) return null; return (
                  <Link key={id} href={c.route} className="card p-3 hover:shadow-md transition">
                    <div className="font-medium">{c.name}</div>
                    <p className="text-xs text-muted mt-0.5 line-clamp-3">{c.tldr}</p>
                    <div className="text-xs text-muted mt-1"><span className="font-semibold text-foreground tabular-nums">{c.products}</span> products in OnCo</div>
                  </Link>); })
                : region.technologies.map((id) => { const t = technologies[id]; if (!t) return null; return (
                  <Link key={id} href={t.route} className="card p-3 hover:shadow-md transition">
                    <div className="font-medium">{t.name}</div>
                    <p className="text-xs text-muted mt-0.5 line-clamp-3">{t.tldr}</p>
                  </Link>); })}
            </div>
            {mode === "cancers" && region.technologies.length > 0 && (
              <p className="mt-4 text-xs text-muted">Local technologies here: {region.technologies.map((id) => technologies[id]?.name).filter(Boolean).join(", ")}. <button type="button" className="underline" onClick={() => setMode("technologies")}>Show</button></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
