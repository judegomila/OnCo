import type { ReactNode } from "react";
import { withTermHovers } from "@/lib/term-hover";

const SURVIVAL = /survival|surviv|mortality|die\b|died|deaths?\b|median (OS|overall)|\b\d{1,2}-year\b|life expectancy|fatal|killer|prognosis/i;

/**
 * Keeps averaged survival figures out of the first glance. Sentences or bullets that quote survival or
 * mortality statistics are folded behind a click with a note that averages hide context (stage, subtype,
 * year of diagnosis, treatment received) and that the field is moving fast. Everything actionable stays visible.
 */
export function SurvivalDisclosure({ text, items, skipId }: { text?: string; items?: string[]; skipId?: string }) {
  const parts = items ?? (text ? text.split(/(?<=[.!?])\s+(?=[A-Z~\d])/) : []);
  const visible = parts.filter((p) => !SURVIVAL.test(p));
  const hidden = parts.filter((p) => SURVIVAL.test(p));
  const render = (p: string, i: number): ReactNode => <li key={i}>{withTermHovers(p, { skipId })}</li>;
  if (!parts.length) return null;
  return (
    <div>
      {visible.length > 0 && (items ? <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed">{visible.map(render)}</ul> : <p>{withTermHovers(visible.join(" "), { skipId })}</p>)}
      {hidden.length > 0 && (
        <details className="mt-2 group">
          <summary className="cursor-pointer text-sm text-muted hover:text-foreground list-none inline-flex items-center gap-1.5"><span aria-hidden className="transition-transform group-open:rotate-90">▸</span>Show survival figures ({hidden.length})</summary>
          <div className="mt-2 rounded-lg border border-border bg-surface p-3 text-sm">
            <p className="text-xs text-muted mb-2">Averages across everyone diagnosed, often years ago. Your stage, subtype, age, fitness and the treatment you receive matter more than the average, and the numbers are improving quickly.</p>
            <ul className="list-disc pl-5 space-y-1.5">{hidden.map(render)}</ul>
          </div>
        </details>
      )}
    </div>
  );
}
