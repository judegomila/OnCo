import { NavIcon } from "./NavIcon";
import Link from "next/link";
import { NAV_GROUPS } from "@/lib/nav";
import { Container, PageHeader } from "./ui";
import { GardenBackdrop, gardenSeed } from "./Garden";

/**
 * Landing page for one navigation group: a calm header band (the home hero's quieter sibling), its
 * pages as cards each with a faint leaf in the corner, plus an optional extra block.
 */
export function GroupLanding({ groupId, children }: { groupId: string; children?: React.ReactNode }) {
  const g = NAV_GROUPS.find((x) => x.id === groupId)!;
  return (
    <>
      <PageHeader tone="band" kicker={<span className="kicker inline-flex items-center gap-1.5"><NavIcon id={g.id} className="h-4 w-4" />{g.label}</span>} title={g.label} lede={g.blurb} />
      <Container className="pb-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {g.items.map((it, i) => {
            const inner = (
              <>
                <GardenBackdrop variant="card" seed={gardenSeed(it.href)} />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="font-semibold leading-snug text-balance">{it.label}</div>
                  <span aria-hidden className="text-xs text-muted tabular-nums mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="relative text-sm text-muted mt-1.5 leading-relaxed">{it.blurb}</p>
                <div className="relative mt-3 text-sm font-medium text-accent">Open <span aria-hidden>→</span></div>
              </>
            );
            return it.href.startsWith("http")
              ? <a key={it.href} href={it.href} rel="noopener" className="card relative p-4 flex flex-col">{inner}</a>
              : <Link key={it.href} href={it.href} className="card relative p-4 flex flex-col">{inner}</Link>;
          })}
        </div>
        {children}
      </Container>
    </>
  );
}
