import Link from "next/link";
import { NAV_GROUPS } from "@/lib/nav";
import { Container, PageHeader } from "./ui";

/** Landing page for one navigation group: its pages as cards, plus an optional extra block. */
export function GroupLanding({ groupId, children }: { groupId: string; children?: React.ReactNode }) {
  const g = NAV_GROUPS.find((x) => x.id === groupId)!;
  return (
    <>
      <PageHeader kicker={<span className="kicker">{g.label}</span>} title={g.label} lede={g.blurb} />
      <Container className="pb-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {g.items.map((it, i) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold leading-snug text-balance">{it.label}</div>
                  <span aria-hidden className="text-xs text-muted tabular-nums mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">{it.blurb}</p>
                <div className="mt-3 text-sm font-medium text-accent">Open <span aria-hidden>→</span></div>
              </>
            );
            return it.href.startsWith("http")
              ? <a key={it.href} href={it.href} rel="noopener" className="card p-4 flex flex-col">{inner}</a>
              : <Link key={it.href} href={it.href} className="card p-4 flex flex-col">{inner}</Link>;
          })}
        </div>
        {children}
      </Container>
    </>
  );
}
