"use client";

import Link from "next/link";
import { useState } from "react";
import { GENERAL_RED_FLAGS, redFlagsFor } from "@/data/red-flags";
import { RedFlagCard } from "./RedFlagCard";

export type ToxRow = { event: string; anyGradePct?: number; grade3PlusPct?: number; note?: string };
export type CareDetail = { id: string; name: string; route: string; kind: "drug" | "technology"; modality?: string; toxicity: ToxRow[]; limitations: string[]; monitoring?: string };
export type SupportItem = { id: string; name: string; tldr: string; route: string };
export type QuestionItem = { setting: string; question: string; why: string };

/**
 * Logistics-first block for caregivers: what to watch for with the treatments in play, when to call,
 * practical supportive-care items, and the questions list. Shown when the profile mode is "caregiver".
 */
export function CaregiverPanel({ treatments, support, questions, cancerName }: { treatments: CareDetail[]; support: SupportItem[]; questions: QuestionItem[]; cancerName?: string }) {
  const settings = [...new Set(questions.map((q) => q.setting))];
  const [phone, setPhone] = useState("");
  return (
    <div className="space-y-6">
      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
          <h3 className="font-semibold">When to call the team</h3>
          <label className="text-xs text-muted flex items-center gap-1.5">24-hour number for the cards
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. the acute oncology line" aria-label="24-hour oncology number to print on the cards" className="rounded-md border border-border bg-card px-2 py-1 text-xs w-52" />
          </label>
        </div>
        <p className="text-sm text-muted mb-3">One general card for anyone on treatment, then a card per treatment in play, each quoting the thresholds from the label or guideline. Print them and keep them with the treatment card and the list of current drugs by the phone. The team will have given specific thresholds; those win.</p>
        <div className="grid gap-3 md:grid-cols-2">
          <RedFlagCard name={GENERAL_RED_FLAGS.label} sets={[GENERAL_RED_FLAGS]} phone={phone || undefined} />
          {treatments.map((t) => {
            const sets = redFlagsFor(t.id, t.modality);
            return sets.length ? <RedFlagCard key={t.id} name={t.name} route={t.route} sets={sets} phone={phone || undefined} /> : null;
          })}
        </div>
        {treatments.length > 0 && treatments.every((t) => !redFlagsFor(t.id, t.modality).length) && <p className="text-xs text-muted mt-2">No class-specific card exists yet for these treatments; the general card and the product pages apply.</p>}
      </section>

      <section>
        <h3 className="font-semibold mb-2">Side effects to watch, by treatment</h3>
        {treatments.length === 0 && <p className="text-sm text-muted">Add the treatments already received or being considered to the profile above to see their characteristic side effects.</p>}
        <div className="grid gap-3 md:grid-cols-2">
          {treatments.map((t) => (
            <div key={t.id} className="card p-4">
              <div className="flex items-baseline justify-between gap-2"><Link href={t.route} className="font-medium hover:underline">{t.name}</Link>{t.modality && <span className="text-xs text-muted">{t.modality}</span>}</div>
              {t.toxicity.length > 0 ? (
                <div className="overflow-x-auto"><table className="onco mt-2">
                  <thead><tr><th>Effect</th><th>Any grade</th><th>Severe (grade ≥3)</th></tr></thead>
                  <tbody>{t.toxicity.slice(0, 8).map((x, i) => <tr key={i}><td>{x.event}{x.note && <span className="text-muted">: {x.note}</span>}</td><td className="tabular-nums">{x.anyGradePct !== undefined ? `${x.anyGradePct}%` : "not sourced"}</td><td className="tabular-nums">{x.grade3PlusPct !== undefined ? `${x.grade3PlusPct}%` : "not sourced"}</td></tr>)}</tbody>
                </table></div>
              ) : t.limitations.length > 0 ? (
                <ul className="list-disc pl-5 text-sm mt-2 space-y-1">{t.limitations.map((l, i) => <li key={i}>{l}</li>)}</ul>
              ) : <p className="text-sm text-muted mt-2">No structured toxicity data yet; see the product page and the label.</p>}
              {t.monitoring && <p className="text-xs text-muted mt-2">Monitoring: {t.monitoring}</p>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Practical support that has evidence</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {support.map((s) => <Link key={s.id} href={s.route} className="card p-3 hover:shadow-md transition"><div className="font-medium">{s.name}</div><p className="text-xs text-muted mt-1 line-clamp-3">{s.tldr}</p></Link>)}
        </div>
      </section>

      {questions.length > 0 && (
        <section className="card p-5">
          <div className="kicker">Bring to the appointment</div>
          <h3 className="font-semibold mt-0.5 mb-3">Questions to ask{cancerName ? ` about ${cancerName}` : ""}</h3>
          <div className="space-y-4">
            {settings.map((s) => (
              <div key={s}>
                <h4 className="font-medium text-sm mb-1">{s}</h4>
                <ol className="list-decimal pl-5 space-y-1 text-sm">{questions.filter((q) => q.setting === s).map((q, i) => <li key={i}>{q.question}<span className="text-muted">: {q.why}</span></li>)}</ol>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
