/**
 * Where a reader goes once a sign-in has completed on /signup/. Pure functions, no browser access, so the decision
 * is unit-tested on its own (src/lib/after-sign-in.test.ts) and shared by the signup form, the welcome page and
 * the account menu.
 *
 *   no stored role   ->  /welcome/?back=<return path>   (the first-sign-in step takes over before any newsletter box)
 *   stored role      ->  the return path itself
 *
 * A return path is only ever a same-origin absolute path; anything else falls back to the home page.
 */
export const WELCOME_PATH = "/welcome/";

/** A same-origin, absolute return path (never protocol-relative); anything else falls back to `fallback`. */
export function safeReturnPath(p: string | null | undefined, fallback = "/"): string {
  return p && p.startsWith("/") && !p.startsWith("//") ? p : fallback;
}

/** The welcome page carrying the path to return to; the welcome page itself is never nested inside its own `back`. */
export function welcomeHref(back: string | null | undefined): string {
  const b = safeReturnPath(back);
  if (b.startsWith(WELCOME_PATH)) return b;
  return b === "/" ? WELCOME_PATH : `${WELCOME_PATH}?back=${encodeURIComponent(b)}`;
}

/** The address to `router.replace` after a fresh sign-in. `back` is the path captureSession left behind. */
export function afterSignInPath({ hasRole, back }: { hasRole: boolean; back: string | null | undefined }): string {
  const b = safeReturnPath(back);
  if (hasRole) return b;
  return welcomeHref(b);
}

/** The `back` parameter of a welcome page address, validated; the home page when absent or unsafe. */
export function backFromSearch(search: string): string {
  try { return safeReturnPath(new URLSearchParams(search).get("back")); } catch { return "/"; }
}
