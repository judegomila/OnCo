"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useProfile } from "@/lib/profile";
import { SYSTEM_ORDER, type LateEffect, type OrganSystem } from "@/data/survivorship";
import { FacetSelect } from "./filters/FacetSelect";
import { PrintButton } from "./PrintButton";

export type TreatmentOption = { id: string; name: string; kind: "drug" | "technology"; modality?: string; route: string };
export type PlanEntry = {
  id: string; label: string; plain: string; manualPick: boolean;
  matchDrugIds: string[]; matchModalityRe?: string; matchTechnologyIds: string[];
  links: Array<{ id: string; name: string; route: string }>;
  lateEffects: LateEffect[];
};

const today = () => new Date().toISOString().slice(0, 10);

/**
 * Personal late-effects plan. Treatments come from the browser profile's "already tried" list and from
 * manual picks; radiotherapy fields are picked directly because a technology id does not say where the
 * beam went. Output is grouped by organ system and prints as one page.
 */
export function SurvivorshipPlan({ entries, options }: { entries: PlanEntry[]; options: TreatmentOption[] }) {
  const [profile, , ready] = useProfile();
  const [picked, setPicked] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [seeded, setSeeded] = useState(false);

  // Preselect once from the profile's prior lines (only those we can say something about).
  useEffect(() => {
    if (!ready || seeded) return;
    const id = requestAnimationFrame(() => {
      const known = new Set(options.map((o) => o.id));
      setPicked(profile.priorLines.filter((x) => known.has(x)));
      setSeeded(true);
    });
    return () => cancelAnimationFrame(id);
  }, [ready, seeded, profile.priorLines, options]);

  const byId = useMemo(() => new Map(options.map((o) => [o.id, o])), [options]);
  const matches = (t: TreatmentOption) => entries.filter((e) => e.matchDrugIds.includes(t.id) || e.matchTechnologyIds.includes(t.id) || (!!t.modality && !!e.matchModalityRe && new RegExp(e.matchModalityRe, "i").test(t.modality)));

  const treatments = picked.map((id) => byId.get(id)).filter((x): x is TreatmentOption => !!x);
  const active = useMemo(() => {
    const m = new Map<string, { entry: PlanEntry; because: string[] }>();
    for (const t of treatments) for (const e of matches(t)) { const cur = m.get(e.id) ?? { entry: e, because: [] }; cur.because.push(t.name); m.set(e.id, cur); }
    for (const id of classes) { const e = entries.find((x) => x.id === id); if (e && !m.has(id)) m.set(id, { entry: e, because: ["added by you"] }); }
    return [...m.values()];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked, classes, entries, options]);

  // Rows grouped by organ system, de-duplicated on effect text, with the treatment class that raised each.
  const grouped = useMemo(() => {
    const out = new Map<OrganSystem, Array<LateEffect & { from: string }>>();
    for (const { entry } of active) for (const le of entry.lateEffects) {
      const list = out.get(le.system) ?? [];
      if (!list.some((x) => x.effect === le.effect && x.screening === le.screening)) list.push({ ...le, from: entry.label });
      out.set(le.system, list);
    }
    return SYSTEM_ORDER.filter((s) => out.has(s)).map((s) => [s, out.get(s)!] as const);
  }, [active]);

  const anyRadiotherapyPicked = treatments.some((t) => /radiother|irradiation|brachy|sbrt|imrt|proton/i.test(`${t.id} ${t.name}`)) || profile.priorLines.some((x) => /radiother|irradiation|brachy|sbrt|imrt|proton/i.test(x));
  const fieldEntries = entries.filter((e) => e.manualPick);
  const otherClasses = entries.filter((e) => !e.manualPick);
  const totalRows = grouped.reduce((n, [, rows]) => n + rows.length, 0);

  return (
    <div className="space-y-6">
      <div className="no-print card p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <FacetSelect label="Treatments received" options={options.map((o) => ({ value: o.id, label: o.name, group: o.kind === "drug" ? "Products" : "Technologies" }))} value={picked} onChange={(v) => setPicked(v as string[])} multi allLabel="Choose" placeholder="Search treatments…" width="w-80" />
          <FacetSelect label="Area irradiated" options={fieldEntries.map((e) => ({ value: e.id, label: e.label.replace(/^Radiotherapy to the /, "").replace(/\s*\(.*\)$/, "") }))} value={classes.filter((c) => fieldEntries.some((e) => e.id === c))} onChange={(v) => setClasses([...(v as string[]), ...classes.filter((c) => !fieldEntries.some((e) => e.id === c))])} multi searchable={false} allLabel="None" width="w-64" />
          <FacetSelect label="Add a treatment class" options={otherClasses.map((e) => ({ value: e.id, label: e.label }))} value={classes.filter((c) => otherClasses.some((e) => e.id === c))} onChange={(v) => setClasses([...(v as string[]), ...classes.filter((c) => !otherClasses.some((e) => e.id === c))])} multi allLabel="None" width="w-72" />
          {(picked.length > 0 || classes.length > 0) && <button type="button" onClick={() => { setPicked([]); setClasses([]); }} className="text-sm underline text-muted">Clear</button>}
          <span className="ml-auto text-sm text-muted tabular-nums">{totalRows} thing{totalRows === 1 ? "" : "s"} to watch</span>
        </div>
        {anyRadiotherapyPicked && !classes.some((c) => fieldEntries.some((e) => e.id === c)) && (
          <p className="text-sm text-amber-800 dark:text-amber-300">Radiotherapy is in your list. Its late effects depend on where the beam went: choose the area irradiated above.</p>
        )}
        <p className="text-[11px] text-muted">Treatments already recorded in your browser profile are preselected. Nothing you choose here leaves your device or is saved beyond this page.</p>
      </div>

      {active.length === 0 && (
        <div className="card p-8 text-center">
          <div className="text-lg font-medium">Choose the treatments you have had.</div>
          <p className="text-muted mt-1">Products, technologies such as CAR-T or transplant, and the areas that were irradiated. Or set &ldquo;Already tried&rdquo; in the <Link href="/navigator/" className="underline">navigator</Link> and come back.</p>
        </div>
      )}

      {active.length > 0 && (
        <article aria-label="Your late-effects plan">
          <div className="no-print flex flex-wrap items-center gap-3 mb-3 text-sm"><PrintButton /><span className="text-xs text-muted">Prints as one list, grouped by organ system, with sources.</span></div>
          <div className="card p-5 print:border-0 print:p-0">
            <div className="kicker">Late effects to watch for</div>
            <h2 className="text-xl font-semibold mt-0.5">My survivorship plan</h2>
            <p className="text-xs text-muted mt-1">Prepared {today()} with OnCo (onco.cc). Orientation, not medical advice. Take this to your GP or survivorship clinic; a care plan from your treating team, with your doses and dates, takes precedence.</p>

            <div className="mt-4">
              <div className="kicker mb-1">Based on</div>
              <ul className="text-sm space-y-1">
                {active.map(({ entry, because }) => (
                  <li key={entry.id}>
                    <span className="font-medium">{entry.label}</span>
                    <span className="text-muted"> ({because.join(", ")})</span>
                    <span className="block text-xs text-muted">{entry.plain}{entry.links.length > 0 && <span className="print:hidden"> Pages: {entry.links.map((l, i) => <span key={l.id}>{i > 0 && ", "}<Link href={l.route} className="underline">{l.name}</Link></span>)}.</span>}</span>
                  </li>
                ))}
              </ul>
            </div>

            {grouped.map(([system, rows]) => (
              <section key={system} className="mt-5">
                <h3 className="font-semibold text-[15px] border-b border-border pb-1 mb-2">{system}</h3>
                <div className="overflow-x-auto">
                  <table className="onco text-sm">
                    <thead><tr><th>Watch for</th><th>Test or check</th><th>How often</th><th>Source</th></tr></thead>
                    <tbody>
                      {rows.map((r, i) => (
                        <tr key={`${r.effect}-${i}`}>
                          <td className="min-w-[180px]"><div className="font-medium">{r.effect}</div><div className="text-xs text-muted">{r.from}</div>{r.note && <div className="text-xs mt-1">{r.note}</div>}</td>
                          <td className="min-w-[200px]">{r.screening}</td>
                          <td className="min-w-[160px]">{r.interval}</td>
                          <td className="text-xs"><a href={r.source.url} rel="noopener" className="underline">{r.source.label}</a></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}

            <div className="mt-5 text-xs text-muted">
              <div className="kicker mb-1">Sources used</div>
              <ul className="space-y-0.5">
                {[...new Map(grouped.flatMap(([, rows]) => rows.map((r) => [r.source.url, r.source] as const))).values()].map((s) => <li key={s.url}><a href={s.url} rel="noopener" className="underline">{s.label}</a></li>)}
              </ul>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
