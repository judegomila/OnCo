import { graph } from "@/lib/graph";
import type { SectionId } from "@/lib/record-sections";
import { cancerStripTabs } from "./CancerRecord";
import { Tabs } from "./Tabs";

/**
 * The record's section navigator on a page that belongs to one section but is not the section page itself
 * (decisions, uk, compared, changes): every section as a link, the owning section highlighted, so the strip a reader
 * saw on the hub is the same strip here. Server component; the tabs are links only, so nothing renders below the bar.
 * Renders nothing when the id is not a cancer record (a UK pathway can ship ahead of its record).
 */
export function SectionStrip({ cancerId, current, className = "mb-8" }: { cancerId: string; current: SectionId; className?: string }) {
  const c = graph().get(cancerId);
  if (!c || c.kind !== "cancer") return null;
  return <div className={className} data-section-strip={current}><Tabs tabs={cancerStripTabs(c, current)} ariaLabel={`${c.name} sections`} current={current} /></div>;
}
