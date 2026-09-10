import Link from "next/link";
import type { Kind } from "@/lib/schema";
import type { SourceLocation } from "@/lib/source-location";
import { issueUrl, suggestEditUrl, entityRef, pageUrl } from "@/lib/issue-links";
import { DiscussLink } from "./DiscussLink";

type Props = { id: string; kind: Kind; name: string; fields?: string[]; source?: SourceLocation; recordJson?: string };

/**
 * Suggest an edit via a GitHub issue form, prefilled with the object and page. There is no form
 * on the site and, deliberately, no link that edits the record directly: every correction and
 * improvement enters through the issue gate so it can be safety-checked, sourced and validated
 * before a maintainer merges it. The record's read-only location goes into the issue body so the
 * maintainer can find the line; contributors who can code say so in the issue.
 */
export function SuggestEdit({ id, kind, name, source }: Props) {
  const e = { id, kind, name };
  const suggest = suggestEditUrl(e, { recordUrl: source?.url });
  const entity = `${entityRef(kind, id)} · ${name}`;
  const page = pageUrl(kind, id);
  const stale = issueUrl("stale-fact", { entity, page }, { title: `stale: ${id}` });
  const readout = kind === "trial" ? issueUrl("trial-readout", { trial: entity, page }, { title: `readout: ${id}` }) : null;
  const approval = kind === "drug" ? issueUrl("regional-approval", { product: entity, page }, { title: `approval: ${id}` }) : null;
  return (
    <div className="card p-4 text-sm">
      <div className="kicker mb-1">Wrong or missing?</div>
      <p className="text-muted">Propose a change with a source. Organisations can update their own records. Every suggestion is reviewed, safety-checked and validated before it goes live; nothing is edited directly.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <a href={suggest} rel="noopener" className="rounded-lg bg-foreground text-background px-3 py-1.5 text-xs font-medium hover:brightness-110">Suggest an edit</a>
        <DiscussLink id={id} kind={kind} name={name} className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-foreground/5" />
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
        <li><a className="underline" href={stale} rel="noopener" title="Something here has been overtaken by events">Out of date?</a></li>
        {readout && <li><a className="underline" href={readout} rel="noopener" title="This trial has reported or been updated">Report a readout</a></li>}
        {approval && <li><a className="underline" href={approval} rel="noopener" title="Approved, filed, or withdrawn in another region">Report an approval</a></li>}
        <li><Link className="underline" href="/suggest/">How review works</Link></li>
      </ul>
    </div>
  );
}
