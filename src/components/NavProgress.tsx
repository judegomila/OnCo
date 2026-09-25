"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navigationHref, navigationStart, PROGRESS_TIMEOUT_MS } from "@/lib/nav-progress";

type Stage = "idle" | "running" | "done";

/**
 * A thin pink bar across the top of the viewport while a client-side navigation is in flight (roadmap: the owner's
 * report that a record page such as TNBC opens with no sign the click was taken).
 *
 * The site is a static export, so a click on a record link fetches that page's payload (index.txt, 150 KB to 700 KB
 * on the wire) before the router can commit; on a slow connection that is several seconds with the old page still on
 * screen and no browser spinner, because nothing about the document has changed yet. The bar fills that gap:
 *
 *  - it starts on any click Next will handle as a navigation to another page of this site (src/lib/nav-progress.ts
 *    lists what is left alone: new tabs, other origins, downloads, hash links, JSON and CSV exports), and on a
 *    back or forward step to another path;
 *  - it completes when the pathname changes, that is when the new route commits, then fades; a route that never
 *    commits (a failed fetch that falls back to a full load) clears after PROGRESS_TIMEOUT_MS;
 *  - with prefers-reduced-motion, or the site's own low-motion flag (<html data-motion~="reduced">), it does not
 *    creep: it appears as a still bar and disappears when the route commits.
 *
 * No dependency; the motion is CSS (.nav-progress in globals.css) keyed on data-state. The element is decorative
 * (aria-hidden): the loading skeletons under each route (the loading.tsx files under src/app) carry the accessible status.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [stage, setStage] = useState<Stage>("idle");
  const rendered = useRef(pathname);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const clear = () => { if (timer.current !== null) { window.clearTimeout(timer.current); timer.current = null; } };
    const start = () => {
      clear();
      setStage("running");
      timer.current = window.setTimeout(() => { setStage("idle"); timer.current = null; }, PROGRESS_TIMEOUT_MS);
    };
    // Capture phase: Link's own handler (which calls preventDefault and starts the transition) runs after this, so
    // defaultPrevented here means an earlier handler, such as a tab or toggle, has already claimed the click.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      if (navigationHref(a, e, window.location)) { navigationStart.kind = "click"; start(); }
    };
    const onPop = () => { navigationStart.kind = "pop"; if (window.location.pathname !== rendered.current) start(); };
    const onHide = () => { clear(); setStage("idle"); };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    window.addEventListener("pagehide", onHide);
    return () => { clear(); document.removeEventListener("click", onClick, true); window.removeEventListener("popstate", onPop); window.removeEventListener("pagehide", onHide); };
  }, []);

  // The route committed: finish the bar, then hide it once the fade has played.
  useEffect(() => {
    if (pathname === rendered.current) return;
    rendered.current = pathname;
    if (timer.current !== null) { window.clearTimeout(timer.current); timer.current = null; }
    setStage((s) => (s === "running" ? "done" : s));
    const t = window.setTimeout(() => setStage((s) => (s === "done" ? "idle" : s)), 600);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return <div className="nav-progress" data-state={stage} aria-hidden="true" />;
}
