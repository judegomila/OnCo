import { KIND_META, type Kind } from "@/lib/kinds";
import { KindIcon } from "./KindIcon";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Header of one kind group in a search dropdown: the kind's glyph and its public name ("Cancers", "Treatments & tests",
 * "Pages"). A presentation row, so listbox keyboard navigation skips it. The page glyph is drawn inline rather than
 * taken from NavIcon, which would pull the route and front icon sets into the root layout's bundle.
 */
export function KindGroupHeader({ kind, label }: { kind: string; label?: string }) {
  const meta = kind === "page" ? null : KIND_META[kind as Kind];
  const name = label ?? (meta ? cap(meta.title ?? meta.plural) : "Pages");
  return (
    <li role="presentation" className="kicker flex items-center gap-1.5 px-4 pt-2 pb-0.5 text-[10px]">
      <span className="text-accent">
        {meta ? <KindIcon kind={kind as Kind} className="h-3 w-3" /> : (
          <svg viewBox="0 0 24 24" aria-hidden focusable="false" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h8l4 4v14H6V3ZM14 3v4h4M9 12h6M9 16h4" /></svg>
        )}
      </span>
      {name}
    </li>
  );
}
