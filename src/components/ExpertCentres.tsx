import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor, type Institution } from "@/lib/schema";
import { Logo } from "./Logo";

/**
 * Institutions that matter for one cancer: those linked to the cancer directly, plus those
 * linked to its pipeline items and trials. Server component.
 */
export function ExpertCentres({ cancerId }: { cancerId: string }) {
  const g = graph();
  const cancer = g.must(cancerId);
  if (cancer.kind !== "cancer") return null;

  const found = new Map<string, { inst: Institution; via: Set<string> }>();
  const add = (inst: Institution, via: string) => {
    const cur = found.get(inst.id) ?? { inst, via: new Set<string>() };
    cur.via.add(via);
    found.set(inst.id, cur);
  };
  for (const inst of g.forCancer(cancerId).get("institution") ?? []) if (inst.kind === "institution") add(inst, "this cancer");
  const relatedIds = [...cancer.pipeline, ...cancer.trials, ...cancer.standardOfCare.flatMap((s) => s.refs), ...cancer.history.flatMap((h) => h.refs)];
  for (const id of new Set(relatedIds)) {
    const e = g.get(id);
    if (!e) continue;
    for (const inst of g.neighbours(id).get("institution") ?? []) if (inst.kind === "institution") add(inst, e.name);
  }

  const rows = [...found.values()].sort((a, b) => (a.inst.newsweekOncology2026 ?? 999) - (b.inst.newsweekOncology2026 ?? 999) || b.via.size - a.via.size || a.inst.name.localeCompare(b.inst.name));
  const cancerCommons = g.get("cancer-commons");

  return (
    <div className="card p-5">
      <div className="kicker">Where the expertise is</div>
      <h3 className="text-lg font-semibold mt-0.5 mb-3">Centres linked to this cancer in OnCo</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted">No institutions are linked to this cancer yet. The general <Link className="underline" href="/institutions/">institution ranking</Link> is the place to start.</p>
      ) : (
        <ul className="divide-y divide-border">
          {rows.map(({ inst, via }) => (
            <li key={inst.id} className="py-2.5 flex items-start gap-3">
              <Logo id={inst.id} website={inst.website} name={inst.name} size={36} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <Link href={routeFor(inst)} className="font-medium hover:underline">{inst.name}</Link>
                  <span className="text-xs text-muted">{inst.city}, {inst.country}</span>
                  {inst.newsweekOncology2026 && <span className="chip bg-foreground/5 text-[10px]">Newsweek oncology #{inst.newsweekOncology2026}</span>}
                  {inst.nci && <span className="chip bg-foreground/5 text-[10px] capitalize">NCI {inst.nci}</span>}
                </div>
                <div className="text-xs text-muted mt-0.5 line-clamp-1">via {[...via].slice(0, 4).join(", ")}{via.size > 4 ? ` +${via.size - 4}` : ""}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="text-sm text-muted mt-4 border-t border-border pt-3">
        <span className="font-medium text-foreground">Seeking a second opinion:</span> ask your oncologist for a referral to a high-volume centre; most accept records and pathology by mail or telehealth. In the US, use the NCI&apos;s <a className="underline" href="https://www.cancer.gov/research/infrastructure/cancer-centers/find" rel="noopener">Find a Cancer Center</a> tool
        {cancerCommons && <> or the nonprofit <Link className="underline" href={routeFor(cancerCommons)}>{cancerCommons.name}</Link>, which navigates options for advanced cancers at no cost</>}.
      </div>
    </div>
  );
}
