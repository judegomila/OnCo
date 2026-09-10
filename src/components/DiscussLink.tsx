import type { Kind } from "@/lib/schema";
import { discussionSearchUrl, newDiscussionUrl } from "@/lib/issue-links";
import { T } from "./T";

/**
 * Open discussion about one object. Suggested edits are issues (they change the record); open
 * questions, interpretations and "is anyone working on this" belong in a Discussions thread in the
 * "Objects" category. The link searches for an existing thread on the id; the small second link
 * starts one from the discussion form (.github/DISCUSSION_TEMPLATE/objects.yml).
 */
export function DiscussLink({ id, kind, name, className = "", showNew = true }: { id: string; kind: Kind; name: string; className?: string; showNew?: boolean }) {
  const e = { id, kind, name };
  return (
    <span className="inline-flex items-center gap-1.5">
      <a href={discussionSearchUrl(id)} rel="noopener" className={className || "underline"} title={`Find discussion threads about ${name} on GitHub`}><T k="discuss.link" /></a>
      {showNew && <a href={newDiscussionUrl(e)} rel="noopener" className="text-xs text-muted underline" title="Start a new thread about this object"><T k="discuss.new" /></a>}
    </span>
  );
}
