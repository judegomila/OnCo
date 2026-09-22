"use client";

/**
 * The bridge to the signed-in site, me.onco.cc. onco.cc keeps no session and stores nothing personal: these
 * helpers only ask me.onco.cc "is anyone signed in?" (answered from its own cookie, first name only) and hand a
 * Watch or the For me choices across. The cookie is HttpOnly on me.onco.cc; this code never sees it. When the
 * person is not signed in, the helpers return false and the caller offers a link to sign in instead.
 */
export const ME_ORIGIN = "https://me.onco.cc";

export type Me = { signedIn: boolean; firstName: string | null };
const SIGNED_OUT: Me = { signedIn: false, firstName: null };

let cached: Promise<Me> | null = null;

/** Who is signed in on me.onco.cc, asked once per page load; signed out on any error (offline, blocked, old browser). */
export function fetchMe(): Promise<Me> {
  if (typeof window === "undefined") return Promise.resolve(SIGNED_OUT);
  if (!cached) {
    cached = fetch(`${ME_ORIGIN}/api/me/`, { credentials: "include", cache: "no-store" })
      .then(async (r) => (r.ok ? ((await r.json()) as Me) : SIGNED_OUT))
      .catch(() => SIGNED_OUT);
  }
  return cached;
}

/** Forget the cached answer (after a sign-in round trip, say). */
export function resetMe() {
  cached = null;
}

export type WatchOnAccount = { kind: string; id: string; name?: string; route?: string };

/** Keep a page on the account. True when saved, false when signed out or anything failed. */
export async function watchOnAccount(item: WatchOnAccount): Promise<boolean> {
  try {
    const r = await fetch(`${ME_ORIGIN}/api/watch/`, {
      method: "PUT",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind: item.kind, id: item.id, name: item.name ?? null, route: item.route ?? null }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

/** Stop watching on the account. */
export async function unwatchOnAccount(kind: string, id: string): Promise<boolean> {
  try {
    const r = await fetch(`${ME_ORIGIN}/api/watch/`, { method: "DELETE", credentials: "include", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind, id }) });
    return r.ok || r.status === 204;
  } catch {
    return false;
  }
}

/** The signed-in site's landing that records a Watch after sign-in and comes back here. */
export function meWatchHref(item: WatchOnAccount, back: string): string {
  const q = new URLSearchParams({ kind: item.kind, id: item.id, back });
  if (item.name) q.set("name", item.name);
  if (item.route) q.set("route", item.route);
  return `${ME_ORIGIN}/watch/?${q}`;
}

/** The person's own page on the signed-in site. */
export const ME_CONTEXT_URL = `${ME_ORIGIN}/context/`;

/**
 * The signed-in site's landing that carries the For me choices across. The profile travels in the URL fragment,
 * which browsers never send to a server, so nothing about the person touches a log on either site.
 */
export function meImportHref(profile: Record<string, unknown>, back: string): string {
  const carried = { cancerId: profile.cancerId, stage: profile.stage, mode: profile.mode, country: profile.country, diagnosedRecently: profile.diagnosedRecently };
  const json = JSON.stringify(carried);
  const b64 = btoa(unescape(encodeURIComponent(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `${ME_ORIGIN}/import/?back=${encodeURIComponent(back)}#p=${b64}`;
}
