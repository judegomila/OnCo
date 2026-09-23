"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A wide element (matrix, table, chord) scrolls sideways inside this box instead of widening the page
 * (docs/MOBILE.md). The box fades the edge that has more to show and offers arrow buttons that scroll by most
 * of a width; both disappear when everything fits. The content itself is untouched, so its own layout, keyboard
 * order and print output stay as they were.
 *
 * `fitClass` is the class of the box while its content fits (default: the same `overflow-x-auto`). A table whose
 * header sticks to the viewport passes `overflow-x-auto lg:overflow-x-visible`: sticky needs no scrolling ancestor,
 * so the box stays visible at desktop widths until the content is measured wider than the box, and only then
 * becomes a sideways scroller with the fade and the arrows (scrollWidth reports the overflow either way).
 */
export function ScrollRow({ children, className = "", label = "Scroll sideways", fitClass = "overflow-x-auto" }: { children: ReactNode; className?: string; label?: string; fitClass?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<{ left: boolean; right: boolean }>({ left: false, right: false });

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setEdge({ left: el.scrollLeft > 2, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 2 });
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    for (const child of Array.from(el.children)) ro.observe(child);
    return () => { el.removeEventListener("scroll", measure); ro.disconnect(); };
  }, []);

  const by = (dir: 1 | -1) => { const el = box.current; if (!el) return; el.scrollBy({ left: dir * Math.max(120, el.clientWidth * 0.8), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); };
  const mask = edge.left && edge.right ? "linear-gradient(to right, transparent, #000 2.5rem, #000 calc(100% - 2.5rem), transparent)"
    : edge.right ? "linear-gradient(to right, #000 calc(100% - 2.5rem), transparent)"
    : edge.left ? "linear-gradient(to right, transparent, #000 2.5rem)" : undefined;
  const scrollable = edge.left || edge.right;

  return (
    <div className={`relative min-w-0 ${className}`} data-scroll-row data-scrollable={scrollable ? "" : undefined}>
      <div ref={box} className={scrollable ? "overflow-x-auto" : fitClass} style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}>{children}</div>
      {scrollable && (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between" aria-hidden={false}>
          <button type="button" onClick={() => by(-1)} disabled={!edge.left} aria-label={`${label}: left`} className="pointer-events-auto ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card/95 text-sm shadow-card disabled:opacity-0">‹</button>
          <button type="button" onClick={() => by(1)} disabled={!edge.right} aria-label={`${label}: right`} className="pointer-events-auto mr-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card/95 text-sm shadow-card disabled:opacity-0">›</button>
        </div>
      )}
    </div>
  );
}
