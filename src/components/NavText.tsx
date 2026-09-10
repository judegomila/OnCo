"use client";

import { NAV_GROUPS } from "@/lib/nav";
import { useT } from "@/lib/i18n/ui";
import { navGroupText, navItemText } from "@/lib/i18n/nav";

/**
 * Navigation text for server components (landing pages, home, kickers): renders the English label first and
 * swaps to the site language after hydration, like <T>.
 *
 *   <GroupText id="find" field="label" />
 *   <ItemText href="/explore/" field="blurb" />
 */
export function GroupText({ id, field = "label" }: { id: string; field?: "label" | "short" | "blurb" }) {
  const { lang } = useT();
  const g = NAV_GROUPS.find((x) => x.id === id);
  if (!g) return null;
  return <>{navGroupText(g, lang)[field]}</>;
}

export function ItemText({ href, field = "label", groupId }: { href: string; field?: "label" | "blurb"; /** Disambiguates items that sit in two groups; defaults to the first match. */ groupId?: string }) {
  const { lang } = useT();
  const groups = groupId ? NAV_GROUPS.filter((g) => g.id === groupId) : NAV_GROUPS;
  const it = groups.flatMap((g) => g.items).find((x) => x.href === href);
  if (!it) return null;
  return <>{navItemText(it, lang)[field]}</>;
}
