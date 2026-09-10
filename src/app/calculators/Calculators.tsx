"use client";

import { useState, type ReactNode } from "react";
import { ANTHRACYCLINE_FACTORS, CITATIONS, anc, ancGrade, anthracyclineRisk, bsaDose, bsaDuBois, bsaMosteller, calvert, cockcroftGault, correctedCalcium, correctedCalciumMgdl, cumulativeAnthracycline, doseBand, fmt, recist, type Anthracycline } from "@/lib/calculators";

/** Pure client tools; nothing entered leaves the browser. Each result has a copy button. */

function Num({ label, value, onChange, unit, min = 0, step = "any", hint }: { label: string; value: string; onChange: (v: string) => void; unit?: string; min?: number; step?: string; hint?: string }) {
  return (
    <label className="block text-sm">
      <span className="text-muted">{label}</span>
      <span className="mt-1 flex items-center gap-2">
        <input type="number" inputMode="decimal" min={min} step={step} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 tabular-nums" />
        {unit && <span className="text-xs text-muted whitespace-nowrap">{unit}</span>}
      </span>
      {hint && <span className="block text-[11px] text-muted mt-0.5">{hint}</span>}
    </label>
  );
}

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500); } catch { /* clipboard unavailable */ } }} className="chip border border-border bg-card hover:bg-foreground/5 cursor-pointer" aria-label={`Copy result: ${text}`}>{done ? "Copied" : "Copy"}</button>
  );
}

function Result({ label, value, copy, tone = "" }: { label: string; value: ReactNode; copy: string; tone?: string }) {
  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 ${tone}`}>
      <div><div className="text-[11px] text-muted">{label}</div><div className="font-semibold tabular-nums">{value}</div></div>
      <CopyButton text={copy} />
    </div>
  );
}

function Card({ id, title, formula, cite, children }: { id: string; title: string; formula: string; cite: Array<{ label: string; url: string }>; children: ReactNode }) {
  return (
    <section id={id} className="card p-4 sm:p-5">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-xs text-muted mt-0.5 font-mono">{formula}</p>
      <div className="mt-3 space-y-3">{children}</div>
      <p className="text-[11px] text-muted mt-3">Source: {cite.map((c, i) => <span key={c.url}>{i > 0 && "; "}<a href={c.url} target="_blank" rel="noopener noreferrer" className="underline">{c.label}</a></span>)}</p>
    </section>
  );
}

const n = (s: string) => { const x = parseFloat(s); return Number.isFinite(x) ? x : NaN; };

export function Calculators() {
  const [h, setH] = useState("170"), [w, setW] = useState("70"), [mgm2, setMgm2] = useState("75"), [cap, setCap] = useState("2.0");
  const [age, setAge] = useState("60"), [cr, setCr] = useState("80"), [crUnit, setCrUnit] = useState<"umol" | "mgdl">("umol"), [female, setFemale] = useState(false), [auc, setAuc] = useState("5"), [gfrCap, setGfrCap] = useState(true);
  const [wbc, setWbc] = useState("4.0"), [seg, setSeg] = useState("50"), [band, setBand] = useState("2");
  const [ca, setCa] = useState("2.20"), [alb, setAlb] = useState("30"), [caUnit, setCaUnit] = useState<"mmol" | "mgdl">("mmol");
  const [base, setBase] = useState("100"), [nadir, setNadir] = useState("60"), [cur, setCur] = useState("72"), [newLes, setNewLes] = useState(false);
  const [anth, setAnth] = useState<Array<{ agent: Anthracycline; mg: string }>>([{ agent: "doxorubicin", mg: "240" }, { agent: "epirubicin", mg: "0" }]);
  const [bandDose, setBandDose] = useState("147"), [bandStep, setBandStep] = useState("10"), [bandTol, setBandTol] = useState("6");

  const H = n(h), W = n(w);
  const bsaM = bsaMosteller(H, W), bsaD = bsaDuBois(H, W);
  const dose = bsaDose(n(mgm2), bsaM, n(cap) > 0 ? n(cap) : undefined);
  const crUmol = crUnit === "umol" ? n(cr) : n(cr) * 88.4;
  const crcl = cockcroftGault(n(age), W, crUmol, female);
  const carbo = calvert(n(auc), crcl, gfrCap);
  const ancV = anc(n(wbc), n(seg), n(band)); const grade = ancGrade(ancV);
  const corrCa = caUnit === "mmol" ? correctedCalcium(n(ca), n(alb)) : correctedCalciumMgdl(n(ca), n(alb));
  const rc = recist(n(base), n(nadir), n(cur), newLes);
  const cum = cumulativeAnthracycline(anth.map((a) => ({ agent: a.agent, mgPerM2: n(a.mg) || 0 })));
  const risk = anthracyclineRisk(cum.equivalent);
  const db = doseBand(n(bandDose), n(bandStep), n(bandTol));

  const GRADE_TONE = ["", "bg-amber-50 dark:bg-amber-950/20", "bg-amber-100 dark:bg-amber-900/30", "bg-rose-50 dark:bg-rose-950/30", "bg-rose-100 dark:bg-rose-900/40"];
  const RESP_TONE: Record<string, string> = { CR: "bg-emerald-100 dark:bg-emerald-900/40", PR: "bg-emerald-50 dark:bg-emerald-950/30", SD: "", PD: "bg-rose-100 dark:bg-rose-900/40" };

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card id="bsa" title="Body surface area and BSA dose" formula="Mosteller: √(height × weight / 3600). Du Bois: 0.007184 × W^0.425 × H^0.725" cite={[CITATIONS.mosteller, CITATIONS.dubois]}>
        <div className="grid grid-cols-2 gap-3"><Num label="Height" value={h} onChange={setH} unit="cm" /><Num label="Weight" value={w} onChange={setW} unit="kg" /></div>
        <div className="grid grid-cols-2 gap-2"><Result label="BSA (Mosteller)" value={`${fmt(bsaM, 2)} m²`} copy={`BSA ${fmt(bsaM, 2)} m² (Mosteller)`} /><Result label="BSA (Du Bois)" value={`${fmt(bsaD, 2)} m²`} copy={`BSA ${fmt(bsaD, 2)} m² (Du Bois)`} /></div>
        <div className="grid grid-cols-2 gap-3"><Num label="Protocol dose" value={mgm2} onChange={setMgm2} unit="mg/m²" /><Num label="BSA cap (0 for none)" value={cap} onChange={setCap} unit="m²" hint="Many protocols cap at 2.0 or 2.2 m²" /></div>
        <Result label={`Dose at ${fmt(dose.bsaUsed, 2)} m²${dose.capped ? " (capped)" : ""}`} value={`${fmt(dose.dose, 0)} mg`} copy={`${fmt(dose.dose, 0)} mg (${mgm2} mg/m² × ${fmt(dose.bsaUsed, 2)} m²${dose.capped ? ", BSA capped" : ""})`} />
      </Card>

      <Card id="carboplatin" title="Creatinine clearance and carboplatin (Calvert)" formula="CrCl = (140 − age) × weight × (0.85 if female) / (72 × Cr mg/dL). Dose = AUC × (GFR + 25)" cite={[CITATIONS.cockcroftGault, CITATIONS.calvert, CITATIONS.gfrCap]}>
        <div className="grid grid-cols-2 gap-3">
          <Num label="Age" value={age} onChange={setAge} unit="years" />
          <label className="block text-sm"><span className="text-muted">Serum creatinine</span>
            <span className="mt-1 flex items-center gap-2"><input type="number" inputMode="decimal" step="any" value={cr} onChange={(e) => setCr(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm tabular-nums" />
              <select value={crUnit} onChange={(e) => setCrUnit(e.target.value as "umol" | "mgdl")} className="rounded-lg border border-border bg-card px-2 py-1.5 text-xs"><option value="umol">µmol/L</option><option value="mgdl">mg/dL</option></select></span></label>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="text-muted">Weight {fmt(W, 0)} kg from above</span>
          <label className="inline-flex items-center gap-2"><input type="checkbox" checked={female} onChange={(e) => setFemale(e.target.checked)} /> Female (× 0.85)</label>
        </div>
        <Result label="Creatinine clearance (Cockcroft-Gault)" value={`${fmt(crcl, 0)} mL/min`} copy={`CrCl ${fmt(crcl, 0)} mL/min (Cockcroft-Gault)`} />
        <div className="grid grid-cols-2 gap-3 items-end"><Num label="Target AUC" value={auc} onChange={setAuc} unit="mg/mL·min" /><label className="inline-flex items-center gap-2 text-sm pb-2"><input type="checkbox" checked={gfrCap} onChange={(e) => setGfrCap(e.target.checked)} /> Cap GFR at 125</label></div>
        <Result label={`Carboplatin dose (GFR used ${fmt(carbo.gfrUsed, 0)}${carbo.capped ? ", capped" : ""})`} value={`${fmt(carbo.dose, 0)} mg`} copy={`Carboplatin ${fmt(carbo.dose, 0)} mg (AUC ${auc} × (${fmt(carbo.gfrUsed, 0)} + 25))`} />
        <p className="text-[11px] text-muted">Cockcroft-Gault is an estimate; a measured GFR is preferred at extremes of weight, age or muscle mass. Actual body weight is shown; some centres use adjusted weight above 120% of ideal.</p>
      </Card>

      <Card id="anc" title="Absolute neutrophil count" formula="ANC = WBC × (neutrophils % + bands %) / 100" cite={[CITATIONS.ctcae]}>
        <div className="grid grid-cols-3 gap-3"><Num label="WBC" value={wbc} onChange={setWbc} unit="×10⁹/L" /><Num label="Neutrophils" value={seg} onChange={setSeg} unit="%" /><Num label="Bands" value={band} onChange={setBand} unit="%" /></div>
        <Result label={`ANC · CTCAE grade ${grade}${grade === 0 ? " (normal)" : ""}`} value={`${fmt(ancV, 2)} ×10⁹/L`} copy={`ANC ${fmt(ancV, 2)} ×10⁹/L, CTCAE grade ${grade}`} tone={GRADE_TONE[grade]} />
        <p className="text-[11px] text-muted">Grades: 1 below 2.0, 2 below 1.5, 3 below 1.0, 4 below 0.5 ×10⁹/L. Febrile neutropenia is ANC below 0.5 (or expected to fall) with a single temperature of 38.3 °C or 38.0 °C sustained over an hour.</p>
      </Card>

      <Card id="calcium" title="Albumin-corrected calcium" formula="mmol/L: Ca + 0.02 × (40 − albumin g/L). mg/dL: Ca + 0.8 × (4.0 − albumin g/dL)" cite={[CITATIONS.payne]}>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm"><span className="text-muted">Total calcium</span>
            <span className="mt-1 flex items-center gap-2"><input type="number" inputMode="decimal" step="any" value={ca} onChange={(e) => setCa(e.target.value)} className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm tabular-nums" />
              <select value={caUnit} onChange={(e) => setCaUnit(e.target.value as "mmol" | "mgdl")} className="rounded-lg border border-border bg-card px-2 py-1.5 text-xs"><option value="mmol">mmol/L</option><option value="mgdl">mg/dL</option></select></span></label>
          <Num label="Albumin" value={alb} onChange={setAlb} unit={caUnit === "mmol" ? "g/L" : "g/dL"} />
        </div>
        <Result label="Corrected calcium" value={`${fmt(corrCa, 2)} ${caUnit === "mmol" ? "mmol/L" : "mg/dL"}`} copy={`Corrected calcium ${fmt(corrCa, 2)} ${caUnit === "mmol" ? "mmol/L" : "mg/dL"}`} tone={(caUnit === "mmol" ? corrCa > 2.6 : corrCa > 10.5) ? "bg-rose-50 dark:bg-rose-950/30" : ""} />
        <p className="text-[11px] text-muted">Ionised calcium is more reliable when albumin is very low or pH is abnormal. Hypercalcaemia of malignancy is usually defined above 2.6 mmol/L (10.5 mg/dL) corrected.</p>
      </Card>

      <Card id="recist" title="RECIST 1.1 target-lesion response" formula="PR: ≥30% decrease from baseline. PD: ≥20% increase from nadir and ≥5 mm absolute, or new lesions. CR: all target lesions gone" cite={[CITATIONS.recist]}>
        <div className="grid grid-cols-3 gap-3"><Num label="Baseline sum" value={base} onChange={setBase} unit="mm" /><Num label="Nadir sum" value={nadir} onChange={setNadir} unit="mm" hint="Smallest sum so far (baseline if none)" /><Num label="Current sum" value={cur} onChange={setCur} unit="mm" /></div>
        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={newLes} onChange={(e) => setNewLes(e.target.checked)} /> New lesion(s) or unequivocal non-target progression</label>
        <div className="grid grid-cols-2 gap-2">
          <Result label="Change from baseline" value={`${rc.fromBaselinePct > 0 ? "+" : ""}${fmt(rc.fromBaselinePct, 1)}%`} copy={`${fmt(rc.fromBaselinePct, 1)}% from baseline`} />
          <Result label="Change from nadir" value={`${rc.fromNadirPct > 0 ? "+" : ""}${Number.isFinite(rc.fromNadirPct) ? fmt(rc.fromNadirPct, 1) : "∞"}% (${rc.absoluteFromNadirMm > 0 ? "+" : ""}${fmt(rc.absoluteFromNadirMm, 0)} mm)`} copy={`${fmt(rc.fromNadirPct, 1)}% from nadir, ${fmt(rc.absoluteFromNadirMm, 0)} mm`} />
        </div>
        <Result label="Target-lesion response" value={{ CR: "Complete response", PR: "Partial response", SD: "Stable disease", PD: "Progressive disease" }[rc.response]} copy={`RECIST 1.1: ${rc.response} (${fmt(rc.fromBaselinePct, 1)}% from baseline, ${fmt(rc.fromNadirPct, 1)}% from nadir)`} tone={RESP_TONE[rc.response]} />
        <p className="text-[11px] text-muted">Sums of the longest diameters of up to five target lesions (two per organ); lymph nodes by short axis, counted as normal below 10 mm. Overall response also depends on non-target lesions.</p>
      </Card>

      <Card id="anthracycline" title="Cumulative anthracycline dose" formula="Doxorubicin equivalent = Σ dose × factor (epirubicin 0.8, daunorubicin 0.6, idarubicin 5, mitoxantrone 10.5)" cite={[CITATIONS.esc]}>
        <div className="space-y-2">
          {anth.map((a, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
              <label className="block text-sm"><span className="text-muted">Agent</span><select value={a.agent} onChange={(e) => setAnth((s) => s.map((x, j) => j === i ? { ...x, agent: e.target.value as Anthracycline } : x))} className="mt-1 w-full rounded-lg border border-border bg-card px-2 py-1.5 text-sm">{(Object.keys(ANTHRACYCLINE_FACTORS) as Anthracycline[]).map((k) => <option key={k} value={k}>{k} (× {ANTHRACYCLINE_FACTORS[k]})</option>)}</select></label>
              <Num label="Cumulative dose" value={a.mg} onChange={(v) => setAnth((s) => s.map((x, j) => j === i ? { ...x, mg: v } : x))} unit="mg/m²" />
              <button type="button" onClick={() => setAnth((s) => s.filter((_, j) => j !== i))} className="chip border border-border bg-card hover:bg-foreground/5 mb-1.5" aria-label="Remove row">×</button>
            </div>
          ))}
          <button type="button" onClick={() => setAnth((s) => [...s, { agent: "doxorubicin", mg: "0" }])} className="text-sm underline text-muted">Add another agent</button>
        </div>
        <Result label={`Doxorubicin-equivalent · ${risk === "high" ? "very high cardiotoxicity risk (400 or above)" : risk === "raised" ? "raised risk (250 or above)" : "below 250"}`} value={`${fmt(cum.equivalent, 0)} mg/m²`} copy={`Cumulative doxorubicin-equivalent ${fmt(cum.equivalent, 0)} mg/m²`} tone={risk === "high" ? "bg-rose-100 dark:bg-rose-900/40" : risk === "raised" ? "bg-amber-50 dark:bg-amber-950/20" : ""} />
        <p className="text-[11px] text-muted">ESC 2022 treats 250 mg/m² or more of doxorubicin-equivalent as a high-risk feature and 400 mg/m² or more as very high; risk is continuous and rises with chest radiotherapy, age and cardiac history.</p>
      </Card>

      <Card id="banding" title="Dose banding" formula="Round to the nearest band; accept if |banded − exact| / exact ≤ tolerance" cite={[CITATIONS.doseBanding]}>
        <div className="grid grid-cols-3 gap-3"><Num label="Calculated dose" value={bandDose} onChange={setBandDose} unit="mg" /><Num label="Band step" value={bandStep} onChange={setBandStep} unit="mg" /><Num label="Tolerance" value={bandTol} onChange={setBandTol} unit="%" hint="NHS England uses 6%" /></div>
        <Result label={db.withinTolerance ? `Banded dose (${db.deviationPct > 0 ? "+" : ""}${fmt(db.deviationPct, 1)}%)` : `Outside tolerance (${fmt(db.deviationPct, 1)}%): use the exact dose`} value={db.withinTolerance ? `${fmt(db.banded, 0)} mg` : `${fmt(n(bandDose), 0)} mg`} copy={db.withinTolerance ? `${fmt(db.banded, 0)} mg (banded from ${bandDose})` : `${bandDose} mg (banding outside tolerance)`} tone={db.withinTolerance ? "" : "bg-amber-50 dark:bg-amber-950/20"} />
        <p className="text-[11px] text-muted">This is a generic rounding rule. National banding tables give agent-specific bands and vial combinations; use them where they exist.</p>
      </Card>
    </div>
  );
}
