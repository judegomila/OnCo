/**
 * OnCo's own placeholder for an organisation or person without an image: initials on a soft tint chosen from the
 * name, so the same organisation always gets the same tile. Shared by Logo and RowAvatar. Replaced Google's favicon
 * service as the fallback on 29 October 2026 at the owner's request: a stock icon from a website builder (a WordPress
 * "W", the Vercel triangle) told a reader nothing and looked like an abandoned page.
 */
export function tint(name: string): string {
  let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const hues = [340, 20, 45, 160, 200, 230, 270, 300];
  return `hsl(${hues[h % hues.length]} 55% 92%)`;
}

/** Up to two initials from a name, ignoring bracketed asides and punctuation-only words. */
export function initialsOf(name: string): string {
  return name.replace(/\(.*?\)/g, "").split(/[\s/–-]+/).filter((w) => /[A-Za-z0-9]/.test(w)).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");
}
