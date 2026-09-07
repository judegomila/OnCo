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
          {g.items.map((it) => (
            <Link key={it.href} href={it.href} className="card p-4 hover:shadow-md hover:-translate-y-px transition">
              <div className="font-semibold">{it.label}</div>
              <p className="text-sm text-muted mt-1">{it.blurb}</p>
            </Link>
          ))}
        </div>
        {children}
      </Container>
    </>
  );
}
