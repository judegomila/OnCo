"use client";

import { useEffect, useState, type RefObject } from "react";
import type { Mesh } from "@/lib/wireframe";
import { ensureMotionEnv } from "@/lib/use-animation-budget";

/**
 * The schematic scenes (src/data/schematics.ts and the scene files behind it: about 1 MB of script, 270 KB on the
 * wire) load on demand, once per page, and only when a drawing that needs them is near the screen after the page has
 * settled. Loading them as soon as the page was idle put them in every load of the home page and the drug pages,
 * where the drawings are below the fold on a phone and most readers never reach them.
 */
type Schematics = typeof import("@/data/schematics");
let loading: Promise<Schematics> | null = null;
export function loadSchematics(): Promise<Schematics> {
  loading ??= import("@/data/schematics");
  return loading;
}

/** Calls `cb` once the page has loaded and the browser has been idle (the motion budget's `settled`). Returns the cancel. */
export function whenSettled(cb: () => void): () => void {
  const e = ensureMotionEnv();
  if (e.settled) { cb(); return () => {}; }
  let done = false;
  const check = () => { if (!done && e.settled) { done = true; e.subs.delete(check); cb(); } };
  e.subs.add(check);
  return () => { done = true; e.subs.delete(check); };
}

/** Calls `cb` once `el` comes within `margin` of the viewport. Returns the cancel. */
export function whenNear(el: Element | null, cb: () => void, margin = "200px"): () => void {
  if (!el || typeof IntersectionObserver === "undefined") { cb(); return () => {}; }
  const io = new IntersectionObserver((entries) => { if (entries.some((x) => x.isIntersecting)) { io.disconnect(); cb(); } }, { rootMargin: margin });
  io.observe(el);
  return () => io.disconnect();
}

/**
 * The mesh `pick` returns from the schematic scenes, once the box `ref` is near the screen and the page has settled;
 * null until then. `key` names the drawing: a new key picks again.
 */
export function useLazySchematic(ref: RefObject<Element | null>, key: string, pick: (m: Schematics) => Mesh | null): Mesh | null {
  const [state, setState] = useState<{ key: string; mesh: Mesh | null } | null>(null);
  useEffect(() => {
    let live = true;
    let cancelSettled = () => {};
    const cancelNear = whenNear(ref.current, () => {
      cancelSettled = whenSettled(() => { void loadSchematics().then((m) => { if (live) setState({ key, mesh: pick(m) }); }); });
    });
    return () => { live = false; cancelNear(); cancelSettled(); };
    // `pick` is derived from `key` by every caller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, key]);
  return state?.key === key ? state.mesh : null;
}
