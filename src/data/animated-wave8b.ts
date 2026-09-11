/**
 * Wave 8 of animated technology schematics, part two: forty more of the technologies that until now still fell back to a
 * generic front placeholder (CBT, music, ginseng and other supportive-care evidence; DNA origami, epigenetic and in vivo
 * editing, senolytics and tumour microbiome targeting; Evo 2, Merlin, CT-FM, Med-Gemini and other AI models; mesothelioma
 * surgery, VHEE radiotherapy, release testing and cell-therapy orchestration; internet repurposing claims, herbal and
 * traditional systems). Same conventions as ./animated-wave8.ts, which merges this registry into WAVE8; helpers are shared
 * in ./animated-wave8-kit.ts.
 */
import { arrow, box, cone, cylinder, disc, ellipsoid, helix, line, movePart, octahedron, polyline, ring, setAlpha, sphere, torus, type Mesh, type Part, type Vec3 } from "@/lib/wireframe";
import { L, Q, TAU, axes, bar, beam, blob, building, capsule, cascade, cell, clamp, clockFace, cloud, cross, doc, figure, frame, grow, hide, leaf, model, mote, moveTo, organ, protein, pulse, put, quad, scene, screen, show, slide, small, stageOf, tick, ticks, tube, vial } from "./animated-wave8-kit";

/** Part two of the wave 8 registry (function declarations hoist). */
export const WAVE8B: Record<string, () => Mesh> = {
  "cbt-fatigue-distress": cbtFatigue,
  "dna-origami-nanorobots": dnaOrigami,
  "epigenetic-editing": epigeneticEditing,
  "evo2": evo2,
  "pleurectomy-decortication": pleurectomyDecortication,
  "fenbendazole-ivermectin-repurposing-claims": repurposingClaims,
  "in-vivo-gene-editing-cancer": inVivoEditing,
  "melatonin-cancer": melatoninCancer,
  "merlin-ct": merlinCt,
  "music-therapy-cancer": musicTherapy,
  "n-of-1-platforms": nOf1Platforms,
  "quantum-dot-imaging": quantumDotImaging,
  "senescence-targeting": senescenceTargeting,
  "structural-biology-infrastructure": structuralBiologyInfra,
  "tumour-microbiome-targeting": tumourMicrobiome,
  "vhee-radiotherapy": vheeRadiotherapy,
  "american-ginseng-fatigue": americanGinseng,
  "antibody-oligonucleotide-conjugates": antibodyOligoConjugates,
  "cell-therapy-release-testing": releaseTesting,
  "ct-fm": ctFm,
  "curcumin-turmeric": curcuminTurmeric,
  "engineered-bacteria-therapy": engineeredBacteria,
  "ginger-nausea": gingerNausea,
  "med-gemini": medGemini,
  "medicinal-mushrooms-reishi-turkey-tail": medicinalMushrooms,
  "bionemo": bionemo,
  "oral-visual-screening": oralVisualScreening,
  "titan": titanModel,
  "traditional-chinese-herbal-medicine": chineseHerbalMedicine,
  "aidoc-care": aidocCare,
  "allogeneic-cell-banking": allogeneicCellBanking,
  "atlas-aignostics": atlasAignostics,
  "ayurvedic-medicine-cancer": ayurvedicMedicine,
  "cell-therapy-orchestration-software": orchestrationSoftware,
  "chief": chiefModel,
  "dance-movement-therapy": danceMovementTherapy,
  "essiac-herbal-cancer-cures": essiacHoxsey,
  "gears": gearsBenchmarks,
  "h-optimus": hOptimus,
  "homeopathy-cancer": homeopathy,
};

// ---------------------------------------------------------------- 41. cognitive behavioural therapy for fatigue and distress
export function cbtFatigue(): Mesh {
  const sc = scene();
  const P: Vec3 = [-2.0, -0.1, 0];
  const person = put(sc, "person", figure("soft"), { at: P, scale: 1.1 });
  const CYC: Vec3 = [0.3, 0.9, 0];
  const cyc = put(sc, "cyc", ring(0.75, 16, "hot", "z"), { at: CYC });
  const nodes: Part[] = []; ["rest", "worry", "decond"].forEach((n, i) => { const a = Math.PI / 2 + (TAU * i) / 3; nodes.push(put(sc, n, blob(0.16, "hot"), { at: [CYC[0] + 0.75 * Math.cos(a), CYC[1] + 0.75 * Math.sin(a), 0.1] })); });
  const runner = put(sc, "runner", mote(0.08, "hot"), { at: [CYC[0], CYC[1] + 0.75, 0.15] });
  const therapist = put(sc, "therapist", figure("accent"), { at: [2.2, 0.2, 0], scale: 0.8 });
  const scr = put(sc, "scr", screen(0.8, 0.55, "accent"), { at: [2.2, 1.6, 0] });
  const steps: Part[] = []; for (let i = 0; i < 5; i++) steps.push(put(sc, `st${i}`, bar(-0.6 + 0.35 * i, 0.25 + 0.2 * i, 0.28, "accent"), { at: [0, -2.0, 0] }));
  const cut = put(sc, "cut", cross([CYC[0] + 0.75, CYC[1], 0.15], 0.2, "accent"));
  const f0 = put(sc, "f0", bar(1.5, 1.1, 0.25, "soft"), { at: [0, -2.0, 0] });
  const f1 = put(sc, "f1", bar(1.9, 0.5, 0.25, "accent"), { at: [0, -2.0, 0] });
  const yrs = put(sc, "yrs", ticks(1.3, 2.9, -2.2, 3, "soft"));
  const guides: Part[] = []; for (let i = 0; i < 2; i++) guides.push(put(sc, `g${i}`, doc(0.5, 0.6, 3, "soft"), { at: [-2.6 + 0.6 * i, -1.7, 0] }));
  sc.mesh.labels = [L([CYC[0], CYC[1] + 1.15, 0], "Rest, worry and deconditioning keep fatigue going"), L([2.2, 2.1, 0], "Psychologist, nurse or online programme"), L([0.1, -2.45, 0], "Graded activity and cognitive restructuring"), L([2.1, -2.55, 0], "112 survivors (JCO 2006): more than half improved vs a quarter; held at two years")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, therapist, scr, ...steps, cut, f0, f1, yrs, ...guides);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, person, 0.6 + 0.4 * u); setAlpha(alpha, cyc, clamp(u * 2) * 0.7); cascade(alpha, nodes, clamp(u * 1.5)); const a = Math.PI / 2 - t * TAU * 3; moveTo(pts, base, runner, [CYC[0], CYC[1] + 0.75, 0.15], [CYC[0] + 0.75 * Math.cos(a), CYC[1] + 0.75 * Math.sin(a), 0.15], 1); return { caption: "1 · After treatment ends, fatigue can persist for years: unhelpful beliefs about fatigue, irregular sleep and activity, fear of recurrence and low mood feed one another" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, cyc, 0.7); nodes.forEach((n) => setAlpha(alpha, n, 1)); const a = Math.PI / 2 - t * TAU * 3; moveTo(pts, base, runner, [CYC[0], CYC[1] + 0.75, 0.15], [CYC[0] + 0.75 * Math.cos(a), CYC[1] + 0.75 * Math.sin(a), 0.15], 1); setAlpha(alpha, therapist, clamp(u * 2)); setAlpha(alpha, scr, clamp(u * 2 - 0.5)); cascade(alpha, steps, clamp(u * 1.5 - 0.3)); return { caption: "2 · Cognitive behavioural therapy adapted to cancer uses behavioural activation, graded activity and cognitive restructuring, delivered by trained psychologists, nurses or online programmes" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, cyc, 0.7 - 0.5 * u); nodes.forEach((n) => setAlpha(alpha, n, 1 - 0.5 * u)); const a = Math.PI / 2 - t * TAU * 3 * (1 - u); moveTo(pts, base, runner, [CYC[0], CYC[1] + 0.75, 0.15], [CYC[0] + 0.75 * Math.cos(a), CYC[1] + 0.75 * Math.sin(a), 0.15], 1); setAlpha(alpha, runner, 1 - 0.6 * u); setAlpha(alpha, therapist, 1); setAlpha(alpha, scr, 1); steps.forEach((st) => setAlpha(alpha, st, 1)); setAlpha(alpha, cut, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); grow(alpha, f0, clamp(u * 2 - 0.4)); grow(alpha, f1, clamp(u * 2 - 0.8)); return { caption: "3 · The cycle is interrupted: in a randomised trial of 112 severely fatigued disease-free survivors (JCO 2006) more than half improved clinically compared with a quarter on the waiting list" }; }
    const u = Q(t, 3); setAlpha(alpha, cyc, 0.2); nodes.forEach((n) => setAlpha(alpha, n, 0.5)); moveTo(pts, base, runner, [CYC[0], CYC[1] + 0.75, 0.15], [CYC[0] + 0.75, CYC[1], 0.15], 1); setAlpha(alpha, runner, 0.4); setAlpha(alpha, therapist, 1); setAlpha(alpha, scr, 1); steps.forEach((st) => setAlpha(alpha, st, 1)); setAlpha(alpha, cut, 0.8); show(alpha, 1, f0, f1);
    grow(alpha, yrs, clamp(u * 2)); cascade(alpha, guides, clamp(u * 2 - 0.5));
    return { caption: "4 · Gains held at two years; the 2024 SIO-ASCO fatigue guideline and the 2023 anxiety and depression guideline both recommend it, and the limits are therapist capacity, weeks of engagement and trials mostly in survivors rather than advanced disease" };
  });
}

// ---------------------------------------------------------------- 42. DNA origami nanorobots
export function dnaOrigami(): Mesh {
  const sc = scene();
  const V: Vec3 = [0, -0.9, 0];
  put(sc, "vessel", tube(0.45, 5.0, "soft"), { at: V });
  const wallMark = put(sc, "mark", mote(0.08, "hot"), { at: [0.6, V[1] + 0.42, 0.2] });
  const B0: Vec3 = [-2.3, 0.9, 0];
  const bodyP = put(sc, "body", box(0.7, 0.35, 0.35, "accent", true), { at: B0 });
  const lid = put(sc, "lid", quad(0.7, 0.35, "accent"), { at: [B0[0], B0[1] + 0.18, 0], rotX: Math.PI / 2 });
  const locks: Part[] = []; for (let i = 0; i < 2; i++) locks.push(put(sc, `lk${i}`, ring(0.07, 6, "hot", "z"), { at: [B0[0] - 0.25 + 0.5 * i, B0[1] + 0.2, 0.2] }));
  const payload: Part[] = []; for (let i = 0; i < 4; i++) payload.push(put(sc, `pl${i}`, mote(0.05, "hot"), { at: [B0[0] - 0.2 + 0.13 * i, B0[1], 0.1] }));
  const clot = put(sc, "clot", blob(0.35, "hot"), { at: [0.9, V[1], 0.1] });
  const tum = put(sc, "tum", blob(0.55, "hot"), { at: [0.9, V[1] + 1.1, -0.1] });
  const necro = put(sc, "necro", ring(0.6, 12, "soft", "z"), { at: [0.9, V[1] + 1.1, 0.1] });
  const nuclease = put(sc, "nuc", mote(0.1, "soft"), { at: [-2.6, -2.0, 0] });
  const nucX = put(sc, "nucX", cross([-2.0, -2.0, 0.05], 0.15));
  const mouse = put(sc, "mouse", ellipsoid(0.4, 0.2, 0.2, 3, 8, "soft", true), { at: [2.4, 1.4, 0] });
  const human = put(sc, "human", figure("soft"), { at: [2.4, 0.3, 0], scale: 0.5 });
  const humanX = put(sc, "humanX", cross([2.4, 0.3, 0.1], 0.3));
  sc.mesh.labels = [L([B0[0], B0[1] + 0.75, 0], "Folded DNA container held shut by aptamer locks"), L([0.6, V[1] - 0.8, 0], "Trigger: nucleolin on tumour vessel wall"), L([0.9, V[1] + 1.9, 0], "Thrombin payload clots the tumour's blood supply"), L([0.3, -2.3, 0], "Mice only; nuclease degradation, clearance, thrombosis risk, manufacturing scale")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, clot, necro, nuclease, nucX, mouse, human, humanX);
    setAlpha(alpha, tum, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, bodyP, 1); setAlpha(alpha, lid, 1); locks.forEach((l) => setAlpha(alpha, l, clamp(u * 2 - 0.5) * (0.6 + 0.4 * pulse(t, 4)))); payload.forEach((p) => setAlpha(alpha, p, clamp(u * 2 - 1) * 0.6)); setAlpha(alpha, wallMark, 0.5); return { caption: "1 · Scaffolded DNA origami folds strands into a hollow container; its lid is held shut by aptamer locks that open only on binding a tumour marker such as nucleolin" }; }
    if (s === 1) { const u = Q(t, 1); locks.forEach((l) => setAlpha(alpha, l, 1)); payload.forEach((p) => setAlpha(alpha, p, 0.6)); const to: Vec3 = [0.6, V[1] + 0.1, 0.1]; [bodyP, lid, ...locks, ...payload].forEach((p) => moveTo(pts, base, p, B0, [B0[0] + (to[0] - B0[0]) * u, B0[1] + (to[1] - B0[1]) * u, B0[2]], 1)); setAlpha(alpha, wallMark, 0.5 + 0.5 * clamp(u * 2 - 1) * pulse(t, 4)); return { caption: "2 · Injected into the blood, the closed container circulates harmlessly until it reaches tumour vasculature, where the trigger molecule is displayed" }; }
    if (s === 2) { const u = Q(t, 2); const to: Vec3 = [0.6, V[1] + 0.1, 0.1]; [bodyP, ...locks].forEach((p) => moveTo(pts, base, p, B0, to, 1)); setAlpha(alpha, wallMark, 1); locks.forEach((l) => setAlpha(alpha, l, 1 - 0.7 * clamp(u * 2))); moveTo(pts, base, lid, B0, to, 1); movePart(pts, base, lid, [0, 0.2 * clamp(u * 2), 0], 1, 0.9 * clamp(u * 2)); payload.forEach((p, i) => { setAlpha(alpha, p, 1); const v = clamp(u * 2 - 0.5 - 0.1 * i); moveTo(pts, base, p, B0, [to[0] + 0.3 * v + 0.1 * i * v, to[1] - 0.1 * v, to[2] + 0.1], 1); }); setAlpha(alpha, clot, clamp(u * 2 - 1)); movePart(pts, base, clot, [0, 0, 0], 0.3 + 0.7 * clamp(u * 2 - 1)); return { caption: "3 · Binding opens the lid and exposes the payload only where the trigger is present; the best-known demonstration released thrombin, clotting tumour vessels in mice and causing necrosis" }; }
    const u = Q(t, 3); const to: Vec3 = [0.6, V[1] + 0.1, 0.1]; [bodyP, ...locks].forEach((p) => moveTo(pts, base, p, B0, to, 1)); setAlpha(alpha, wallMark, 1); locks.forEach((l) => setAlpha(alpha, l, 0.3)); moveTo(pts, base, lid, B0, to, 1); movePart(pts, base, lid, [0, 0.2, 0], 1, 0.9); payload.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, B0, [to[0] + 0.3 + 0.1 * i, to[1] - 0.1, to[2] + 0.1], 1); }); setAlpha(alpha, clot, 1); setAlpha(alpha, tum, 0.5 - 0.3 * u); setAlpha(alpha, necro, clamp(u * 2) * 0.7);
    setAlpha(alpha, nuclease, clamp(u * 2 - 0.3)); moveTo(pts, base, nuclease, [-2.6, -2.0, 0], [-2.1, -2.0, 0], clamp(u * 2 - 0.3)); setAlpha(alpha, nucX, clamp(u * 2 - 0.8)); setAlpha(alpha, mouse, clamp(u * 2 - 0.5)); setAlpha(alpha, human, clamp(u * 2 - 0.8) * 0.6); setAlpha(alpha, humanX, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · A 2024 Karolinska design displays death-receptor ligands only at tumour pH; nothing in the class has entered human trials, and nuclease degradation, rapid clearance, the systemic risk of thrombosis designs and manufacturing cost remain open" };
  });
}

// ---------------------------------------------------------------- 43. epigenetic editing (durable gene silencing)
export function epigeneticEditing(): Mesh {
  const sc = scene();
  const dnaP = put(sc, "dna", helix(0.14, 4.0, 8, 56, "soft"), { at: [-0.3, 0.9, 0], rotZ: Math.PI / 2 });
  const promoter = put(sc, "promoter", quad(0.8, 0.4, "hot"), { at: [0.3, 0.9, 0.05] });
  const txArrow = put(sc, "tx", arrow([0.3, 1.2, 0.1], [1.3, 1.2, 0.1], "hot", 0.12));
  const editor = put(sc, "editor", blob(0.32, "accent"), { at: [-2.6, 2.0, 0] });
  const dom1 = put(sc, "dnmt", small(0.13, "accent"), { at: [-2.95, 2.15, 0.1] });
  const dom2 = put(sc, "krab", small(0.13, "accent"), { at: [-2.3, 2.25, 0.1] });
  const guide = put(sc, "guide", helix(0.05, 0.5, 3, 12, "hot"), { at: [-2.6, 1.55, 0.1] });
  const marks: Part[] = []; for (let i = 0; i < 5; i++) marks.push(put(sc, `mk${i}`, mote(0.06, "accent"), { at: [0.3 - 0.3 + 0.15 * i, 0.9 + 0.25, 0.15] }));
  const txX = put(sc, "txX", cross([0.8, 1.2, 0.15], 0.15, "accent"));
  const daughters: Part[] = []; for (let i = 0; i < 2; i++) daughters.push(put(sc, `d${i}`, cell(0.4, "soft"), { at: [-1.5 + 1.2 * i, -1.2, 0] }));
  const dMarks: Part[] = []; for (let i = 0; i < 2; i++) dMarks.push(put(sc, `dm${i}`, mote(0.06, "accent"), { at: [-1.5 + 1.2 * i, -1.2, 0.3] }));
  const liver = put(sc, "liver", organ(0.55, 0.38, 0.3), { at: [1.8, -1.3, 0] });
  const liverOk = put(sc, "liverOk", tick([2.45, -1.2, 0.05], 0.16));
  const tumCloud = put(sc, "tumCloud", cloud(9, 0.45, "accent", 4), { at: [-2.5, -0.3, 0] });
  const escape = put(sc, "escape", mote(0.09, "hot"), { at: [-2.2, -0.15, 0.1] });
  const noTrial = put(sc, "noTrial", cross([2.7, -2.1, 0.05], 0.2));
  sc.mesh.labels = [L([0.3, 1.75, 0], "Promoter of an undruggable driver such as MYC"), L([-2.6, 2.7, 0], "dCas9 fused to DNMT3A/3L and KRAB, no DNA cut"), L([-0.9, -2.0, 0], "Methylation and repressive marks copied to daughter cells"), L([1.8, -2.05, 0], "In the clinic for hepatitis B; no oncology trial by September 2026")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...marks, txX, ...daughters, ...dMarks, liver, liverOk, tumCloud, escape, noTrial);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, dnaP, 0.8); setAlpha(alpha, promoter, 0.5 + 0.5 * pulse(t, 4)); setAlpha(alpha, txArrow, clamp(u * 2 - 0.3)); movePart(pts, base, txArrow, [0.3 * ((t * 4) % 1), 0, 0], 1); [editor, dom1, dom2, guide].forEach((p) => setAlpha(alpha, p, clamp(u * 2 - 1))); return { caption: "1 · A cancer driver with no drug pocket is transcribed from its promoter; the aim is to switch it off for good without changing a single letter of the DNA" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, txArrow, 1 - 0.6 * clamp(u * 2 - 1)); const d: Vec3 = [0.3 - -2.6, 0.9 + 0.55 - 2.0, 0.2]; [editor, dom1, dom2, guide].forEach((p) => movePart(pts, base, p, [d[0] * u, d[1] * u, d[2] * u], 1)); marks.forEach((m, i) => setAlpha(alpha, m, clamp(u * 3 - 1.5 - 0.2 * i))); return { caption: "2 · A dead Cas9, guided to the promoter, carries DNA methyltransferase (DNMT3A/3L) and a KRAB repressor domain and deposits CpG methylation and repressive histone marks; there is no cut, so no translocation risk" }; }
    if (s === 2) { const u = Q(t, 2); const d: Vec3 = [0.3 - -2.6, 0.9 + 0.55 - 2.0, 0.2]; [editor, dom1, dom2, guide].forEach((p) => { movePart(pts, base, p, d, 1); setAlpha(alpha, p, 1 - 0.6 * u); }); marks.forEach((m) => setAlpha(alpha, m, 1)); setAlpha(alpha, txArrow, 0.3); setAlpha(alpha, txX, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); daughters.forEach((c, i) => { setAlpha(alpha, c, clamp(u * 2 - 0.5)); moveTo(pts, base, c, [-1.5 + 1.2 * i, -1.2, 0], [-1.5 + 1.2 * i + (i === 0 ? -0.3 : 0.3) * clamp(u * 2 - 1), -1.2, 0], 1); }); dMarks.forEach((m, i) => { setAlpha(alpha, m, clamp(u * 2 - 0.8)); moveTo(pts, base, m, [-1.5 + 1.2 * i, -1.2, 0.3], [-1.5 + 1.2 * i + (i === 0 ? -0.3 : 0.3) * clamp(u * 2 - 1), -1.2, 0.3], 1); }); return { caption: "3 · The silenced state is heritable: when the cell divides the marks are copied to daughter cells, so the gene stays off; the effect is potentially reversible" }; }
    const u = Q(t, 3); const d: Vec3 = [0.3 - -2.6, 0.9 + 0.55 - 2.0, 0.2]; [editor, dom1, dom2, guide].forEach((p) => { movePart(pts, base, p, d, 1); setAlpha(alpha, p, 0.4); }); marks.forEach((m) => setAlpha(alpha, m, 1)); setAlpha(alpha, txArrow, 0.3); setAlpha(alpha, txX, 0.8); daughters.forEach((c, i) => { setAlpha(alpha, c, 1); moveTo(pts, base, c, [-1.5 + 1.2 * i, -1.2, 0], [-1.5 + 1.2 * i + (i === 0 ? -0.3 : 0.3), -1.2, 0], 1); }); dMarks.forEach((m, i) => { setAlpha(alpha, m, 1); moveTo(pts, base, m, [-1.5 + 1.2 * i, -1.2, 0.3], [-1.5 + 1.2 * i + (i === 0 ? -0.3 : 0.3), -1.2, 0.3], 1); });
    setAlpha(alpha, liver, clamp(u * 2)); setAlpha(alpha, liverOk, clamp(u * 2 - 0.3)); setAlpha(alpha, tumCloud, clamp(u * 2 - 0.5)); setAlpha(alpha, escape, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, noTrial, clamp(u * 2 - 1));
    return { caption: "4 · Tune Therapeutics and Chroma Medicine took CRISPRoff-style editors into the clinic for hepatitis B, not cancer; for MYC-driven tumours, delivery to solid tumours is unsolved, silencing would have to reach essentially every tumour cell, and no oncology trial had been registered by September 2026" };
  });
}

// ---------------------------------------------------------------- 44. Evo 2
export function evo2(): Mesh {
  const sc = scene();
  const strand = put(sc, "strand", helix(0.12, 5.4, 12, 72, "soft"), { at: [0, 1.3, 0], rotZ: Math.PI / 2 });
  const ctx = put(sc, "ctx", polyline([[-2.7, 1.75, 0], [-2.7, 1.95, 0], [2.7, 1.95, 0], [2.7, 1.75, 0]], "accent"));
  const mod = put(sc, "model", model(1.6, 1.0, "accent"), { at: [0, 0.0, 0] });
  const gene = put(sc, "gene", quad(0.9, 0.35, "hot"), { at: [-1.4, 1.3, 0.05] });
  const variant = put(sc, "variant", mote(0.09, "hot"), { at: [-1.4, 1.3, 0.2] });
  const path = put(sc, "path", cross([-1.6, -1.4, 0.05], 0.2));
  const benign = put(sc, "benign", tick([-0.6, -1.4, 0.05], 0.2));
  const zero = put(sc, "zero", ring(0.3, 10, "accent", "z"), { at: [-1.1, -1.4, 0.02] });
  const gen = put(sc, "gen", helix(0.1, 1.4, 3, 24, "accent"), { at: [1.9, -0.9, 0], rotZ: Math.PI / 2 });
  const regA = put(sc, "regA", bar(1.4, 0.6, 0.22, "accent"), { at: [0, -2.4, 0] });
  const regB = put(sc, "regB", bar(1.8, 1.0, 0.22, "soft"), { at: [0, -2.4, 0] });
  const openLock = put(sc, "openLock", box(0.4, 0.3, 0.2, "accent", true), { at: [-2.6, -0.4, 0] });
  const openArc = put(sc, "openArc", polyline([[-2.75, -0.25, 0], [-2.75, 0.0, 0], [-2.45, 0.0, 0], [-2.45, -0.25, 0]], "accent"), { at: [0.12, 0.05, 0], rotZ: 0.4 });
  sc.mesh.labels = [L([0, 2.3, 0], "1M-token context: long stretches of genome at once"), L([0, -0.8, 0], "Evo 2 (Arc, NVIDIA): StripedHyena, 7B and 40B parameters, 9.3 trillion bases"), L([-1.1, -1.95, 0], "BRCA1 variant: pathogenic or benign, zero-shot"), L([1.6, -2.75, 0], "Regulatory prediction weaker than Enformer")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ctx, variant, path, benign, zero, gen, regA, regB, openLock, openArc);
    setAlpha(alpha, mod, 0.5); setAlpha(alpha, gene, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); grow(alpha, strand, clamp(u * 1.3)); grow(alpha, ctx, clamp(u * 2 - 0.8)); return { caption: "1 · Most sequence models read a few thousand bases at a time; Evo 2's StripedHyena architecture allows a context of 1M tokens, long stretches of genome at once" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, strand, 1); setAlpha(alpha, ctx, 1); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); movePart(pts, base, strand, [0, 0, 0], 1, 0); for (let i = strand.p0; i < strand.p1; i++) { pts[i] = [base[i][0], base[i][1], base[i][2] + 0.1 * Math.sin(t * TAU * 2 + base[i][0] * 3)]; } return { caption: "2 · The 2025 preprint describes 7B and 40B parameter models trained on 9.3 trillion bases of DNA from across life, learning its statistics without being told what any gene does" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, strand, 1); setAlpha(alpha, ctx, 1); setAlpha(alpha, mod, 1); setAlpha(alpha, gene, 1); setAlpha(alpha, variant, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); moveTo(pts, base, variant, [-1.4, 1.3, 0.2], [-1.1, 0.0, 0.3], clamp(u * 2 - 0.5)); setAlpha(alpha, zero, clamp(u * 2 - 1) * 0.7); setAlpha(alpha, path, clamp(u * 2 - 1.1)); setAlpha(alpha, benign, clamp(u * 2 - 1.3)); return { caption: "3 · Asked about a BRCA1 variant it was never trained to classify, it flags pathogenic versus benign zero-shot, which is the interest for cancer genes and non-coding regions; it can also generate genomic sequences" }; }
    const u = Q(t, 3); setAlpha(alpha, strand, 1); setAlpha(alpha, ctx, 1); setAlpha(alpha, mod, 1); setAlpha(alpha, gene, 1); setAlpha(alpha, variant, 1); moveTo(pts, base, variant, [-1.4, 1.3, 0.2], [-1.1, 0.0, 0.3], 1); setAlpha(alpha, zero, 0.7); setAlpha(alpha, path, 1); setAlpha(alpha, benign, 1);
    grow(alpha, gen, clamp(u * 2)); grow(alpha, regA, clamp(u * 2 - 0.4)); grow(alpha, regB, clamp(u * 2 - 0.7)); show(alpha, clamp(u * 2 - 1), openLock, openArc);
    return { caption: "4 · Weights are open; its human regulatory prediction is weaker than specialised models such as Enformer, so it complements rather than replaces them" };
  });
}

// ---------------------------------------------------------------- 45. extended pleurectomy/decortication and radical mesothelioma surgery
export function pleurectomyDecortication(): Mesh {
  const sc = scene();
  const CH: Vec3 = [-0.8, 0.3, 0];
  const chest = put(sc, "chest", organ(1.6, 1.5, 0.8, "soft"), { at: CH });
  const lung = put(sc, "lung", organ(0.75, 1.05, 0.5, "soft"), { at: [CH[0] + 0.3, CH[1], 0.1] });
  const pleura = put(sc, "pleura", ellipsoid(0.95, 1.25, 0.55, 5, 12, "hot", true), { at: [CH[0] + 0.3, CH[1], 0.1] });
  const epp = put(sc, "epp", cross([CH[0] + 0.3, CH[1], 0.7], 0.5));
  const mars1 = put(sc, "mars1", doc(0.5, 0.6, 3, "soft"), { at: [1.6, 1.5, 0] });
  const peel = put(sc, "peel", ellipsoid(0.95, 1.25, 0.55, 5, 12, "hot", true), { at: [CH[0] + 0.3, CH[1], 0.1] });
  const AX: Vec3 = [1.2, -2.2, 0];
  const ax = put(sc, "ax", axes(AX, 1.9, 1.6));
  const sChemo = put(sc, "sChemo", bar(AX[0] + 0.55, 1.3, 0.3, "accent"), { at: [0, AX[1], 0] });
  const sSurg = put(sc, "sSurg", bar(AX[0] + 1.3, 0.9, 0.3, "hot"), { at: [0, AX[1], 0] });
  const qol = put(sc, "qol", polyline([[AX[0] + 1.15, AX[1] + 1.1, 0.05], [AX[0] + 1.3, AX[1] + 0.95, 0.05], [AX[0] + 1.45, AX[1] + 1.1, 0.05]], "hot"));
  const cath = put(sc, "cath", polyline([[CH[0] - 1.0, CH[1] - 1.9, 0.2], [CH[0] - 0.7, CH[1] - 1.1, 0.3], [CH[0] - 0.2, CH[1] - 0.8, 0.4]], "accent"));
  const biopsy = put(sc, "biopsy", slide("soft"), { at: [-2.5, 1.6, 0], scale: 0.6 });
  sc.mesh.labels = [L([CH[0], CH[1] + 1.9, 0], "Mesothelioma: tumour-bearing pleura lining lung and chest wall"), L([1.6, 2.05, 0], "MARS 1 (2011): extrapleural pneumonectomy abandoned"), L([AX[0] + 0.95, AX[1] - 0.35, 0], "MARS 2 (2024): surgery plus chemotherapy worse than chemotherapy alone"), L([-2.4, -1.9, 0], "Remaining role: diagnosis, pleurodesis, indwelling catheters, trials")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, epp, mars1, peel, ax, sChemo, sSurg, qol, cath, biopsy);
    setAlpha(alpha, chest, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, lung, 0.8); setAlpha(alpha, pleura, 0.3 + 0.5 * clamp(u * 2) * (0.6 + 0.4 * pulse(t, 3))); return { caption: "1 · Mesothelioma grows as a rind of tumour in the pleura, the lining that wraps the lung and chest wall; for decades surgeons tried to strip or remove it all" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, pleura, 0.8); setAlpha(alpha, lung, 0.8 - 0.5 * clamp(u * 2) * (1 - clamp(u * 2 - 1))); setAlpha(alpha, epp, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, mars1, clamp(u * 2 - 0.8)); return { caption: "2 · Extrapleural pneumonectomy removed lung, pleura, diaphragm and pericardium together; MARS 1 (2011) showed high mortality without benefit and it was largely abandoned" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, lung, 0.8); setAlpha(alpha, epp, 0.5); setAlpha(alpha, mars1, 0.6); setAlpha(alpha, pleura, 0.8 * (1 - u)); setAlpha(alpha, peel, 0.8); movePart(pts, base, peel, [1.2 * u, 0.4 * u, 0.3 * u], 1 - 0.4 * u, 0.6 * u); return { caption: "3 · Lung-sparing extended pleurectomy/decortication strips the parietal and visceral pleura for macroscopic complete resection while leaving the lung; it remained standard in selected centres within multimodality therapy" }; }
    const u = Q(t, 3); setAlpha(alpha, lung, 0.8); setAlpha(alpha, epp, 0.5); setAlpha(alpha, mars1, 0.6); setAlpha(alpha, pleura, 0); setAlpha(alpha, peel, 0.6); movePart(pts, base, peel, [1.2, 0.4, 0.3], 0.6, 0.6);
    setAlpha(alpha, ax, clamp(u * 2)); grow(alpha, sChemo, clamp(u * 2 - 0.3)); grow(alpha, sSurg, clamp(u * 2 - 0.6)); setAlpha(alpha, qol, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); grow(alpha, cath, clamp(u * 2 - 0.8)); setAlpha(alpha, biopsy, clamp(u * 2 - 1));
    return { caption: "4 · MARS 2 (2024) showed worse survival and quality of life with surgery plus chemotherapy than chemotherapy alone; surgery now has a limited role in diagnosis, palliation of trapped lung with pleurodesis or indwelling catheters, and trials" };
  });
}

// ---------------------------------------------------------------- 46. fenbendazole, ivermectin and internet repurposing claims
export function repurposingClaims(): Mesh {
  const sc = scene();
  put(sc, "phone", quad(1.1, 1.9, "soft"), { at: [-2.2, 0.5, 0] });
  const post: Part[] = []; for (let i = 0; i < 4; i++) post.push(put(sc, `post${i}`, doc(0.8, 0.3, 1, "accent"), { at: [-2.2, 1.1 - 0.45 * i, 0.03] }));
  const shares: Part[] = []; for (let i = 0; i < 5; i++) shares.push(put(sc, `sh${i}`, mote(0.06, "hot"), { at: [-2.2, 1.1, 0.1] }));
  const DISH: Vec3 = [0.4, 1.1, 0];
  const dish = put(sc, "dish", cylinder(0.6, 0.12, 12, 2, "soft", true, true), { at: DISH });
  const dCells: Part[] = []; for (let i = 0; i < 5; i++) dCells.push(put(sc, `dc${i}`, blob(0.11, "hot"), { at: [DISH[0] - 0.4 + 0.2 * i, DISH[1] + 0.1, 0.1 * (i % 2)] }));
  const pill = put(sc, "pill", capsule(1.2, "accent"), { at: [2.2, 1.6, 0] });
  const c0 = put(sc, "c0", bar(1.9, 1.5, 0.25, "hot"), { at: [0, -0.4, 0] });
  const c1 = put(sc, "c1", bar(2.4, 0.25, 0.25, "accent"), { at: [0, -0.4, 0] });
  const P: Vec3 = [-0.4, -1.3, 0];
  const person = put(sc, "person", figure("soft"), { at: P, scale: 0.8 });
  const liver = put(sc, "liver", organ(0.28, 0.2, 0.15, "hot"), { at: [P[0] + 0.05, P[1] + 0.2, 0.15] });
  const dropped = put(sc, "dropped", vial(0.12, 0.4, "accent"), { at: [P[0] - 0.9, P[1] + 0.1, 0] });
  const droppedX = put(sc, "droppedX", cross([P[0] - 0.9, P[1] + 0.1, 0.1], 0.2));
  const trialDoc = put(sc, "trialDoc", doc(0.7, 0.8, 4, "accent"), { at: [1.9, -1.6, 0] });
  const trialOk = put(sc, "trialOk", tick([2.35, -1.3, 0.05], 0.16));
  sc.mesh.labels = [L([-2.2, 1.85, 0], "A 2016 personal story, shared worldwide"), L([DISH[0], DISH[1] - 0.75, 0], "Microtubule disruption in cell lines, as for many compounds that never become drugs"), L([2.15, 0.55, 0], "Dish concentration versus human antiparasitic dosing"), L([1.9, -2.3, 0], "Real repurposing runs through registered trials: aspirin, metformin, statins, mebendazole")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...shares, dish, ...dCells, pill, c0, c1, liver, dropped, droppedX, trialDoc, trialOk);
    setAlpha(alpha, person, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, post, clamp(u * 1.5)); shares.forEach((p, i) => { const v = (t * 3 + i / 5) % 1; setAlpha(alpha, p, clamp(u * 2 - 0.5) * (1 - v)); movePart(pts, base, p, [1.2 * v, 0.8 * v * Math.sin(i * 1.7), 0], 1); }); return { caption: "1 · A widely shared 2016 story of a lung cancer patient who took a dog dewormer alongside a trial drug and immunotherapy drove global demand; ivermectin claims followed the pandemic" }; }
    if (s === 1) { const u = Q(t, 1); post.forEach((p) => setAlpha(alpha, p, 0.6)); setAlpha(alpha, dish, clamp(u * 2)); dCells.forEach((c, i) => { const v = clamp(u * 2 - 0.5 - 0.15 * i); setAlpha(alpha, c, clamp(u * 2 - 0.2) * (1 - 0.6 * v)); movePart(pts, base, c, [0, 0, 0], 1 - 0.4 * v); }); setAlpha(alpha, pill, clamp(u * 2 - 0.3)); return { caption: "2 · Fenbendazole and ivermectin do kill cancer cell lines by disrupting microtubules and other pathways, as do countless compounds in a dish that never become drugs" }; }
    if (s === 2) { const u = Q(t, 2); post.forEach((p) => setAlpha(alpha, p, 0.6)); setAlpha(alpha, dish, 1); dCells.forEach((c) => { setAlpha(alpha, c, 0.4); movePart(pts, base, c, [0, 0, 0], 0.6); }); setAlpha(alpha, pill, 1); grow(alpha, c0, clamp(u * 2)); grow(alpha, c1, clamp(u * 2 - 0.6)); setAlpha(alpha, person, 0.4 + 0.6 * clamp(u * 2 - 0.5)); setAlpha(alpha, liver, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "3 · The concentrations that do it are far above anything reached by veterinary or antiparasitic dosing in humans; no completed clinical trial shows benefit, case reports describe severe liver injury with fenbendazole, and interactions with chemotherapy are unstudied" }; }
    const u = Q(t, 3); post.forEach((p) => setAlpha(alpha, p, 0.6)); setAlpha(alpha, dish, 1); dCells.forEach((c) => { setAlpha(alpha, c, 0.4); movePart(pts, base, c, [0, 0, 0], 0.6); }); setAlpha(alpha, pill, 1); show(alpha, 1, c0, c1, person); setAlpha(alpha, liver, 0.8);
    setAlpha(alpha, dropped, clamp(u * 2)); setAlpha(alpha, droppedX, clamp(u * 2 - 0.4) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, trialDoc, clamp(u * 2 - 0.7)); setAlpha(alpha, trialOk, clamp(u * 2 - 1));
    return { caption: "4 · The harm is abandoning proven treatment; genuine repurposing candidates (aspirin, metformin, statins, propranolol, mebendazole in early glioma trials) go through registered trials, and the real bottleneck is that cheap generics attract no sponsor" };
  });
}

// ---------------------------------------------------------------- 47. in vivo base and prime editing for cancer
export function inVivoEditing(): Mesh {
  const sc = scene();
  const dnaP = put(sc, "dna", helix(0.14, 3.2, 7, 48, "soft"), { at: [-0.9, 1.3, 0], rotZ: Math.PI / 2 });
  const letters: Part[] = []; for (let i = 0; i < 7; i++) letters.push(put(sc, `lt${i}`, line([-2.2 + 0.45 * i, 1.55, 0.1], [-2.2 + 0.45 * i, 1.85, 0.1], i === 3 ? "hot" : "soft")));
  const fixed = put(sc, "fixed", line([-2.2 + 0.45 * 3, 1.55, 0.12], [-2.2 + 0.45 * 3, 1.85, 0.12], "accent"));
  const editor = put(sc, "editor", blob(0.3, "accent"), { at: [1.4, 2.2, 0] });
  const deam = put(sc, "deam", small(0.12, "accent"), { at: [1.7, 2.4, 0.1] });
  const noCut = put(sc, "noCut", cross([-0.85, 0.85, 0.15], 0.14, "accent"));
  const lnp = put(sc, "lnp", sphere(0.26, 4, 8, "accent", true), { at: [0.5, -0.2, 0] });
  const liver = put(sc, "liver", organ(0.7, 0.45, 0.35), { at: [-1.8, -1.2, 0] });
  const liverOk = put(sc, "liverOk", tick([-1.0, -1.05, 0.05], 0.18));
  const TUM: Vec3 = [1.9, -1.2, 0];
  const tum = put(sc, "tum", blob(0.7, "hot"), { at: TUM });
  const tCells: Part[] = []; for (let i = 0; i < 8; i++) tCells.push(put(sc, `tc${i}`, mote(0.07, "hot"), { at: [TUM[0] - 0.4 + 0.27 * (i % 4), TUM[1] - 0.2 + 0.4 * Math.floor(i / 4), 0.5] }));
  const edited: Part[] = []; [1, 6].forEach((i, k) => edited.push(put(sc, `ed${k}`, mote(0.07, "accent"), { at: [TUM[0] - 0.4 + 0.27 * (i % 4), TUM[1] - 0.2 + 0.4 * Math.floor(i / 4), 0.52] })));
  const weak = put(sc, "weak", ring(0.85, 14, "soft", "z"), { at: TUM });
  const noTrial = put(sc, "noTrial", cross([TUM[0] + 1.0, TUM[1] + 0.9, 0.05], 0.18));
  sc.mesh.labels = [L([-0.9, 2.3, 0], "One letter changed, no double-strand break"), L([1.4, 2.85, 0], "Impaired Cas fused to a deaminase (base) or reverse transcriptase (prime)"), L([-1.8, -1.95, 0], "Works in the liver for inherited disease"), L([TUM[0], TUM[1] - 1.3, 0], "Solid tumour: delivery, editing every cell, out-competing the rest")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, fixed, noCut, lnp, liver, liverOk, tum, ...tCells, ...edited, weak, noTrial);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, dnaP, 0.8); cascade(alpha, letters, clamp(u * 1.5)); setAlpha(alpha, letters[3], clamp(u * 1.5 * 7 - 3) * (0.5 + 0.5 * pulse(t, 4))); [editor, deam].forEach((p) => setAlpha(alpha, p, clamp(u * 2 - 1))); return { caption: "1 · A cancer driver is often one wrong letter: a mutant KRAS allele, or a TP53 that has lost function; the idea is to rewrite it inside the body" }; }
    if (s === 1) { const u = Q(t, 1); letters.forEach((l) => setAlpha(alpha, l, 1)); const to: Vec3 = [-2.2 + 0.45 * 3, 1.3 + 0.5, 0.2]; [editor, deam].forEach((p) => moveTo(pts, base, p, [1.4, 2.2, 0], to, clamp(u * 1.5))); setAlpha(alpha, letters[3], 1 - clamp(u * 2 - 1)); setAlpha(alpha, fixed, clamp(u * 2 - 1)); setAlpha(alpha, noCut, clamp(u * 2 - 1.2) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "2 · A catalytically impaired Cas protein guided to the locus carries a deaminase (base editing, one letter) or a reverse transcriptase (prime editing, a short new sequence) and edits without a double-strand break, so fewer translocations than nuclease editing" }; }
    if (s === 2) { const u = Q(t, 2); letters.forEach((l) => setAlpha(alpha, l, 1)); setAlpha(alpha, letters[3], 0); const to: Vec3 = [-2.2 + 0.45 * 3, 1.8, 0.2]; [editor, deam].forEach((p) => { moveTo(pts, base, p, [1.4, 2.2, 0], to, 1); setAlpha(alpha, p, 0.5); }); setAlpha(alpha, fixed, 1); setAlpha(alpha, noCut, 0.6); setAlpha(alpha, lnp, 1); moveTo(pts, base, lnp, [0.5, -0.2, 0], [-1.8, -1.1, 0.2], clamp(u * 1.5)); setAlpha(alpha, liver, clamp(u * 2)); setAlpha(alpha, liverOk, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · Delivered by lipid nanoparticle or virus, both editors are in the clinic for inherited liver and blood disease, and base editing builds allogeneic CAR-T cells ex vivo; the liver is where nanoparticles naturally go" }; }
    const u = Q(t, 3); letters.forEach((l) => setAlpha(alpha, l, 1)); setAlpha(alpha, letters[3], 0); [editor, deam].forEach((p) => { moveTo(pts, base, p, [1.4, 2.2, 0], [-2.2 + 0.45 * 3, 1.8, 0.2], 1); setAlpha(alpha, p, 0.5); }); setAlpha(alpha, fixed, 1); setAlpha(alpha, noCut, 0.6); setAlpha(alpha, lnp, 0.6); moveTo(pts, base, lnp, [0.5, -0.2, 0], [-1.8, -1.1, 0.2], 1); setAlpha(alpha, liver, 1); setAlpha(alpha, liverOk, 0.8);
    setAlpha(alpha, tum, clamp(u * 2) * 0.8); tCells.forEach((c) => setAlpha(alpha, c, clamp(u * 2 - 0.3))); edited.forEach((e) => setAlpha(alpha, e, clamp(u * 2 - 0.7) * (0.6 + 0.4 * pulse(t, 4)))); setAlpha(alpha, weak, clamp(u * 2 - 0.5) * 0.5); setAlpha(alpha, noTrial, clamp(u * 2 - 1));
    return { caption: "4 · Nobody has corrected a cancer this way in a person: by September 2026 no in vivo oncology trial existed, solid-tumour delivery is poor, editing a fraction of cells may not change tumour behaviour since a corrected cell must still out-compete the rest, and off-target edits are permanent" };
  });
}

// ---------------------------------------------------------------- 48. melatonin as a cancer adjunct
export function melatoninCancer(): Mesh {
  const sc = scene();
  const HEAD: Vec3 = [-1.9, 0.9, 0];
  const head = put(sc, "head", organ(0.8, 0.95, 0.7, "soft"), { at: HEAD });
  const pineal = put(sc, "pineal", blob(0.12, "accent"), { at: [HEAD[0] + 0.1, HEAD[1] + 0.05, 0.3] });
  const moon = put(sc, "moon", polyline([[0.4, 2.2, 0], [0.15, 2.0, 0], [0.1, 1.7, 0], [0.3, 1.45, 0], [0.15, 1.6, 0], [0.2, 1.85, 0], [0.32, 2.05, 0]], "soft", true));
  const mel: Part[] = []; for (let i = 0; i < 5; i++) mel.push(put(sc, `mel${i}`, mote(0.06, "accent"), { at: [HEAD[0] + 0.1, HEAD[1] + 0.05, 0.3] }));
  const bed = put(sc, "bed", box(1.6, 0.12, 0.7, "soft", true), { at: [1.6, 0.9, 0] });
  const sleeper = put(sc, "sleeper", ellipsoid(0.7, 0.2, 0.25, 3, 8, "soft", true), { at: [1.6, 1.1, 0] });
  const zz: Part[] = []; for (let i = 0; i < 3; i++) zz.push(put(sc, `z${i}`, polyline([[0, 0, 0], [0.15, 0, 0], [0, -0.15, 0], [0.15, -0.15, 0]], "accent"), { at: [2.4 + 0.2 * i, 1.5 + 0.25 * i, 0], scale: 0.7 + 0.3 * i }));
  const sleepBar0 = put(sc, "sb0", bar(2.7, 0.5, 0.22, "soft"), { at: [0, -0.2, 0] });
  const sleepBar1 = put(sc, "sb1", bar(3.0, 0.8, 0.22, "accent"), { at: [0, -0.2, 0] });
  const pills: Part[] = []; for (let i = 0; i < 3; i++) pills.push(put(sc, `p${i}`, capsule(1.0, "hot"), { at: [-2.6 + 0.45 * i, -1.1, 0] }));
  const meta = put(sc, "meta", doc(0.7, 0.8, 4, "hot"), { at: [-0.8, -1.4, 0] });
  const single = put(sc, "single", building(0.6, 0.5), { at: [0.3, -1.4, 0] });
  const singleQ = put(sc, "singleQ", ring(0.42, 12, "hot", "z"), { at: [0.3, -1.4, 0.05] });
  const repl = put(sc, "repl", doc(0.5, 0.6, 3, "soft"), { at: [1.4, -1.4, 0] });
  const replX = put(sc, "replX", cross([1.4, -1.4, 0.1], 0.25));
  const inter = put(sc, "inter", polyline([[2.3, -1.7, 0], [2.6, -1.15, 0], [2.9, -1.7, 0]], "hot", true));
  sc.mesh.labels = [L([HEAD[0], HEAD[1] + 1.3, 0], "Pineal hormone that signals night: MT1 and MT2 receptors"), L([1.6, 2.15, 0], "Sleep: some benefit; fatigue: little"), L([-1.5, -2.0, 0], "20 mg with chemotherapy: 2012 meta-analysis, one Italian group, unblinded"), L([1.9, -2.15, 0], "No independent replication; interacts with sedatives and anticoagulants")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...zz, sleepBar0, sleepBar1, ...pills, meta, single, singleQ, repl, replX, inter);
    setAlpha(alpha, bed, 0.5); setAlpha(alpha, sleeper, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, head, 0.7); setAlpha(alpha, moon, clamp(u * 2)); setAlpha(alpha, pineal, 0.5 + 0.5 * clamp(u * 2 - 0.5) * pulse(t, 4)); mel.forEach((m, i) => { const v = (t * 3 + i / 5) % 1; setAlpha(alpha, m, clamp(u * 2 - 1) * (1 - v)); movePart(pts, base, m, [1.0 * v, -0.4 * v * Math.sin(i), 0.2 * v], 1); }); return { caption: "1 · Melatonin is the pineal hormone that signals night, acting on MT1 and MT2 receptors and as a free-radical scavenger; in the laboratory it is antioxidant, immunomodulatory and antiproliferative" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, moon, 1); setAlpha(alpha, pineal, 1); mel.forEach((m, i) => { const v = (t * 3 + i / 5) % 1; setAlpha(alpha, m, 1 - v); movePart(pts, base, m, [1.0 * v, -0.4 * v * Math.sin(i), 0.2 * v], 1); }); setAlpha(alpha, bed, 1); setAlpha(alpha, sleeper, 1); zz.forEach((z, i) => { setAlpha(alpha, z, clamp(u * 2 - 0.3 * i)); movePart(pts, base, z, [0, 0.15 * ((t * 2 + i / 3) % 1), 0], 1); }); grow(alpha, sleepBar0, clamp(u * 2 - 0.5)); grow(alpha, sleepBar1, clamp(u * 2 - 0.9)); return { caption: "2 · Low-dose melatonin is a reasonable short-term sleep aid for survivors when behavioural therapy is unavailable; trials for sleep, delirium and fatigue are mixed, with some benefit for sleep quality and little for fatigue" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, moon, 1); setAlpha(alpha, pineal, 1); mel.forEach((m, i) => { const v = (t * 3 + i / 5) % 1; setAlpha(alpha, m, 0.6 * (1 - v)); movePart(pts, base, m, [1.0 * v, -0.4 * v * Math.sin(i), 0.2 * v], 1); }); setAlpha(alpha, bed, 1); setAlpha(alpha, sleeper, 1); zz.forEach((z, i) => { setAlpha(alpha, z, 0.7); movePart(pts, base, z, [0, 0.15 * ((t * 2 + i / 3) % 1), 0], 1); }); show(alpha, 1, sleepBar0, sleepBar1); cascade(alpha, pills, clamp(u * 1.5)); setAlpha(alpha, meta, clamp(u * 2 - 0.6)); return { caption: "3 · The bigger claim is different: a 2012 meta-analysis of randomised trials of 20 mg melatonin alongside chemotherapy reported better one-year survival and less toxicity" }; }
    const u = Q(t, 3); setAlpha(alpha, moon, 1); setAlpha(alpha, pineal, 1); mel.forEach((m, i) => { const v = (t * 3 + i / 5) % 1; setAlpha(alpha, m, 0.6 * (1 - v)); movePart(pts, base, m, [1.0 * v, -0.4 * v * Math.sin(i), 0.2 * v], 1); }); setAlpha(alpha, bed, 1); setAlpha(alpha, sleeper, 1); zz.forEach((z, i) => { setAlpha(alpha, z, 0.7); movePart(pts, base, z, [0, 0.15 * ((t * 2 + i / 3) % 1), 0], 1); }); show(alpha, 1, sleepBar0, sleepBar1, ...pills, meta);
    setAlpha(alpha, single, clamp(u * 2)); setAlpha(alpha, singleQ, clamp(u * 2 - 0.3) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, repl, clamp(u * 2 - 0.6)); setAlpha(alpha, replX, clamp(u * 2 - 0.9)); setAlpha(alpha, inter, clamp(u * 2 - 1.2));
    return { caption: "4 · Almost all those trials came from a single Italian group, small and unblinded, and independent trials have not replicated the survival effect; high-dose melatonin as an anticancer adjunct is unproven and may interact with sedatives and anticoagulants" };
  });
}

// ---------------------------------------------------------------- 49. Merlin (abdominal CT vision-language model)
export function merlinCt(): Mesh {
  const sc = scene();
  const CT: Vec3 = [-2.1, 0.7, 0];
  const slices: Part[] = []; for (let i = 0; i < 5; i++) slices.push(put(sc, `sl${i}`, quad(1.3, 1.0, "soft"), { at: [CT[0] + 0.1 * i, CT[1] - 0.12 * i, -0.15 * i] }));
  put(sc, "body", ellipsoid(0.45, 0.32, 0.03, 4, 10, "soft"), { at: [CT[0], CT[1], 0.02] });
  const lesion = put(sc, "lesion", blob(0.1, "hot"), { at: [CT[0] + 0.15, CT[1] + 0.05, 0.05] });
  const report = put(sc, "report", doc(0.9, 1.0, 5, "accent"), { at: [0.2, 1.6, 0] });
  const codes: Part[] = []; for (let i = 0; i < 4; i++) codes.push(put(sc, `cd${i}`, quad(0.22, 0.14, "accent"), { at: [-0.2 + 0.3 * i, 0.55, 0] }));
  const enc = put(sc, "enc", model(1.3, 0.9, "accent"), { at: [0.2, -0.9, 0] });
  const linkI = put(sc, "linkI", arrow([CT[0] + 0.6, CT[1] - 0.6, 0], [-0.4, -0.5, 0], "soft", 0.1));
  const linkR = put(sc, "linkR", arrow([0.2, 1.05, 0], [0.2, -0.4, 0], "soft", 0.1));
  const findings: Part[] = []; for (let i = 0; i < 6; i++) findings.push(put(sc, `f${i}`, tick([2.0, 1.6 - 0.4 * i, 0.05], 0.1)));
  const fLines: Part[] = []; for (let i = 0; i < 6; i++) fLines.push(put(sc, `fl${i}`, line([2.2, 1.6 - 0.4 * i, 0], [2.9 - 0.15 * (i % 3), 1.6 - 0.4 * i, 0], "soft")));
  const abdomen = put(sc, "abdomen", ring(0.45, 12, "hot", "z"), { at: [-2.0, -1.5, 0] });
  const single = put(sc, "single", building(0.6, 0.5), { at: [-0.9, -1.9, 0] });
  const singleQ = put(sc, "singleQ", ring(0.42, 12, "hot", "z"), { at: [-0.9, -1.9, 0.05] });
  sc.mesh.labels = [L([CT[0], CT[1] + 0.9, 0], "15,000 abdominal CT scans: 6M images"), L([0.2, 2.3, 0], "Radiology reports and 6M EHR codes"), L([2.45, 2.0, 0], "Zero-shot classification of hundreds of findings"), L([-1.4, -2.45, 0], "Single institution; abdomen only")];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...codes, linkI, linkR, ...findings, ...fLines, abdomen, single, singleQ);
    setAlpha(alpha, enc, 0.5); setAlpha(alpha, report, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, slices, clamp(u * 1.5)); setAlpha(alpha, lesion, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "1 · Every CT scan already comes with a report and a set of structured record codes written by the people who read it; that text is free supervision" }; }
    if (s === 1) { const u = Q(t, 1); slices.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, lesion, 1); setAlpha(alpha, report, 0.4 + 0.6 * clamp(u * 2)); cascade(alpha, codes, clamp(u * 2 - 0.5)); setAlpha(alpha, linkI, clamp(u * 2 - 0.8)); setAlpha(alpha, linkR, clamp(u * 2 - 1)); setAlpha(alpha, enc, 0.5 + 0.5 * clamp(u * 2 - 1) * pulse(t, 5)); return { caption: "2 · Merlin's 3D image encoder is aligned with both the free-text radiology report and structured EHR codes, trained on 15,000 scans amounting to 6M images and 6M codes (2024)" }; }
    if (s === 2) { const u = Q(t, 2); slices.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, lesion, 1); setAlpha(alpha, report, 1); codes.forEach((c) => setAlpha(alpha, c, 1)); show(alpha, 0.7, linkI, linkR); setAlpha(alpha, enc, 1); cascade(alpha, findings, clamp(u * 1.4)); cascade(alpha, fLines, clamp(u * 1.4)); return { caption: "3 · Because it never needed a hand label per finding, it classifies hundreds of findings zero-shot and generates report text; for oncology the relevance is finding and describing lesions rather than staging" }; }
    const u = Q(t, 3); slices.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, lesion, 1); setAlpha(alpha, report, 1); codes.forEach((c) => setAlpha(alpha, c, 1)); show(alpha, 0.7, linkI, linkR); setAlpha(alpha, enc, 1); findings.forEach((f) => setAlpha(alpha, f, 1)); fLines.forEach((f) => setAlpha(alpha, f, 1));
    setAlpha(alpha, abdomen, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, single, clamp(u * 2 - 0.5)); setAlpha(alpha, singleQ, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · The data come from a single institution and cover the abdomen only, so generalisation to other scanners, populations and body regions is untested; it is a research tool for report-supervised learning" };
  });
}

// ---------------------------------------------------------------- 50. music therapy and music medicine
export function musicTherapy(): Mesh {
  const sc = scene();
  const P: Vec3 = [-1.6, 0.0, 0];
  const person = put(sc, "person", figure("soft"), { at: P, scale: 1.1 });
  const phones: Part[] = []; for (let i = 0; i < 2; i++) phones.push(put(sc, `ph${i}`, disc(0.12, 8, "accent", "x"), { at: [P[0] - 0.2 + 0.4 * i, P[1] + 0.9, 0.05] }));
  const band = put(sc, "band", polyline([[P[0] - 0.2, P[1] + 0.95, 0.05], [P[0] - 0.1, P[1] + 1.12, 0.05], [P[0] + 0.1, P[1] + 1.12, 0.05], [P[0] + 0.2, P[1] + 0.95, 0.05]], "accent"));
  const notes: Part[] = []; for (let i = 0; i < 5; i++) notes.push(put(sc, `n${i}`, polyline([[0, 0, 0], [0, 0.3, 0], [0.15, 0.35, 0]], "accent"), { at: [P[0] + 0.5, P[1] + 1.1, 0.1], scale: 0.8 }));
  const therapist = put(sc, "therapist", figure("accent"), { at: [0.6, 0.0, -0.2], scale: 0.8 });
  const guitar = put(sc, "guitar", ellipsoid(0.22, 0.3, 0.08, 3, 8, "accent", true), { at: [0.85, -0.1, 0.1] });
  const heartAx: Vec3 = [1.6, -2.2, 0];
  const hr0 = put(sc, "hr0", bar(heartAx[0] + 0.3, 1.2, 0.22, "hot"), { at: [0, heartAx[1], 0] });
  const hr1 = put(sc, "hr1", bar(heartAx[0] + 0.65, 0.8, 0.22, "accent"), { at: [0, heartAx[1], 0] });
  const anx0 = put(sc, "anx0", bar(heartAx[0] + 1.2, 1.3, 0.22, "hot"), { at: [0, heartAx[1], 0] });
  const anx1 = put(sc, "anx1", bar(heartAx[0] + 1.55, 0.85, 0.22, "accent"), { at: [0, heartAx[1], 0] });
  const cochrane = put(sc, "cochrane", doc(0.7, 0.85, 4, "soft"), { at: [2.4, 1.2, 0] });
  const eye = put(sc, "eye", ellipsoid(0.3, 0.15, 0.05, 3, 8, "soft"), { at: [-2.6, -1.6, 0] });
  const eyeX = put(sc, "eyeX", cross([-2.6, -1.6, 0.1], 0.2));
  const guideDoc = put(sc, "guide", doc(0.5, 0.6, 3, "accent"), { at: [-1.4, -1.6, 0] });
  sc.mesh.labels = [L([P[0], P[1] - 1.35, 0], "Music medicine: pre-recorded music"), L([0.6, 1.3, 0], "Music therapy: a trained therapist"), L([heartAx[0] + 0.95, heartAx[1] - 0.35, 0], "Heart rate, blood pressure, anxiety and pain all lower"), L([2.4, 1.85, 0], "Cochrane 2021: 81 trials, 5,576 participants, low to moderate certainty")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, therapist, guitar, hr0, hr1, anx0, anx1, cochrane, eye, eyeX, guideDoc);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, person, 0.6 + 0.4 * u); phones.forEach((p) => setAlpha(alpha, p, clamp(u * 2 - 0.3))); setAlpha(alpha, band, clamp(u * 2 - 0.3)); notes.forEach((n, i) => { const v = (t * 2 + i / 5) % 1; setAlpha(alpha, n, clamp(u * 2 - 0.8) * (1 - v)); movePart(pts, base, n, [0.4 * v + 0.1 * Math.sin(i), 0.8 * v, 0], 1); }); return { caption: "1 · During chemotherapy or a procedure, a patient puts on headphones: pre-recorded music chosen for the setting, which is music medicine" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, person, 1); notes.forEach((n, i) => { const v = (t * 2 + i / 5) % 1; setAlpha(alpha, n, 1 - v); movePart(pts, base, n, [0.4 * v + 0.1 * Math.sin(i), 0.8 * v, 0], 1); }); setAlpha(alpha, therapist, clamp(u * 2)); setAlpha(alpha, guitar, clamp(u * 2 - 0.5)); movePart(pts, base, guitar, [0, 0.03 * Math.sin(t * TAU * 4) * clamp(u * 2 - 0.5), 0], 1); return { caption: "2 · Music therapy adds a trained therapist who plays, improvises or writes songs with the patient, which engages limbic and reward circuits, lowers sympathetic arousal, redirects attention from pain and opens a channel for emotional expression" }; }
    if (s === 2) { const u = Q(t, 2); notes.forEach((n, i) => { const v = (t * 2 + i / 5) % 1; setAlpha(alpha, n, 1 - v); movePart(pts, base, n, [0.4 * v + 0.1 * Math.sin(i), 0.8 * v, 0], 1); }); setAlpha(alpha, therapist, 1); setAlpha(alpha, guitar, 1); movePart(pts, base, guitar, [0, 0.03 * Math.sin(t * TAU * 4), 0], 1); grow(alpha, hr0, clamp(u * 2)); grow(alpha, hr1, clamp(u * 2 - 0.3)); grow(alpha, anx0, clamp(u * 2 - 0.6)); grow(alpha, anx1, clamp(u * 2 - 0.9)); setAlpha(alpha, cochrane, clamp(u * 2 - 0.5)); return { caption: "3 · A 2021 Cochrane review of 81 trials with 5,576 participants found lower anxiety and pain, better fatigue and quality of life, and lower heart rate and blood pressure, with effects on depression less certain" }; }
    const u = Q(t, 3); notes.forEach((n, i) => { const v = (t * 2 + i / 5) % 1; setAlpha(alpha, n, 1 - v); movePart(pts, base, n, [0.4 * v + 0.1 * Math.sin(i), 0.8 * v, 0], 1); }); setAlpha(alpha, therapist, 1); setAlpha(alpha, guitar, 1); movePart(pts, base, guitar, [0, 0.03 * Math.sin(t * TAU * 4), 0], 1); show(alpha, 1, hr0, hr1, anx0, anx1, cochrane);
    setAlpha(alpha, eye, clamp(u * 2)); setAlpha(alpha, eyeX, clamp(u * 2 - 0.4) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, guideDoc, clamp(u * 2 - 0.8));
    return { caption: "4 · Certainty is low to moderate because nobody can be blinded and trials were small, and single-session effects are modest and short-lived; the 2023 SIO-ASCO guideline says it may be offered for anxiety and depressive symptoms, and the 2022 pain guideline lists music for procedures" };
  });
}

// ---------------------------------------------------------------- 51. N-of-1 and rapid platform trials
export function nOf1Platforms(): Mesh {
  const sc = scene();
  const P: Vec3 = [-2.3, 0.3, 0];
  const patient = put(sc, "patient", figure("accent"), { at: P, scale: 1.0 });
  const mut = put(sc, "mut", mote(0.1, "hot"), { at: [P[0], P[1] + 0.3, 0.2] });
  const aso = put(sc, "aso", helix(0.07, 0.7, 3, 18, "accent"), { at: [-1.0, 1.6, 0], rotZ: Math.PI / 2 });
  const asoBox = put(sc, "asoBox", box(1.0, 0.5, 0.4, "soft", true), { at: [-1.0, 1.6, 0] });
  const AX: Vec3 = [0.2, -1.6, 0];
  const master = put(sc, "master", axes(AX, 2.9, 2.6));
  const ctrl = put(sc, "ctrl", bar(AX[0] + 0.4, 2.2, 0.35, "soft"), { at: [0, AX[1], 0] });
  const arms: Part[] = []; const AH = [1.4, 0.9, 2.0, 1.1];
  AH.forEach((h, i) => arms.push(put(sc, `arm${i}`, bar(AX[0] + 1.0 + 0.5 * i, h, 0.3, i === 2 ? "accent" : "hot"), { at: [0, AX[1], 0] })));
  const grad = put(sc, "grad", tick([AX[0] + 2.0, AX[1] + 2.3, 0.05], 0.18));
  const drop = put(sc, "drop", cross([AX[0] + 1.5, AX[1] + 1.2, 0.05], 0.15));
  const coins: Part[] = []; for (let i = 0; i < 3; i++) coins.push(put(sc, `coin${i}`, disc(0.16, 10, "hot", "z"), { at: [-2.5, -1.4 + 0.12 * i, 0.05 * i] }));
  const genQ = put(sc, "genQ", ring(0.4, 12, "hot", "z"), { at: [-1.5, -1.5, 0.05] });
  const one = put(sc, "one", line([-1.5, -1.7, 0.05], [-1.5, -1.3, 0.05], "hot"));
  sc.mesh.labels = [L([P[0], P[1] - 1.25, 0], "One patient, one private mutation"), L([-1.0, 2.2, 0], "Bespoke antisense drug under an FDA pathway"), L([AX[0] + 1.5, AX[1] - 0.35, 0], "Master protocol: shared control arm; arms graduate or drop (I-SPY 2)"), L([-2.0, -2.15, 0], "Extreme cost; what generalises from n = 1?")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, aso, asoBox, master, ctrl, ...arms, grad, drop, ...coins, genQ, one);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, patient, 0.6 + 0.4 * u); setAlpha(alpha, mut, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "1 · Some patients carry a mutation so rare that no trial will ever recruit their subgroup; the conventional route leaves them out" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, patient, 1); setAlpha(alpha, mut, 1); setAlpha(alpha, asoBox, clamp(u * 2) * 0.6); grow(alpha, aso, clamp(u * 1.5)); moveTo(pts, base, aso, [-1.0, 1.6, 0], [P[0] + 0.5, P[1] + 0.35, 0.2], clamp(u * 2 - 1)); return { caption: "2 · Bespoke antisense drugs have been made for single patients with rare neurological disease under an FDA pathway; the same logic is being applied to private neoantigen and splice-targeting therapies in cancer" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, mut, 1); setAlpha(alpha, asoBox, 0.6); setAlpha(alpha, aso, 1); moveTo(pts, base, aso, [-1.0, 1.6, 0], [P[0] + 0.5, P[1] + 0.35, 0.2], 1); setAlpha(alpha, master, clamp(u * 2)); grow(alpha, ctrl, clamp(u * 2 - 0.2)); arms.forEach((a, i) => grow(alpha, a, clamp(u * 2 - 0.5 - 0.15 * i))); return { caption: "3 · The scalable version is the adaptive platform trial: a master protocol keeps one shared control arm while experimental arms enter and leave, so each new question costs less" }; }
    const u = Q(t, 3); setAlpha(alpha, mut, 1); setAlpha(alpha, asoBox, 0.6); setAlpha(alpha, aso, 1); moveTo(pts, base, aso, [-1.0, 1.6, 0], [P[0] + 0.5, P[1] + 0.35, 0.2], 1); setAlpha(alpha, master, 1); setAlpha(alpha, ctrl, 1); arms.forEach((a, i) => setAlpha(alpha, a, i === 1 ? 1 - 0.7 * clamp(u * 2) : 1)); setAlpha(alpha, grad, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, drop, clamp(u * 2 - 0.3));
    cascade(alpha, coins, clamp(u * 2 - 0.5)); setAlpha(alpha, genQ, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, one, clamp(u * 2 - 0.8));
    return { caption: "4 · I-SPY 2 in breast cancer graduates or drops arms on interim Bayesian analysis; the obstacles for true N-of-1 are manufacturing, extreme cost per patient, fragile interpretation without randomisation and unclear regulatory and reimbursement paths" };
  });
}

// ---------------------------------------------------------------- 52. quantum-dot and molecular ultrasound imaging agents
export function quantumDotImaging(): Mesh {
  const sc = scene();
  const TIS: Vec3 = [-0.3, 0.2, 0];
  put(sc, "tissue", organ(2.6, 1.3, 0.5, "soft"), { at: [TIS[0], TIS[1], -0.3] });
  const tum = put(sc, "tum", blob(0.5, "hot"), { at: [0.4, 0.1, 0.1] });
  const dyes: Part[] = []; for (let i = 0; i < 4; i++) dyes.push(put(sc, `dye${i}`, mote(0.06, "soft"), { at: [0.4 - 0.3 + 0.2 * i, 0.1 + 0.15 * (i % 2), 0.4] }));
  const qds: Part[] = []; for (let i = 0; i < 4; i++) qds.push(put(sc, `qd${i}`, octahedron(0.09, "accent", true), { at: [0.4 - 0.3 + 0.2 * i, 0.1 - 0.15 * (i % 2), 0.45] }));
  const glow: Part[] = []; for (let i = 0; i < 2; i++) glow.push(put(sc, `gl${i}`, ring(0.6 + 0.2 * i, 12, "accent", "z"), { at: [0.4, 0.1, 0.4] }));
  const depth = put(sc, "depth", ticks(-2.9, -1.4, -0.9, 4, "soft"));
  const depthArrow = put(sc, "depthArrow", arrow([-2.9, -1.1, 0], [-1.4, -1.1, 0], "accent", 0.1));
  const probe = put(sc, "probe", box(0.6, 0.3, 0.4, "accent", true), { at: [2.4, 1.6, 0] });
  const waves: Part[] = []; for (let i = 0; i < 3; i++) waves.push(put(sc, `wv${i}`, ring(0.3 + 0.25 * i, 10, "accent", "z"), { at: [2.4, 1.3, 0] }));
  const bubbles: Part[] = []; for (let i = 0; i < 4; i++) bubbles.push(put(sc, `bb${i}`, ring(0.1, 8, "accent", "z"), { at: [2.6, -1.2, 0] }));
  const bubTo = (i: number): Vec3 => [0.4 + 0.55 * Math.cos(i * 1.6), 0.1 + 0.55 * Math.sin(i * 1.6), 0.3];
  const cd = put(sc, "cd", polyline([[-2.6, -2.1, 0], [-2.3, -1.55, 0], [-2.0, -2.1, 0]], "hot", true));
  const approved = put(sc, "approved", doc(0.5, 0.6, 3, "soft"), { at: [1.3, -1.9, 0] });
  const approvedDye = put(sc, "approvedDye", mote(0.08, "soft"), { at: [1.75, -1.85, 0.05] });
  sc.mesh.labels = [L([0.4, 1.35, 0], "Quantum dots: far brighter and more photostable than dyes"), L([-2.15, -1.45, 0], "Shortwave-infrared: several centimetres into tissue"), L([2.4, 2.15, 0], "Targeted microbubbles: BR55 imaging VEGFR2"), L([-0.6, -2.4, 0], "Cadmium toxicity slows translation; approved agents are still dyes")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...qds, ...glow, depth, depthArrow, probe, ...waves, ...bubbles, cd, approved, approvedDye);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tum, 0.7); dyes.forEach((d, i) => setAlpha(alpha, d, clamp(u * 3 - 0.3 * i) * (1 - 0.8 * clamp(u * 2 - 1)))); return { caption: "1 · During surgery a fluorescent dye can mark a tumour, but conventional dyes are dim, bleach quickly under the light and are seen only near the surface" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, tum, 0.7); dyes.forEach((d) => setAlpha(alpha, d, 0.2)); qds.forEach((q, i) => setAlpha(alpha, q, clamp(u * 2 - 0.2 * i))); glow.forEach((g, i) => { const v = (t * 3 + i / 2) % 1; setAlpha(alpha, g, clamp(u * 2 - 0.5) * (1 - v) * 0.8); movePart(pts, base, g, [0, 0, 0], 0.7 + 0.6 * v); }); grow(alpha, depth, clamp(u * 2 - 0.8)); setAlpha(alpha, depthArrow, clamp(u * 2 - 1)); return { caption: "2 · Semiconductor quantum dots carrying targeting ligands are far brighter and more photostable, several markers can be multiplexed at once, and shortwave-infrared emitters see several centimetres into tissue" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, tum, 0.7); dyes.forEach((d) => setAlpha(alpha, d, 0.2)); qds.forEach((q) => setAlpha(alpha, q, 1)); glow.forEach((g, i) => { const v = (t * 3 + i / 2) % 1; setAlpha(alpha, g, (1 - v) * 0.6); movePart(pts, base, g, [0, 0, 0], 0.7 + 0.6 * v); }); setAlpha(alpha, depth, 1); setAlpha(alpha, depthArrow, 1); setAlpha(alpha, probe, clamp(u * 2)); waves.forEach((w, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, w, clamp(u * 2 - 0.3) * (1 - v) * 0.7); movePart(pts, base, w, [-1.2 * v, -0.8 * v, 0], 1 + v); }); bubbles.forEach((b, i) => { setAlpha(alpha, b, clamp(u * 2 - 0.5)); moveTo(pts, base, b, [2.6, -1.2, 0], bubTo(i), clamp(u * 1.5 - 0.3 - 0.1 * i)); }); return { caption: "3 · Gas-filled microbubbles carrying a ligand make ultrasound molecular rather than anatomic: BR55 binds VEGFR2 on tumour vessels in early human studies, on a modality that is cheap, portable and radiation-free" }; }
    const u = Q(t, 3); setAlpha(alpha, tum, 0.7); dyes.forEach((d) => setAlpha(alpha, d, 0.2)); qds.forEach((q) => setAlpha(alpha, q, 1)); glow.forEach((g, i) => { const v = (t * 3 + i / 2) % 1; setAlpha(alpha, g, (1 - v) * 0.6); movePart(pts, base, g, [0, 0, 0], 0.7 + 0.6 * v); }); setAlpha(alpha, depth, 1); setAlpha(alpha, depthArrow, 1); setAlpha(alpha, probe, 1); waves.forEach((w, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, w, (1 - v) * 0.7); movePart(pts, base, w, [-1.2 * v, -0.8 * v, 0], 1 + v); }); bubbles.forEach((b, i) => { setAlpha(alpha, b, 1); moveTo(pts, base, b, [2.6, -1.2, 0], bubTo(i), 1); });
    setAlpha(alpha, cd, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, approved, clamp(u * 2 - 0.5)); setAlpha(alpha, approvedDye, clamp(u * 2 - 0.8));
    return { caption: "4 · Heavy-metal cores have slowed quantum-dot translation and cadmium-free designs are the active area; depth is still limited for optical agents, nanomaterials face a long regulatory path, and the clinically approved agents remain conventional dyes" };
  });
}

// ---------------------------------------------------------------- 53. senolytics and senescence-directed therapy
export function senescenceTargeting(): Mesh {
  const sc = scene();
  put(sc, "chemo", vial(0.16, 0.55, "hot"), { at: [-2.7, 1.5, 0] });
  const drops: Part[] = []; for (let i = 0; i < 3; i++) drops.push(put(sc, `dr${i}`, mote(0.05, "hot"), { at: [-2.7, 1.2, 0] }));
  const tumCells: Part[] = []; const TC: Vec3[] = [[-1.5, 0.6, 0], [-0.7, 0.9, 0], [-1.1, 0.0, 0]];
  TC.forEach((p, i) => tumCells.push(put(sc, `tc${i}`, blob(0.22, "hot"), { at: p })));
  const SEN: Vec3 = [0.6, 0.3, 0];
  const senCell = put(sc, "sen", ellipsoid(0.75, 0.5, 0.3, 5, 10, "hot", true), { at: SEN });
  const senNuc = put(sc, "senNuc", sphere(0.22, 3, 8, "hot"), { at: SEN });
  const sasp: Part[] = []; for (let i = 0; i < 6; i++) sasp.push(put(sc, `sasp${i}`, mote(0.05, "hot"), { at: [SEN[0], SEN[1], 0.3] }));
  const neigh: Part[] = []; for (let i = 0; i < 3; i++) neigh.push(put(sc, `nb${i}`, blob(0.28, "soft"), { at: [2.0 + 0.3 * (i % 2), 1.2 - 0.9 * i, 0] }));
  const relapse = put(sc, "relapse", blob(0.3, "hot"), { at: [2.2, 1.2, 0.2] });
  const senolytic = put(sc, "senolytic", capsule(1.2, "accent"), { at: [-1.5, -1.5, 0] });
  const bcl2 = put(sc, "bcl2", ring(0.2, 8, "accent", "z"), { at: [SEN[0] - 0.5, SEN[1] - 0.2, 0.35] });
  const senX = put(sc, "senX", cross([SEN[0], SEN[1], 0.4], 0.3, "accent"));
  const plat0 = put(sc, "plat0", bar(0.8, 1.0, 0.25, "soft"), { at: [0, -2.2, 0] });
  const plat1 = put(sc, "plat1", bar(1.2, 0.35, 0.25, "hot"), { at: [0, -2.2, 0] });
  const reg = put(sc, "reg", doc(0.55, 0.65, 3, "soft"), { at: [2.4, -1.5, 0] });
  const regX = put(sc, "regX", cross([2.4, -1.5, 0.1], 0.25));
  sc.mesh.labels = [L([SEN[0], SEN[1] + 0.95, 0], "Therapy-induced senescent cell: will not divide, secretes inflammatory factors"), L([2.2, 1.85, 0], "Neighbours: relapse, fatigue, accelerated ageing"), L([-1.5, -2.05, 0], "Senolytic: BH3 mimetic (navitoclax) or dasatinib plus quercetin"), L([1.6, -2.55, 0], "Navitoclax: thrombocytopenia; no phase 2 in cancer survivors (September 2026)")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...drops, ...sasp, relapse, senolytic, bcl2, senX, plat0, plat1, reg, regX);
    setAlpha(alpha, neigh[0], 0.6); setAlpha(alpha, neigh[1], 0.6); setAlpha(alpha, neigh[2], 0.6);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); drops.forEach((d, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, d, clamp(u * 2) * (1 - v)); movePart(pts, base, d, [1.3 * v, -0.7 * v, 0], 1); }); tumCells.forEach((c, i) => { setAlpha(alpha, c, 1 - 0.8 * clamp(u * 2 - 0.5 - 0.2 * i)); movePart(pts, base, c, [0, 0, 0], 1 - 0.5 * clamp(u * 2 - 0.5 - 0.2 * i)); }); setAlpha(alpha, senCell, 0.3 + 0.7 * clamp(u * 2 - 1)); movePart(pts, base, senCell, [0, 0, 0], 0.5 + 0.5 * clamp(u * 2 - 1)); return { caption: "1 · Chemotherapy kills most tumour cells, but some survive in a state of senescence: enlarged, permanently arrested, unable to divide" }; }
    if (s === 1) { const u = Q(t, 1); drops.forEach((d) => setAlpha(alpha, d, 0)); tumCells.forEach((c) => { setAlpha(alpha, c, 0.2); movePart(pts, base, c, [0, 0, 0], 0.5); }); setAlpha(alpha, senCell, 1); sasp.forEach((p, i) => { const v = (t * 2.5 + i / 6) % 1; setAlpha(alpha, p, u * (1 - v)); movePart(pts, base, p, [1.4 * v * Math.cos(i * 1.1 - 0.5), 1.0 * v * Math.sin(i * 1.1 - 0.5), 0], 1); }); neigh.forEach((n) => setAlpha(alpha, n, 0.6 + 0.4 * clamp(u * 2 - 0.5))); setAlpha(alpha, relapse, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "2 · These zombie cells secrete inflammatory factors that poison their neighbours, promoting relapse, driving fatigue and accelerating ageing in survivors" }; }
    if (s === 2) { const u = Q(t, 2); tumCells.forEach((c) => { setAlpha(alpha, c, 0.2); movePart(pts, base, c, [0, 0, 0], 0.5); }); sasp.forEach((p, i) => { const v = (t * 2.5 + i / 6) % 1; setAlpha(alpha, p, (1 - u) * (1 - v)); movePart(pts, base, p, [1.4 * v * Math.cos(i * 1.1 - 0.5), 1.0 * v * Math.sin(i * 1.1 - 0.5), 0], 1); }); neigh.forEach((n) => setAlpha(alpha, n, 1)); setAlpha(alpha, relapse, 0.6); setAlpha(alpha, senolytic, 1); moveTo(pts, base, senolytic, [-1.5, -1.5, 0], [SEN[0] - 0.5, SEN[1] - 0.2, 0.3], clamp(u * 1.5)); setAlpha(alpha, bcl2, clamp(u * 2 - 0.7) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, senCell, 1 - 0.6 * clamp(u * 2 - 1)); setAlpha(alpha, senNuc, 1 - 0.6 * clamp(u * 2 - 1)); setAlpha(alpha, senX, clamp(u * 2 - 1.2)); return { caption: "3 · Senescent cells depend on anti-apoptotic BCL-2 family proteins to survive; a BH3 mimetic such as navitoclax, or dasatinib plus quercetin, kills them selectively, and preclinically a one-two punch of senescence inducer then senolytic improves outcomes" }; }
    const u = Q(t, 3); tumCells.forEach((c) => { setAlpha(alpha, c, 0.2); movePart(pts, base, c, [0, 0, 0], 0.5); }); neigh.forEach((n) => setAlpha(alpha, n, 1)); setAlpha(alpha, relapse, 0.6); setAlpha(alpha, senolytic, 1); moveTo(pts, base, senolytic, [-1.5, -1.5, 0], [SEN[0] - 0.5, SEN[1] - 0.2, 0.3], 1); setAlpha(alpha, bcl2, 0.6); setAlpha(alpha, senCell, 0.4); setAlpha(alpha, senNuc, 0.4); setAlpha(alpha, senX, 1);
    grow(alpha, plat0, clamp(u * 2)); grow(alpha, plat1, clamp(u * 2 - 0.4)); setAlpha(alpha, reg, clamp(u * 2 - 0.7)); setAlpha(alpha, regX, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Navitoclax causes thrombocytopenia that limits dosing, senescence is protective as well as harmful so timing matters, and human senolytic trials sit in ageing, osteoporosis and neurodegeneration: a September 2026 registry search found no phase 2 study in cancer survivors" };
  });
}

// ---------------------------------------------------------------- 54. structural biology infrastructure
export function structuralBiologyInfra(): Mesh {
  const sc = scene();
  const EM: Vec3 = [-2.3, 0.3, 0];
  const emCol = put(sc, "emCol", cylinder(0.3, 2.4, 10, 4, "soft", true, true), { at: EM });
  const eBeam = put(sc, "eBeam", line([EM[0], EM[1] + 1.2, 0.05], [EM[0], EM[1] - 0.9, 0.05], "accent"));
  const grid = put(sc, "grid", disc(0.35, 10, "accent", "y"), { at: [EM[0], EM[1] - 0.9, 0] });
  const SYN: Vec3 = [0.6, 1.2, 0];
  const synRing = put(sc, "syn", torus(0.9, 0.06, 16, 4, "soft"), { at: SYN, rotX: Math.PI / 2 });
  const xBeam = put(sc, "xBeam", line([SYN[0] + 0.9, SYN[1], 0], [SYN[0] + 2.3, SYN[1] - 0.6, 0], "accent"));
  const crystal = put(sc, "crystal", octahedron(0.2, "accent", true), { at: [SYN[0] + 2.3, SYN[1] - 0.6, 0] });
  const MAP: Vec3 = [0.5, -1.3, 0];
  const mapP = put(sc, "map", protein(0.7, "hot"), { at: MAP });
  const mapDots = put(sc, "mapDots", cloud(10, 0.5, "hot", 5), { at: [MAP[0], MAP[1], 0.3] });
  const pred = put(sc, "pred", model(1.1, 0.8, "accent"), { at: [2.5, -0.4, 0] });
  const predProt = put(sc, "predProt", protein(0.45, "accent"), { at: [2.5, -1.6, 0] });
  const lig = put(sc, "lig", octahedron(0.1, "accent", true), { at: [MAP[0] + 0.3, MAP[1] - 0.1, 0.5] });
  const cost = put(sc, "cost", disc(0.2, 10, "hot", "z"), { at: [-2.3, -1.6, 0] });
  const costStack: Part[] = []; for (let i = 0; i < 2; i++) costStack.push(put(sc, `cs${i}`, disc(0.2, 10, "hot", "z"), { at: [-2.3, -1.5 + 0.1 * i, 0.05 * (i + 1)] }));
  const disorder = put(sc, "disorder", polyline([[MAP[0] - 0.9, MAP[1] + 0.6, 0.2], [MAP[0] - 0.7, MAP[1] + 0.85, 0.2], [MAP[0] - 0.45, MAP[1] + 0.65, 0.2], [MAP[0] - 0.2, MAP[1] + 0.9, 0.2]], "soft"));
  const disorderQ = put(sc, "disorderQ", ring(0.3, 10, "hot", "z"), { at: [MAP[0] - 0.55, MAP[1] + 0.8, 0.25] });
  sc.mesh.labels = [L([EM[0], EM[1] + 1.65, 0], "Cryo-EM (Krios, Glacios, CRYO ARM): membrane proteins and large complexes"), L([SYN[0], SYN[1] + 1.35, 0], "Synchrotron beamlines: Diamond, ESRF, APS, SPring-8"), L([2.5, 0.35, 0], "AlphaFold, RoseTTAFold, ESMFold, Boltz: near-experimental accuracy"), L([-1.0, -2.3, 0], "$5-10M per instrument; disordered regions poorly captured; predictions need validation")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, xBeam, crystal, mapP, mapDots, pred, predProt, lig, cost, ...costStack, disorder, disorderQ);
    setAlpha(alpha, synRing, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, emCol, 1); setAlpha(alpha, eBeam, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 8))); setAlpha(alpha, grid, 1); setAlpha(alpha, mapDots, clamp(u * 2 - 1) * 0.6); return { caption: "1 · A cancer protein frozen in a thin film of ice is imaged by cryo-electron microscopy; averaging many particle images gives an atomic-resolution map, which has resolved membrane proteins and large complexes that resisted crystallography" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, eBeam, 0.5); setAlpha(alpha, mapDots, 0.6); setAlpha(alpha, synRing, 1); setAlpha(alpha, xBeam, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 8))); setAlpha(alpha, crystal, clamp(u * 2 - 0.5)); movePart(pts, base, crystal, [0, 0, 0], 1, t * TAU); return { caption: "2 · Synchrotron beamlines fire intense X-rays at protein crystals; the scattering pattern yields a second route to atomic detail, run at national facilities and by CROs such as Creoptix, Proteros and Charles River" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, eBeam, 0.5); setAlpha(alpha, synRing, 1); setAlpha(alpha, xBeam, 0.5); setAlpha(alpha, crystal, 1); movePart(pts, base, crystal, [0, 0, 0], 1, t * TAU); setAlpha(alpha, mapDots, 0.6 * (1 - u)); setAlpha(alpha, mapP, clamp(u * 1.5)); setAlpha(alpha, lig, clamp(u * 2 - 1)); moveTo(pts, base, lig, [MAP[0] + 1.2, MAP[1] - 0.8, 0.5], [MAP[0] + 0.3, MAP[1] - 0.1, 0.5], clamp(u * 2 - 1)); setAlpha(alpha, pred, clamp(u * 2 - 0.5)); setAlpha(alpha, predProt, clamp(u * 2 - 1)); return { caption: "3 · The maps show chemists what KRAS, a molecular glue target or a PROTAC ternary complex looks like, and deep learning trained on the Protein Data Bank (AlphaFold 2/3, RoseTTAFold, ESMFold, Boltz) now predicts many structures at near-experimental accuracy" }; }
    const u = Q(t, 3); setAlpha(alpha, eBeam, 0.5); setAlpha(alpha, synRing, 1); setAlpha(alpha, xBeam, 0.5); setAlpha(alpha, crystal, 1); movePart(pts, base, crystal, [0, 0, 0], 1, t * TAU); setAlpha(alpha, mapP, 1); setAlpha(alpha, lig, 1); moveTo(pts, base, lig, [MAP[0] + 1.2, MAP[1] - 0.8, 0.5], [MAP[0] + 0.3, MAP[1] - 0.1, 0.5], 1); setAlpha(alpha, pred, 1); setAlpha(alpha, predProt, 1);
    setAlpha(alpha, cost, clamp(u * 2)); cascade(alpha, costStack, clamp(u * 2 - 0.3)); setAlpha(alpha, disorder, clamp(u * 2 - 0.6)); movePart(pts, base, disorder, [0.05 * Math.sin(t * TAU * 4), 0.05 * Math.cos(t * TAU * 3), 0], 1); setAlpha(alpha, disorderQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Instruments cost $5-10M plus a facility, dynamic and disordered regions are poorly captured by any method, and predicted structures still need experimental validation before a drug is designed against them" };
  });
}

// ---------------------------------------------------------------- 55. targeting the tumour's own microbes
export function tumourMicrobiome(): Mesh {
  const sc = scene();
  const TUM: Vec3 = [-1.2, 0.5, 0];
  const tum = put(sc, "tum", blob(1.05, "hot"), { at: TUM });
  const bugs: Part[] = []; for (let i = 0; i < 6; i++) bugs.push(put(sc, `bug${i}`, ellipsoid(0.14, 0.07, 0.07, 3, 6, "accent", true), { at: [TUM[0] - 0.5 + 0.35 * (i % 3), TUM[1] - 0.3 + 0.5 * Math.floor(i / 3), 0.4], rotZ: 0.5 * i }));
  const gem = put(sc, "gem", capsule(1.1, "soft"), { at: [1.6, 1.6, 0] });
  const gemBits: Part[] = []; for (let i = 0; i < 4; i++) gemBits.push(put(sc, `gb${i}`, mote(0.05, "soft"), { at: [TUM[0] + 0.3, TUM[1] + 0.2, 0.45] }));
  const shield = put(sc, "shield", ring(1.2, 16, "accent", "z"), { at: TUM });
  const anti = put(sc, "anti", octahedron(0.14, "accent", true), { at: [1.6, 0.2, 0] });
  const bugX: Part[] = []; for (let i = 0; i < 6; i++) bugX.push(put(sc, `bx${i}`, cross([TUM[0] - 0.5 + 0.35 * (i % 3), TUM[1] - 0.3 + 0.5 * Math.floor(i / 3), 0.45], 0.08, "hot")));
  const gut = put(sc, "gut", tube(0.3, 3.0, "soft"), { at: [0.8, -1.5, 0] });
  const flora: Part[] = []; for (let i = 0; i < 7; i++) flora.push(put(sc, `fl${i}`, mote(0.05, "accent"), { at: [-0.5 + 0.4 * i, -1.5 + 0.12 * Math.sin(i * 2), 0.2] }));
  const broad = put(sc, "broad", capsule(1.1, "hot"), { at: [2.7, -0.6, 0] });
  const io = put(sc, "io", vial(0.13, 0.45, "accent"), { at: [2.7, -1.5, 0] });
  const ioDown = put(sc, "ioDown", arrow([2.7, -1.9, 0.05], [2.7, -2.4, 0.05], "hot", 0.1));
  const preclin = put(sc, "preclin", cross([-2.6, -1.6, 0.05], 0.2));
  const mouse = put(sc, "mouse", ellipsoid(0.35, 0.18, 0.18, 3, 8, "soft", true), { at: [-2.6, -1.1, 0] });
  sc.mesh.labels = [L([TUM[0], TUM[1] + 1.5, 0], "Intratumoural bacteria: Fusobacterium nucleatum, gammaproteobacteria"), L([1.6, 2.1, 0], "Gemcitabine metabolised inside pancreatic tumours"), L([1.6, -0.3, 0], "Targeted antimicrobial removes the shelter"), L([1.2, -2.5, 0], "Broad antibiotics damage the gut microbiome that immunotherapy depends on")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...gemBits, shield, anti, ...bugX, broad, io, ioDown, preclin, mouse);
    setAlpha(alpha, gut, 0.4); flora.forEach((f) => setAlpha(alpha, f, 0.4));
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tum, 0.8); bugs.forEach((b, i) => { setAlpha(alpha, b, clamp(u * 2 - 0.2 * i)); movePart(pts, base, b, [0.03 * Math.sin(t * TAU * 3 + i), 0.03 * Math.cos(t * TAU * 3 + i), 0], 1); }); setAlpha(alpha, gem, 0.5); return { caption: "1 · Many tumours contain their own bacteria and fungi; Fusobacterium nucleatum is associated with colorectal cancer progression and chemoresistance" }; }
    if (s === 1) { const u = Q(t, 1); bugs.forEach((b, i) => { setAlpha(alpha, b, 1); movePart(pts, base, b, [0.03 * Math.sin(t * TAU * 3 + i), 0.03 * Math.cos(t * TAU * 3 + i), 0], 1); }); setAlpha(alpha, gem, 1 - 0.8 * clamp(u * 2 - 1)); moveTo(pts, base, gem, [1.6, 1.6, 0], [TUM[0] + 0.3, TUM[1] + 0.2, 0.45], clamp(u * 1.6)); gemBits.forEach((g, i) => { const v = clamp(u * 2 - 1 - 0.1 * i); setAlpha(alpha, g, v); movePart(pts, base, g, [0.4 * v * Math.cos(i * 1.6), 0.4 * v * Math.sin(i * 1.6), 0], 1); }); setAlpha(alpha, shield, clamp(u * 2 - 1) * 0.6); return { caption: "2 · Inside pancreatic tumours, gammaproteobacteria can metabolise gemcitabine before it reaches cancer cells, and microbial signalling suppresses immunity: the microbes shelter the tumour" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, gem, 0.2); moveTo(pts, base, gem, [1.6, 1.6, 0], [TUM[0] + 0.3, TUM[1] + 0.2, 0.45], 1); gemBits.forEach((g, i) => { setAlpha(alpha, g, 0.5); movePart(pts, base, g, [0.4 * Math.cos(i * 1.6), 0.4 * Math.sin(i * 1.6), 0], 1); }); setAlpha(alpha, shield, 0.6 * (1 - u)); setAlpha(alpha, anti, 1); moveTo(pts, base, anti, [1.6, 0.2, 0], [TUM[0] + 0.3, TUM[1] - 0.1, 0.5], clamp(u * 1.5), 1, u * 4); bugs.forEach((b, i) => setAlpha(alpha, b, 1 - 0.7 * clamp(u * 2 - 0.6 - 0.1 * i))); bugX.forEach((x, i) => setAlpha(alpha, x, clamp(u * 2 - 0.6 - 0.1 * i))); return { caption: "3 · Selectively eliminating tumour-resident microbes with a targeted antimicrobial would remove the drug-degrading enzymes and immunosuppressive signalling from inside the tumour, whatever the tumour's genotype" }; }
    const u = Q(t, 3); setAlpha(alpha, gem, 0.2); moveTo(pts, base, gem, [1.6, 1.6, 0], [TUM[0] + 0.3, TUM[1] + 0.2, 0.45], 1); gemBits.forEach((g, i) => { setAlpha(alpha, g, 0.5); movePart(pts, base, g, [0.4 * Math.cos(i * 1.6), 0.4 * Math.sin(i * 1.6), 0], 1); }); setAlpha(alpha, anti, 1); moveTo(pts, base, anti, [1.6, 0.2, 0], [TUM[0] + 0.3, TUM[1] - 0.1, 0.5], 1, 1, 4); bugs.forEach((b) => setAlpha(alpha, b, 0.3)); bugX.forEach((x) => setAlpha(alpha, x, 1));
    setAlpha(alpha, gut, 0.4 + 0.6 * clamp(u * 2)); setAlpha(alpha, broad, clamp(u * 2)); moveTo(pts, base, broad, [2.7, -0.6, 0], [1.8, -1.4, 0.3], clamp(u * 2 - 0.3)); flora.forEach((f, i) => setAlpha(alpha, f, 1 - 0.8 * clamp(u * 2 - 0.6 - 0.05 * i))); setAlpha(alpha, io, clamp(u * 2 - 0.8)); setAlpha(alpha, ioDown, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, mouse, clamp(u * 2 - 0.5)); setAlpha(alpha, preclin, clamp(u * 2 - 1));
    return { caption: "4 · Broad antibiotics also wipe out the gut microbiome that immunotherapy response depends on, causality versus association is unsettled, and there are no clinical trials of targeted intratumoural antimicrobials: the strategy is preclinical" };
  });
}

// ---------------------------------------------------------------- 56. very-high-energy electron therapy
export function vheeRadiotherapy(): Mesh {
  const sc = scene();
  const linac = put(sc, "linac", box(1.3, 0.5, 0.5, "accent", true), { at: [-2.4, 1.2, 0] });
  const eBeam = put(sc, "eBeam", beam([-1.75, 1.2, 0], [0.4, 0.2, 0], 0.18, "accent"));
  const mags: Part[] = []; for (let i = 0; i < 2; i++) mags.push(put(sc, `mag${i}`, box(0.25, 0.5, 0.5, "soft", true), { at: [-1.0, 1.35 - 0.7 * i, 0] }));
  const P: Vec3 = [1.4, 0.0, 0];
  const body = put(sc, "body", organ(1.2, 0.9, 0.6, "soft"), { at: P });
  const tum = put(sc, "tum", blob(0.3, "hot"), { at: [P[0] + 0.3, P[1], 0.2] });
  const scanSpots: Part[] = []; for (let i = 0; i < 5; i++) scanSpots.push(put(sc, `sp${i}`, mote(0.05, "accent"), { at: [P[0] + 0.3 + 0.2 * Math.cos(i * 1.26), P[1] + 0.2 * Math.sin(i * 1.26), 0.3] }));
  const AX: Vec3 = [-2.8, -2.2, 0];
  const dd = put(sc, "dd", axes(AX, 2.2, 1.4));
  const photon = put(sc, "photon", polyline([[AX[0] + 0.1, AX[1] + 0.9, 0], [AX[0] + 0.5, AX[1] + 1.2, 0], [AX[0] + 1.2, AX[1] + 0.7, 0], [AX[0] + 2.0, AX[1] + 0.35, 0]], "soft"));
  const vhee = put(sc, "vhee", polyline([[AX[0] + 0.1, AX[1] + 0.9, 0], [AX[0] + 0.7, AX[1] + 0.95, 0], [AX[0] + 1.4, AX[1] + 0.95, 0], [AX[0] + 2.0, AX[1] + 0.9, 0]], "accent"));
  const clock = put(sc, "clock", clockFace(0.28), { at: [0.2, -1.6, 0] });
  const flash = put(sc, "flash", polyline([[0.5, -1.2, 0], [0.35, -1.55, 0], [0.55, -1.55, 0], [0.4, -1.95, 0]], "accent"));
  const proton = put(sc, "proton", building(1.2, 0.9), { at: [2.4, -1.5, 0] });
  const compact = put(sc, "compact", box(0.5, 0.4, 0.4, "accent", true), { at: [1.5, -1.7, 0] });
  const noPt = put(sc, "noPt", cross([P[0] + 1.6, P[1] + 0.9, 0.05], 0.2));
  const dosiQ = put(sc, "dosiQ", ring(0.3, 10, "hot", "z"), { at: [0.2, -1.6, 0.05] });
  sc.mesh.labels = [L([-2.4, 1.75, 0], "Electrons at 100-250 MeV, steered by magnets"), L([P[0], P[1] + 1.25, 0], "Deep target, magnetic scanning"), L([AX[0] + 1.1, AX[1] - 0.35, 0], "Relatively flat depth dose"), L([1.9, -2.3, 0], "No VHEE patient treated by September 2026; a fraction of a proton facility's cost")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...scanSpots, dd, photon, vhee, clock, flash, proton, compact, noPt, dosiQ);
    setAlpha(alpha, body, 0.6);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, linac, 1); setAlpha(alpha, eBeam, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 8))); mags.forEach((m) => setAlpha(alpha, m, clamp(u * 2 - 0.5))); setAlpha(alpha, tum, 0.8); return { caption: "1 · Ordinary electron beams stop within a few centimetres; accelerate electrons to 100-250 MeV and they penetrate deeply, from a compact machine" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, eBeam, 0.7); mags.forEach((m) => setAlpha(alpha, m, 1)); const sw = 0.12 * Math.sin(t * TAU * 4) * u; for (let i = eBeam.p0; i < eBeam.p1; i++) { if (base[i][0] > -1.0) pts[i] = [base[i][0], base[i][1] + sw * (base[i][0] + 1.0), base[i][2]]; } scanSpots.forEach((p, i) => setAlpha(alpha, p, clamp(u * 2 - 0.2 * i))); return { caption: "2 · Because electrons are charged, magnets steer the beam quickly and precisely across the target, a scanning method that is fast and needs no heavy gantry" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, eBeam, 0.7); mags.forEach((m) => setAlpha(alpha, m, 1)); const sw = 0.12 * Math.sin(t * TAU * 4); for (let i = eBeam.p0; i < eBeam.p1; i++) { if (base[i][0] > -1.0) pts[i] = [base[i][0], base[i][1] + sw * (base[i][0] + 1.0), base[i][2]]; } scanSpots.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, dd, clamp(u * 2)); grow(alpha, photon, clamp(u * 2 - 0.3)); grow(alpha, vhee, clamp(u * 2 - 0.6)); setAlpha(alpha, clock, clamp(u * 2 - 0.8)); movePart(pts, base, clock, [0, 0, 0], 1, t * TAU * 6 * clamp(u * 2 - 0.8)); setAlpha(alpha, flash, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 8))); return { caption: "3 · The depth dose is relatively flat and can be shaped magnetically, and the dose can be delivered in milliseconds at the ultra-high rates linked to the FLASH effect, which may spare normal tissue at depth" }; }
    const u = Q(t, 3); setAlpha(alpha, eBeam, 0.7); mags.forEach((m) => setAlpha(alpha, m, 1)); const sw = 0.12 * Math.sin(t * TAU * 4); for (let i = eBeam.p0; i < eBeam.p1; i++) { if (base[i][0] > -1.0) pts[i] = [base[i][0], base[i][1] + sw * (base[i][0] + 1.0), base[i][2]]; } scanSpots.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, dd, 1); setAlpha(alpha, photon, 1); setAlpha(alpha, vhee, 1); setAlpha(alpha, clock, 1); movePart(pts, base, clock, [0, 0, 0], 1, t * TAU * 6); setAlpha(alpha, flash, 0.8);
    setAlpha(alpha, proton, clamp(u * 2) * 0.7); setAlpha(alpha, compact, clamp(u * 2 - 0.3)); setAlpha(alpha, noPt, clamp(u * 2 - 0.7) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, dosiQ, clamp(u * 2 - 1) * 0.7);
    return { caption: "4 · Work at CHUV/CERN, SLAC and elsewhere is at the accelerator and preclinical stage: no VHEE patient had been treated by September 2026, dosimetry at ultra-high dose rate is unsolved, and FLASH sparing itself remains unproven in humans" };
  });
}

// ---------------------------------------------------------------- 57. American ginseng for cancer-related fatigue
export function americanGinseng(): Mesh {
  const sc = scene();
  const root = put(sc, "root", polyline([[-2.6, 1.9, 0], [-2.5, 1.5, 0], [-2.7, 1.1, 0], [-2.55, 0.7, 0], [-2.75, 0.35, 0]], "accent"));
  const rootlets: Part[] = []; [[-2.5, 1.5], [-2.7, 1.1], [-2.55, 0.7]].forEach((p, i) => rootlets.push(put(sc, `rl${i}`, line([p[0], p[1], 0], [p[0] + (i % 2 ? -0.35 : 0.35), p[1] - 0.25, 0], "accent"))));
  const rootBody = put(sc, "rootBody", ellipsoid(0.18, 0.85, 0.15, 3, 8, "accent", true), { at: [-2.6, 1.1, 0] });
  const caps: Part[] = []; for (let i = 0; i < 4; i++) caps.push(put(sc, `cap${i}`, capsule(0.9, "accent"), { at: [-1.5 + 0.35 * (i % 2), 1.6 - 0.3 * Math.floor(i / 2), 0] }));
  const weeks = put(sc, "weeks", ticks(-1.7, 0.3, 0.7, 8, "soft"));
  const P: Vec3 = [1.6, 0.4, 0];
  const person = put(sc, "person", figure("soft"), { at: P, scale: 1.0 });
  const chemo = put(sc, "chemo", vial(0.13, 0.45, "hot"), { at: [P[0] - 0.85, P[1] + 0.3, 0.1] });
  const fat0 = put(sc, "fat0", bar(2.6, 1.2, 0.25, "hot"), { at: [0, -1.8, 0] });
  const fat1 = put(sc, "fat1", bar(3.0, 0.8, 0.25, "accent"), { at: [0, -1.8, 0] });
  const pbo = put(sc, "pbo", bar(2.2, 1.15, 0.25, "soft"), { at: [0, -1.8, 0] });
  const after = put(sc, "after", figure("soft"), { at: [0.3, -1.5, 0], scale: 0.6 });
  const afterX = put(sc, "afterX", cross([0.3, -1.5, 0.1], 0.25));
  const asian = put(sc, "asian", leaf(0.3, "hot"), { at: [-1.6, -1.4, 0] });
  const asianX = put(sc, "asianX", cross([-1.6, -1.4, 0.1], 0.22));
  const warf = put(sc, "warf", capsule(0.9, "hot"), { at: [-2.6, -1.4, 0] });
  const warfQ = put(sc, "warfQ", ring(0.3, 10, "hot", "z"), { at: [-2.6, -1.4, 0.1] });
  sc.mesh.labels = [L([-2.6, 2.3, 0], "Panax quinquefolius: pure ground Wisconsin root"), L([-0.7, 1.15, 0], "2,000 mg a day for eight weeks"), L([2.5, -2.2, 0], "364 patients (JNCI 2013): fatigue improved vs placebo, mainly during treatment"), L([-1.5, -2.05, 0], "Not Asian ginseng in hormone-sensitive cancers; caution with warfarin and imatinib")];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, weeks, chemo, fat0, fat1, pbo, after, afterX, asian, asianX, warf, warfQ);
    setAlpha(alpha, person, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, rootBody, 0.6); grow(alpha, root, clamp(u * 1.5)); rootlets.forEach((r, i) => setAlpha(alpha, r, clamp(u * 3 - 1 - 0.3 * i))); caps.forEach((c, i) => setAlpha(alpha, c, clamp(u * 3 - 1.5 - 0.2 * i))); return { caption: "1 · American ginseng root is ground and given as capsules; ginsenosides are proposed to modulate cortisol regulation and the inflammatory cytokines behind cancer-related fatigue, though the mechanism in humans is not established" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, rootBody, 0.6); caps.forEach((c) => setAlpha(alpha, c, 1)); grow(alpha, weeks, clamp(u * 1.3)); setAlpha(alpha, person, 0.5 + 0.5 * clamp(u * 2 - 0.5)); setAlpha(alpha, chemo, clamp(u * 2 - 1)); return { caption: "2 · In a double-blind randomised trial of 364 patients (Barton, JNCI 2013), 2,000 mg a day of pure ground Wisconsin root for eight weeks was compared with placebo" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, rootBody, 0.6); caps.forEach((c) => setAlpha(alpha, c, 1)); setAlpha(alpha, weeks, 1); setAlpha(alpha, person, 1); setAlpha(alpha, chemo, 1); grow(alpha, pbo, clamp(u * 2)); grow(alpha, fat0, clamp(u * 2 - 0.3)); grow(alpha, fat1, clamp(u * 2 - 0.7)); setAlpha(alpha, after, clamp(u * 2 - 0.8) * 0.6); setAlpha(alpha, afterX, clamp(u * 2 - 1.1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "3 · Fatigue scores improved modestly compared with placebo, with the benefit concentrated in patients still receiving active treatment and no excess toxicity; the 2024 SIO-ASCO fatigue guideline says it may be offered during treatment, not after" }; }
    const u = Q(t, 3); setAlpha(alpha, rootBody, 0.6); caps.forEach((c) => setAlpha(alpha, c, 1)); setAlpha(alpha, weeks, 1); setAlpha(alpha, person, 1); setAlpha(alpha, chemo, 1); show(alpha, 1, pbo, fat0, fat1); setAlpha(alpha, after, 0.6); setAlpha(alpha, afterX, 0.7);
    setAlpha(alpha, asian, clamp(u * 2)); setAlpha(alpha, asianX, clamp(u * 2 - 0.4) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, warf, clamp(u * 2 - 0.7)); setAlpha(alpha, warfQ, clamp(u * 2 - 1) * 0.7);
    return { caption: "4 · It is a single confirmatory trial; commercial products vary widely in ginsenoside content and some contain Asian ginseng, whose oestrogenic activity is a concern in hormone-sensitive cancers, and ginseng may interact with warfarin and imatinib" };
  });
}

// ---------------------------------------------------------------- 58. antibody-oligonucleotide conjugates
export function antibodyOligoConjugates(): Mesh {
  const sc = scene();
  const CELL: Vec3 = [1.0, -0.2, 0];
  const c = put(sc, "cell", cell(1.35, "soft"), { at: CELL });
  const rec = put(sc, "rec", ring(0.16, 8, "hot", "z"), { at: [CELL[0] - 1.35, CELL[1] + 0.3, 0.2] });
  const AB0: Vec3 = [-2.4, 0.9, 0];
  const ab = put(sc, "ab", polyline([[-0.3, -0.35, 0], [0, 0, 0], [0.3, -0.35, 0], [0, 0, 0], [0, 0.45, 0]], "accent"), { at: AB0, rotZ: -Math.PI / 2 });
  const oligo = put(sc, "oligo", helix(0.06, 0.6, 3, 16, "hot"), { at: [AB0[0] - 0.75, AB0[1], 0], rotZ: Math.PI / 2 });
  const noPayload = put(sc, "noPayload", octahedron(0.1, "soft"), { at: [-2.4, 1.9, 0] });
  const noPayloadX = put(sc, "noPayloadX", cross([-2.4, 1.9, 0.1], 0.16));
  const endo = put(sc, "endo", ring(0.45, 12, "soft", "z"), { at: [CELL[0] - 0.5, CELL[1] + 0.1, 0.3] });
  const trapped: Part[] = []; for (let i = 0; i < 6; i++) trapped.push(put(sc, `tr${i}`, mote(0.05, "hot"), { at: [CELL[0] - 0.5 + 0.25 * Math.cos(i * 1.05), CELL[1] + 0.1 + 0.25 * Math.sin(i * 1.05), 0.35] }));
  const escaped = put(sc, "esc", mote(0.06, "hot"), { at: [CELL[0] - 0.5, CELL[1] + 0.1, 0.4] });
  const mrna = put(sc, "mrna", helix(0.06, 0.9, 4, 20, "soft"), { at: [CELL[0] + 0.5, CELL[1] - 0.4, 0.3], rotZ: Math.PI / 2 });
  const risc = put(sc, "risc", blob(0.16, "accent"), { at: [CELL[0] + 0.5, CELL[1] - 0.4, 0.4] });
  const mrnaX = put(sc, "mrnaX", cross([CELL[0] + 0.5, CELL[1] - 0.4, 0.45], 0.2, "accent"));
  const muscle = put(sc, "muscle", ellipsoid(0.5, 0.22, 0.2, 3, 8, "accent", true), { at: [-2.2, -1.5, 0] });
  const muscleOk = put(sc, "muscleOk", tick([-1.6, -1.45, 0.05], 0.16));
  const oncoX = put(sc, "oncoX", cross([-0.8, -1.5, 0.05], 0.2));
  const pct = put(sc, "pct", bar(-0.4, 1.1, 0.22, "soft"), { at: [0, -2.4, 0] });
  const pctEsc = put(sc, "pctEsc", bar(-0.1, 0.12, 0.22, "hot"), { at: [0, -2.4, 0] });
  sc.mesh.labels = [L([AB0[0], AB0[1] + 0.8, 0], "Antibody carrying siRNA or antisense instead of a toxin"), L([CELL[0], CELL[1] + 1.65, 0], "Internalised into the endosome"), L([CELL[0] + 0.6, CELL[1] - 1.05, 0], "A fraction escapes to RISC or RNase H and silences the transcript"), L([-1.5, -2.05, 0], "Muscle programmes furthest along; no oncology candidate")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, noPayload, noPayloadX, endo, ...trapped, escaped, mrna, risc, mrnaX, muscle, muscleOk, oncoX, pct, pctEsc);
    setAlpha(alpha, c, 0.6);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, ab, 1); setAlpha(alpha, oligo, clamp(u * 2 - 0.5)); movePart(pts, base, oligo, [0, 0, 0], 1, t * TAU); setAlpha(alpha, noPayload, clamp(u * 2) * 0.6); setAlpha(alpha, noPayloadX, clamp(u * 2 - 0.3)); setAlpha(alpha, rec, 0.5 + 0.5 * pulse(t, 4)); return { caption: "1 · Take the antibody-drug conjugate and swap the chemotherapy payload for a gene-silencing strand of siRNA or antisense, built on mature ADC conjugation chemistry" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, noPayload, 0.4); setAlpha(alpha, noPayloadX, 0.4); const to: Vec3 = [CELL[0] - 1.35, CELL[1] + 0.3, 0.2]; moveTo(pts, base, ab, AB0, [to[0] - 0.45, to[1], to[2]], clamp(u * 1.5)); moveTo(pts, base, oligo, [AB0[0] - 0.75, AB0[1], 0], [to[0] - 1.2, to[1], to[2]], clamp(u * 1.5)); movePart(pts, base, oligo, [0, 0, 0], 1, t * TAU); setAlpha(alpha, rec, 1); setAlpha(alpha, endo, clamp(u * 2 - 1) * 0.6); return { caption: "2 · The antibody binds a receptor on the target cell and is internalised, carrying the oligonucleotide into the endosome; this is the leading attempt to deliver nucleic-acid drugs beyond the liver" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, noPayload, 0.4); setAlpha(alpha, noPayloadX, 0.4); setAlpha(alpha, ab, 0.3); setAlpha(alpha, oligo, 0.3); const to: Vec3 = [CELL[0] - 1.35, CELL[1] + 0.3, 0.2]; moveTo(pts, base, ab, AB0, [to[0] - 0.45, to[1], to[2]], 1); moveTo(pts, base, oligo, [AB0[0] - 0.75, AB0[1], 0], [to[0] - 1.2, to[1], to[2]], 1); setAlpha(alpha, endo, 0.8); trapped.forEach((p) => setAlpha(alpha, p, clamp(u * 2))); setAlpha(alpha, escaped, clamp(u * 2 - 0.6)); moveTo(pts, base, escaped, [CELL[0] - 0.5, CELL[1] + 0.1, 0.4], [CELL[0] + 0.5, CELL[1] - 0.4, 0.45], clamp(u * 2 - 0.8)); setAlpha(alpha, mrna, clamp(u * 2 - 0.5)); setAlpha(alpha, risc, clamp(u * 2 - 1)); setAlpha(alpha, mrnaX, clamp(u * 2 - 1.3) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · Only a small fraction of the internalised payload escapes the endosome into the cytosol, where it engages RISC or RNase H and switches off the transcript of an undruggable driver" }; }
    const u = Q(t, 3); setAlpha(alpha, noPayload, 0.4); setAlpha(alpha, noPayloadX, 0.4); setAlpha(alpha, ab, 0.3); setAlpha(alpha, oligo, 0.3); const to: Vec3 = [CELL[0] - 1.35, CELL[1] + 0.3, 0.2]; moveTo(pts, base, ab, AB0, [to[0] - 0.45, to[1], to[2]], 1); moveTo(pts, base, oligo, [AB0[0] - 0.75, AB0[1], 0], [to[0] - 1.2, to[1], to[2]], 1); setAlpha(alpha, endo, 0.8); trapped.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, escaped, 1); moveTo(pts, base, escaped, [CELL[0] - 0.5, CELL[1] + 0.1, 0.4], [CELL[0] + 0.5, CELL[1] - 0.4, 0.45], 1); setAlpha(alpha, mrna, 1); setAlpha(alpha, risc, 1); setAlpha(alpha, mrnaX, 1);
    grow(alpha, pct, clamp(u * 2)); grow(alpha, pctEsc, clamp(u * 2 - 0.4)); setAlpha(alpha, muscle, clamp(u * 2 - 0.5)); setAlpha(alpha, muscleOk, clamp(u * 2 - 0.8)); setAlpha(alpha, oncoX, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Endosomal escape efficiency is very low and oligonucleotide backbones can be immunostimulatory; programmes in muscle disease are furthest along, and no oncology clinical candidate has been reported" };
  });
}

// ---------------------------------------------------------------- 59. cell-therapy release and potency testing
export function releaseTesting(): Mesh {
  const sc = scene();
  const BAG: Vec3 = [-2.4, 0.6, 0];
  const bag = put(sc, "bag", quad(1.0, 1.4, "accent"), { at: BAG });
  const bagCells = put(sc, "bagCells", cloud(10, 0.35, "accent", 6), { at: [BAG[0], BAG[1], 0.03] });
  const samples: Part[] = []; for (let i = 0; i < 4; i++) samples.push(put(sc, `sm${i}`, mote(0.06, "accent"), { at: [BAG[0] + 0.5, BAG[1], 0.1] }));
  const ST: Vec3[] = [[-0.6, 1.5, 0], [0.9, 1.5, 0], [-0.6, -0.4, 0], [0.9, -0.4, 0]];
  const dish = put(sc, "dish", cylinder(0.35, 0.1, 10, 2, "soft", true, true), { at: ST[0] });
  const flowAx = put(sc, "flowAx", axes([ST[1][0] - 0.4, ST[1][1] - 0.35, 0], 0.8, 0.7));
  const flowDots = put(sc, "flowDots", cloud(8, 0.25, "accent", 3), { at: [ST[1][0] + 0.1, ST[1][1] + 0.05, 0.02] });
  const qpcr: Part[] = []; for (let i = 0; i < 3; i++) qpcr.push(put(sc, `q${i}`, bar(ST[2][0] - 0.25 + 0.25 * i, 0.3 + 0.2 * i, 0.15, "accent"), { at: [0, ST[2][1] - 0.35, 0] }));
  const rcl = put(sc, "rcl", octahedron(0.16, "hot"), { at: ST[3] });
  const rclX = put(sc, "rclX", cross([ST[3][0], ST[3][1], 0.1], 0.2, "accent"));
  const ticksAll: Part[] = []; ST.forEach((p, i) => ticksAll.push(put(sc, `tk${i}`, tick([p[0] + 0.55, p[1] + 0.35, 0.05], 0.12))));
  const d14 = put(sc, "d14", ticks(1.7, 3.0, 0.8, 5, "hot"));
  const d7 = put(sc, "d7", ticks(1.7, 2.35, 0.3, 3, "accent"));
  const clock = put(sc, "clock", clockFace(0.3), { at: [2.4, -0.6, 0] });
  const potQ = put(sc, "potQ", ring(0.35, 10, "hot", "z"), { at: [2.4, -1.7, 0.05] });
  const potBar = put(sc, "potBar", bar(2.4, 0.5, 0.2, "soft"), { at: [0, -2.0, 0] });
  const consumed = put(sc, "consumed", quad(1.0, 0.35, "hot"), { at: [BAG[0], BAG[1] - 0.52, 0.05] });
  sc.mesh.labels = [L([BAG[0], BAG[1] + 1.05, 0], "Final CAR-T product"), L([0.15, 2.1, 0], "Sterility, mycoplasma, endotoxin, identity (HLA)"), L([0.15, -1.15, 0], "Viability and CAR expression by flow; vector copy number; replication-competent lentivirus"), L([2.4, 1.3, 0], "Rapid sterility (BacT/ALERT): 14 days to about 7")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...samples, ...ticksAll, d14, d7, clock, potQ, potBar, consumed);
    show(alpha, 0.35, dish, flowAx, flowDots, ...qpcr, rcl, rclX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, bag, 1); setAlpha(alpha, bagCells, 0.5 + 0.5 * u); samples.forEach((p, i) => { const v = clamp(u * 1.6 - 0.15 * i); setAlpha(alpha, p, v > 0 ? 1 : 0); moveTo(pts, base, p, [BAG[0] + 0.5, BAG[1], 0.1], ST[i], v); }); return { caption: "1 · Before a CAR-T batch can be infused, samples are drawn from the final product for a panel of release tests with acceptance criteria fixed in the marketing authorisation" }; }
    if (s === 1) { const u = Q(t, 1); samples.forEach((p, i) => { setAlpha(alpha, p, 0.5); moveTo(pts, base, p, [BAG[0] + 0.5, BAG[1], 0.1], ST[i], 1); }); setAlpha(alpha, dish, 0.35 + 0.65 * clamp(u * 2)); setAlpha(alpha, flowAx, 0.35 + 0.65 * clamp(u * 2 - 0.3)); setAlpha(alpha, flowDots, 0.35 + 0.65 * clamp(u * 2 - 0.3)); ticksAll.slice(0, 2).forEach((tk, i) => setAlpha(alpha, tk, clamp(u * 2 - 0.8 - 0.2 * i))); return { caption: "2 · Sterility, mycoplasma PCR, endotoxin and HLA identity confirm the product is clean and is this patient's; flow cytometry counts live cells and the share that express the CAR" }; }
    if (s === 2) { const u = Q(t, 2); samples.forEach((p, i) => { setAlpha(alpha, p, 0.5); moveTo(pts, base, p, [BAG[0] + 0.5, BAG[1], 0.1], ST[i], 1); }); show(alpha, 1, dish, flowAx, flowDots); ticksAll.slice(0, 2).forEach((tk) => setAlpha(alpha, tk, 1)); qpcr.forEach((q, i) => setAlpha(alpha, q, 0.35 + 0.65 * clamp(u * 2 - 0.2 * i))); setAlpha(alpha, rcl, 0.35 + 0.65 * clamp(u * 2 - 0.5)); setAlpha(alpha, rclX, 0.35 + 0.65 * clamp(u * 2 - 0.8)); ticksAll.slice(2).forEach((tk, i) => setAlpha(alpha, tk, clamp(u * 2 - 1 - 0.2 * i))); return { caption: "3 · qPCR measures vector copy number, a replication-competent lentivirus assay confirms no live virus, and a potency assay (cytokine release or cytotoxicity) shows the cells can kill" }; }
    const u = Q(t, 3); samples.forEach((p, i) => { setAlpha(alpha, p, 0.5); moveTo(pts, base, p, [BAG[0] + 0.5, BAG[1], 0.1], ST[i], 1); }); show(alpha, 1, dish, flowAx, flowDots, ...qpcr, rcl, rclX, ...ticksAll);
    grow(alpha, d14, clamp(u * 2)); grow(alpha, d7, clamp(u * 2 - 0.4)); setAlpha(alpha, clock, clamp(u * 2 - 0.3)); movePart(pts, base, clock, [0, 0, 0], 1, u * TAU); setAlpha(alpha, potBar, clamp(u * 2 - 0.7)); setAlpha(alpha, potQ, clamp(u * 2 - 0.9) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, consumed, clamp(u * 2 - 1) * 0.6);
    return { caption: "4 · Testing is a large share of vein-to-vein time: rapid sterility methods such as BacT/ALERT cut 14 days to about 7, potency assays predict clinical activity poorly, and every sample consumes product, so in-line and reduced-testing strategies are active regulatory topics" };
  });
}

// ---------------------------------------------------------------- 60. CT-FM (whole-body CT foundation model)
export function ctFm(): Mesh {
  const sc = scene();
  const ST: Vec3 = [-2.2, 0.3, 0];
  const slices: Part[] = []; for (let i = 0; i < 7; i++) slices.push(put(sc, `sl${i}`, quad(1.2, 0.5, "soft"), { at: [ST[0], ST[1] + 1.35 - 0.45 * i, -0.05 * i] }));
  const body = put(sc, "body", ellipsoid(0.35, 1.5, 0.05, 5, 8, "soft"), { at: [ST[0], ST[1], 0.03] });
  const mask: Part[] = []; for (let i = 0; i < 3; i++) mask.push(put(sc, `mk${i}`, quad(0.35, 0.3, "accent"), { at: [ST[0] - 0.3 + 0.3 * i, ST[1] + 0.9 - 0.9 * i, 0.06] }));
  const mod = put(sc, "model", model(1.4, 1.1, "accent"), { at: [0.2, 0.3, 0] });
  const segs: Part[] = []; [[1.9, 1.5, 0.35, 0.28], [2.5, 1.2, 0.25, 0.22], [2.1, 0.75, 0.3, 0.2]].forEach((o, i) => segs.push(put(sc, `sg${i}`, ellipsoid(o[2], o[3], 0.03, 3, 8, ["accent", "hot", "soft"][i]), { at: [o[0], o[1], 0] })));
  const flag = put(sc, "flag", polyline([[2.2, -0.5, 0], [2.2, 0.1, 0], [2.6, -0.05, 0], [2.2, -0.2, 0]], "hot"));
  const retr = put(sc, "retr", ring(0.22, 10, "accent", "z"), { at: [2.2, -1.2, 0] });
  const retrH = put(sc, "retrH", line([2.36, -1.36, 0], [2.6, -1.6, 0], "accent"));
  const research = put(sc, "research", doc(0.55, 0.65, 3, "soft"), { at: [-0.6, -1.7, 0] });
  const regQ = put(sc, "regQ", ring(0.4, 12, "hot", "z"), { at: [0.6, -1.7, 0.05] });
  const regDoc = put(sc, "regDoc", doc(0.5, 0.6, 3, "soft"), { at: [0.6, -1.7, 0] });
  sc.mesh.labels = [L([ST[0], ST[1] + 1.95, 0], "148,000 unlabelled CT volumes"), L([0.2, 1.2, 0], "3D self-supervised pretraining"), L([2.3, 2.05, 0], "Organ and tumour segmentation, triage, retrieval"), L([0, -2.3, 0], "Research release: no prospective evaluation or regulatory review")];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...mask, ...segs, flag, retr, retrH, research, regQ, regDoc);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, slices, clamp(u * 1.4)); setAlpha(alpha, body, clamp(u * 2 - 0.5)); return { caption: "1 · Whole-body CT volumes pile up in every hospital archive, almost none of them annotated; CT-FM was pretrained on 148,000 of them" }; }
    if (s === 1) { const u = Q(t, 1); slices.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, body, 1); mask.forEach((m, i) => setAlpha(alpha, m, clamp(u * 2 - 0.3 * i) * (0.6 + 0.4 * pulse(t, 4)))); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); return { caption: "2 · 3D self-supervised pretraining hides parts of each volume and learns to reconstruct them, so the model learns anatomy without labels and downstream tasks need far fewer annotations" }; }
    if (s === 2) { const u = Q(t, 2); slices.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, body, 1); mask.forEach((m) => setAlpha(alpha, m, 0.5)); setAlpha(alpha, mod, 1); cascade(alpha, segs, clamp(u * 1.5)); setAlpha(alpha, flag, clamp(u * 2 - 0.6)); setAlpha(alpha, retr, clamp(u * 2 - 1)); setAlpha(alpha, retrH, clamp(u * 2 - 1)); return { caption: "3 · The 2025 paper applies one shared backbone to organ segmentation, triage of findings and image retrieval, including tumour segmentation and follow-up in oncology" }; }
    const u = Q(t, 3); slices.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, body, 1); mask.forEach((m) => setAlpha(alpha, m, 0.5)); setAlpha(alpha, mod, 1); segs.forEach((sg) => setAlpha(alpha, sg, 1)); setAlpha(alpha, flag, 1); setAlpha(alpha, retr, 1); setAlpha(alpha, retrH, 1);
    setAlpha(alpha, research, clamp(u * 2)); setAlpha(alpha, regDoc, clamp(u * 2 - 0.5)); setAlpha(alpha, regQ, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · It remains a research release: prospective clinical evaluation and regulatory review have not been reported, so its performance in routine radiology is unknown" };
  });
}

// ---------------------------------------------------------------- 61. curcumin and turmeric
export function curcuminTurmeric(): Mesh {
  const sc = scene();
  const root = put(sc, "root", ellipsoid(0.55, 0.22, 0.2, 4, 8, "accent", true), { at: [-2.5, 1.5, 0], rotZ: 0.4 });
  const cap = put(sc, "cap", capsule(1.2, "accent"), { at: [-1.4, 1.5, 0] });
  const DISH: Vec3 = [0.9, 1.3, 0];
  const dish = put(sc, "dish", cylinder(0.6, 0.12, 12, 2, "soft", true, true), { at: DISH });
  const dCells: Part[] = []; for (let i = 0; i < 4; i++) dCells.push(put(sc, `dc${i}`, blob(0.12, "hot"), { at: [DISH[0] - 0.35 + 0.23 * i, DISH[1] + 0.1, 0.1 * (i % 2)] }));
  const targets: Part[] = []; for (let i = 0; i < 3; i++) targets.push(put(sc, `tg${i}`, cross([DISH[0] - 0.4 + 0.4 * i, DISH[1] + 0.55, 0.1], 0.08, "accent")));
  put(sc, "gut", tube(0.3, 3.4, "soft"), { at: [-0.4, -0.6, 0] });
  const inGut: Part[] = []; for (let i = 0; i < 6; i++) inGut.push(put(sc, `ig${i}`, mote(0.05, "accent"), { at: [-1.9, -0.6, 0.15] }));
  const blood = put(sc, "blood", tube(0.15, 3.4, "hot"), { at: [-0.4, -1.5, 0] });
  const one = put(sc, "one", mote(0.05, "accent"), { at: [-1.4, -0.9, 0.2] });
  const c0 = put(sc, "c0", bar(2.2, 1.4, 0.25, "soft"), { at: [0, -0.2, 0] });
  const c1 = put(sc, "c1", bar(2.6, 0.08, 0.25, "accent"), { at: [0, -0.2, 0] });
  const chemo = put(sc, "chemo", vial(0.13, 0.45, "hot"), { at: [1.6, -2.1, 0] });
  const inter = put(sc, "inter", polyline([[2.2, -2.35, 0], [2.5, -1.8, 0], [2.8, -2.35, 0]], "hot", true));
  const food = put(sc, "food", disc(0.3, 12, "soft", "y"), { at: [-2.6, -2.1, 0] });
  const foodOk = put(sc, "foodOk", tick([-2.1, -2.05, 0.05], 0.14));
  sc.mesh.labels = [L([-1.9, 2.05, 0], "Curcumin: the yellow pigment of turmeric"), L([DISH[0], DISH[1] + 0.95, 0], "In a dish: NF-kB, COX-2 and many other targets"), L([-0.4, -0.05, 0], "Barely absorbed from the gut; negligible plasma levels at gram doses"), L([1.5, -2.7, 0], "Interactions: CYP enzymes, platelets, cyclophosphamide and camptothecins in cells")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...targets, ...inGut, one, c0, c1, chemo, inter, food, foodOk);
    setAlpha(alpha, blood, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, root, 1); setAlpha(alpha, cap, clamp(u * 2 - 0.3)); setAlpha(alpha, dish, clamp(u * 2 - 0.5)); dCells.forEach((c, i) => { const v = clamp(u * 2 - 0.8 - 0.15 * i); setAlpha(alpha, c, clamp(u * 2 - 0.5) * (1 - 0.6 * v)); movePart(pts, base, c, [0, 0, 0], 1 - 0.4 * v); }); targets.forEach((tg, i) => setAlpha(alpha, tg, clamp(u * 3 - 2 - 0.3 * i))); return { caption: "1 · Curcumin inhibits NF-kB, COX-2 and many other targets in laboratory models, which has generated thousands of preclinical papers; chemists class it as promiscuous, unstable and prone to false-positive assay signals" }; }
    if (s === 1) { const u = Q(t, 1); dCells.forEach((c) => { setAlpha(alpha, c, 0.4); movePart(pts, base, c, [0, 0, 0], 0.6); }); targets.forEach((tg) => setAlpha(alpha, tg, 0.7)); moveTo(pts, base, cap, [-1.4, 1.5, 0], [-2.0, -0.4, 0.2], clamp(u * 1.5)); setAlpha(alpha, cap, 1 - 0.7 * clamp(u * 2 - 1)); inGut.forEach((g, i) => { const v = clamp(u * 2 - 1 - 0.08 * i); setAlpha(alpha, g, v); movePart(pts, base, g, [2.8 * v * (0.3 + 0.7 * ((i * 7) % 5) / 5), 0.15 * Math.sin(i), 0], 1); }); return { caption: "2 · Swallowed as a capsule, curcumin is barely absorbed: it is rapidly metabolised, and gram doses in phase 1 and 2 trials in colorectal polyps, pancreatic cancer and myeloma produced negligible plasma levels" }; }
    if (s === 2) { const u = Q(t, 2); dCells.forEach((c) => { setAlpha(alpha, c, 0.4); movePart(pts, base, c, [0, 0, 0], 0.6); }); targets.forEach((tg) => setAlpha(alpha, tg, 0.7)); moveTo(pts, base, cap, [-1.4, 1.5, 0], [-2.0, -0.4, 0.2], 1); setAlpha(alpha, cap, 0.3); inGut.forEach((g, i) => { setAlpha(alpha, g, 1); movePart(pts, base, g, [2.8 * (0.3 + 0.7 * ((i * 7) % 5) / 5), 0.15 * Math.sin(i), 0], 1); }); setAlpha(alpha, blood, 1); setAlpha(alpha, one, clamp(u * 2) * (1 - 0.7 * clamp(u * 2 - 1))); moveTo(pts, base, one, [-1.4, -0.9, 0.2], [-0.4, -1.5, 0.2], clamp(u * 1.5)); grow(alpha, c0, clamp(u * 2 - 0.3)); grow(alpha, c1, clamp(u * 2 - 0.8)); return { caption: "3 · Tissue concentrations sit far below those used in cell experiments; the trials show safety but no convincing efficacy, and a few small randomised trials of reduced radiation dermatitis or oral mucositis need replication" }; }
    const u = Q(t, 3); dCells.forEach((c) => { setAlpha(alpha, c, 0.4); movePart(pts, base, c, [0, 0, 0], 0.6); }); targets.forEach((tg) => setAlpha(alpha, tg, 0.7)); moveTo(pts, base, cap, [-1.4, 1.5, 0], [-2.0, -0.4, 0.2], 1); setAlpha(alpha, cap, 0.3); inGut.forEach((g, i) => { setAlpha(alpha, g, 1); movePart(pts, base, g, [2.8 * (0.3 + 0.7 * ((i * 7) % 5) / 5), 0.15 * Math.sin(i), 0], 1); }); setAlpha(alpha, blood, 1); setAlpha(alpha, one, 0.3); moveTo(pts, base, one, [-1.4, -0.9, 0.2], [-0.4, -1.5, 0.2], 1); show(alpha, 1, c0, c1);
    setAlpha(alpha, chemo, clamp(u * 2)); setAlpha(alpha, inter, clamp(u * 2 - 0.4) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, food, clamp(u * 2 - 0.7)); setAlpha(alpha, foodOk, clamp(u * 2 - 1));
    return { caption: "4 · Curcumin can inhibit CYP enzymes and platelet aggregation and in cell studies blunted cyclophosphamide and camptothecins, so oncologists advise against high-dose supplements during chemotherapy; turmeric as a food is harmless" };
  });
}

// ---------------------------------------------------------------- 62. engineered bacteria as living cancer drugs
export function engineeredBacteria(): Mesh {
  const sc = scene();
  const TUM: Vec3 = [0.6, 0.2, 0];
  const tum = put(sc, "tum", blob(1.25, "hot"), { at: TUM });
  const core = put(sc, "core", sphere(0.55, 4, 8, "soft", true), { at: [TUM[0], TUM[1], 0.2] });
  put(sc, "vessel", tube(0.16, 3.0, "soft"), { at: [-1.8, 1.4, 0] });
  const drug: Part[] = []; for (let i = 0; i < 4; i++) drug.push(put(sc, `dg${i}`, mote(0.05, "accent"), { at: [-3.2, 1.4, 0.1] }));
  const bugs: Part[] = []; for (let i = 0; i < 6; i++) bugs.push(put(sc, `bug${i}`, ellipsoid(0.14, 0.07, 0.07, 3, 6, "accent", true), { at: [-3.2, 1.4, 0.15], rotZ: 0.4 * i }));
  const bugTo = (i: number): Vec3 => [TUM[0] - 0.3 + 0.2 * (i % 3) + 0.1 * Math.floor(i / 3), TUM[1] - 0.2 + 0.3 * Math.floor(i / 3), 0.35];
  const payload: Part[] = []; for (let i = 0; i < 8; i++) payload.push(put(sc, `pl${i}`, mote(0.05, "hot"), { at: [TUM[0], TUM[1], 0.4] }));
  const tcells: Part[] = []; for (let i = 0; i < 3; i++) tcells.push(put(sc, `tc${i}`, blob(0.2, "soft"), { at: [2.7, 1.6 - 1.2 * i, 0] }));
  const hist = put(sc, "hist", ticks(-2.9, -1.3, -1.6, 4, "soft"));
  const histX = put(sc, "histX", cross([-2.1, -1.6, 0.05], 0.18));
  const trials = put(sc, "trials", doc(0.6, 0.7, 3, "accent"), { at: [-0.4, -1.7, 0] });
  const sepsis = put(sc, "sepsis", polyline([[1.2, -2.0, 0], [1.5, -1.45, 0], [1.8, -2.0, 0]], "hot", true));
  const atten = put(sc, "atten", bar(2.6, 0.4, 0.25, "accent"), { at: [0, -2.1, 0] });
  const attenFull = put(sc, "attenFull", bar(2.25, 1.0, 0.25, "soft"), { at: [0, -2.1, 0] });
  sc.mesh.labels = [L([TUM[0], TUM[1] + 1.7, 0], "Hypoxic, necrotic core that drugs reach poorly"), L([-1.8, 2.0, 0], "Attenuated Salmonella given intravenously"), L([2.7, 2.1, 0], "Payload made in situ: methioninase (SGN1), IL-2 (Saltikva)"), L([0.9, -2.5, 0], "VNP20009 in the 2000s: tolerable but ineffective; attenuation cuts potency")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...payload, ...tcells, hist, histX, trials, sepsis, atten, attenFull);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tum, 0.8); setAlpha(alpha, core, 0.4 + 0.4 * clamp(u * 2) * pulse(t, 3)); drug.forEach((d, i) => { const v = (t * 2 + i / 4) % 1; setAlpha(alpha, d, (1 - v) * clamp(u * 2 - 0.5)); movePart(pts, base, d, [3.0 * v, 0, 0], 1); }); bugs.forEach((b) => setAlpha(alpha, b, 0)); return { caption: "1 · Deep inside a tumour is a low-oxygen, necrotic core that chemotherapy and radiation reach poorly; drugs stay in the vessels" }; }
    if (s === 1) { const u = Q(t, 1); drug.forEach((d) => setAlpha(alpha, d, 0)); setAlpha(alpha, core, 0.6); bugs.forEach((b, i) => { const v = clamp(u * 1.5 - 0.1 * i); setAlpha(alpha, b, v > 0 ? 1 : 0); const mid: Vec3 = [-0.6, 1.4, 0.15]; if (v < 0.5) moveTo(pts, base, b, [-3.2, 1.4, 0.15], mid, v * 2); else moveTo(pts, base, b, [-3.2, 1.4, 0.15], [mid[0] + (bugTo(i)[0] - mid[0]) * ((v - 0.5) * 2), mid[1] + (bugTo(i)[1] - mid[1]) * ((v - 0.5) * 2), bugTo(i)[2]], 1); }); return { caption: "2 · Attenuated Salmonella and other anaerobes given intravenously or intratumourally replicate selectively in exactly that hypoxic core" }; }
    if (s === 2) { const u = Q(t, 2); drug.forEach((d) => setAlpha(alpha, d, 0)); setAlpha(alpha, core, 0.6); bugs.forEach((b, i) => { setAlpha(alpha, b, 1); moveTo(pts, base, b, [-3.2, 1.4, 0.15], bugTo(i), 1); }); payload.forEach((p, i) => { const v = (t * 2.5 + i / 8) % 1; setAlpha(alpha, p, u * (1 - v)); movePart(pts, base, p, [1.1 * v * Math.cos(i * 0.8), 1.1 * v * Math.sin(i * 0.8), 0], 1); }); setAlpha(alpha, tum, 0.8 - 0.3 * u); tcells.forEach((c, i) => { setAlpha(alpha, c, clamp(u * 2 - 0.5 - 0.2 * i)); moveTo(pts, base, c, [2.7, 1.6 - 1.2 * i, 0], [TUM[0] + 1.35 * Math.cos(i * 1.5 - 0.7), TUM[1] + 1.35 * Math.sin(i * 1.5 - 0.7), 0.3], clamp(u * 1.5 - 0.5 - 0.2 * i)); }); return { caption: "3 · Engineered to secrete a cytokine or enzyme, they manufacture the drug on the spot with low systemic exposure, and being strongly immunogenic can turn a cold tumour hot: SGN1 (methioninase) is in phase 1/2 and Saltikva (IL-2) in phase 2 in metastatic pancreatic cancer" }; }
    const u = Q(t, 3); drug.forEach((d) => setAlpha(alpha, d, 0)); setAlpha(alpha, core, 0.6); bugs.forEach((b, i) => { setAlpha(alpha, b, 1); moveTo(pts, base, b, [-3.2, 1.4, 0.15], bugTo(i), 1); }); payload.forEach((p, i) => { const v = (t * 2.5 + i / 8) % 1; setAlpha(alpha, p, 0.6 * (1 - v)); movePart(pts, base, p, [1.1 * v * Math.cos(i * 0.8), 1.1 * v * Math.sin(i * 0.8), 0], 1); }); setAlpha(alpha, tum, 0.5); tcells.forEach((c, i) => { setAlpha(alpha, c, 1); moveTo(pts, base, c, [2.7, 1.6 - 1.2 * i, 0], [TUM[0] + 1.35 * Math.cos(i * 1.5 - 0.7), TUM[1] + 1.35 * Math.sin(i * 1.5 - 0.7), 0.3], 1); });
    grow(alpha, hist, clamp(u * 2)); setAlpha(alpha, histX, clamp(u * 2 - 0.5)); setAlpha(alpha, trials, clamp(u * 2 - 0.6)); setAlpha(alpha, sepsis, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4))); grow(alpha, attenFull, clamp(u * 2 - 0.9)); grow(alpha, atten, clamp(u * 2 - 1.1));
    return { caption: "4 · The field has a long record of colonisation without responses, beginning with VNP20009 in the 2000s: sepsis and endotoxin risk force heavy attenuation that cuts potency, and a replicating organism carries a heavy regulatory and biosafety burden" };
  });
}

// ---------------------------------------------------------------- 63. ginger for chemotherapy nausea
export function gingerNausea(): Mesh {
  const sc = scene();
  const rhizome = put(sc, "rhizome", ellipsoid(0.6, 0.3, 0.25, 4, 8, "accent", true), { at: [-2.5, 1.4, 0] });
  const knobs: Part[] = []; for (let i = 0; i < 3; i++) knobs.push(put(sc, `kn${i}`, blob(0.14, "accent"), { at: [-2.5 - 0.4 + 0.4 * i, 1.4 + 0.3 * ((i + 1) % 2), 0.1] }));
  const caps: Part[] = []; for (let i = 0; i < 2; i++) caps.push(put(sc, `cap${i}`, capsule(1.0, "accent"), { at: [-1.3, 1.6 - 0.35 * i, 0] }));
  const days = put(sc, "days", ticks(-0.6, 1.4, 1.4, 6, "soft"));
  const chemoMark = put(sc, "chemoMark", vial(0.11, 0.4, "hot"), { at: [0.6, 1.85, 0] });
  const gut = put(sc, "gut", tube(0.32, 2.4, "soft"), { at: [0.2, 0.0, 0] });
  const receptors: Part[] = []; for (let i = 0; i < 4; i++) receptors.push(put(sc, `rc${i}`, ring(0.09, 6, "hot", "z"), { at: [-0.6 + 0.5 * i, 0.3, 0.2] }));
  const ging: Part[] = []; for (let i = 0; i < 4; i++) ging.push(put(sc, `gg${i}`, mote(0.05, "accent"), { at: [-1.0, 0.0, 0.2] }));
  const nau0 = put(sc, "nau0", bar(2.2, 1.2, 0.25, "hot"), { at: [0, -0.4, 0] });
  const nau1 = put(sc, "nau1", bar(2.6, 0.8, 0.25, "accent"), { at: [0, -0.4, 0] });
  const vom = put(sc, "vom", bar(2.2, 0.5, 0.25, "hot"), { at: [0, -2.4, 0] });
  const vomSame = put(sc, "vomSame", bar(2.6, 0.5, 0.25, "soft"), { at: [0, -2.4, 0] });
  const neg: Part[] = []; for (let i = 0; i < 3; i++) neg.push(put(sc, `ng${i}`, doc(0.4, 0.5, 2, "soft"), { at: [-2.4 + 0.5 * i, -1.5, -0.05 * i] }));
  const negX = put(sc, "negX", cross([-1.9, -1.5, 0.1], 0.25));
  const guide = put(sc, "guide", doc(0.5, 0.6, 3, "soft"), { at: [-0.4, -1.6, 0] });
  const guideX = put(sc, "guideX", cross([-0.4, -1.6, 0.1], 0.2));
  const bleed = put(sc, "bleed", polyline([[0.5, -1.85, 0], [0.8, -1.3, 0], [1.1, -1.85, 0]], "hot", true));
  sc.mesh.labels = [L([-2.5, 2.05, 0], "Zingiber officinale: gingerols and shogaols"), L([0.4, 1.0, 0], "Six days from three days before chemotherapy, with a 5-HT3 antagonist"), L([2.4, -0.75, 0], "576 patients (2012): acute nausea less at 0.5 or 1 g; vomiting unchanged"), L([-0.9, -2.2, 0], "Other trials negative; not in MASCC/ESMO or ASCO guidelines; antiplatelet caution")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, days, chemoMark, ...receptors, ...ging, nau0, nau1, vom, vomSame, ...neg, negX, guide, guideX, bleed);
    setAlpha(alpha, gut, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, rhizome, 1); knobs.forEach((k) => setAlpha(alpha, k, 1)); caps.forEach((c, i) => setAlpha(alpha, c, clamp(u * 2 - 0.3 - 0.3 * i))); grow(alpha, days, clamp(u * 2 - 0.8)); setAlpha(alpha, chemoMark, clamp(u * 2 - 1)); return { caption: "1 · Ginger root is taken as standardised capsules, 0.5 g or 1 g daily for six days starting three days before chemotherapy, on top of a 5-HT3 antagonist" }; }
    if (s === 1) { const u = Q(t, 1); caps.forEach((c) => setAlpha(alpha, c, 1)); setAlpha(alpha, days, 1); setAlpha(alpha, chemoMark, 1); setAlpha(alpha, gut, 1); receptors.forEach((r, i) => setAlpha(alpha, r, clamp(u * 2 - 0.2 * i))); ging.forEach((g, i) => { const v = clamp(u * 1.6 - 0.15 * i); setAlpha(alpha, g, v > 0 ? 1 : 0); moveTo(pts, base, g, [-1.0, 0.0, 0.2], [-0.6 + 0.5 * i, 0.3, 0.25], v); }); return { caption: "2 · Gingerols and shogaols antagonise 5-HT3 receptors in the gut, accelerate gastric emptying and may act on NK1 signalling, the same targets as prescription antiemetics" }; }
    if (s === 2) { const u = Q(t, 2); caps.forEach((c) => setAlpha(alpha, c, 1)); setAlpha(alpha, days, 1); setAlpha(alpha, chemoMark, 1); setAlpha(alpha, gut, 1); receptors.forEach((r) => setAlpha(alpha, r, 1)); ging.forEach((g, i) => { setAlpha(alpha, g, 1); moveTo(pts, base, g, [-1.0, 0.0, 0.2], [-0.6 + 0.5 * i, 0.3, 0.25], 1); }); grow(alpha, nau0, clamp(u * 2)); grow(alpha, nau1, clamp(u * 2 - 0.4)); grow(alpha, vom, clamp(u * 2 - 0.7)); grow(alpha, vomSame, clamp(u * 2 - 1)); return { caption: "3 · In the largest randomised placebo-controlled trial, 576 patients (Ryan, Supportive Care in Cancer 2012), acute nausea severity fell at 0.5 or 1 g but not at higher doses, and vomiting was unaffected" }; }
    const u = Q(t, 3); caps.forEach((c) => setAlpha(alpha, c, 1)); setAlpha(alpha, days, 1); setAlpha(alpha, chemoMark, 1); setAlpha(alpha, gut, 1); receptors.forEach((r) => setAlpha(alpha, r, 1)); ging.forEach((g, i) => { setAlpha(alpha, g, 1); moveTo(pts, base, g, [-1.0, 0.0, 0.2], [-0.6 + 0.5 * i, 0.3, 0.25], 1); }); show(alpha, 1, nau0, nau1, vom, vomSame);
    cascade(alpha, neg, clamp(u * 2)); setAlpha(alpha, negX, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, guide, clamp(u * 2 - 0.7)); setAlpha(alpha, guideX, clamp(u * 2 - 0.9)); setAlpha(alpha, bleed, clamp(u * 2 - 1.1));
    return { caption: "4 · Several other randomised trials were negative or too small, so reviews call the evidence mixed and ginger is not in MASCC/ESMO or ASCO antiemetic guidelines; products are unstandardised and its mild antiplatelet effect warrants caution with anticoagulants and before surgery" };
  });
}

// ---------------------------------------------------------------- 64. Med-Gemini and MedLM
export function medGemini(): Mesh {
  const sc = scene();
  const txt = put(sc, "txt", doc(0.8, 0.9, 4, "soft"), { at: [-2.5, 1.3, 0] });
  const img = put(sc, "img", quad(0.9, 0.7, "soft"), { at: [-2.5, 0.0, 0] });
  const imgBody = put(sc, "imgBody", ellipsoid(0.3, 0.22, 0.03, 3, 8, "hot"), { at: [-2.5, 0.0, 0.03] });
  const rec: Part[] = []; for (let i = 0; i < 4; i++) rec.push(put(sc, `rec${i}`, doc(0.6, 0.35, 1, "soft"), { at: [-2.5 + 0.08 * i, -1.3 - 0.1 * i, -0.05 * i] }));
  const mod = put(sc, "model", model(1.6, 1.3, "accent"), { at: [0, 0.1, 0] });
  const web = put(sc, "web", ring(0.4, 14, "accent", "z"), { at: [0, 1.7, 0] });
  const webLines: Part[] = []; for (let i = 0; i < 2; i++) webLines.push(put(sc, `wl${i}`, line([-0.4 + 0.8 * i, 1.7, 0], [0.4 - 0.8 * i, 1.7, 0], "accent")));
  const webLat = put(sc, "webLat", ring(0.4, 14, "accent", "y"), { at: [0, 1.7, 0] });
  const toks: Part[] = []; for (let i = 0; i < 6; i++) toks.push(put(sc, `tk${i}`, mote(0.05, "accent"), { at: [-2.0, 1.3 - 1.3 * (i % 3), 0.1] }));
  const answer = put(sc, "answer", doc(0.9, 0.7, 3, "accent"), { at: [2.2, 1.2, 0] });
  const exam = put(sc, "exam", bar(1.8, 1.4, 0.25, "accent"), { at: [0, -2.2, 0] });
  const deploy = put(sc, "deploy", bar(2.2, 0.35, 0.25, "soft"), { at: [0, -2.2, 0] });
  const onco = put(sc, "onco", bar(2.6, 0.2, 0.25, "hot"), { at: [0, -2.2, 0] });
  const board = put(sc, "board", disc(0.45, 12, "soft", "y"), { at: [2.4, -0.4, 0] });
  const boardQ = put(sc, "boardQ", ring(0.3, 10, "hot", "z"), { at: [2.4, -0.2, 0.1] });
  sc.mesh.labels = [L([-2.5, 2.0, 0], "Text, images and long records"), L([0, 2.35, 0], "Gemini multimodal transformer, medical fine-tuning, web search"), L([2.2, 1.8, 0], "Documentation, question answering, image interpretation"), L([2.2, -2.55, 0], "Exam benchmarks high; deployment and oncology evidence thin")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, web, ...webLines, webLat, ...toks, answer, exam, deploy, onco, board, boardQ);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, txt, clamp(u * 2)); setAlpha(alpha, img, clamp(u * 2 - 0.3)); setAlpha(alpha, imgBody, clamp(u * 2 - 0.3)); cascade(alpha, rec, clamp(u * 2 - 0.6)); return { caption: "1 · A clinical question rarely lives in one place: it spans notes, a scan and a record stretching back years" }; }
    if (s === 1) { const u = Q(t, 1); rec.forEach((r) => setAlpha(alpha, r, 1)); toks.forEach((p, i) => { const v = clamp(u * 1.6 - 0.1 * i); setAlpha(alpha, p, v > 0 ? 1 : 0); moveTo(pts, base, p, [-2.0, 1.3 - 1.3 * (i % 3), 0.1], [-0.5 + 0.2 * Math.floor(i / 3), 0.1 + 0.3 * ((i % 3) - 1), 0.3], v); }); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); setAlpha(alpha, web, clamp(u * 2 - 1)); setAlpha(alpha, webLat, clamp(u * 2 - 1)); webLines.forEach((w) => setAlpha(alpha, w, clamp(u * 2 - 1))); movePart(pts, base, webLat, [0, 0, 0], 1, t * TAU); return { caption: "2 · Med-Gemini is Google's Gemini multimodal transformer fine-tuned on medical data with web search integration, so it reasons over text, images and long records together; MedLM is the commercial line for health systems" }; }
    if (s === 2) { const u = Q(t, 2); rec.forEach((r) => setAlpha(alpha, r, 1)); toks.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.0, 1.3 - 1.3 * (i % 3), 0.1], [-0.5 + 0.2 * Math.floor(i / 3), 0.1 + 0.3 * ((i % 3) - 1), 0.3], 1); }); setAlpha(alpha, mod, 1); setAlpha(alpha, web, 1); setAlpha(alpha, webLat, 1); webLines.forEach((w) => setAlpha(alpha, w, 1)); movePart(pts, base, webLat, [0, 0, 0], 1, t * TAU); setAlpha(alpha, answer, clamp(u * 2)); grow(alpha, exam, clamp(u * 2 - 0.5)); return { caption: "3 · The 2024 paper reported state-of-the-art results on medical exam and multimodal benchmarks; developers use it to build assistants for documentation, question answering and image interpretation" }; }
    const u = Q(t, 3); rec.forEach((r) => setAlpha(alpha, r, 1)); toks.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.0, 1.3 - 1.3 * (i % 3), 0.1], [-0.5 + 0.2 * Math.floor(i / 3), 0.1 + 0.3 * ((i % 3) - 1), 0.3], 1); }); setAlpha(alpha, mod, 1); setAlpha(alpha, web, 1); setAlpha(alpha, webLat, 1); webLines.forEach((w) => setAlpha(alpha, w, 1)); movePart(pts, base, webLat, [0, 0, 0], 1, t * TAU); setAlpha(alpha, answer, 1); setAlpha(alpha, exam, 1);
    grow(alpha, deploy, clamp(u * 2)); grow(alpha, onco, clamp(u * 2 - 0.4)); setAlpha(alpha, board, clamp(u * 2 - 0.6)); setAlpha(alpha, boardQ, clamp(u * 2 - 0.9) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · The evidence is benchmark-heavy and deployment evidence is thin; oncology-specific evaluations remain limited, so its value in tumour boards or treatment planning is not established" };
  });
}

// ---------------------------------------------------------------- 65. medicinal mushrooms: reishi, turkey tail, shiitake and others
export function medicinalMushrooms(): Mesh {
  const sc = scene();
  const MP: Vec3[] = [[-2.6, 1.2, 0], [-1.8, 1.4, 0], [-1.0, 1.1, 0]];
  const caps: Part[] = []; MP.forEach((p, i) => { caps.push(put(sc, `cap${i}`, disc(0.32 + 0.06 * i, 10, "accent", "y"), { at: [p[0], p[1] + 0.3, 0] })); put(sc, `stem${i}`, cylinder(0.07, 0.5, 6, 2, "accent", false, true), { at: [p[0], p[1] + 0.05, 0] }); });
  const glucans: Part[] = []; for (let i = 0; i < 5; i++) glucans.push(put(sc, `gl${i}`, mote(0.05, "accent"), { at: [-1.8, 1.2, 0.2] }));
  const DISH: Vec3 = [0.8, 1.1, 0];
  put(sc, "dish", cylinder(0.6, 0.12, 12, 2, "soft", true, true), { at: DISH });
  const nk: Part[] = []; for (let i = 0; i < 3; i++) nk.push(put(sc, `nk${i}`, blob(0.14, "soft"), { at: [DISH[0] - 0.3 + 0.3 * i, DISH[1] + 0.1, 0.1] }));
  const act: Part[] = []; for (let i = 0; i < 3; i++) act.push(put(sc, `ac${i}`, ring(0.22, 8, "accent", "z"), { at: [DISH[0] - 0.3 + 0.3 * i, DISH[1] + 0.1, 0.15] }));
  const cyt = put(sc, "cyt", bar(2.4, 0.9, 0.22, "accent"), { at: [0, 0.6, 0] });
  const cytBase = put(sc, "cytBase", bar(2.0, 0.5, 0.22, "soft"), { at: [0, 0.6, 0] });
  const cochrane = put(sc, "cochrane", doc(0.7, 0.8, 4, "soft"), { at: [-2.2, -1.3, 0] });
  const five: Part[] = []; for (let i = 0; i < 5; i++) five.push(put(sc, `fv${i}`, doc(0.25, 0.3, 1, "soft"), { at: [-1.4 + 0.3 * i, -1.3, 0] }));
  const noFirst = put(sc, "noFirst", cross([-2.2, -1.3, 0.1], 0.3));
  const P: Vec3 = [1.0, -1.4, 0];
  const survivor = put(sc, "survivor", figure("soft"), { at: P, scale: 0.7 });
  const immune = put(sc, "immune", ring(0.25, 8, "accent", "z"), { at: [P[0], P[1] + 0.2, 0.15] });
  const outcomeQ = put(sc, "outcomeQ", ring(0.45, 12, "hot", "z"), { at: [P[0] + 0.9, P[1], 0.05] });
  const liver = put(sc, "liver", organ(0.4, 0.28, 0.2, "hot"), { at: [2.6, -1.6, 0] });
  sc.mesh.labels = [L([-1.8, 2.15, 0], "Reishi, turkey tail, shiitake, maitake, cordyceps: beta-glucans"), L([DISH[0], DISH[1] + 0.9, 0], "NK cell and cytokine activity in vitro and small studies"), L([-1.6, -2.0, 0], "Cochrane 2016 on reishi: five small, poor trials; not a first-line treatment"), L([1.8, -2.35, 0], "Turkey tail phase 1: immune changes, no clinical outcomes; liver toxicity reports")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...glucans, ...act, cyt, cytBase, cochrane, ...five, noFirst, immune, outcomeQ, liver);
    setAlpha(alpha, survivor, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, caps, clamp(u * 1.5)); glucans.forEach((g, i) => { const v = clamp(u * 2 - 0.8 - 0.1 * i); setAlpha(alpha, g, v > 0 ? 1 : 0); moveTo(pts, base, g, [-1.8, 1.2, 0.2], [DISH[0] - 0.3 + 0.3 * (i % 3), DISH[1] + 0.3, 0.2], v); }); return { caption: "1 · Reishi, turkey tail, shiitake, maitake and cordyceps supplements are widely sold to people with cancer; all are rich in fungal beta-glucans" }; }
    if (s === 1) { const u = Q(t, 1); glucans.forEach((g, i) => { setAlpha(alpha, g, 1); moveTo(pts, base, g, [-1.8, 1.2, 0.2], [DISH[0] - 0.3 + 0.3 * (i % 3), DISH[1] + 0.3, 0.2], 1); }); act.forEach((a, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, a, clamp(u * 2 - 0.2 * i) * (1 - v)); movePart(pts, base, a, [0, 0, 0], 0.6 + 0.8 * v); }); grow(alpha, cytBase, clamp(u * 2 - 0.5)); grow(alpha, cyt, clamp(u * 2 - 0.9)); return { caption: "2 · Beta-glucans act on pattern-recognition receptors of innate immune cells and increase NK cell and cytokine activity in vitro and in small human studies" }; }
    if (s === 2) { const u = Q(t, 2); glucans.forEach((g, i) => { setAlpha(alpha, g, 0.6); moveTo(pts, base, g, [-1.8, 1.2, 0.2], [DISH[0] - 0.3 + 0.3 * (i % 3), DISH[1] + 0.3, 0.2], 1); }); act.forEach((a, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, a, (1 - v) * 0.6); movePart(pts, base, a, [0, 0, 0], 0.6 + 0.8 * v); }); show(alpha, 1, cyt, cytBase); setAlpha(alpha, cochrane, clamp(u * 2)); cascade(alpha, five, clamp(u * 2 - 0.3)); setAlpha(alpha, noFirst, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "3 · A 2016 Cochrane review of reishi found five small randomised trials of poor quality, no evidence that it should be a first-line treatment and only weak signals for immune markers and quality of life alongside chemotherapy" }; }
    const u = Q(t, 3); glucans.forEach((g, i) => { setAlpha(alpha, g, 0.6); moveTo(pts, base, g, [-1.8, 1.2, 0.2], [DISH[0] - 0.3 + 0.3 * (i % 3), DISH[1] + 0.3, 0.2], 1); }); act.forEach((a, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, a, (1 - v) * 0.6); movePart(pts, base, a, [0, 0, 0], 0.6 + 0.8 * v); }); show(alpha, 1, cyt, cytBase, cochrane, ...five); setAlpha(alpha, noFirst, 0.8);
    setAlpha(alpha, survivor, 0.4 + 0.6 * clamp(u * 2)); setAlpha(alpha, immune, clamp(u * 2 - 0.3) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, outcomeQ, clamp(u * 2 - 0.6) * 0.7); setAlpha(alpha, liver, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Turkey tail extract produced immune changes without clinical outcomes in a phase 1 trial of breast cancer survivors, lentinan is used in Japan with limited evidence, products are unstandardised and reishi can affect platelets and liver enzymes; standardised PSK is a separate, approved record" };
  });
}

// ---------------------------------------------------------------- 66. NVIDIA BioNeMo
export function bionemo(): Mesh {
  const sc = scene();
  const gpus: Part[] = []; for (let i = 0; i < 4; i++) gpus.push(put(sc, `gpu${i}`, box(2.6, 0.28, 0.8, "accent", true), { at: [0, -1.6 + 0.36 * i, 0] }));
  const fins: Part[] = []; for (let i = 0; i < 6; i++) fins.push(put(sc, `fin${i}`, line([-1.1 + 0.44 * i, -1.75, 0.41], [-1.1 + 0.44 * i, -0.2, 0.41], "soft")));
  const models: Part[] = []; const MN = ["Evo 2", "ESM", "Geneformer"]; MN.forEach((_, i) => models.push(put(sc, `m${i}`, model(0.9, 0.7, "soft"), { at: [-1.0 + 1.0 * i, 0.6, 0] })));
  const flows: Part[] = []; for (let i = 0; i < 6; i++) flows.push(put(sc, `fl${i}`, mote(0.05, "accent"), { at: [-1.0 + 0.4 * (i % 3), -0.1, 0.45] }));
  const outputs: Part[] = []; [protein(0.3, "hot"), helix(0.08, 0.6, 3, 16, "hot"), cell(0.28, "hot")].forEach((m, i) => outputs.push(put(sc, `out${i}`, m, { at: [-1.0 + 1.0 * i, 1.9, 0] })));
  const users: Part[] = []; for (let i = 0; i < 2; i++) users.push(put(sc, `us${i}`, building(0.6, 0.55), { at: [-2.7 + 5.4 * i, 0.6, 0] }));
  const chain: Part[] = []; for (let i = 0; i < 4; i++) chain.push(put(sc, `ch${i}`, ring(0.12, 6, "hot", "z"), { at: [2.0 + 0.2 * i, -2.15, 0.05] }));
  const noPredict = put(sc, "noPredict", cross([-2.6, -1.0, 0.05], 0.22));
  const noPredictQ = put(sc, "noPredictQ", doc(0.5, 0.5, 2, "soft"), { at: [-2.6, -1.0, 0] });
  sc.mesh.labels = [L([0, -2.25, 0], "GPU-optimised training and inference libraries"), L([0, 1.2, 0], "Protein, DNA and single-cell models trained and served on it: Evo 2, ESM, Geneformer"), L([-2.7, 1.2, 0], "Arc Institute, Recursion, pharma"), L([2.4, -2.55, 0], "Vendor-specific: tied to NVIDIA hardware")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...models, ...flows, ...outputs, ...users, ...chain, noPredict, noPredictQ);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, gpus, clamp(u * 1.5)); fins.forEach((f) => setAlpha(alpha, f, clamp(u * 2 - 1) * 0.6)); return { caption: "1 · BioNeMo is not a model: it is the software stack of frameworks, training recipes and inference microservices optimised for GPUs" }; }
    if (s === 1) { const u = Q(t, 1); gpus.forEach((g) => setAlpha(alpha, g, 1)); fins.forEach((f) => setAlpha(alpha, f, 0.6)); cascade(alpha, models, clamp(u * 1.5)); flows.forEach((f, i) => { const v = (t * 3 + i / 6) % 1; setAlpha(alpha, f, clamp(u * 2 - 0.5) * (1 - v)); movePart(pts, base, f, [0, 0.4 * v, 0], 1); }); return { caption: "2 · Protein, DNA and single-cell foundation models such as Evo 2, ESM and Geneformer are trained and served with it, which is how the Arc Institute, Recursion and pharmaceutical companies train large models efficiently" }; }
    if (s === 2) { const u = Q(t, 2); gpus.forEach((g) => setAlpha(alpha, g, 1)); fins.forEach((f) => setAlpha(alpha, f, 0.6)); models.forEach((m) => setAlpha(alpha, m, 1)); flows.forEach((f, i) => { const v = (t * 3 + i / 6) % 1; setAlpha(alpha, f, (1 - v) * 0.7); movePart(pts, base, f, [0, 0.4 * v, 0], 1); }); cascade(alpha, outputs, clamp(u * 1.5)); movePart(pts, base, outputs[1], [0, 0, 0], 1, t * TAU); users.forEach((us) => setAlpha(alpha, us, clamp(u * 2 - 0.8))); return { caption: "3 · Its role in oncology is indirect: it is the infrastructure beneath the structure, genome and cell models that feed drug discovery" }; }
    const u = Q(t, 3); gpus.forEach((g) => setAlpha(alpha, g, 1)); fins.forEach((f) => setAlpha(alpha, f, 0.6)); models.forEach((m) => setAlpha(alpha, m, 1)); flows.forEach((f, i) => { const v = (t * 3 + i / 6) % 1; setAlpha(alpha, f, (1 - v) * 0.7); movePart(pts, base, f, [0, 0.4 * v, 0], 1); }); outputs.forEach((o) => setAlpha(alpha, o, 1)); movePart(pts, base, outputs[1], [0, 0, 0], 1, t * TAU); users.forEach((us) => setAlpha(alpha, us, 1));
    cascade(alpha, chain, clamp(u * 2)); setAlpha(alpha, noPredictQ, clamp(u * 2 - 0.6)); setAlpha(alpha, noPredict, clamp(u * 2 - 0.9) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Because it is vendor-specific it ties users to NVIDIA hardware and tooling, a trade-off against portability; it is the plumbing many biology AI models run on, not something that makes predictions itself" };
  });
}

// ---------------------------------------------------------------- 67. oral cancer visual screening
export function oralVisualScreening(): Mesh {
  const sc = scene();
  const P: Vec3 = [-1.9, 0.2, 0];
  const person = put(sc, "person", figure("soft"), { at: P, scale: 1.2 });
  const mouth = put(sc, "mouth", ellipsoid(0.22, 0.12, 0.05, 3, 8, "soft"), { at: [P[0], P[1] + 0.85, 0.2] });
  const patch = put(sc, "patch", quad(0.12, 0.08, "hot"), { at: [P[0] + 0.08, P[1] + 0.85, 0.23] });
  const worker = put(sc, "worker", figure("accent"), { at: [-0.3, 0.2, 0.2], scale: 1.0 });
  const torch = put(sc, "torch", cone(0.15, 0.6, 8, "accent"), { at: [-0.85, 0.95, 0.3], rotZ: Math.PI / 2 });
  const light = put(sc, "light", beam([-0.75, 0.95, 0.3], [P[0] + 0.1, P[1] + 0.85, 0.3], 0.25, "accent"));
  const refer = put(sc, "refer", doc(0.5, 0.6, 3, "accent"), { at: [1.2, 1.5, 0] });
  const biopsy = put(sc, "biopsy", slide("soft"), { at: [2.4, 1.5, 0], scale: 0.6 });
  const AX: Vec3 = [1.0, -2.1, 0];
  const ax = put(sc, "ax", axes(AX, 2.2, 1.5));
  const ctrl = put(sc, "ctrl", bar(AX[0] + 0.5, 1.2, 0.3, "hot"), { at: [0, AX[1], 0] });
  const scr = put(sc, "scr", bar(AX[0] + 1.1, 0.8, 0.3, "accent"), { at: [0, AX[1], 0] });
  const nonUser = put(sc, "nonUser", bar(AX[0] + 1.75, 0.55, 0.3, "soft"), { at: [0, AX[1], 0] });
  const yrs = put(sc, "yrs", ticks(AX[0] + 0.2, AX[0] + 2.0, AX[1] - 0.25, 4, "soft"));
  const usp = put(sc, "usp", doc(0.5, 0.6, 3, "soft"), { at: [-2.6, -1.5, 0] });
  const uspQ = put(sc, "uspQ", ring(0.4, 12, "hot", "z"), { at: [-2.6, -1.5, 0.05] });
  const throat = put(sc, "throat", blob(0.14, "hot"), { at: [P[0], P[1] + 0.5, 0.15] });
  const throatX = put(sc, "throatX", cross([-1.4, -1.5, 0.05], 0.18));
  sc.mesh.labels = [L([P[0], P[1] - 1.4, 0], "Tobacco or alcohol user: leukoplakia, erythroplakia, ulcers"), L([-0.3, 1.9, 0], "Trained health worker, good light, no equipment"), L([AX[0] + 1.1, AX[1] - 0.6, 0], "Kerala: 191,873 people, 13 clusters; mortality rate ratio 0.66 in users, sustained at 15 years"), L([-2.0, -2.15, 0], "USPSTF 2013: insufficient; HPV throat cancers not addressed")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, light, refer, biopsy, ax, ctrl, scr, nonUser, yrs, usp, uspQ, throat, throatX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, person, 1); setAlpha(alpha, patch, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, worker, 0.4 + 0.6 * clamp(u * 2 - 0.5)); setAlpha(alpha, torch, clamp(u * 2 - 1)); return { caption: "1 · Mouth cancer in tobacco and alcohol users announces itself as white or red patches, ulcers and masses that are visible to anyone who looks" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, patch, 1); setAlpha(alpha, worker, 1); setAlpha(alpha, torch, 1); setAlpha(alpha, light, clamp(u * 2) * (0.5 + 0.3 * pulse(t, 6))); movePart(pts, base, mouth, [0, 0, 0], 1 + 0.3 * u); setAlpha(alpha, refer, clamp(u * 2 - 1)); return { caption: "2 · A trained health worker inspects and palpates the oral mucosa under good light and refers suspicious lesions for biopsy; no equipment is needed" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, patch, 1); setAlpha(alpha, worker, 1); setAlpha(alpha, torch, 1); setAlpha(alpha, light, 0.6); movePart(pts, base, mouth, [0, 0, 0], 1.3); setAlpha(alpha, refer, 1); setAlpha(alpha, biopsy, clamp(u * 2)); setAlpha(alpha, ax, clamp(u * 2 - 0.3)); grow(alpha, ctrl, clamp(u * 2 - 0.5)); grow(alpha, scr, clamp(u * 2 - 0.8)); grow(alpha, yrs, clamp(u * 2 - 1)); return { caption: "3 · The Kerala cluster-randomised trial (Lancet 2005) gave 191,873 people in 13 clusters three rounds of examination or usual care; among tobacco or alcohol users, oral cancer mortality fell by about a third (rate ratio 0.66), sustained at 15 years" }; }
    const u = Q(t, 3); setAlpha(alpha, patch, 1); setAlpha(alpha, worker, 1); setAlpha(alpha, torch, 1); setAlpha(alpha, light, 0.6); movePart(pts, base, mouth, [0, 0, 0], 1.3); show(alpha, 1, refer, biopsy, ax, ctrl, scr, yrs);
    grow(alpha, nonUser, clamp(u * 2)); setAlpha(alpha, usp, clamp(u * 2 - 0.4)); setAlpha(alpha, uspQ, clamp(u * 2 - 0.7) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, throat, clamp(u * 2 - 0.8)); setAlpha(alpha, throatX, clamp(u * 2 - 1));
    return { caption: "4 · There was no significant effect in people without those risk factors; it underpins India's programme for people over 30, while the USPSTF (2013) found insufficient evidence in the US, where incidence is lower and increasingly HPV-driven in the throat, which inspection does not address" };
  });
}

// ---------------------------------------------------------------- 68. TITAN (whole-slide multimodal model)
export function titanModel(): Mesh {
  const sc = scene();
  const SL: Vec3 = [-2.0, 0.8, 0];
  const wsi = put(sc, "wsi", quad(2.2, 1.4, "soft"), { at: SL });
  const tissue = put(sc, "tissue", cloud(12, 0.8, "hot", 4), { at: [SL[0], SL[1], 0.03] });
  const feats: Part[] = []; for (let i = 0; i < 8; i++) feats.push(put(sc, `ft${i}`, mote(0.06, "accent"), { at: [SL[0] - 0.8 + 0.23 * i, SL[1] + 0.4 - 0.8 * (i % 2), 0.06] }));
  const conch = put(sc, "conch", box(2.0, 0.25, 0.3, "accent", true), { at: [SL[0], SL[1] - 1.1, 0] });
  const slideTr = put(sc, "slideTr", model(1.3, 0.9, "hot"), { at: [0.6, 0.5, 0] });
  const vec = put(sc, "vec", bar(0.6, 0.0, 0.0, "hot"));
  const vecBars: Part[] = []; const VH = [0.5, 0.9, 0.3, 0.7, 1.0, 0.4];
  VH.forEach((h, i) => vecBars.push(put(sc, `vb${i}`, bar(1.9 + 0.18 * i, h, 0.1, "hot"), { at: [0, -0.1, 0] })));
  const report = put(sc, "report", doc(0.9, 1.0, 5, "accent"), { at: [2.5, 1.4, 0] });
  const align = put(sc, "align", line([2.3, -0.1, 0.05], [2.5, 0.9, 0.05], "soft"));
  const retr: Part[] = []; for (let i = 0; i < 3; i++) retr.push(put(sc, `rt${i}`, quad(0.45, 0.3, "soft"), { at: [-2.4 + 0.6 * i, -1.5, 0] }));
  const retrOk = put(sc, "retrOk", tick([-1.2, -1.45, 0.05], 0.14));
  const prog = put(sc, "prog", polyline([[-0.3, -1.3, 0], [0.2, -1.5, 0], [0.7, -1.9, 0], [1.2, -2.0, 0]], "hot"));
  const review = put(sc, "review", figure("soft"), { at: [2.5, -1.6, 0], scale: 0.6 });
  const reviewQ = put(sc, "reviewQ", ring(0.3, 10, "hot", "z"), { at: [2.5, -1.1, 0.05] });
  sc.mesh.labels = [L([SL[0], SL[1] + 0.95, 0], "335,645 whole slides: CONCH tile features"), L([0.6, 1.25, 0], "Slide-level transformer: one vector per slide"), L([2.5, 2.1, 0], "Aligned with report text; drafts a pathology report"), L([0, -2.4, 0], "Rare-cancer retrieval and prognosis; text needs pathologist review")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, vec, ...vecBars, align, ...retr, retrOk, prog, review, reviewQ);
    setAlpha(alpha, slideTr, 0.4); setAlpha(alpha, report, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, wsi, 1); setAlpha(alpha, tissue, 0.5 + 0.5 * u); cascade(alpha, feats, clamp(u * 1.5 - 0.3)); setAlpha(alpha, conch, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 5))); return { caption: "1 · A whole slide is first read tile by tile with CONCH, giving a feature vector for each patch of tissue, as most pathology models do" }; }
    if (s === 1) { const u = Q(t, 1); feats.forEach((f, i) => { setAlpha(alpha, f, 1); moveTo(pts, base, f, [SL[0] - 0.8 + 0.23 * i, SL[1] + 0.4 - 0.8 * (i % 2), 0.06], [0.6 - 0.45 + 0.13 * i, 0.5 + 0.2 - 0.4 * (i % 2), 0.3], clamp(u * 1.5 - 0.08 * i)); }); setAlpha(alpha, conch, 0.7); setAlpha(alpha, slideTr, 0.4 + 0.6 * u * pulse(t, 5)); vecBars.forEach((b, i) => grow(alpha, b, clamp(u * 2 - 1 - 0.1 * i))); return { caption: "2 · TITAN then runs a slide-level transformer over all those tile features and summarises the gigapixel slide into one vector that carries diagnostic meaning" }; }
    if (s === 2) { const u = Q(t, 2); feats.forEach((f, i) => { setAlpha(alpha, f, 0.7); moveTo(pts, base, f, [SL[0] - 0.8 + 0.23 * i, SL[1] + 0.4 - 0.8 * (i % 2), 0.06], [0.6 - 0.45 + 0.13 * i, 0.5 + 0.2 - 0.4 * (i % 2), 0.3], 1); }); setAlpha(alpha, conch, 0.7); setAlpha(alpha, slideTr, 1); vecBars.forEach((b) => setAlpha(alpha, b, 1)); setAlpha(alpha, align, clamp(u * 2)); setAlpha(alpha, report, 0.4 + 0.6 * clamp(u * 2 - 0.5)); return { caption: "3 · Pretrained on 335,645 whole slides with vision-only and vision-language objectives, that vector is aligned with pathology report text, so the model can also generate a draft report" }; }
    const u = Q(t, 3); feats.forEach((f, i) => { setAlpha(alpha, f, 0.7); moveTo(pts, base, f, [SL[0] - 0.8 + 0.23 * i, SL[1] + 0.4 - 0.8 * (i % 2), 0.06], [0.6 - 0.45 + 0.13 * i, 0.5 + 0.2 - 0.4 * (i % 2), 0.3], 1); }); setAlpha(alpha, conch, 0.7); setAlpha(alpha, slideTr, 1); vecBars.forEach((b) => setAlpha(alpha, b, 1)); setAlpha(alpha, align, 1); setAlpha(alpha, report, 1);
    cascade(alpha, retr, clamp(u * 2)); setAlpha(alpha, retrOk, clamp(u * 2 - 0.5)); grow(alpha, prog, clamp(u * 2 - 0.4)); setAlpha(alpha, review, clamp(u * 2 - 0.8)); setAlpha(alpha, reviewQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Slide-level embeddings support retrieval of rare cancers and prognosis prediction; it is a research release, generated text needs pathologist review, and it has not been prospectively validated in clinical workflows" };
  });
}

// ---------------------------------------------------------------- 69. traditional Chinese herbal medicine alongside treatment
export function chineseHerbalMedicine(): Mesh {
  const sc = scene();
  const POT: Vec3 = [-2.2, 0.4, 0];
  const pot = put(sc, "pot", cylinder(0.6, 0.9, 12, 3, "soft", true, true), { at: POT });
  const herbs: Part[] = []; for (let i = 0; i < 4; i++) herbs.push(put(sc, `hb${i}`, leaf(0.25, ["accent", "soft", "accent", "hot"][i]), { at: [POT[0] - 0.9 + 0.6 * i, POT[1] + 1.4, 0], rotZ: 0.4 * (i - 1.5) }));
  const steam: Part[] = []; for (let i = 0; i < 3; i++) steam.push(put(sc, `st${i}`, ring(0.08, 6, "soft", "y"), { at: [POT[0] - 0.15 + 0.15 * i, POT[1] + 0.55, 0] }));
  const P: Vec3 = [0.2, 0.0, 0];
  const patient = put(sc, "patient", figure("soft"), { at: P, scale: 0.9 });
  const chemo = put(sc, "chemo", vial(0.12, 0.42, "hot"), { at: [P[0] - 0.7, P[1] + 0.3, 0.1] });
  const se0 = put(sc, "se0", bar(1.4, 1.0, 0.22, "hot"), { at: [0, 0.4, 0] });
  const se1 = put(sc, "se1", bar(1.75, 0.7, 0.22, "accent"), { at: [0, 0.4, 0] });
  const seQ = put(sc, "seQ", ring(0.3, 10, "hot", "z"), { at: [1.75, 1.4, 0.05] });
  const pile: Part[] = []; for (let i = 0; i < 6; i++) pile.push(put(sc, `pl${i}`, doc(0.4, 0.45, 2, "soft"), { at: [2.5 - 0.06 * i, 1.0 + 0.09 * i, -0.04 * i] }));
  const drugs: Part[] = []; for (let i = 0; i < 3; i++) drugs.push(put(sc, `dr${i}`, capsule(0.9, "accent"), { at: [-2.6 + 0.5 * i, -1.3, 0] }));
  const drugOk = put(sc, "drugOk", tick([-1.0, -1.25, 0.05], 0.16));
  const liver = put(sc, "liver", organ(0.4, 0.28, 0.2, "hot"), { at: [0.4, -1.5, 0] });
  const metal = put(sc, "metal", octahedron(0.14, "hot", true), { at: [1.3, -1.5, 0] });
  const tki = put(sc, "tki", capsule(0.9, "soft"), { at: [2.3, -1.5, 0] });
  const tkiQ = put(sc, "tkiQ", ring(0.3, 10, "hot", "z"), { at: [2.3, -1.5, 0.1] });
  sc.mesh.labels = [L([POT[0], POT[1] + 2.05, 0], "Multi-herb decoction, individualised to the patient"), L([1.9, 2.0, 0], "Hundreds of small, unblinded trials; Cochrane: evidence insufficient"), L([-1.8, -1.85, 0], "Constituents became drugs: arsenic trioxide, homoharringtonine, camptothecins"), L([1.4, -2.15, 0], "Hepatotoxicity, heavy metals, aristolochic acid, CYP3A4 interactions with TKIs")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, se0, se1, seQ, ...pile, ...drugs, drugOk, liver, metal, tki, tkiQ);
    steam.forEach((st, i) => { const v = (t * 5 + i / 3) % 1; setAlpha(alpha, st, 0.6 * (1 - v)); movePart(pts, base, st, [0, 0.4 * v, 0], 1 + v); });
    setAlpha(alpha, patient, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, pot, 1); herbs.forEach((h, i) => { const v = clamp(u * 1.6 - 0.15 * i); setAlpha(alpha, h, 1); moveTo(pts, base, h, [POT[0] - 0.9 + 0.6 * i, POT[1] + 1.4, 0], [POT[0] - 0.2 + 0.13 * i, POT[1] + 0.2, 0.1], v, 1 - 0.4 * v); }); return { caption: "1 · Traditional Chinese medicine prescribes multi-herb decoctions individualised to each patient, used by most cancer patients in China and many elsewhere to reduce chemotherapy side effects" }; }
    if (s === 1) { const u = Q(t, 1); herbs.forEach((h, i) => { setAlpha(alpha, h, 0.7); moveTo(pts, base, h, [POT[0] - 0.9 + 0.6 * i, POT[1] + 1.4, 0], [POT[0] - 0.2 + 0.13 * i, POT[1] + 0.2, 0.1], 1, 0.6); }); setAlpha(alpha, patient, 0.5 + 0.5 * clamp(u * 2)); setAlpha(alpha, chemo, 1); grow(alpha, se0, clamp(u * 2 - 0.3)); grow(alpha, se1, clamp(u * 2 - 0.7)); setAlpha(alpha, seQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "2 · Individualised formulas make standard trials difficult: the claim is that they restore balance and reduce toxicity, but formula-level efficacy is untested to modern standards" }; }
    if (s === 2) { const u = Q(t, 2); herbs.forEach((h, i) => { setAlpha(alpha, h, 0.7); moveTo(pts, base, h, [POT[0] - 0.9 + 0.6 * i, POT[1] + 1.4, 0], [POT[0] - 0.2 + 0.13 * i, POT[1] + 0.2, 0.1], 1, 0.6); }); setAlpha(alpha, patient, 1); show(alpha, 1, se0, se1); setAlpha(alpha, seQ, 0.6); cascade(alpha, pile, clamp(u * 1.5)); cascade(alpha, drugs, clamp(u * 2 - 0.5)); setAlpha(alpha, drugOk, clamp(u * 2 - 1)); return { caption: "3 · Cochrane reviews found many small trials with methodological weaknesses, inconsistent formulas and positive results mostly in the Chinese-language literature, and conclude the evidence is insufficient; individual constituents did become real drugs, such as arsenic trioxide, homoharringtonine and camptothecin analogues" }; }
    const u = Q(t, 3); herbs.forEach((h, i) => { setAlpha(alpha, h, 0.7); moveTo(pts, base, h, [POT[0] - 0.9 + 0.6 * i, POT[1] + 1.4, 0], [POT[0] - 0.2 + 0.13 * i, POT[1] + 0.2, 0.1], 1, 0.6); }); setAlpha(alpha, patient, 1); show(alpha, 1, se0, se1, ...pile, ...drugs, drugOk); setAlpha(alpha, seQ, 0.6);
    setAlpha(alpha, liver, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, metal, clamp(u * 2 - 0.4)); movePart(pts, base, metal, [0, 0, 0], 1, t * TAU); setAlpha(alpha, tki, clamp(u * 2 - 0.7)); setAlpha(alpha, tkiQ, clamp(u * 2 - 1) * 0.7);
    return { caption: "4 · Safety concerns are hepatotoxicity, contamination with heavy metals or undeclared pharmaceuticals, aristolochic acid nephrotoxicity and carcinogenicity, and CYP3A4 interactions with tyrosine kinase inhibitors, so patients should tell their oncology team what they take" };
  });
}

// ---------------------------------------------------------------- 70. Aidoc CARE (clinical radiology foundation model)
export function aidocCare(): Mesh {
  const sc = scene();
  const queue: Part[] = []; for (let i = 0; i < 6; i++) queue.push(put(sc, `q${i}`, quad(0.7, 0.55, i === 3 ? "hot" : "soft"), { at: [-2.6 + 0.85 * i, 1.5, 0] }));
  const bodies: Part[] = []; for (let i = 0; i < 6; i++) bodies.push(put(sc, `b${i}`, ellipsoid(0.22, 0.16, 0.03, 3, 8, "soft"), { at: [-2.6 + 0.85 * i, 1.5, 0.03] }));
  const mass = put(sc, "mass", mote(0.07, "hot"), { at: [-2.6 + 0.85 * 3 + 0.1, 1.55, 0.06] });
  const mod = put(sc, "model", model(1.4, 1.0, "accent"), { at: [-1.5, -0.3, 0] });
  const heads: Part[] = []; for (let i = 0; i < 4; i++) heads.push(put(sc, `h${i}`, box(0.45, 0.3, 0.25, "accent", true), { at: [0.3 + 0.6 * i, -0.3, 0] }));
  const cleared: Part[] = []; for (let i = 0; i < 4; i++) cleared.push(put(sc, `c${i}`, tick([0.3 + 0.6 * i, -0.75, 0.05], 0.1)));
  const flag = put(sc, "flag", polyline([[0, 0, 0], [0, 0.55, 0], [0.4, 0.42, 0], [0, 0.3, 0]], "hot"), { at: [-2.6 + 0.85 * 3, 1.85, 0.1] });
  const radiol = put(sc, "radiol", figure("soft"), { at: [2.5, 1.3, 0], scale: 0.7 });
  const followUp = put(sc, "followUp", doc(0.55, 0.65, 3, "accent"), { at: [0.6, -1.9, 0] });
  const notOnc = put(sc, "notOnc", blob(0.3, "hot"), { at: [2.2, -1.8, 0] });
  const notOncQ = put(sc, "notOncQ", ring(0.45, 12, "hot", "z"), { at: [2.2, -1.8, 0.05] });
  sc.mesh.labels = [L([0, 2.1, 0], "Emergency CT queue"), L([-1.5, 0.45, 0], "One self-supervised CT backbone (2025)"), L([1.2, 0.2, 0], "Task-specific heads, each FDA-cleared"), L([1.4, -2.45, 0], "Incidental mass prompts follow-up; not cancer-specific")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...heads, ...cleared, flag, followUp, notOnc, notOncQ);
    setAlpha(alpha, mod, 0.5); setAlpha(alpha, radiol, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, queue, clamp(u * 1.4)); cascade(alpha, bodies, clamp(u * 1.4)); setAlpha(alpha, mass, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "1 · In emergency radiology CT scans queue in the order they arrive; the one with an urgent finding may sit deep in the list" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, mass, 1); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); cascade(alpha, heads, clamp(u * 1.5 - 0.2)); cascade(alpha, cleared, clamp(u * 1.5 - 0.5)); return { caption: "2 · Aidoc CARE is one radiology foundation model built by self-supervised pretraining on CT, with task-specific heads that have each been cleared by the FDA for a narrow triage use" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, mass, 1); setAlpha(alpha, mod, 1); heads.forEach((h) => setAlpha(alpha, h, 1)); cleared.forEach((c) => setAlpha(alpha, c, 1)); setAlpha(alpha, flag, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); const jump = clamp(u * 2 - 0.5); [queue[3], bodies[3], mass, flag].forEach((p) => movePart(pts, base, p, [-0.85 * 3 * jump, 0.15 * Math.sin(jump * Math.PI), 0.1 * jump], 1)); setAlpha(alpha, radiol, 0.5 + 0.5 * clamp(u * 2 - 1)); return { caption: "3 · Released in 2025, it underpins triage products that flag urgent findings so radiologists read those scans first" }; }
    const u = Q(t, 3); setAlpha(alpha, mass, 1); setAlpha(alpha, mod, 1); heads.forEach((h) => setAlpha(alpha, h, 1)); cleared.forEach((c) => setAlpha(alpha, c, 1)); setAlpha(alpha, flag, 1); [queue[3], bodies[3], mass, flag].forEach((p) => movePart(pts, base, p, [-0.85 * 3, 0, 0.1], 1)); setAlpha(alpha, radiol, 1);
    setAlpha(alpha, followUp, clamp(u * 2)); setAlpha(alpha, notOnc, clamp(u * 2 - 0.5) * 0.7); setAlpha(alpha, notOncQ, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Its relevance to oncology is indirect, detecting incidental masses and prompting follow-up; it shows a shared backbone can pass regulatory review one task at a time, but says nothing about diagnostic accuracy for tumours" };
  });
}

// ---------------------------------------------------------------- 71. allogeneic donor and iPSC master cell banks
export function allogeneicCellBanking(): Mesh {
  const sc = scene();
  const donor = put(sc, "donor", figure("soft"), { at: [-2.6, 0.9, 0], scale: 0.8 });
  const ipsc = put(sc, "ipsc", cell(0.35, "accent"), { at: [-2.6, -0.9, 0] });
  const seed = put(sc, "seed", blob(0.16, "accent"), { at: [-2.6, 1.1, 0.2] });
  const BANK: Vec3 = [-0.6, 0.1, 0];
  const bank = put(sc, "bank", box(1.4, 1.6, 0.8, "soft", true), { at: BANK });
  const frost: Part[] = []; for (let i = 0; i < 3; i++) frost.push(put(sc, `fr${i}`, line([BANK[0] - 0.5 + 0.5 * i, BANK[1] + 0.9, 0.41], [BANK[0] - 0.5 + 0.5 * i, BANK[1] + 1.05, 0.41], "soft")));
  const tcr = put(sc, "tcr", ring(0.1, 6, "hot", "z"), { at: [BANK[0] - 0.3, BANK[1] + 0.3, 0.45] });
  const hla = put(sc, "hla", ring(0.1, 6, "hot", "z"), { at: [BANK[0] + 0.3, BANK[1] + 0.3, 0.45] });
  const edits: Part[] = []; [[BANK[0] - 0.3, BANK[1] + 0.3], [BANK[0] + 0.3, BANK[1] + 0.3]].forEach((p, i) => edits.push(put(sc, `ed${i}`, cross([p[0], p[1], 0.5], 0.12, "accent"))));
  const doses: Part[] = []; for (let i = 0; i < 12; i++) doses.push(put(sc, `ds${i}`, octahedron(0.07, "accent", true), { at: [BANK[0] - 0.45 + 0.18 * (i % 6), BANK[1] - 0.55 + 0.35 * Math.floor(i / 6), 0.45] }));
  const patients: Part[] = []; for (let i = 0; i < 3; i++) patients.push(put(sc, `pt${i}`, figure("soft"), { at: [1.8 + 0.6 * i, 0.9 - 0.4 * i, -0.2 * i], scale: 0.6 }));
  const clock = put(sc, "clock", clockFace(0.28), { at: [2.6, 1.9, 0] });
  const clockX = put(sc, "clockX", cross([2.6, 1.9, 0.1], 0.2, "accent"));
  const reject: Part[] = []; for (let i = 0; i < 3; i++) reject.push(put(sc, `rj${i}`, mote(0.06, "hot"), { at: [1.8 + 0.6 * i, 1.0 - 0.4 * i, 0.15 - 0.2 * i] }));
  const persist = put(sc, "persist", bar(1.6, 1.0, 0.22, "soft"), { at: [0, -2.2, 0] });
  const persistAllo = put(sc, "persistAllo", bar(2.0, 0.45, 0.22, "hot"), { at: [0, -2.2, 0] });
  sc.mesh.labels = [L([-2.6, 1.85, 0], "Healthy donor T or NK cells, or an iPSC line"), L([BANK[0], BANK[1] + 1.4, 0], "Master cell bank: TCR and HLA class I removed, cryopreserved"), L([2.4, -0.6, 0], "Hundreds of doses per batch, off the shelf"), L([1.9, -2.55, 0], "Rejection limits persistence")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, seed, tcr, hla, ...edits, ...doses, ...patients, clock, clockX, ...reject, persist, persistAllo);
    setAlpha(alpha, bank, 0.4); frost.forEach((f) => setAlpha(alpha, f, 0.4));
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, donor, 1); setAlpha(alpha, ipsc, 1); setAlpha(alpha, seed, 1); moveTo(pts, base, seed, [-2.6, 1.1, 0.2], [BANK[0], BANK[1] + 0.3, 0.45], clamp(u * 1.5)); setAlpha(alpha, bank, 0.4 + 0.6 * clamp(u * 2 - 1)); return { caption: "1 · Instead of building each product from the patient's own cells, start from a healthy donor's T or NK cells or an induced pluripotent stem cell line, characterised once as a master cell bank" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, seed, 0.5); moveTo(pts, base, seed, [-2.6, 1.1, 0.2], [BANK[0], BANK[1] + 0.3, 0.45], 1); setAlpha(alpha, bank, 1); frost.forEach((f) => setAlpha(alpha, f, 1)); setAlpha(alpha, tcr, clamp(u * 2)); setAlpha(alpha, hla, clamp(u * 2)); edits.forEach((e, i) => setAlpha(alpha, e, clamp(u * 2 - 0.6 - 0.2 * i) * (0.6 + 0.4 * pulse(t, 4)))); return { caption: "2 · The cells are gene-edited to remove the T cell receptor, so they cannot cause graft-versus-host disease, and HLA class I, so the host is slower to reject them, then differentiated if needed" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, seed, 0.5); moveTo(pts, base, seed, [-2.6, 1.1, 0.2], [BANK[0], BANK[1] + 0.3, 0.45], 1); setAlpha(alpha, bank, 1); frost.forEach((f) => setAlpha(alpha, f, 1)); show(alpha, 0.6, tcr, hla); edits.forEach((e) => setAlpha(alpha, e, 1)); cascade(alpha, doses, clamp(u * 1.5)); patients.forEach((p, i) => setAlpha(alpha, p, clamp(u * 2 - 0.8 - 0.2 * i))); setAlpha(alpha, clock, clamp(u * 2 - 1)); setAlpha(alpha, clockX, clamp(u * 2 - 1.2)); return { caption: "3 · One expansion is cryopreserved as hundreds of doses per batch: Allogene, Caribou, Cellectis and cord-blood NK programmes from donors, Fate, Century and Shoreline from iPSC banks, so patients receive an off-the-shelf product instead of waiting weeks" }; }
    const u = Q(t, 3); setAlpha(alpha, seed, 0.5); moveTo(pts, base, seed, [-2.6, 1.1, 0.2], [BANK[0], BANK[1] + 0.3, 0.45], 1); setAlpha(alpha, bank, 1); frost.forEach((f) => setAlpha(alpha, f, 1)); show(alpha, 0.6, tcr, hla); edits.forEach((e) => setAlpha(alpha, e, 1)); doses.forEach((d) => setAlpha(alpha, d, 1)); patients.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, clock, 1); setAlpha(alpha, clockX, 1);
    reject.forEach((r, i) => { setAlpha(alpha, r, clamp(u * 2 - 0.2 * i) * (0.5 + 0.5 * pulse(t, 4 + i))); movePart(pts, base, r, [0.15 * Math.sin(t * TAU * 3 + i), 0.15 * Math.cos(t * TAU * 3 + i), 0], 1); }); grow(alpha, persist, clamp(u * 2 - 0.4)); grow(alpha, persistAllo, clamp(u * 2 - 0.8));
    return { caption: "4 · Consistency and lower cost per dose at scale are the promise; host rejection limits how long the cells persist, editing is complex, donor-to-donor variability affects primary-cell products, and comparability across thousands of doses from one bank is the manufacturing question" };
  });
}

// ---------------------------------------------------------------- 72. Atlas (Aignostics, Mayo Clinic, Charité)
export function atlasAignostics(): Mesh {
  const sc = scene();
  const hosp: Part[] = []; [[-2.5, 1.3], [-2.5, -0.9]].forEach((p, i) => hosp.push(put(sc, `h${i}`, building(1.1, 0.9), { at: [p[0], p[1], 0] })));
  const slidesA: Part[] = []; for (let i = 0; i < 3; i++) slidesA.push(put(sc, `sa${i}`, quad(0.5, 0.3, ["soft", "accent", "hot"][i]), { at: [-1.4, 1.6 - 0.3 * i, 0] }));
  const slidesB: Part[] = []; for (let i = 0; i < 3; i++) slidesB.push(put(sc, `sb${i}`, quad(0.5, 0.3, ["hot", "soft", "accent"][i]), { at: [-1.4, -0.6 - 0.3 * i, 0] }));
  const mod = put(sc, "model", model(1.5, 1.2, "accent"), { at: [0.3, 0.2, 0] });
  const AX: Vec3 = [1.6, -0.5, 0];
  const bench = put(sc, "bench", axes(AX, 1.6, 1.5));
  const bars: Part[] = []; [0.8, 0.95, 1.25, 0.9].forEach((h, i) => bars.push(put(sc, `b${i}`, bar(AX[0] + 0.3 + 0.35 * i, h, 0.2, i === 2 ? "hot" : "soft"), { at: [0, AX[1], 0] })));
  const lock = put(sc, "lock", box(0.5, 0.35, 0.2, "hot", true), { at: [2.4, 1.6, 0] });
  const lockArc = put(sc, "lockArc", polyline([[2.2, 1.78, 0], [2.2, 2.05, 0], [2.6, 2.05, 0], [2.6, 1.78, 0]], "hot"));
  const outside = put(sc, "outside", figure("soft"), { at: [1.4, 1.5, 0], scale: 0.55 });
  const outsideX = put(sc, "outsideX", cross([1.4, 1.5, 0.1], 0.22));
  const clinQ = put(sc, "clinQ", ring(0.4, 12, "hot", "z"), { at: [0.3, -1.8, 0.05] });
  const clinDoc = put(sc, "clinDoc", doc(0.5, 0.6, 3, "soft"), { at: [0.3, -1.8, 0] });
  sc.mesh.labels = [L([-2.5, 2.05, 0], "Mayo Clinic and Charité: 1.2 million slides"), L([-1.4, 0.35, 0], "Diverse scanners and stains"), L([0.3, 1.1, 0], "ViT-H with RudolfV-style self-supervision"), L([1.9, -0.85, 0], "Top public benchmarks (2025); proprietary weights")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, bench, ...bars, lock, lockArc, outside, outsideX, clinQ, clinDoc);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, hosp, clamp(u * 1.5)); cascade(alpha, slidesA, clamp(u * 2 - 0.5)); cascade(alpha, slidesB, clamp(u * 2 - 0.7)); return { caption: "1 · Two of the world's largest hospitals, Mayo Clinic and Charité, contributed 1.2 million slides spanning the scanners and stains of routine practice" }; }
    if (s === 1) { const u = Q(t, 1); hosp.forEach((h) => setAlpha(alpha, h, 1)); [...slidesA, ...slidesB].forEach((p, i) => { setAlpha(alpha, p, 1); const from: Vec3 = i < 3 ? [-1.4, 1.6 - 0.3 * i, 0] : [-1.4, -0.6 - 0.3 * (i - 3), 0]; moveTo(pts, base, p, from, [0.3 - 0.45 + 0.2 * (i % 3), 0.2 + 0.3 - 0.6 * Math.floor(i / 3), 0.3], clamp(u * 1.5 - 0.1 * i), 0.6); }); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); return { caption: "2 · A ViT-H vision transformer is trained with RudolfV-style self-supervision on that variety, so the learned features are meant to be robust to the shifts that break models trained at one site" }; }
    if (s === 2) { const u = Q(t, 2); [...slidesA, ...slidesB].forEach((p, i) => { setAlpha(alpha, p, 0.7); const from: Vec3 = i < 3 ? [-1.4, 1.6 - 0.3 * i, 0] : [-1.4, -0.6 - 0.3 * (i - 3), 0]; moveTo(pts, base, p, from, [0.3 - 0.45 + 0.2 * (i % 3), 0.2 + 0.3 - 0.6 * Math.floor(i / 3), 0.3], 1, 0.6); }); setAlpha(alpha, mod, 1); setAlpha(alpha, bench, clamp(u * 2)); bars.forEach((b, i) => grow(alpha, b, clamp(u * 2 - 0.3 - 0.15 * i))); return { caption: "3 · The 2025 paper reported top scores on public pathology benchmarks" }; }
    const u = Q(t, 3); [...slidesA, ...slidesB].forEach((p, i) => { setAlpha(alpha, p, 0.7); const from: Vec3 = i < 3 ? [-1.4, 1.6 - 0.3 * i, 0] : [-1.4, -0.6 - 0.3 * (i - 3), 0]; moveTo(pts, base, p, from, [0.3 - 0.45 + 0.2 * (i % 3), 0.2 + 0.3 - 0.6 * Math.floor(i / 3), 0.3], 1, 0.6); }); setAlpha(alpha, mod, 1); setAlpha(alpha, bench, 1); bars.forEach((b) => setAlpha(alpha, b, 1));
    setAlpha(alpha, lock, clamp(u * 2)); setAlpha(alpha, lockArc, clamp(u * 2)); setAlpha(alpha, outside, clamp(u * 2 - 0.4) * 0.6); setAlpha(alpha, outsideX, clamp(u * 2 - 0.6) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, clinDoc, clamp(u * 2 - 0.8)); setAlpha(alpha, clinQ, clamp(u * 2 - 1) * 0.7);
    return { caption: "4 · The model is proprietary, so outside groups cannot inspect or fine-tune the weights and must rely on the company's evaluations, and clinical validation of downstream tasks remains to be published" };
  });
}

// ---------------------------------------------------------------- 73. Ayurvedic medicine and cancer
export function ayurvedicMedicine(): Mesh {
  const sc = scene();
  const Y: Vec3 = [-2.2, 0.2, 0];
  const yogi = put(sc, "yogi", figure("accent"), { at: Y, scale: 1.0 });
  const yogaOk = put(sc, "yogaOk", tick([Y[0] + 0.6, Y[1] + 0.9, 0.05], 0.18));
  const breath: Part[] = []; for (let i = 0; i < 2; i++) breath.push(put(sc, `br${i}`, ring(0.4 + 0.25 * i, 12, "accent", "z"), { at: [Y[0], Y[1] + 0.3, 0.2] }));
  const herbs: Part[] = []; for (let i = 0; i < 3; i++) herbs.push(put(sc, `hb${i}`, leaf(0.28, "soft"), { at: [-0.6 + 0.5 * i, 1.4, 0], rotZ: 0.3 * (i - 1) }));
  const mineral = put(sc, "mineral", octahedron(0.2, "hot", true), { at: [1.2, 1.4, 0] });
  const trialQ = put(sc, "trialQ", ring(0.4, 12, "hot", "z"), { at: [0.3, 0.3, 0.05] });
  const trialDoc = put(sc, "trialDoc", doc(0.5, 0.6, 3, "soft"), { at: [0.3, 0.3, 0] });
  const products: Part[] = []; for (let i = 0; i < 5; i++) products.push(put(sc, `pr${i}`, vial(0.12, 0.42, i === 2 ? "hot" : "soft"), { at: [0.2 + 0.5 * i, -1.2, 0] }));
  const metal = put(sc, "metal", polyline([[1.2, -0.65, 0], [1.45, -0.2, 0], [1.7, -0.65, 0]], "hot", true));
  const liver = put(sc, "liver", organ(0.4, 0.28, 0.2, "hot"), { at: [-1.3, -1.6, 0] });
  const ashw = put(sc, "ashw", leaf(0.22, "accent"), { at: [-2.1, -1.6, 0] });
  const ask = put(sc, "ask", doc(0.5, 0.6, 3, "accent"), { at: [2.6, -0.2, 0] });
  sc.mesh.labels = [L([Y[0], Y[1] - 1.35, 0], "Yoga and pranayama: independent randomised evidence for fatigue and mood"), L([0.5, 2.0, 0], "Herbal and rasa shastra (metal and mineral) remedies: no trials of benefit"), L([1.2, -1.85, 0], "Online products: about one fifth with lead, mercury or arsenic (JAMA 2008)"), L([-1.7, -2.2, 0], "Ashwagandha: small trials, liver injury reports")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, yogaOk, ...breath, trialQ, trialDoc, ...products, metal, liver, ashw, ask);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, yogi, 1); breath.forEach((b, i) => { const v = (t * 2.5 + i / 2) % 1; setAlpha(alpha, b, clamp(u * 2) * (1 - v) * 0.7); movePart(pts, base, b, [0, 0, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, yogaOk, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); herbs.forEach((h) => setAlpha(alpha, h, 0.4)); setAlpha(alpha, mineral, 0.4); return { caption: "1 · Ayurveda combines diet, yoga, pranayama, herbs and mineral preparations; its yoga and breathing components overlap with practices that have randomised evidence for fatigue and mood in their own right" }; }
    if (s === 1) { const u = Q(t, 1); breath.forEach((b, i) => { const v = (t * 2.5 + i / 2) % 1; setAlpha(alpha, b, (1 - v) * 0.5); movePart(pts, base, b, [0, 0, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, yogaOk, 0.8); herbs.forEach((h, i) => setAlpha(alpha, h, 0.4 + 0.6 * clamp(u * 2 - 0.2 * i))); setAlpha(alpha, mineral, 0.4 + 0.6 * clamp(u * 2 - 0.5)); movePart(pts, base, mineral, [0, 0, 0], 1, t * TAU); setAlpha(alpha, trialDoc, clamp(u * 2 - 0.7)); setAlpha(alpha, trialQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "2 · The herbal and rasa shastra remedies, which contain metals and minerals, have no randomised trials showing anticancer or survival benefit, and the pharmacology of most is uncharacterised" }; }
    if (s === 2) { const u = Q(t, 2); breath.forEach((b, i) => { const v = (t * 2.5 + i / 2) % 1; setAlpha(alpha, b, (1 - v) * 0.5); movePart(pts, base, b, [0, 0, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, yogaOk, 0.8); herbs.forEach((h) => setAlpha(alpha, h, 1)); setAlpha(alpha, mineral, 1); movePart(pts, base, mineral, [0, 0, 0], 1, t * TAU); setAlpha(alpha, trialDoc, 1); setAlpha(alpha, trialQ, 0.6); cascade(alpha, products, clamp(u * 1.5)); setAlpha(alpha, metal, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · A survey of Ayurvedic products sold on the internet (JAMA 2008) found detectable lead, mercury or arsenic in about one fifth, with rasa shastra products most likely to exceed safety limits; case series describe lead poisoning in users" }; }
    const u = Q(t, 3); breath.forEach((b, i) => { const v = (t * 2.5 + i / 2) % 1; setAlpha(alpha, b, (1 - v) * 0.5); movePart(pts, base, b, [0, 0, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, yogaOk, 0.8); herbs.forEach((h) => setAlpha(alpha, h, 1)); setAlpha(alpha, mineral, 1); movePart(pts, base, mineral, [0, 0, 0], 1, t * TAU); setAlpha(alpha, trialDoc, 1); setAlpha(alpha, trialQ, 0.6); products.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, metal, 0.8);
    setAlpha(alpha, ashw, clamp(u * 2)); setAlpha(alpha, liver, clamp(u * 2 - 0.4) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, ask, clamp(u * 2 - 0.8));
    return { caption: "4 · Ashwagandha has small trials for fatigue and anxiety but also reports of liver injury; oncologists should ask about Ayurvedic products and check heavy-metal exposure when symptoms fit, since the practice is culturally important and widely used" };
  });
}

// ---------------------------------------------------------------- 74. cell-therapy orchestration and chain-of-identity software
export function orchestrationSoftware(): Mesh {
  const sc = scene();
  const P: Vec3 = [-2.6, 0.2, 0];
  const patient = put(sc, "patient", figure("soft"), { at: P, scale: 0.9 });
  const idTag = put(sc, "idTag", ticks(P[0] - 0.3, P[0] + 0.3, P[1] + 1.25, 7, "accent"));
  const bag = put(sc, "bag", quad(0.45, 0.6, "accent"), { at: [-1.4, 0.6, 0] });
  const bagTag = put(sc, "bagTag", ticks(-1.55, -1.25, 0.2, 4, "accent"));
  const truck = put(sc, "truck", box(0.7, 0.4, 0.4, "soft", true), { at: [-0.3, 0.6, 0] });
  const wheels: Part[] = []; for (let i = 0; i < 2; i++) wheels.push(put(sc, `wh${i}`, ring(0.1, 8, "soft", "z"), { at: [-0.55 + 0.5 * i, 0.35, 0.21] }));
  const plant = put(sc, "plant", building(1.1, 1.0), { at: [1.6, 0.6, 0] });
  const status: Part[] = []; for (let i = 0; i < 4; i++) status.push(put(sc, `st${i}`, tick([1.15 + 0.3 * i, 1.4, 0.05], 0.1)));
  const product = put(sc, "product", vial(0.14, 0.45, "accent"), { at: [1.6, 0.6, 0.5] });
  const prodTag = put(sc, "prodTag", ticks(1.45, 1.75, 0.2, 4, "accent"));
  const match = put(sc, "match", tick([P[0] + 0.7, P[1] + 0.3, 0.1], 0.22));
  const engine = put(sc, "engine", model(2.2, 0.7, "accent"), { at: [-0.4, -1.2, 0] });
  const portals: Part[] = []; for (let i = 0; i < 3; i++) portals.push(put(sc, `po${i}`, screen(0.6, 0.4, "soft"), { at: [1.3 + 0.7 * i, -1.7, 0] }));
  const burden = put(sc, "burden", ring(0.35, 10, "hot", "z"), { at: [2.0, -1.7, 0.05] });
  const reg = put(sc, "reg", doc(0.5, 0.6, 3, "soft"), { at: [-2.6, -1.7, 0] });
  const regOk = put(sc, "regOk", tick([-2.15, -1.6, 0.05], 0.14));
  sc.mesh.labels = [L([P[0], P[1] - 1.25, 0], "Unique patient identifier"), L([0.6, 1.9, 0], "Apheresis, courier, manufacturing status, infusion slot"), L([-0.4, -0.55, 0], "Workflow engine with barcoded chain of identity and audit logs"), L([2.0, -2.3, 0], "Every sponsor has its own portal: CellChain, Konnect, Cell Therapy 360")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, bag, bagTag, truck, ...wheels, ...status, product, prodTag, match, ...portals, burden, reg, regOk);
    setAlpha(alpha, plant, 0.4); setAlpha(alpha, engine, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, patient, 1); grow(alpha, idTag, clamp(u * 1.5)); setAlpha(alpha, bag, clamp(u * 2 - 0.6)); setAlpha(alpha, bagTag, clamp(u * 2 - 1)); return { caption: "1 · An autologous cell therapy starts with the patient's own cells collected by apheresis; from that moment every bag, vial and record carries that patient's unique identifier" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, idTag, 1); setAlpha(alpha, bag, 1); setAlpha(alpha, bagTag, 1); const d = 1.9 * clamp(u * 1.4); [bag, bagTag, truck, ...wheels].forEach((p) => movePart(pts, base, p, [d, 0, 0], 1)); setAlpha(alpha, truck, 1); wheels.forEach((w) => { setAlpha(alpha, w, 1); movePart(pts, base, w, [d, 0, 0], 1, t * TAU * 4); }); setAlpha(alpha, plant, 0.4 + 0.6 * clamp(u * 2 - 1)); setAlpha(alpha, engine, 0.4 + 0.6 * u); return { caption: "2 · Orchestration software books the manufacturing slot, schedules the courier pickup, tracks the cells to the plant and shows manufacturing status to the treating team in real time" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, idTag, 1); setAlpha(alpha, bag, 0.3); setAlpha(alpha, bagTag, 0.3); [bag, bagTag, truck, ...wheels].forEach((p) => movePart(pts, base, p, [1.9, 0, 0], 1)); setAlpha(alpha, truck, 0.5); wheels.forEach((w) => setAlpha(alpha, w, 0.5)); setAlpha(alpha, plant, 1); setAlpha(alpha, engine, 1); cascade(alpha, status, clamp(u * 1.5)); setAlpha(alpha, product, clamp(u * 2 - 0.5)); setAlpha(alpha, prodTag, clamp(u * 2 - 0.7)); moveTo(pts, base, product, [1.6, 0.6, 0.5], [P[0] + 0.6, P[1] + 0.3, 0.3], clamp(u * 2 - 1)); moveTo(pts, base, prodTag, [1.6, 0.2, 0], [P[0] + 0.6, P[1] - 0.1, 0.3], clamp(u * 2 - 1)); return { caption: "3 · The finished product travels back with the same barcoded chain of identity, and the match is verified before infusion; regulators require this for commercial autologous products, and it is the prerequisite for scaling to thousands of patients a year" }; }
    const u = Q(t, 3); setAlpha(alpha, idTag, 1); setAlpha(alpha, bag, 0.3); setAlpha(alpha, bagTag, 0.3); [bag, bagTag, truck, ...wheels].forEach((p) => movePart(pts, base, p, [1.9, 0, 0], 1)); setAlpha(alpha, truck, 0.5); wheels.forEach((w) => setAlpha(alpha, w, 0.5)); setAlpha(alpha, plant, 1); setAlpha(alpha, engine, 1); status.forEach((st) => setAlpha(alpha, st, 1)); setAlpha(alpha, product, 1); setAlpha(alpha, prodTag, 1); moveTo(pts, base, product, [1.6, 0.6, 0.5], [P[0] + 0.6, P[1] + 0.3, 0.3], 1); moveTo(pts, base, prodTag, [1.6, 0.2, 0], [P[0] + 0.6, P[1] - 0.1, 0.3], 1); setAlpha(alpha, match, 0.6 + 0.4 * pulse(t, 4));
    cascade(alpha, portals, clamp(u * 1.5)); setAlpha(alpha, burden, clamp(u * 2 - 0.7) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, reg, clamp(u * 2 - 0.5)); setAlpha(alpha, regOk, clamp(u * 2 - 0.8));
    return { caption: "4 · Vineti (now Ori Biotech), TrakCel, Title21 and sponsors' own portals (Novartis CellChain, Kite Konnect, BMS Cell Therapy 360) each do this separately, so hospitals juggle several portals and integration is costly" };
  });
}

// ---------------------------------------------------------------- 75. CHIEF (Harvard, Yu Lab)
export function chiefModel(): Mesh {
  const sc = scene();
  const SL: Vec3 = [-2.2, 0.9, 0];
  const sl = put(sc, "slide", slide("soft"), { at: SL });
  const tiles: Part[] = []; for (let i = 0; i < 5; i++) tiles.push(put(sc, `tl${i}`, quad(0.2, 0.2, "hot"), { at: [SL[0] - 0.4 + 0.2 * i, SL[1], 0.06] }));
  const site = put(sc, "site", doc(0.7, 0.4, 1, "accent"), { at: [-2.2, -0.4, 0] });
  const organs: Part[] = []; for (let i = 0; i < 3; i++) organs.push(put(sc, `og${i}`, organ(0.2, 0.15, 0.1, "accent"), { at: [-2.6 + 0.4 * i, -1.1, 0] }));
  const mod = put(sc, "model", model(1.5, 1.2, "accent"), { at: [0, 0.3, 0] });
  const outs: Part[] = []; ["hot", "accent", "soft", "accent"].forEach((c, i) => outs.push(put(sc, `o${i}`, box(0.55, 0.3, 0.25, c, true), { at: [1.9, 1.3 - 0.55 * i, 0] })));
  const hosps: Part[] = []; for (let i = 0; i < 8; i++) hosps.push(put(sc, `h${i}`, building(0.32, 0.32, "soft"), { at: [-2.7 + 0.5 * i, -2.0, 0] }));
  const hospOk: Part[] = []; for (let i = 0; i < 8; i++) hospOk.push(put(sc, `ho${i}`, tick([-2.7 + 0.5 * i, -1.6, 0.05], 0.08)));
  const research = put(sc, "research", doc(0.5, 0.6, 3, "soft"), { at: [2.6, -1.6, 0] });
  const researchQ = put(sc, "researchQ", ring(0.4, 12, "hot", "z"), { at: [2.6, -1.6, 0.05] });
  sc.mesh.labels = [L([SL[0], SL[1] + 0.65, 0], "15M tiles, then 60,530 whole slides"), L([-2.2, -0.05, 0], "Anatomical-site text embedding: tissue from any organ"), L([1.9, 1.9, 0], "Detection, tumour origin, genomic prediction, prognosis"), L([-0.7, -2.5, 0], "Validated on 19,400 slides from 24 hospitals across 19 cancer types (Nature 2024)")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...tiles, site, ...organs, ...outs, ...hosps, ...hospOk, research, researchQ);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, sl, 1); cascade(alpha, tiles, clamp(u * 1.5)); tiles.forEach((p, i) => moveTo(pts, base, p, [SL[0] - 0.4 + 0.2 * i, SL[1], 0.06], [0 - 0.45 + 0.22 * i, 0.3 + 0.25, 0.3], clamp(u * 2 - 1))); return { caption: "1 · CHIEF learns at the level of the whole slide from weak labels: tile features from 15M tiles, then 60,530 slides, without pixel-level annotation" }; }
    if (s === 1) { const u = Q(t, 1); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.8); moveTo(pts, base, p, [SL[0] - 0.4 + 0.2 * i, SL[1], 0.06], [0 - 0.45 + 0.22 * i, 0.3 + 0.25, 0.3], 1); }); setAlpha(alpha, site, clamp(u * 2)); cascade(alpha, organs, clamp(u * 2 - 0.3)); moveTo(pts, base, site, [-2.2, -0.4, 0], [0, 0.3 - 0.25, 0.3], clamp(u * 2 - 0.8), 0.7); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); return { caption: "2 · A text embedding of the anatomical site is combined with the tile features, so one model can be pointed at tissue from any organ rather than needing a model per task" }; }
    if (s === 2) { const u = Q(t, 2); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.8); moveTo(pts, base, p, [SL[0] - 0.4 + 0.2 * i, SL[1], 0.06], [0 - 0.45 + 0.22 * i, 0.3 + 0.25, 0.3], 1); }); setAlpha(alpha, site, 0.8); moveTo(pts, base, site, [-2.2, -0.4, 0], [0, 0.3 - 0.25, 0.3], 1, 0.7); organs.forEach((o) => setAlpha(alpha, o, 1)); setAlpha(alpha, mod, 1); cascade(alpha, outs, clamp(u * 1.5)); return { caption: "3 · From one backbone it detects cancer, predicts tumour origin, genomic features and prognosis across 19 cancer types" }; }
    const u = Q(t, 3); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.8); moveTo(pts, base, p, [SL[0] - 0.4 + 0.2 * i, SL[1], 0.06], [0 - 0.45 + 0.22 * i, 0.3 + 0.25, 0.3], 1); }); setAlpha(alpha, site, 0.8); moveTo(pts, base, site, [-2.2, -0.4, 0], [0, 0.3 - 0.25, 0.3], 1, 0.7); organs.forEach((o) => setAlpha(alpha, o, 1)); setAlpha(alpha, mod, 1); outs.forEach((o) => setAlpha(alpha, o, 1));
    cascade(alpha, hosps, clamp(u * 1.4)); cascade(alpha, hospOk, clamp(u * 1.4 - 0.2)); setAlpha(alpha, research, clamp(u * 2 - 0.8)); setAlpha(alpha, researchQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · The Nature 2024 paper validated it on 19,400 slides from 24 hospitals, its main strength; it remains a research release, and whether it moves into regulated clinical workflows and how its predictions fare prospectively is open" };
  });
}

// ---------------------------------------------------------------- 76. dance and movement therapy
export function danceMovementTherapy(): Mesh {
  const sc = scene();
  const P: Vec3 = [-1.6, 0.0, 0];
  const dancer = put(sc, "dancer", figure("accent"), { at: P, scale: 1.1 });
  const armL = put(sc, "armL", polyline([[P[0] - 0.33, P[1] + 0.6, 0], [P[0] - 0.7, P[1] + 1.1, 0.05], [P[0] - 0.6, P[1] + 1.5, 0.1]], "accent"));
  const armR = put(sc, "armR", polyline([[P[0] + 0.33, P[1] + 0.6, 0], [P[0] + 0.75, P[1] + 0.9, 0.05], [P[0] + 1.1, P[1] + 1.2, 0.1]], "accent"));
  const notes: Part[] = []; for (let i = 0; i < 4; i++) notes.push(put(sc, `n${i}`, polyline([[0, 0, 0], [0, 0.3, 0], [0.15, 0.35, 0]], "soft"), { at: [-2.8, 1.4, 0], scale: 0.8 }));
  const therapist = put(sc, "therapist", figure("soft"), { at: [0.2, 0.0, -0.3], scale: 0.85 });
  const trials: Part[] = []; for (let i = 0; i < 3; i++) trials.push(put(sc, `tr${i}`, doc(0.45, 0.55, 2, "soft"), { at: [1.4 + 0.55 * i, 1.4, 0] }));
  const outs: Part[] = []; for (let i = 0; i < 4; i++) outs.push(put(sc, `ou${i}`, ring(0.2, 10, "hot", "z"), { at: [1.4 + 0.45 * i, 0.2, 0.05] }));
  const qol = put(sc, "qol", bar(2.8, 0.5, 0.22, "accent"), { at: [0, -0.5, 0] });
  const qolQ = put(sc, "qolQ", ring(0.25, 10, "hot", "z"), { at: [2.8, 0.25, 0.05] });
  const fit0 = put(sc, "fit0", bar(1.5, 0.5, 0.22, "soft"), { at: [0, -2.2, 0] });
  const fit1 = put(sc, "fit1", bar(1.85, 0.95, 0.22, "accent"), { at: [0, -2.2, 0] });
  const fitOk = put(sc, "fitOk", tick([2.4, -1.5, 0.05], 0.18));
  const guide = put(sc, "guide", doc(0.5, 0.6, 3, "soft"), { at: [-2.4, -1.6, 0] });
  const guideX = put(sc, "guideX", cross([-2.4, -1.6, 0.1], 0.22));
  sc.mesh.labels = [L([P[0], P[1] - 1.4, 0], "Guided movement with a trained therapist"), L([1.95, 2.0, 0], "Cochrane 2015: three small trials, all in breast cancer"), L([2.0, -0.2, 0], "Depression, stress, anxiety, fatigue, body image: insufficient evidence"), L([1.9, -2.55, 0], "As exercise: fitness and fatigue benefits are well established")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...trials, ...outs, qol, qolQ, fit0, fit1, fitOk, guide, guideX);
    const sway = 0.12 * Math.sin(t * TAU * 3);
    movePart(pts, base, dancer, [sway, 0.05 * Math.abs(Math.sin(t * TAU * 6)), 0], 1); movePart(pts, base, armL, [sway, 0.15 * Math.sin(t * TAU * 3), 0], 1); movePart(pts, base, armR, [sway, -0.15 * Math.sin(t * TAU * 3), 0], 1);
    notes.forEach((n, i) => { const v = (t * 2 + i / 4) % 1; setAlpha(alpha, n, (1 - v) * 0.8); movePart(pts, base, n, [0.3 * v + 0.1 * Math.sin(i), 0.9 * v, 0], 1); });
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, therapist, 0.4 + 0.6 * u); return { caption: "1 · Dance and movement therapy uses guided movement to music with a trained therapist to express emotion and improve body awareness" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, therapist, 1); cascade(alpha, trials, clamp(u * 1.5)); return { caption: "2 · A 2015 Cochrane review found only three small randomised trials, all in women with breast cancer" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, therapist, 1); trials.forEach((tr) => setAlpha(alpha, tr, 1)); outs.forEach((o, i) => setAlpha(alpha, o, clamp(u * 2 - 0.2 * i) * (0.5 + 0.5 * pulse(t, 4)))); grow(alpha, qol, clamp(u * 2 - 0.8)); setAlpha(alpha, qolQ, clamp(u * 2 - 1.1) * 0.7); return { caption: "3 · Evidence for effects on depression, stress, anxiety, fatigue or body image was insufficient, with a possible improvement in quality of life of uncertain size" }; }
    const u = Q(t, 3); setAlpha(alpha, therapist, 1); trials.forEach((tr) => setAlpha(alpha, tr, 1)); outs.forEach((o) => setAlpha(alpha, o, 0.6)); setAlpha(alpha, qol, 1); setAlpha(alpha, qolQ, 0.6);
    grow(alpha, fit0, clamp(u * 2)); grow(alpha, fit1, clamp(u * 2 - 0.3)); setAlpha(alpha, fitOk, clamp(u * 2 - 0.6) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, guide, clamp(u * 2 - 0.8)); setAlpha(alpha, guideX, clamp(u * 2 - 1));
    return { caption: "4 · As physical activity it shares the well-established benefits of exercise on fitness and fatigue and promotes adherence; as a specific therapy its added value is untested, it is not covered in oncology guidelines, and risk is low in anyone cleared for moderate exercise" };
  });
}

// ---------------------------------------------------------------- 77. Essiac, Hoxsey and other 'herbal cancer cures'
export function essiacHoxsey(): Mesh {
  const sc = scene();
  const CUP: Vec3 = [-2.2, 0.6, 0];
  const cup = put(sc, "cup", cylinder(0.4, 0.55, 10, 2, "soft", true, true), { at: CUP });
  const handle = put(sc, "handle", ring(0.16, 8, "soft", "z"), { at: [CUP[0] + 0.5, CUP[1], 0] });
  const herbs: Part[] = []; for (let i = 0; i < 4; i++) herbs.push(put(sc, `hb${i}`, leaf(0.22, "accent"), { at: [CUP[0] - 0.6 + 0.4 * i, CUP[1] + 1.4, 0], rotZ: 0.3 * (i - 1.5) }));
  const steam: Part[] = []; for (let i = 0; i < 3; i++) steam.push(put(sc, `st${i}`, ring(0.08, 6, "soft", "y"), { at: [CUP[0] - 0.12 + 0.12 * i, CUP[1] + 0.4, 0] }));
  const tl = put(sc, "tl", ticks(-0.8, 2.6, 1.7, 5, "soft"));
  const marks: Part[] = []; [-0.8, 0.05, 1.75].forEach((x, i) => marks.push(put(sc, `mk${i}`, mote(0.07, i === 2 ? "hot" : "accent"), { at: [x, 1.7, 0.05] })));
  const reviews: Part[] = []; for (let i = 0; i < 2; i++) reviews.push(put(sc, `rv${i}`, doc(0.55, 0.65, 3, "soft"), { at: [0.2 + 1.2 * i, 0.5, 0] }));
  const revX: Part[] = []; for (let i = 0; i < 2; i++) revX.push(put(sc, `rx${i}`, cross([0.2 + 1.2 * i, 0.5, 0.1], 0.25)));
  const DISH: Vec3 = [-1.6, -1.4, 0];
  const dish = put(sc, "dish", cylinder(0.55, 0.12, 12, 2, "soft", true, true), { at: DISH });
  const dCell = put(sc, "dCell", blob(0.14, "hot"), { at: [DISH[0], DISH[1] + 0.1, 0.1] });
  const grewRing = put(sc, "grew", ring(0.35, 10, "hot", "z"), { at: [DISH[0], DISH[1] + 0.1, 0.15] });
  const scalpel = put(sc, "scalpel", polyline([[0, 0, 0], [0.5, 0, 0], [0.75, 0.1, 0]], "accent"), { at: [0.6, -1.4, 0] });
  const scalpelX = put(sc, "scalpelX", cross([0.95, -1.4, 0.1], 0.22));
  const paste = put(sc, "paste", disc(0.3, 12, "hot", "z"), { at: [2.4, -1.4, 0] });
  const burn = put(sc, "burn", ring(0.45, 12, "hot", "z"), { at: [2.4, -1.4, 0.05] });
  sc.mesh.labels = [L([CUP[0], CUP[1] + 2.0, 0], "Essiac: burdock, sheep sorrel, slippery elm, Indian rhubarb"), L([0.9, 2.1, 0], "Caisse from the 1920s; Hoxsey from the 1930s; reviews 1982 (Canada) and NCI: no benefit"), L([DISH[0], DISH[1] - 0.7, 0], "Lab: no antiproliferative effect; one study saw breast cancer cells grow"), L([1.5, -2.1, 0], "Sold instead of surgery or chemotherapy; Hoxsey pastes burn like black salve")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, tl, ...marks, ...reviews, ...revX, dish, dCell, grewRing, scalpel, scalpelX, paste, burn);
    steam.forEach((st, i) => { const v = (t * 5 + i / 3) % 1; setAlpha(alpha, st, 0.6 * (1 - v)); movePart(pts, base, st, [0, 0.35 * v, 0], 1 + v); });
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, cup, 1); setAlpha(alpha, handle, 1); herbs.forEach((h, i) => { const v = clamp(u * 1.6 - 0.15 * i); setAlpha(alpha, h, 1); moveTo(pts, base, h, [CUP[0] - 0.6 + 0.4 * i, CUP[1] + 1.4, 0], [CUP[0] - 0.15 + 0.1 * i, CUP[1] + 0.15, 0.1], v, 1 - 0.4 * v); }); return { caption: "1 · Essiac tea, four herbs promoted by Canadian nurse Rene Caisse from the 1920s, and Hoxsey's herbal tonic sold in Texas and then Tijuana from the 1930s, have been offered as cancer cures for a century" }; }
    if (s === 1) { const u = Q(t, 1); herbs.forEach((h, i) => { setAlpha(alpha, h, 0.7); moveTo(pts, base, h, [CUP[0] - 0.6 + 0.4 * i, CUP[1] + 1.4, 0], [CUP[0] - 0.15 + 0.1 * i, CUP[1] + 0.15, 0.1], 1, 0.6); }); grow(alpha, tl, clamp(u * 1.5)); cascade(alpha, marks, clamp(u * 1.5)); reviews.forEach((r, i) => setAlpha(alpha, r, clamp(u * 2 - 0.5 - 0.3 * i))); revX.forEach((x, i) => setAlpha(alpha, x, clamp(u * 2 - 1 - 0.2 * i) * (0.6 + 0.4 * pulse(t, 4)))); return { caption: "2 · Reviews of Essiac case records by the Canadian Department of Health and Welfare (1982) and of Hoxsey's records by the NCI found no evidence of benefit; the clinics have never produced a controlled trial" }; }
    if (s === 2) { const u = Q(t, 2); herbs.forEach((h, i) => { setAlpha(alpha, h, 0.7); moveTo(pts, base, h, [CUP[0] - 0.6 + 0.4 * i, CUP[1] + 1.4, 0], [CUP[0] - 0.15 + 0.1 * i, CUP[1] + 0.15, 0.1], 1, 0.6); }); setAlpha(alpha, tl, 1); marks.forEach((m) => setAlpha(alpha, m, 1)); show(alpha, 1, ...reviews, ...revX); setAlpha(alpha, dish, clamp(u * 2)); setAlpha(alpha, dCell, clamp(u * 2 - 0.3)); movePart(pts, base, dCell, [0, 0, 0], 1 + 0.8 * clamp(u * 2 - 0.6)); setAlpha(alpha, grewRing, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "3 · Laboratory studies of Essiac show no antiproliferative effect, and one found stimulation of breast cancer cell growth; the constituent herbs have laxative and diuretic effects only, and NCI PDQ concludes there is no evidence of efficacy" }; }
    const u = Q(t, 3); herbs.forEach((h, i) => { setAlpha(alpha, h, 0.7); moveTo(pts, base, h, [CUP[0] - 0.6 + 0.4 * i, CUP[1] + 1.4, 0], [CUP[0] - 0.15 + 0.1 * i, CUP[1] + 0.15, 0.1], 1, 0.6); }); setAlpha(alpha, tl, 1); marks.forEach((m) => setAlpha(alpha, m, 1)); show(alpha, 1, ...reviews, ...revX, dish, dCell); movePart(pts, base, dCell, [0, 0, 0], 1.8); setAlpha(alpha, grewRing, 0.6);
    setAlpha(alpha, scalpel, clamp(u * 2)); setAlpha(alpha, scalpelX, clamp(u * 2 - 0.4) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, paste, clamp(u * 2 - 0.7)); setAlpha(alpha, burn, clamp(u * 2 - 1)); movePart(pts, base, burn, [0, 0, 0], 1 + 0.3 * clamp(u * 2 - 1));
    return { caption: "4 · As teas the mixtures are mostly harmless; the harm is that they are sold to people who may then decline surgery or chemotherapy, and the Hoxsey escharotic pastes share the burns and scarring of black salve" };
  });
}

// ---------------------------------------------------------------- 78. GEARS and perturbation prediction benchmarks
export function gearsBenchmarks(): Mesh {
  const sc = scene();
  const G: Vec3[] = [[-2.4, 1.2, 0], [-1.4, 1.7, 0], [-0.6, 1.0, 0], [-1.8, 0.2, 0], [-0.8, 0.0, 0], [-2.6, 0.0, 0]];
  const nodes: Part[] = []; G.forEach((g, i) => nodes.push(put(sc, `n${i}`, blob(0.16, i === 1 ? "hot" : "soft"), { at: g })));
  const E: [number, number][] = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 5], [3, 4], [0, 5]];
  const edges: Part[] = []; E.forEach(([a, b], i) => edges.push(put(sc, `e${i}`, line(G[a], G[b], "soft"))));
  const ko = put(sc, "ko", cross([G[1][0], G[1][1], 0.2], 0.2, "hot"));
  const ripples: Part[] = []; [2, 4, 0].forEach((i, k) => ripples.push(put(sc, `rp${k}`, ring(0.28, 10, "accent", "z"), { at: [G[i][0], G[i][1], 0.15] })));
  const AX: Vec3 = [0.6, 0.2, 0];
  const expr = put(sc, "expr", axes(AX, 2.2, 1.4));
  const before: Part[] = []; const after: Part[] = [];
  [0.6, 1.0, 0.4, 0.8].forEach((h, i) => { before.push(put(sc, `b${i}`, bar(AX[0] + 0.35 + 0.45 * i, h, 0.16, "soft"), { at: [0, AX[1], 0] })); after.push(put(sc, `a${i}`, bar(AX[0] + 0.35 + 0.45 * i, [1.1, 0.35, 0.9, 0.5][i], 0.16, "hot"), { at: [0, AX[1], 0.05] })); });
  const ko2 = put(sc, "ko2", cross([G[3][0], G[3][1], 0.2], 0.2, "hot"));
  const BX: Vec3 = [-2.6, -2.3, 0];
  const bench = put(sc, "bench", axes(BX, 4.6, 1.3));
  const meanLine = put(sc, "mean", line([BX[0], BX[1] + 0.7, 0.02], [BX[0] + 4.6, BX[1] + 0.7, 0.02], "hot"));
  const models: Part[] = []; [0.72, 0.68, 0.75, 0.71, 0.66, 0.74].forEach((h, i) => models.push(put(sc, `m${i}`, bar(BX[0] + 0.5 + 0.65 * i, h, 0.3, "accent"), { at: [0, BX[1], 0] })));
  sc.mesh.labels = [L([-1.6, 2.2, 0], "Gene-gene relationship graph"), L([AX[0] + 1.1, AX[1] - 0.35, 0], "Predicted expression shift after knockout (Nature Biotechnology 2023)"), L([-1.0, 2.6, 0], ""), L([BX[0] + 2.3, BX[1] - 0.35, 0], "2024-2025 benchmarks: many models barely beat predicting the mean")];
  sc.mesh.labels = sc.mesh.labels.filter((l) => l.text);
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ko, ...ripples, expr, ...before, ...after, ko2, bench, meanLine, ...models);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, nodes, clamp(u * 1.4)); cascade(alpha, edges, clamp(u * 1.4 - 0.2)); return { caption: "1 · Genes are not independent: GEARS, a graph neural network from Stanford, reasons over a graph of gene-gene relationships rather than treating each gene alone" }; }
    if (s === 1) { const u = Q(t, 1); nodes.forEach((n) => setAlpha(alpha, n, 1)); edges.forEach((e) => setAlpha(alpha, e, 1)); setAlpha(alpha, ko, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, nodes[1], 1 - 0.6 * clamp(u * 2)); ripples.forEach((r, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, r, clamp(u * 2 - 0.5 - 0.2 * i) * (1 - v) * 0.8); movePart(pts, base, r, [0, 0, 0], 0.5 + 1.0 * v); }); setAlpha(alpha, expr, clamp(u * 2 - 0.5)); before.forEach((b, i) => grow(alpha, b, clamp(u * 2 - 0.6 - 0.1 * i))); after.forEach((a, i) => grow(alpha, a, clamp(u * 2 - 1 - 0.1 * i))); return { caption: "2 · Knock out a gene and the effect propagates along the graph, so the model predicts the transcriptional shift of perturbations, including ones it has never seen (Nature Biotechnology 2023)" }; }
    if (s === 2) { const u = Q(t, 2); nodes.forEach((n) => setAlpha(alpha, n, 1)); setAlpha(alpha, nodes[1], 0.4); edges.forEach((e) => setAlpha(alpha, e, 1)); setAlpha(alpha, ko, 1); ripples.forEach((r, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, r, (1 - v) * 0.6); movePart(pts, base, r, [0, 0, 0], 0.5 + 1.0 * v); }); setAlpha(alpha, expr, 1); before.forEach((b) => setAlpha(alpha, b, 0.5)); after.forEach((a) => setAlpha(alpha, a, 1)); setAlpha(alpha, ko2, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, nodes[3], 1 - 0.6 * clamp(u * 2)); after.forEach((a, i) => movePart(pts, base, a, [0, 0, 0], 1 + 0.25 * Math.sin(i * 2) * clamp(u * 2 - 0.5))); return { caption: "3 · Its distinctive strength is combinations: predicting what two simultaneous knockouts do, which is where extrapolation over the graph matters most" }; }
    const u = Q(t, 3); nodes.forEach((n) => setAlpha(alpha, n, 1)); setAlpha(alpha, nodes[1], 0.4); setAlpha(alpha, nodes[3], 0.4); edges.forEach((e) => setAlpha(alpha, e, 1)); setAlpha(alpha, ko, 1); setAlpha(alpha, ko2, 1); ripples.forEach((r, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, r, (1 - v) * 0.6); movePart(pts, base, r, [0, 0, 0], 0.5 + 1.0 * v); }); setAlpha(alpha, expr, 1); before.forEach((b) => setAlpha(alpha, b, 0.5)); after.forEach((a, i) => { setAlpha(alpha, a, 1); movePart(pts, base, a, [0, 0, 0], 1 + 0.25 * Math.sin(i * 2)); });
    setAlpha(alpha, bench, clamp(u * 2)); models.forEach((m, i) => grow(alpha, m, clamp(u * 2 - 0.2 - 0.1 * i))); setAlpha(alpha, meanLine, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Its lasting influence is on evaluation: benchmark studies in 2024 and 2025 found many single-cell foundation models barely beat simple baselines such as predicting the mean response, exposing weak baselines field-wide and sharpening standards through the Virtual Cell Challenge" };
  });
}

// ---------------------------------------------------------------- 79. H-optimus (Bioptimus)
export function hOptimus(): Mesh {
  const sc = scene();
  const stack: Part[] = []; for (let i = 0; i < 5; i++) stack.push(put(sc, `sk${i}`, quad(1.2, 0.5, "soft"), { at: [-2.2 + 0.08 * i, 1.3 - 0.12 * i, -0.05 * i] }));
  const tiles: Part[] = []; for (let i = 0; i < 8; i++) tiles.push(put(sc, `tl${i}`, quad(0.16, 0.16, "hot"), { at: [-2.6 + 0.16 * i, 1.3, 0.06] }));
  const mod = put(sc, "model", model(1.6, 1.3, "accent"), { at: [0.2, 0.6, 0] });
  const openLock = put(sc, "openLock", box(0.45, 0.32, 0.2, "accent", true), { at: [0.2, -0.6, 0] });
  const openArc = put(sc, "openArc", polyline([[0.03, -0.44, 0], [0.03, -0.18, 0], [0.37, -0.18, 0], [0.37, -0.44, 0]], "accent"), { at: [0.12, 0.05, 0], rotZ: 0.4 });
  const AX: Vec3 = [1.5, -0.2, 0];
  const bench = put(sc, "bench", axes(AX, 1.6, 1.4));
  const bars: Part[] = []; [0.8, 0.9, 1.2, 0.85].forEach((h, i) => bars.push(put(sc, `b${i}`, bar(AX[0] + 0.3 + 0.35 * i, h, 0.2, i === 2 ? "hot" : "soft"), { at: [0, AX[1], 0] })));
  const groups: Part[] = []; for (let i = 0; i < 3; i++) groups.push(put(sc, `g${i}`, building(0.6, 0.55), { at: [-2.4 + 0.9 * i, -1.6, 0] }));
  const classifiers: Part[] = []; for (let i = 0; i < 3; i++) classifiers.push(put(sc, `c${i}`, box(0.4, 0.25, 0.2, "accent", true), { at: [-2.4 + 0.9 * i, -0.95, 0] }));
  const regDoc = put(sc, "regDoc", doc(0.5, 0.6, 3, "soft"), { at: [1.6, -1.8, 0] });
  const regQ = put(sc, "regQ", ring(0.4, 12, "hot", "z"), { at: [1.6, -1.8, 0.05] });
  const commercial = put(sc, "commercial", doc(0.5, 0.6, 3, "soft"), { at: [2.6, -1.8, 0] });
  const commOk = put(sc, "commOk", tick([2.6, -1.8, 0.1], 0.18));
  sc.mesh.labels = [L([-2.2, 1.95, 0], "500k slides, hundreds of millions of tiles"), L([0.2, 1.5, 0], "ViT-giant, DINOv2, 1.1 billion parameters"), L([2.3, 1.45, 0], "Led public benchmarks on release (2024)"), L([-1.5, -2.25, 0], "Open weights: groups build their own classifiers on it; clinical validation is theirs to do")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, openLock, openArc, bench, ...bars, ...groups, ...classifiers, regDoc, regQ, commercial, commOk);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, stack, clamp(u * 1.5)); tiles.forEach((p, i) => setAlpha(alpha, p, clamp(u * 2 - 0.8 - 0.1 * i))); return { caption: "1 · Hundreds of millions of tissue tiles are cut from 500k slides, with no labels attached" }; }
    if (s === 1) { const u = Q(t, 1); stack.forEach((p) => setAlpha(alpha, p, 0.6)); tiles.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [-2.6 + 0.16 * i, 1.3, 0.06], [0.2 - 0.6 + 0.17 * i, 0.6 + 0.35 - 0.7 * (i % 2), 0.3], clamp(u * 1.5 - 0.08 * i)); }); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); return { caption: "2 · A ViT-giant vision transformer of 1.1 billion parameters learns tissue features from them with the DINOv2 self-supervised method; H-optimus-0 (2024) led public benchmarks on release and H-optimus-1 followed" }; }
    if (s === 2) { const u = Q(t, 2); stack.forEach((p) => setAlpha(alpha, p, 0.6)); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.6 + 0.16 * i, 1.3, 0.06], [0.2 - 0.6 + 0.17 * i, 0.6 + 0.35 - 0.7 * (i % 2), 0.3], 1); }); setAlpha(alpha, mod, 1); setAlpha(alpha, bench, clamp(u * 2)); bars.forEach((b, i) => grow(alpha, b, clamp(u * 2 - 0.3 - 0.15 * i))); show(alpha, clamp(u * 2 - 0.8), openLock, openArc); return { caption: "3 · The weights are open for research and commercial licensing, so the model is a common backbone that other groups download and build their own biomarker or diagnostic classifiers on" }; }
    const u = Q(t, 3); stack.forEach((p) => setAlpha(alpha, p, 0.6)); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.6 + 0.16 * i, 1.3, 0.06], [0.2 - 0.6 + 0.17 * i, 0.6 + 0.35 - 0.7 * (i % 2), 0.3], 1); }); setAlpha(alpha, mod, 1); setAlpha(alpha, bench, 1); bars.forEach((b) => setAlpha(alpha, b, 1)); show(alpha, 1, openLock, openArc);
    cascade(alpha, groups, clamp(u * 1.5)); cascade(alpha, classifiers, clamp(u * 1.5 - 0.2)); setAlpha(alpha, commercial, clamp(u * 2 - 0.6)); setAlpha(alpha, commOk, clamp(u * 2 - 0.8)); setAlpha(alpha, regDoc, clamp(u * 2 - 0.7)); setAlpha(alpha, regQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · The gap is clinical: it has less clinical validation than commercial products that have been through regulatory review, so users must validate each downstream task themselves; it is a backbone, not a diagnostic product" };
  });
}

// ---------------------------------------------------------------- 80. homeopathy
export function homeopathy(): Mesh {
  const sc = scene();
  const vials: Part[] = []; for (let i = 0; i < 5; i++) vials.push(put(sc, `v${i}`, vial(0.2, 0.7, "soft"), { at: [-2.4 + 1.1 * i, 1.0, 0] }));
  const mols: Part[][] = []; const MN = [12, 6, 2, 1, 0];
  MN.forEach((n, i) => { const arr: Part[] = []; for (let k = 0; k < n; k++) arr.push(put(sc, `m${i}${k}`, mote(0.04, "accent"), { at: [-2.4 + 1.1 * i + 0.12 * Math.cos(k * 2.4), 1.0 + 0.2 * Math.sin(k * 1.7), 0.1] })); mols.push(arr); });
  const arrows: Part[] = []; for (let i = 0; i < 4; i++) arrows.push(put(sc, `ar${i}`, arrow([-2.05 + 1.1 * i, 1.0, 0], [-1.65 + 1.1 * i, 1.0, 0], "soft", 0.08)));
  const zero = put(sc, "zero", ring(0.3, 12, "hot", "z"), { at: [2.0, 1.0, 0.1] });
  const cochrane = put(sc, "cochrane", doc(0.7, 0.8, 4, "soft"), { at: [-2.2, -1.2, 0] });
  const eight: Part[] = []; for (let i = 0; i < 8; i++) eight.push(put(sc, `e${i}`, doc(0.2, 0.25, 1, "soft"), { at: [-1.5 + 0.27 * i, -1.2, 0] }));
  const cochX = put(sc, "cochX", cross([-2.2, -1.2, 0.1], 0.3));
  const nhs = put(sc, "nhs", building(0.8, 0.7), { at: [1.0, -1.2, 0] });
  const nhsX = put(sc, "nhsX", cross([1.0, -1.2, 0.3], 0.3));
  const chemo = put(sc, "chemo", vial(0.14, 0.5, "hot"), { at: [2.4, -1.2, 0] });
  const chemoOk = put(sc, "chemoOk", tick([2.4, -0.6, 0.05], 0.18));
  const swap = put(sc, "swap", cross([2.4, -1.2, 0.15], 0.25, "soft"));
  sc.mesh.labels = [L([-0.2, 1.8, 0], "Serial dilution until no molecule of the starting substance remains"), L([-1.8, -1.85, 0], "Cochrane 2009, 8 trials: no convincing benefit for radiodermatitis, stomatitis or chemotherapy toxicity"), L([1.0, -1.8, 0], "NHS England stopped funding in 2017"), L([2.4, -1.85, 0], "Inert; the risk is replacing real treatment")];
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, zero, cochrane, ...eight, cochX, nhs, nhsX, chemo, chemoOk, swap);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); vials.forEach((v, i) => setAlpha(alpha, v, clamp(u * 1.5 - 0.15 * i))); arrows.forEach((a, i) => setAlpha(alpha, a, clamp(u * 1.5 - 0.2 - 0.15 * i))); mols.forEach((arr, i) => arr.forEach((m) => setAlpha(alpha, m, clamp(u * 1.5 - 0.15 * i)))); return { caption: "1 · A remedy is prepared by serial dilution, each step taking a fraction of the previous one and shaking it" }; }
    if (s === 1) { const u = Q(t, 1); vials.forEach((v) => setAlpha(alpha, v, 1)); arrows.forEach((a) => setAlpha(alpha, a, 1)); mols.forEach((arr) => arr.forEach((m) => setAlpha(alpha, m, 1))); setAlpha(alpha, zero, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "2 · Often the dilution passes the point at which a single molecule of the original substance remains, so any specific effect would need new physics; the remedy is physically inert" }; }
    if (s === 2) { const u = Q(t, 2); vials.forEach((v) => setAlpha(alpha, v, 1)); arrows.forEach((a) => setAlpha(alpha, a, 1)); mols.forEach((arr) => arr.forEach((m) => setAlpha(alpha, m, 1))); setAlpha(alpha, zero, 0.6); setAlpha(alpha, cochrane, clamp(u * 2)); cascade(alpha, eight, clamp(u * 1.5 - 0.2)); setAlpha(alpha, cochX, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · A 2009 Cochrane review of homeopathic medicines for adverse effects of cancer treatment found eight trials of variable quality with no convincing evidence of benefit for radiodermatitis, stomatitis or chemotherapy toxicity, echoed by the UK Commons committee and Australia's NHMRC" }; }
    const u = Q(t, 3); vials.forEach((v) => setAlpha(alpha, v, 1)); arrows.forEach((a) => setAlpha(alpha, a, 1)); mols.forEach((arr) => arr.forEach((m) => setAlpha(alpha, m, 1))); setAlpha(alpha, zero, 0.6); setAlpha(alpha, cochrane, 1); eight.forEach((e) => setAlpha(alpha, e, 1)); setAlpha(alpha, cochX, 0.8);
    setAlpha(alpha, nhs, clamp(u * 2)); setAlpha(alpha, nhsX, clamp(u * 2 - 0.4)); setAlpha(alpha, chemo, clamp(u * 2 - 0.6)); setAlpha(alpha, swap, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4)) * (1 - clamp(u * 2 - 1.3))); setAlpha(alpha, chemoOk, clamp(u * 2 - 1.3));
    return { caption: "4 · NHS England stopped funding homeopathy in 2017; the remedies cause no direct toxicity, so the risk lies in delayed or refused conventional treatment, and patients who value the consultation should be told plainly that the remedy itself does nothing" };
  });
}
