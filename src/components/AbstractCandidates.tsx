import { readPublicJson } from "@/lib/feed-meta";
import { RefChips } from "@/components/RefChips";

/** Shape written by scripts/fetch-abstracts.ts (public/digests/candidates.json). */
export type AbstractCandidate = { doi: string; url: string; title: string; issue?: string; date?: string; lba: boolean; refs: { drugs: string[]; trials: string[]; targets: string[]; cancers: string[]; technologies: string[] } };
export type AbstractsSnapshot = { fetched: string; congress: { id: string; label: string; year: number; journal: string; window: { from: string; to: string }; source: string }; total: number; considered: number; items: AbstractCandidate[]; errors: string[] };

export const readAbstracts = () => readPublicJson<AbstractsSnapshot>("digests/candidates.json");

function promoteUrl(snap: AbstractsSnapshot, a: AbstractCandidate): string {
  const refs = [...a.refs.trials, ...a.refs.drugs, ...a.refs.cancers, ...a.refs.targets].join(", ");
  const p = new URLSearchParams({
    template: "suggest-edit.yml",
    title: `edit: digests · ${snap.congress.id}-${snap.congress.year} · ${a.title.slice(0, 60)}`,
    body: `Promote this abstract to the ${snap.congress.label} ${snap.congress.year} digest (src/data/digests.ts).\n\nTitle: ${a.title}\nDOI: https://doi.org/${a.doi}\nRefs: ${refs}\n\nFinding (one or two sentences, with the numbers from the abstract):\n\n`,
  });
  return `https://github.com/judegomila/OnCo/issues/new?${p.toString()}`;
}

/** Harvested congress abstracts matched to corpus objects, with a "promote to digest" link on each. */
export function AbstractCandidates({ limit = 40, existingDigestIds = [] }: { limit?: number; existingDigestIds?: string[] }) {
  const snap = readAbstracts();
  if (!snap) return <p className="card p-4 text-sm text-muted">The abstract harvest is not part of this build yet; it appears after the next weekly refresh.</p>;
  const digestId = `${snap.congress.id}-${snap.congress.year}`;
  const hasDigest = existingDigestIds.includes(digestId);
  const items = snap.items.slice(0, limit);
  return (
    <section className="card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-1">
        <h2 className="text-lg font-semibold">Candidates for the {hasDigest ? "" : "next "}digest: {snap.congress.label} {snap.congress.year}</h2>
        <span className="text-xs text-muted">harvested {snap.fetched}</span>
      </div>
      <p className="text-sm text-muted mb-4">{snap.considered.toLocaleString()} abstracts published in {snap.congress.journal} between {snap.congress.window.from} and {snap.congress.window.to} (via <a className="underline" href={snap.congress.source} rel="noopener">Crossref</a>), of which {snap.items.length} name a product or trial in OnCo. Late-breaking abstracts first, then the most connected. {hasDigest ? <>A digest for this congress already exists; use the links to propose additions.</> : <>Each link opens a prefilled issue to promote the item into <code>src/data/digests.ts</code> with a sourced finding.</>}</p>
      {items.length === 0 ? <p className="text-sm text-muted">No matched abstracts yet; the supplement may not be published.</p> : (
        <ol className="divide-y divide-border">
          {items.map((a) => (
            <li key={a.doi} className="py-2.5 text-sm">
              <div className="flex flex-wrap items-baseline gap-2">
                {a.lba && <span className="chip bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200">LBA</span>}
                <a href={a.url} rel="noopener" className="font-medium hover:underline">{a.title}</a>
                {a.date && <span className="text-xs text-muted font-mono">{a.date}</span>}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <RefChips ids={[...a.refs.trials, ...a.refs.drugs, ...a.refs.cancers, ...a.refs.targets].slice(0, 6)} />
                <a href={promoteUrl(snap, a)} rel="noopener" className="text-xs underline text-muted">Promote to digest</a>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
