"use client";

import { useEffect, useRef } from "react";

/**
 * Shown the first time a signed-out reader presses Watch in a visit: the star has been saved in this browser,
 * and an account would keep it across devices and send updates. Two ways out: sign in (a link to me.onco.cc,
 * which records the item and comes back here) or Not now, remembered for this visit only.
 */
export function SaveToAccountModal({ name, href, onClose }: { name: string; href: string; onClose: () => void }) {
  const first = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="save-to-account-title" className="card max-w-md w-full p-5 space-y-3 shadow-pop">
        <h2 id="save-to-account-title" className="text-lg font-semibold">Watching {name} in this browser</h2>
        <p className="text-sm text-muted">Keep it on a free account and it follows you to every device, sits with your own context on me.onco.cc, and can email you when something changes here. onco.cc itself stores nothing about you.</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <a ref={first} href={href} className="ctl btn-primary px-3 text-sm font-medium">Sign in or create an account</a>
          <button type="button" onClick={onClose} className="ctl px-3 text-sm">Not now</button>
        </div>
        <p className="text-[11px] text-muted">Signing in takes you to me.onco.cc and brings you straight back to this page.</p>
      </div>
    </div>
  );
}
