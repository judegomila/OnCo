"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { T } from "./T";
import { navigationStart } from "@/lib/nav-progress";
import { KIND_META, KINDS } from "@/lib/kinds";

/**
 * Loading skeletons for the route-level loading.tsx files (src/app/loading.tsx, src/app/[kind]/loading.tsx,
 * src/app/[kind]/[id]/loading.tsx, src/app/cancers/[id]/loading.tsx).
 *
 * When they show. The site is a static export, so a first visit to a page receives finished HTML and no skeleton is
 * ever streamed (loading.tsx has no effect on that request; the HTML has the whole page). They show on client-side
 * navigations: the router keeps the header and footer, swaps the main area for this fallback the moment the route
 * tree is known (at once for a link whose tree prefetch has landed, otherwise as soon as the first bytes of the page
 * payload arrive) and replaces it with the page when the payload has been read. On a fast line that is a flicker
 * or nothing at all; on a slow line it is the several seconds the old page used to stay on screen.
 *
 * Why client components. The fallback element is serialised into the payload of every page under its boundary
 * (27,000 pages for the root one). A client component costs one module reference there; the markup comes from the
 * shared bundle. Keep them free of props that vary by page.
 *
 * Shapes. The record skeleton draws the record layout (kicker chips, icon and title, TL;DR lines, the sticky tab
 * strip, three section boxes, the right-hand column) at the real sizes, so the page lands on it without a jump.
 * The motion is a slow pulse (.skel in globals.css) that prefers-reduced-motion and the site's low-motion flag
 * turn off.
 */
function Skel({ className, style }: { className: string; style?: React.CSSProperties }) {
  return <span className={`skel ${className}`} style={style} aria-hidden="true" />;
}

function Status({ children, kind }: { children: React.ReactNode; kind: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // After a click deep in a long page the skeleton would sit above the viewport and the reader would be looking at the
  // footer; bring the top into view. Not after back or forward, where the browser has restored the earlier position.
  useEffect(() => {
    const el = ref.current;
    if (!el || navigationStart.kind === "pop") return;
    if (el.getBoundingClientRect().top < 0) window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <div ref={ref} role="status" aria-busy="true" aria-live="polite" className="skeleton min-h-[70vh]" data-skeleton={kind}>
      <span className="sr-only"><T k="loading" fallback="Loading" /></span>
      {children}
    </div>
  );
}

/** Kicker, icon, title and two lede lines in the PageHeader's frame. */
function HeaderSkeleton({ icon = false, lede = 2 }: { icon?: boolean; lede?: number }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 sm:pt-10 pb-6">
      <Skel className="block h-3 w-40 mt-5 mb-4" />
      <div className="mb-2 flex items-center gap-2"><Skel className="inline-block h-5 w-20 rounded-full" /><Skel className="inline-block h-5 w-16 rounded-full" /></div>
      <div className="flex items-start gap-4">
        {icon && <Skel className="block h-16 w-16 rounded-2xl shrink-0" />}
        <div className="flex-1 min-w-0"><Skel className="block h-9 sm:h-10 w-2/3 max-w-xl" /></div>
      </div>
      {lede > 0 && <div className="mt-4 max-w-3xl space-y-2">{Array.from({ length: lede }, (_, i) => <Skel key={i} className={`block h-4 ${i === lede - 1 ? "w-3/4" : "w-full"}`} />)}</div>}
    </div>
  );
}

function Lines({ n, className = "" }: { n: number; className?: string }) {
  return <div className={`space-y-2 ${className}`}>{Array.from({ length: n }, (_, i) => <Skel key={i} className={`block h-3.5 ${i % 3 === 2 ? "w-2/3" : i % 3 === 1 ? "w-11/12" : "w-full"}`} />)}</div>;
}

const TAB_WIDTHS = [88, 132, 148, 76, 112, 120, 68];

/** A record page: header, tab strip, three sections and the right-hand column. */
export function RecordSkeleton() {
  return (
    <Status kind="record">
      <HeaderSkeleton icon />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="h-12 flex items-center border-b border-border -mx-4 sm:-mx-6 px-4 sm:px-6 overflow-hidden">
          <div className="tabstrip">{TAB_WIDTHS.map((w, i) => <span key={i} className="tab" aria-hidden="true"><Skel className="inline-block h-3 rounded" style={{ width: w - 32 }} /></span>)}</div>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] pt-6">
          <div className="min-w-0 space-y-14">
            <div><Lines n={5} className="max-w-3xl" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-8">{[0, 1, 2].map((i) => <Skel key={i} className="block h-20 rounded-xl" />)}</div></div>
            <div><Skel className="block h-6 w-56 mb-4" /><Lines n={4} className="max-w-3xl" /></div>
            <div><Skel className="block h-6 w-44 mb-4" /><div className="flex flex-wrap gap-1.5">{[64, 96, 80, 120, 72, 104, 88].map((w, i) => <Skel key={i} className="inline-block h-7 rounded-full" style={{ width: w }} />)}</div></div>
          </div>
          <div className="hidden lg:block space-y-3">
            <Skel className="block h-24 rounded-xl" />
            <Skel className="block h-40 rounded-xl" />
            <Skel className="block h-32 rounded-xl" />
          </div>
        </div>
      </div>
    </Status>
  );
}

/** A browser (a kind's table): header, facet pills and rows. */
export function BrowserSkeleton() {
  return (
    <Status kind="browser">
      <HeaderSkeleton lede={1} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="flex flex-wrap gap-2 mb-4">{[120, 96, 140, 88, 104].map((w, i) => <Skel key={i} className="inline-block h-8 rounded-full" style={{ width: w }} />)}</div>
        <div className="card overflow-hidden">
          <Skel className="block h-10 rounded-none" />
          <div className="divide-y divide-border">{Array.from({ length: 8 }, (_, i) => <div key={i} className="flex items-center gap-4 px-4 h-12"><Skel className="block h-7 w-7 rounded-md shrink-0" /><Skel className="block h-3.5 w-48" /><Skel className="h-3.5 flex-1 hidden sm:block" /><Skel className="block h-5 w-16 rounded-full shrink-0" /></div>)}</div>
        </div>
      </div>
    </Status>
  );
}

const KIND_ROUTES = new Set(KINDS.map((k) => KIND_META[k].route));

/**
 * Picks the skeleton from the destination pathname, for the boundaries that wrap more than one shape of page: the
 * root boundary shows for every route until a nearer segment's data has arrived, and the `[kind]` boundary wraps
 * both the kind's browser and the records beneath it. During the transition usePathname already reports the new
 * route, so /cancers/tnbc/ draws the record layout from the first frame rather than a table or a plain page for the
 * second or so before the record's own boundary takes over. `fallback` is for a pathname of another shape.
 */
export function RouteSkeleton({ fallback = "page" }: { fallback?: "page" | "browser" }) {
  const pathname = usePathname();
  const parts = (pathname ?? "").split("/").filter(Boolean);
  if (parts.length === 2 && KIND_ROUTES.has(parts[0]) && parts[1] !== "map") return <RecordSkeleton />;
  if (parts.length === 1 && KIND_ROUTES.has(parts[0])) return <BrowserSkeleton />;
  return fallback === "browser" ? <BrowserSkeleton /> : <PageSkeleton />;
}

/** Any other page: header and three boxes. */
export function PageSkeleton() {
  return (
    <Status kind="page">
      <HeaderSkeleton lede={1} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <Skel key={i} className="block h-32 rounded-xl" />)}</div>
        <Lines n={4} className="max-w-3xl mt-10" />
      </div>
    </Status>
  );
}
