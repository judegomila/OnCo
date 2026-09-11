"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRegion } from "@/lib/region";
import { FacetSelect } from "./filters/FacetSelect";
import { Tip } from "./Tip";
import { CancerIcon } from "./CancerIcon";
import { PrintButton } from "./PrintButton";
import type { SymptomGroup } from "@/data/symptom-paths";

/** Serialisable copy of a corpus entity for the client. */
export type PathRef = { id: string; name: string; tldr: string; route: string; status?: string };

export type SymptomView = {
  id: string; label: string; aka?: string[]; group: SymptomGroup;
  plain: string; redFlags: string[]; firstTest: string;
  cancers: PathRef[]; tests: PathRef[]; terms: PathRef[];
  referral: { uk: string; ukRef?: string; us: string; sources: Array<{ label: string; url: string }> };
};

const STEPS = ["What it can mean", "Which test comes first", "When to be referred", "Cancers to read about"] as const;

function RefChip({ r }: { r: PathRef }) {
  return (
    <Tip title={r.name} text={r.tldr} href={r.route}>
      <Link href={r.route} className="chip border bg-card border-border hover:bg-foreground/5">{r.name}</Link>
    </Tip>
  );
}

/**
 * Symptom-first stepper: pick a presenting symptom and walk through what it can mean, the first test,
 * the referral thresholds for the reader's region, and the cancers to read about. Nothing is stored.
 */
export function SymptomPath({ symptoms }: { symptoms: SymptomView[] }) {
  const { region: chosen, ready } = useRegion();
  const region = chosen ?? "US";
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [q, setQ] = useState("");

  const options = useMemo(() => symptoms.map((s) => ({ value: s.id, label: s.label, group: s.group[0].toUpperCase() + s.group.slice(1) })), [symptoms]);
  const current = symptoms.find((s) => s.id === selected);
  const needle = q.trim().toLowerCase();
  const filtered = needle ? symptoms.filter((s) => `${s.label} ${(s.aka ?? []).join(" ")} ${s.plain}`.toLowerCase().includes(needle)) : symptoms;
  const groups = [...new Set(filtered.map((s) => s.group))];
  const pick = (id: string | null) => { setSelected(id); setStep(0); };

  const showUk = !ready || region === "UK" || !["UK", "US"].includes(region);
  const showUs = !ready || region === "US" || !["UK", "US"].includes(region);

  return (
    <div>
      <div className="sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 bg-background/95 backdrop-blur border-b border-border flex flex-wrap items-center gap-2 no-print">
        <FacetSelect label="Symptom" options={options} value={selected} onChange={(v) => pick(v as string | null)} placeholder="Choose a symptom…" allLabel="Not chosen" width="w-80" />
        {!current && <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search symptoms…" aria-label="Search symptoms" className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 w-60" />}
        {current && <button type="button" onClick={() => pick(null)} className="text-sm underline text-muted">Choose another</button>}
        {current && <span className="ml-auto text-xs text-muted">Region for referral rules: {ready ? region : "…"} (change it in the header)</span>}
      </div>

      {!current && (
        <div className="mt-8 space-y-8">
          <div className="card p-6 text-center">
            <div className="text-lg font-medium">Start from the symptom, not the diagnosis.</div>
            <p className="text-muted mt-1 max-w-2xl mx-auto">Pick what you have noticed. Each pathway says what it usually means (most causes are not cancer), which test a doctor would order first, the exact thresholds guidelines use to refer, and which cancer pages to read.</p>
          </div>
          {groups.map((g) => (
            <section key={g}>
              <div className="kicker mb-2 capitalize">{g}</div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.filter((s) => s.group === g).map((s) => (
                  <button key={s.id} type="button" onClick={() => pick(s.id)} className="card p-3 text-left hover:shadow-md transition">
                    <div className="font-medium leading-snug">{s.label}</div>
                    {s.aka && s.aka.length > 0 && <div className="text-xs text-muted mt-0.5">{s.aka.join(", ")}</div>}
                    <div className="mt-2 flex flex-wrap gap-1">{s.cancers.slice(0, 3).map((c) => <span key={c.id} className="chip border border-border bg-surface text-[11px]">{c.name}</span>)}{s.cancers.length > 3 && <span className="text-[11px] text-muted self-center">+{s.cancers.length - 3}</span>}</div>
                  </button>
                ))}
              </div>
            </section>
          ))}
          {filtered.length === 0 && <div className="card p-8 text-center text-muted">No symptom matches that search.</div>}
        </div>
      )}

      {current && (
        <div className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">{current.label}</h2>
            <PrintButton className="text-sm text-muted no-print" />
          </div>
          {current.aka && current.aka.length > 0 && <p className="text-sm text-muted mt-0.5">Also called: {current.aka.join(", ")}</p>}

          {/* Stepper */}
          <ol className="mt-5 grid gap-2 sm:grid-cols-4 no-print" aria-label="Steps">
            {STEPS.map((label, i) => (
              <li key={label}>
                <button type="button" onClick={() => setStep(i)} aria-current={step === i ? "step" : undefined}
                  className={`w-full text-left card p-3 transition ${step === i ? "ring-2 ring-foreground" : "hover:shadow-md"}`}>
                  <div className="kicker">Step {i + 1}</div>
                  <div className="font-medium text-sm leading-snug mt-0.5">{label}</div>
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-6 space-y-6">
            {(step === 0) && (
              <section className="card p-5 print:break-inside-avoid">
                <div className="kicker">Step 1</div>
                <h3 className="text-lg font-semibold mt-0.5 mb-2">Possible causes</h3>
                <p className="text-[15px] leading-relaxed">{current.plain}</p>
                <div className="mt-4">
                  <div className="font-medium text-sm mb-1">Features that raise concern</div>
                  <ul className="list-disc pl-5 space-y-1 text-sm">{current.redFlags.map((f, i) => <li key={i}>{f}</li>)}</ul>
                </div>
                <div className="mt-4 flex justify-end no-print"><button type="button" onClick={() => setStep(1)} className="rounded-lg bg-accent text-white px-3 py-1.5 text-sm font-medium hover:brightness-110">Next: which test comes first</button></div>
              </section>
            )}
            {(step === 1) && (
              <section className="card p-5 print:break-inside-avoid">
                <div className="kicker">Step 2</div>
                <h3 className="text-lg font-semibold mt-0.5 mb-2">First test and what it rules out</h3>
                <p className="text-[15px] leading-relaxed">{current.firstTest}</p>
                {current.tests.length > 0 && (
                  <div className="mt-4">
                    <div className="font-medium text-sm mb-1.5">The tests, explained</div>
                    <ul className="divide-y divide-border">
                      {current.tests.map((t) => (
                        <li key={t.id} className="py-2 flex flex-wrap items-baseline gap-x-2">
                          <Link href={t.route} className="font-medium hover:underline">{t.name}</Link>
                          <span className="text-sm text-muted">{t.tldr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {current.terms.length > 0 && <div className="mt-4"><div className="font-medium text-sm mb-1.5">Words you will hear</div><div className="flex flex-wrap gap-1.5">{current.terms.map((t) => <RefChip key={t.id} r={t} />)}</div></div>}
                <div className="mt-4 flex justify-between no-print"><button type="button" onClick={() => setStep(0)} className="text-sm underline text-muted">Back</button><button type="button" onClick={() => setStep(2)} className="rounded-lg bg-accent text-white px-3 py-1.5 text-sm font-medium hover:brightness-110">Next: when to be referred</button></div>
              </section>
            )}
            {(step === 2) && (
              <section className="card p-5 print:break-inside-avoid">
                <div className="kicker">Step 3</div>
                <h3 className="text-lg font-semibold mt-0.5 mb-2">Referral thresholds</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {showUk && (
                    <div className={`rounded-lg border border-border p-4 ${region === "UK" ? "bg-accent-soft/40" : ""}`}>
                      <div className="flex items-baseline justify-between gap-2"><div className="font-medium">United Kingdom (NHS)</div>{current.referral.ukRef && <span className="text-xs text-muted">NG12 {current.referral.ukRef}</span>}</div>
                      <p className="text-sm mt-1.5 leading-relaxed">{current.referral.uk}</p>
                    </div>
                  )}
                  {showUs && (
                    <div className={`rounded-lg border border-border p-4 ${region === "US" ? "bg-accent-soft/40" : ""}`}>
                      <div className="font-medium">United States</div>
                      <p className="text-sm mt-1.5 leading-relaxed">{current.referral.us}</p>
                    </div>
                  )}
                </div>
                {ready && !["UK", "US"].includes(region) && <p className="text-xs text-muted mt-3">We do not yet have referral rules for your region ({region}); the UK and US rules are shown as reference points. Local guidance takes precedence.</p>}
                <div className="mt-4 text-xs text-muted">
                  <span className="font-medium text-foreground/80">Sources: </span>
                  {current.referral.sources.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a className="underline" href={s.url} rel="noopener">{s.label}</a></span>)}
                </div>
                <div className="mt-4 flex justify-between no-print"><button type="button" onClick={() => setStep(1)} className="text-sm underline text-muted">Back</button><button type="button" onClick={() => setStep(3)} className="rounded-lg bg-accent text-white px-3 py-1.5 text-sm font-medium hover:brightness-110">Next: cancers to read about</button></div>
              </section>
            )}
            {(step === 3) && (
              <section className="card p-5 print:break-inside-avoid">
                <div className="kicker">Step 4</div>
                <h3 className="text-lg font-semibold mt-0.5 mb-3">Cancers linked to this symptom</h3>
                <p className="text-sm text-muted mb-3">Listed for reading, not for ranking: this symptom alone does not make any of them likely. Each page starts in plain English.</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {current.cancers.map((c) => (
                    <Link key={c.id} href={c.route} className="card p-3 hover:shadow-md transition flex gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><CancerIcon cancerId={c.id} className="h-6 w-6" /></span>
                      <span className="min-w-0"><span className="block font-medium leading-snug">{c.name}</span><span className="block text-xs text-muted mt-0.5 line-clamp-2">{c.tldr}</span></span>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 flex justify-between no-print"><button type="button" onClick={() => setStep(2)} className="text-sm underline text-muted">Back</button><button type="button" onClick={() => pick(null)} className="text-sm underline text-muted">Choose another symptom</button></div>
              </section>
            )}
          </div>

          {/* Print view: all four steps in sequence. */}
          <div className="hidden print:block mt-6 space-y-4 text-sm">
            <div><div className="kicker">What it can mean</div><p>{current.plain}</p><ul className="list-disc pl-5 mt-1">{current.redFlags.map((f, i) => <li key={i}>{f}</li>)}</ul></div>
            <div><div className="kicker">First test</div><p>{current.firstTest}</p></div>
            <div><div className="kicker">Referral, UK</div><p>{current.referral.uk}</p></div>
            <div><div className="kicker">Referral, US</div><p>{current.referral.us}</p></div>
            <div><div className="kicker">Cancers</div><p>{current.cancers.map((c) => c.name).join(", ")}</p></div>
            <div><div className="kicker">Sources</div><p>{current.referral.sources.map((s) => `${s.label}: ${s.url}`).join("; ")}</p></div>
          </div>

          <p className="text-xs text-muted mt-6 max-w-3xl">These pathways summarise published guidelines for orientation. They are not a diagnosis, and thresholds change: NICE NG12 is updated regularly and US guidance varies by insurer and health system. If a symptom worries you, see a clinician; if it is severe or sudden, seek urgent care.</p>
        </div>
      )}
    </div>
  );
}
