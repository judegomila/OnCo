"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { EVIDENCE_TIER_LABEL, EVIDENCE_TIERS, TARGET_ROLE_LABEL, type EvidenceTier, type TargetRole } from "@/lib/kinds";
import { loadTableFile, TABLE_PAGE, type MoreRows } from "@/lib/static-tables";
import { genesFor, genomeHref, parseRole, parseTier, ROLE_BLURB, tableHref, TIER_BLURB, type GenomeGene, type GenomeRoleSection } from "@/lib/genome-hub";
import { MoreFoot } from "./filters/ResultsTable";

const n = (x: number) => x.toLocaleString("en-GB");

/** Pill glyphs, one path each, drawn at 24 by 24 with a 2 px stroke. */
const GLYPH: Record<TargetRole | EvidenceTier | "all", string> = {
  all: "M4 6h16M4 12h16M4 18h16",
  "drug-target": "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12h.01",
  "oncogene-driver": "M12 20V4M6 10l6-6 6 6",
  "tumour-suppressor": "M12 4v16M6 14l6 6 6-6",
  biomarker: "M6 3h12M9 3v7l-5 8a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-5-8V3",
  "fusion-partner": "M4 12h6M14 12h6M10 8l4 8M14 8l-4 8",
  "dna-repair": "M8 3c0 6 8 6 8 12M16 3c0 6-8 6-8 12M8 15v6M16 15v6M9 7h6M9 17h6",
  "immune-checkpoint": "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4zM9 12h6",
  antigen: "M12 3v5M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 16v5M5 12h3M16 12h3",
  "approved-drug": "M5 12l4 4L19 6",
  "clinical-evidence": "M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M7.5 15h9",
  "cohort-driver": "M9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3M16 3.5a3 3 0 0 1 0 5.5M18 13a4 4 0 0 1 3 4v3",
  "association-only": "M8 12h8M5 12a7 7 0 0 1 7-7M19 12a7 7 0 0 1-7 7",
};

function Glyph({ name, className = "h-3.5 w-3.5" }: { name: keyof typeof GLYPH; className?: string }) {
  return <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={GLYPH[name]} /></svg>;
}

function Pill({ href, on, glyph, label, count, pick }: { href: string; on: boolean; glyph: keyof typeof GLYPH; label: string; count: number; pick: () => void }) {
  return (
    <a href={href} aria-current={on ? "true" : undefined} onClick={(e) => { e.preventDefault(); pick(); }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition ${on ? "bg-accent text-white border-accent" : "bg-card border-border hover:border-border-strong hover:shadow-sm"}`}>
      <Glyph name={glyph} className="h-4 w-4" />
      <span>{label}</span>
      <span className={`text-xs tabular-nums ${on ? "text-white/80" : "text-muted"}`}>{n(count)}</span>
    </a>
  );
}

/** The foot of a section with genes still to show: the Show more pill, and a sentinel that asks for the next page when it comes within 600 px of the viewport. */
function Foot({ total, shown, load, loading }: { total: number; shown: number; load: () => void; loading: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || loading || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) load(); }, { rootMargin: "600px 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [load, loading, shown]);
  return <div className="card mt-3"><MoreFoot ref={ref} total={total} shown={shown} step={TABLE_PAGE} load={load} loading={loading} /></div>;
}

/**
 * The per-role gene sections of /targets/genome/. The page's HTML carries the first TABLE_PAGE genes of every role
 * (rendered on the server too, so crawlers see them) with the role's whole count and its split by evidence tier;
 * every graded gene lives once in /api/v1/tables/genome-genes.json, fetched when the reader scrolls past a
 * section's chips, presses "Show 30 more", or sets a filter, after which the sections and the `?role=` and
 * `?evidence=` deep links run over the full set. Deep links are read once after mount, the way the other
 * URL-backed views do it, and a pill writes the choice back into the URL without a navigation.
 */
export function GenomeRoles({ sections, tiers, total, more }: {
  sections: GenomeRoleSection[];
  /** Genes in each evidence tier over the whole hub, for the evidence pills. */
  tiers: Partial<Record<EvidenceTier, number>>;
  /** Every graded gene. */
  total: number;
  more?: MoreRows;
}) {
  /** The whole file once fetched; `failed` when it could not be. */
  const [full, setFull] = useState<GenomeGene[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [wanted, setWanted] = useState(false);
  const [shown, setShown] = useState<Partial<Record<TargetRole, number>>>({});
  const [role, setRole] = useState<TargetRole | null>(null);
  const [tier, setTier] = useState<EvidenceTier | null>(null);
  const src = more?.src;
  const loading = !!src && wanted && !full && !failed;

  useEffect(() => {
    if (!loading || !src) return;
    let stale = false;
    void loadTableFile<GenomeGene>(src).then((list) => { if (stale) return; if (list) setFull(list); else setFailed(true); });
    return () => { stale = true; };
  }, [loading, src]);

  // A filter the first page alone cannot answer fetches the whole set.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const p = new URLSearchParams(window.location.search);
      const r = parseRole(p.get("role"));
      const t = parseTier(p.get("evidence"));
      if (r) setRole(r);
      if (t) setTier(t);
      if (r || t) setWanted(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const pick = useCallback((r: TargetRole | null, t: EvidenceTier | null) => {
    setRole(r); setTier(t);
    setShown({});
    if (r || t) setWanted(true);
    const url = new URL(window.location.href);
    if (r) url.searchParams.set("role", r); else url.searchParams.delete("role");
    if (t) url.searchParams.set("evidence", t); else url.searchParams.delete("evidence");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }, []);

  const load = (r: TargetRole) => { setWanted(true); setShown((s) => ({ ...s, [r]: (s[r] ?? TABLE_PAGE) + TABLE_PAGE })); };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Role">
        <Pill href={genomeHref(null, tier)} on={!role} glyph="all" label="All roles" count={total} pick={() => pick(null, tier)} />
        {sections.map((s) => <Pill key={s.role} href={genomeHref(s.role, tier)} on={role === s.role} glyph={s.role} label={TARGET_ROLE_LABEL[s.role]} count={full ? genesFor(full, s.role, null).length : s.total} pick={() => pick(role === s.role ? null : s.role, tier)} />)}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2" role="group" aria-label="Evidence">
        <Pill href={genomeHref(role, null)} on={!tier} glyph="all" label="All evidence" count={total} pick={() => pick(role, null)} />
        {EVIDENCE_TIERS.filter((t) => tiers[t]).map((t) => <Pill key={t} href={genomeHref(role, t)} on={tier === t} glyph={t} label={EVIDENCE_TIER_LABEL[t]} count={tiers[t] ?? 0} pick={() => pick(role, tier === t ? null : t)} />)}
      </div>
      {tier && <p className="mt-2 text-sm text-muted max-w-3xl">{EVIDENCE_TIER_LABEL[tier]}: {TIER_BLURB[tier]}</p>}
      {sections.filter((s) => !role || s.role === role).map((s) => {
        // The first page alone answers "no filter"; a tier filter over the first page is a stopgap until the file is here.
        const list = full ? genesFor(full, s.role, tier) : tier ? s.genes.filter((g) => g.tier === tier) : s.genes;
        const known = full ? list.length : tier ? (s.tiers[tier] ?? 0) : s.total;
        const visible = list.slice(0, shown[s.role] ?? TABLE_PAGE);
        const remaining = known - visible.length;
        return (
          <section key={s.role} className="mt-10 scroll-mt-28" id={s.role}>
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
              <h2 className="text-lg font-semibold tracking-tight inline-flex items-center gap-2">
                <Glyph name={s.role} className="h-5 w-5 text-accent" />
                {TARGET_ROLE_LABEL[s.role]} <span className="text-muted font-normal tabular-nums">{n(known)}{tier ? <span className="text-sm"> of {n(s.total)}</span> : null}</span>
              </h2>
              <Link href={tableHref(s.role, tier)} className="text-sm underline text-muted hover:text-foreground">Open in the table →</Link>
            </div>
            <p className="text-sm text-muted mb-2 max-w-3xl">{ROLE_BLURB[s.role]}</p>
            {!tier && (
              <p className="text-xs text-muted mb-3 flex flex-wrap gap-x-3 gap-y-1">
                {EVIDENCE_TIERS.filter((t) => s.tiers[t]).map((t) => <a key={t} href={genomeHref(s.role, t)} onClick={(e) => { e.preventDefault(); pick(s.role, t); }} className="inline-flex items-center gap-1 hover:text-accent hover:underline"><Glyph name={t} className="h-3 w-3" />{EVIDENCE_TIER_LABEL[t]} <span className="tabular-nums">{n(s.tiers[t] ?? 0)}</span></a>)}
              </p>
            )}
            {visible.length ? (
              <ul className="flex flex-wrap gap-1.5 notranslate" translate="no">
                {visible.map((g) => <li key={g.id}><Link href={g.href} prefetch={false} title={g.tldr} className="chip border bg-card border-border hover:bg-foreground/5 text-xs font-mono">{g.symbol}</Link></li>)}
              </ul>
            ) : known === 0 ? <p className="text-sm text-muted">No {TARGET_ROLE_LABEL[s.role].toLowerCase()} gene sits in this tier.</p> : null}
            {remaining > 0 && !failed && <Foot total={known} shown={visible.length} load={() => load(s.role)} loading={loading} />}
            {failed && remaining > 0 && <p className="text-xs text-muted mt-2">Only the first {n(visible.length)} of {n(known)} genes could be shown: the full list did not load. Check your connection and reload.</p>}
          </section>
        );
      })}
    </div>
  );
}
