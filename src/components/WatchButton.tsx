"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchEntityDates, isWatched, markSeen, unwatch, watch } from "@/lib/watchlist";
import { useT } from "@/lib/i18n/ui";

/**
 * Star an object to watch it. The watchlist lives in localStorage; /saved/ shows what changed since you last
 * looked by comparing the record's `asOf` and provenance dates with the ones stored here. Visiting a watched
 * page marks it as seen. `asOf` and `route` are optional: when absent they are read from the entity JSON and
 * the current URL, so the button works wherever it is mounted.
 */
export function WatchButton({ id, kind, name, route, asOf, className = "" }: { id: string; kind: string; name: string; route?: string; asOf?: string; className?: string }) {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const { t } = useT();

  useEffect(() => {
    const raf = requestAnimationFrame(async () => {
      const watched = isWatched(id);
      setOn(watched); setReady(true);
      if (watched) { const dates = await fetchEntityDates(id); markSeen(id, dates ?? { asOf }); }
    });
    const onChange = () => setOn(isWatched(id));
    window.addEventListener("onco:watchlist", onChange);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("onco:watchlist", onChange); };
  }, [id, asOf]);

  const toggle = async () => {
    if (on) { unwatch(id); return; }
    setBusy(true);
    const dates = asOf ? { asOf, edited: undefined as string | undefined } : await fetchEntityDates(id);
    watch({ id, kind, name, route: route ?? window.location.pathname, asOf: dates?.asOf ?? asOf, edited: dates?.edited });
    setBusy(false);
  };

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <button type="button" onClick={toggle} disabled={busy || !ready} aria-pressed={on}
        title={on ? t("watch.titleOn") : t("watch.title")}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition-colors ${on ? "border-accent bg-accent-soft text-accent" : "border-border bg-card hover:bg-surface"}`}>
        <span aria-hidden>{on ? "★" : "☆"}</span>
        <span>{on ? t("watch.watching") : t("watch.watch")}</span>
      </button>
      {on && <Link href="/saved/" className="text-xs text-muted underline hover:text-foreground">{t("watch.saved")}</Link>}
    </span>
  );
}
