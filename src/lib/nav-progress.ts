/**
 * Which link clicks the navigation progress bar (src/components/NavProgress.tsx) should show.
 *
 * The bar starts on a click that Next's router will handle as a client-side transition to a different page of this
 * site, and completes when the route commits (the pathname changes). Everything else is left alone: new tabs and
 * modified clicks (the browser opens them elsewhere), downloads, other origins (me.onco.cc, GitHub), same-page hash
 * links (the section tabs), and plain files such as the JSON and CSV exports, which the browser fetches as documents
 * with no route commit to wait for.
 */
export type ClickLike = { button: number; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean; defaultPrevented: boolean };
export type AnchorLike = { href: string; target: string; hasAttribute(name: string): boolean };
export type LocationLike = { origin: string; pathname: string; search: string };

/** Paths whose last segment carries a file extension are documents and downloads, not routes; routes end in "/". */
const FILE_LIKE = /\.[a-z0-9]{1,8}$/i;

/** The pathname plus search the click navigates to, or null when the bar should stay hidden. */
export function navigationHref(a: AnchorLike, ev: ClickLike, here: LocationLike): string | null {
  if (ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.defaultPrevented) return null;
  if (a.target && a.target !== "_self") return null;
  if (a.hasAttribute("download") || a.hasAttribute("data-no-progress")) return null;
  let url: URL;
  try { url = new URL(a.href, here.origin); } catch { return null; }
  if (url.origin !== here.origin) return null;
  if (FILE_LIKE.test(url.pathname)) return null;
  if (url.pathname === here.pathname && url.search === here.search) return null;
  return url.pathname + url.search;
}

/**
 * How the navigation in flight began. NavProgress writes it; the loading skeletons read it. A click on a link starts
 * the new page at the top, so a skeleton that renders above the viewport (the reader clicked deep in a long page)
 * scrolls the window to the top at once rather than leaving the footer on screen; a back or forward step must not,
 * because the browser has just restored the reader's earlier scroll position for the page about to render.
 */
export const navigationStart: { kind: "click" | "pop" | null } = { kind: null };

/** Safety limit: a bar that has not completed by then is hidden, so a missed commit never leaves it stuck. */
export const PROGRESS_TIMEOUT_MS = 20_000;
