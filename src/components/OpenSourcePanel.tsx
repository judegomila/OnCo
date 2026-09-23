import Link from "next/link";
import type { OpenSourceProject } from "@/lib/schema";
import { CATEGORY_META, OPENNESS_META, openSourceForCollection, openSourceForMaintainer, openSourceForTechnology, openSourceLink } from "@/lib/open-source";

/**
 * "Open-source projects": records from src/data/open-source.ts that implement this technology, are the code behind
 * this collection, or are maintained by this institution or company. Each card names the project, OnCo's one-line
 * summary, licence and openness pills with tooltips, stars and last push, and links to the repository. Renders
 * nothing when no record matches. Server component.
 */
export function OpenSourcePanel({ id, name, kind, limit = 8 }: { id: string; name: string; kind: "technology" | "collection" | "institution" | "company"; limit?: number }) {
  const all = kind === "technology" ? openSourceForTechnology(id) : kind === "collection" ? openSourceForCollection(id) : openSourceForMaintainer(id);
  if (!all.length) return null;
  const shown = all.slice(0, limit);
  const noun = kind === "technology" ? "implement or serve this technology" : kind === "collection" ? "are the code behind this collection or publish it" : "this organisation maintains";
  const more = kind === "technology" ? openSourceLink("technology", name.replace(/ \(.*\)$/, "")) : kind === "collection" ? "/open-source/" : openSourceLink("maintainer", all[0].maintainer ?? name);
  return (
    <section className="mt-10" aria-labelledby={`open-source-${id}`}>
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h2 id={`open-source-${id}`} className="text-lg font-semibold tracking-tight">Open-source projects</h2>
        <Link href="/open-source/" className="text-xs text-muted hover:underline whitespace-nowrap">All open source in oncology →</Link>
      </div>
      <p className="text-sm text-muted mb-3 max-w-3xl">Open-source projects that {noun}, from OnCo&apos;s own catalogue: licence and last activity as the repository reported them on the day of the fetch. Listing is not endorsement; check the licence before reuse and the validation before clinical use.</p>
      <OpenSourceList entries={shown} />
      {shown.length < all.length && <p className="text-xs text-muted mt-2"><Link className="underline" href={more}>{all.length - shown.length} more on the open source page →</Link></p>}
    </section>
  );
}

export function OpenSourceList({ entries }: { entries: OpenSourceProject[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {entries.map((p) => {
        const cat = CATEGORY_META[p.category];
        const open = OPENNESS_META[p.openness];
        const href = p.repo ?? p.homepage ?? p.source.url;
        return (
          <li key={p.id} id={`os-${p.id}`} className="card p-3 text-sm flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <a className="font-medium leading-snug hover:underline" href={href} rel="noopener">{p.name}</a>
              <Link href={openSourceLink("licence", p.licence)} className="chip bg-foreground/5 text-[11px]" title={p.licenceNote ? `${p.licence}: ${p.licenceNote}` : `Licence as the repository declares it: ${p.licence}`}>{p.licence}</Link>
              <Link href={openSourceLink("openness", open.label)} className="chip text-[11px] border border-accent/40 bg-accent-soft text-accent" title={p.opennessNote ? `${open.tip} ${p.opennessNote}` : open.tip}>{open.label}</Link>
              <Link href={openSourceLink("category", cat.label)} className="chip bg-foreground/5 text-[11px] inline-flex items-center gap-1" title={cat.blurb}><svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={cat.glyph} /></svg>{cat.label}</Link>
            </div>
            <p className="text-muted leading-relaxed">{p.summary}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs mt-auto text-muted">
              {p.stars !== undefined && <span title="GitHub stars on the day of the fetch">{p.stars.toLocaleString("en-GB")} stars</span>}
              {p.lastCommit && <span title="Last push to the repository">last push {p.lastCommit}</span>}
              {p.maintainer && <span title="Maintainer">{p.maintainer}</span>}
              <a className="underline" href={href} rel="noopener">{p.repo ? "Repository" : "Project page"}</a>
              {p.doi && <a className="underline" href={`https://doi.org/${p.doi}`} rel="noopener" title={`First DOI named in the README: ${p.doi}`}>Paper</a>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
