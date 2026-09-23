import Link from "next/link";
import { EDGE_KIND_META, edgeDateLabel, edgeHref, type EdgeKind, type EdgePrecision } from "@/lib/edge-kinds";
import { EdgeGlyph } from "./EdgeGlyph";

/** What one Edge card needs: src/lib/edge.ts `EdgeItem` satisfies it, and EdgeFilter maps /edge/feed.json items to it. */
export type EdgeCardItem = {
  kind: EdgeKind; date: string; precision: EdgePrecision; title: string; sentence: string; url: string; venue?: string;
  refs: ReadonlyArray<{ id: string; kind: string; name: string; route: string }>;
};

/**
 * One Edge item, server-rendered on /edge/ and rendered again by the client filter when it reads the full feed.
 * `data-kind` and `data-refs` carry the kind and the linked record ids so the filter can show or hide the cards
 * already on the page without any payload beyond the markup. The kind pill links to the page filtered to that
 * kind (`?type=`); the filter intercepts the click (`data-edge-type`) and applies it without a reload.
 */
export function EdgeCard({ it }: { it: EdgeCardItem }) {
  const meta = EDGE_KIND_META[it.kind];
  return (
    <li data-kind={it.kind} data-refs={it.refs.map((r) => r.id).join(" ")} className="card p-4">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
        <Link href={edgeHref({ types: [it.kind] })} data-edge-type={it.kind} className={`chip ${meta.tone}`} title={`Show only ${meta.plural.toLowerCase()}`}><EdgeGlyph kind={it.kind} className="h-3.5 w-3.5" symbol /><span>{meta.label}</span></Link>
        <time dateTime={it.date} title={it.precision === "day" ? undefined : `The source gives the ${it.precision} only`}>{edgeDateLabel(it)}</time>
        {it.venue && <span>· {it.venue}</span>}
      </div>
      <h3 className="mt-1.5 font-medium leading-snug">
        <a href={it.url} target="_blank" rel="noopener noreferrer" className="hover:underline" title="Open the source in a new tab">{it.title}</a>
      </h3>
      <p className="mt-1 text-sm text-muted leading-relaxed">{it.sentence}</p>
      {it.refs.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {it.refs.map((r) => <Link key={r.id} href={r.route} className="chip border bg-card border-border hover:bg-foreground/5 text-[11px]" title={`${r.kind} record on OnCo`}>{r.name}</Link>)}
        </div>
      )}
    </li>
  );
}
