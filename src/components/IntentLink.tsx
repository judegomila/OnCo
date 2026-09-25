"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";

/**
 * A link that prefetches its page on intent (hover, focus, touch) rather than on entering the viewport.
 *
 * In the static export every route is static, so Next's default prefetch fetches the whole destination payload
 * for each <Link> that scrolls into view (the route tree, then the page segment: 150 KB to 700 KB on the wire for
 * a record). A record page lists hundreds of records (Related pages alone is a third of the TNBC markup), so the
 * default would spend megabytes on pages the reader never opens and, on a slow line, compete with the page they
 * are reading. `prefetch={false}` until the pointer or focus arrives, then Next's default (`null`) so the payload
 * is warming during the few hundred milliseconds before the click. Use it for the dense lists (chips, cards, rows,
 * quick links); the header, breadcrumbs and a page's few primary links keep the default viewport prefetch.
 */
export function IntentLink({ onMouseEnter, onFocus, onTouchStart, ...props }: ComponentProps<typeof Link>) {
  const [active, setActive] = useState(false);
  return (
    <Link
      {...props}
      prefetch={active ? null : false}
      onMouseEnter={(e) => { setActive(true); onMouseEnter?.(e); }}
      onFocus={(e) => { setActive(true); onFocus?.(e); }}
      onTouchStart={(e) => { setActive(true); onTouchStart?.(e); }}
    />
  );
}
