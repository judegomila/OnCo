import type { ReactNode } from "react";
import { withTermHovers } from "@/lib/term-hover";
import { T } from "./T";

const SURVIVAL = /survival|surviv|mortality|die\b|died|deaths?\b|median (OS|overall)|\b\d{1,2}-year\b|life expectancy|fatal|killer|prognosis/i;
/** Reassuring lines stay visible even when they mention survival: cures, people alive at a landmark, improvements. */
const POSITIVE = /\bcure[sd]?\b|curable|alive at|improv|halved|doubled|longer|better|record high/i;

/**
 * Keeps averaged survival figures out of the first glance. Sentences or bullets that quote survival or
 * mortality statistics are folded behind a click with a note that averages hide context (stage, subtype,
 * year of diagnosis, treatment received) and that the field is moving fast. Everything actionable stays visible.
 * The fold label and the note follow the site language; the quoted sentences are page content.
 */
export function SurvivalDisclosure({ text, items, skipId }: { text?: string; items?: string[]; skipId?: string }) {
  const parts = items ?? (text ? text.split(/(?<=[.!?])\s+(?=[A-Z~\d])/) : []);
  const scary = (p: string) => SURVIVAL.test(p) && !POSITIVE.test(p);
  const visible = parts.filter((p) => !scary(p));
  const hidden = parts.filter(scary);
  const render = (p: string, i: number): ReactNode => <li key={i}>{withTermHovers(p, { skipId })}</li>;
  if (!parts.length) return null;
  return (
    <div>
      {visible.length > 0 && (items ? <ul className="list-disc ps-5 space-y-1.5 text-[15px] leading-relaxed">{visible.map(render)}</ul> : <p>{withTermHovers(visible.join(" "), { skipId })}</p>)}
      {hidden.length > 0 && (
        <details className="mt-2 group">
          <summary className="cursor-pointer text-sm text-muted hover:text-foreground list-none inline-flex items-center gap-1.5"><span aria-hidden className="transition-transform group-open:rotate-90 rtl:rotate-180 rtl:group-open:rotate-90">▸</span><T k="survival.show" vars={{ n: hidden.length }} /></summary>
          <div className="mt-2 rounded-lg border border-border bg-surface p-3 text-sm">
            <p className="text-xs text-muted mb-2"><T k="survival.note" /></p>
            <ul className="list-disc ps-5 space-y-1.5">{hidden.map(render)}</ul>
          </div>
        </details>
      )}
    </div>
  );
}
