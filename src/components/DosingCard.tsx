import type { Drug } from "@/lib/schema";

/** Dosing, schedule, modifications, and monitoring from the label. */
export function DosingCard({ drug }: { drug: Drug }) {
  const d = drug.dosing;
  if (!d) return null;
  const rows: Array<[string, string | undefined]> = [["Route", d.route], ["Schedule", d.schedule], ["Dose modifications", d.modifications], ["Monitoring", d.monitoring]];
  return (
    <div className="card p-4">
      <div className="kicker mb-2">Dosing & schedule</div>
      <dl className="grid gap-3 sm:grid-cols-[160px_1fr] text-[15px]">
        {rows.filter(([, v]) => v).map(([k, v]) => (
          <div key={k} className="contents"><dt className="text-muted text-sm">{k}</dt><dd className="leading-relaxed">{v}</dd></div>
        ))}
      </dl>
      {d.source && <p className="text-xs text-muted mt-3">Source: <a className="underline break-all" href={d.source} rel="noopener">{d.source.includes("dailymed") ? "US prescribing information (DailyMed)" : d.source.replace(/^https?:\/\//, "")}</a>. Doses are for orientation; the current label governs.</p>}
    </div>
  );
}
