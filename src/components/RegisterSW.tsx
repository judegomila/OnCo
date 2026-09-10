"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Registers the service worker (public/sw.js) in production builds and shows two small banners: one when the
 * browser goes offline, one when a new version of the site has been installed and is waiting. Mount once in the
 * root layout. Nothing is registered in development so hot reload keeps working.
 */
export function RegisterSW() {
  const [offline, setOffline] = useState(false);
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOffline(!navigator.onLine));
    const on = () => setOffline(false), off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);

    let reloading = false;
    const onController = () => { if (!reloading) { reloading = true; window.location.reload(); } };
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).then((reg) => {
        if (reg.waiting && navigator.serviceWorker.controller) setWaiting(reg.waiting);
        reg.addEventListener("updatefound", () => {
          const w = reg.installing;
          w?.addEventListener("statechange", () => { if (w.state === "installed" && navigator.serviceWorker.controller) setWaiting(w); });
        });
      }).catch(() => { /* unsupported or blocked: the site works without it */ });
      navigator.serviceWorker.addEventListener("controllerchange", onController);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
      if ("serviceWorker" in navigator) navigator.serviceWorker.removeEventListener("controllerchange", onController);
    };
  }, []);

  if (!offline && !waiting) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] flex justify-center p-3 pointer-events-none no-print">
      <div className="pointer-events-auto card shadow-pop px-4 py-2.5 text-sm flex flex-wrap items-center gap-3 max-w-xl" role="status" aria-live="polite">
        {offline ? (
          <>
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-amber-500" />
            <span>You are offline. Pages you have already opened still work, and search runs from the cached index. <Link href="/offline/" className="underline">What is available</Link></span>
          </>
        ) : (
          <>
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span>A new version of OnCo is ready.</span>
            <button type="button" onClick={() => waiting?.postMessage({ type: "SKIP_WAITING" })} className="rounded-md bg-foreground text-background px-2.5 py-1 text-xs font-medium hover:brightness-110">Reload</button>
            <button type="button" onClick={() => setWaiting(null)} className="text-xs text-muted underline">Later</button>
          </>
        )}
      </div>
    </div>
  );
}

/** The pages this browser has cached for offline reading, newest first. Used on /offline/. */
export function CachedPages() {
  const [pages, setPages] = useState<string[] | null>(null);
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    const raf = requestAnimationFrame(async () => {
      if (!("caches" in window)) { setSupported(false); setPages([]); return; }
      try {
        const names = (await caches.keys()).filter((k) => k.endsWith("-pages") || k.endsWith("-shell"));
        const urls = new Set<string>();
        for (const n of names) for (const req of await (await caches.open(n)).keys()) { const u = new URL(req.url); if (u.origin === location.origin && !u.pathname.startsWith("/_next/") && !u.pathname.endsWith(".webmanifest")) urls.add(u.pathname); }
        setPages([...urls].reverse());
      } catch { setPages([]); }
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  if (pages === null) return <p className="text-sm text-muted">Checking this browser&apos;s cache…</p>;
  if (!supported) return <p className="text-sm text-muted">This browser does not support offline caching.</p>;
  if (!pages.length) return <p className="text-sm text-muted">No pages cached yet. Pages are stored as you visit them (in production builds), up to a few hundred, and the search index is kept so search keeps working.</p>;
  return (
    <ul className="grid gap-1.5 sm:grid-cols-2 text-sm">
      {pages.map((p) => <li key={p}><Link href={p} className="underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground break-all">{p}</Link></li>)}
    </ul>
  );
}
