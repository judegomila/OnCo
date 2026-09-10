"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

const W = 288, H_EST = 150, GAP = 14;

type Pos = { left: number; top: number };

/** Position a fixed popover next to the pointer (or an element for keyboard users), kept inside the viewport. */
export function placeNear(x: number, y: number): Pos {
  const vw = window.innerWidth, vh = window.innerHeight;
  let left = x + GAP, top = y + GAP;
  if (left + W > vw - 8) left = Math.max(8, x - W - GAP);
  if (top + H_EST > vh - 8) top = Math.max(8, y - H_EST - GAP);
  return { left, top };
}

/**
 * Quick-reference popover: hover or focus any technical name to see a one-line explanation and,
 * when the name is an object in the corpus, a link to its page. The popover follows the pointer so it
 * appears where the reader is looking, even when the name wraps across two lines.
 */
export function Tip({ title, text, href, linkLabel = "Open page →", children, className = "", inline = true }: {
  title?: string; text: string; href?: string; linkLabel?: string; children: ReactNode; className?: string; inline?: boolean;
}) {
  const [pos, setPos] = useState<Pos | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | null>(null);
  const last = useRef<{ x: number; y: number } | null>(null);

  const clear = () => { if (timer.current) window.clearTimeout(timer.current); timer.current = null; };
  const showAt = (x: number, y: number) => { clear(); timer.current = window.setTimeout(() => setPos(placeNear(x, y)), 140); };
  const move = (e: React.MouseEvent) => { last.current = { x: e.clientX, y: e.clientY }; if (pos) setPos(placeNear(e.clientX, e.clientY)); else showAt(e.clientX, e.clientY); };
  const focus = () => { const r = ref.current?.getBoundingClientRect(); if (r) showAt(r.left, r.bottom); };
  const hide = () => { clear(); timer.current = window.setTimeout(() => setPos(null), 120); };
  useEffect(() => () => clear(), []);

  return (
    <span ref={ref} className={`${inline ? "inline" : "inline-block"} ${className}`} onMouseEnter={move} onMouseMove={move} onMouseLeave={hide} onFocus={focus} onBlur={hide}>
      {children}
      {pos && (
        <span role="tooltip" style={{ left: pos.left, top: pos.top, width: W }} className="fixed z-[80] max-w-[85vw] card shadow-xl p-3 text-sm text-left not-italic font-normal normal-case tracking-normal leading-snug pointer-events-none">
          {title && <span className="block font-semibold mb-0.5 text-foreground">{title}</span>}
          <span className="block text-muted">{text}</span>
          {href && <Link href={href} className="mt-1.5 inline-block text-xs underline text-foreground pointer-events-auto">{linkLabel}</Link>}
        </span>
      )}
    </span>
  );
}

/** Plain-English explanations for technical column headers used across the tables. */
export const COLUMN_TIPS: Record<string, string> = {
  "Phase / status": "How far along it is. Approved means a regulator has cleared it; phase 3 is the last big trial; phase 1 is first-in-human; preclinical is lab only.",
  Phase: "Trial stage: phase 1 tests safety and dose, phase 2 looks for activity, phase 3 compares against the standard of care.",
  Status: "Where it stands today: approved, in trials, established practice, emerging, historic, or withdrawn.",
  Modality: "The kind of treatment: a small molecule pill, an antibody, an antibody-drug conjugate, a cell therapy, a radioligand, and so on.",
  Mechanism: "How the treatment works at the molecular level: what it binds or blocks and what that does to the cancer cell.",
  Target: "The protein or molecule the treatment is aimed at.",
  Targets: "The proteins or molecules the treatment is aimed at.",
  Payload: "The toxic drug carried by an antibody-drug conjugate and released inside the cancer cell.",
  Linker: "The chemical bridge that holds an ADC's payload to its antibody and decides where it is released.",
  Maturity: "How much evidence exists: speculative (no data), preclinical evidence (lab or animal), early clinical (small human studies), being tested at scale (large trials).",
  Confidence: "How sure we are of the record, based on the strength and recency of its sources.",
  Evidence: "The strength of what has been shown in people: randomised trials rank above single-arm studies, which rank above case series.",
  Endpoint: "What the trial measured to decide success: overall survival, progression-free survival, response rate, or a surrogate.",
  ORR: "Objective response rate: the share of patients whose tumours shrank by a set amount.",
  PFS: "Progression-free survival: how long patients live without the cancer growing.",
  OS: "Overall survival: how long patients live, whatever the cause of death.",
  HR: "Hazard ratio: below 1 means the treatment lowered the rate of the bad event; 0.7 means about 30 percent lower.",
  Enrolled: "How many patients joined the trial.",
  Sponsor: "The company or institution that runs and pays for the trial.",
  Country: "Where the institution is based.",
  Type: "What kind of organisation or object this is.",
  Fronts: "The broad areas of oncology this belongs to: imaging, surgery, radiotherapy, immunotherapy, and so on.",
  Front: "The broad area of oncology this belongs to.",
  Technologies: "The technology classes this uses or belongs to.",
  Technology: "The technology class this uses or belongs to.",
  Cancers: "The cancer types this applies to.",
  Cancer: "The cancer type this applies to.",
  Companies: "The companies developing or selling this.",
  Products: "The drugs, tests and devices connected to this.",
  Trials: "The clinical trials connected to this.",
  Approvals: "Regulatory approvals by region.",
  Group: "The broad family of cancer: solid tumour, blood cancer, brain, skin, and so on.",
  "Who gets it, and what has changed": "How many people get this cancer and where, and what has improved for them.",
  Stage: "Where in the pipeline the bottleneck bites: biology, detection, trials, regulation, access, data, funding or culture.",
  Severity: "Our judgement of how much this bottleneck slows the whole effort: critical, major or moderate.",
  "Who acts": "Who would have to move for this idea to happen: researchers, clinics, industry, regulators, payers, policy makers, patients, data holders, philanthropy or engineers.",
  Cost: "Rough cost to try the idea: small is under one million dollars, medium up to fifty million, large above that.",
  "Ideas to fix it": "How many ideas in the corpus attack this bottleneck.",
  Papers: "Research papers listed for this person.",
  "Papers listed": "Research papers listed for this person in the corpus.",
  Specialisms: "What this person works on.",
  Institution: "Where this person works.",
  Holds: "What the collection or database contains.",
  Licence: "The terms under which the data can be reused.",
  Isotope: "The radioactive atom that delivers the radiation in a radioligand therapy.",
  "Half-life": "How long it takes for half of the isotope to decay; sets shipping and dosing logistics.",
  Prevalence: "How often the target or alteration is found in this cancer.",
  Year: "Year of the event, approval or publication.",
  Role: "The person's job title or function.",
  Score: "A composite ranking score; higher is stronger. See the method note on the page.",
  Emetogenicity: "Risk of vomiting without prophylaxis, by the most emetogenic component: high (over 90%), moderate (30 to 90%), low (10 to 30%), minimal (under 10%).",
  "G-CSF": "Whether growth-factor support is given from cycle 1: recommended above 20% febrile-neutropenia risk, consider at 10 to 20%.",
  Intent: "What the regimen is for: cure, control, or symptom relief, and in which setting.",
  Regimen: "A named combination and schedule of drugs, with doses and cycle length.",
};
