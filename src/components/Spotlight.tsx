"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { KIND_META } from "@/lib/kinds";
import { KIND_COLOR } from "@/lib/text";
import { KindIcon } from "@/components/KindIcon";
import {
  SPOTLIGHT_URL, parseSpotlightQuery, spotlightHref, spotlightKindFor, spotlightKindLabel, spotlightNeighbours,
  type SpotlightFile, type SpotlightKind, type SpotlightSet,
} from "@/lib/spotlight-schedule";

/**
 * The home page spotlight: one hero record of one kind, rotating daily (src/lib/spotlight-schedule.ts).
 *
 * The server renders the build day's set (`embedded`), so the exported HTML is complete for readers without
 * JavaScript and for crawlers. After mount the component works out the reader's kind (their local date, or
 * `?spotlight=<kind>`) and, when it differs, fetches /api/v1/spotlight.json once and swaps the set in. Nothing moves
 * while it does: the title is one clipped line, the TL;DR, the three facts and the pill row all have fixed heights
 * (`lh` units, line clamps, an overflow-hidden pill row), and the skeleton shown during the fetch uses the same
 * boxes. The fade on arrival is a CSS transition, which globals.css turns off under prefers-reduced-motion.
 */

let filePromise: Promise<SpotlightFile | null> | null = null;
function loadSpotlightFile(): Promise<SpotlightFile | null> {
  filePromise ??= fetch(SPOTLIGHT_URL).then(async (r) => (r.ok ? ((await r.json()) as SpotlightFile) : null)).catch(() => null);
  return filePromise;
}
/** Test seam. */
export function resetSpotlightCache() { filePromise = null; }

const KIND_CHIP = "chip border";
const NAV_CHIP = "chip border border-border bg-card text-foreground/80 hover:bg-surface hover:text-foreground";

function KindPill({ kind, className = KIND_CHIP, title, prefix, suffix, href, onPick }: { kind: SpotlightKind; className?: string; title: string; prefix?: string; suffix?: string; href: string; onPick?: (k: SpotlightKind) => void }) {
  const body = <>{prefix && <span aria-hidden>{prefix}</span>}<KindIcon kind={kind} className="h-3 w-3" /><span className="capitalize">{spotlightKindLabel(kind)}</span>{suffix && <span aria-hidden>{suffix}</span>}</>;
  return (
    <Link href={href} className={`${className} ${className === KIND_CHIP ? KIND_COLOR[kind] : ""}`} title={title} data-spotlight-kind={kind}
      onClick={onPick ? (e) => { e.preventDefault(); window.history.replaceState(window.history.state, "", href); onPick(kind); } : undefined}>
      {body}
    </Link>
  );
}

function Body({ set }: { set: SpotlightSet }) {
  const { hero } = set;
  return (
    <>
      <p className="text-[15px] sm:text-base leading-relaxed max-w-3xl line-clamp-3 h-[3lh]">{hero.tldr}</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-3 text-sm">
        {hero.facts.map((f) => (
          <div key={f.kicker} className="min-w-0"><div className="kicker mb-1.5 truncate">{f.kicker}</div><p className="text-muted leading-relaxed line-clamp-4 h-[4lh]">{f.text}</p></div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-border">
        <div className="kicker mb-2">Connected</div>
        <div className="flex flex-wrap content-start gap-1.5 h-[3.1rem] overflow-hidden">
          {hero.pills.map((p) => (
            <Link key={p.id} href={p.route} className={`${KIND_CHIP} ${KIND_COLOR[p.kind]}`} title={`${KIND_META[p.kind].label}: ${p.name}`}><KindIcon kind={p.kind} className="h-3 w-3" /><span>{p.name}</span></Link>
          ))}
        </div>
      </div>
    </>
  );
}

/** The same boxes as Body, empty, so the card keeps its height while the day's set is fetched. */
function Skeleton() {
  const bar = "rounded-md bg-surface animate-pulse motion-reduce:animate-none";
  return (
    <div aria-hidden>
      <div className={`${bar} text-[15px] sm:text-base leading-relaxed max-w-3xl h-[3lh]`} />
      <div className="mt-5 grid gap-5 sm:grid-cols-3 text-sm">
        {[0, 1, 2].map((i) => <div key={i}><div className={`${bar} kicker mb-1.5 h-[1lh] w-24`} /><div className={`${bar} leading-relaxed h-[4lh]`} /></div>)}
      </div>
      <div className="mt-5 pt-4 border-t border-border">
        <div className="kicker mb-2">Connected</div>
        <div className={`${bar} h-[3.1rem]`} />
      </div>
    </div>
  );
}

export function Spotlight({ embedded }: { embedded: SpotlightSet }) {
  const [set, setSet] = useState<SpotlightSet>(embedded);
  const [today, setToday] = useState<SpotlightKind | null>(null);
  const [wanted, setWanted] = useState<SpotlightKind>(embedded.kind);
  const [shown, setShown] = useState(true);
  const loading = wanted !== set.kind;

  // The reader's kind: their local date, or the ?spotlight= override; re-read when they go back or forward.
  useEffect(() => {
    const fromUrl = () => {
      const t = spotlightKindFor(new Date());
      setToday(t);
      setWanted(parseSpotlightQuery(window.location.search) ?? t);
    };
    fromUrl();
    window.addEventListener("popstate", fromUrl);
    return () => window.removeEventListener("popstate", fromUrl);
  }, []);

  // Swap the set when the wanted kind differs: the embedded one needs no fetch, the rest come from the JSON.
  useEffect(() => {
    if (!loading) return;
    let cancelled = false;
    const source = wanted === embedded.kind ? Promise.resolve(embedded) : loadSpotlightFile().then((f) => f?.sets[wanted] ?? null);
    void source.then((next) => {
      if (cancelled) return;
      if (!next) { setWanted(set.kind); return; }
      setSet(next);
      setShown(false);
      window.requestAnimationFrame(() => { if (!cancelled) setShown(true); });
    });
    return () => { cancelled = true; };
  }, [loading, wanted, embedded, set.kind]);

  const { hero } = set;
  const { prev, next } = spotlightNeighbours(set.kind);
  const overridden = today !== null && set.kind !== today;
  const singular = KIND_META[set.kind].label.toLowerCase();

  return (
    <section aria-labelledby="spotlight-title" aria-busy={loading || undefined} data-spotlight={set.kind}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mb-5">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2">
            <span className="kicker">{overridden ? "Kind" : "Today's kind"}:</span>
            <Link href={`/${KIND_META[set.kind].route}/`} className={`${KIND_CHIP} ${KIND_COLOR[set.kind]}`} title={`${KIND_META[set.kind].blurb} Browse all ${KIND_META[set.kind].plural}.`}><KindIcon kind={set.kind} className="h-3 w-3" /><span className="capitalize">{spotlightKindLabel(set.kind)}</span></Link>
            <span className="text-muted text-xs" aria-hidden>·</span>
            <KindPill kind={prev} className={NAV_CHIP} prefix="←" title="Previous kind in the rotation" href={spotlightHref(prev, today)} onPick={setWanted} />
            <KindPill kind={next} className={NAV_CHIP} suffix="→" title="Next kind in the rotation" href={spotlightHref(next, today)} onPick={setWanted} />
            {overridden && today && <KindPill kind={today} className={NAV_CHIP} title="Back to today's kind" href="/" onPick={setWanted} prefix="Today:" />}
          </div>
          <h2 id="spotlight-title" className="text-2xl font-semibold tracking-tight truncate" title={hero.name}>
            Spotlight on <Link href={hero.route} className="hover:underline decoration-foreground/30 underline-offset-4">{hero.name}</Link>
          </h2>
          <p className="text-sm text-muted mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 min-h-[1.5rem]">
            <span>The most connected {singular} on the site, <span className="tabular-nums">{hero.connected.toLocaleString("en-GB")}</span> linked records. Also deep:</span>
            {set.runnersUp.map((r) => <Link key={r.id} href={r.route} className={NAV_CHIP} title={`${KIND_META[set.kind].label}: ${r.name}`}><KindIcon kind={set.kind} className="h-3 w-3" /><span>{r.name}</span></Link>)}
          </p>
        </div>
        <div className="flex items-center gap-x-4 text-sm shrink-0">
          <Link href={hero.route} className="font-medium text-foreground/80 hover:text-foreground underline decoration-foreground/25 underline-offset-[3px] hover:decoration-foreground">Full page <span aria-hidden>→</span></Link>
          <a href={SPOTLIGHT_URL} data-spotlight-export className="text-muted hover:text-foreground underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground" title="Every kind's spotlight set as JSON, with the rule and the schedule">All spotlights</a>
        </div>
      </div>
      <div className="card p-5 sm:p-6">
        {loading ? <Skeleton /> : <div className={`transition-opacity duration-300 motion-reduce:transition-none ${shown ? "opacity-100" : "opacity-0"}`}><Body set={set} /></div>}
      </div>
    </section>
  );
}
