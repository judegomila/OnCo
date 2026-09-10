"use client";

import Link from "next/link";
import { NAV_GROUPS } from "@/lib/nav";
import { useT } from "@/lib/i18n/ui";
import { navGroupText, navItemText } from "@/lib/i18n/nav";

/** Footer site map: one column per navigation group, labels following the site language. */
export function FooterNav() {
  const { lang } = useT();
  return (
    <>
      {NAV_GROUPS.map((g) => {
        const gt = navGroupText(g, lang);
        return (
          <nav key={g.id} aria-label={gt.label}>
            <div className="kicker mb-2"><Link className="inline-block py-1.5 hover:text-foreground" href={g.href}>{gt.label}</Link></div>
            <ul className="space-y-1.5 text-[13px] leading-snug">
              {g.items.map((it) => {
                const label = navItemText(it, lang).label;
                return (
                  <li key={it.href}>
                    {it.href.startsWith("http")
                      ? <a className="text-foreground/80 hover:text-foreground hover:underline" href={it.href} rel="noopener">{label}</a>
                      : <Link className="text-foreground/80 hover:text-foreground hover:underline" href={it.href}>{label}</Link>}
                  </li>
                );
              })}
            </ul>
          </nav>
        );
      })}
    </>
  );
}
