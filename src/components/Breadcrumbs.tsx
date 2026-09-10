import Link from "next/link";
import type { Crumb } from "@/lib/seo";

/**
 * Visible breadcrumb trail (Home › Kind › Name). Mirrors the BreadcrumbList JSON-LD emitted by `JsonLd`, which is
 * built from the same `Crumb[]`, so the two never disagree. The last crumb is the current page and is not a link.
 */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className={`mx-auto max-w-7xl px-4 sm:px-6 pt-5 -mb-4 text-xs text-muted ${className}`}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-x-1.5 min-w-0">
              {i > 0 && <span aria-hidden className="text-muted/70">›</span>}
              {last
                ? <Link href={c.href} aria-current="page" className="truncate max-w-[60vw] text-foreground/80 hover:text-foreground hover:underline underline-offset-2">{c.label}</Link>
                : <Link href={c.href} className="text-accent hover:underline underline-offset-2">{c.label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
