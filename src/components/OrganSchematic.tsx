import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { matchedSubtypes, organFor, organMesh, type OrganSchematic as Organ } from "@/data/organ-schematics";
import { Wireframe3D } from "./Wireframe3D";

/**
 * Wireframe organ schematic for a cancer: the organ, its subsites (hot rings) and the regional node
 * stations (accent clusters), with a legend that links each subsite to the cancer's recorded subtypes.
 * Compact mode is a bare thumbnail for the atlas grid. Renders nothing for cancers without an organ drawing.
 */
export function OrganSchematic({ cancerId, organ, compact = false, height }: { cancerId?: string; organ?: Organ; compact?: boolean; height?: string }) {
  const o = organ ?? (cancerId ? organFor(cancerId) : undefined);
  if (!o) return null;
  const mesh = organMesh(o);
  if (compact) return <Wireframe3D mesh={mesh} height={height ?? "h-40"} speed={0.2} compact />;
  const g = graph();
  const cancer = cancerId ? g.get(cancerId) : undefined;
  const subtypes = cancer && cancer.kind === "cancer" ? cancer.subtypes : [];
  const others = o.cancers.filter((id) => id !== cancerId).map((id) => g.get(id)).filter((c): c is NonNullable<typeof c> => !!c);
  return (
    <div className="card overflow-hidden">
      <Wireframe3D mesh={mesh} height={height ?? "h-72 sm:h-[24rem]"} speed={0.16} />
      <div className="px-4 py-3 border-t border-border text-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div><span className="font-medium">{o.name}: subsites and node stations</span><span className="text-muted"> · wireframe schematic, not to scale</span></div>
          <Link href={`/atlas/organs/#${o.id}`} className="text-xs underline text-muted">Organ atlas →</Link>
        </div>
        <p className="text-muted mt-1">{o.caption}</p>
        <div className="grid gap-4 sm:grid-cols-2 mt-3">
          <div>
            <div className="kicker mb-1">Subsites</div>
            <ul className="space-y-1">
              {o.subsites.map((s) => {
                const hits = matchedSubtypes(s, subtypes);
                return (
                  <li key={s.id} className="flex flex-wrap items-baseline gap-x-2">
                    <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2 w-2 rounded-full bg-[#b45309] dark:bg-[#fbbf24]" aria-hidden />{s.label}</span>
                    {hits.length > 0 && <span className="text-xs text-muted">{hits.join(" · ")}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <div className="kicker mb-1">Regional lymph nodes</div>
            {o.nodes.length ? <ul className="space-y-1">{o.nodes.map((n) => <li key={n.label} className="inline-flex items-center gap-1.5 mr-3"><span className="inline-block h-2 w-2 rounded-full bg-[#c2185b] dark:bg-[#f9a8d4]" aria-hidden />{n.label}</li>)}</ul> : null}
            {o.nodeNote && <p className="text-muted text-xs mt-1">{o.nodeNote}</p>}
            {others.length > 0 && <p className="text-xs text-muted mt-3">Same organ: {others.map((c, i) => <span key={c.id}>{i > 0 && ", "}<Link href={routeFor(c)} className="underline">{c.name}</Link></span>)}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
