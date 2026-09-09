import Link from "next/link";
import type { SourceLocation } from "@/lib/source-location";

const REPO = "https://github.com/judegomila/OnCo";

type Props = { id: string; kind: string; name: string; fields?: string[]; source: SourceLocation; recordJson?: string };

/**
 * Suggest an edit via a GitHub issue, prefilled with the object and page. No form on the site:
 * the issue template collects the proposed change, the source, and who is proposing it.
 *
 */
export function SuggestEdit({ id, kind, name, source }: Props) {
  const page = `https://onco.cc${source.url.includes("/src/data/") ? "" : ""}`;
  const p = new URLSearchParams({
    template: "suggest-edit.yml",
    title: `edit: ${id}`,
    labels: "suggested-edit",
    entity: `${id} (${kind}) — ${name}`,
    field: "",
    proposed: "",
    source: "",
    why: `Page: ${page}${source ? ` · Record: ${source.url}` : ""}`,
  });
  const issueUrl = `${REPO}/issues/new?${p.toString()}`;
  return (
    <div className="card p-4 text-sm">
      <div className="kicker mb-1">Wrong or missing?</div>
      <p className="text-muted">Propose a change with a source. Organisations can update their own records. Every suggestion is reviewed and validated before it goes live.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <a href={issueUrl} rel="noopener" className="rounded-lg bg-foreground text-background px-3 py-1.5 text-xs font-medium hover:brightness-110">Suggest an edit on GitHub →</a>
      </div>
      <p className="mt-2 text-xs text-muted"><Link className="underline" href="/suggest/">How review works</Link></p>
    </div>
  );
}
