/**
 * Wave 8 of animated technology schematics, part three: the last of the technologies that until now still fell back to a
 * generic front placeholder (relaxation, aromatherapy, reflexology and energy therapies; laetrile; phage delivery; the
 * open and proprietary pathology backbones UNI, CONCH, Hibou, Midnight, Phikon, PLUTO; the genome and cell models
 * AlphaMissense, AlphaGenome, Enformer, Nucleotide Transformer, UCE, TranscriptFormer, GenePT, CellFM, scFoundation,
 * Nicheformer; BioEmu, MedSAM, RadFM, Foresight and Tempus). Same conventions as ./animated-wave8.ts, which merges this
 * registry into WAVE8; helpers are shared in ./animated-wave8-kit.ts.
 */
import { add, arrow, box, cone, cylinder, disc, ellipsoid, helix, line, movePart, octahedron, polyline, ring, setAlpha, sphere, type Mesh, type Part, type Vec3 } from "@/lib/wireframe";
import { L, Q, TAU, axes, bar, beam, blob, building, capsule, cascade, cell, clamp, clockFace, cloud, cross, doc, figure, frame, grow, hand, hide, model, mote, moveTo, organ, protein, pulse, put, quad, scene, screen, show, slide, stageOf, tick, ticks, tube, vial } from "./animated-wave8-kit";

/** Part three of the wave 8 registry (function declarations hoist). */
export const WAVE8C: Record<string, () => Mesh> = {
  "relaxation-guided-imagery": relaxationImagery,
  "uni-conch": uniConch,
  "aromatherapy-cancer": aromatherapy,
  "phage-delivery": phageDelivery,
  "bioemu": bioemu,
  "c2s-scale": cell2Sentence,
  "laetrile-amygdalin": laetrile,
  "medsam": medsam,
  "reflexology-cancer": reflexology,
  "reiki-energy-therapies": reikiEnergy,
  "tempus-multimodal": tempusMultimodal,
  "universal-cell-embedding": universalCellEmbedding,
  "alphamissense": alphaMissense,
  "foresight-ehr": foresightEhr,
  "hibou": hibou,
  "kaiko-midnight": kaikoMidnight,
  "nicheformer": nicheformer,
  "phikon": phikon,
  "pluto": pluto,
  "radfm": radfm,
};

// ---------------------------------------------------------------- 81. relaxation training and guided imagery
export function relaxationImagery(): Mesh {
  const sc = scene();
  const P: Vec3 = [-1.8, 0.0, 0];
  const chair = put(sc, "chair", box(1.1, 0.15, 0.8, "soft", true), { at: [P[0], P[1] - 0.95, 0] });
  const back = put(sc, "back", box(0.15, 1.6, 0.8, "soft", true), { at: [P[0] - 0.55, P[1] - 0.1, 0] });
  const person = put(sc, "person", figure("soft"), { at: P, scale: 1.0 });
  const pole = put(sc, "pole", line([P[0] + 1.0, P[1] - 0.9, 0], [P[0] + 1.0, P[1] + 1.3, 0], "soft"));
  const bag = put(sc, "bag", vial(0.14, 0.45, "hot"), { at: [P[0] + 1.0, P[1] + 1.1, 0] });
  const tense: Part[] = []; for (let i = 0; i < 4; i++) tense.push(put(sc, `tn${i}`, mote(0.06, "hot"), { at: [P[0] - 0.3 + 0.2 * i, P[1] + 0.4 - 0.2 * (i % 2), 0.2] }));
  const breath: Part[] = []; for (let i = 0; i < 3; i++) breath.push(put(sc, `br${i}`, ring(0.35 + 0.25 * i, 12, "accent", "z"), { at: [P[0], P[1] + 0.35, 0.2] }));
  const scenePanel = put(sc, "scene", quad(1.6, 1.0, "accent"), { at: [1.4, 1.1, 0] });
  const sun = put(sc, "sun", disc(0.18, 10, "accent", "z"), { at: [1.9, 1.35, 0.03] });
  const waves: Part[] = []; for (let i = 0; i < 2; i++) waves.push(put(sc, `wv${i}`, polyline([[0.7, 0.85 - 0.15 * i, 0.03], [1.0, 0.95 - 0.15 * i, 0.03], [1.3, 0.85 - 0.15 * i, 0.03], [1.6, 0.95 - 0.15 * i, 0.03], [1.9, 0.85 - 0.15 * i, 0.03], [2.15, 0.95 - 0.15 * i, 0.03]], "soft")));
  const anx0 = put(sc, "anx0", bar(1.0, 1.1, 0.22, "hot"), { at: [0, -1.9, 0] });
  const anx1 = put(sc, "anx1", bar(1.35, 0.7, 0.22, "accent"), { at: [0, -1.9, 0] });
  const nau0 = put(sc, "nau0", bar(1.9, 0.9, 0.22, "hot"), { at: [0, -1.9, 0] });
  const nau1 = put(sc, "nau1", bar(2.25, 0.55, 0.22, "accent"), { at: [0, -1.9, 0] });
  const phones: Part[] = []; for (let i = 0; i < 2; i++) phones.push(put(sc, `ph${i}`, disc(0.1, 8, "accent", "x"), { at: [P[0] - 0.17 + 0.34 * i, P[1] + 0.82, 0.05] }));
  const guide = put(sc, "guide", doc(0.5, 0.6, 3, "soft"), { at: [2.7, -0.4, 0] });
  const scanner = put(sc, "scanner", ring(0.45, 14, "soft", "x"), { at: [-2.8, -1.7, 0] });
  sc.mesh.labels = [L([P[0], P[1] + 1.75, 0], "Chemotherapy suite: anticipatory anxiety"), L([1.4, 1.85, 0], "Guided imagery redirects attention from threat"), L([1.6, -2.25, 0], "Anxiety and anticipatory nausea fall; small to moderate effects"), L([-2.4, -2.3, 0], "Free recordings; helps with claustrophobia in scanners")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...breath, scenePanel, sun, ...waves, anx0, anx1, nau0, nau1, ...phones, guide, scanner);
    setAlpha(alpha, chair, 0.6); setAlpha(alpha, back, 0.6);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, bag, 1); tense.forEach((tn, i) => { setAlpha(alpha, tn, clamp(u * 2 - 0.2 * i) * (0.5 + 0.5 * pulse(t, 6 + i))); movePart(pts, base, tn, [0.04 * Math.sin(t * TAU * 8 + i), 0.04 * Math.cos(t * TAU * 8 + i), 0], 1); }); return { caption: "1 · Waiting for chemotherapy or radiotherapy, the body braces: muscles tighten, breathing shortens and anticipatory nausea and anxiety build before anything is given" }; }
    if (s === 1) { const u = Q(t, 1); tense.forEach((tn) => setAlpha(alpha, tn, 0.8 * (1 - u))); breath.forEach((b, i) => { const v = (t * 1.5 + i / 3) % 1; setAlpha(alpha, b, clamp(u * 2) * (1 - v) * 0.8); movePart(pts, base, b, [0, 0, 0], 0.6 + 0.8 * v); }); return { caption: "2 · Progressive muscle relaxation deliberately releases each muscle group and diaphragmatic breathing slows the breath, engaging the parasympathetic system and interrupting the anticipatory cycle" }; }
    if (s === 2) { const u = Q(t, 2); tense.forEach((tn) => setAlpha(alpha, tn, 0)); breath.forEach((b, i) => { const v = (t * 1.5 + i / 3) % 1; setAlpha(alpha, b, (1 - v) * 0.6); movePart(pts, base, b, [0, 0, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, scenePanel, clamp(u * 2) * 0.8); setAlpha(alpha, sun, clamp(u * 2 - 0.3)); waves.forEach((w, i) => { setAlpha(alpha, w, clamp(u * 2 - 0.5 - 0.2 * i)); movePart(pts, base, w, [0.1 * Math.sin(t * TAU * 2 + i), 0, 0], 1); }); grow(alpha, anx0, clamp(u * 2 - 0.5)); grow(alpha, anx1, clamp(u * 2 - 0.8)); grow(alpha, nau0, clamp(u * 2 - 1)); grow(alpha, nau1, clamp(u * 2 - 1.2)); return { caption: "3 · Guided imagery adds a scene to hold in mind, redirecting attention away from threat; dozens of small randomised trials show consistent reductions in anxiety, anticipatory nausea and treatment distress, with some gain in sleep and pain" }; }
    const u = Q(t, 3); tense.forEach((tn) => setAlpha(alpha, tn, 0)); breath.forEach((b, i) => { const v = (t * 1.5 + i / 3) % 1; setAlpha(alpha, b, (1 - v) * 0.6); movePart(pts, base, b, [0, 0, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, scenePanel, 0.8); setAlpha(alpha, sun, 1); waves.forEach((w, i) => { setAlpha(alpha, w, 1); movePart(pts, base, w, [0.1 * Math.sin(t * TAU * 2 + i), 0, 0], 1); }); show(alpha, 1, anx0, anx1, nau0, nau1);
    phones.forEach((p) => setAlpha(alpha, p, clamp(u * 2))); setAlpha(alpha, guide, clamp(u * 2 - 0.4)); setAlpha(alpha, scanner, clamp(u * 2 - 0.8));
    return { caption: "4 · Effects are small to moderate and the trials are unblinded and often decades old; the 2023 SIO-ASCO guideline says relaxation may be offered for anxiety during treatment and the 2022 pain guideline lists imagery with muscle relaxation, and free recordings fit easily into a chemotherapy suite" };
  });
}

// ---------------------------------------------------------------- 82. UNI and CONCH
export function uniConch(): Mesh {
  const sc = scene();
  const tiles: Part[] = []; for (let i = 0; i < 6; i++) tiles.push(put(sc, `tl${i}`, quad(0.28, 0.28, "hot"), { at: [-2.7 + 0.34 * i, 1.5, 0] }));
  const uni = put(sc, "uni", model(1.3, 0.9, "accent"), { at: [-1.7, 0.2, 0] });
  const uniLock = put(sc, "uniLock", box(0.35, 0.25, 0.15, "accent", true), { at: [-2.6, -0.5, 0] });
  const uniArc = put(sc, "uniArc", polyline([[-2.72, -0.38, 0], [-2.72, -0.18, 0], [-2.48, -0.18, 0], [-2.48, -0.38, 0]], "accent"), { at: [0.1, 0.04, 0], rotZ: 0.4 });
  const img = put(sc, "img", quad(0.7, 0.55, "hot"), { at: [0.6, 1.5, 0] });
  const cap = put(sc, "cap", doc(0.9, 0.45, 2, "soft"), { at: [1.9, 1.5, 0] });
  const towerI = put(sc, "towerI", box(0.5, 0.7, 0.3, "accent", true), { at: [0.6, 0.4, 0] });
  const towerT = put(sc, "towerT", box(0.5, 0.7, 0.3, "accent", true), { at: [1.9, 0.4, 0] });
  const embI = put(sc, "embI", mote(0.08, "hot"), { at: [0.6, -0.3, 0] });
  const embT = put(sc, "embT", mote(0.08, "soft"), { at: [1.9, -0.3, 0] });
  const joined = put(sc, "joined", ring(0.25, 10, "accent", "z"), { at: [1.25, -0.5, 0.05] });
  const zeroShot = put(sc, "zeroShot", doc(0.5, 0.5, 2, "accent"), { at: [2.7, -0.4, 0] });
  const zsOk = put(sc, "zsOk", tick([2.85, -0.45, 0.05], 0.14));
  const slideVec = put(sc, "slideVec", bar(-0.2, 0.9, 0.2, "accent"), { at: [0, -2.3, 0] });
  const agg: Part[] = []; for (let i = 0; i < 3; i++) agg.push(put(sc, `ag${i}`, arrow([-1.5 + 0.2 * i, -1.2, 0], [-0.3, -1.9, 0], "soft", 0.08)));
  const licence = put(sc, "licence", doc(0.5, 0.6, 3, "soft"), { at: [1.4, -1.8, 0] });
  const licX = put(sc, "licX", cross([1.75, -1.6, 0.05], 0.12));
  const validQ = put(sc, "validQ", ring(0.35, 10, "hot", "z"), { at: [2.5, -1.8, 0.05] });
  sc.mesh.labels = [L([-1.7, 2.0, 0], "UNI: DINOv2 on 100 million tiles from 100,000 slides"), L([1.25, 2.0, 0], "CONCH: 1.17 million image-caption pairs, contrastive alignment"), L([1.9, -1.0, 0], "Zero-shot classification, image or text retrieval"), L([0.6, -2.55, 0], "Open weights, non-commercial licence; tile-level, so slides need aggregation")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, uniLock, uniArc, img, cap, towerI, towerT, embI, embT, joined, zeroShot, zsOk, slideVec, ...agg, licence, licX, validQ);
    setAlpha(alpha, uni, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); tiles.forEach((p, i) => { setAlpha(alpha, p, clamp(u * 2 - 0.1 * i)); moveTo(pts, base, p, [-2.7 + 0.34 * i, 1.5, 0], [-1.7 - 0.4 + 0.16 * i, 0.2 + 0.2 - 0.4 * (i % 2), 0.3], clamp(u * 2 - 1 - 0.05 * i)); }); setAlpha(alpha, uni, 0.5 + 0.5 * clamp(u * 2 - 1) * pulse(t, 5)); return { caption: "1 · UNI is a vision encoder that learns what tissue looks like: DINOv2 self-supervision on 100 million tiles from 100,000 slides (Nature Medicine 2024), scaled further as UNI2-h" }; }
    if (s === 1) { const u = Q(t, 1); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.7 + 0.34 * i, 1.5, 0], [-1.7 - 0.4 + 0.16 * i, 0.2 + 0.2 - 0.4 * (i % 2), 0.3], 1); }); setAlpha(alpha, uni, 1); setAlpha(alpha, img, clamp(u * 2)); setAlpha(alpha, cap, clamp(u * 2 - 0.2)); setAlpha(alpha, towerI, clamp(u * 2 - 0.5)); setAlpha(alpha, towerT, clamp(u * 2 - 0.5)); setAlpha(alpha, embI, clamp(u * 2 - 0.8)); setAlpha(alpha, embT, clamp(u * 2 - 0.8)); const pull = clamp(u * 2 - 1); moveTo(pts, base, embI, [0.6, -0.3, 0], [1.2, -0.5, 0], pull); moveTo(pts, base, embT, [1.9, -0.3, 0], [1.3, -0.5, 0], pull); return { caption: "2 · CONCH learns what pathologists say about tissue: 1.17 million image-caption pairs are pushed together in one space by contrastive alignment of an image tower and a text tower" }; }
    if (s === 2) { const u = Q(t, 2); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.7 + 0.34 * i, 1.5, 0], [-1.7 - 0.4 + 0.16 * i, 0.2 + 0.2 - 0.4 * (i % 2), 0.3], 1); }); setAlpha(alpha, uni, 1); show(alpha, 1, img, cap, towerI, towerT, embI, embT); moveTo(pts, base, embI, [0.6, -0.3, 0], [1.2, -0.5, 0], 1); moveTo(pts, base, embT, [1.9, -0.3, 0], [1.3, -0.5, 0], 1); setAlpha(alpha, joined, clamp(u * 2) * 0.7); setAlpha(alpha, zeroShot, clamp(u * 2 - 0.5)); setAlpha(alpha, zsOk, clamp(u * 2 - 0.9) * (0.6 + 0.4 * pulse(t, 4))); show(alpha, clamp(u * 2 - 0.7), uniLock, uniArc); return { caption: "3 · Because images and text share a space, CONCH classifies zero-shot and retrieves images from text or text from images without task-specific training; both models are widely used as reproducible baselines for subtyping, biomarker prediction and prognosis" }; }
    const u = Q(t, 3); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.7 + 0.34 * i, 1.5, 0], [-1.7 - 0.4 + 0.16 * i, 0.2 + 0.2 - 0.4 * (i % 2), 0.3], 1); }); setAlpha(alpha, uni, 1); show(alpha, 1, img, cap, towerI, towerT, embI, embT, zeroShot, zsOk, uniLock, uniArc); moveTo(pts, base, embI, [0.6, -0.3, 0], [1.2, -0.5, 0], 1); moveTo(pts, base, embT, [1.9, -0.3, 0], [1.3, -0.5, 0], 1); setAlpha(alpha, joined, 0.7);
    cascade(alpha, agg, clamp(u * 2)); grow(alpha, slideVec, clamp(u * 2 - 0.5)); setAlpha(alpha, licence, clamp(u * 2 - 0.6)); setAlpha(alpha, licX, clamp(u * 2 - 0.9)); setAlpha(alpha, validQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Weights are open under a non-commercial licence; both work at tile level, so slide-level decisions need an aggregation step, and clinical validation is task by task" };
  });
}

// ---------------------------------------------------------------- 83. aromatherapy
export function aromatherapy(): Mesh {
  const sc = scene();
  const bottle = put(sc, "bottle", vial(0.18, 0.55, "accent"), { at: [-2.6, 0.9, 0] });
  const diffuser = put(sc, "diffuser", cone(0.35, 0.6, 10, "soft", false), { at: [-1.5, -0.3, 0] });
  const scent: Part[] = []; for (let i = 0; i < 4; i++) scent.push(put(sc, `sc${i}`, ring(0.1, 6, "accent", "y"), { at: [-1.5, 0.1, 0] }));
  const HEAD: Vec3 = [0.6, 0.7, 0];
  const head = put(sc, "head", organ(0.6, 0.72, 0.55), { at: HEAD });
  const nose = put(sc, "nose", polyline([[HEAD[0] - 0.6, HEAD[1] - 0.1, 0], [HEAD[0] - 0.75, HEAD[1] - 0.3, 0], [HEAD[0] - 0.55, HEAD[1] - 0.32, 0]], "soft"));
  const limbic = put(sc, "limbic", blob(0.16, "accent"), { at: [HEAD[0] + 0.05, HEAD[1] + 0.05, 0.3] });
  const massage = put(sc, "massage", hand("accent"), { at: [2.3, 1.0, 0], scale: 0.7, rotX: -Math.PI / 2 });
  const bodyP = put(sc, "body", organ(0.9, 0.3, 0.35, "soft"), { at: [2.3, 0.4, 0] });
  const m0 = put(sc, "m0", bar(1.9, 0.8, 0.25, "soft"), { at: [0, -2.1, 0] });
  const m1 = put(sc, "m1", bar(2.3, 0.82, 0.25, "accent"), { at: [0, -2.1, 0] });
  const eq = put(sc, "eq", line([1.9, -1.1, 0.05], [2.3, -1.1, 0.05], "hot"));
  const skin = put(sc, "skin", quad(0.8, 0.5, "soft"), { at: [-0.4, -1.6, 0] });
  const rash = put(sc, "rash", cloud(6, 0.22, "hot", 3), { at: [-0.4, -1.6, 0.03] });
  const rt = put(sc, "rt", beam([-1.4, -1.0, 0], [-0.6, -1.4, 0], 0.15, "soft"));
  const drink = put(sc, "drink", cylinder(0.14, 0.35, 8, 2, "soft", true, true), { at: [-2.5, -1.6, 0] });
  const drinkX = put(sc, "drinkX", cross([-2.5, -1.6, 0.15], 0.22));
  sc.mesh.labels = [L([-2.0, 1.6, 0], "Essential oils by inhalation or in massage oil"), L([HEAD[0], HEAD[1] + 1.05, 0], "Olfactory system and limbic structures"), L([2.1, -2.45, 0], "Cochrane 2016: aromatherapy adds nothing to massage alone"), L([-1.4, -2.25, 0], "Contact dermatitis, irritation of irradiated skin; never ingest")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, limbic, massage, bodyP, m0, m1, eq, skin, rash, rt, drink, drinkX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, bottle, 1); moveTo(pts, base, bottle, [-2.6, 0.9, 0], [-1.5, 0.35, 0], clamp(u * 1.5)); setAlpha(alpha, diffuser, 1); scent.forEach((p, i) => { const v = (t * 2 + i / 4) % 1; setAlpha(alpha, p, clamp(u * 2 - 1) * (1 - v)); movePart(pts, base, p, [1.1 * v, 0.5 * v + 0.15 * Math.sin(v * 6 + i), 0], 1 + v); }); return { caption: "1 · A few drops of essential oil, lavender, peppermint or ginger, go into a diffuser or a massage oil in a chemotherapy suite or hospice" }; }
    if (s === 1) { const u = Q(t, 1); moveTo(pts, base, bottle, [-2.6, 0.9, 0], [-1.5, 0.35, 0], 1); scent.forEach((p, i) => { const v = (t * 2 + i / 4) % 1; setAlpha(alpha, p, 1 - v); movePart(pts, base, p, [1.1 * v, 0.5 * v + 0.15 * Math.sin(v * 6 + i), 0], 1 + v); }); setAlpha(alpha, head, 1); setAlpha(alpha, limbic, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "2 · Odour molecules act on the olfactory system and the limbic structures involved in emotion and nausea; any effect beyond pleasantness and expectation is unproven" }; }
    if (s === 2) { const u = Q(t, 2); moveTo(pts, base, bottle, [-2.6, 0.9, 0], [-1.5, 0.35, 0], 1); scent.forEach((p, i) => { const v = (t * 2 + i / 4) % 1; setAlpha(alpha, p, 0.6 * (1 - v)); movePart(pts, base, p, [1.1 * v, 0.5 * v + 0.15 * Math.sin(v * 6 + i), 0], 1 + v); }); setAlpha(alpha, limbic, 0.7); setAlpha(alpha, bodyP, clamp(u * 2)); setAlpha(alpha, massage, clamp(u * 2)); movePart(pts, base, massage, [0.3 * Math.sin(t * TAU * 3), 0, 0], 1); grow(alpha, m0, clamp(u * 2 - 0.4)); grow(alpha, m1, clamp(u * 2 - 0.7)); setAlpha(alpha, eq, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · The NCI PDQ summary and a 2016 Cochrane review found low-quality evidence of short-term relief of anxiety, depression and pain, and no evidence that aromatherapy adds anything to the effect of massage alone; inhaled ginger or peppermint for nausea gave mixed results" }; }
    const u = Q(t, 3); moveTo(pts, base, bottle, [-2.6, 0.9, 0], [-1.5, 0.35, 0], 1); scent.forEach((p, i) => { const v = (t * 2 + i / 4) % 1; setAlpha(alpha, p, 0.6 * (1 - v)); movePart(pts, base, p, [1.1 * v, 0.5 * v + 0.15 * Math.sin(v * 6 + i), 0], 1 + v); }); setAlpha(alpha, limbic, 0.7); setAlpha(alpha, bodyP, 1); setAlpha(alpha, massage, 1); movePart(pts, base, massage, [0.3 * Math.sin(t * TAU * 3), 0, 0], 1); show(alpha, 1, m0, m1); setAlpha(alpha, eq, 0.8);
    setAlpha(alpha, skin, clamp(u * 2)); setAlpha(alpha, rt, clamp(u * 2 - 0.3) * 0.6); setAlpha(alpha, rash, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, drink, clamp(u * 2 - 0.8)); setAlpha(alpha, drinkX, clamp(u * 2 - 1));
    return { caption: "4 · Oils on the skin can cause contact dermatitis and undiluted tea tree or citrus oils irritate irradiated skin, and ingesting essential oils is unsafe; as a cheap comfort measure it is reasonable, as a treatment it is unproven" };
  });
}

// ---------------------------------------------------------------- 84. bacteriophage-based tumour delivery
export function phageDelivery(): Mesh {
  const sc = scene();
  const PH: Vec3 = [-2.2, 1.0, 0];
  const headP = put(sc, "head", octahedron(0.38, "accent", true), { at: PH });
  const tail = put(sc, "tail", line([PH[0], PH[1] - 0.38, 0], [PH[0], PH[1] - 1.1, 0], "accent"));
  const legs: Part[] = []; for (let i = 0; i < 4; i++) legs.push(put(sc, `lg${i}`, line([PH[0], PH[1] - 1.1, 0], [PH[0] - 0.3 + 0.2 * i, PH[1] - 1.4, 0.05 * (i % 2)], "accent")));
  const peps: Part[] = []; for (let i = 0; i < 5; i++) peps.push(put(sc, `pp${i}`, mote(0.06, "hot"), { at: [PH[0] + 0.42 * Math.cos(i * 1.26 + 0.6), PH[1] + 0.42 * Math.sin(i * 1.26 + 0.6), 0.1] }));
  const payload = put(sc, "payload", mote(0.1, "hot"), { at: [PH[0], PH[1], 0.15] });
  const BAC: Vec3 = [-0.3, 1.3, 0];
  const bact = put(sc, "bact", ellipsoid(0.35, 0.16, 0.16, 3, 8, "soft", true), { at: BAC });
  const HUM: Vec3 = [-0.3, -0.6, 0];
  const human = put(sc, "human", cell(0.5, "soft"), { at: HUM });
  const noInf = put(sc, "noInf", cross([HUM[0], HUM[1], 0.5], 0.3, "accent"));
  const TUM: Vec3 = [1.8, 0.4, 0];
  const tum = put(sc, "tum", blob(0.6, "hot"), { at: TUM });
  const ab = put(sc, "ab", polyline([[-0.25, -0.3, 0], [0, 0, 0], [0.25, -0.3, 0], [0, 0, 0], [0, 0.35, 0]], "accent"), { at: [2.6, 1.7, 0] });
  const abOk = put(sc, "abOk", tick([2.95, 1.9, 0.05], 0.14));
  const liver = put(sc, "liver", organ(0.5, 0.35, 0.28), { at: [-2.0, -1.6, 0] });
  const clear: Part[] = []; for (let i = 0; i < 3; i++) clear.push(put(sc, `cl${i}`, mote(0.05, "accent"), { at: [-1.3 + 0.2 * i, -1.2, 0.1] }));
  const antiAb = put(sc, "antiAb", polyline([[-0.2, -0.25, 0], [0, 0, 0], [0.2, -0.25, 0], [0, 0, 0], [0, 0.3, 0]], "hot"), { at: [0.6, -1.6, 0], scale: 0.8 });
  const noTrial = put(sc, "noTrial", cross([2.3, -1.6, 0.05], 0.2));
  const trialDoc = put(sc, "trialDoc", doc(0.5, 0.6, 3, "soft"), { at: [2.3, -1.6, 0] });
  sc.mesh.labels = [L([PH[0], PH[1] + 0.85, 0], "Phage capsid displaying tumour-homing peptides or antigens"), L([-0.3, -1.35, 0], "Infects bacteria, never human cells"), L([2.6, 2.2, 0], "Phage display already underpins approved antibodies"), L([0.8, -2.3, 0], "Rapid clearance, anti-phage antibodies, limited payload; no efficacy trial by 2026")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, noInf, tum, ab, abOk, liver, ...clear, antiAb, noTrial, trialDoc);
    setAlpha(alpha, human, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, headP, 1); setAlpha(alpha, tail, 1); legs.forEach((l) => setAlpha(alpha, l, 1)); peps.forEach((p, i) => setAlpha(alpha, p, clamp(u * 2 - 0.2 * i) * (0.6 + 0.4 * pulse(t, 4)))); setAlpha(alpha, payload, clamp(u * 2 - 1)); setAlpha(alpha, bact, 0.5); return { caption: "1 · A bacteriophage is a virus that infects bacteria; its coat proteins can be engineered to display tumour-homing peptides or antigens and its capsid can carry a payload, all cheaply manufactured" }; }
    if (s === 1) { const u = Q(t, 1); peps.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, payload, 1); setAlpha(alpha, bact, 1); const to: Vec3 = [BAC[0] - 0.5, BAC[1], 0]; [headP, tail, ...legs, ...peps, payload].forEach((p) => moveTo(pts, base, p, PH, [PH[0] + (to[0] - PH[0]) * clamp(u * 1.5) * 0.4, PH[1] + (to[1] - PH[1]) * clamp(u * 1.5) * 0.4, 0], 1, 0.6)); setAlpha(alpha, human, 1); setAlpha(alpha, noInf, clamp(u * 2 - 0.8) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "2 · Because phage have no tropism for human cells there is no productive infection: they are cleared by the reticuloendothelial system rather than replicating in the patient" }; }
    if (s === 2) { const u = Q(t, 2); peps.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, payload, 1); setAlpha(alpha, bact, 0.5); [headP, tail, ...legs, ...peps, payload].forEach((p) => moveTo(pts, base, p, PH, [TUM[0] - 0.75, TUM[1] + 0.3, 0.2], clamp(u * 1.5), 0.6)); setAlpha(alpha, human, 1); setAlpha(alpha, noInf, 0.7); setAlpha(alpha, tum, clamp(u * 2)); setAlpha(alpha, ab, clamp(u * 2 - 0.5)); setAlpha(alpha, abOk, clamp(u * 2 - 0.8)); return { caption: "3 · Homing peptides steer the particle to tumour markers, with interest in phage-displayed neoantigen vaccines and in phage that target intratumoural bacteria; phage display itself already underpins several approved antibodies" }; }
    const u = Q(t, 3); peps.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, payload, 1); setAlpha(alpha, bact, 0.5); [headP, tail, ...legs, ...peps, payload].forEach((p) => moveTo(pts, base, p, PH, [TUM[0] - 0.75, TUM[1] + 0.3, 0.2], 1, 0.6)); setAlpha(alpha, human, 1); setAlpha(alpha, noInf, 0.7); setAlpha(alpha, tum, 1); setAlpha(alpha, ab, 1); setAlpha(alpha, abOk, 1);
    setAlpha(alpha, liver, clamp(u * 2)); clear.forEach((c, i) => { setAlpha(alpha, c, clamp(u * 2 - 0.2 * i)); moveTo(pts, base, c, [-1.3 + 0.2 * i, -1.2, 0.1], [-2.0, -1.6, 0.2], clamp(u * 2 - 0.3 - 0.2 * i)); }); setAlpha(alpha, antiAb, clamp(u * 2 - 0.6)); setAlpha(alpha, trialDoc, clamp(u * 2 - 0.8)); setAlpha(alpha, noTrial, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · The work in oncology is preclinical: particles are cleared rapidly, anti-phage antibodies build, payload capacity is limited, and no oncology phage-therapy trial had reported efficacy by 2026" };
  });
}

// ---------------------------------------------------------------- 85. BioEmu
export function bioemu(): Mesh {
  const sc = scene();
  const P0: Vec3 = [-1.8, 0.4, 0];
  const prot = put(sc, "prot", protein(0.8, "soft"), { at: P0 });
  const ghosts: Part[] = []; for (let i = 0; i < 3; i++) ghosts.push(put(sc, `gh${i}`, protein(0.8, "accent"), { at: [P0[0] + 0.15 * (i - 1), P0[1] + 0.1 * (i - 1), -0.1 * i] }));
  const staticRing = put(sc, "static", ring(1.0, 16, "soft", "z"), { at: P0 });
  const staticX = put(sc, "staticX", cross([P0[0] + 1.0, P0[1] + 0.9, 0.05], 0.15));
  const md = put(sc, "md", screen(1.0, 0.7, "soft"), { at: [1.2, 1.5, 0] });
  const mdClock = put(sc, "mdClock", clockFace(0.25), { at: [2.2, 1.5, 0] });
  const emu = put(sc, "emu", model(1.1, 0.8, "accent"), { at: [1.2, 0.1, 0] });
  const speed = put(sc, "speed", bar(2.3, 1.3, 0.22, "soft"), { at: [0, -0.6, 0] });
  const speed2 = put(sc, "speed2", bar(2.7, 0.1, 0.22, "accent"), { at: [0, -0.6, 0] });
  const AX: Vec3 = [-2.9, -2.3, 0];
  const energy = put(sc, "energy", axes(AX, 2.2, 1.3));
  const landscape = put(sc, "landscape", polyline([[AX[0] + 0.1, AX[1] + 0.9, 0], [AX[0] + 0.5, AX[1] + 0.3, 0], [AX[0] + 0.9, AX[1] + 0.8, 0], [AX[0] + 1.3, AX[1] + 0.2, 0], [AX[0] + 1.7, AX[1] + 0.7, 0], [AX[0] + 2.1, AX[1] + 0.4, 0]], "accent"));
  const pocket = put(sc, "pocket", ring(0.22, 10, "hot", "z"), { at: [P0[0] + 0.35, P0[1] - 0.3, 0.5] });
  const lig = put(sc, "lig", octahedron(0.1, "hot", true), { at: [0.2, -1.6, 0] });
  const smallOnly = put(sc, "smallOnly", protein(0.25, "soft"), { at: [1.3, -1.7, 0] });
  const bigX = put(sc, "bigX", cross([2.4, -1.7, 0.05], 0.22));
  const big = put(sc, "big", protein(0.5, "soft"), { at: [2.4, -1.7, 0] });
  sc.mesh.labels = [L([P0[0], P0[1] + 1.35, 0], "A protein moves between many shapes; static prediction gives one"), L([1.7, 2.05, 0], "Molecular dynamics: slow"), L([2.5, -0.95, 0], "BioEmu: thousands of times faster (Science 2025)"), L([-1.8, -2.65, 0], "Ensemble and folding free energies; cryptic pocket in KRAS")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...ghosts, staticX, md, mdClock, speed, speed2, energy, landscape, pocket, lig, smallOnly, bigX, big);
    setAlpha(alpha, emu, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, staticRing, 0.5); for (let i = prot.p0; i < prot.p1; i++) { const p = base[i]; pts[i] = [p[0] + 0.08 * Math.sin(t * TAU * 3 + p[1] * 5) * u, p[1] + 0.08 * Math.cos(t * TAU * 2 + p[0] * 5) * u, p[2]]; } setAlpha(alpha, staticX, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "1 · A protein is not one shape but an equilibrium ensemble of shapes it moves between; static structure predictors return a single snapshot" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, staticRing, 0.3); setAlpha(alpha, staticX, 0.6); for (let i = prot.p0; i < prot.p1; i++) { const p = base[i]; pts[i] = [p[0] + 0.08 * Math.sin(t * TAU * 3 + p[1] * 5), p[1] + 0.08 * Math.cos(t * TAU * 2 + p[0] * 5), p[2]]; } setAlpha(alpha, md, clamp(u * 2)); setAlpha(alpha, mdClock, clamp(u * 2 - 0.3)); movePart(pts, base, mdClock, [0, 0, 0], 1, t * TAU * 2); grow(alpha, speed, clamp(u * 2 - 0.5)); return { caption: "2 · Molecular dynamics simulation can sample that ensemble but is slow; BioEmu, a generative diffusion model from Microsoft Research, was trained on simulations and experimental data to emulate it" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, staticRing, 0.3); setAlpha(alpha, staticX, 0.6); for (let i = prot.p0; i < prot.p1; i++) { const p = base[i]; pts[i] = [p[0] + 0.08 * Math.sin(t * TAU * 3 + p[1] * 5), p[1] + 0.08 * Math.cos(t * TAU * 2 + p[0] * 5), p[2]]; } setAlpha(alpha, md, 1); setAlpha(alpha, mdClock, 1); movePart(pts, base, mdClock, [0, 0, 0], 1, t * TAU * 2); setAlpha(alpha, speed, 1); setAlpha(alpha, emu, 0.5 + 0.5 * u * pulse(t, 5)); ghosts.forEach((g, i) => { setAlpha(alpha, g, clamp(u * 2 - 0.3 * i) * 0.4); movePart(pts, base, g, [0.1 * Math.sin(t * TAU * 2 + i * 2), 0.1 * Math.cos(t * TAU * 1.5 + i), 0], 1 + 0.08 * i); }); grow(alpha, speed2, clamp(u * 2 - 0.5)); setAlpha(alpha, energy, clamp(u * 2 - 0.6)); grow(alpha, landscape, clamp(u * 2 - 0.8)); return { caption: "3 · It samples conformational ensembles and estimates folding free energies thousands of times faster than simulation (Science 2025)" }; }
    const u = Q(t, 3); setAlpha(alpha, staticRing, 0.3); setAlpha(alpha, staticX, 0.6); for (let i = prot.p0; i < prot.p1; i++) { const p = base[i]; pts[i] = [p[0] + 0.08 * Math.sin(t * TAU * 3 + p[1] * 5), p[1] + 0.08 * Math.cos(t * TAU * 2 + p[0] * 5), p[2]]; } setAlpha(alpha, md, 1); setAlpha(alpha, mdClock, 1); movePart(pts, base, mdClock, [0, 0, 0], 1, t * TAU * 2); show(alpha, 1, speed, speed2, energy, landscape); setAlpha(alpha, emu, 1); ghosts.forEach((g, i) => { setAlpha(alpha, g, 0.4); movePart(pts, base, g, [0.1 * Math.sin(t * TAU * 2 + i * 2), 0.1 * Math.cos(t * TAU * 1.5 + i), 0], 1 + 0.08 * i); });
    setAlpha(alpha, pocket, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); movePart(pts, base, pocket, [0, 0, 0], 0.3 + 0.7 * clamp(u * 2)); setAlpha(alpha, lig, clamp(u * 2 - 0.4)); moveTo(pts, base, lig, [0.2, -1.6, 0], [P0[0] + 0.35, P0[1] - 0.3, 0.55], clamp(u * 2 - 0.5)); setAlpha(alpha, smallOnly, clamp(u * 2 - 0.8)); setAlpha(alpha, big, clamp(u * 2 - 1) * 0.5); setAlpha(alpha, bigX, clamp(u * 2 - 1.2));
    return { caption: "4 · For cancer drug discovery that matters for cryptic pockets that open only transiently, as in KRAS, invisible to static predictors; predictions are approximate and the published work is on small proteins, so large complexes and membrane proteins remain beyond validated use" };
  });
}

// ---------------------------------------------------------------- 86. Cell2Sentence / C2S-Scale
export function cell2Sentence(): Mesh {
  const sc = scene();
  const CELL: Vec3 = [-2.4, 1.0, 0];
  const c = put(sc, "cell", cell(0.55, "soft"), { at: CELL });
  put(sc, "nuc", sphere(0.2, 3, 8, "soft"), { at: CELL });
  const words: Part[] = []; const WL = [0.5, 0.4, 0.55, 0.35, 0.45, 0.4];
  let x = -1.5; WL.forEach((w, i) => { words.push(put(sc, `w${i}`, line([x, 1.0, 0], [x + w, 1.0, 0], i < 2 ? "hot" : "accent"))); x += w + 0.12; });
  const llm = put(sc, "llm", model(1.6, 1.2, "accent"), { at: [0.2, -0.6, 0] });
  const prompt = put(sc, "prompt", doc(0.8, 0.45, 2, "soft"), { at: [-2.2, -0.6, 0] });
  const hyp = put(sc, "hyp", doc(0.9, 0.7, 3, "accent"), { at: [2.2, -0.2, 0] });
  const drug = put(sc, "drug", capsule(1.0, "hot"), { at: [2.2, 0.55, 0.05] });
  const DISH: Vec3 = [2.2, -1.8, 0];
  const dish = put(sc, "dish", cylinder(0.55, 0.12, 12, 2, "soft", true, true), { at: DISH });
  const dCell = put(sc, "dCell", blob(0.16, "soft"), { at: [DISH[0], DISH[1] + 0.12, 0.1] });
  const mhc: Part[] = []; for (let i = 0; i < 4; i++) mhc.push(put(sc, `mhc${i}`, line([DISH[0] + 0.16 * Math.cos(i * 1.57), DISH[1] + 0.12 + 0.16 * Math.sin(i * 1.57), 0.12], [DISH[0] + 0.3 * Math.cos(i * 1.57), DISH[1] + 0.12 + 0.3 * Math.sin(i * 1.57), 0.12], "accent")));
  const ok = put(sc, "ok", tick([DISH[0] + 0.7, DISH[1] + 0.3, 0.05], 0.18));
  const mag = put(sc, "mag", bar(-2.6, 0.9, 0.2, "soft"), { at: [0, -2.4, 0] });
  const magX = put(sc, "magX", cross([-2.6, -1.9, 0.05], 0.18));
  const oneOnly = put(sc, "oneOnly", ring(0.3, 10, "hot", "z"), { at: [-1.6, -1.9, 0.05] });
  const oneLine = put(sc, "oneLine", line([-1.6, -2.1, 0.05], [-1.6, -1.7, 0.05], "hot"));
  sc.mesh.labels = [L([-0.4, 1.5, 0], "Gene names written in rank order of expression: a cell sentence"), L([0.2, 0.25, 0], "Gemma-based language model scaled to 27B parameters (2025)"), L([2.2, 1.05, 0], "Hypothesis: silmitasertib (CK2) boosts antigen presentation under low interferon"), L([-2.1, -2.7, 0], "Magnitudes discarded; one validated hypothesis so far")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, prompt, hyp, drug, dish, dCell, ...mhc, ok, mag, magX, oneOnly, oneLine);
    setAlpha(alpha, llm, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, c, 1); cascade(alpha, words, clamp(u * 1.5)); return { caption: "1 · A cell is turned into text: its gene names are written out in rank order of expression, so it reads like a sentence" }; }
    if (s === 1) { const u = Q(t, 1); words.forEach((w) => setAlpha(alpha, w, 1)); words.forEach((w, i) => moveTo(pts, base, w, [0, 0, 0], [0.2 - 1.5 + 0.3 * (i % 3) - (-1.5 + i * 0.55), -0.6 + 0.25 - 0.5 * Math.floor(i / 3) - 1.0, 0.3], clamp(u * 1.5 - 0.08 * i))); setAlpha(alpha, llm, 0.5 + 0.5 * u * pulse(t, 5)); setAlpha(alpha, prompt, clamp(u * 2 - 1)); return { caption: "2 · A standard language model can then be trained on cells and prompted about them in natural language; C2S-Scale from Yale and Google scaled Gemma-based models to 27B parameters on these sentences" }; }
    if (s === 2) { const u = Q(t, 2); words.forEach((w, i) => { setAlpha(alpha, w, 0.7); moveTo(pts, base, w, [0, 0, 0], [0.2 - 1.5 + 0.3 * (i % 3) - (-1.5 + i * 0.55), -0.6 + 0.25 - 0.5 * Math.floor(i / 3) - 1.0, 0.3], 1); }); setAlpha(alpha, llm, 1); setAlpha(alpha, prompt, 1); setAlpha(alpha, hyp, clamp(u * 2)); setAlpha(alpha, drug, clamp(u * 2 - 0.4)); setAlpha(alpha, dish, clamp(u * 2 - 0.7)); setAlpha(alpha, dCell, clamp(u * 2 - 0.8)); mhc.forEach((m, i) => setAlpha(alpha, m, clamp(u * 2 - 1 - 0.1 * i))); setAlpha(alpha, ok, clamp(u * 2 - 1.3) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · Its headline result: the model predicted that silmitasertib, a CK2 inhibitor, boosts antigen presentation under low interferon, and the prediction was confirmed in vitro, an early AI-generated hypothesis validated in the wet lab" }; }
    const u = Q(t, 3); words.forEach((w, i) => { setAlpha(alpha, w, 0.7); moveTo(pts, base, w, [0, 0, 0], [0.2 - 1.5 + 0.3 * (i % 3) - (-1.5 + i * 0.55), -0.6 + 0.25 - 0.5 * Math.floor(i / 3) - 1.0, 0.3], 1); }); setAlpha(alpha, llm, 1); show(alpha, 1, prompt, hyp, drug, dish, dCell, ...mhc); setAlpha(alpha, ok, 0.8);
    grow(alpha, mag, clamp(u * 2)); setAlpha(alpha, magX, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, oneOnly, clamp(u * 2 - 0.8)); setAlpha(alpha, oneLine, clamp(u * 2 - 0.8));
    return { caption: "4 · Text tokenisation is lossy because expression magnitudes are discarded, and only one hypothesis has been validated so far" };
  });
}

// ---------------------------------------------------------------- 87. laetrile (amygdalin, 'vitamin B17')
export function laetrile(): Mesh {
  const sc = scene();
  const kernel = put(sc, "kernel", ellipsoid(0.45, 0.65, 0.25, 4, 8, "accent", true), { at: [-2.4, 1.2, 0] });
  const pills: Part[] = []; for (let i = 0; i < 3; i++) pills.push(put(sc, `pl${i}`, capsule(0.9, "accent"), { at: [-1.3 + 0.35 * i, 1.4 - 0.25 * (i % 2), 0] }));
  const TUM: Vec3 = [1.6, 1.1, 0];
  const tum = put(sc, "tum", cell(0.55, "hot"), { at: TUM });
  const claim = put(sc, "claim", mote(0.08, "hot"), { at: [TUM[0], TUM[1], 0.3] });
  const claimX = put(sc, "claimX", cross([TUM[0], TUM[1], 0.5], 0.35));
  const gut = put(sc, "gut", tube(0.32, 3.0, "soft"), { at: [-0.6, -0.5, 0] });
  const bugs: Part[] = []; for (let i = 0; i < 4; i++) bugs.push(put(sc, `bg${i}`, ellipsoid(0.1, 0.05, 0.05, 3, 6, "soft", true), { at: [-1.6 + 0.6 * i, -0.5, 0.2] }));
  const cyan: Part[] = []; for (let i = 0; i < 8; i++) cyan.push(put(sc, `cy${i}`, mote(0.05, "hot"), { at: [-1.6 + 0.4 * (i % 4), -0.45, 0.25] }));
  const body = put(sc, "body", figure("soft"), { at: [2.4, -0.7, 0], scale: 0.8 });
  const skull = put(sc, "skull", polyline([[2.2, -1.9, 0], [2.6, -1.9, 0], [2.6, -2.2, 0], [2.2, -2.2, 0]], "hot", true));
  const nci = put(sc, "nci", doc(0.6, 0.7, 3, "soft"), { at: [-2.5, -1.7, 0] });
  const nciX = put(sc, "nciX", cross([-2.5, -1.7, 0.1], 0.28));
  const coch = put(sc, "coch", doc(0.5, 0.6, 3, "soft"), { at: [-1.5, -1.7, 0] });
  const cochX = put(sc, "cochX", cross([-1.5, -1.7, 0.1], 0.22));
  const ban = put(sc, "ban", ring(0.35, 12, "hot", "z"), { at: [-0.4, -1.7, 0.05] });
  const banBar = put(sc, "banBar", line([-0.65, -1.45, 0.06], [-0.15, -1.95, 0.06], "hot"));
  const web = put(sc, "web", screen(0.6, 0.4, "soft"), { at: [0.7, -1.75, 0] });
  sc.mesh.labels = [L([-1.9, 2.0, 0], "Apricot kernel amygdalin, sold as vitamin B17"), L([TUM[0], TUM[1] + 0.95, 0], "Claimed selective cyanide release in cancer cells: does not occur"), L([-0.6, -1.05, 0], "Gut bacteria hydrolyse it to hydrogen cyanide, systemically"), L([-0.7, -2.4, 0], "NCI 1982, 178 patients: no benefit, cyanide toxicity; Cochrane 2015: no trials; banned in US and EU")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, claimX, ...cyan, skull, nci, nciX, coch, cochX, ban, banBar, web);
    setAlpha(alpha, body, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, kernel, 1); pills.forEach((p, i) => setAlpha(alpha, p, clamp(u * 2 - 0.3 * i))); setAlpha(alpha, tum, 0.8); setAlpha(alpha, claim, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "1 · Amygdalin is a cyanogenic glycoside from apricot, peach and bitter almond kernels; laetrile is a semi-synthetic derivative that proponents claimed released cyanide selectively inside cancer cells" }; }
    if (s === 1) { const u = Q(t, 1); pills.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, claim, 0.6 * (1 - u)); setAlpha(alpha, claimX, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); pills.forEach((p, i) => moveTo(pts, base, p, [-1.3 + 0.35 * i, 1.4 - 0.25 * (i % 2), 0], [-1.8, -0.4, 0.2], clamp(u * 2 - 0.5 - 0.1 * i))); setAlpha(alpha, gut, 1); bugs.forEach((b) => setAlpha(alpha, b, 1)); return { caption: "2 · The selective release by beta-glucosidase in tumours does not occur; swallowed amygdalin reaches the gut, where bacteria hydrolyse it" }; }
    if (s === 2) { const u = Q(t, 2); pills.forEach((p, i) => { setAlpha(alpha, p, 0.4); moveTo(pts, base, p, [-1.3 + 0.35 * i, 1.4 - 0.25 * (i % 2), 0], [-1.8, -0.4, 0.2], 1); }); setAlpha(alpha, claimX, 0.7); setAlpha(alpha, claim, 0); setAlpha(alpha, gut, 1); cyan.forEach((c, i) => { const v = (t * 2.5 + i / 8) % 1; setAlpha(alpha, c, clamp(u * 2 - 0.1 * i) * (1 - 0.3 * v)); movePart(pts, base, c, [1.6 * v + 0.6 * Math.floor(i / 4) * v, 0.15 * v * Math.sin(i), 0], 1); }); setAlpha(alpha, body, 0.4 + 0.6 * clamp(u * 2 - 0.5)); setAlpha(alpha, skull, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · The product is hydrogen cyanide released systemically; with vitamin C or raw kernels the risk rises, and deaths and severe poisonings continue to be reported" }; }
    const u = Q(t, 3); pills.forEach((p, i) => { setAlpha(alpha, p, 0.4); moveTo(pts, base, p, [-1.3 + 0.35 * i, 1.4 - 0.25 * (i % 2), 0], [-1.8, -0.4, 0.2], 1); }); setAlpha(alpha, claimX, 0.7); setAlpha(alpha, claim, 0); setAlpha(alpha, gut, 1); cyan.forEach((c, i) => { const v = (t * 2.5 + i / 8) % 1; setAlpha(alpha, c, 0.7 * (1 - 0.3 * v)); movePart(pts, base, c, [1.6 * v + 0.6 * Math.floor(i / 4) * v, 0.15 * v * Math.sin(i), 0], 1); }); setAlpha(alpha, body, 1); setAlpha(alpha, skull, 0.8);
    setAlpha(alpha, nci, clamp(u * 2)); setAlpha(alpha, nciX, clamp(u * 2 - 0.3)); setAlpha(alpha, coch, clamp(u * 2 - 0.5)); setAlpha(alpha, cochX, clamp(u * 2 - 0.7)); setAlpha(alpha, ban, clamp(u * 2 - 0.9)); setAlpha(alpha, banBar, clamp(u * 2 - 0.9)); setAlpha(alpha, web, clamp(u * 2 - 1.1) * 0.7);
    return { caption: "4 · The 1982 NCI-sponsored study of 178 patients found no cure, stabilisation or symptom benefit and several cases of cyanide toxicity, and a 2015 Cochrane review found no controlled trials of benefit; it is banned for cancer in the US and EU yet still sold online, the archetype of the unproven cure" };
  });
}

// ---------------------------------------------------------------- 88. MedSAM / SAM-Med3D
export function medsam(): Mesh {
  const sc = scene();
  const SCAN: Vec3 = [-1.4, 0.4, 0];
  const scan = put(sc, "scan", quad(2.4, 1.9, "soft"), { at: SCAN });
  const bodyP = put(sc, "body", ellipsoid(0.9, 0.65, 0.03, 4, 12, "soft"), { at: [SCAN[0], SCAN[1], 0.02] });
  const organP = put(sc, "organ", ellipsoid(0.4, 0.28, 0.03, 3, 10, "soft"), { at: [SCAN[0] - 0.35, SCAN[1] + 0.1, 0.03] });
  const lesion = put(sc, "lesion", blob(0.2, "hot"), { at: [SCAN[0] + 0.3, SCAN[1] - 0.1, 0.05] });
  const cursor = put(sc, "cursor", polyline([[0, 0, 0], [0, -0.3, 0], [0.08, -0.22, 0], [0.2, -0.32, 0], [0.12, -0.16, 0], [0.22, -0.14, 0]], "accent", true), { at: [1.0, 1.6, 0.1] });
  const click = put(sc, "click", ring(0.12, 8, "accent", "z"), { at: [SCAN[0] + 0.3, SCAN[1] - 0.1, 0.1] });
  const contour = put(sc, "contour", ring(0.26, 14, "accent", "z"), { at: [SCAN[0] + 0.3, SCAN[1] - 0.1, 0.1] });
  const mod = put(sc, "model", model(1.1, 0.8, "accent"), { at: [1.6, 0.6, 0] });
  const pairs: Part[] = []; for (let i = 0; i < 4; i++) pairs.push(put(sc, `pr${i}`, quad(0.22, 0.22, i % 2 ? "hot" : "soft"), { at: [1.1 + 0.3 * i, 1.6, 0] }));
  const vol: Part[] = []; for (let i = 0; i < 4; i++) vol.push(put(sc, `vol${i}`, quad(0.7, 0.5, "soft"), { at: [2.4 + 0.08 * i, -0.9 - 0.12 * i, -0.06 * i] }));
  const volRing = put(sc, "volRing", ring(0.14, 10, "accent", "z"), { at: [2.5, -0.95, 0.05] });
  const rtBeam = put(sc, "rt", beam([-2.9, -1.6, 0], [SCAN[0] + 0.1, SCAN[1] - 0.3, 0], 0.15, "soft"));
  const ruler = put(sc, "ruler", ticks(SCAN[0] + 0.0, SCAN[0] + 0.6, SCAN[1] - 0.55, 3, "accent"));
  const tiny = put(sc, "tiny", mote(0.06, "hot"), { at: [SCAN[0] - 0.6, SCAN[1] - 0.5, 0.05] });
  const tinyRing = put(sc, "tinyRing", ring(0.16, 8, "hot", "z"), { at: [SCAN[0] - 0.55, SCAN[1] - 0.45, 0.1] });
  const handP = put(sc, "hand", hand("soft"), { at: [0.5, -1.8, 0], scale: 0.6 });
  sc.mesh.labels = [L([SCAN[0], SCAN[1] + 1.25, 0], "Any scan: a click or a box"), L([1.6, 1.95, 0], "Segment Anything fine-tuned on 1.5M image-mask pairs (Nature Communications 2024)"), L([2.5, -1.75, 0], "SAM-Med3D: volumes, not slices"), L([-1.4, -2.3, 0], "Radiotherapy contouring, response measurement; needs a prompt; small lesions blur")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, click, contour, ...pairs, ...vol, volRing, rtBeam, ruler, tiny, tinyRing, handP);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, scan, 1); setAlpha(alpha, lesion, 0.7); moveTo(pts, base, cursor, [1.0, 1.6, 0.1], [SCAN[0] + 0.3, SCAN[1] - 0.1, 0.12], clamp(u * 1.5)); setAlpha(alpha, click, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 6))); return { caption: "1 · Outlining a tumour by hand on every slice is slow and varies between readers; MedSAM asks only for a click or a box" }; }
    if (s === 1) { const u = Q(t, 1); moveTo(pts, base, cursor, [1.0, 1.6, 0.1], [SCAN[0] + 0.3, SCAN[1] - 0.1, 0.12], 1); setAlpha(alpha, click, 0.5); cascade(alpha, pairs, clamp(u * 1.5)); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); return { caption: "2 · Meta's Segment Anything model was fine-tuned on 1.5M image-mask pairs across imaging modalities, turning a general promptable segmenter into a medical one" }; }
    if (s === 2) { const u = Q(t, 2); moveTo(pts, base, cursor, [1.0, 1.6, 0.1], [SCAN[0] + 0.3, SCAN[1] - 0.1, 0.12], 1); setAlpha(alpha, click, 0.3); pairs.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, mod, 1); setAlpha(alpha, contour, clamp(u * 2) * (0.7 + 0.3 * pulse(t, 4))); movePart(pts, base, contour, [0, 0, 0], 0.4 + 0.6 * clamp(u * 2)); cascade(alpha, vol, clamp(u * 2 - 0.6)); setAlpha(alpha, volRing, clamp(u * 2 - 1)); return { caption: "3 · The outline of the tumour or organ appears at once; SAM-Med3D extends the approach from 2D slices to whole volumes" }; }
    const u = Q(t, 3); moveTo(pts, base, cursor, [1.0, 1.6, 0.1], [SCAN[0] + 0.3, SCAN[1] - 0.1, 0.12], 1); setAlpha(alpha, click, 0.3); pairs.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, mod, 1); setAlpha(alpha, contour, 1); vol.forEach((v) => setAlpha(alpha, v, 1)); setAlpha(alpha, volRing, 1);
    setAlpha(alpha, rtBeam, clamp(u * 2) * 0.6); setAlpha(alpha, ruler, clamp(u * 2 - 0.3)); setAlpha(alpha, handP, clamp(u * 2 - 0.5)); setAlpha(alpha, tiny, clamp(u * 2 - 0.7)); setAlpha(alpha, tinyRing, clamp(u * 2 - 0.9) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · It is used for radiotherapy contouring and measuring treatment response, but a person still has to point it in the right place, and boundary errors on small lesions remain a known weakness that matters for early or metastatic disease" };
  });
}

// ---------------------------------------------------------------- 89. reflexology
export function reflexology(): Mesh {
  const sc = scene();
  const FOOT: Vec3 = [-1.6, 0.2, 0];
  const foot = put(sc, "foot", ellipsoid(0.6, 1.3, 0.3, 5, 10, "soft", true), { at: FOOT });
  const toes: Part[] = []; for (let i = 0; i < 4; i++) toes.push(put(sc, `toe${i}`, mote(0.11, "soft"), { at: [FOOT[0] - 0.4 + 0.27 * i, FOOT[1] + 1.35, 0.1] }));
  const zones: Part[] = []; for (let i = 0; i < 3; i++) zones.push(put(sc, `zn${i}`, line([FOOT[0] - 0.55, FOOT[1] + 0.7 - 0.5 * i, 0.32], [FOOT[0] + 0.55, FOOT[1] + 0.7 - 0.5 * i, 0.32], "accent")));
  const zoneV = put(sc, "zoneV", line([FOOT[0], FOOT[1] + 1.2, 0.32], [FOOT[0], FOOT[1] - 1.1, 0.32], "accent"));
  const organs: Part[] = []; for (let i = 0; i < 3; i++) organs.push(put(sc, `og${i}`, organ(0.14, 0.1, 0.05, "accent"), { at: [FOOT[0] - 0.25 + 0.25 * i, FOOT[1] + 0.45 - 0.5 * i, 0.35] }));
  const mapX = put(sc, "mapX", cross([FOOT[0] + 0.9, FOOT[1] + 1.1, 0.1], 0.2));
  const thumb = put(sc, "thumb", hand("accent"), { at: [FOOT[0] + 0.1, FOOT[1] - 0.1, 0.55], scale: 0.6, rotX: -Math.PI / 2 });
  const press: Part[] = []; for (let i = 0; i < 2; i++) press.push(put(sc, `pr${i}`, ring(0.15 + 0.1 * i, 8, "accent", "z"), { at: [FOOT[0] + 0.1, FOOT[1] - 0.1, 0.4] }));
  const p0 = put(sc, "p0", bar(1.0, 1.0, 0.22, "hot"), { at: [0, -1.9, 0] });
  const p1 = put(sc, "p1", bar(1.35, 0.8, 0.22, "accent"), { at: [0, -1.9, 0] });
  const fm = put(sc, "fm", bar(1.7, 0.82, 0.22, "soft"), { at: [0, -1.9, 0] });
  const eq = put(sc, "eq", line([1.35, -0.9, 0.05], [1.7, -0.9, 0.05], "hot"));
  const guide = put(sc, "guide", doc(0.6, 0.7, 3, "soft"), { at: [2.4, 0.8, 0] });
  const weak = put(sc, "weak", ring(0.42, 12, "hot", "z"), { at: [2.4, 0.8, 0.05] });
  const dvt = put(sc, "dvt", blob(0.12, "hot"), { at: [FOOT[0] + 0.2, FOOT[1] - 0.8, 0.35] });
  const neuro = put(sc, "neuro", cloud(4, 0.15, "hot", 2), { at: [FOOT[0] - 0.2, FOOT[1] + 1.0, 0.36] });
  sc.mesh.labels = [L([FOOT[0], FOOT[1] + 1.85, 0], "Zone map said to correspond to organs: no anatomical basis"), L([FOOT[0], FOOT[1] - 1.65, 0], "In practice: a structured foot massage"), L([1.35, -2.25, 0], "Small short-term gains; no advantage over ordinary foot massage"), L([2.4, 1.45, 0], "SIO-ASCO 2022: weak option for pain, low certainty")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, mapX, thumb, ...press, p0, p1, fm, eq, guide, weak, dvt, neuro);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, foot, 1); toes.forEach((tp) => setAlpha(alpha, tp, 1)); cascade(alpha, zones, clamp(u * 1.5)); setAlpha(alpha, zoneV, clamp(u * 1.5 - 0.3)); cascade(alpha, organs, clamp(u * 2 - 0.6)); setAlpha(alpha, mapX, clamp(u * 2 - 1.2) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "1 · Reflexology applies pressure to zones on the feet or hands said to correspond to organs; the underlying map has no anatomical or physiological support" }; }
    if (s === 1) { const u = Q(t, 1); zones.forEach((z) => setAlpha(alpha, z, 0.4)); setAlpha(alpha, zoneV, 0.4); organs.forEach((o) => setAlpha(alpha, o, 0.4)); setAlpha(alpha, mapX, 0.7); setAlpha(alpha, thumb, clamp(u * 2)); movePart(pts, base, thumb, [0.25 * Math.sin(t * TAU * 3), 0.4 * Math.cos(t * TAU * 1.5), 0], 1); press.forEach((p, i) => { const v = (t * 3 + i / 2) % 1; setAlpha(alpha, p, clamp(u * 2 - 0.5) * (1 - v) * 0.7); movePart(pts, base, p, [0.25 * Math.sin(t * TAU * 3), 0.4 * Math.cos(t * TAU * 1.5), 0], 0.6 + 0.8 * v); }); return { caption: "2 · What actually happens is a structured foot massage: any effect is best explained by the general relaxation and attention effects of touch rather than by the claimed organ correspondences" }; }
    if (s === 2) { const u = Q(t, 2); zones.forEach((z) => setAlpha(alpha, z, 0.4)); setAlpha(alpha, zoneV, 0.4); organs.forEach((o) => setAlpha(alpha, o, 0.4)); setAlpha(alpha, mapX, 0.7); setAlpha(alpha, thumb, 1); movePart(pts, base, thumb, [0.25 * Math.sin(t * TAU * 3), 0.4 * Math.cos(t * TAU * 1.5), 0], 1); press.forEach((p, i) => { const v = (t * 3 + i / 2) % 1; setAlpha(alpha, p, (1 - v) * 0.6); movePart(pts, base, p, [0.25 * Math.sin(t * TAU * 3), 0.4 * Math.cos(t * TAU * 1.5), 0], 0.6 + 0.8 * v); }); grow(alpha, p0, clamp(u * 2)); grow(alpha, p1, clamp(u * 2 - 0.4)); grow(alpha, fm, clamp(u * 2 - 0.7)); setAlpha(alpha, eq, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · Randomised trials in breast cancer report small short-term reductions in pain, anxiety and fatigue compared with usual care, without clear advantage over ordinary foot massage; the trials are small and unblinded" }; }
    const u = Q(t, 3); zones.forEach((z) => setAlpha(alpha, z, 0.4)); setAlpha(alpha, zoneV, 0.4); organs.forEach((o) => setAlpha(alpha, o, 0.4)); setAlpha(alpha, mapX, 0.7); setAlpha(alpha, thumb, 1); movePart(pts, base, thumb, [0.25 * Math.sin(t * TAU * 3), 0.4 * Math.cos(t * TAU * 1.5), 0], 1); press.forEach((p, i) => { const v = (t * 3 + i / 2) % 1; setAlpha(alpha, p, (1 - v) * 0.6); movePart(pts, base, p, [0.25 * Math.sin(t * TAU * 3), 0.4 * Math.cos(t * TAU * 1.5), 0], 0.6 + 0.8 * v); }); show(alpha, 1, p0, p1, fm); setAlpha(alpha, eq, 0.8);
    setAlpha(alpha, guide, clamp(u * 2)); setAlpha(alpha, weak, clamp(u * 2 - 0.4) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, dvt, clamp(u * 2 - 0.7)); setAlpha(alpha, neuro, clamp(u * 2 - 0.9));
    return { caption: "4 · The 2022 SIO-ASCO pain guideline says reflexology or acupressure may be offered for general cancer pain, a weak recommendation on low-certainty evidence; it is safe with the same precautions as massage: neuropathy, foot wounds and deep vein thrombosis" };
  });
}

// ---------------------------------------------------------------- 90. reiki, healing touch and other energy therapies
export function reikiEnergy(): Mesh {
  const sc = scene();
  const bodyP = put(sc, "body", organ(1.6, 0.35, 0.45, "soft"), { at: [-0.8, 0.0, 0] });
  put(sc, "head", sphere(0.3, 4, 8, "soft", true), { at: [-2.65, 0.05, 0] });
  const bed = put(sc, "bed", box(4.0, 0.12, 0.9, "soft", true), { at: [-0.8, -0.45, 0] });
  const hands: Part[] = []; for (let i = 0; i < 2; i++) hands.push(put(sc, `h${i}`, hand("accent"), { at: [-1.3 + 0.9 * i, 0.75, 0.2], scale: 0.55, rotX: -Math.PI / 2 }));
  const field: Part[] = []; for (let i = 0; i < 3; i++) field.push(put(sc, `f${i}`, ring(0.25 + 0.2 * i, 10, "accent", "z"), { at: [-0.85, 0.5, 0.2] }));
  const meter = put(sc, "meter", screen(0.9, 0.6, "soft"), { at: [1.9, 1.2, 0] });
  const needle = put(sc, "needle", line([1.9, 1.05, 0.05], [1.9, 1.4, 0.05], "hot"));
  const flat = put(sc, "flat", line([1.55, 1.2, 0.05], [2.25, 1.2, 0.05], "hot"));
  const fieldX = put(sc, "fieldX", cross([-0.85, 1.4, 0.2], 0.22));
  const real = put(sc, "real", bar(1.5, 0.8, 0.25, "accent"), { at: [0, -2.0, 0] });
  const sham = put(sc, "sham", bar(1.9, 0.8, 0.25, "soft"), { at: [0, -2.0, 0] });
  const eq = put(sc, "eq", line([1.5, -1.05, 0.05], [1.9, -1.05, 0.05], "hot"));
  const rest = put(sc, "rest", polyline([[2.6, -1.4, 0], [2.6, -1.0, 0], [2.8, -1.0, 0], [2.6, -1.2, 0], [2.8, -1.2, 0]], "accent"));
  const guide = put(sc, "guide", doc(0.5, 0.6, 3, "soft"), { at: [-2.6, -1.6, 0] });
  const weak = put(sc, "weak", ring(0.4, 12, "hot", "z"), { at: [-2.6, -1.6, 0.05] });
  const chemo = put(sc, "chemo", vial(0.13, 0.45, "hot"), { at: [-1.4, -1.6, 0] });
  const delay = put(sc, "delay", cross([-1.4, -1.6, 0.15], 0.25, "soft"));
  sc.mesh.labels = [L([-0.8, 1.9, 0], "Hands on or near the body, channelling an 'energy'"), L([1.9, 1.75, 0], "No biofield detected by any physical measurement"), L([1.7, -2.4, 0], "Real and sham sessions relax equally"), L([-2.0, -2.15, 0], "SIO 2017: low-confidence option for pain; harmless unless it delays care")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, meter, needle, flat, fieldX, real, sham, eq, rest, guide, weak, chemo, delay);
    setAlpha(alpha, bed, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, bodyP, 0.8); hands.forEach((h, i) => { setAlpha(alpha, h, clamp(u * 2 - 0.3 * i)); movePart(pts, base, h, [0, 0.06 * Math.sin(t * TAU * 2 + i), 0], 1); }); field.forEach((f, i) => { const v = (t * 2 + i / 3) % 1; setAlpha(alpha, f, clamp(u * 2 - 1) * (1 - v) * 0.5); movePart(pts, base, f, [0, 0, 0], 0.6 + 0.8 * v); }); return { caption: "1 · Reiki, healing touch, therapeutic touch and qigong healing have a practitioner hold their hands on or near the body to channel an energy or biofield" }; }
    if (s === 1) { const u = Q(t, 1); hands.forEach((h, i) => { setAlpha(alpha, h, 1); movePart(pts, base, h, [0, 0.06 * Math.sin(t * TAU * 2 + i), 0], 1); }); field.forEach((f, i) => { const v = (t * 2 + i / 3) % 1; setAlpha(alpha, f, (1 - v) * 0.5 * (1 - 0.6 * u)); movePart(pts, base, f, [0, 0, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, meter, clamp(u * 2)); setAlpha(alpha, needle, clamp(u * 2 - 0.3) * (1 - clamp(u * 2 - 1))); setAlpha(alpha, flat, clamp(u * 2 - 1)); setAlpha(alpha, fieldX, clamp(u * 2 - 1.2) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "2 · That biofield has never been demonstrated by any physical measurement; no mechanism exists" }; }
    if (s === 2) { const u = Q(t, 2); hands.forEach((h, i) => { setAlpha(alpha, h, 1); movePart(pts, base, h, [0, 0.06 * Math.sin(t * TAU * 2 + i), 0], 1); }); field.forEach((f) => setAlpha(alpha, f, 0.15)); setAlpha(alpha, meter, 1); setAlpha(alpha, flat, 1); setAlpha(alpha, fieldX, 0.7); grow(alpha, real, clamp(u * 2)); grow(alpha, sham, clamp(u * 2 - 0.4)); setAlpha(alpha, eq, clamp(u * 2 - 0.9) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, rest, clamp(u * 2 - 1)); return { caption: "3 · Where trials in people with cancer include a sham practitioner, real and sham sessions produce the same relaxation and reduction in anxiety, exactly what quiet rest with attention would give" }; }
    const u = Q(t, 3); hands.forEach((h, i) => { setAlpha(alpha, h, 1); movePart(pts, base, h, [0, 0.06 * Math.sin(t * TAU * 2 + i), 0], 1); }); field.forEach((f) => setAlpha(alpha, f, 0.15)); setAlpha(alpha, meter, 1); setAlpha(alpha, flat, 1); setAlpha(alpha, fieldX, 0.7); show(alpha, 1, real, sham, rest); setAlpha(alpha, eq, 0.8);
    setAlpha(alpha, guide, clamp(u * 2)); setAlpha(alpha, weak, clamp(u * 2 - 0.4) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, chemo, clamp(u * 2 - 0.7)); setAlpha(alpha, delay, clamp(u * 2 - 1) * 0.7);
    return { caption: "4 · The SIO 2017 breast guideline grades healing touch a low-confidence option for pain and NCI PDQ notes the absence of any specific effect; sessions are safe and some patients find them comforting, and the problem arises only when they are sold as treatment or delay conventional care" };
  });
}

// ---------------------------------------------------------------- 91. Tempus multimodal models
export function tempusMultimodal(): Mesh {
  const sc = scene();
  const P: Vec3 = [-2.4, 0.2, 0];
  const patient = put(sc, "patient", figure("soft"), { at: P, scale: 0.9 });
  const seq = put(sc, "seq", helix(0.08, 0.8, 3, 20, "accent"), { at: [-1.2, 1.5, 0], rotZ: Math.PI / 2 });
  const sl = put(sc, "slide", slide("soft"), { at: [-1.2, 0.7, 0], scale: 0.6 });
  const scan = put(sc, "scan", quad(0.7, 0.5, "soft"), { at: [-1.2, -0.1, 0] });
  const outcome = put(sc, "outcome", doc(0.6, 0.45, 2, "soft"), { at: [-1.2, -0.9, 0] });
  const links: Part[] = []; [1.5, 0.7, -0.1, -0.9].forEach((y, i) => links.push(put(sc, `lk${i}`, line([P[0] + 0.35, P[1] + 0.3, 0], [-1.6, y, 0], "soft"))));
  const mod = put(sc, "model", model(1.4, 1.2, "accent"), { at: [0.5, 0.3, 0] });
  const outs: Part[] = []; ["MSI", "HRD", "response"].forEach((_, i) => outs.push(put(sc, `o${i}`, box(0.6, 0.3, 0.25, i === 2 ? "hot" : "accent", true), { at: [2.2, 1.1 - 0.5 * i, 0] })));
  const he = put(sc, "he", slide("soft"), { at: [0.5, -1.2, 0], scale: 0.6 });
  const assistant = put(sc, "assistant", screen(0.9, 0.6, "accent"), { at: [2.2, -1.0, 0] });
  const lock = put(sc, "lock", box(0.45, 0.32, 0.2, "hot", true), { at: [-0.6, -2.0, 0] });
  const lockArc = put(sc, "lockArc", polyline([[-0.77, -1.84, 0], [-0.77, -1.6, 0], [-0.43, -1.6, 0], [-0.43, -1.84, 0]], "hot"));
  const extX = put(sc, "extX", cross([0.6, -2.0, 0.05], 0.22));
  const extDoc = put(sc, "extDoc", doc(0.5, 0.6, 3, "soft"), { at: [0.6, -2.0, 0] });
  sc.mesh.labels = [L([-1.2, 2.05, 0], "Sequencing, slides, imaging and outcomes for the same patients"), L([0.5, 1.25, 0], "Supervised and self-supervised multimodal models"), L([2.2, 1.7, 0], "MSI, HRD and treatment response from routine H&E; Tempus One assistant"), L([0.0, -2.5, 0], "Proprietary; validation largely internal")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...outs, he, assistant, lock, lockArc, extX, extDoc);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, patient, 1); [seq, sl, scan, outcome].forEach((p, i) => setAlpha(alpha, p, clamp(u * 2 - 0.3 * i))); links.forEach((l, i) => setAlpha(alpha, l, clamp(u * 2 - 0.3 * i) * 0.6)); movePart(pts, base, seq, [0, 0, 0], 1, t * TAU); return { caption: "1 · Tempus's proprietary clinico-genomic corpus pairs sequencing, pathology slides, imaging and outcomes for the same patients, real-world data joined at the person" }; }
    if (s === 1) { const u = Q(t, 1); [seq, sl, scan, outcome].forEach((p) => setAlpha(alpha, p, 1)); links.forEach((l) => setAlpha(alpha, l, 0.6)); movePart(pts, base, seq, [0, 0, 0], 1, t * TAU); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); [seq, sl, scan, outcome].forEach((p, i) => movePart(pts, base, p, [1.2 * clamp(u * 1.5 - 0.1 * i), (0.3 - [1.5, 0.7, -0.1, -0.9][i]) * clamp(u * 1.5 - 0.1 * i) * 0.6, 0.2 * clamp(u * 1.5 - 0.1 * i)], 1 - 0.4 * clamp(u * 1.5 - 0.1 * i))); return { caption: "2 · Supervised and self-supervised multimodal models are trained on that corpus to learn how the modalities predict one another" }; }
    if (s === 2) { const u = Q(t, 2); [seq, sl, scan, outcome].forEach((p, i) => { setAlpha(alpha, p, 0.6); movePart(pts, base, p, [1.2, (0.3 - [1.5, 0.7, -0.1, -0.9][i]) * 0.6, 0.2], 0.6); }); movePart(pts, base, seq, [1.2, (0.3 - 1.5) * 0.6, 0.2], 0.6, t * TAU); links.forEach((l) => setAlpha(alpha, l, 0.3)); setAlpha(alpha, mod, 1); setAlpha(alpha, he, clamp(u * 2)); cascade(alpha, outs, clamp(u * 1.5 - 0.2)); setAlpha(alpha, assistant, clamp(u * 2 - 1)); return { caption: "3 · The company reports models that predict microsatellite instability, homologous recombination deficiency and treatment response from routine H&E slides, ECG-based algorithms and the Tempus One assistant for clinicians" }; }
    const u = Q(t, 3); [seq, sl, scan, outcome].forEach((p, i) => { setAlpha(alpha, p, 0.6); movePart(pts, base, p, [1.2, (0.3 - [1.5, 0.7, -0.1, -0.9][i]) * 0.6, 0.2], 0.6); }); movePart(pts, base, seq, [1.2, (0.3 - 1.5) * 0.6, 0.2], 0.6, t * TAU); links.forEach((l) => setAlpha(alpha, l, 0.3)); setAlpha(alpha, mod, 1); setAlpha(alpha, he, 1); outs.forEach((o) => setAlpha(alpha, o, 1)); setAlpha(alpha, assistant, 1);
    setAlpha(alpha, lock, clamp(u * 2)); setAlpha(alpha, lockArc, clamp(u * 2)); setAlpha(alpha, extDoc, clamp(u * 2 - 0.5)); setAlpha(alpha, extX, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Users are oncologists and pharma partners on Tempus testing and its data platform; validation is largely internal or in company publications and the models are proprietary, so external groups cannot benchmark them" };
  });
}

// ---------------------------------------------------------------- 92. Universal Cell Embedding (UCE)
export function universalCellEmbedding(): Mesh {
  const sc = scene();
  const human = put(sc, "human", figure("soft"), { at: [-2.6, 1.0, 0], scale: 0.6 });
  const mouse = put(sc, "mouse", ellipsoid(0.35, 0.18, 0.18, 3, 8, "soft", true), { at: [-2.6, -0.2, 0] });
  const fish = put(sc, "fish", ellipsoid(0.35, 0.14, 0.1, 3, 8, "soft", true), { at: [-2.6, -1.2, 0] });
  const cellsH: Part[] = []; for (let i = 0; i < 3; i++) cellsH.push(put(sc, `ch${i}`, mote(0.07, "accent"), { at: [-1.9, 1.0 + 0.2 * (i - 1), 0] }));
  const cellsM: Part[] = []; for (let i = 0; i < 3; i++) cellsM.push(put(sc, `cm${i}`, mote(0.07, "hot"), { at: [-1.9, -0.2 + 0.2 * (i - 1), 0] }));
  const cellsF: Part[] = []; for (let i = 0; i < 3; i++) cellsF.push(put(sc, `cf${i}`, mote(0.07, "soft"), { at: [-1.9, -1.2 + 0.2 * (i - 1), 0] }));
  const prots: Part[] = []; for (let i = 0; i < 3; i++) prots.push(put(sc, `pr${i}`, protein(0.22, "accent"), { at: [-0.8, 1.0 - 1.1 * i, 0] }));
  const mod = put(sc, "model", model(1.2, 1.0, "accent"), { at: [0.6, 0.0, 0] });
  const AX: Vec3 = [1.6, -1.2, 0];
  const map = put(sc, "map", axes(AX, 1.6, 2.2));
  const mapTo = (k: number, i: number): Vec3 => [AX[0] + 0.5 + 0.45 * (k % 2) + 0.1 * i, AX[1] + 0.5 + 0.55 * k + 0.08 * (i % 2), 0];
  const rings: Part[] = []; for (let k = 0; k < 3; k++) rings.push(put(sc, `rg${k}`, ring(0.28, 10, ["accent", "hot", "soft"][k], "z"), { at: [AX[0] + 0.6 + 0.45 * (k % 2), AX[1] + 0.55 + 0.55 * k, 0.02] }));
  const pertQ = put(sc, "pertQ", ring(0.35, 10, "hot", "z"), { at: [-0.3, -1.9, 0.05] });
  const pert = put(sc, "pert", capsule(1.0, "soft"), { at: [-0.3, -1.9, 0] });
  sc.mesh.labels = [L([-2.2, 1.75, 0], "Cells from any species: 36M cells, 8 species"), L([-0.8, 1.6, 0], "Genes as ESM2 protein embeddings, shared across organisms"), L([AX[0] + 0.8, AX[1] - 0.35, 0], "One universal atlas: zero-shot cell type mapping"), L([-0.3, -2.4, 0], "Coarse for fine perturbation effects")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...prots, map, ...rings, pertQ, pert);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); [human, mouse, fish].forEach((p, i) => setAlpha(alpha, p, clamp(u * 2 - 0.3 * i))); [...cellsH, ...cellsM, ...cellsF].forEach((c, i) => setAlpha(alpha, c, clamp(u * 2 - 0.5 - 0.1 * i))); return { caption: "1 · Cells from human, mouse and other species use different gene names, so models trained on one organism normally need retraining for another" }; }
    if (s === 1) { const u = Q(t, 1); [...cellsH, ...cellsM, ...cellsF].forEach((c) => setAlpha(alpha, c, 1)); prots.forEach((p, i) => { setAlpha(alpha, p, clamp(u * 2 - 0.3 * i)); movePart(pts, base, p, [0, 0, 0], 1, t * TAU * 0.5); }); return { caption: "2 · UCE represents each gene by the ESM2 protein embedding of what it encodes; orthologous genes in different species land in the same place, so no retraining is needed for a new organism" }; }
    if (s === 2) { const u = Q(t, 2); prots.forEach((p) => { setAlpha(alpha, p, 0.7); movePart(pts, base, p, [0, 0, 0], 1, t * TAU * 0.5); }); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); setAlpha(alpha, map, clamp(u * 2 - 0.3)); [cellsH, cellsM, cellsF].forEach((arr, k) => arr.forEach((c, i) => { const from: Vec3 = [-1.9, [1.0, -0.2, -1.2][k] + 0.2 * (i - 1), 0]; moveTo(pts, base, c, from, mapTo(k, i), clamp(u * 1.5 - 0.1 * i - 0.1 * k)); })); rings.forEach((r, k) => setAlpha(alpha, r, clamp(u * 2 - 1 - 0.2 * k) * 0.7)); return { caption: "3 · A transformer trained on 36M cells across 8 species (Stanford and CZI, 2023) places any new cell into one universal atlas without labels, so a mouse tumour model can be related directly to human samples" }; }
    const u = Q(t, 3); prots.forEach((p) => { setAlpha(alpha, p, 0.7); movePart(pts, base, p, [0, 0, 0], 1, t * TAU * 0.5); }); setAlpha(alpha, mod, 1); setAlpha(alpha, map, 1); [cellsH, cellsM, cellsF].forEach((arr, k) => arr.forEach((c, i) => { const from: Vec3 = [-1.9, [1.0, -0.2, -1.2][k] + 0.2 * (i - 1), 0]; moveTo(pts, base, c, from, mapTo(k, i), 1); })); rings.forEach((r) => setAlpha(alpha, r, 0.7));
    setAlpha(alpha, pert, clamp(u * 2)); setAlpha(alpha, pertQ, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Its embeddings are coarse for fine perturbation effects, so it is a mapping tool for cross-species comparison rather than a model of how cells respond to drugs" };
  });
}

// ---------------------------------------------------------------- 93. AlphaMissense
export function alphaMissense(): Mesh {
  const sc = scene();
  const PR: Vec3 = [-1.9, 0.6, 0];
  const prot = put(sc, "prot", protein(0.85, "soft"), { at: PR });
  const residue = put(sc, "residue", mote(0.09, "accent"), { at: [PR[0] + 0.25, PR[1] + 0.2, 0.5] });
  const swapped = put(sc, "swapped", mote(0.09, "hot"), { at: [PR[0] + 0.25, PR[1] + 0.2, 0.5] });
  const mod = put(sc, "model", model(1.2, 0.9, "accent"), { at: [0.5, 0.9, 0] });
  const pop = put(sc, "pop", cloud(12, 0.45, "soft", 7), { at: [0.5, -0.5, 0] });
  const scale = put(sc, "scale", ticks(1.6, 3.0, 0.9, 5, "soft"));
  const marker = put(sc, "marker", mote(0.09, "hot"), { at: [1.6, 0.9, 0.05] });
  const catalogue: Part[] = []; for (let i = 0; i < 24; i++) catalogue.push(put(sc, `ct${i}`, mote(0.04, (i * 7) % 5 === 0 ? "hot" : "accent"), { at: [-2.8 + 0.22 * (i % 8), -1.4 - 0.25 * Math.floor(i / 8), 0] }));
  const vus = put(sc, "vus", doc(0.55, 0.65, 3, "soft"), { at: [1.4, -1.5, 0] });
  const vusOk = put(sc, "vusOk", tick([1.75, -1.3, 0.05], 0.12));
  const drug = put(sc, "drug", capsule(1.0, "soft"), { at: [2.6, -1.5, 0] });
  const drugQ = put(sc, "drugQ", ring(0.3, 10, "hot", "z"), { at: [2.6, -1.5, 0.1] });
  sc.mesh.labels = [L([PR[0], PR[1] + 1.25, 0], "One amino acid swapped: a missense change"), L([0.5, 1.6, 0], "AlphaFold-derived model fine-tuned on population variant frequencies"), L([-1.9, -2.15, 0], "All 71 million possible substitutions pre-scored (Science 2023)"), L([2.0, -2.1, 0], "Pathogenic is not the same as actionable")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, swapped, pop, scale, marker, ...catalogue, vus, vusOk, drug, drugQ);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, prot, 1); setAlpha(alpha, residue, 1 - clamp(u * 2 - 1)); setAlpha(alpha, swapped, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); movePart(pts, base, swapped, [0, 0, 0], 1 + 0.5 * clamp(u * 2 - 1)); return { caption: "1 · A missense variant swaps one amino acid in a protein; most are harmless, some destroy function, and laboratories are flooded with ones of uncertain significance" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, residue, 0); setAlpha(alpha, swapped, 1); movePart(pts, base, swapped, [0, 0, 0], 1.5); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); setAlpha(alpha, pop, clamp(u * 2 - 0.3)); setAlpha(alpha, scale, clamp(u * 2 - 0.6)); setAlpha(alpha, marker, clamp(u * 2 - 0.8)); moveTo(pts, base, marker, [1.6, 0.9, 0.05], [2.75, 0.9, 0.05], clamp(u * 2 - 1)); return { caption: "2 · AlphaMissense, derived from AlphaFold and fine-tuned on how often variants appear in human populations, scores each change as likely pathogenic or benign" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, residue, 0); setAlpha(alpha, swapped, 1); movePart(pts, base, swapped, [0, 0, 0], 1.5); setAlpha(alpha, mod, 1); setAlpha(alpha, pop, 1); setAlpha(alpha, scale, 1); setAlpha(alpha, marker, 1); moveTo(pts, base, marker, [1.6, 0.9, 0.05], [2.75, 0.9, 0.05], 1); cascade(alpha, catalogue, clamp(u * 1.3)); return { caption: "3 · Rather than a tool run per variant, the Science 2023 paper released classifications for all 71 million possible single-amino-acid substitutions in the human proteome, a complete catalogue" }; }
    const u = Q(t, 3); setAlpha(alpha, residue, 0); setAlpha(alpha, swapped, 1); movePart(pts, base, swapped, [0, 0, 0], 1.5); setAlpha(alpha, mod, 1); setAlpha(alpha, pop, 1); setAlpha(alpha, scale, 1); setAlpha(alpha, marker, 1); moveTo(pts, base, marker, [1.6, 0.9, 0.05], [2.75, 0.9, 0.05], 1); catalogue.forEach((c) => setAlpha(alpha, c, 1));
    setAlpha(alpha, vus, clamp(u * 2)); setAlpha(alpha, vusOk, clamp(u * 2 - 0.4)); setAlpha(alpha, drug, clamp(u * 2 - 0.6)); setAlpha(alpha, drugQ, clamp(u * 2 - 0.9) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Laboratories use the scores to triage variants of uncertain significance in cancer genes; a variant predicted to damage a protein still does not tell a clinician whether any drug targets it or whether management changes" };
  });
}

// ---------------------------------------------------------------- 94. Foresight (generative EHR model)
export function foresightEhr(): Mesh {
  const sc = scene();
  const tl = put(sc, "tl", ticks(-2.9, 1.2, 0.9, 8, "soft"));
  const events: Part[] = []; for (let i = 0; i < 7; i++) events.push(put(sc, `ev${i}`, mote(0.07, i === 4 ? "hot" : "accent"), { at: [-2.9 + (4.1 * i) / 7, 0.9, 0.05] }));
  const codes: Part[] = []; for (let i = 0; i < 7; i++) codes.push(put(sc, `cd${i}`, quad(0.28, 0.16, "soft"), { at: [-2.9 + (4.1 * i) / 7, 1.3, 0] }));
  const mod = put(sc, "model", model(1.4, 1.0, "accent"), { at: [-0.8, -0.7, 0] });
  const next = put(sc, "next", mote(0.09, "hot"), { at: [1.8, 0.9, 0.05] });
  const nextQ = put(sc, "nextQ", ring(0.25, 10, "hot", "z"), { at: [1.8, 0.9, 0.03] });
  const nextTick = put(sc, "nextTick", line([1.8, 0.82, 0], [1.8, 0.98, 0], "hot"));
  const patients: Part[] = []; for (let i = 0; i < 4; i++) patients.push(put(sc, `pt${i}`, figure("soft"), { at: [1.4 + 0.45 * i, -0.8, -0.2 * i], scale: 0.5 }));
  const flag = put(sc, "flag", polyline([[0, 0, 0], [0, 0.4, 0], [0.3, 0.3, 0], [0, 0.2, 0]], "hot"), { at: [1.4, -0.3, 0.1] });
  const bias = put(sc, "bias", quad(0.28, 0.16, "hot"), { at: [-2.4, -1.9, 0] });
  const gap = put(sc, "gap", cross([-1.7, -1.9, 0.05], 0.14));
  const prosp = put(sc, "prosp", doc(0.5, 0.6, 3, "soft"), { at: [2.3, -1.9, 0] });
  const prospQ = put(sc, "prospQ", ring(0.4, 12, "hot", "z"), { at: [2.3, -1.9, 0.05] });
  sc.mesh.labels = [L([-0.85, 1.75, 0], "A patient's record as a sequence of coded events"), L([-0.8, -1.4, 0], "GPT-style autoregressive transformer (Lancet Digital Health 2024)"), L([2.1, 1.4, 0], "Next diagnosis forecast"), L([0.3, -2.45, 0], "Foresight 2: more than 5M patients; coding biases and gaps; no prospective evaluation")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, next, nextQ, nextTick, ...patients, flag, bias, gap, prosp, prospQ);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); grow(alpha, tl, clamp(u * 1.3)); cascade(alpha, events, clamp(u * 1.4)); cascade(alpha, codes, clamp(u * 1.4 - 0.1)); return { caption: "1 · A hospital record is a sequence of coded events over years: diagnoses, procedures, prescriptions" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, tl, 1); events.forEach((e) => setAlpha(alpha, e, 1)); codes.forEach((c) => setAlpha(alpha, c, 1)); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); events.forEach((e, i) => movePart(pts, base, e, [0, -0.3 * clamp(u * 3 - 0.3 * i) * (1 - clamp(u * 3 - 0.3 * i - 1)), 0], 1)); return { caption: "2 · Foresight (King's College London) is an autoregressive transformer trained on those sequences, learning to predict the next event the way a language model predicts the next word" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, tl, 1); events.forEach((e) => setAlpha(alpha, e, 1)); codes.forEach((c) => setAlpha(alpha, c, 1)); setAlpha(alpha, mod, 1); setAlpha(alpha, nextTick, clamp(u * 2)); setAlpha(alpha, next, clamp(u * 2 - 0.3) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, nextQ, clamp(u * 2 - 0.5) * 0.6); cascade(alpha, patients, clamp(u * 2 - 0.6)); setAlpha(alpha, flag, clamp(u * 2 - 1)); return { caption: "3 · Given a history it forecasts likely next diagnoses; in oncology the use is flagging patients whose records suggest an undiagnosed cancer or a likely complication, and Foresight 2 extended training to more than 5M patients" }; }
    const u = Q(t, 3); setAlpha(alpha, tl, 1); events.forEach((e) => setAlpha(alpha, e, 1)); codes.forEach((c) => setAlpha(alpha, c, 1)); setAlpha(alpha, mod, 1); setAlpha(alpha, nextTick, 1); setAlpha(alpha, next, 1); setAlpha(alpha, nextQ, 0.6); patients.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, flag, 1);
    setAlpha(alpha, bias, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, gap, clamp(u * 2 - 0.4)); setAlpha(alpha, prosp, clamp(u * 2 - 0.7)); setAlpha(alpha, prospQ, clamp(u * 2 - 1) * 0.7);
    return { caption: "4 · Because it learns from coded data it inherits the biases and gaps of coding practice, and prospective evaluation of its forecasts changing care has not been reported" };
  });
}

// ---------------------------------------------------------------- 95. Hibou (HistAI)
export function hibou(): Mesh {
  const sc = scene();
  const stack: Part[] = []; for (let i = 0; i < 5; i++) stack.push(put(sc, `sk${i}`, quad(1.2, 0.5, "soft"), { at: [-2.2 + 0.08 * i, 1.3 - 0.12 * i, -0.05 * i] }));
  const tiles: Part[] = []; for (let i = 0; i < 6; i++) tiles.push(put(sc, `tl${i}`, quad(0.18, 0.18, "hot"), { at: [-2.6 + 0.2 * i, 1.3, 0.06] }));
  const modB = put(sc, "modB", model(0.9, 0.7, "accent"), { at: [-0.3, 0.9, 0] });
  const modL = put(sc, "modL", model(1.3, 1.0, "accent"), { at: [1.4, 0.7, 0] });
  const openLock = put(sc, "openLock", box(0.45, 0.32, 0.2, "accent", true), { at: [0.5, -0.6, 0] });
  const openArc = put(sc, "openArc", polyline([[0.33, -0.44, 0], [0.33, -0.18, 0], [0.67, -0.18, 0], [0.67, -0.44, 0]], "accent"), { at: [0.12, 0.05, 0], rotZ: 0.4 });
  const licence = put(sc, "licence", doc(0.7, 0.5, 2, "accent"), { at: [1.7, -0.6, 0] });
  const groups: Part[] = []; for (let i = 0; i < 4; i++) groups.push(put(sc, `g${i}`, building(0.5, 0.45), { at: [-2.4 + 0.75 * i, -1.7, 0] }));
  const cls: Part[] = []; for (let i = 0; i < 4; i++) cls.push(put(sc, `c${i}`, box(0.3, 0.2, 0.15, "accent", true), { at: [-2.4 + 0.75 * i, -1.2, 0] }));
  const sBar = put(sc, "sBar", bar(1.5, 0.6, 0.25, "accent"), { at: [0, -2.2, 0] });
  const lBar = put(sc, "lBar", bar(1.9, 1.3, 0.25, "soft"), { at: [0, -2.2, 0] });
  const validQ = put(sc, "validQ", ring(0.35, 10, "hot", "z"), { at: [2.7, -1.6, 0.05] });
  sc.mesh.labels = [L([-2.2, 1.95, 0], "More than 1M slides, DINOv2 self-supervision"), L([0.6, 1.6, 0], "Hibou-B and Hibou-L (2024)"), L([1.2, -0.05, 0], "Apache 2.0: research and commercial use without negotiation"), L([0.0, -2.55, 0], "Smaller than the leaders; task-specific validation still needed")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, openLock, openArc, licence, ...groups, ...cls, sBar, lBar, validQ);
    setAlpha(alpha, modB, 0.5); setAlpha(alpha, modL, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, stack, clamp(u * 1.5)); tiles.forEach((p, i) => setAlpha(alpha, p, clamp(u * 2 - 0.8 - 0.1 * i))); return { caption: "1 · Vision transformers are pretrained with the DINOv2 self-supervised method on tiles from more than 1M slides" }; }
    if (s === 1) { const u = Q(t, 1); stack.forEach((p) => setAlpha(alpha, p, 0.6)); tiles.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [-2.6 + 0.2 * i, 1.3, 0.06], i < 3 ? [-0.3 - 0.25 + 0.25 * i, 0.9, 0.3] : [1.4 - 0.35 + 0.35 * (i - 3), 0.7, 0.3], clamp(u * 1.5 - 0.1 * i)); }); setAlpha(alpha, modB, 0.5 + 0.5 * u * pulse(t, 5)); setAlpha(alpha, modL, 0.5 + 0.5 * u * pulse(t, 5)); return { caption: "2 · Two sizes were released in 2024, Hibou-B and Hibou-L, with benchmark performance reported in the accompanying paper" }; }
    if (s === 2) { const u = Q(t, 2); stack.forEach((p) => setAlpha(alpha, p, 0.6)); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.6 + 0.2 * i, 1.3, 0.06], i < 3 ? [-0.3 - 0.25 + 0.25 * i, 0.9, 0.3] : [1.4 - 0.35 + 0.35 * (i - 3), 0.7, 0.3], 1); }); setAlpha(alpha, modB, 1); setAlpha(alpha, modL, 1); show(alpha, clamp(u * 2), openLock, openArc); setAlpha(alpha, licence, clamp(u * 2 - 0.4)); cascade(alpha, groups, clamp(u * 2 - 0.6)); cascade(alpha, cls, clamp(u * 2 - 0.9)); return { caption: "3 · Both are published under an Apache 2.0 licence, allowing research and commercial use without negotiation, which has made them common starting points for smaller groups building slide classifiers" }; }
    const u = Q(t, 3); stack.forEach((p) => setAlpha(alpha, p, 0.6)); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.6 + 0.2 * i, 1.3, 0.06], i < 3 ? [-0.3 - 0.25 + 0.25 * i, 0.9, 0.3] : [1.4 - 0.35 + 0.35 * (i - 3), 0.7, 0.3], 1); }); setAlpha(alpha, modB, 1); setAlpha(alpha, modL, 1); show(alpha, 1, openLock, openArc, licence, ...groups, ...cls);
    grow(alpha, sBar, clamp(u * 2)); grow(alpha, lBar, clamp(u * 2 - 0.4)); setAlpha(alpha, validQ, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Hibou is smaller in scale than the leading pathology models, so demanding tasks may do better on larger backbones, and like all of them it needs task-specific validation before clinical use" };
  });
}

// ---------------------------------------------------------------- 96. Midnight (kaiko.ai)
export function kaikoMidnight(): Mesh {
  const sc = scene();
  const smallStack: Part[] = []; for (let i = 0; i < 3; i++) smallStack.push(put(sc, `ss${i}`, quad(1.0, 0.4, "accent"), { at: [-2.3 + 0.06 * i, 1.2 - 0.1 * i, -0.05 * i] }));
  const bigStack: Part[] = []; for (let i = 0; i < 8; i++) bigStack.push(put(sc, `bs${i}`, quad(1.0, 0.4, "soft"), { at: [-2.3 + 0.06 * i, -0.4 - 0.1 * i, -0.05 * i] }));
  const bigLock = put(sc, "bigLock", box(0.3, 0.22, 0.15, "soft", true), { at: [-1.2, -0.7, 0] });
  const mod = put(sc, "model", model(1.3, 1.0, "accent"), { at: [0.2, 0.6, 0] });
  const mag = put(sc, "mag", ring(0.3, 12, "accent", "z"), { at: [0.2, -0.6, 0] });
  const magH = put(sc, "magH", line([0.42, -0.82, 0], [0.75, -1.15, 0], "accent"));
  const fine = put(sc, "fine", cloud(8, 0.2, "hot", 4), { at: [0.2, -0.6, 0.03] });
  const AX: Vec3 = [1.5, -0.4, 0];
  const bench = put(sc, "bench", axes(AX, 1.6, 1.6));
  const bMid = put(sc, "bMid", bar(AX[0] + 0.4, 1.2, 0.25, "accent"), { at: [0, AX[1], 0] });
  const bLead: Part[] = []; for (let i = 0; i < 2; i++) bLead.push(put(sc, `bl${i}`, bar(AX[0] + 0.85 + 0.4 * i, 1.22 - 0.05 * i, 0.25, "soft"), { at: [0, AX[1], 0] }));
  const eva = put(sc, "eva", screen(0.9, 0.6, "accent"), { at: [2.4, 1.4, 0] });
  const openLock = put(sc, "openLock", box(0.4, 0.3, 0.2, "accent", true), { at: [1.4, 1.4, 0] });
  const openArc = put(sc, "openArc", polyline([[1.25, 1.55, 0], [1.25, 1.8, 0], [1.55, 1.8, 0], [1.55, 1.55, 0]], "accent"), { at: [0.12, 0.05, 0], rotZ: 0.4 });
  const hosp = put(sc, "hosp", building(0.7, 0.6), { at: [-0.4, -1.9, 0] });
  const hospQ = put(sc, "hospQ", ring(0.5, 12, "hot", "z"), { at: [-0.4, -1.9, 0.05] });
  sc.mesh.labels = [L([-2.3, 1.75, 0], "12,000 public TCGA slides"), L([-2.3, -1.55, 0], "Leaders: far larger private collections"), L([0.2, 1.25, 0], "DINOv2 plus a high-resolution objective"), L([1.0, -2.45, 0], "Matches the leaders (2025); open eva tooling; hospital scanners still to show")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, mag, magH, fine, bench, bMid, ...bLead, eva, openLock, openArc, hosp, hospQ);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, smallStack, clamp(u * 1.5)); cascade(alpha, bigStack, clamp(u * 1.5 - 0.2)); setAlpha(alpha, bigLock, clamp(u * 2 - 1)); return { caption: "1 · The leading pathology models were trained on hundreds of thousands to millions of private slides; Midnight-12k used 12,000 public TCGA slides" }; }
    if (s === 1) { const u = Q(t, 1); smallStack.forEach((p) => setAlpha(alpha, p, 1)); bigStack.forEach((p) => setAlpha(alpha, p, 0.5)); setAlpha(alpha, bigLock, 0.6); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); setAlpha(alpha, mag, clamp(u * 2 - 0.3)); setAlpha(alpha, magH, clamp(u * 2 - 0.3)); setAlpha(alpha, fine, clamp(u * 2 - 0.6) * (0.6 + 0.4 * pulse(t, 4))); movePart(pts, base, mag, [0, 0, 0], 1 + 0.3 * clamp(u * 2 - 0.6)); return { caption: "2 · Data-efficient self-supervision combines a DINOv2 objective with a high-resolution post-training objective, so the model learns fine tissue detail from fewer slides" }; }
    if (s === 2) { const u = Q(t, 2); smallStack.forEach((p) => setAlpha(alpha, p, 1)); bigStack.forEach((p) => setAlpha(alpha, p, 0.5)); setAlpha(alpha, bigLock, 0.6); setAlpha(alpha, mod, 1); setAlpha(alpha, mag, 1); setAlpha(alpha, magH, 1); setAlpha(alpha, fine, 0.8); movePart(pts, base, mag, [0, 0, 0], 1.3); setAlpha(alpha, bench, clamp(u * 2)); grow(alpha, bMid, clamp(u * 2 - 0.3)); bLead.forEach((b, i) => grow(alpha, b, clamp(u * 2 - 0.6 - 0.2 * i))); return { caption: "3 · On public benchmarks Midnight-12k (2025) matched the leading models trained on far larger private collections, its main claim" }; }
    const u = Q(t, 3); smallStack.forEach((p) => setAlpha(alpha, p, 1)); bigStack.forEach((p) => setAlpha(alpha, p, 0.5)); setAlpha(alpha, bigLock, 0.6); setAlpha(alpha, mod, 1); setAlpha(alpha, mag, 1); setAlpha(alpha, magH, 1); setAlpha(alpha, fine, 0.8); movePart(pts, base, mag, [0, 0, 0], 1.3); setAlpha(alpha, bench, 1); setAlpha(alpha, bMid, 1); bLead.forEach((b) => setAlpha(alpha, b, 1));
    show(alpha, clamp(u * 2), openLock, openArc); setAlpha(alpha, eva, clamp(u * 2 - 0.3)); setAlpha(alpha, hosp, clamp(u * 2 - 0.6)); setAlpha(alpha, hospQ, clamp(u * 2 - 0.9) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · It was released openly with kaiko's eva evaluation framework so others can reproduce the comparisons; TCGA-only pretraining draws on research-grade slides from one consortium, so robustness to routine hospital scanners and stains still has to be shown" };
  });
}

// ---------------------------------------------------------------- 97. Nicheformer (spatial single-cell)
export function nicheformer(): Mesh {
  const sc = scene();
  const TIS: Vec3 = [-2.0, 0.8, 0];
  const tissue = put(sc, "tissue", quad(2.0, 1.5, "soft"), { at: TIS });
  const niche: Part[] = []; for (let i = 0; i < 9; i++) niche.push(put(sc, `nc${i}`, mote(0.08, i < 4 ? "hot" : "accent"), { at: [TIS[0] - 0.7 + 0.35 * (i % 3) + 0.15 * Math.floor(i / 3), TIS[1] - 0.45 + 0.45 * Math.floor(i / 3), 0.03] }));
  const neighbourRing = put(sc, "nring", ring(0.5, 12, "hot", "z"), { at: [TIS[0] - 0.35, TIS[1] - 0.2, 0.05] });
  const disso: Part[] = []; for (let i = 0; i < 9; i++) disso.push(put(sc, `ds${i}`, mote(0.08, "soft"), { at: [-2.6 + 0.3 * (i % 5) + 0.15 * Math.floor(i / 5), -1.2 - 0.4 * Math.floor(i / 5) + 0.1 * Math.sin(i), 0] }));
  const mod = put(sc, "model", model(1.4, 1.1, "accent"), { at: [0.5, 0.2, 0] });
  const spTok: Part[] = []; for (let i = 0; i < 3; i++) spTok.push(put(sc, `sp${i}`, quad(0.18, 0.18, "hot"), { at: [0.1 + 0.3 * i, 0.9, 0.25] }));
  const cellOut = put(sc, "cellOut", mote(0.1, "accent"), { at: [2.2, 1.2, 0] });
  const predRing = put(sc, "predRing", ring(0.4, 12, "accent", "z"), { at: [2.2, 0.4, 0] });
  const predNb: Part[] = []; for (let i = 0; i < 5; i++) predNb.push(put(sc, `pn${i}`, mote(0.06, "hot"), { at: [2.2 + 0.32 * Math.cos(i * 1.26), 0.4 + 0.32 * Math.sin(i * 1.26), 0.02] }));
  const d57 = put(sc, "d57", bar(1.2, 1.14, 0.3, "soft"), { at: [0, -2.3, 0] });
  const d53 = put(sc, "d53", bar(1.7, 1.06, 0.3, "hot"), { at: [0, -2.3, 0] });
  const sparse = put(sc, "sparse", cloud(4, 0.25, "hot", 5), { at: [2.6, -1.5, 0] });
  const sparseQ = put(sc, "sparseQ", ring(0.4, 12, "hot", "z"), { at: [2.6, -1.5, 0.05] });
  sc.mesh.labels = [L([TIS[0], TIS[1] + 1.05, 0], "Spatial data: cells with their neighbourhoods"), L([-1.9, -2.0, 0], "Dissociated data: cells with no position"), L([0.5, 1.45, 0], "Transformer with spatial context tokens"), L([1.8, -2.65, 0], "110M cells: 57M dissociated, 53M spatial (2024); spatial half still thin")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...spTok, cellOut, predRing, ...predNb, d57, d53, sparse, sparseQ);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tissue, 1); cascade(alpha, niche, clamp(u * 1.4)); setAlpha(alpha, neighbourRing, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); disso.forEach((d) => setAlpha(alpha, d, 0.4)); return { caption: "1 · Most single-cell data are dissociated: cells pulled apart and sequenced with no record of where they sat; spatial transcriptomics keeps each cell's neighbourhood" }; }
    if (s === 1) { const u = Q(t, 1); niche.forEach((n) => setAlpha(alpha, n, 1)); setAlpha(alpha, neighbourRing, 0.7); disso.forEach((d) => setAlpha(alpha, d, 1)); spTok.forEach((p, i) => setAlpha(alpha, p, clamp(u * 2 - 0.3 * i))); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); return { caption: "2 · Nicheformer (Helmholtz Munich) adds spatial context tokens to a single-cell transformer, so it learns how a cell's neighbourhood shapes its state rather than treating cells as isolated" }; }
    if (s === 2) { const u = Q(t, 2); niche.forEach((n) => setAlpha(alpha, n, 1)); setAlpha(alpha, neighbourRing, 0.7); disso.forEach((d) => setAlpha(alpha, d, 1)); spTok.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, mod, 1); setAlpha(alpha, cellOut, clamp(u * 2)); moveTo(pts, base, cellOut, [2.2, 1.2, 0], [2.2, 0.4, 0.05], clamp(u * 2 - 0.4)); setAlpha(alpha, predRing, clamp(u * 2 - 0.8) * 0.7); predNb.forEach((p, i) => setAlpha(alpha, p, clamp(u * 2 - 1 - 0.1 * i))); return { caption: "3 · Pretrained on 110M cells, 57M dissociated and 53M spatial (2024), it predicts a cell's tissue neighbourhood from its expression alone, which matters for how tumours organise themselves" }; }
    const u = Q(t, 3); niche.forEach((n) => setAlpha(alpha, n, 1)); setAlpha(alpha, neighbourRing, 0.7); disso.forEach((d) => setAlpha(alpha, d, 1)); spTok.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, mod, 1); setAlpha(alpha, cellOut, 1); moveTo(pts, base, cellOut, [2.2, 1.2, 0], [2.2, 0.4, 0.05], 1); setAlpha(alpha, predRing, 0.7); predNb.forEach((p) => setAlpha(alpha, p, 1));
    grow(alpha, d57, clamp(u * 2)); grow(alpha, d53, clamp(u * 2 - 0.3)); setAlpha(alpha, sparse, clamp(u * 2 - 0.6)); setAlpha(alpha, sparseQ, clamp(u * 2 - 0.9) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Spatial data remain sparse compared with dissociated data, so the spatial half of the training set is thin and predictions for rare tissue contexts are uncertain" };
  });
}

// ---------------------------------------------------------------- 98. Phikon / Phikon-v2 (Owkin)
export function phikon(): Mesh {
  const sc = scene();
  const tcga = put(sc, "tcga", box(1.1, 0.8, 0.5, "soft", true), { at: [-2.3, 1.2, 0] });
  const tcgaSlides: Part[] = []; for (let i = 0; i < 3; i++) tcgaSlides.push(put(sc, `ts${i}`, quad(0.6, 0.25, "soft"), { at: [-2.3, 1.45 - 0.22 * i, 0.26] }));
  const mod1 = put(sc, "mod1", model(0.9, 0.7, "accent"), { at: [-0.6, 1.2, 0] });
  const hosp: Part[] = []; for (let i = 0; i < 3; i++) hosp.push(put(sc, `h${i}`, building(0.7, 0.6), { at: [-2.5 + 0.9 * i, -0.9, 0] }));
  const vault: Part[] = []; for (let i = 0; i < 3; i++) vault.push(put(sc, `v${i}`, ring(0.3, 10, "accent", "z"), { at: [-2.5 + 0.9 * i, -0.85, 0.3] }));
  const ups: Part[] = []; for (let i = 0; i < 6; i++) ups.push(put(sc, `u${i}`, mote(0.05, "accent"), { at: [-2.5 + 0.9 * (i % 3), -0.5, 0.2] }));
  const mod2 = put(sc, "mod2", model(1.3, 1.0, "accent"), { at: [0.9, -0.6, 0] });
  const openLock = put(sc, "openLock", box(0.4, 0.3, 0.2, "accent", true), { at: [2.4, 0.6, 0] });
  const openArc = put(sc, "openArc", polyline([[2.25, 0.75, 0], [2.25, 1.0, 0], [2.55, 1.0, 0], [2.55, 0.75, 0]], "accent"), { at: [0.12, 0.05, 0], rotZ: 0.4 });
  const products: Part[] = []; for (let i = 0; i < 2; i++) products.push(put(sc, `pd${i}`, box(0.6, 0.3, 0.25, i ? "accent" : "hot", true), { at: [2.4, -0.4 - 0.5 * i, 0] }));
  const scaleBar = put(sc, "scaleBar", bar(0.4, 0.7, 0.22, "accent"), { at: [0, -2.4, 0] });
  const leadersBar = put(sc, "leadersBar", bar(0.8, 1.2, 0.22, "soft"), { at: [0, -2.4, 0] });
  const auditQ = put(sc, "auditQ", ring(0.4, 12, "hot", "z"), { at: [2.4, -1.9, 0.05] });
  const auditDoc = put(sc, "auditDoc", doc(0.5, 0.6, 3, "soft"), { at: [2.4, -1.9, 0] });
  sc.mesh.labels = [L([-1.5, 1.95, 0], "Phikon (2023): trained on TCGA"), L([-1.6, -1.45, 0], "Federated hospital network: data stay inside partner hospitals"), L([0.9, 0.2, 0], "Phikon-v2 (2024): 460M tiles from 58M slides, 30 cancer types"), L([1.6, -2.75, 0], "Open weights; moderate scale; federated data hard for outsiders to audit")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...vault, ...ups, openLock, openArc, ...products, scaleBar, leadersBar, auditQ, auditDoc);
    setAlpha(alpha, mod1, 0.5); setAlpha(alpha, mod2, 0.5); hosp.forEach((h) => setAlpha(alpha, h, 0.4));
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tcga, 1); cascade(alpha, tcgaSlides, clamp(u * 1.5)); tcgaSlides.forEach((p, i) => moveTo(pts, base, p, [-2.3, 1.45 - 0.22 * i, 0.26], [-0.6 - 0.2 + 0.2 * i, 1.2, 0.3], clamp(u * 2 - 1 - 0.1 * i), 0.5)); setAlpha(alpha, mod1, 0.5 + 0.5 * clamp(u * 2 - 1) * pulse(t, 5)); return { caption: "1 · Phikon (2023) was a vision transformer trained with iBOT self-supervision on the public TCGA slide collection" }; }
    if (s === 1) { const u = Q(t, 1); tcgaSlides.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.3, 1.45 - 0.22 * i, 0.26], [-0.6 - 0.2 + 0.2 * i, 1.2, 0.3], 1, 0.5); }); setAlpha(alpha, mod1, 1); hosp.forEach((h, i) => setAlpha(alpha, h, 0.4 + 0.6 * clamp(u * 2 - 0.2 * i))); vault.forEach((v, i) => setAlpha(alpha, v, clamp(u * 2 - 0.5 - 0.2 * i) * 0.7)); return { caption: "2 · Owkin's federated hospital network holds slides inside partner hospitals; models learn from data that never move" }; }
    if (s === 2) { const u = Q(t, 2); tcgaSlides.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.3, 1.45 - 0.22 * i, 0.26], [-0.6 - 0.2 + 0.2 * i, 1.2, 0.3], 1, 0.5); }); setAlpha(alpha, mod1, 1); hosp.forEach((h) => setAlpha(alpha, h, 1)); vault.forEach((v) => setAlpha(alpha, v, 0.7)); ups.forEach((p, i) => { const v = (t * 3 + i / 6) % 1; setAlpha(alpha, p, u * (1 - 0.3 * v)); moveTo(pts, base, p, [-2.5 + 0.9 * (i % 3), -0.5, 0.2], [0.9 - 0.4, -0.6, 0.3], v); }); setAlpha(alpha, mod2, 0.5 + 0.5 * u * pulse(t, 5)); return { caption: "3 · Phikon-v2 (2024) drew on that network: 460M tiles from 58M slides across 30 cancer types, trained with iBOT and DINOv2 self-supervision" }; }
    const u = Q(t, 3); tcgaSlides.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.3, 1.45 - 0.22 * i, 0.26], [-0.6 - 0.2 + 0.2 * i, 1.2, 0.3], 1, 0.5); }); setAlpha(alpha, mod1, 1); hosp.forEach((h) => setAlpha(alpha, h, 1)); vault.forEach((v) => setAlpha(alpha, v, 0.7)); ups.forEach((p, i) => { const v = (t * 3 + i / 6) % 1; setAlpha(alpha, p, 0.6 * (1 - 0.3 * v)); moveTo(pts, base, p, [-2.5 + 0.9 * (i % 3), -0.5, 0.2], [0.9 - 0.4, -0.6, 0.3], v); }); setAlpha(alpha, mod2, 1);
    show(alpha, clamp(u * 2), openLock, openArc); cascade(alpha, products, clamp(u * 2 - 0.3)); grow(alpha, scaleBar, clamp(u * 2 - 0.5)); grow(alpha, leadersBar, clamp(u * 2 - 0.7)); setAlpha(alpha, auditDoc, clamp(u * 2 - 0.9)); setAlpha(alpha, auditQ, clamp(u * 2 - 1.1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Both power Owkin's MSI and prognosis products and the open weights serve academic groups as backbones; the scale is moderate next to the largest models, and federated data access is an advantage for training but harder for outsiders to audit" };
  });
}

// ---------------------------------------------------------------- 99. PLUTO (PathAI)
export function pluto(): Mesh {
  const sc = scene();
  const res: Part[] = []; [1.8, 1.2, 0.6].forEach((w, i) => res.push(put(sc, `rs${i}`, quad(w, w * 0.65, ["soft", "accent", "hot"][i]), { at: [-2.0 + 0.05 * i, 0.9, 0.05 * i] })));
  const mod = put(sc, "model", model(0.9, 0.7, "accent"), { at: [0.3, 0.9, 0] });
  const bigMod = put(sc, "bigMod", model(1.5, 1.2, "soft"), { at: [0.3, 0.9, -0.3] });
  const mae = put(sc, "mae", quad(0.35, 0.3, "soft"), { at: [-1.7, 1.0, 0.2] });
  const heads: Part[] = []; for (let i = 0; i < 4; i++) heads.push(put(sc, `h${i}`, box(0.4, 0.25, 0.2, i === 1 ? "hot" : "accent", true), { at: [1.5 + 0.5 * i, 1.4 - 0.35 * i, 0] }));
  const platform = put(sc, "platform", screen(1.6, 1.0, "accent"), { at: [1.0, -1.0, 0] });
  const biomarker = put(sc, "biomarker", cloud(8, 0.35, "hot", 3), { at: [1.0, -0.95, 0.03] });
  const sites: Part[] = []; for (let i = 0; i < 5; i++) sites.push(put(sc, `st${i}`, building(0.35, 0.35, "soft"), { at: [-2.6 + 0.5 * i, -1.6, 0] }));
  const lock = put(sc, "lock", box(0.45, 0.32, 0.2, "hot", true), { at: [2.6, -1.4, 0] });
  const lockArc = put(sc, "lockArc", polyline([[2.43, -1.24, 0], [2.43, -1.0, 0], [2.77, -1.0, 0], [2.77, -1.24, 0]], "hot"));
  const outX = put(sc, "outX", cross([2.6, -2.1, 0.05], 0.2));
  sc.mesh.labels = [L([-2.0, 1.75, 0], "The same network at several magnifications"), L([0.3, 1.75, 0], "Compact ViT: DINOv2 plus masked autoencoding"), L([1.0, -1.75, 0], "AISight platform, biomarker quantification"), L([-1.6, -2.15, 0], "195M tiles, 158k slides, 50+ sites (2024); proprietary")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, mae, ...heads, platform, biomarker, ...sites, lock, lockArc, outX);
    setAlpha(alpha, mod, 0.5); setAlpha(alpha, bigMod, 0.15);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, res, clamp(u * 1.5)); res.forEach((r, i) => movePart(pts, base, r, [0, 0, 0], 1 + 0.08 * Math.sin(t * TAU * 2 + i))); return { caption: "1 · Different pathology tasks need different magnifications: architecture at low power, nuclei at high power" }; }
    if (s === 1) { const u = Q(t, 1); res.forEach((r, i) => { setAlpha(alpha, r, 1); movePart(pts, base, r, [0, 0, 0], 1 + 0.08 * Math.sin(t * TAU * 2 + i)); }); setAlpha(alpha, mae, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); setAlpha(alpha, bigMod, 0.15 + 0.15 * clamp(u * 2 - 1)); return { caption: "2 · PLUTO is a compact vision transformer pretrained at multiple resolutions with DINOv2 combined with masked autoencoding, so one lightweight network works at whatever magnification a task needs" }; }
    if (s === 2) { const u = Q(t, 2); res.forEach((r, i) => { setAlpha(alpha, r, 1); movePart(pts, base, r, [0, 0, 0], 1 + 0.08 * Math.sin(t * TAU * 2 + i)); }); setAlpha(alpha, mae, 0.6); setAlpha(alpha, mod, 1); setAlpha(alpha, bigMod, 0.3); cascade(alpha, heads, clamp(u * 1.5)); setAlpha(alpha, platform, clamp(u * 2 - 0.5)); setAlpha(alpha, biomarker, clamp(u * 2 - 0.8) * (0.6 + 0.4 * pulse(t, 3))); return { caption: "3 · Trained on 195M tiles from 158k slides across 50+ sites (2024), it powers PathAI's AISight platform and biomarker quantification tools, giving efficient inference across many tasks instead of a model for each" }; }
    const u = Q(t, 3); res.forEach((r, i) => { setAlpha(alpha, r, 1); movePart(pts, base, r, [0, 0, 0], 1 + 0.08 * Math.sin(t * TAU * 2 + i)); }); setAlpha(alpha, mae, 0.6); setAlpha(alpha, mod, 1); setAlpha(alpha, bigMod, 0.3); heads.forEach((h) => setAlpha(alpha, h, 1)); setAlpha(alpha, platform, 1); setAlpha(alpha, biomarker, 0.8);
    cascade(alpha, sites, clamp(u * 1.5)); setAlpha(alpha, lock, clamp(u * 2 - 0.5)); setAlpha(alpha, lockArc, clamp(u * 2 - 0.5)); setAlpha(alpha, outX, clamp(u * 2 - 0.9) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Being proprietary, its weights cannot be independently benchmarked or adapted by outside groups, so external claims rest on the company's publications and deployments" };
  });
}

// ---------------------------------------------------------------- 100. RadFM (generalist radiology foundation model)
export function radfm(): Mesh {
  const sc = scene();
  const ct = put(sc, "ct", quad(0.9, 0.7, "soft"), { at: [-2.5, 1.3, 0] });
  const mri = put(sc, "mri", quad(0.9, 0.7, "soft"), { at: [-2.5, 0.3, 0] });
  const xr = put(sc, "xr", quad(0.9, 0.7, "soft"), { at: [-2.5, -0.7, 0] });
  const vol: Part[] = []; for (let i = 0; i < 3; i++) vol.push(put(sc, `vol${i}`, quad(0.9, 0.7, "soft"), { at: [-2.5 + 0.08 * i, 1.3 - 0.1 * i, -0.08 * (i + 1)] }));
  const bodies: Part[] = []; [1.3, 0.3, -0.7].forEach((y, i) => bodies.push(put(sc, `b${i}`, ellipsoid(0.28, 0.2, 0.03, 3, 8, "soft"), { at: [-2.5, y, 0.03] })));
  const lesion = put(sc, "lesion", blob(0.09, "hot"), { at: [-2.4, 1.35, 0.06] });
  const enc = put(sc, "enc", box(0.9, 1.6, 0.4, "accent", true), { at: [-1.0, 0.3, 0] });
  const llm = put(sc, "llm", model(1.5, 1.2, "accent"), { at: [0.9, 0.3, 0] });
  const question = put(sc, "question", doc(0.9, 0.5, 2, "soft"), { at: [0.9, 1.6, 0] });
  const answer = put(sc, "answer", doc(0.9, 0.6, 3, "accent"), { at: [2.5, 0.3, 0] });
  const gen = put(sc, "gen", bar(1.2, 0.8, 0.25, "accent"), { at: [0, -2.2, 0] });
  const spec = put(sc, "spec", bar(1.6, 1.2, 0.25, "soft"), { at: [0, -2.2, 0] });
  const research = put(sc, "research", doc(0.5, 0.6, 3, "soft"), { at: [2.5, -1.5, 0] });
  const oncoQ = put(sc, "oncoQ", ring(0.4, 12, "hot", "z"), { at: [2.5, -1.5, 0.05] });
  sc.mesh.labels = [L([-2.5, 2.0, 0], "CT, MRI and X-ray, 2D and 3D"), L([0.9, 2.15, 0], "Ask about a scan in plain language"), L([0.0, -0.75, 0], "Visual encoder plus language model, trained on 16M scans (MedMD, 2023)"), L([1.6, -2.6, 0], "Below specialist models per task; oncology evaluation limited")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...vol, question, answer, gen, spec, research, oncoQ);
    setAlpha(alpha, llm, 0.5); setAlpha(alpha, enc, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); [ct, mri, xr].forEach((p, i) => setAlpha(alpha, p, clamp(u * 2 - 0.3 * i))); bodies.forEach((b, i) => setAlpha(alpha, b, clamp(u * 2 - 0.3 * i))); setAlpha(alpha, lesion, clamp(u * 2 - 0.5)); cascade(alpha, vol, clamp(u * 2 - 1)); return { caption: "1 · Radiology spans CT, MRI and X-ray, in single slices and full volumes; most AI tools handle one modality and one task" }; }
    if (s === 1) { const u = Q(t, 1); vol.forEach((v) => setAlpha(alpha, v, 1)); setAlpha(alpha, enc, 0.5 + 0.5 * u * pulse(t, 5)); [ct, mri, xr].forEach((p, i) => movePart(pts, base, p, [1.0 * clamp(u * 1.5 - 0.1 * i), (0.3 - [1.3, 0.3, -0.7][i]) * clamp(u * 1.5 - 0.1 * i) * 0.5, 0.2], 1 - 0.3 * clamp(u * 1.5 - 0.1 * i))); return { caption: "2 · RadFM pairs a visual encoder for 2D and 3D scans with a large language model, trained on interleaved image and text from the 16M-scan MedMD dataset (2023)" }; }
    if (s === 2) { const u = Q(t, 2); vol.forEach((v) => setAlpha(alpha, v, 1)); [ct, mri, xr].forEach((p, i) => movePart(pts, base, p, [1.0, (0.3 - [1.3, 0.3, -0.7][i]) * 0.5, 0.2], 0.7)); setAlpha(alpha, enc, 1); setAlpha(alpha, question, clamp(u * 2)); moveTo(pts, base, question, [0.9, 1.6, 0], [0.9, 1.0, 0.3], clamp(u * 2 - 0.4), 0.7); setAlpha(alpha, llm, 0.5 + 0.5 * clamp(u * 2 - 0.5) * pulse(t, 5)); setAlpha(alpha, answer, clamp(u * 2 - 1)); return { caption: "3 · A user asks a question about the scan in plain language and receives an answer; it is a research system for groups exploring conversational, multimodal radiology assistants" }; }
    const u = Q(t, 3); vol.forEach((v) => setAlpha(alpha, v, 1)); [ct, mri, xr].forEach((p, i) => movePart(pts, base, p, [1.0, (0.3 - [1.3, 0.3, -0.7][i]) * 0.5, 0.2], 0.7)); setAlpha(alpha, enc, 1); setAlpha(alpha, question, 1); moveTo(pts, base, question, [0.9, 1.6, 0], [0.9, 1.0, 0.3], 1, 0.7); setAlpha(alpha, llm, 1); setAlpha(alpha, answer, 1);
    grow(alpha, gen, clamp(u * 2)); grow(alpha, spec, clamp(u * 2 - 0.4)); setAlpha(alpha, research, clamp(u * 2 - 0.7)); setAlpha(alpha, oncoQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Its accuracy is below specialist models on individual tasks, the central trade-off of generalist medical models, and oncology-specific evaluation is limited; it is broad but not yet as good as dedicated tools" };
  });
}
