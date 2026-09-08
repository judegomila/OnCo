"use client";

import { biomarkers } from "@/data/biomarkers";
import { MODES, STAGES, useProfile, type ProfileMode, type Stage } from "@/lib/profile";
import { FacetSelect } from "./filters/FacetSelect";

export type ProfileCancer = { id: string; name: string; group: string };
export type ProfileLine = { id: string; name: string; kind: "drug" | "technology"; cancers: string[] };

/**
 * One compact row that edits the browser-side profile. Everything stays in localStorage.
 * `lines` are the products and technologies offered as "already tried" (filtered to the chosen cancer when one is set).
 */
export function ProfileBar({ cancers, lines, compact = false }: { cancers: ProfileCancer[]; lines: ProfileLine[]; compact?: boolean }) {
  const [p, update, ready, reset] = useProfile();
  const lineOptions = lines
    .filter((l) => !p.cancerId || l.cancers.includes(p.cancerId) || p.priorLines.includes(l.id))
    .map((l) => ({ value: l.id, label: l.name, group: l.kind === "drug" ? "Products" : "Technologies" }));
  const bmOptions = biomarkers.map((b) => ({ value: b.id, label: b.label, group: b.group }));

  return (
    <div className="card p-3">
      <div className="flex flex-wrap items-center gap-2">
        <FacetSelect label="Cancer" options={cancers.map((c) => ({ value: c.id, label: c.name, group: c.group }))} value={p.cancerId ?? null} onChange={(v) => update({ cancerId: (v as string | null) ?? undefined })} allLabel="Not set" width="w-72" />
        <FacetSelect label="Stage" options={STAGES.map((s) => ({ value: s.id, label: s.label }))} value={p.stage === "unknown" ? null : p.stage} onChange={(v) => update({ stage: ((v as string | null) ?? "unknown") as Stage })} searchable={false} allLabel="Not sure" width="w-60" />
        <FacetSelect label="Biomarkers" options={bmOptions} value={p.biomarkers} onChange={(v) => update({ biomarkers: v as string[] })} multi allLabel="None entered" width="w-60" />
        <FacetSelect label="Already tried" options={lineOptions} value={p.priorLines} onChange={(v) => update({ priorLines: v as string[] })} multi allLabel="Nothing yet" width="w-60" />
        <FacetSelect label="I am a" options={MODES.map((m) => ({ value: m.id, label: m.label }))} value={p.mode} onChange={(v) => { if (v) update({ mode: v as ProfileMode }); }} searchable={false} width="w-44" highlight={false} />
        {ready && (p.cancerId || p.biomarkers.length || p.priorLines.length || p.stage !== "unknown") ? <button type="button" onClick={reset} className="text-sm underline text-muted">Clear profile</button> : null}
      </div>
      {!compact && <p className="text-[11px] text-muted mt-2">Your profile is saved in this browser only (localStorage). There is no account and no server; clear it any time. OnCo is orientation, not medical advice.</p>}
    </div>
  );
}
