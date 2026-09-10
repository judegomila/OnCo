import Link from "next/link";
import type { OpenMedicalEntry } from "@/data/openmedical";
import { OPENMEDICAL_SITE } from "@/data/openmedical";
import { openMedicalForSection, openMedicalForTechnology } from "@/lib/openmedical";

/**
 * "Open tools you can use or build": open-source projects from the Open Medical Registry (openmedical.sh) mapped to
 * this front or technology. Each row names the project, quotes one line from the registry, shows its licence and
 * whether a person at the registry verified the record, and links to both the registry record and the project.
 * Renders nothing when no entry is mapped. Server component.
 */
export function OpenMedicalPanel({ id, kind, limit }: { id: string; kind: "section" | "technology"; limit?: number }) {
  const all = kind === "section" ? openMedicalForSection(id) : openMedicalForTechnology(id);
  if (!all.length) return null;
  const shown = limit ? all.slice(0, limit) : all;
  return (
    <section className="mt-10" aria-labelledby={`open-tools-${id}`}>
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h2 id={`open-tools-${id}`} className="text-lg font-semibold tracking-tight">Open tools you can use or build</h2>
        <Link href="/open-tools/" className="text-xs text-muted hover:underline whitespace-nowrap">All open tools by front →</Link>
      </div>
      <p className="text-sm text-muted mb-3 max-w-3xl">Open-source software, hardware and data projects catalogued by a third party, the Open Medical Registry, that bear on this {kind === "section" ? "front" : "technology"}. Listing is not endorsement; check each project&apos;s own licence and validation before clinical use.</p>
      <OpenMedicalList entries={shown} />
      {shown.length < all.length && <p className="text-xs text-muted mt-2"><Link className="underline" href="/open-tools/">{all.length - shown.length} more on the open tools page →</Link></p>}
      <OpenMedicalFooter />
    </section>
  );
}

export function OpenMedicalList({ entries }: { entries: OpenMedicalEntry[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {entries.map((e) => (
        <li key={e.id} id={`om-${e.id}`} className="card p-3 text-sm flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-medium leading-snug">{e.name}</span>
            <span className="chip bg-foreground/5 text-[11px]" title="Licence as recorded by the registry; check the project for authoritative terms">{e.licence === "not stated" ? "licence not stated" : e.licence}</span>
            {e.verified && <span className="chip text-[11px] border border-accent/40 bg-accent-soft text-accent" title="A person at the Open Medical Registry checked this record">verified by registry</span>}
            <span className="chip bg-foreground/5 text-[11px] capitalize">{e.category}</span>
          </div>
          <p className="text-muted leading-relaxed">{e.blurb}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs mt-auto">
            <a className="underline" href={e.url} rel="noopener">Registry record</a>
            <a className="underline break-all" href={e.homepage} rel="noopener">Project site</a>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function OpenMedicalFooter() {
  return <p className="text-xs text-muted mt-3">From the <a className="underline" href={OPENMEDICAL_SITE} rel="noopener">Open Medical Registry (openmedical.sh)</a>, an MIT-licensed catalogue of open-source medicine. Blurbs are one line from each registry record; every project keeps its own licence.</p>;
}
