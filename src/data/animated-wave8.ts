/**
 * Wave 8 of animated technology schematics, part one: the first half of the technologies that until now still fell back to
 * a generic front placeholder (teleoncology and tumour boards; radiosensitising nanoparticles, lattice and proton arc
 * radiotherapy, magnetic hyperthermia; the AI foundation models of structure, cells and pathology such as AlphaFold 3,
 * Boltz, Chai, State, Geneformer, scGPT, Virchow, MUSK and Prov-GigaPath; high-dose vitamin C, mistletoe, shark cartilage
 * and other complementary claims with a trial record; long-read sequencing, plasmid manufacturing, self-amplifying RNA).
 * Same conventions as ./animated-wave7.ts (helpers shared in ./animated-wave8-kit.ts): one focal object with a filled body,
 * one to three animated actors, four captioned phases on a 12-14 s loop, three or four plain labels, every mesh under
 * 500 points, numbers in captions from the technology record only. The viewer blends the last 14 % of the cycle back to
 * frame 0, so each scene simply ends in its final state. Part two is ./animated-wave8b.ts; WAVE8 merges both.
 */
import { add, arrow, box, cone, cylinder, disc, dots, ellipsoid, helix, lerp3, line, movePart, octahedron, polyline, ring, setAlpha, sphere, syringe, torus, type Mesh, type Part, type Vec3 } from "@/lib/wireframe";
import { L, Q, TAU, axes, bar, beam, blob, building, capsule, cascade, cell, clamp, clockFace, cloud, cross, doc, figure, frame, grow, hand, hide, house, leaf, model, mote, moveTo, organ, protein, pulse, put, quad, scene, screen, show, slide, small, stageOf, tick, ticks, tube, vial } from "./animated-wave8-kit";
import { WAVE8B } from "./animated-wave8b";

/** Wave 8 registry: part one below (function declarations hoist), part two spread in from ./animated-wave8b.ts. */
export const WAVE8: Record<string, () => Mesh> = {
  "telemedicine-teleoncology": teleoncology,
  "multidisciplinary-tumour-board": tumourBoard,
  "radiodynamic-therapy": radiodynamicTherapy,
  "state-arc": stateArc,
  "high-dose-vitamin-c": highDoseVitaminC,
  "il12-electroporation": il12Electroporation,
  "mirai": miraiRisk,
  "tors": torsSurgery,
  "virchow": virchowModel,
  "alphafold3": alphafold3,
  "boltz": boltzModel,
  "chai-1": chaiModel,
  "federated-learning-medical-ai": federatedLearning,
  "geneformer": geneformer,
  "lattice-radiotherapy": latticeRadiotherapy,
  "long-read-sequencing": longReadSequencing,
  "magnetic-nanoparticle-hyperthermia": magneticHyperthermia,
  "musk": muskModel,
  "phenom-2": phenom2,
  "proton-arc-therapy": protonArc,
  "rfdiffusion": rfdiffusion,
  "scgpt": scgpt,
  "cannabinoids-nausea": cannabinoidsNausea,
  "esm3": esm3,
  "high-throughput-screening-libraries": htsLibraries,
  "massage-therapy-cancer": massageTherapy,
  "mindfulness-based-interventions": mindfulness,
  "mistletoe-extracts": mistletoeExtracts,
  "peer-support-groups": peerSupport,
  "photothermal-nanoparticles": photothermalNanoparticles,
  "plasmid-dna-manufacturing": plasmidManufacturing,
  "proteomics-platforms": proteomicsPlatforms,
  "prov-gigapath": provGigapath,
  "psk-krestin-adjuvant": pskKrestin,
  "self-amplifying-rna": selfAmplifyingRna,
  "shark-cartilage": sharkCartilage,
  "skin-cancer-screening": skinCancerScreening,
  "biliary-stenting-drainage": biliaryStenting,
  "black-salve-escharotics": blackSalve,
  "chemistry42": chemistry42,
  ...WAVE8B,
};

// ---------------------------------------------------------------- 1. telemedicine, teleoncology and telepathology
export function teleoncology(): Mesh {
  const sc = scene();
  const HOME: Vec3 = [-2.2, -0.3, 0], HOSP: Vec3 = [2.2, -0.2, 0];
  put(sc, "house", house(1.3, 0.9), { at: HOME });
  const patient = put(sc, "patient", figure("soft"), { at: [HOME[0], HOME[1] - 0.1, 0.1], scale: 0.55 });
  put(sc, "hospital", building(1.3, 1.2), { at: HOSP });
  const doctor = put(sc, "doctor", figure("accent"), { at: [HOSP[0] - 1.0, HOSP[1] - 0.1, 0.2], scale: 0.55 });
  const scr = put(sc, "screen", screen(1.5, 1.0, "accent"), { at: [0, 0.4, 0] });
  const face = put(sc, "face", sphere(0.2, 4, 8, "accent", true), { at: [0, 0.5, 0.05] });
  const pk: Part[] = []; for (let i = 0; i < 4; i++) pk.push(put(sc, `pk${i}`, small(0.07, "accent"), { at: [HOME[0] + 0.6, HOME[1] + 0.6, 0.1] }));
  const sl = put(sc, "slide", slide("soft"), { at: [HOME[0], HOME[1] + 1.1, 0], scale: 0.7 });
  const ok = put(sc, "ok", tick([HOSP[0] - 1.0, HOSP[1] + 1.1, 0.1], 0.22));
  const iv = put(sc, "iv", vial(0.12, 0.45, "hot"), { at: [HOME[0] - 0.55, HOME[1] + 0.35, 0.1] });
  const border = put(sc, "border", ticks(0, 0, -1.2, 1, "hot"));
  const dash: Part[] = []; for (let i = 0; i < 6; i++) dash.push(put(sc, `dash${i}`, line([0, -1.5 + 0.45 * i, 0], [0, -1.3 + 0.45 * i, 0], "hot")));
  const coins = put(sc, "coins", disc(0.18, 10, "hot", "z"), { at: [0.6, -1.0, 0] });
  const coinX = put(sc, "coinX", cross([0.6, -1.0, 0.05], 0.14));
  sc.mesh.labels = [L([HOME[0], HOME[1] - 1.0, 0], "Rural or low-resource patient"), L([HOSP[0], HOSP[1] + 1.0, 0], "Specialist centre (MD Anderson, MSK, Project ECHO)"), L([0, 1.25, 0], "Video visit and whole-slide remote sign-out"), L([0, -1.85, 0], "Licensure borders and payment parity")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, face, ...pk, sl, ok, iv, border, ...dash, coins, coinX);
    setAlpha(alpha, scr, 0.35);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); movePart(pts, base, patient, [0.1 * Math.sin(t * TAU * 2), 0, 0], 1); setAlpha(alpha, doctor, 0.4 + 0.6 * u); return { caption: "1 · A patient hours from the nearest cancer centre needs a specialist opinion; the specialist, the slides and the scans are all somewhere else" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, scr, 0.35 + 0.65 * u); setAlpha(alpha, face, clamp(u * 2 - 0.6)); pk.forEach((p, i) => { const v = (t * 3 + i / 4) % 1; setAlpha(alpha, p, u * (1 - v)); moveTo(pts, base, p, [HOME[0] + 0.6, HOME[1] + 0.6, 0.1], [HOSP[0] - 0.7, HOSP[1] + 0.6, 0.1], v); }); return { caption: "2 · Secure video and shared records bring the oncologist to the patient: teleoncology networks in rural Australia and Canada, NCI Telehealth Research Centers, remote consultations from MD Anderson and MSK" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, scr, 1); setAlpha(alpha, face, 1); setAlpha(alpha, sl, 1); moveTo(pts, base, sl, [HOME[0], HOME[1] + 1.1, 0], [0, 0.45, 0.08], clamp(u * 1.6)); setAlpha(alpha, ok, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · Telepathology: static images or whole slides are reviewed and signed out from afar, cleared by regulators during and after the pandemic; digital second-opinion platforms are growing" }; }
    const u = Q(t, 3); setAlpha(alpha, scr, 1); setAlpha(alpha, face, 1); setAlpha(alpha, sl, 0.6); moveTo(pts, base, sl, [HOME[0], HOME[1] + 1.1, 0], [0, 0.45, 0.08], 1); setAlpha(alpha, ok, 0.6);
    setAlpha(alpha, iv, clamp(u * 2)); cascade(alpha, dash, clamp(u * 2 - 0.4)); setAlpha(alpha, coins, clamp(u * 2 - 1)); setAlpha(alpha, coinX, clamp(u * 2 - 1.3));
    return { caption: "4 · Examinations and infusions still happen locally, and licensure across state or national borders and reimbursement parity limit how far the model can spread" };
  });
}

// ---------------------------------------------------------------- 2. multidisciplinary tumour boards
export function tumourBoard(): Mesh {
  const sc = scene();
  const table = put(sc, "table", disc(1.15, 16, "soft", "y"), { at: [0, -0.3, 0] });
  const seats: Part[] = []; const N = 5;
  for (let i = 0; i < N; i++) { const a = Math.PI * 0.15 + (Math.PI * 0.7 * i) / (N - 1); seats.push(put(sc, `seat${i}`, figure(i === 2 ? "accent" : "soft"), { at: [1.5 * Math.cos(a + Math.PI), -0.15, 1.2 * Math.sin(a + Math.PI) * -1], scale: 0.5 })); }
  const docs: Part[] = []; const D0: Vec3[] = [[-2.4, 1.4, 0], [-1.2, 1.7, 0], [1.2, 1.7, 0], [2.4, 1.4, 0]];
  D0.forEach((d, i) => docs.push(put(sc, `doc${i}`, doc(0.5, 0.6, 3, i === 3 ? "hot" : "soft"), { at: d })));
  const plan = put(sc, "plan", doc(0.7, 0.8, 4, "accent"), { at: [0, 0.2, 0] });
  const planOk = put(sc, "planOk", tick([0.15, 0.15, 0.05], 0.18));
  const b0 = put(sc, "b0", bar(1.9, 1.0, 0.25, "soft"), { at: [0, -1.9, 0] });
  const b1 = put(sc, "b1", bar(2.25, 0.3, 0.25, "hot"), { at: [0, -1.9, 0] });
  const scr = put(sc, "scr", screen(1.0, 0.7, "accent"), { at: [-2.3, -0.4, 0] });
  const scrFace = put(sc, "scrFace", sphere(0.15, 4, 8, "accent", true), { at: [-2.3, -0.35, 0.05] });
  const dnaP = put(sc, "dna", helix(0.12, 0.7, 3, 24, "accent"), { at: [2.4, 1.4, 0.1] });
  sc.mesh.labels = [L([0, 2.2, 0], "Imaging, pathology, molecular and comorbidity data"), L([0, -1.3, 0], "Consensus, guideline-referenced plan"), L([2.1, -2.2, 0], "Plan or diagnosis changed in 10-30% of cases"), L([-2.3, -1.1, 0], "Virtual and regional MDTs")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, plan, planOk, b0, b1, scr, scrFace, dnaP);
    setAlpha(alpha, table, 0.6);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); seats.forEach((p) => setAlpha(alpha, p, 0.5)); docs.forEach((d, i) => { const v = clamp(u * 1.5 - 0.15 * i); setAlpha(alpha, d, v); moveTo(pts, base, d, D0[i], [D0[i][0] * 0.5, 0.35, 0.2], v); }); return { caption: "1 · Before treatment starts, one case is assembled with its full dataset: imaging, pathology, molecular profile and comorbidities; MDT review has been mandatory in the UK since the Calman-Hine report of 1995" }; }
    if (s === 1) { const u = Q(t, 1); docs.forEach((d, i) => { setAlpha(alpha, d, 0.7); moveTo(pts, base, d, D0[i], [D0[i][0] * 0.5, 0.35, 0.2], 1); }); seats.forEach((p, i) => { const on = clamp(u * N - i); setAlpha(alpha, p, 0.5 + 0.5 * on); movePart(pts, base, p, [0, 0.08 * on * pulse(t, 4), 0], 1); }); return { caption: "2 · Surgeon, oncologist, radiologist, pathologist and nurse each speak to the same data in one structured, prospective review, as required for accreditation by the ACoS Commission on Cancer, OECI and German certified centres" }; }
    if (s === 2) { const u = Q(t, 2); docs.forEach((d, i) => { setAlpha(alpha, d, 0.5); moveTo(pts, base, d, D0[i], [D0[i][0] * 0.5, 0.35, 0.2], 1); }); seats.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, plan, clamp(u * 2)); setAlpha(alpha, planOk, clamp(u * 2 - 1)); setAlpha(alpha, b0, clamp(u * 2 - 0.5)); setAlpha(alpha, b1, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · The output is a consensus, guideline-referenced recommendation; observational studies find the diagnosis or plan changes in 10-30% of cases, with better staging and guideline adherence, though randomised evidence of survival benefit is lacking" }; }
    const u = Q(t, 3); docs.forEach((d, i) => { setAlpha(alpha, d, 0.5); moveTo(pts, base, d, D0[i], [D0[i][0] * 0.5, 0.35, 0.2], 1); }); seats.forEach((p) => setAlpha(alpha, p, 1)); show(alpha, 0.8, plan, planOk, b0, b1);
    setAlpha(alpha, scr, clamp(u * 2)); setAlpha(alpha, scrFace, clamp(u * 2 - 0.5) * (0.7 + 0.3 * pulse(t, 3))); setAlpha(alpha, dnaP, clamp(u * 2 - 1)); movePart(pts, base, dnaP, [0, 0, 0], 1, u * TAU);
    return { caption: "4 · Molecular tumour boards, since about 2012, interpret genomic profiles; virtual and regional MDTs reach smaller hospitals; the costs are time, variable preparation and the patient's absence from the room" };
  });
}

// ---------------------------------------------------------------- 3. radiodynamic therapy and radiosensitising nanoparticles
export function radiodynamicTherapy(): Mesh {
  const sc = scene();
  const TUM: Vec3 = [0.8, 0, 0];
  put(sc, "tissue", organ(2.2, 1.3, 0.5, "soft"), { at: [0.3, 0, -0.2] });
  const tumour = put(sc, "tumour", blob(0.85, "hot"), { at: TUM });
  const NEEDLE0: Vec3 = [2.6, 1.7, 0];
  const needle = put(sc, "needle", syringe(0.7, "accent"), { at: NEEDLE0, rotZ: -Math.PI * 0.75 });
  const np: Part[] = []; for (let i = 0; i < 9; i++) np.push(put(sc, `np${i}`, octahedron(0.07, "accent", true), { at: NEEDLE0 }));
  const npAt = (i: number): Vec3 => [TUM[0] - 0.45 + 0.22 * (i % 4) + 0.1 * Math.floor(i / 4), TUM[1] - 0.35 + 0.3 * Math.floor(i / 4) + 0.1 * (i % 2), 0.2];
  const xray = put(sc, "xray", beam([-2.9, 0.1, 0], [TUM[0] - 0.4, TUM[1], 0], 0.45, "soft"));
  const halos: Part[] = []; for (let i = 0; i < 9; i++) halos.push(put(sc, `halo${i}`, ring(0.16, 8, "accent", "z"), { at: npAt(i) }));
  const dTum = put(sc, "dTum", bar(2.2, 1.3, 0.28, "hot"), { at: [0, -2.0, 0] });
  const dNorm = put(sc, "dNorm", bar(2.6, 0.5, 0.28, "soft"), { at: [0, -2.0, 0] });
  const gap = put(sc, "gap", cloud(6, 0.35, "hot", 5), { at: [TUM[0] + 0.45, TUM[1] + 0.3, 0.25] });
  const trial = put(sc, "trial", doc(0.7, 0.8, 4, "accent"), { at: [-2.3, -1.3, 0] });
  sc.mesh.labels = [L([TUM[0], TUM[1] + 1.55, 0], "Hafnium-oxide nanoparticles (NBTXR3) inside the tumour"), L([-2.9, 0.6, 0], "Ordinary radiotherapy X-rays"), L([2.4, -2.35, 0], "Dose per gray: tumour up, surroundings unchanged"), L([-2.3, -1.85, 0], "Randomised soft-tissue sarcoma study; head and neck ongoing")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...np, xray, ...halos, dTum, dNorm, gap, trial);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); moveTo(pts, base, needle, NEEDLE0, [TUM[0] + 0.9, TUM[1] + 0.8, 0], clamp(u * 2)); np.forEach((p, i) => { const v = clamp(u * 2 - 1 - 0.05 * i); setAlpha(alpha, p, v > 0 ? 1 : 0); moveTo(pts, base, p, [TUM[0] + 0.5, TUM[1] + 0.45, 0.2], npAt(i), v); }); return { caption: "1 · High atomic-number nanoparticles are injected straight into the tumour once, and stay there for the whole course of radiotherapy" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, needle, 0); np.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [TUM[0] + 0.5, TUM[1] + 0.45, 0.2], npAt(i), 1); }); setAlpha(alpha, xray, 0.3 + 0.5 * u * pulse(t, 6)); halos.forEach((h, i) => { const v = (t * 5 + i / 9) % 1; setAlpha(alpha, h, clamp(u * 2 - 0.5) * (1 - v)); movePart(pts, base, h, [0, 0, 0], 0.5 + 1.5 * v); }); return { caption: "2 · Each X-ray photon is far more likely to be absorbed by a heavy atom than by soft tissue; the particle throws off secondary electrons that deposit extra dose within micrometres, or excites a linked photosensitiser to make singlet oxygen at depth" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, needle, 0); np.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [TUM[0] + 0.5, TUM[1] + 0.45, 0.2], npAt(i), 1); }); setAlpha(alpha, xray, 0.7); halos.forEach((h, i) => { const v = (t * 5 + i / 9) % 1; setAlpha(alpha, h, 0.6 * (1 - v)); movePart(pts, base, h, [0, 0, 0], 0.5 + 1.5 * v); }); setAlpha(alpha, tumour, 1 - 0.3 * u); grow(alpha, dTum, clamp(u * 1.5)); grow(alpha, dNorm, clamp(u * 1.5 - 0.3)); return { caption: "3 · The dose delivered per gray is multiplied where the particles sit, without raising dose to surrounding tissue: a physical mechanism, so it works whatever the tumour's genotype" }; }
    const u = Q(t, 3); setAlpha(alpha, needle, 0); np.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [TUM[0] + 0.5, TUM[1] + 0.45, 0.2], npAt(i), 1); }); setAlpha(alpha, xray, 0.5); setAlpha(alpha, tumour, 0.7); show(alpha, 0.7, dTum, dNorm);
    setAlpha(alpha, gap, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, trial, clamp(u * 2 - 0.6));
    return { caption: "4 · NBTXR3 has a randomised soft-tissue sarcoma study behind it and head and neck work ongoing; distribution inside the tumour is uneven, benefit beyond the injected site is unproven, and true radiodynamic constructs remain early phase" };
  });
}

// ---------------------------------------------------------------- 4. State (Arc Institute perturbation model)
export function stateArc(): Mesh {
  const sc = scene();
  const CELL: Vec3 = [-2.1, 0.3, 0], MOD: Vec3 = [0, 0.3, 0];
  const c = put(sc, "cell", cell(0.6, "soft"), { at: CELL });
  put(sc, "nuc", sphere(0.22, 3, 8, "soft"), { at: CELL });
  const mod = put(sc, "model", model(1.5, 1.1, "accent"), { at: MOD });
  const drug = put(sc, "drug", capsule(1.2, "hot"), { at: [-2.1, 1.7, 0] });
  const ko = put(sc, "ko", cross([-2.1, 1.7, 0.05], 0.16));
  const ctx: Part[] = []; for (let i = 0; i < 4; i++) ctx.push(put(sc, `ctx${i}`, small(0.06, "soft"), { at: [CELL[0] + 0.5, CELL[1], 0.1] }));
  const AX: Vec3 = [1.4, -0.6, 0];
  put(sc, "axes", axes(AX, 1.9, 1.6));
  const before: Part[] = []; const after: Part[] = [];
  const h0 = [0.5, 1.1, 0.7, 0.9, 0.4], h1 = [1.2, 0.4, 0.75, 0.3, 1.0];
  for (let i = 0; i < 5; i++) { before.push(put(sc, `b${i}`, bar(AX[0] + 0.3 + 0.35 * i, h0[i], 0.18, "soft"), { at: [0, AX[1], 0] })); after.push(put(sc, `a${i}`, bar(AX[0] + 0.3 + 0.35 * i, h1[i], 0.18, "hot"), { at: [0, AX[1], 0.05] })); }
  const dish = put(sc, "dish", cylinder(0.5, 0.12, 12, 2, "soft", true, true), { at: [-2.1, -1.5, 0] });
  const dishCells = put(sc, "dishCells", cloud(7, 0.32, "hot", 4), { at: [-2.1, -1.42, 0] });
  const body = put(sc, "body", figure("soft"), { at: [-0.6, -1.4, 0], scale: 0.6 });
  const bodyQ = put(sc, "bodyQ", ring(0.3, 10, "hot", "z"), { at: [-0.6, -1.0, 0.1] });
  sc.mesh.labels = [L([CELL[0], CELL[1] - 1.0, 0], "Cell and its context"), L([MOD[0], MOD[1] + 0.95, 0], "State: transformer trained on over 100M perturbed cells"), L([AX[0] + 1.0, AX[1] - 0.35, 0], "Predicted expression shift"), L([-1.4, -2.15, 0], "Cell-line data; transfer to patients unproven")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, drug, ko, ...ctx, ...after, dish, dishCells, body, bodyQ);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, c, 0.5 + 0.5 * pulse(t, 3)); before.forEach((b) => grow(alpha, b, clamp(u * 1.5))); return { caption: "1 · A cell has a resting gene expression profile; the question is how that profile will shift if a drug is applied or a gene knocked out" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, drug, 1); setAlpha(alpha, ko, 0.7); moveTo(pts, base, drug, [-2.1, 1.7, 0], [MOD[0] - 0.2, MOD[1] + 0.25, 0.3], clamp(u * 1.5)); ctx.forEach((p, i) => { const v = clamp(u * 1.5 - 0.1 * i); setAlpha(alpha, p, v > 0 ? 1 : 0); moveTo(pts, base, p, [CELL[0] + 0.5, CELL[1], 0.1], [MOD[0] - 0.4 + 0.2 * i, MOD[1] - 0.25, 0.3], v); }); setAlpha(alpha, mod, 0.5 + 0.5 * u); return { caption: "2 · State takes both the perturbation and the cell's context; its state-transition model was trained on more than 100M perturbed cells, including Tahoe-100M, alongside a cell-embedding model trained on 167M human cells" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, drug, 0.7); moveTo(pts, base, drug, [-2.1, 1.7, 0], [MOD[0] - 0.2, MOD[1] + 0.25, 0.3], 1); ctx.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [CELL[0] + 0.5, CELL[1], 0.1], [MOD[0] - 0.4 + 0.2 * i, MOD[1] - 0.25, 0.3], 1); }); setAlpha(alpha, mod, 0.6 + 0.4 * pulse(t, 5)); before.forEach((b) => setAlpha(alpha, b, 1 - 0.6 * u)); after.forEach((a, i) => grow(alpha, a, clamp(u * 1.5 - 0.1 * i))); return { caption: "3 · The 2025 preprint predicts the expression shift before anyone runs the experiment; it is the reference entry for Arc's Virtual Cell Challenge, and helps researchers prioritise which perturbations to test in cancer cell lines" }; }
    const u = Q(t, 3); setAlpha(alpha, drug, 0.7); moveTo(pts, base, drug, [-2.1, 1.7, 0], [MOD[0] - 0.2, MOD[1] + 0.25, 0.3], 1); ctx.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [CELL[0] + 0.5, CELL[1], 0.1], [MOD[0] - 0.4 + 0.2 * i, MOD[1] - 0.25, 0.3], 1); }); before.forEach((b) => setAlpha(alpha, b, 0.4)); after.forEach((a) => setAlpha(alpha, a, 1));
    setAlpha(alpha, dish, clamp(u * 2)); setAlpha(alpha, dishCells, clamp(u * 2 - 0.3)); setAlpha(alpha, body, clamp(u * 2 - 0.8) * 0.6); setAlpha(alpha, bodyQ, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · The training data come from cell lines in dishes, so transfer to tissues and patients in vivo is unproven, and benchmark work has shown that perturbation prediction is hard" };
  });
}

// ---------------------------------------------------------------- 5. high-dose intravenous vitamin C
export function highDoseVitaminC(): Mesh {
  const sc = scene();
  const TUM: Vec3 = [1.6, 0.1, 0];
  const tumour = put(sc, "tumour", cell(0.8, "hot"), { at: TUM });
  put(sc, "tNuc", sphere(0.28, 3, 8, "hot"), { at: TUM });
  const pills: Part[] = []; for (let i = 0; i < 3; i++) pills.push(put(sc, `pill${i}`, capsule(1.1, "accent"), { at: [-2.4 + 0.45 * i, 1.5, 0] }));
  const pillX = put(sc, "pillX", cross([-1.95, 1.5, 0.12], 0.3));
  const bagP = put(sc, "bag", vial(0.28, 0.8, "accent"), { at: [-2.2, -0.1, 0] });
  const lineP = put(sc, "line", polyline([[-2.2, -0.5, 0], [-2.2, -1.1, 0], [-0.4, -1.1, 0], [TUM[0] - 0.9, TUM[1] - 0.4, 0]], "accent"));
  const drops: Part[] = []; for (let i = 0; i < 4; i++) drops.push(put(sc, `drop${i}`, small(0.06, "accent"), { at: [-2.2, -0.5, 0] }));
  const c0 = put(sc, "c0", bar(-0.9, 0.15, 0.25, "soft"), { at: [0, 0.4, 0] });
  const c1 = put(sc, "c1", bar(-0.5, 1.5, 0.25, "accent"), { at: [0, 0.4, 0] });
  const h2o2: Part[] = []; for (let i = 0; i < 6; i++) h2o2.push(put(sc, `h${i}`, octahedron(0.08, "accent"), { at: [TUM[0] - 0.9, TUM[1] - 0.4, 0] }));
  const dmg = put(sc, "dmg", dots([[TUM[0] - 0.2, TUM[1] + 0.2, 0.4], [TUM[0] + 0.2, TUM[1], 0.4], [TUM[0], TUM[1] - 0.25, 0.4]], "accent"));
  const trial = put(sc, "trial", doc(0.7, 0.8, 4, "accent"), { at: [1.0, -1.6, 0] });
  const trialQ = put(sc, "trialQ", ring(0.5, 12, "hot", "z"), { at: [1.0, -1.6, 0.05] });
  const warn = put(sc, "warn", polyline([[2.3, -1.9, 0], [2.7, -1.2, 0], [3.1, -1.9, 0]], "hot", true));
  sc.mesh.labels = [L([-1.9, 2.0, 0], "Oral 10 g: no benefit in two Mayo Clinic trials"), L([-2.2, 0.55, 0], "Intravenous ascorbate: plasma levels 100-fold higher"), L([TUM[0], TUM[1] + 1.2, 0], "Hydrogen peroxide in the extracellular space"), L([1.9, -2.3, 0], "Iowa 2024 phase 2 needs confirmation; avoid in G6PD deficiency")];
  const base = sc.mesh.points;
  const PATH: Vec3[] = [[-2.2, -0.5, 0], [-2.2, -1.1, 0], [-0.4, -1.1, 0], [TUM[0] - 0.9, TUM[1] - 0.4, 0]];
  return frame(sc, 13, (t, pts, alpha) => {
    const drop = (p: Part, i: number, a: number) => { const v = (t * 3 + i / 4) % 1; setAlpha(alpha, p, a); const seg = Math.min(2, Math.floor(v * 3)), w = v * 3 - seg; moveTo(pts, base, p, PATH[0], lerp3(PATH[seg], PATH[seg + 1], w), 1); };
    hide(alpha, pillX, bagP, lineP, ...drops, c0, c1, ...h2o2, dmg, trial, trialQ, warn);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); pills.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [-2.4 + 0.45 * i, 1.5, 0], [TUM[0] - 1.0, TUM[1] + 0.6, 0], clamp(u * 2 - 0.2 * i) * 0.5); }); setAlpha(alpha, pillX, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, tumour, 1); return { caption: "1 · Linus Pauling claimed 10 g of oral vitamin C prolonged survival; two double-blind randomised Mayo Clinic trials (1979 and NEJM 1985) found no benefit, and oral dosing is definitively ineffective" }; }
    if (s === 1) { const u = Q(t, 1); pills.forEach((p, i) => { setAlpha(alpha, p, 0.4); moveTo(pts, base, p, [-2.4 + 0.45 * i, 1.5, 0], [TUM[0] - 1.0, TUM[1] + 0.6, 0], 0.5); }); setAlpha(alpha, pillX, 0.6); setAlpha(alpha, bagP, 1); setAlpha(alpha, lineP, clamp(u * 2)); drops.forEach((p, i) => drop(p, i,clamp(u * 2 - 0.5))); grow(alpha, c0, clamp(u * 2)); grow(alpha, c1, clamp(u * 2 - 0.8)); return { caption: "2 · Intravenous ascorbate reaches plasma concentrations 100-fold higher than oral dosing, into the millimolar range where it stops acting as an antioxidant and becomes a pro-oxidant" }; }
    if (s === 2) { const u = Q(t, 2); pills.forEach((p, i) => { setAlpha(alpha, p, 0.4); moveTo(pts, base, p, [-2.4 + 0.45 * i, 1.5, 0], [TUM[0] - 1.0, TUM[1] + 0.6, 0], 0.5); }); setAlpha(alpha, pillX, 0.6); setAlpha(alpha, bagP, 1); setAlpha(alpha, lineP, 1); drops.forEach((p, i) => drop(p, i,1)); show(alpha, 1, c0, c1); h2o2.forEach((h, i) => { const v = clamp(u * 1.5 - 0.1 * i); setAlpha(alpha, h, v > 0 ? 1 : 0); moveTo(pts, base, h, [TUM[0] - 0.9, TUM[1] - 0.4, 0], [TUM[0] - 0.5 + 0.25 * (i % 3), TUM[1] - 0.5 + 0.35 * Math.floor(i / 3), 0.5], v, 1, v * 4); }); setAlpha(alpha, dmg, clamp(u * 2 - 1)); setAlpha(alpha, tumour, 1 - 0.3 * clamp(u * 2 - 1)); return { caption: "3 · At those levels ascorbate autoxidises and generates hydrogen peroxide outside the cell, selectively toxic to cells with low catalase and high labile iron, features of some tumours; phase 1 and small phase 2 trials show it is safe alongside chemotherapy and radiotherapy" }; }
    const u = Q(t, 3); pills.forEach((p, i) => { setAlpha(alpha, p, 0.4); moveTo(pts, base, p, [-2.4 + 0.45 * i, 1.5, 0], [TUM[0] - 1.0, TUM[1] + 0.6, 0], 0.5); }); setAlpha(alpha, pillX, 0.6); setAlpha(alpha, bagP, 1); setAlpha(alpha, lineP, 1); drops.forEach((p, i) => drop(p, i,0.6)); show(alpha, 0.7, c0, c1); h2o2.forEach((h, i) => { setAlpha(alpha, h, 0.7); moveTo(pts, base, h, [TUM[0] - 0.9, TUM[1] - 0.4, 0], [TUM[0] - 0.5 + 0.25 * (i % 3), TUM[1] - 0.5 + 0.35 * Math.floor(i / 3), 0.5], 1, 1, 4); }); setAlpha(alpha, dmg, 0.7); setAlpha(alpha, tumour, 0.7);
    setAlpha(alpha, trial, clamp(u * 2)); setAlpha(alpha, trialQ, clamp(u * 2 - 0.7) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, warn, clamp(u * 2 - 1));
    return { caption: "4 · A small randomised phase 2 in metastatic pancreatic cancer (Iowa, 2024) reported longer survival added to gemcitabine and nab-paclitaxel and needs confirmation; NCI PDQ calls efficacy evidence insufficient, and high doses are contraindicated in G6PD deficiency and renal impairment" };
  });
}

// ---------------------------------------------------------------- 6. intratumoural gene electrotransfer (IL-12 plasmid)
export function il12Electroporation(): Mesh {
  const sc = scene();
  const TUM: Vec3 = [0, -0.1, 0];
  const tumour = put(sc, "tumour", blob(1.0, "hot"), { at: TUM });
  const cells: Part[] = []; const CP: Vec3[] = [[-0.45, 0.25, 0.3], [0.4, 0.3, 0.3], [0, -0.45, 0.3], [-0.3, -0.2, 0.35], [0.45, -0.3, 0.3]];
  CP.forEach((p, i) => cells.push(put(sc, `c${i}`, small(0.16, "hot"), { at: [TUM[0] + p[0], TUM[1] + p[1], p[2]] })));
  const N0: Vec3 = [-2.4, 1.7, 0];
  const needle = put(sc, "needle", syringe(0.7, "accent"), { at: N0, rotZ: -Math.PI * 0.25 });
  const plasmids: Part[] = []; for (let i = 0; i < 5; i++) plasmids.push(put(sc, `pl${i}`, ring(0.09, 8, "accent", "z"), { at: [TUM[0] - 0.5, TUM[1] + 0.6, 0.4] }));
  const e0 = put(sc, "e0", box(0.1, 1.4, 0.5, "accent", true), { at: [TUM[0] - 1.3, TUM[1], 0] });
  const e1 = put(sc, "e1", box(0.1, 1.4, 0.5, "accent", true), { at: [TUM[0] + 1.3, TUM[1], 0] });
  const pulses: Part[] = []; for (let i = 0; i < 4; i++) pulses.push(put(sc, `pu${i}`, line([TUM[0] - 1.2, TUM[1] - 0.5 + 0.33 * i, 0.1], [TUM[0] + 1.2, TUM[1] - 0.5 + 0.33 * i, 0.1], "accent")));
  const il12: Part[] = []; for (let i = 0; i < 8; i++) il12.push(put(sc, `il${i}`, mote(0.05, "accent"), { at: [TUM[0] + CP[i % 5][0], TUM[1] + CP[i % 5][1], 0.4] }));
  const tcells: Part[] = []; const T0: Vec3[] = [[-2.6, -1.6, 0], [2.6, -1.5, 0], [2.4, 1.6, 0]];
  T0.forEach((p, i) => tcells.push(put(sc, `t${i}`, blob(0.22, "soft"), { at: p })));
  const distant = put(sc, "distant", blob(0.4, "hot"), { at: [2.4, -0.9, 0] });
  const dShrink = put(sc, "dShrink", ring(0.5, 12, "accent", "z"), { at: [2.4, -0.9, 0.05] });
  const stall = put(sc, "stall", cross([-2.3, -1.6, 0.1], 0.25));
  sc.mesh.labels = [L([TUM[0], TUM[1] + 1.65, 0], "Plasmid encoding IL-12 (tavokinogene telseplasmid)"), L([TUM[0] - 1.3, TUM[1] - 1.05, 0], "Short electric pulses open membranes"), L([2.4, -0.3, 0], "Uninjected lesion responds with pembrolizumab"), L([-2.3, -2.1, 0], "Sponsor programmes stalled")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...plasmids, e0, e1, ...pulses, ...il12, ...tcells, distant, dShrink, stall);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); moveTo(pts, base, needle, N0, [TUM[0] - 0.85, TUM[1] + 0.95, 0], clamp(u * 2)); plasmids.forEach((p, i) => { const v = clamp(u * 2 - 1 - 0.08 * i); setAlpha(alpha, p, v > 0 ? 1 : 0); moveTo(pts, base, p, [TUM[0] - 0.5, TUM[1] + 0.6, 0.4], [TUM[0] + CP[i][0] + 0.25, TUM[1] + CP[i][1] + 0.2, 0.5], v); }); return { caption: "1 · Instead of infusing IL-12 into the bloodstream, whose toxicity killed intravenous IL-12, the gene for the cytokine is injected as cheap plasmid DNA straight into an accessible tumour" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, needle, 0); plasmids.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [TUM[0] - 0.5, TUM[1] + 0.6, 0.4], [TUM[0] + CP[i][0] + 0.25 * (1 - u), TUM[1] + CP[i][1] + 0.2 * (1 - u), 0.5], 1); }); show(alpha, 1, e0, e1); pulses.forEach((p, i) => setAlpha(alpha, p, clamp(u * 3) * ((Math.floor(t * 40 + i) % 2) === 0 ? 1 : 0.1))); return { caption: "2 · A specialised applicator delivers short electric pulses that transiently permeabilise cell membranes, so the plasmid enters tumour cells that would never take it up on their own" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, needle, 0); plasmids.forEach((p, i) => { setAlpha(alpha, p, 0.6); moveTo(pts, base, p, [TUM[0] - 0.5, TUM[1] + 0.6, 0.4], [TUM[0] + CP[i][0], TUM[1] + CP[i][1], 0.5], 1); }); show(alpha, 0.5, e0, e1); il12.forEach((p, i) => { const v = (t * 3 + i / 8) % 1; setAlpha(alpha, p, u * (1 - v)); movePart(pts, base, p, [0.9 * v * Math.cos(i * 2.4), 0.9 * v * Math.sin(i * 2.4), 0], 1); }); tcells.forEach((tc, i) => { setAlpha(alpha, tc, 1); moveTo(pts, base, tc, T0[i], [TUM[0] + 1.25 * Math.cos(i * 2.1 - 0.5), TUM[1] + 1.25 * Math.sin(i * 2.1 - 0.5), 0.2], clamp(u * 1.6 - 0.2 * i)); }); return { caption: "3 · The transfected cells secrete IL-12 locally, recruiting and activating T cells inside the tumour rather than flooding the whole body with cytokine" }; }
    const u = Q(t, 3); setAlpha(alpha, needle, 0); plasmids.forEach((p, i) => { setAlpha(alpha, p, 0.6); moveTo(pts, base, p, [TUM[0] - 0.5, TUM[1] + 0.6, 0.4], [TUM[0] + CP[i][0], TUM[1] + CP[i][1], 0.5], 1); }); show(alpha, 0.5, e0, e1); il12.forEach((p, i) => { const v = (t * 3 + i / 8) % 1; setAlpha(alpha, p, 0.6 * (1 - v)); movePart(pts, base, p, [0.9 * v * Math.cos(i * 2.4), 0.9 * v * Math.sin(i * 2.4), 0], 1); }); tcells.forEach((tc, i) => { setAlpha(alpha, tc, 1); moveTo(pts, base, tc, T0[i], [TUM[0] + 1.25 * Math.cos(i * 2.1 - 0.5), TUM[1] + 1.25 * Math.sin(i * 2.1 - 0.5), 0.2], 1); }); setAlpha(alpha, tumour, 1 - 0.3 * u);
    setAlpha(alpha, distant, clamp(u * 2) * (1 - 0.5 * clamp(u * 2 - 1))); movePart(pts, base, distant, [0, 0, 0], 1 - 0.4 * clamp(u * 2 - 1)); setAlpha(alpha, dShrink, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, stall, clamp(u * 2 - 1.2));
    return { caption: "4 · With pembrolizumab the approach produced systemic responses in anti-PD-1-refractory melanoma, including uninjected lesions, and Moffitt ran a neoadjuvant study with nivolumab; the sponsor's programmes stalled and there are no randomised efficacy data" };
  });
}

// ---------------------------------------------------------------- 7. Mirai (breast cancer risk from mammograms)
export function miraiRisk(): Mesh {
  const sc = scene();
  const MAM: Vec3 = [-2.1, 0.3, 0], MOD: Vec3 = [0, 0.3, 0];
  const film = put(sc, "film", quad(1.3, 1.5, "soft"), { at: MAM });
  put(sc, "breast", ellipsoid(0.45, 0.55, 0.05, 4, 10, "soft", true), { at: [MAM[0], MAM[1] - 0.05, 0.03] });
  const dens = put(sc, "dens", cloud(9, 0.3, "accent", 6), { at: [MAM[0] + 0.05, MAM[1], 0.06] });
  const mod = put(sc, "model", model(1.4, 1.1, "accent"), { at: MOD });
  const tiles: Part[] = []; for (let i = 0; i < 4; i++) tiles.push(put(sc, `tile${i}`, quad(0.25, 0.25, "accent"), { at: [MAM[0] - 0.3 + 0.2 * i, MAM[1] + 0.2 - 0.15 * i, 0.08] }));
  const dial = put(sc, "dial", torus(0.6, 0.06, 14, 5, "soft"), { at: [2.1, 0.3, 0], rotX: Math.PI / 2 });
  const hand0 = put(sc, "hand", line([2.1, 0.3, 0.05], [2.1, 0.85, 0.05], "hot"));
  const yrs = put(sc, "yrs", ticks(1.5, 2.7, -0.55, 5, "soft"));
  const m0 = put(sc, "m0", box(0.5, 0.5, 0.4, "soft", true), { at: [-2.5, -1.5, 0] });
  const m1 = put(sc, "m1", box(0.5, 0.5, 0.4, "hot", true), { at: [-1.7, -1.5, 0] });
  const eq = put(sc, "eq", polyline([[-2.5, -1.15, 0.1], [-2.1, -0.85, 0.1], [-1.7, -1.15, 0.1]], "accent"));
  const sites: Part[] = []; for (let i = 0; i < 7; i++) sites.push(put(sc, `site${i}`, building(0.35, 0.35, "soft"), { at: [-0.9 + 0.5 * i, -1.6, 0] }));
  const siteOk: Part[] = []; for (let i = 0; i < 7; i++) siteOk.push(put(sc, `sOk${i}`, tick([-0.9 + 0.5 * i, -1.15, 0.1], 0.1)));
  const trialDoc = put(sc, "trialDoc", doc(0.6, 0.7, 3, "accent"), { at: [2.6, -1.5, 0] });
  const trialQ = put(sc, "trialQ", ring(0.42, 12, "hot", "z"), { at: [2.6, -1.5, 0.05] });
  sc.mesh.labels = [L([MAM[0], MAM[1] + 1.05, 0], "Routine screening mammogram"), L([MOD[0], MOD[1] + 0.95, 0], "Mirai (MIT): device-conditional adversarial training"), L([2.1, 1.2, 0], "Five-year breast cancer risk"), L([0.5, -2.2, 0], "Seven hospitals, consistent across races and devices")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...tiles, hand0, m0, m1, eq, ...sites, ...siteOk, trialDoc, trialQ);
    setAlpha(alpha, mod, 0.5); setAlpha(alpha, dial, 0.5); setAlpha(alpha, yrs, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, film, 1); setAlpha(alpha, dens, 0.4 + 0.6 * u * pulse(t, 3)); return { caption: "1 · A standard screening mammogram holds more information than the presence or absence of a visible lesion: texture and density patterns that relate to future risk" }; }
    if (s === 1) { const u = Q(t, 1); tiles.forEach((p, i) => { const v = clamp(u * 1.6 - 0.15 * i); setAlpha(alpha, p, v > 0 ? 1 : 0); moveTo(pts, base, p, [MAM[0] - 0.3 + 0.2 * i, MAM[1] + 0.2 - 0.15 * i, 0.08], [MOD[0] - 0.5, MOD[1] + 0.3 - 0.2 * i, 0.3], v); }); setAlpha(alpha, mod, 0.5 + 0.5 * u); return { caption: "2 · A deep-learning model reads the whole image; device-conditional adversarial training strips out the signature of the mammography machine so predictions do not shift between scanners" }; }
    if (s === 2) { const u = Q(t, 2); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.6); moveTo(pts, base, p, [MAM[0] - 0.3 + 0.2 * i, MAM[1] + 0.2 - 0.15 * i, 0.08], [MOD[0] - 0.5, MOD[1] + 0.3 - 0.2 * i, 0.3], 1); }); setAlpha(alpha, mod, 1); setAlpha(alpha, dial, 1); setAlpha(alpha, yrs, 1); setAlpha(alpha, hand0, 1); movePart(pts, base, hand0, [0, 0, 0], 1, -1.9 * u); return { caption: "3 · The output is an estimated five-year breast cancer risk; the Science Translational Medicine 2021 paper validated it across seven hospitals in several countries with consistent performance across races and devices" }; }
    const u = Q(t, 3); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.6); moveTo(pts, base, p, [MAM[0] - 0.3 + 0.2 * i, MAM[1] + 0.2 - 0.15 * i, 0.08], [MOD[0] - 0.5, MOD[1] + 0.3 - 0.2 * i, 0.3], 1); }); setAlpha(alpha, mod, 1); setAlpha(alpha, dial, 1); setAlpha(alpha, yrs, 1); setAlpha(alpha, hand0, 1); movePart(pts, base, hand0, [0, 0, 0], 1, -1.9);
    show(alpha, clamp(u * 2), m0, m1); setAlpha(alpha, eq, clamp(u * 2 - 0.5)); cascade(alpha, sites, clamp(u * 1.5)); cascade(alpha, siteOk, clamp(u * 1.5 - 0.2)); setAlpha(alpha, trialDoc, clamp(u * 2 - 1)); setAlpha(alpha, trialQ, clamp(u * 2 - 1.2) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Risk-adapted screening trials use it to decide who might need supplemental imaging or shorter intervals; its prospective effect on detection and outcomes is still under study, so it complements established risk models rather than replacing them" };
  });
}

// ---------------------------------------------------------------- 8. transoral robotic surgery (TORS)
export function torsSurgery(): Mesh {
  const sc = scene();
  const HEAD: Vec3 = [-0.6, 0.4, 0];
  const head = put(sc, "head", organ(1.1, 1.3, 0.9, "soft"), { at: HEAD });
  put(sc, "jaw", polyline([[HEAD[0] - 0.9, HEAD[1] - 0.6, 0.3], [HEAD[0] - 0.3, HEAD[1] - 1.05, 0.3], [HEAD[0] + 0.6, HEAD[1] - 1.05, 0.3]], "soft"));
  const mouth = put(sc, "mouth", ellipsoid(0.32, 0.14, 0.1, 3, 8, "soft"), { at: [HEAD[0] - 1.05, HEAD[1] - 0.45, 0.2] });
  const tumour = put(sc, "tumour", blob(0.28, "hot"), { at: [HEAD[0] + 0.15, HEAD[1] - 0.5, 0.3] });
  const saw = put(sc, "saw", polyline([[HEAD[0] - 0.7, HEAD[1] - 1.6, 0.3], [HEAD[0] - 0.4, HEAD[1] - 0.9, 0.3]], "hot"));
  const sawX = put(sc, "sawX", cross([HEAD[0] - 0.55, HEAD[1] - 1.3, 0.35], 0.22));
  const A0: Vec3 = [-3.0, -0.2, 0.2];
  const arm0 = put(sc, "arm0", polyline([[0, 0, 0], [1.0, 0.1, 0], [1.9, -0.05, 0]], "accent"), { at: A0 });
  const arm1 = put(sc, "arm1", polyline([[0, -0.2, 0.15], [1.0, -0.1, 0.15], [1.9, -0.15, 0.15]], "accent"), { at: A0 });
  const scope = put(sc, "scope", cylinder(0.06, 1.9, 6, 2, "accent", true, true), { at: [A0[0] + 0.95, A0[1] + 0.2, 0.05], rotZ: Math.PI / 2 });
  const console0 = put(sc, "console", box(0.7, 0.9, 0.5, "accent", true), { at: [-3.0, -1.3, 0] });
  const path = put(sc, "path", doc(0.6, 0.7, 3, "accent"), { at: [1.6, 0.9, 0] });
  const margin = put(sc, "margin", ring(0.4, 12, "accent", "z"), { at: [HEAD[0] + 0.15, HEAD[1] - 0.5, 0.35] });
  const rtBeam = put(sc, "rt", beam([2.9, -0.4, 0], [1.4, -0.6, 0], 0.3, "soft"));
  const rtX = put(sc, "rtX", cross([2.3, -0.5, 0.1], 0.2));
  const orator = put(sc, "orator", bar(1.5, 0.8, 0.25, "soft"), { at: [0, -2.2, 0] });
  const orator2 = put(sc, "orator2", bar(1.9, 0.8, 0.25, "hot"), { at: [0, -2.2, 0] });
  const warn = put(sc, "warn", polyline([[2.4, -2.2, 0], [2.7, -1.6, 0], [3.0, -2.2, 0]], "hot", true));
  sc.mesh.labels = [L([HEAD[0], HEAD[1] + 1.55, 0], "Oropharynx: T1-T2 tumour, often HPV-positive"), L([-3.0, 0.5, 0.2], "Da Vinci or Flex arms through a mouth retractor"), L([2.0, 1.5, 0], "Pathology guides adjuvant de-escalation (ECOG 3311)"), L([1.7, -2.6, 0], "ORATOR: swallowing favoured radiation; ORATOR2 halted")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, saw, sawX, arm0, arm1, scope, console0, path, margin, rtBeam, rtX, orator, orator2, warn);
    setAlpha(alpha, head, 0.6);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tumour, 0.5 + 0.5 * pulse(t, 4)); setAlpha(alpha, saw, clamp(u * 2)); setAlpha(alpha, sawX, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "1 · A tumour of the tonsil or tongue base once meant splitting the jaw (mandibulotomy) and often a tracheostomy to reach it, or a full course of radiation instead" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, sawX, 0.5); setAlpha(alpha, saw, 0.3); setAlpha(alpha, console0, 1); show(alpha, 1, arm0, arm1, scope); const dx = 1.05 * u; movePart(pts, base, arm0, [dx, 0, 0], 1); movePart(pts, base, arm1, [dx, 0, 0], 1); movePart(pts, base, scope, [dx, 0, 0], 1); setAlpha(alpha, mouth, 1); movePart(pts, base, mouth, [0, 0, 0], 1 + 0.5 * u); return { caption: "2 · FDA-cleared in 2009 for T1-T2 oropharyngeal tumours: robot instruments and a 3D endoscope pass through a mouth retractor, the surgeon operating from a console" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, sawX, 0.5); setAlpha(alpha, saw, 0.3); setAlpha(alpha, console0, 1); show(alpha, 1, arm0, arm1, scope); movePart(pts, base, arm0, [1.05, 0, 0], 1); movePart(pts, base, arm1, [1.05, 0, 0], 1); movePart(pts, base, scope, [1.05, 0, 0], 1); movePart(pts, base, mouth, [0, 0, 0], 1.5); setAlpha(alpha, margin, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, tumour, 1 - clamp(u * 2 - 0.5)); moveTo(pts, base, tumour, [HEAD[0] + 0.15, HEAD[1] - 0.5, 0.3], [1.6, 0.9, 0.1], clamp(u * 2 - 0.5)); setAlpha(alpha, path, clamp(u * 2 - 1)); return { caption: "3 · The tumour comes out with margins through the mouth; neck dissection is done separately, and the pathology report then decides how much adjuvant treatment is needed (ECOG 3311 tested this de-escalation)" }; }
    const u = Q(t, 3); setAlpha(alpha, sawX, 0.5); setAlpha(alpha, saw, 0.3); setAlpha(alpha, console0, 0.7); show(alpha, 0.7, arm0, arm1, scope); movePart(pts, base, arm0, [1.05, 0, 0], 1); movePart(pts, base, arm1, [1.05, 0, 0], 1); movePart(pts, base, scope, [1.05, 0, 0], 1); movePart(pts, base, mouth, [0, 0, 0], 1.5); setAlpha(alpha, tumour, 0); setAlpha(alpha, path, 1); setAlpha(alpha, margin, 0.5);
    setAlpha(alpha, rtBeam, clamp(u * 2) * 0.6); setAlpha(alpha, rtX, clamp(u * 2 - 0.5)); grow(alpha, orator, clamp(u * 2 - 0.4)); grow(alpha, orator2, clamp(u * 2 - 0.8)); setAlpha(alpha, warn, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Many patients avoid or reduce radiation, but ORATOR found comparable cancer outcomes with swallowing favouring radiation, ORATOR2 was halted after surgical deaths, and bleeding risk, selection and surgeon volume matter" };
  });
}

// ---------------------------------------------------------------- 9. Virchow / Virchow2 pathology foundation model
export function virchowModel(): Mesh {
  const sc = scene();
  const SL: Vec3 = [-2.2, 0.6, 0], MOD: Vec3 = [0, 0.3, 0];
  const sl = put(sc, "slide", slide("soft"), { at: SL });
  const stack: Part[] = []; for (let i = 1; i < 4; i++) stack.push(put(sc, `st${i}`, quad(1.2, 0.5, "soft"), { at: [SL[0] - 0.08 * i, SL[1] - 0.14 * i, -0.05 * i] }));
  const tiles: Part[] = []; for (let i = 0; i < 6; i++) tiles.push(put(sc, `tile${i}`, quad(0.22, 0.22, "hot"), { at: [SL[0] - 0.4 + 0.16 * i, SL[1], 0.06] }));
  const mag: Part[] = []; for (let i = 0; i < 3; i++) mag.push(put(sc, `mag${i}`, ring(0.12 + 0.1 * i, 10, "accent", "z"), { at: [SL[0] + 0.2, SL[1] - 1.1, 0] }));
  const mod = put(sc, "model", model(1.5, 1.2, "accent"), { at: MOD });
  const frozen = put(sc, "frozen", box(1.7, 1.4, 0.5, "soft"), { at: MOD });
  const heads: Part[] = []; const H0: Vec3[] = [[2.2, 1.1, 0], [2.2, 0.3, 0], [2.2, -0.5, 0]];
  H0.forEach((h, i) => heads.push(put(sc, `head${i}`, box(0.6, 0.4, 0.3, i === 0 ? "hot" : "accent", true), { at: h })));
  const links: Part[] = []; H0.forEach((h, i) => links.push(put(sc, `lk${i}`, arrow([MOD[0] + 0.8, MOD[1], 0], [h[0] - 0.35, h[1], 0], "soft", 0.1))));
  const p0 = put(sc, "p0", bar(-2.4, 0.6, 0.25, "soft"), { at: [0, -2.1, 0] });
  const p1 = put(sc, "p1", bar(-2.0, 1.0, 0.25, "accent"), { at: [0, -2.1, 0] });
  const p2 = put(sc, "p2", bar(-1.6, 1.4, 0.25, "hot"), { at: [0, -2.1, 0] });
  const lock = put(sc, "lock", ring(0.25, 10, "hot", "z"), { at: [0.9, -1.5, 0] });
  const lockBody = put(sc, "lockBody", box(0.4, 0.35, 0.2, "hot", true), { at: [0.9, -1.85, 0] });
  const shift = put(sc, "shift", quad(1.2, 0.5, "hot"), { at: [2.3, -1.7, 0] });
  sc.mesh.labels = [L([SL[0], SL[1] + 0.8, 0], "H&E slides: 1.5M for Virchow, 3.1M for Virchow2"), L([MOD[0], MOD[1] + 1.05, 0], "DINOv2 vision transformer, 632M to 1.9B parameters"), L([2.2, 1.6, 0], "Frozen encoder plus small task heads"), L([-2.0, -2.5, 0], "Proprietary weights; scanner and stain shift")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...tiles, ...mag, frozen, ...heads, ...links, p0, p1, p2, lock, lockBody, shift);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, sl, 1); stack.forEach((p, i) => setAlpha(alpha, p, clamp(u * 3 - i) * 0.6)); tiles.forEach((p, i) => setAlpha(alpha, p, clamp(u * 3 - 1 - 0.2 * i))); mag.forEach((m, i) => setAlpha(alpha, m, clamp(u * 3 - 2 - 0.2 * i))); return { caption: "1 · Millions of ordinary H&E slides from MSK and global sites are cut into tissue tiles at several magnifications; no labels are needed" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, sl, 0.7); stack.forEach((p) => setAlpha(alpha, p, 0.4)); mag.forEach((m) => setAlpha(alpha, m, 0.6)); tiles.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [SL[0] - 0.4 + 0.16 * i, SL[1], 0.06], [MOD[0] - 0.55 + 0.22 * (i % 3), MOD[1] + 0.3 - 0.4 * Math.floor(i / 3), 0.3], clamp(u * 1.5 - 0.1 * i)); }); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); return { caption: "2 · Self-supervised DINOv2 pretraining teaches a vision transformer to recognise tissue from the tiles alone: Virchow (2024) has 632M parameters from 1.5M slides, Virchow2 and 2G up to 1.9B parameters from 3.1M slides, trained with Microsoft compute" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, sl, 0.7); stack.forEach((p) => setAlpha(alpha, p, 0.4)); mag.forEach((m) => setAlpha(alpha, m, 0.6)); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [SL[0] - 0.4 + 0.16 * i, SL[1], 0.06], [MOD[0] - 0.55 + 0.22 * (i % 3), MOD[1] + 0.3 - 0.4 * Math.floor(i / 3), 0.3], 1); }); setAlpha(alpha, mod, 1); setAlpha(alpha, frozen, clamp(u * 2) * 0.8); cascade(alpha, links, clamp(u * 2 - 0.5)); cascade(alpha, heads, clamp(u * 2 - 0.7)); return { caption: "3 · The encoder is then frozen; small task heads on top detect cancer across tumour types and predict biomarkers from the H&E image, the basis of Paige's pan-cancer detection and biomarker products" }; }
    const u = Q(t, 3); setAlpha(alpha, sl, 0.7); stack.forEach((p) => setAlpha(alpha, p, 0.4)); mag.forEach((m) => setAlpha(alpha, m, 0.6)); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [SL[0] - 0.4 + 0.16 * i, SL[1], 0.06], [MOD[0] - 0.55 + 0.22 * (i % 3), MOD[1] + 0.3 - 0.4 * Math.floor(i / 3), 0.3], 1); }); setAlpha(alpha, mod, 1); setAlpha(alpha, frozen, 0.8); show(alpha, 1, ...links, ...heads);
    grow(alpha, p0, clamp(u * 2)); grow(alpha, p1, clamp(u * 2 - 0.3)); grow(alpha, p2, clamp(u * 2 - 0.6)); show(alpha, clamp(u * 2 - 0.8), lock, lockBody); setAlpha(alpha, shift, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 3)));
    return { caption: "4 · Scale and data diversity are the strengths and the weights are proprietary; like every slide model it is sensitive to scanner and stain shift when a new laboratory's slides look different from the training set" };
  });
}

// ---------------------------------------------------------------- 10. AlphaFold 3
export function alphafold3(): Mesh {
  const sc = scene();
  const MOD: Vec3 = [-1.2, -0.2, 0], OUT: Vec3 = [1.5, 0.1, 0];
  const seq = put(sc, "seq", ticks(-3.0, -1.8, 1.2, 9, "soft"));
  const dnaSeq = put(sc, "dnaSeq", helix(0.12, 0.9, 3, 24, "accent"), { at: [-1.4, 1.2, 0], rotZ: Math.PI / 2 });
  const lig = put(sc, "lig", octahedron(0.14, "hot", true), { at: [-0.6, 1.2, 0] });
  const trunk = put(sc, "trunk", model(1.3, 0.9, "accent"), { at: MOD });
  const diff = put(sc, "diff", box(1.1, 0.9, 0.4, "accent", true), { at: [0.35, -0.2, 0] });
  const atoms: Part[] = []; const N = 14;
  for (let i = 0; i < N; i++) atoms.push(put(sc, `at${i}`, mote(0.05, i % 4 === 0 ? "hot" : "soft"), { at: [OUT[0] + 1.3 * Math.cos(i * 2.4), OUT[1] + 1.3 * Math.sin(i * 1.7), 0.5 * Math.sin(i)] }));
  const atomTo = (i: number): Vec3 => [OUT[0] + 0.45 * Math.cos(i * 0.9) * (0.4 + 0.6 * Math.sin(i * 0.5 + 1)), OUT[1] + 0.45 * Math.sin(i * 0.9 * 0.8), 0.35 * Math.sin(i * 0.9)];
  const prot = put(sc, "prot", protein(0.75, "soft"), { at: OUT });
  const ligIn = put(sc, "ligIn", octahedron(0.14, "hot", true), { at: [OUT[0] + 0.25, OUT[1] - 0.1, 0.4] });
  const dnaOut = put(sc, "dnaOut", helix(0.14, 0.9, 3, 24, "accent"), { at: [OUT[0] + 0.75, OUT[1] + 0.35, 0.1] });
  const still = put(sc, "still", ring(1.0, 16, "soft", "z"), { at: OUT });
  const ab = put(sc, "ab", polyline([[2.6, -1.5, 0], [2.3, -1.1, 0], [2.0, -1.5, 0]], "hot"));
  const abQ = put(sc, "abQ", ring(0.28, 10, "hot", "z"), { at: [2.3, -1.4, 0.05] });
  const bench = put(sc, "bench", vial(0.14, 0.5, "accent"), { at: [-2.4, -1.5, 0] });
  const benchOk = put(sc, "benchOk", tick([-1.9, -1.45, 0.1], 0.16));
  sc.mesh.labels = [L([-1.8, 1.75, 0], "Protein, DNA, RNA, ions, small molecules and antibodies"), L([-0.4, -0.95, 0], "Pairformer trunk and diffusion module"), L([OUT[0], OUT[1] + 1.3, 0], "All-atom complex, generated jointly"), L([0.3, -2.0, 0], "Static structures; antibody-antigen accuracy still limited")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, prot, ligIn, dnaOut, still, ab, abQ, bench, benchOk);
    setAlpha(alpha, trunk, 0.5); setAlpha(alpha, diff, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); grow(alpha, seq, clamp(u * 1.5)); setAlpha(alpha, dnaSeq, clamp(u * 2 - 0.5)); setAlpha(alpha, lig, clamp(u * 2 - 1)); atoms.forEach((a, i) => movePart(pts, base, a, [0.15 * Math.sin(t * TAU * 2 + i), 0.15 * Math.cos(t * TAU * 2 + i * 1.3), 0], 1)); return { caption: "1 · The input is not one protein but a whole assembly: protein chains, DNA, RNA, ions, small molecules and antibodies, each given only as a sequence or chemical graph" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, seq, 1); setAlpha(alpha, dnaSeq, 1); setAlpha(alpha, lig, 1); moveTo(pts, base, seq, [-2.4, 1.2, 0], [MOD[0], MOD[1] + 0.2, 0.3], clamp(u * 1.5), 0.5); moveTo(pts, base, dnaSeq, [-1.4, 1.2, 0], [MOD[0] + 0.3, MOD[1], 0.3], clamp(u * 1.5 - 0.1), 0.6); moveTo(pts, base, lig, [-0.6, 1.2, 0], [MOD[0] + 0.4, MOD[1] - 0.2, 0.3], clamp(u * 1.5 - 0.2)); setAlpha(alpha, trunk, 0.5 + 0.5 * u * pulse(t, 5)); atoms.forEach((a, i) => movePart(pts, base, a, [0.15 * Math.sin(t * TAU * 2 + i), 0.15 * Math.cos(t * TAU * 2 + i * 1.3), 0], 1)); return { caption: "2 · A Pairformer trunk reasons about which parts of which molecules sit near each other, extending AlphaFold 2 from single proteins to complexes and ligands" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, seq, 0.6); setAlpha(alpha, dnaSeq, 0.6); setAlpha(alpha, lig, 0.6); moveTo(pts, base, seq, [-2.4, 1.2, 0], [MOD[0], MOD[1] + 0.2, 0.3], 1, 0.5); moveTo(pts, base, dnaSeq, [-1.4, 1.2, 0], [MOD[0] + 0.3, MOD[1], 0.3], 1, 0.6); moveTo(pts, base, lig, [-0.6, 1.2, 0], [MOD[0] + 0.4, MOD[1] - 0.2, 0.3], 1); setAlpha(alpha, trunk, 1); setAlpha(alpha, diff, 0.5 + 0.5 * pulse(t, 6)); atoms.forEach((a, i) => { const from: Vec3 = [OUT[0] + 1.3 * Math.cos(i * 2.4), OUT[1] + 1.3 * Math.sin(i * 1.7), 0.5 * Math.sin(i)]; moveTo(pts, base, a, from, atomTo(i), u); }); setAlpha(alpha, prot, clamp(u * 2 - 1) * 0.8); setAlpha(alpha, ligIn, clamp(u * 2 - 1.2)); setAlpha(alpha, dnaOut, clamp(u * 2 - 1.4)); return { caption: "3 · A diffusion module then generates every atom position jointly, denoising a random cloud into one all-atom structure of the complex, described in Nature 2024 by Google DeepMind and Isomorphic Labs" }; }
    const u = Q(t, 3); setAlpha(alpha, seq, 0.6); setAlpha(alpha, dnaSeq, 0.6); setAlpha(alpha, lig, 0.6); moveTo(pts, base, seq, [-2.4, 1.2, 0], [MOD[0], MOD[1] + 0.2, 0.3], 1, 0.5); moveTo(pts, base, dnaSeq, [-1.4, 1.2, 0], [MOD[0] + 0.3, MOD[1], 0.3], 1, 0.6); moveTo(pts, base, lig, [-0.6, 1.2, 0], [MOD[0] + 0.4, MOD[1] - 0.2, 0.3], 1); setAlpha(alpha, trunk, 1); setAlpha(alpha, diff, 1); atoms.forEach((a, i) => { const from: Vec3 = [OUT[0] + 1.3 * Math.cos(i * 2.4), OUT[1] + 1.3 * Math.sin(i * 1.7), 0.5 * Math.sin(i)]; moveTo(pts, base, a, from, atomTo(i), 1); }); setAlpha(alpha, prot, 0.8); setAlpha(alpha, ligIn, 1); setAlpha(alpha, dnaOut, 1);
    setAlpha(alpha, still, clamp(u * 2) * 0.5); setAlpha(alpha, ab, clamp(u * 2 - 0.4)); setAlpha(alpha, abQ, clamp(u * 2 - 0.7) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, bench, clamp(u * 2 - 1)); setAlpha(alpha, benchOk, clamp(u * 2 - 1.3));
    return { caption: "4 · Weights were released for academic use late in 2024 while Isomorphic uses successors commercially; predictions are static snapshots and antibody-antigen accuracy is still limited, so binder designs need experimental validation" };
  });
}

// ---------------------------------------------------------------- 11. Boltz-1 / Boltz-2
export function boltzModel(): Mesh {
  const sc = scene();
  const MOD: Vec3 = [-1.4, 0.2, 0], OUT: Vec3 = [1.3, 0.3, 0];
  const mod = put(sc, "model", model(1.4, 1.0, "accent"), { at: MOD });
  const atoms: Part[] = []; for (let i = 0; i < 12; i++) atoms.push(put(sc, `at${i}`, mote(0.05, i % 3 === 0 ? "hot" : "soft"), { at: [OUT[0] + 1.2 * Math.cos(i * 2.1), OUT[1] + 1.2 * Math.sin(i * 1.6), 0.4 * Math.sin(i)] }));
  const atomTo = (i: number): Vec3 => [OUT[0] + 0.4 * Math.cos(i * 1.1), OUT[1] + 0.4 * Math.sin(i * 0.9), 0.3 * Math.sin(i * 1.3)];
  const prot = put(sc, "prot", protein(0.7, "soft"), { at: OUT });
  const lock = put(sc, "lock", polyline([[-1.65, 1.35, 0], [-1.65, 1.6, 0], [-1.15, 1.6, 0], [-1.15, 1.35, 0]], "accent"));
  const lockBody = put(sc, "lockBody", box(0.6, 0.35, 0.2, "accent", true), { at: [-1.4, 1.2, 0] });
  const lig = put(sc, "lig", octahedron(0.13, "hot", true), { at: [-2.8, -1.3, 0] });
  const pocket = put(sc, "pocket", ring(0.22, 10, "hot", "z"), { at: [OUT[0] + 0.3, OUT[1] - 0.15, 0.4] });
  const aff = put(sc, "aff", axes([1.9, -1.9, 0], 1.1, 1.2));
  const affBar = put(sc, "affBar", bar(2.25, 0.9, 0.22, "hot"), { at: [0, -1.9, 0] });
  const fep = put(sc, "fep", bar(-2.2, 1.5, 0.28, "soft"), { at: [0, -2.0, 0] });
  const b2 = put(sc, "b2", bar(-1.7, 0.3, 0.28, "accent"), { at: [0, -2.0, 0] });
  const clock = put(sc, "clock", clockFace(0.3), { at: [-2.2, -0.2, 0] });
  const vary = put(sc, "vary", ring(0.55, 12, "hot", "z"), { at: [0.5, -1.4, 0.05] });
  const bench = put(sc, "bench", vial(0.13, 0.45, "accent"), { at: [0.5, -1.4, 0] });
  sc.mesh.labels = [L([MOD[0], MOD[1] + 1.95, 0], "Boltz-1 (2024): MIT licence, AlphaFold 3-level accuracy"), L([OUT[0], OUT[1] + 1.3, 0], "Proteins, nucleic acids, small molecules"), L([2.45, -2.3, 0], "Boltz-2 (2025) affinity head"), L([-1.95, -2.4, 0], "Compute: FEP versus Boltz-2")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, prot, lock, lockBody, lig, pocket, aff, affBar, fep, b2, clock, vary, bench);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); atoms.forEach((a, i) => moveTo(pts, base, a, [OUT[0] + 1.2 * Math.cos(i * 2.1), OUT[1] + 1.2 * Math.sin(i * 1.6), 0.4 * Math.sin(i)], atomTo(i), u)); setAlpha(alpha, prot, clamp(u * 2 - 1) * 0.8); return { caption: "1 · A diffusion model from MIT denoises atoms into a structure for proteins, nucleic acids and small molecules, reproducing AlphaFold 3-level accuracy" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, mod, 1); atoms.forEach((a, i) => moveTo(pts, base, a, [OUT[0] + 1.2 * Math.cos(i * 2.1), OUT[1] + 1.2 * Math.sin(i * 1.6), 0.4 * Math.sin(i)], atomTo(i), 1)); setAlpha(alpha, prot, 0.8); setAlpha(alpha, lockBody, clamp(u * 2)); setAlpha(alpha, lock, clamp(u * 2)); movePart(pts, base, lock, [0.15 * clamp(u * 2 - 1), 0.12 * clamp(u * 2 - 1), 0], 1, 0.5 * clamp(u * 2 - 1)); return { caption: "2 · Boltz-1 (2024) was released under the permissive MIT licence, so academic and commercial groups have a freely usable alternative to closed models" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, mod, 1); atoms.forEach((a, i) => moveTo(pts, base, a, [OUT[0] + 1.2 * Math.cos(i * 2.1), OUT[1] + 1.2 * Math.sin(i * 1.6), 0.4 * Math.sin(i)], atomTo(i), 1)); setAlpha(alpha, prot, 0.8); show(alpha, 0.7, lock, lockBody); movePart(pts, base, lock, [0.15, 0.12, 0], 1, 0.5); setAlpha(alpha, lig, 1); moveTo(pts, base, lig, [-2.8, -1.3, 0], [OUT[0] + 0.3, OUT[1] - 0.15, 0.45], clamp(u * 1.5), 1, u * 3); setAlpha(alpha, pocket, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, aff, clamp(u * 2 - 0.5)); grow(alpha, affBar, clamp(u * 2 - 1)); return { caption: "3 · Boltz-2 (2025), developed with Recursion, adds an affinity head that predicts how strongly a small molecule binds, which is what ranking candidate cancer drugs needs" }; }
    const u = Q(t, 3); setAlpha(alpha, mod, 1); atoms.forEach((a, i) => moveTo(pts, base, a, [OUT[0] + 1.2 * Math.cos(i * 2.1), OUT[1] + 1.2 * Math.sin(i * 1.6), 0.4 * Math.sin(i)], atomTo(i), 1)); setAlpha(alpha, prot, 0.8); show(alpha, 0.7, lock, lockBody, aff, affBar, pocket); movePart(pts, base, lock, [0.15, 0.12, 0], 1, 0.5); setAlpha(alpha, lig, 1); moveTo(pts, base, lig, [-2.8, -1.3, 0], [OUT[0] + 0.3, OUT[1] - 0.15, 0.45], 1, 1, 3);
    grow(alpha, fep, clamp(u * 2)); grow(alpha, b2, clamp(u * 2 - 0.5)); setAlpha(alpha, clock, clamp(u * 2 - 0.3)); setAlpha(alpha, vary, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, bench, clamp(u * 2 - 1));
    return { caption: "4 · It approaches the accuracy of physics-based free energy perturbation at a fraction of the compute cost, but affinity accuracy varies by target class, so a new protein family still needs experimental confirmation" };
  });
}

// ---------------------------------------------------------------- 12. Chai-1 / Chai-2
export function chaiModel(): Mesh {
  const sc = scene();
  const TGT: Vec3 = [-1.6, 0.2, 0];
  const target = put(sc, "target", protein(0.85, "soft"), { at: TGT });
  const epitope = put(sc, "epitope", blob(0.22, "hot"), { at: [TGT[0] + 0.7, TGT[1] + 0.25, 0.3] });
  const mod = put(sc, "model", model(1.2, 0.9, "accent"), { at: [0.9, 1.3, 0] });
  const abs: Part[] = []; for (let i = 0; i < 6; i++) abs.push(put(sc, `ab${i}`, polyline([[-0.2, -0.25, 0], [0, 0, 0], [0.2, -0.25, 0], [0, 0, 0], [0, 0.3, 0]], i === 1 ? "hot" : "accent"), { at: [1.0 + 0.5 * (i % 3), -0.7 - 0.6 * Math.floor(i / 3), 0], scale: 0.7 }));
  const hits: Part[] = []; for (let i = 0; i < 6; i++) hits.push(put(sc, `hit${i}`, i === 1 ? tick([1.0 + 0.5 * (i % 3) + 0.25, -0.5 - 0.6 * Math.floor(i / 3), 0.05], 0.09) : cross([1.0 + 0.5 * (i % 3) + 0.25, -0.5 - 0.6 * Math.floor(i / 3), 0.05], 0.07, "soft")));
  const bound = put(sc, "bound", polyline([[-0.2, -0.25, 0], [0, 0, 0], [0.2, -0.25, 0], [0, 0, 0], [0, 0.3, 0]], "hot"), { at: [TGT[0] + 0.7, TGT[1] + 0.25, 0.35], rotZ: -Math.PI / 2, scale: 0.7 });
  const lockOpen = put(sc, "lockOpen", box(0.5, 0.3, 0.2, "accent", true), { at: [-1.6, 1.6, 0] });
  const lockArc = put(sc, "lockArc", polyline([[-1.8, 1.75, 0], [-1.8, 2.0, 0], [-1.4, 2.0, 0], [-1.4, 1.75, 0]], "accent"), { at: [0.12, 0.08, 0], rotZ: 0.4 });
  const wells = put(sc, "wells", cylinder(0.55, 0.12, 12, 2, "soft", true, true), { at: [2.4, 0.4, 0] });
  const repl = put(sc, "repl", ring(0.7, 14, "hot", "z"), { at: [2.4, 0.4, 0.1] });
  const dev = put(sc, "dev", doc(0.5, 0.6, 3, "hot"), { at: [-2.6, -1.5, 0] });
  const devQ = put(sc, "devQ", ring(0.42, 12, "hot", "z"), { at: [-2.6, -1.5, 0.05] });
  sc.mesh.labels = [L([TGT[0], TGT[1] - 1.25, 0], "Target with a chosen epitope"), L([0.9, 2.05, 0], "Chai-1 (2024) open weights; Chai-2 (2025) generative design"), L([1.5, -1.9, 0], "Roughly 16% zero-shot hit rate: about one in six binds"), L([2.4, 1.3, 0], "Independent replication pending")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...abs, ...hits, bound, lockOpen, lockArc, wells, repl, dev, devQ);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, target, 0.5 + 0.5 * clamp(u * 2)); setAlpha(alpha, lockOpen, clamp(u * 2 - 0.5)); setAlpha(alpha, lockArc, clamp(u * 2 - 0.5)); return { caption: "1 · Chai-1 (2024) is a diffusion model for biomolecular structure prediction released with open weights; it gives the target's structure to start from" }; }
    if (s === 1) { const u = Q(t, 1); show(alpha, 0.7, lockOpen, lockArc); setAlpha(alpha, epitope, 0.5 + 0.5 * u * pulse(t, 4)); movePart(pts, base, epitope, [0, 0, 0], 1 + 0.4 * u); setAlpha(alpha, mod, 0.5 + 0.5 * u); return { caption: "2 · Chai-2 (2025) adds generative design conditioned on a chosen epitope: the user points at a patch on the target and asks for antibodies and other binders from scratch" }; }
    if (s === 2) { const u = Q(t, 2); show(alpha, 0.7, lockOpen, lockArc); movePart(pts, base, epitope, [0, 0, 0], 1.4); setAlpha(alpha, mod, 1); abs.forEach((a, i) => { const v = clamp(u * 1.5 - 0.12 * i); setAlpha(alpha, a, v > 0 ? 1 : 0); moveTo(pts, base, a, [0.9, 1.3, 0.2], [1.0 + 0.5 * (i % 3), -0.7 - 0.6 * Math.floor(i / 3), 0], v); }); setAlpha(alpha, wells, clamp(u * 2 - 1)); return { caption: "3 · Dozens of targets went to the wet lab; roughly 16% of the computer-designed binders bound their target zero-shot, without experimental optimisation, about one attempt in six" }; }
    const u = Q(t, 3); show(alpha, 0.7, lockOpen, lockArc); movePart(pts, base, epitope, [0, 0, 0], 1.4); setAlpha(alpha, mod, 1); abs.forEach((a, i) => { setAlpha(alpha, a, 1); moveTo(pts, base, a, [0.9, 1.3, 0.2], [1.0 + 0.5 * (i % 3), -0.7 - 0.6 * Math.floor(i / 3), 0], 1); }); setAlpha(alpha, wells, 0.7); cascade(alpha, hits, clamp(u * 1.5));
    setAlpha(alpha, bound, clamp(u * 2 - 0.5)); setAlpha(alpha, repl, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, dev, clamp(u * 2 - 1)); setAlpha(alpha, devQ, clamp(u * 2 - 1.2) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Biologics teams want this for new antibodies against cancer antigens; independent replication of the hit rates is pending and the developability of the designed antibodies has not been reported" };
  });
}

// ---------------------------------------------------------------- 13. federated learning and privacy-preserving AI
export function federatedLearning(): Mesh {
  const sc = scene();
  const H: Vec3[] = [[-2.4, -0.9, 0], [0, -1.1, 0], [2.4, -0.9, 0]];
  const hosp: Part[] = []; H.forEach((h, i) => hosp.push(put(sc, `h${i}`, building(1.1, 1.0), { at: h })));
  const data: Part[] = []; H.forEach((h, i) => data.push(put(sc, `d${i}`, cloud(6 + i, 0.3, i === 1 ? "hot" : "accent", i + 2), { at: [h[0], h[1] - 0.05, 0.3] })));
  const vault: Part[] = []; H.forEach((h, i) => vault.push(put(sc, `v${i}`, ring(0.42, 12, "accent", "z"), { at: [h[0], h[1] - 0.05, 0.3] })));
  const SRV: Vec3 = [0, 1.5, 0];
  const server = put(sc, "server", model(1.3, 0.9, "accent"), { at: SRV });
  const copies: Part[] = []; H.forEach((h, i) => copies.push(put(sc, `c${i}`, box(0.4, 0.3, 0.2, "accent", true), { at: SRV })));
  const ups: Part[] = []; for (let i = 0; i < 6; i++) ups.push(put(sc, `u${i}`, mote(0.06, "accent"), { at: H[i % 3] }));
  const dataX = put(sc, "dataX", cross([0, 0.3, 0.1], 0.2));
  const shield = put(sc, "shield", polyline([[-0.45, 1.05, 0.3], [0.45, 1.05, 0.3], [0.45, 1.6, 0.3], [0, 2.0, 0.3], [-0.45, 1.6, 0.3]], "soft", true));
  const skew = put(sc, "skew", cloud(7, 0.32, "hot", 9), { at: [2.4, -0.95, 0.35] });
  const gov = put(sc, "gov", doc(0.55, 0.65, 3, "soft"), { at: [-2.5, 1.5, 0] });
  const it = put(sc, "it", screen(0.6, 0.4, "soft"), { at: [2.5, 1.5, 0] });
  sc.mesh.labels = [L([0, -1.95, 0], "Patient data stay at each hospital"), L([SRV[0], SRV[1] + 0.85, 0], "Shared model: NVIDIA FLARE, Owkin Substra, OpenFL"), L([0, 0.55, 0], "Only model updates travel"), L([2.4, -0.15, 0], "Non-identical data across sites")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...copies, ...ups, dataX, shield, skew, gov, it);
    setAlpha(alpha, server, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); data.forEach((d) => setAlpha(alpha, d, 0.5 + 0.5 * pulse(t, 3))); vault.forEach((v) => setAlpha(alpha, v, clamp(u * 2 - 0.5))); setAlpha(alpha, dataX, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "1 · Pathology and radiology models learn best from many hospitals, but patient data cannot simply be pooled in one place" }; }
    if (s === 1) { const u = Q(t, 1); vault.forEach((v) => setAlpha(alpha, v, 0.7)); setAlpha(alpha, dataX, 0.5); setAlpha(alpha, server, 1); copies.forEach((c, i) => { setAlpha(alpha, c, 1); moveTo(pts, base, c, SRV, [H[i][0], H[i][1] + 0.85, 0.3], clamp(u * 1.5 - 0.1 * i)); }); data.forEach((d) => setAlpha(alpha, d, 0.6 + 0.4 * clamp(u * 2 - 1) * pulse(t, 5))); return { caption: "2 · A copy of the shared model is sent to each institution and trained on the data held locally; the data never leave the building" }; }
    if (s === 2) { const u = Q(t, 2); vault.forEach((v) => setAlpha(alpha, v, 0.7)); setAlpha(alpha, dataX, 0.5); setAlpha(alpha, server, 0.7 + 0.3 * pulse(t, 5)); copies.forEach((c, i) => { setAlpha(alpha, c, 0.7); moveTo(pts, base, c, SRV, [H[i][0], H[i][1] + 0.85, 0.3], 1); }); ups.forEach((p, i) => { const v = (t * 3 + i / 6) % 1; setAlpha(alpha, p, u * (1 - 0.3 * v)); moveTo(pts, base, p, H[i % 3], [SRV[0], SRV[1] - 0.3, 0.3], v); }); setAlpha(alpha, shield, clamp(u * 2 - 0.5)); return { caption: "3 · Only model updates travel back to be aggregated; differential privacy, synthetic data and trusted execution environments limit what those updates could reveal, as in Owkin-led projects and the MELLODDY pharma consortium" }; }
    const u = Q(t, 3); vault.forEach((v) => setAlpha(alpha, v, 0.7)); setAlpha(alpha, dataX, 0.5); setAlpha(alpha, server, 1); copies.forEach((c, i) => { setAlpha(alpha, c, 0.7); moveTo(pts, base, c, SRV, [H[i][0], H[i][1] + 0.85, 0.3], 1); }); ups.forEach((p, i) => { const v = (t * 3 + i / 6) % 1; setAlpha(alpha, p, 0.6 * (1 - 0.3 * v)); moveTo(pts, base, p, H[i % 3], [SRV[0], SRV[1] - 0.3, 0.3], v); }); setAlpha(alpha, shield, 0.7);
    setAlpha(alpha, skew, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, gov, clamp(u * 2 - 0.5)); setAlpha(alpha, it, clamp(u * 2 - 1));
    return { caption: "4 · The catch is that each site's data look different, so validation on heterogeneous data, governance overhead and the need for local IT capacity are the practical challenges" };
  });
}

// ---------------------------------------------------------------- 14. Geneformer
export function geneformer(): Mesh {
  const sc = scene();
  const CELL: Vec3 = [-2.3, 0.6, 0];
  const c = put(sc, "cell", cell(0.6, "soft"), { at: CELL });
  put(sc, "nuc", sphere(0.22, 3, 8, "soft"), { at: CELL });
  const ranks: Part[] = []; const H = [1.2, 1.0, 0.85, 0.7, 0.55, 0.4, 0.28];
  H.forEach((h, i) => ranks.push(put(sc, `r${i}`, bar(-1.1 + 0.3 * i, h, 0.18, i === 3 ? "hot" : "accent"), { at: [0, -0.5, 0] })));
  const mask = put(sc, "mask", quad(0.26, 0.8, "soft"), { at: [-1.1 + 0.9, -0.1, 0.12] });
  const mod = put(sc, "model", model(1.3, 0.9, "accent"), { at: [1.9, 0.6, 0] });
  const AX: Vec3 = [0.9, -2.2, 0];
  const emb = put(sc, "emb", axes(AX, 1.9, 1.2));
  const state0 = put(sc, "s0", small(0.1, "soft"), { at: [AX[0] + 0.5, AX[1] + 0.4, 0] });
  const state1 = put(sc, "s1", small(0.1, "hot"), { at: [AX[0] + 0.5, AX[1] + 0.4, 0] });
  const del = put(sc, "del", cross([-1.1 + 0.9, -0.5 + 0.35, 0.15], 0.14));
  const tgt = put(sc, "tgt", ring(0.28, 10, "hot", "z"), { at: [-1.1 + 0.9, -0.5 + 0.35, 0.15] });
  const lin = put(sc, "lin", line([-2.9, -1.9, 0], [-1.5, -1.4, 0], "soft"));
  const linQ = put(sc, "linQ", ring(0.32, 10, "hot", "z"), { at: [-2.2, -1.65, 0.05] });
  sc.mesh.labels = [L([CELL[0], CELL[1] + 0.95, 0], "One cell: genes ranked by expression"), L([1.9, 1.35, 0], "Transformer, masked learning, about 30M cells (later 95M)"), L([AX[0] + 1.0, AX[1] - 0.3, 0], "In silico deletion moves the cell state"), L([-2.2, -2.2, 0], "Rank encoding loses magnitude; modest gains over linear baselines")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, mask, emb, state0, state1, del, tgt, lin, linQ);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, c, 0.6 + 0.4 * pulse(t, 3)); ranks.forEach((r, i) => grow(alpha, r, clamp(u * 1.6 - 0.1 * i))); return { caption: "1 · Each single cell is encoded not as expression values but as a ranked list of its genes, most expressed first" }; }
    if (s === 1) { const u = Q(t, 1); ranks.forEach((r) => setAlpha(alpha, r, 1)); setAlpha(alpha, mask, clamp(u * 2) * 0.9); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); setAlpha(alpha, ranks[3], 1 - 0.7 * clamp(u * 2)); return { caption: "2 · Genes are masked and the transformer learns to predict them from context, so gene-gene relationships are captured without any labels; the Nature 2023 paper pretrained on about 30M cells, later 95M" }; }
    if (s === 2) { const u = Q(t, 2); ranks.forEach((r) => setAlpha(alpha, r, 1)); setAlpha(alpha, ranks[3], 0.3); setAlpha(alpha, mod, 1); setAlpha(alpha, del, clamp(u * 2)); setAlpha(alpha, emb, clamp(u * 2 - 0.3)); setAlpha(alpha, state0, clamp(u * 2 - 0.5) * 0.6); setAlpha(alpha, state1, clamp(u * 2 - 0.7)); moveTo(pts, base, state1, [AX[0] + 0.5, AX[1] + 0.4, 0], [AX[0] + 1.5, AX[1] + 0.95, 0], clamp(u * 2 - 0.8)); return { caption: "3 · In silico perturbation deletes a gene in the model and watches the cell's representation move; this found therapeutic targets in cardiomyopathy and has since been applied to tumours" }; }
    const u = Q(t, 3); ranks.forEach((r) => setAlpha(alpha, r, 1)); setAlpha(alpha, ranks[3], 0.3); setAlpha(alpha, mod, 1); show(alpha, 0.7, del, emb); setAlpha(alpha, state0, 0.5); setAlpha(alpha, state1, 1); moveTo(pts, base, state1, [AX[0] + 0.5, AX[1] + 0.4, 0], [AX[0] + 1.5, AX[1] + 0.95, 0], 1); setAlpha(alpha, tgt, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 4)));
    setAlpha(alpha, lin, clamp(u * 2 - 0.5)); setAlpha(alpha, linQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · It was the first widely used single-cell foundation model, valued for transfer learning with little labelled data; rank encoding loses expression magnitude and some benchmarks show only modest gains over linear baselines" };
  });
}

// ---------------------------------------------------------------- 15. lattice and GRID radiotherapy
export function latticeRadiotherapy(): Mesh {
  const sc = scene();
  const TUM: Vec3 = [0, 0.2, 0];
  put(sc, "body", organ(2.6, 1.6, 0.6, "soft"), { at: [0, 0.1, -0.3] });
  const tumour = put(sc, "tumour", blob(1.25, "hot"), { at: TUM });
  const uni = put(sc, "uni", beam([-3.0, 0.2, 0], [TUM[0] - 0.9, TUM[1], 0], 0.9, "soft"));
  const uniX = put(sc, "uniX", cross([-2.2, 0.2, 0.1], 0.25));
  const V: Vec3[] = []; for (let i = 0; i < 7; i++) V.push([TUM[0] - 0.7 + 0.35 * (i % 4) + 0.17 * Math.floor(i / 4), TUM[1] - 0.35 + 0.6 * Math.floor(i / 4), 0.3]);
  const verts: Part[] = []; V.forEach((v, i) => verts.push(put(sc, `v${i}`, octahedron(0.16, "accent", true), { at: v })));
  const peaks: Part[] = []; V.forEach((v, i) => peaks.push(put(sc, `p${i}`, bar(v[0], 0.9, 0.12, "accent"), { at: [0, -2.2 + 0.0 * i, 0] })));
  const valley = put(sc, "valley", bar(TUM[0] - 0.9, 0.25, 1.9, "soft"), { at: [0, -2.2, 0] });
  const rays: Part[] = []; V.forEach((v, i) => rays.push(put(sc, `ray${i}`, line([v[0] - 0.4, v[1] + 1.8, 0.2], [v[0], v[1], 0.3], "accent"))));
  const immune: Part[] = []; for (let i = 0; i < 4; i++) immune.push(put(sc, `im${i}`, blob(0.18, "soft"), { at: [-2.6 + 1.7 * i, -1.5, 0.2] }));
  const shrink = put(sc, "shrink", ring(1.3, 16, "accent", "z"), { at: TUM });
  const trials = put(sc, "trials", doc(0.6, 0.7, 3, "accent"), { at: [2.6, 1.4, 0] });
  const q = put(sc, "q", ring(0.4, 10, "hot", "z"), { at: [2.6, 1.4, 0.05] });
  sc.mesh.labels = [L([TUM[0], TUM[1] + 1.75, 0], "Bulky tumour that cannot take a uniform ablative dose"), L([-2.4, -0.55, 0], "Uniform field: ruled out"), L([0.2, -2.55, 0], "Vertices of ablative dose, valleys far lower"), L([2.6, 2.0, 0], "MSK, China randomised, NYU with checkpoint blockade: recruiting")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, uniX, ...verts, ...peaks, valley, ...rays, ...immune, shrink, trials, q);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tumour, 0.7 + 0.3 * pulse(t, 3)); setAlpha(alpha, uni, 0.3 + 0.4 * clamp(u * 2)); setAlpha(alpha, uniX, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "1 · A bulky tumour cannot be given a uniform ablative dose without destroying the normal tissue around and inside it" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, uni, 0.2); setAlpha(alpha, uniX, 0.5); rays.forEach((r, i) => setAlpha(alpha, r, clamp(u * 2 - 0.1 * i) * (0.5 + 0.5 * pulse(t, 8)))); verts.forEach((v, i) => { const on = clamp(u * 2 - 0.5 - 0.1 * i); setAlpha(alpha, v, on); movePart(pts, base, v, [0, 0, 0], 0.3 + 0.7 * on); }); return { caption: "2 · Spatially fractionated radiotherapy instead places a lattice of high-dose vertices inside the tumour, delivered on a standard linear accelerator" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, uni, 0.2); setAlpha(alpha, uniX, 0.5); rays.forEach((r) => setAlpha(alpha, r, 0.4)); verts.forEach((v) => setAlpha(alpha, v, 1)); grow(alpha, valley, clamp(u * 2)); peaks.forEach((p, i) => grow(alpha, p, clamp(u * 2 - 0.3 - 0.1 * i))); return { caption: "3 · Between the peaks the valleys receive far less; steep gradients, vascular damage and bystander and abscopal signalling are proposed to carry the effect beyond the peaks, though the mechanism is not settled" }; }
    const u = Q(t, 3); setAlpha(alpha, uni, 0.2); setAlpha(alpha, uniX, 0.5); rays.forEach((r) => setAlpha(alpha, r, 0.4)); verts.forEach((v) => setAlpha(alpha, v, 1)); setAlpha(alpha, valley, 1); peaks.forEach((p) => setAlpha(alpha, p, 1));
    immune.forEach((c, i) => { setAlpha(alpha, c, clamp(u * 2 - 0.15 * i)); moveTo(pts, base, c, [-2.6 + 1.7 * i, -1.5, 0.2], [TUM[0] + 1.0 * Math.cos(i * 1.8), TUM[1] + 1.0 * Math.sin(i * 1.8), 0.4], clamp(u * 1.5 - 0.15 * i)); }); setAlpha(alpha, tumour, 1 - 0.3 * u); setAlpha(alpha, shrink, clamp(u * 2 - 0.5) * 0.6); setAlpha(alpha, trials, clamp(u * 2 - 0.8)); setAlpha(alpha, q, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · The rationale for combining with immunotherapy is clear and trials at MSK, a randomised comparison in China and checkpoint combinations at NYU are recruiting; most published series are palliative and single-arm, with no consensus on vertex spacing or dose" };
  });
}

// ---------------------------------------------------------------- 16. long-read sequencing
export function longReadSequencing(): Mesh {
  const sc = scene();
  const shorts: Part[] = []; for (let i = 0; i < 7; i++) shorts.push(put(sc, `sh${i}`, line([-2.9 + 0.42 * i, 1.6, 0], [-2.6 + 0.42 * i, 1.6, 0], "soft")));
  const gap = put(sc, "gap", ring(0.22, 10, "hot", "z"), { at: [-1.2, 1.6, 0.05] });
  const longRead = put(sc, "long", helix(0.1, 4.4, 9, 60, "accent"), { at: [-0.6, 0.9, 0], rotZ: Math.PI / 2 });
  const PORE: Vec3 = [1.6, -0.3, 0];
  const membraneP = put(sc, "membrane", box(3.0, 0.1, 0.6, "soft", true), { at: [0.4, -0.3, 0] });
  const pore = put(sc, "pore", cylinder(0.22, 0.3, 10, 2, "accent", false, true), { at: PORE });
  const strand = put(sc, "strand", helix(0.07, 1.6, 4, 30, "accent"), { at: [PORE[0], PORE[1] + 0.9, 0] });
  const trace = put(sc, "trace", polyline([[-2.8, -1.7, 0], [-2.4, -1.7, 0], [-2.4, -1.35, 0], [-2.0, -1.35, 0], [-2.0, -1.85, 0], [-1.5, -1.85, 0], [-1.5, -1.45, 0], [-1.0, -1.45, 0], [-1.0, -1.75, 0], [-0.5, -1.75, 0]], "accent"));
  const sv = put(sc, "sv", polyline([[0.2, -1.55, 0], [0.6, -1.55, 0], [0.6, -1.3, 0], [1.0, -1.3, 0], [1.0, -1.55, 0], [1.4, -1.55, 0]], "hot"));
  const meth: Part[] = []; for (let i = 0; i < 3; i++) meth.push(put(sc, `me${i}`, mote(0.07, "hot"), { at: [-1.8 + 0.6 * i, 0.9, 0.15] }));
  const clock = put(sc, "clock", clockFace(0.32), { at: [2.6, -1.5, 0] });
  const brain = put(sc, "brain", organ(0.42, 0.35, 0.3, "soft"), { at: [2.6, 1.2, 0] });
  const brainT = put(sc, "brainT", blob(0.12, "hot"), { at: [2.75, 1.25, 0.2] });
  sc.mesh.labels = [L([-1.6, 2.05, 0], "Short reads: rearrangements and repeats fall in the gaps"), L([-0.6, 0.35, 0], "One read spanning kilobases"), L([0.4, -0.75, 0], "Protein nanopore: ionic current reads native DNA (ONT); HiFi SMRT (PacBio)"), L([2.6, -2.05, 0], "Brain tumour methylation class in under an hour")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, gap, longRead, strand, trace, sv, ...meth, clock, brain, brainT);
    setAlpha(alpha, membraneP, 0.4); setAlpha(alpha, pore, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, shorts, clamp(u * 1.5)); setAlpha(alpha, gap, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "1 · Short-read machines read DNA in fragments of a few hundred bases; structural rearrangements, repeat expansions and phasing fall between the pieces" }; }
    if (s === 1) { const u = Q(t, 1); shorts.forEach((p) => setAlpha(alpha, p, 0.4)); setAlpha(alpha, gap, 0.4); grow(alpha, longRead, clamp(u * 1.3)); meth.forEach((m, i) => setAlpha(alpha, m, clamp(u * 3 - 1.5 - 0.3 * i) * (0.6 + 0.4 * pulse(t, 4)))); return { caption: "2 · PacBio HiFi and Oxford Nanopore reads span kilobases, so one read resolves structural variants, phasing and repeat expansions and reads base modifications such as methylation natively" }; }
    if (s === 2) { const u = Q(t, 2); shorts.forEach((p) => setAlpha(alpha, p, 0.4)); setAlpha(alpha, gap, 0.4); setAlpha(alpha, longRead, 1); meth.forEach((m) => setAlpha(alpha, m, 0.8)); setAlpha(alpha, membraneP, 1); setAlpha(alpha, pore, 1); setAlpha(alpha, strand, 1); movePart(pts, base, strand, [0, -1.4 * u, 0], 1, u * TAU); grow(alpha, trace, clamp(u * 1.4)); return { caption: "3 · A nanopore reads the ionic current as a native molecule threads through a protein pore, without amplification; PacBio reads single molecules in real time by fluorescence and builds circular-consensus HiFi reads that are now clinical-grade" }; }
    const u = Q(t, 3); shorts.forEach((p) => setAlpha(alpha, p, 0.4)); setAlpha(alpha, gap, 0.4); setAlpha(alpha, longRead, 1); meth.forEach((m) => setAlpha(alpha, m, 0.8)); setAlpha(alpha, membraneP, 1); setAlpha(alpha, pore, 1); setAlpha(alpha, strand, 1); movePart(pts, base, strand, [0, -1.4, 0], 1, TAU); setAlpha(alpha, trace, 1);
    setAlpha(alpha, sv, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, brain, clamp(u * 2 - 0.5)); setAlpha(alpha, brainT, clamp(u * 2 - 0.7)); setAlpha(alpha, clock, clamp(u * 2 - 1)); movePart(pts, base, clock, [0, 0, 0], 1, u * TAU * 0.5);
    return { caption: "4 · In oncology that means intraoperative methylation classification of brain tumours in under an hour, fusion detection and complex rearrangement mapping; cost per genome is approaching short-read levels" };
  });
}

// ---------------------------------------------------------------- 17. magnetic nanoparticle hyperthermia
export function magneticHyperthermia(): Mesh {
  const sc = scene();
  const HEAD: Vec3 = [0, 0.3, 0], TUM: Vec3 = [0.3, 0.55, 0.2];
  const head = put(sc, "head", organ(1.15, 1.35, 0.9, "soft"), { at: HEAD });
  const tumour = put(sc, "tumour", blob(0.42, "hot"), { at: TUM });
  const N0: Vec3 = [2.4, 2.0, 0];
  const needle = put(sc, "needle", syringe(0.65, "accent"), { at: N0, rotZ: -Math.PI * 0.75 });
  const np: Part[] = []; for (let i = 0; i < 8; i++) np.push(put(sc, `np${i}`, mote(0.06, "accent"), { at: N0 }));
  const npAt = (i: number): Vec3 => [TUM[0] - 0.22 + 0.15 * (i % 4), TUM[1] - 0.15 + 0.3 * Math.floor(i / 4), 0.35];
  const coil = put(sc, "coil", torus(1.75, 0.08, 16, 5, "accent"), { at: HEAD, rotX: Math.PI / 2 });
  const field: Part[] = []; for (let i = 0; i < 4; i++) field.push(put(sc, `f${i}`, ring(0.5 + 0.3 * i, 12, "accent", "z"), { at: TUM }));
  const heat = put(sc, "heat", ring(0.55, 12, "hot", "z"), { at: TUM });
  const temp = put(sc, "temp", bar(-2.6, 1.6, 0.25, "hot"), { at: [0, -1.9, 0] });
  const tempBase = put(sc, "tempBase", bar(-2.2, 1.0, 0.25, "soft"), { at: [0, -1.9, 0] });
  const rt = put(sc, "rt", beam([-3.0, 0.6, 0], [TUM[0] - 0.45, TUM[1], 0], 0.3, "soft"));
  const eu = put(sc, "eu", doc(0.6, 0.7, 3, "accent"), { at: [2.6, -1.2, 0] });
  const usX = put(sc, "usX", cross([2.6, -2.0, 0.05], 0.2));
  sc.mesh.labels = [L([HEAD[0], HEAD[1] + 1.75, 0], "Glioblastoma: iron-oxide nanoparticles injected into the tumour"), L([-2.3, 1.3, 0], "Alternating magnetic field applicator"), L([-2.4, -2.3, 0], "Particles reach 40-45 °C"), L([2.6, -0.6, 0], "NanoTherm: European approval 2010, few German centres")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...np, coil, ...field, heat, temp, tempBase, rt, eu, usX);
    setAlpha(alpha, head, 0.6);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); moveTo(pts, base, needle, N0, [TUM[0] + 0.55, TUM[1] + 0.55, 0.2], clamp(u * 2)); np.forEach((p, i) => { const v = clamp(u * 2 - 1 - 0.06 * i); setAlpha(alpha, p, v > 0 ? 1 : 0); moveTo(pts, base, p, [TUM[0] + 0.3, TUM[1] + 0.3, 0.3], npAt(i), v); }); return { caption: "1 · Superparamagnetic iron-oxide nanoparticles are injected directly into the tumour; systemic delivery is still preclinical" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, needle, 0); np.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [TUM[0] + 0.3, TUM[1] + 0.3, 0.3], npAt(i), 1); movePart(pts, base, p, [0.03 * Math.sin(t * TAU * 12 + i) * u, 0.03 * Math.cos(t * TAU * 12 + i) * u, 0], 1); }); setAlpha(alpha, coil, clamp(u * 2)); field.forEach((f, i) => { const v = (t * 4 + i / 4) % 1; setAlpha(alpha, f, clamp(u * 2 - 1) * (1 - v) * 0.7); movePart(pts, base, f, [0, 0, 0], 0.6 + 0.8 * v); }); return { caption: "2 · A specialised applicator drives an alternating magnetic field through the head; only where particles sit is any energy absorbed" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, needle, 0); np.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [TUM[0] + 0.3, TUM[1] + 0.3, 0.3], npAt(i), 1); movePart(pts, base, p, [0.03 * Math.sin(t * TAU * 12 + i), 0.03 * Math.cos(t * TAU * 12 + i), 0], 1); }); setAlpha(alpha, coil, 1); field.forEach((f, i) => { const v = (t * 4 + i / 4) % 1; setAlpha(alpha, f, (1 - v) * 0.6); movePart(pts, base, f, [0, 0, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, heat, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 5))); grow(alpha, tempBase, clamp(u * 2)); grow(alpha, temp, clamp(u * 2 - 0.5)); setAlpha(alpha, rt, clamp(u * 2 - 1) * 0.7); return { caption: "3 · The particles dissipate heat and the tumour reaches 40-45 °C, sensitising cells to the radiotherapy and chemotherapy given alongside, without extra systemic toxicity" }; }
    const u = Q(t, 3); setAlpha(alpha, needle, 0); np.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [TUM[0] + 0.3, TUM[1] + 0.3, 0.3], npAt(i), 1); movePart(pts, base, p, [0.03 * Math.sin(t * TAU * 12 + i), 0.03 * Math.cos(t * TAU * 12 + i), 0], 1); }); setAlpha(alpha, coil, 1); field.forEach((f, i) => { const v = (t * 4 + i / 4) % 1; setAlpha(alpha, f, (1 - v) * 0.6); movePart(pts, base, f, [0, 0, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, heat, 0.7); show(alpha, 1, temp, tempBase); setAlpha(alpha, rt, 0.7); setAlpha(alpha, tumour, 1 - 0.3 * u);
    setAlpha(alpha, eu, clamp(u * 2)); setAlpha(alpha, usX, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · NanoTherm has had European approval for glioblastoma since 2010 and is used at a few German centres; a phase 2 adjuvant study is recruiting in Poland, the US prostate focal-ablation study was terminated, and uneven particle distribution gives uneven heating" };
  });
}

// ---------------------------------------------------------------- 18. MUSK (vision-language pathology)
export function muskModel(): Mesh {
  const sc = scene();
  const SL: Vec3 = [-2.3, 0.9, 0], TXT: Vec3 = [-2.3, -0.9, 0], MOD: Vec3 = [0, 0, 0];
  const sl = put(sc, "slide", slide("soft"), { at: SL });
  const txt = put(sc, "txt", doc(0.9, 0.9, 4, "soft"), { at: TXT });
  const mod = put(sc, "model", model(1.5, 1.3, "accent"), { at: MOD });
  const imgTok: Part[] = []; for (let i = 0; i < 4; i++) imgTok.push(put(sc, `it${i}`, quad(0.18, 0.18, "hot"), { at: [SL[0] - 0.3 + 0.2 * i, SL[1], 0.06] }));
  const txtTok: Part[] = []; for (let i = 0; i < 4; i++) txtTok.push(put(sc, `tt${i}`, line([TXT[0] - 0.3 + 0.2 * i, TXT[1], 0.06], [TXT[0] - 0.18 + 0.2 * i, TXT[1], 0.06], "accent")));
  const tokTo = (i: number): Vec3 => [MOD[0] - 0.45 + 0.3 * i, MOD[1] + 0.05 * Math.sin(i), 0.3];
  const maskP = put(sc, "mask", quad(0.5, 0.35, "soft"), { at: [MOD[0] + 0.1, MOD[1], 0.32] });
  const PAT: Vec3 = [2.3, 0.3, 0];
  const patient = put(sc, "patient", figure("soft"), { at: PAT, scale: 0.7 });
  const resp = put(sc, "resp", tick([PAT[0] + 0.55, PAT[1] + 0.4, 0.1], 0.2));
  const io = put(sc, "io", vial(0.12, 0.4, "accent"), { at: [PAT[0] - 0.7, PAT[1] + 0.2, 0.1] });
  const retro = put(sc, "retro", ticks(1.3, 3.1, -1.5, 5, "soft"));
  const retroX = put(sc, "retroX", cross([3.1, -1.5, 0.05], 0.16));
  const trialQ = put(sc, "trialQ", ring(0.3, 10, "hot", "z"), { at: [2.2, -1.5, 0.05] });
  sc.mesh.labels = [L([SL[0], SL[1] + 0.65, 0], "50M pathology images"), L([TXT[0], TXT[1] - 0.75, 0], "1B pathology text tokens"), L([MOD[0], MOD[1] + 1.05, 0], "MUSK (Stanford): one shared token space"), L([2.2, -2.0, 0], "Retrospective only; no prospective test yet")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...imgTok, ...txtTok, maskP, resp, io, retro, retroX, trialQ);
    setAlpha(alpha, mod, 0.5); setAlpha(alpha, patient, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, sl, 0.5 + 0.5 * clamp(u * 2)); setAlpha(alpha, txt, 0.5 + 0.5 * clamp(u * 2 - 0.5)); imgTok.forEach((p, i) => setAlpha(alpha, p, clamp(u * 3 - 1 - 0.2 * i))); txtTok.forEach((p, i) => setAlpha(alpha, p, clamp(u * 3 - 1.5 - 0.2 * i))); return { caption: "1 · A pathology slide and the words written about it carry different information; most models read only one of them" }; }
    if (s === 1) { const u = Q(t, 1); imgTok.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [SL[0] - 0.3 + 0.2 * i, SL[1], 0.06], tokTo(i), clamp(u * 1.5 - 0.1 * i)); }); txtTok.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [TXT[0] - 0.3 + 0.2 * i, TXT[1], 0.06], [tokTo(i)[0], tokTo(i)[1] - 0.25, 0.3], clamp(u * 1.5 - 0.1 * i)); }); setAlpha(alpha, mod, 0.5 + 0.5 * u); setAlpha(alpha, maskP, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "2 · MUSK places image tokens and text tokens in one shared space with masked multimodal pretraining, on 50M pathology images and 1B pathology-related text tokens" }; }
    if (s === 2) { const u = Q(t, 2); imgTok.forEach((p, i) => { setAlpha(alpha, p, 0.8); moveTo(pts, base, p, [SL[0] - 0.3 + 0.2 * i, SL[1], 0.06], tokTo(i), 1); }); txtTok.forEach((p, i) => { setAlpha(alpha, p, 0.8); moveTo(pts, base, p, [TXT[0] - 0.3 + 0.2 * i, TXT[1], 0.06], [tokTo(i)[0], tokTo(i)[1] - 0.25, 0.3], 1); }); setAlpha(alpha, mod, 1); setAlpha(alpha, maskP, 0.4); setAlpha(alpha, patient, 0.4 + 0.6 * clamp(u * 2)); setAlpha(alpha, io, clamp(u * 2 - 0.5)); setAlpha(alpha, resp, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · The Nature 2025 paper reported that the combined model predicted immunotherapy response and prognosis across cancers better than models built on images or text alone" }; }
    const u = Q(t, 3); imgTok.forEach((p, i) => { setAlpha(alpha, p, 0.8); moveTo(pts, base, p, [SL[0] - 0.3 + 0.2 * i, SL[1], 0.06], tokTo(i), 1); }); txtTok.forEach((p, i) => { setAlpha(alpha, p, 0.8); moveTo(pts, base, p, [TXT[0] - 0.3 + 0.2 * i, TXT[1], 0.06], [tokTo(i)[0], tokTo(i)[1] - 0.25, 0.3], 1); }); setAlpha(alpha, mod, 1); setAlpha(alpha, maskP, 0.4); setAlpha(alpha, patient, 1); setAlpha(alpha, io, 1); setAlpha(alpha, resp, 0.8);
    grow(alpha, retro, clamp(u * 1.5)); setAlpha(alpha, retroX, clamp(u * 2 - 0.8)); setAlpha(alpha, trialQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Tumour boards deciding who benefits from checkpoint inhibitors are the intended users, but all validation so far is retrospective; whether the predictions change decisions or outcomes has not been tested prospectively" };
  });
}

// ---------------------------------------------------------------- 19. Phenom-2 and Recursion OS
export function phenom2(): Mesh {
  const sc = scene();
  const PLATE: Vec3 = [-2.0, 0.4, 0];
  const plate = put(sc, "plate", quad(1.6, 1.1, "soft"), { at: PLATE });
  const wells: Part[] = []; for (let i = 0; i < 6; i++) wells.push(put(sc, `w${i}`, disc(0.14, 8, i === 4 ? "hot" : "accent", "z"), { at: [PLATE[0] - 0.5 + 0.5 * (i % 3), PLATE[1] + 0.25 - 0.5 * Math.floor(i / 3), 0.03] }));
  const cam = put(sc, "cam", cone(0.3, 0.6, 8, "soft"), { at: [PLATE[0], PLATE[1] + 1.35, 0.3], rotX: Math.PI });
  const mod = put(sc, "model", model(1.3, 1.0, "accent"), { at: [0.3, 0.4, 0] });
  const tiles: Part[] = []; for (let i = 0; i < 6; i++) tiles.push(put(sc, `t${i}`, quad(0.16, 0.16, i === 4 ? "hot" : "accent"), { at: [PLATE[0] - 0.5 + 0.5 * (i % 3), PLATE[1] + 0.25 - 0.5 * Math.floor(i / 3), 0.06] }));
  const AX: Vec3 = [1.5, -0.6, 0];
  const emb = put(sc, "emb", axes(AX, 1.8, 1.5));
  const embDots: Part[] = []; for (let i = 0; i < 6; i++) embDots.push(put(sc, `e${i}`, mote(0.07, i === 4 ? "hot" : "accent"), { at: [AX[0] + 0.3 + 0.25 * i, AX[1] + 0.3 + 0.2 * (i % 2), 0] }));
  const embTo = (i: number): Vec3 => i === 4 ? [AX[0] + 1.5, AX[1] + 1.25, 0] : [AX[0] + 0.4 + 0.15 * i, AX[1] + 0.35 + 0.1 * (i % 3), 0];
  const cluster = put(sc, "cluster", ring(0.35, 10, "accent", "z"), { at: [AX[0] + 0.7, AX[1] + 0.5, 0.05] });
  const cand = put(sc, "cand", capsule(1.1, "hot"), { at: [-2.2, -1.5, 0] });
  const trials = put(sc, "trials", ticks(-1.2, 0.6, -1.5, 4, "soft"));
  const late = put(sc, "late", ring(0.22, 10, "hot", "z"), { at: [0.6, -1.5, 0.05] });
  sc.mesh.labels = [L([PLATE[0], PLATE[1] - 0.85, 0], "Cell Painting wells: drug or gene knockout per well"), L([0.3, 1.15, 0], "Phenom-2: masked autoencoder ViT, 1.9B parameters, 8B images"), L([AX[0] + 0.9, AX[1] - 0.3, 0], "Embeddings compared across perturbations"), L([-0.8, -2.0, 0], "REC-617 (CDK7): nothing yet through late-stage trials")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...tiles, emb, ...embDots, cluster, cand, trials, late);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, plate, 1); cascade(alpha, wells, clamp(u * 1.5)); setAlpha(alpha, cam, clamp(u * 2 - 1)); movePart(pts, base, cam, [0.5 * Math.sin(t * TAU) * clamp(u * 2 - 1), 0, 0], 1); return { caption: "1 · Cells in each well of a Cell Painting plate receive a different drug or gene knockout, then are stained and photographed by microscope" }; }
    if (s === 1) { const u = Q(t, 1); wells.forEach((w) => setAlpha(alpha, w, 1)); setAlpha(alpha, cam, 1); movePart(pts, base, cam, [0.5 * Math.sin(t * TAU), 0, 0], 1); tiles.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [PLATE[0] - 0.5 + 0.5 * (i % 3), PLATE[1] + 0.25 - 0.5 * Math.floor(i / 3), 0.06], [0.3 - 0.4 + 0.25 * (i % 3), 0.4 + 0.2 - 0.4 * Math.floor(i / 3), 0.3], clamp(u * 1.5 - 0.1 * i)); }); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); return { caption: "2 · A masked autoencoder vision transformer, released in 2024 with 1.9B parameters and trained on 8B images, learns to read what a treatment did to a cell's appearance" }; }
    if (s === 2) { const u = Q(t, 2); wells.forEach((w) => setAlpha(alpha, w, 0.7)); setAlpha(alpha, cam, 0.6); movePart(pts, base, cam, [0.5 * Math.sin(t * TAU), 0, 0], 1); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [PLATE[0] - 0.5 + 0.5 * (i % 3), PLATE[1] + 0.25 - 0.5 * Math.floor(i / 3), 0.06], [0.3 - 0.4 + 0.25 * (i % 3), 0.4 + 0.2 - 0.4 * Math.floor(i / 3), 0.3], 1); }); setAlpha(alpha, mod, 1); setAlpha(alpha, emb, clamp(u * 2)); embDots.forEach((d, i) => { setAlpha(alpha, d, clamp(u * 2 - 0.3)); moveTo(pts, base, d, [AX[0] + 0.3 + 0.25 * i, AX[1] + 0.3 + 0.2 * (i % 2), 0], embTo(i), clamp(u * 1.5 - 0.3)); }); setAlpha(alpha, cluster, clamp(u * 2 - 1) * 0.7); return { caption: "3 · Each image becomes an embedding; perturbations that land together share a mechanism, and an outlier that mimics a known knockout points to a drug candidate" }; }
    const u = Q(t, 3); wells.forEach((w) => setAlpha(alpha, w, 0.7)); setAlpha(alpha, cam, 0.6); movePart(pts, base, cam, [0.5 * Math.sin(t * TAU), 0, 0], 1); tiles.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [PLATE[0] - 0.5 + 0.5 * (i % 3), PLATE[1] + 0.25 - 0.5 * Math.floor(i / 3), 0.06], [0.3 - 0.4 + 0.25 * (i % 3), 0.4 + 0.2 - 0.4 * Math.floor(i / 3), 0.3], 1); }); setAlpha(alpha, mod, 1); setAlpha(alpha, emb, 1); embDots.forEach((d, i) => { setAlpha(alpha, d, 1); moveTo(pts, base, d, [AX[0] + 0.3 + 0.25 * i, AX[1] + 0.3 + 0.2 * (i % 2), 0], embTo(i), 1); }); setAlpha(alpha, cluster, 0.7);
    setAlpha(alpha, cand, clamp(u * 2)); grow(alpha, trials, clamp(u * 1.5 - 0.3)); setAlpha(alpha, late, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · With Boltz-2 and the Recursion OS platform it drives an oncology pipeline including the CDK7 inhibitor REC-617; the proprietary phenomics scale is the strength, and no drug found this way has yet completed late-stage trials" };
  });
}

// ---------------------------------------------------------------- 20. proton arc therapy
export function protonArc(): Mesh {
  const sc = scene();
  const C: Vec3 = [0, 0, 0];
  const body = put(sc, "body", organ(1.3, 1.0, 0.7, "soft"), { at: C });
  const target = put(sc, "target", blob(0.32, "hot"), { at: [0.3, 0.1, 0.2] });
  const fixed: Part[] = []; const FA = [Math.PI * 0.5, Math.PI * 0.85, Math.PI * 1.2];
  FA.forEach((a, i) => fixed.push(put(sc, `fx${i}`, beam([2.6 * Math.cos(a), 2.6 * Math.sin(a), 0], [0.3, 0.1, 0], 0.32, "soft"))));
  const entry: Part[] = []; FA.forEach((a, i) => entry.push(put(sc, `en${i}`, blob(0.2, "hot"), { at: [1.15 * Math.cos(a), 0.9 * Math.sin(a), 0.2] })));
  const gantry = put(sc, "gantry", torus(2.3, 0.07, 20, 5, "accent"), { at: C, rotX: Math.PI / 2 });
  const nozzle = put(sc, "nozzle", box(0.35, 0.35, 0.35, "accent", true), { at: [0, 2.3, 0] });
  const arcBeam = put(sc, "arc", beam([0, 2.3, 0], [0.3, 0.1, 0], 0.18, "accent"));
  const spots: Part[] = []; for (let i = 0; i < 10; i++) spots.push(put(sc, `sp${i}`, mote(0.05, "accent"), { at: [0.3 + 0.22 * Math.cos(i * 0.63), 0.1 + 0.22 * Math.sin(i * 0.63), 0.3] }));
  const skin = put(sc, "skin", ring(1.32, 20, "soft", "z"), { at: [0, 0, 0.05] });
  const clock = put(sc, "clock", clockFace(0.3), { at: [2.6, -1.6, 0] });
  const rct = put(sc, "rct", doc(0.55, 0.65, 3, "soft"), { at: [-2.6, -1.6, 0] });
  const rctX = put(sc, "rctX", cross([-2.6, -1.6, 0.05], 0.2));
  sc.mesh.labels = [L([0, 1.35, 0], "Fixed fields: each entrance takes a full share of dose"), L([0, 2.75, 0], "Continuously rotating gantry, spot scanning"), L([2.6, -2.15, 0], "Long delivery and QA times"), L([-2.6, -2.15, 0], "No randomised comparison with fixed-field proton therapy")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...entry, gantry, nozzle, arcBeam, ...spots, skin, clock, rct, rctX);
    setAlpha(alpha, body, 0.6);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); fixed.forEach((f, i) => setAlpha(alpha, f, clamp(u * 2 - 0.3 * i) * 0.7)); entry.forEach((e, i) => setAlpha(alpha, e, clamp(u * 2 - 0.5 - 0.3 * i) * (0.5 + 0.5 * pulse(t, 4)))); setAlpha(alpha, target, 0.8); return { caption: "1 · Conventional proton therapy fires from a few fixed angles, so each entrance path takes a substantial share of the dose on its way to the target" }; }
    if (s === 1) { const u = Q(t, 1); fixed.forEach((f) => setAlpha(alpha, f, 0.15)); entry.forEach((e) => setAlpha(alpha, e, 0.2)); setAlpha(alpha, gantry, clamp(u * 2)); const a = u * TAU * 0.75; setAlpha(alpha, nozzle, clamp(u * 2)); movePart(pts, base, nozzle, [2.3 * Math.sin(a), 2.3 * (Math.cos(a) - 1), 0], 1); setAlpha(alpha, arcBeam, clamp(u * 2 - 0.5) * (0.6 + 0.4 * pulse(t, 8))); for (let i = arcBeam.p0; i < arcBeam.p1; i++) { const p = base[i]; if (p[1] > 1) pts[i] = [2.3 * Math.sin(a) + (p[0]), 2.3 * Math.cos(a) + (p[1] - 2.3), p[2]]; } return { caption: "2 · Proton arc keeps the gantry rotating continuously while spot-scanned protons are delivered, so each direction contributes only part of the dose" }; }
    if (s === 2) { const u = Q(t, 2); fixed.forEach((f) => setAlpha(alpha, f, 0.15)); entry.forEach((e) => setAlpha(alpha, e, 0.2)); setAlpha(alpha, gantry, 1); const a = TAU * 0.75 + u * TAU * 0.5; setAlpha(alpha, nozzle, 1); movePart(pts, base, nozzle, [2.3 * Math.sin(a), 2.3 * (Math.cos(a) - 1), 0], 1); setAlpha(alpha, arcBeam, 0.6 + 0.4 * pulse(t, 8)); for (let i = arcBeam.p0; i < arcBeam.p1; i++) { const p = base[i]; if (p[1] > 1) pts[i] = [2.3 * Math.sin(a) + p[0], 2.3 * Math.cos(a) + (p[1] - 2.3), p[2]]; } cascade(alpha, spots, clamp(u * 1.5)); setAlpha(alpha, skin, clamp(u * 2) * 0.5); return { caption: "3 · Energy layers are spread across angles: many low-weight spots sharpen the dose on the target, spread the entrance dose thinly over the skin, and planning studies show better sparing and more robustness to setup and range error" }; }
    const u = Q(t, 3); fixed.forEach((f) => setAlpha(alpha, f, 0.15)); entry.forEach((e) => setAlpha(alpha, e, 0.2)); setAlpha(alpha, gantry, 1); const a = TAU * 1.25; setAlpha(alpha, nozzle, 1); movePart(pts, base, nozzle, [2.3 * Math.sin(a), 2.3 * (Math.cos(a) - 1), 0], 1); setAlpha(alpha, arcBeam, 0.6); for (let i = arcBeam.p0; i < arcBeam.p1; i++) { const p = base[i]; if (p[1] > 1) pts[i] = [2.3 * Math.sin(a) + p[0], 2.3 * Math.cos(a) + (p[1] - 2.3), p[2]]; } spots.forEach((sp) => setAlpha(alpha, sp, 1)); setAlpha(alpha, skin, 0.5);
    setAlpha(alpha, clock, clamp(u * 2)); movePart(pts, base, clock, [0, 0, 0], 1, u * TAU); setAlpha(alpha, rct, clamp(u * 2 - 0.5)); setAlpha(alpha, rctX, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Vendors have released planning tools and first patients have been treated at a few centres on existing proton hardware; a September 2026 search found no randomised comparison against intensity-modulated proton therapy, and delivery time and quality assurance are the barriers" };
  });
}

// ---------------------------------------------------------------- 21. RFdiffusion and ProteinMPNN
export function rfdiffusion(): Mesh {
  const sc = scene();
  const TGT: Vec3 = [-1.4, 0.1, 0];
  const target = put(sc, "target", protein(0.9, "soft"), { at: TGT });
  const site = put(sc, "site", blob(0.2, "hot"), { at: [TGT[0] + 0.75, TGT[1] + 0.2, 0.3] });
  const noise: Part[] = []; for (let i = 0; i < 10; i++) noise.push(put(sc, `n${i}`, mote(0.05, "accent"), { at: [0.9 + 1.0 * Math.cos(i * 2.3), 0.3 + 1.0 * Math.sin(i * 1.9), 0.3 * Math.sin(i)] }));
  const BB: Vec3[] = []; for (let i = 0; i < 10; i++) BB.push([-0.35 + 0.7 * Math.cos(i * 0.7) * 0.6, 0.3 + 0.55 * Math.sin(i * 0.7), 0.3 + 0.2 * Math.sin(i * 1.4)]);
  const backbone = put(sc, "backbone", polyline(BB, "accent"));
  const bbBody = put(sc, "bbBody", ellipsoid(0.55, 0.65, 0.35, 4, 8, "accent", true), { at: [-0.3, 0.3, 0.3] });
  const seq: Part[] = []; for (let i = 0; i < 8; i++) seq.push(put(sc, `sq${i}`, line([1.3 + 0.2 * i, 1.6, 0], [1.3 + 0.2 * i, 1.6 + 0.12 + 0.12 * ((i * 5) % 3), 0], i % 3 === 0 ? "hot" : "accent")));
  const seqBase = put(sc, "seqBase", line([1.2, 1.6, 0], [2.9, 1.6, 0], "soft"));
  const bench = put(sc, "bench", vial(0.14, 0.5, "accent"), { at: [2.2, -0.3, 0] });
  const benchOk = put(sc, "benchOk", tick([2.7, -0.25, 0.05], 0.18));
  const enz = put(sc, "enz", protein(0.35, "accent"), { at: [-2.4, -1.6, 0] });
  const ab = put(sc, "ab", polyline([[-0.25, -0.3, 0], [0, 0, 0], [0.25, -0.3, 0], [0, 0, 0], [0, 0.35, 0]], "accent"), { at: [-1.3, -1.7, 0] });
  const immQ = put(sc, "immQ", ring(0.35, 10, "hot", "z"), { at: [1.0, -1.6, 0.05] });
  const devQ = put(sc, "devQ", ring(0.35, 10, "hot", "z"), { at: [2.1, -1.6, 0.05] });
  sc.mesh.labels = [L([TGT[0], TGT[1] - 1.3, 0], "Chosen target"), L([-0.3, 1.35, 0], "RFdiffusion (Nature 2023): backbone denoised around the target"), L([2.05, 2.05, 0], "ProteinMPNN designs the sequence"), L([0.4, -2.2, 0], "RFdiffusion2 (2025) enzymes, RFantibody; developability and immunogenicity still empirical")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, backbone, bbBody, ...seq, seqBase, bench, benchOk, enz, ab, immQ, devQ);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, target, 0.5 + 0.5 * clamp(u * 2)); setAlpha(alpha, site, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); noise.forEach((n, i) => movePart(pts, base, n, [0.1 * Math.sin(t * TAU * 3 + i), 0.1 * Math.cos(t * TAU * 3 + i * 1.3), 0], 1)); return { caption: "1 · Start from the target's structure and a random cloud of protein backbone positions, with nothing about the binder decided yet" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, site, 0.8); noise.forEach((n, i) => { const from: Vec3 = [0.9 + 1.0 * Math.cos(i * 2.3), 0.3 + 1.0 * Math.sin(i * 1.9), 0.3 * Math.sin(i)]; moveTo(pts, base, n, from, BB[i], u); setAlpha(alpha, n, 1 - 0.5 * clamp(u * 2 - 1)); }); grow(alpha, backbone, clamp(u * 1.6 - 0.4)); setAlpha(alpha, bbBody, clamp(u * 2 - 1) * 0.6); return { caption: "2 · RFdiffusion (Nature 2023) denoises that cloud step by step, conditioned on the target, until a new backbone sits against the chosen surface" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, site, 0.8); noise.forEach((n, i) => { const from: Vec3 = [0.9 + 1.0 * Math.cos(i * 2.3), 0.3 + 1.0 * Math.sin(i * 1.9), 0.3 * Math.sin(i)]; moveTo(pts, base, n, from, BB[i], 1); setAlpha(alpha, n, 0.5); }); setAlpha(alpha, backbone, 1); setAlpha(alpha, bbBody, 0.6); setAlpha(alpha, seqBase, clamp(u * 2)); cascade(alpha, seq, clamp(u * 1.5)); setAlpha(alpha, bench, clamp(u * 2 - 1)); setAlpha(alpha, benchOk, clamp(u * 2 - 1.3) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · ProteinMPNN then designs an amino acid sequence that will fold into that backbone; the strength of the pair is de novo binders that have been made and shown to bind in the lab" }; }
    const u = Q(t, 3); setAlpha(alpha, site, 0.8); noise.forEach((n, i) => { const from: Vec3 = [0.9 + 1.0 * Math.cos(i * 2.3), 0.3 + 1.0 * Math.sin(i * 1.9), 0.3 * Math.sin(i)]; moveTo(pts, base, n, from, BB[i], 1); setAlpha(alpha, n, 0.5); }); setAlpha(alpha, backbone, 1); setAlpha(alpha, bbBody, 0.6); setAlpha(alpha, seqBase, 1); seq.forEach((q) => setAlpha(alpha, q, 1)); setAlpha(alpha, bench, 1); setAlpha(alpha, benchOk, 0.8);
    setAlpha(alpha, enz, clamp(u * 2)); setAlpha(alpha, ab, clamp(u * 2 - 0.3)); setAlpha(alpha, immQ, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, devQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · RFdiffusion2 (2025) extends the approach to enzymes and RFantibody to antibodies, the basis of Xaira and many cancer binder programmes; developability and immunogenicity are answered only by making and testing each design" };
  });
}

// ---------------------------------------------------------------- 22. scGPT
export function scgpt(): Mesh {
  const sc = scene();
  const cellsA: Part[] = []; for (let i = 0; i < 5; i++) cellsA.push(put(sc, `ca${i}`, blob(0.16, "soft"), { at: [-2.6 + 0.3 * i, 1.4 - 0.15 * (i % 2), 0] }));
  const toks: Part[] = []; const TH = [0.9, 0.5, 0.7, 0.3, 1.0, 0.6];
  TH.forEach((h, i) => toks.push(put(sc, `tk${i}`, bar(-2.7 + 0.28 * i, h, 0.16, "accent"), { at: [0, -0.4, 0] })));
  const bins = put(sc, "bins", ticks(-2.8, -1.2, -0.4, 4, "soft"));
  const mod = put(sc, "model", model(1.3, 1.0, "accent"), { at: [-0.3, 0.3, 0] });
  const AX: Vec3 = [0.8, -0.3, 0];
  const emb = put(sc, "emb", axes(AX, 2.0, 1.7));
  const types: Part[] = []; for (let i = 0; i < 9; i++) types.push(put(sc, `ty${i}`, mote(0.06, ["accent", "hot", "soft"][i % 3]), { at: [AX[0] + 0.3 + 0.18 * i, AX[1] + 0.3 + 0.12 * (i % 4), 0] }));
  const typeTo = (i: number): Vec3 => [AX[0] + 0.5 + 0.7 * (i % 3) + 0.08 * Math.floor(i / 3), AX[1] + 0.4 + 0.45 * ((i % 3) === 1 ? 2 : (i % 3)) + 0.12 * Math.floor(i / 3), 0];
  const rings: Part[] = []; for (let i = 0; i < 3; i++) rings.push(put(sc, `rg${i}`, ring(0.3, 10, ["accent", "hot", "soft"][i], "z"), { at: [AX[0] + 0.58 + 0.7 * i, AX[1] + 0.52 + 0.45 * (i === 1 ? 2 : i), 0.03] }));
  const batchA = put(sc, "bA", cloud(6, 0.3, "accent", 3), { at: [1.1, 1.7, 0] });
  const batchB = put(sc, "bB", cloud(6, 0.3, "hot", 5), { at: [2.4, 1.7, 0] });
  const pertBase = put(sc, "pb", bar(-2.5, 0.7, 0.25, "soft"), { at: [0, -2.2, 0] });
  const pert = put(sc, "pt", bar(-2.1, 0.8, 0.25, "accent"), { at: [0, -2.2, 0] });
  const pertQ = put(sc, "pq", ring(0.3, 10, "hot", "z"), { at: [-2.1, -1.2, 0.05] });
  sc.mesh.labels = [L([-2.0, 1.85, 0], "Single cells: gene tokens plus binned expression"), L([-0.3, 1.1, 0], "scGPT: generative transformer, 33M cells (Nature Methods 2024)"), L([AX[0] + 1.0, AX[1] - 0.3, 0], "Cell-type annotation, batch integration"), L([-2.3, -2.55, 0], "Perturbation prediction: only modestly above baselines")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, emb, ...types, ...rings, batchA, batchB, pertBase, pert, pertQ);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, cellsA, clamp(u * 1.5)); toks.forEach((k, i) => grow(alpha, k, clamp(u * 2 - 0.6 - 0.1 * i))); setAlpha(alpha, bins, clamp(u * 2 - 0.5)); return { caption: "1 · Each cell's genes become tokens and its expression values are binned, borrowing the recipe that language models use for words" }; }
    if (s === 1) { const u = Q(t, 1); cellsA.forEach((c) => setAlpha(alpha, c, 0.7)); toks.forEach((k, i) => { setAlpha(alpha, k, 1); moveTo(pts, base, k, [0, 0, 0], [1.9 - 0.28 * i + 0.28 * i * 0.3, 0.3, 0.3], clamp(u * 1.5 - 0.08 * i), 0.5); }); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); return { caption: "2 · A generative transformer pretrained on 33M cells learns to predict masked tokens; the Nature Methods 2024 paper then fine-tuned it for several downstream tasks" }; }
    if (s === 2) { const u = Q(t, 2); cellsA.forEach((c) => setAlpha(alpha, c, 0.7)); toks.forEach((k, i) => { setAlpha(alpha, k, 0.6); moveTo(pts, base, k, [0, 0, 0], [1.9 - 0.28 * i + 0.28 * i * 0.3, 0.3, 0.3], 1, 0.5); }); setAlpha(alpha, mod, 1); setAlpha(alpha, emb, clamp(u * 2)); types.forEach((p, i) => { setAlpha(alpha, p, clamp(u * 2 - 0.2)); moveTo(pts, base, p, [AX[0] + 0.3 + 0.18 * i, AX[1] + 0.3 + 0.12 * (i % 4), 0], typeTo(i), clamp(u * 1.5 - 0.2)); }); rings.forEach((r, i) => setAlpha(alpha, r, clamp(u * 2 - 1 - 0.2 * i) * 0.7)); show(alpha, clamp(u * 2 - 0.5), batchA, batchB); moveTo(pts, base, batchB, [2.4, 1.7, 0], [1.4, 1.7, 0], clamp(u * 2 - 1)); return { caption: "3 · Its strengths are naming cell types and merging datasets from different batches, a general-purpose starting point that adapts to a new tumour microenvironment atlas with limited labels" }; }
    const u = Q(t, 3); cellsA.forEach((c) => setAlpha(alpha, c, 0.7)); toks.forEach((k, i) => { setAlpha(alpha, k, 0.6); moveTo(pts, base, k, [0, 0, 0], [1.9 - 0.28 * i + 0.28 * i * 0.3, 0.3, 0.3], 1, 0.5); }); setAlpha(alpha, mod, 1); setAlpha(alpha, emb, 1); types.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [AX[0] + 0.3 + 0.18 * i, AX[1] + 0.3 + 0.12 * (i % 4), 0], typeTo(i), 1); }); rings.forEach((r) => setAlpha(alpha, r, 0.7)); show(alpha, 0.8, batchA, batchB); moveTo(pts, base, batchB, [2.4, 1.7, 0], [1.4, 1.7, 0], 1);
    grow(alpha, pertBase, clamp(u * 2)); grow(alpha, pert, clamp(u * 2 - 0.4)); setAlpha(alpha, pertQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Forecasting how cells respond to a drug is the weak spot: perturbation prediction is only modestly above simple baselines, a finding echoed across single-cell foundation models" };
  });
}

// ---------------------------------------------------------------- 23. cannabinoids for chemotherapy nausea
export function cannabinoidsNausea(): Mesh {
  const sc = scene();
  const P: Vec3 = [-1.8, 0, 0];
  const patient = put(sc, "patient", figure("soft"), { at: P, scale: 1.1 });
  const brainstem = put(sc, "brainstem", blob(0.12, "hot"), { at: [P[0], P[1] + 0.72, 0.15] });
  const stomach = put(sc, "stomach", organ(0.22, 0.28, 0.15, "hot"), { at: [P[0] - 0.05, P[1] + 0.15, 0.15] });
  const chemo = put(sc, "chemo", vial(0.14, 0.5, "hot"), { at: [-3.0, 1.2, 0] });
  const waves: Part[] = []; for (let i = 0; i < 4; i++) waves.push(put(sc, `w${i}`, ring(0.2 + 0.15 * i, 10, "hot", "z"), { at: [P[0] - 0.05, P[1] + 0.15, 0.2] }));
  const std: Part[] = []; for (let i = 0; i < 3; i++) std.push(put(sc, `std${i}`, capsule(1.0, "accent"), { at: [0.3, 1.5 - 0.35 * i, 0] }));
  const stdOk = put(sc, "stdOk", tick([1.0, 1.2, 0.05], 0.2));
  const cb = put(sc, "cb", capsule(1.1, "accent"), { at: [0.3, -0.3, 0] });
  const cb1 = put(sc, "cb1", ring(0.25, 10, "accent", "z"), { at: [P[0], P[1] + 0.72, 0.2] });
  const dizzy: Part[] = []; for (let i = 0; i < 3; i++) dizzy.push(put(sc, `dz${i}`, mote(0.06, "hot"), { at: [P[0] + 0.35 * Math.cos(i * 2.1), P[1] + 1.05 + 0.15 * Math.sin(i * 2.1), 0.1] }));
  const trial = put(sc, "trial", doc(0.6, 0.7, 3, "accent"), { at: [2.0, 0.6, 0] });
  const smoke = put(sc, "smoke", cylinder(0.05, 0.6, 6, 2, "soft", true, true), { at: [2.0, -1.2, 0], rotZ: Math.PI / 3 });
  const smokeX = put(sc, "smokeX", cross([2.0, -1.2, 0.1], 0.25));
  const hyper = put(sc, "hyper", ring(0.35, 10, "hot", "z"), { at: [0.3, -1.5, 0.05] });
  sc.mesh.labels = [L([P[0], P[1] - 1.35, 0], "Emetic signalling: dorsal vagal complex and area postrema"), L([0.65, 2.0, 0], "5-HT3, NK1 antagonists and olanzapine: first line"), L([0.3, -0.75, 0], "Dronabinol and nabilone (FDA 1985) for refractory nausea via CB1"), L([2.0, -1.85, 0], "Smoked or vaped: untested; heavy use can cause hyperemesis")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...std, stdOk, cb, cb1, ...dizzy, trial, smoke, smokeX, hyper);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); moveTo(pts, base, chemo, [-3.0, 1.2, 0], [P[0] - 0.55, P[1] + 0.35, 0.1], clamp(u * 1.5)); waves.forEach((w, i) => { const v = (t * 4 + i / 4) % 1; setAlpha(alpha, w, clamp(u * 2 - 0.6) * (1 - v)); movePart(pts, base, w, [0, 0.9 * v, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, brainstem, 0.5 + 0.5 * clamp(u * 2 - 1) * pulse(t, 5)); return { caption: "1 · Chemotherapy triggers emetic signalling that converges on the dorsal vagal complex and area postrema in the brainstem" }; }
    if (s === 1) { const u = Q(t, 1); moveTo(pts, base, chemo, [-3.0, 1.2, 0], [P[0] - 0.55, P[1] + 0.35, 0.1], 1); waves.forEach((w, i) => { const v = (t * 4 + i / 4) % 1; setAlpha(alpha, w, (1 - u * 0.8) * (1 - v)); movePart(pts, base, w, [0, 0.9 * v, 0], 0.6 + 0.8 * v); }); cascade(alpha, std, clamp(u * 1.5)); setAlpha(alpha, stdOk, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "2 · Modern antiemetics (5-HT3 antagonists, NK1 antagonists, olanzapine) control it for most people and are first line; cannabinoids were never compared head to head with them" }; }
    if (s === 2) { const u = Q(t, 2); moveTo(pts, base, chemo, [-3.0, 1.2, 0], [P[0] - 0.55, P[1] + 0.35, 0.1], 1); waves.forEach((w, i) => { const v = (t * 4 + i / 4) % 1; setAlpha(alpha, w, (0.2 + 0.4 * (1 - u)) * (1 - v)); movePart(pts, base, w, [0, 0.9 * v, 0], 0.6 + 0.8 * v); }); std.forEach((p) => setAlpha(alpha, p, 0.6)); setAlpha(alpha, stdOk, 0.5); setAlpha(alpha, cb, 1); moveTo(pts, base, cb, [0.3, -0.3, 0], [P[0] + 0.4, P[1] + 0.72, 0.2], clamp(u * 1.5)); setAlpha(alpha, cb1, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); dizzy.forEach((d, i) => { setAlpha(alpha, d, clamp(u * 2 - 1.2)); movePart(pts, base, d, [0, 0, 0], 1, t * TAU * 2 + i); }); return { caption: "3 · When standard drugs fail, dronabinol (synthetic THC) and nabilone, FDA-approved in 1985, activate CB1 receptors in those brainstem centres and beat placebo and prochlorperazine in trials of that era, at the price of dizziness, dysphoria and sedation" }; }
    const u = Q(t, 3); moveTo(pts, base, chemo, [-3.0, 1.2, 0], [P[0] - 0.55, P[1] + 0.35, 0.1], 1); waves.forEach((w, i) => { const v = (t * 4 + i / 4) % 1; setAlpha(alpha, w, 0.2 * (1 - v)); movePart(pts, base, w, [0, 0.9 * v, 0], 0.6 + 0.8 * v); }); std.forEach((p) => setAlpha(alpha, p, 0.6)); setAlpha(alpha, stdOk, 0.5); setAlpha(alpha, cb, 1); moveTo(pts, base, cb, [0.3, -0.3, 0], [P[0] + 0.4, P[1] + 0.72, 0.2], 1); setAlpha(alpha, cb1, 0.7); dizzy.forEach((d, i) => { setAlpha(alpha, d, 0.6); movePart(pts, base, d, [0, 0, 0], 1, t * TAU * 2 + i); });
    setAlpha(alpha, trial, clamp(u * 2)); setAlpha(alpha, smoke, clamp(u * 2 - 0.5)); setAlpha(alpha, smokeX, clamp(u * 2 - 0.8) * (0.6 + 0.4 * pulse(t, 4))); setAlpha(alpha, hyper, clamp(u * 2 - 1) * 0.7);
    return { caption: "4 · A 2024 Australian randomised trial found an oral THC:CBD extract added to standard antiemetics reduced refractory nausea, cited by the 2024 ASCO cannabis guideline; smoked or vaped cannabis is untested and heavy chronic use can itself cause hyperemesis" };
  });
}

// ---------------------------------------------------------------- 24. ESM3
export function esm3(): Mesh {
  const sc = scene();
  const rows: Part[][] = [[], [], []]; const RY = [1.5, 1.0, 0.5];
  for (let r = 0; r < 3; r++) for (let i = 0; i < 8; i++) rows[r].push(put(sc, `r${r}${i}`, quad(0.16, 0.16, ["accent", "soft", "hot"][r]), { at: [-2.8 + 0.24 * i, RY[r], 0] }));
  const masks: Part[] = []; for (let i = 0; i < 6; i++) masks.push(put(sc, `m${i}`, ring(0.1, 6, "hot", "z"), { at: [-2.8 + 0.24 * ((i * 3) % 8), RY[i % 3], 0.05] }));
  const mod = put(sc, "model", model(1.6, 1.2, "accent"), { at: [0.3, 1.0, 0] });
  const GFP: Vec3 = [1.6, -1.3, 0];
  const gfp = put(sc, "gfp", cylinder(0.45, 0.8, 10, 3, "accent", true, true), { at: GFP });
  const glow: Part[] = []; for (let i = 0; i < 3; i++) glow.push(put(sc, `g${i}`, ring(0.55 + 0.2 * i, 12, "accent", "z"), { at: GFP }));
  const dist = put(sc, "dist", ticks(-2.8, -0.4, -1.5, 6, "soft"));
  const nat = put(sc, "nat", blob(0.14, "soft"), { at: [-2.8, -1.5, 0.05] });
  const far = put(sc, "far", mote(0.12, "accent"), { at: [-2.8, -1.5, 0.05] });
  const lock = put(sc, "lock", box(0.5, 0.35, 0.2, "hot", true), { at: [2.6, 1.0, 0] });
  const lockArc = put(sc, "lockArc", polyline([[2.4, 1.18, 0], [2.4, 1.45, 0], [2.8, 1.45, 0], [2.8, 1.18, 0]], "hot"));
  const openSmall = put(sc, "openSmall", box(0.3, 0.22, 0.15, "accent", true), { at: [2.6, 0.3, 0] });
  sc.mesh.labels = [L([-1.95, 1.95, 0], "Sequence, structure and function as tokens"), L([0.3, 1.85, 0], "ESM3 (EvolutionaryScale): masked multimodal transformer, up to 98B parameters"), L([GFP[0], GFP[1] - 0.8, 0], "esmGFP: a working fluorescent protein far from any natural sequence"), L([2.6, 1.85, 0], "Largest weights closed; smaller versions open")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...masks, gfp, ...glow, dist, nat, far, lock, lockArc, openSmall);
    setAlpha(alpha, mod, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); rows.forEach((row, r) => cascade(alpha, row, clamp(u * 1.5 - 0.2 * r))); return { caption: "1 · A protein is written three ways at once: its amino acid sequence, its structure and its function, each turned into tokens" }; }
    if (s === 1) { const u = Q(t, 1); masks.forEach((m, i) => setAlpha(alpha, m, clamp(u * 2 - 0.15 * i) * (0.6 + 0.4 * pulse(t, 4)))); rows.forEach((row) => row.forEach((q, i) => setAlpha(alpha, q, (i * 3) % 8 === 0 ? 0.3 : 1))); setAlpha(alpha, mod, 0.5 + 0.5 * u * pulse(t, 5)); return { caption: "2 · A masked multimodal transformer, in models up to 98B parameters, learns to fill in whichever tokens are hidden; a user can prompt with any combination of the three and ask for the rest" }; }
    if (s === 2) { const u = Q(t, 2); masks.forEach((m) => setAlpha(alpha, m, 0.5)); setAlpha(alpha, mod, 1); setAlpha(alpha, dist, clamp(u * 2)); setAlpha(alpha, nat, clamp(u * 2 - 0.3)); setAlpha(alpha, far, clamp(u * 2 - 0.5)); moveTo(pts, base, far, [-2.8, -1.5, 0.05], [-0.4, -1.5, 0.05], clamp(u * 1.5 - 0.3)); setAlpha(alpha, gfp, clamp(u * 2 - 0.8)); glow.forEach((g, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, g, clamp(u * 2 - 1) * (1 - v) * 0.8); movePart(pts, base, g, [0, 0, 0], 0.7 + 0.6 * v); }); return { caption: "3 · Prompted for a fluorescent protein, it generated esmGFP, which works in the lab and sits far from any natural sequence (Science 2025), showing it can invent new functional proteins" }; }
    const u = Q(t, 3); masks.forEach((m) => setAlpha(alpha, m, 0.5)); setAlpha(alpha, mod, 1); setAlpha(alpha, dist, 1); setAlpha(alpha, nat, 1); setAlpha(alpha, far, 1); moveTo(pts, base, far, [-2.8, -1.5, 0.05], [-0.4, -1.5, 0.05], 1); setAlpha(alpha, gfp, 1); glow.forEach((g, i) => { const v = (t * 3 + i / 3) % 1; setAlpha(alpha, g, (1 - v) * 0.8); movePart(pts, base, g, [0, 0, 0], 0.7 + 0.6 * v); });
    setAlpha(alpha, lock, clamp(u * 2)); setAlpha(alpha, lockArc, clamp(u * 2)); setAlpha(alpha, openSmall, clamp(u * 2 - 1));
    return { caption: "4 · Protein engineers use it to explore binders, enzymes and antibodies for cancer targets; the largest weights are closed with smaller versions open, so the strongest capabilities come only through the company" };
  });
}

// ---------------------------------------------------------------- 25. high-throughput screening and DNA-encoded libraries
export function htsLibraries(): Mesh {
  const sc = scene();
  const TGT: Vec3 = [2.3, 0.9, 0];
  const target = put(sc, "target", protein(0.6, "soft"), { at: TGT });
  const PL: Vec3 = [-1.4, 0.6, 0];
  const plate = put(sc, "plate", quad(2.4, 1.5, "soft"), { at: PL });
  const wells: Part[] = []; for (let i = 0; i < 24; i++) wells.push(put(sc, `w${i}`, mote(0.06, i === 7 || i === 18 ? "hot" : "accent"), { at: [PL[0] - 1.0 + 0.29 * (i % 8), PL[1] + 0.45 - 0.45 * Math.floor(i / 8), 0.05] }));
  const arm = put(sc, "arm", polyline([[PL[0] - 1.4, PL[1] + 1.3, 0.2], [PL[0] - 1.0, PL[1] + 1.3, 0.2], [PL[0] - 1.0, PL[1] + 0.8, 0.2]], "accent"));
  const hits: Part[] = []; [7, 18].forEach((i, k) => hits.push(put(sc, `hit${k}`, ring(0.14, 8, "hot", "z"), { at: [PL[0] - 1.0 + 0.29 * (i % 8), PL[1] + 0.45 - 0.45 * Math.floor(i / 8), 0.08] })));
  const pool = put(sc, "pool", cylinder(0.45, 0.7, 10, 2, "soft", true, true), { at: [-2.2, -1.5, 0] });
  const del: Part[] = []; for (let i = 0; i < 5; i++) del.push(put(sc, `del${i}`, helix(0.05, 0.3, 2, 10, "accent"), { at: [-2.4 + 0.12 * i, -1.55 + 0.1 * Math.sin(i), 0.2 + 0.05 * i] }));
  const cmp: Part[] = []; for (let i = 0; i < 5; i++) cmp.push(put(sc, `cmp${i}`, mote(0.05, "hot"), { at: [-2.4 + 0.12 * i, -1.35 + 0.1 * Math.sin(i), 0.2 + 0.05 * i] }));
  const virt = put(sc, "virt", screen(1.1, 0.7, "accent"), { at: [0.2, -1.4, 0] });
  const virtDots = put(sc, "virtDots", cloud(10, 0.35, "accent", 7), { at: [0.2, -1.35, 0.05] });
  const hit = put(sc, "hit", mote(0.1, "hot"), { at: [PL[0] - 1.0 + 0.29 * 7, PL[1] + 0.45, 0.1] });
  const road = put(sc, "road", ticks(1.3, 3.0, -1.5, 5, "soft"));
  const drug = put(sc, "drug", capsule(1.0, "accent"), { at: [3.0, -1.1, 0] });
  const gapQ = put(sc, "gapQ", ring(0.3, 10, "hot", "z"), { at: [2.15, -1.5, 0.05] });
  sc.mesh.labels = [L([PL[0], PL[1] + 1.15, 0], "Robotic HTS: 1-2 million compounds in microtitre plates"), L([TGT[0], TGT[1] + 0.95, 0], "Target from CRISPR pooled screens (DepMap, Sanger)"), L([-1.0, -2.3, 0], "DNA-encoded pools (billions); virtual make-on-demand spaces (tens of billions)"), L([2.2, -2.0, 0], "Hits are far from drugs")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...hits, pool, ...del, ...cmp, virt, virtDots, hit, road, drug, gapQ);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, target, 0.5 + 0.5 * clamp(u * 2)); setAlpha(alpha, plate, 0.4 + 0.6 * clamp(u * 2 - 0.5)); cascade(alpha, wells, clamp(u * 1.5)); movePart(pts, base, arm, [1.8 * ((t * 2) % 1), 0, 0], 1); return { caption: "1 · CRISPR pooled screens name a target; robots then test 1-2 million compounds against it in parallel microtitre-plate assays, or fragments by NMR and crystallography" }; }
    if (s === 1) { const u = Q(t, 1); wells.forEach((w) => setAlpha(alpha, w, 1)); movePart(pts, base, arm, [1.8 * ((t * 2) % 1), 0, 0], 1); hits.forEach((h, i) => setAlpha(alpha, h, clamp(u * 2 - 0.4 * i) * (0.5 + 0.5 * pulse(t, 4)))); return { caption: "2 · Readouts are increasingly imaging-based (cell painting); a handful of wells light up as binders or phenotypic modulators, along with false positives and assay artefacts that must be weeded out" }; }
    if (s === 2) { const u = Q(t, 2); wells.forEach((w) => setAlpha(alpha, w, 0.7)); movePart(pts, base, arm, [1.8 * ((t * 2) % 1), 0, 0], 1); hits.forEach((h) => setAlpha(alpha, h, 0.7)); setAlpha(alpha, pool, clamp(u * 2)); del.forEach((d, i) => setAlpha(alpha, d, clamp(u * 2 - 0.3 - 0.1 * i))); cmp.forEach((c, i) => setAlpha(alpha, c, clamp(u * 2 - 0.3 - 0.1 * i))); setAlpha(alpha, virt, clamp(u * 2 - 0.8)); setAlpha(alpha, virtDots, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 3))); return { caption: "3 · DNA-encoded libraries tag each compound with a DNA barcode so billions can be tested in one pool (X-Chem, HitGen, WuXi); virtual screening searches make-on-demand spaces of tens of billions such as Enamine REAL" }; }
    const u = Q(t, 3); wells.forEach((w) => setAlpha(alpha, w, 0.7)); movePart(pts, base, arm, [1.8 * ((t * 2) % 1), 0, 0], 1); hits.forEach((h) => setAlpha(alpha, h, 0.7)); setAlpha(alpha, pool, 1); del.forEach((d) => setAlpha(alpha, d, 1)); cmp.forEach((c) => setAlpha(alpha, c, 1)); setAlpha(alpha, virt, 1); setAlpha(alpha, virtDots, 0.8);
    setAlpha(alpha, hit, clamp(u * 2)); moveTo(pts, base, hit, [PL[0] - 1.0 + 0.29 * 7, PL[1] + 0.45, 0.1], [1.3, -1.5, 0.1], clamp(u * 1.5)); grow(alpha, road, clamp(u * 2 - 0.5)); setAlpha(alpha, gapQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, drug, clamp(u * 2 - 1.2) * 0.7);
    return { caption: "4 · Every route yields hits, not drugs: hit confirmation and years of medicinal chemistry follow, and targets without a pocket still resist" };
  });
}

// ---------------------------------------------------------------- 26. massage therapy in cancer care
export function massageTherapy(): Mesh {
  const sc = scene();
  const bodyP = put(sc, "body", organ(1.7, 0.4, 0.5, "soft"), { at: [-0.6, 0.1, 0] });
  put(sc, "head", sphere(0.32, 4, 8, "soft", true), { at: [-2.55, 0.15, 0] });
  const bed = put(sc, "bed", box(4.2, 0.12, 1.0, "soft", true), { at: [-0.6, -0.4, 0] });
  const hands: Part[] = []; for (let i = 0; i < 2; i++) hands.push(put(sc, `h${i}`, hand("accent"), { at: [-1.4 + 1.0 * i, 0.45, 0.3], scale: 0.55, rotX: -Math.PI / 2 }));
  const pain0 = put(sc, "pain0", bar(1.6, 1.4, 0.25, "hot"), { at: [0, -1.9, 0] });
  const pain1 = put(sc, "pain1", bar(2.0, 0.7, 0.25, "accent"), { at: [0, -1.9, 0] });
  const touch = put(sc, "touch", bar(2.6, 0.7, 0.25, "soft"), { at: [0, -1.9, 0] });
  const tl = put(sc, "tl", ticks(1.3, 2.9, -2.1, 3, "soft"));
  const bone = put(sc, "bone", blob(0.14, "hot"), { at: [0.3, 0.2, 0.3] });
  const port = put(sc, "port", disc(0.12, 8, "hot", "z"), { at: [-1.5, 0.3, 0.35] });
  const plate = put(sc, "plate", cloud(5, 0.2, "hot", 4), { at: [-0.5, 0.25, 0.4] });
  const avoid: Part[] = []; [[0.3, 0.2, 0.4], [-1.5, 0.3, 0.4], [-0.5, 0.25, 0.45]].forEach((c, i) => avoid.push(put(sc, `av${i}`, cross(c as Vec3, 0.12))));
  const guide = put(sc, "guide", doc(0.6, 0.7, 3, "accent"), { at: [2.6, 1.3, 0] });
  sc.mesh.labels = [L([-0.6, 1.3, 0], "Oncology-trained therapist: light pressure"), L([2.1, -2.45, 0], "Immediate relief versus simple touch; no difference at two weeks"), L([2.6, 1.9, 0], "SIO-ASCO 2022: may be offered for pain in palliative and hospice care"), L([-0.6, -0.95, 0], "Avoid tumour sites, wounds, ports, bone metastases, low platelets")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, pain1, touch, tl, bone, port, plate, ...avoid, guide);
    setAlpha(alpha, bed, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, bodyP, 0.6 + 0.4 * pulse(t, 3)); grow(alpha, pain0, clamp(u * 1.5)); hands.forEach((h) => setAlpha(alpha, h, clamp(u * 2 - 1))); return { caption: "1 · A person with advanced cancer and moderate to severe pain lies on the table; the trial that matters enrolled 380 such patients (Annals of Internal Medicine 2008)" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, pain0, 1); hands.forEach((h, i) => { setAlpha(alpha, h, 1); movePart(pts, base, h, [0.5 * Math.sin(t * TAU * 3 + i * Math.PI), 0.04 * Math.sin(t * TAU * 6), 0], 1); }); setAlpha(alpha, bodyP, 1); return { caption: "2 · Six 30-minute sessions over two weeks: mechanical stimulation of skin and muscle reduces sympathetic tone, releases oxytocin and endorphins, and gives attentive human contact" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, pain0, 0.6); hands.forEach((h, i) => { setAlpha(alpha, h, 1); movePart(pts, base, h, [0.5 * Math.sin(t * TAU * 3 + i * Math.PI), 0.04 * Math.sin(t * TAU * 6), 0], 1); }); grow(alpha, pain1, clamp(u * 2)); grow(alpha, touch, clamp(u * 2 - 0.6)); setAlpha(alpha, tl, clamp(u * 2 - 0.3)); return { caption: "3 · Pain and mood improved immediately by more than with simple touch, but sustained benefit over the two weeks did not differ between arms; smaller trials report less anxiety, nausea and fatigue" }; }
    const u = Q(t, 3); setAlpha(alpha, pain0, 0.6); hands.forEach((h, i) => { setAlpha(alpha, h, 1); movePart(pts, base, h, [0.5 * Math.sin(t * TAU * 3 + i * Math.PI), 0.04 * Math.sin(t * TAU * 6), 0], 1); }); show(alpha, 1, pain1, touch, tl);
    setAlpha(alpha, bone, clamp(u * 2)); setAlpha(alpha, port, clamp(u * 2 - 0.2)); setAlpha(alpha, plate, clamp(u * 2 - 0.4)); cascade(alpha, avoid, clamp(u * 2 - 0.5)); setAlpha(alpha, guide, clamp(u * 2 - 1));
    return { caption: "4 · The 2022 SIO-ASCO pain guideline says massage may be offered in palliative and hospice settings; pressure is adapted around tumours, fresh wounds, irradiated skin, ports, bone metastases, thrombosis and low platelet counts" };
  });
}

// ---------------------------------------------------------------- 27. mindfulness-based stress reduction and cognitive therapy
export function mindfulness(): Mesh {
  const sc = scene();
  const P: Vec3 = [-1.6, -0.3, 0];
  const person = put(sc, "person", figure("soft"), { at: P, scale: 1.1 });
  const breath: Part[] = []; for (let i = 0; i < 3; i++) breath.push(put(sc, `br${i}`, ring(0.4 + 0.25 * i, 12, "accent", "z"), { at: [P[0], P[1] + 0.35, 0.2] }));
  const thoughts: Part[] = []; for (let i = 0; i < 5; i++) thoughts.push(put(sc, `th${i}`, mote(0.07, "hot"), { at: [P[0] + 0.6 * Math.cos(i * 1.3), P[1] + 1.1 + 0.4 * Math.sin(i * 1.3), 0.1] }));
  const weeks = put(sc, "weeks", ticks(0.4, 2.9, 1.5, 8, "soft"));
  const group: Part[] = []; for (let i = 0; i < 3; i++) group.push(put(sc, `g${i}`, figure("soft"), { at: [0.8 + 0.8 * i, 0.3, -0.3], scale: 0.5 }));
  const anx0 = put(sc, "anx0", bar(0.8, 1.2, 0.25, "hot"), { at: [0, -2.0, 0] });
  const anx1 = put(sc, "anx1", bar(1.2, 0.7, 0.25, "accent"), { at: [0, -2.0, 0] });
  const dep0 = put(sc, "dep0", bar(1.8, 1.0, 0.25, "hot"), { at: [0, -2.0, 0] });
  const dep1 = put(sc, "dep1", bar(2.2, 0.6, 0.25, "accent"), { at: [0, -2.0, 0] });
  const phone = put(sc, "phone", quad(0.4, 0.7, "accent"), { at: [2.8, -0.5, 0] });
  const pill = put(sc, "pill", capsule(1.0, "soft"), { at: [-2.7, -1.6, 0] });
  const pillOk = put(sc, "pillOk", tick([-2.2, -1.55, 0.05], 0.16));
  sc.mesh.labels = [L([P[0], P[1] - 1.35, 0], "Attention on present-moment experience"), L([1.65, 1.95, 0], "Eight-week manualised group programme (MBSR, MBCT)"), L([1.5, -2.4, 0], "Anxiety and depressive symptoms: moderate reductions, sustained for months"), L([-2.4, -2.05, 0], "Alongside, not instead of, antidepressants and psychotherapy")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, weeks, ...group, anx0, anx1, dep0, dep1, phone, pill, pillOk);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); thoughts.forEach((th, i) => { setAlpha(alpha, th, 0.5 + 0.5 * pulse(t, 5 + i)); movePart(pts, base, th, [0.15 * Math.sin(t * TAU * 3 + i), 0.15 * Math.cos(t * TAU * 2 + i), 0], 1); }); breath.forEach((b) => setAlpha(alpha, b, clamp(u * 2 - 1) * 0.3)); return { caption: "1 · During and after treatment, fear of recurrence and rumination keep the threat system switched on: anxiety and low mood are common" }; }
    if (s === 1) { const u = Q(t, 1); thoughts.forEach((th, i) => { setAlpha(alpha, th, (1 - 0.7 * u) * 0.8); movePart(pts, base, th, [0.15 * Math.sin(t * TAU * 3 + i) * (1 - u), 0.15 * Math.cos(t * TAU * 2 + i) * (1 - u), 0], 1); }); breath.forEach((b, i) => { const v = (t * 2.5 + i / 3) % 1; setAlpha(alpha, b, (1 - v) * 0.8); movePart(pts, base, b, [0, 0, 0], 0.6 + 0.8 * v); }); grow(alpha, weeks, clamp(u * 1.4)); cascade(alpha, group, clamp(u * 2 - 0.5)); return { caption: "2 · MBSR and MBCT are manualised eight-week group programmes of meditation, body awareness and gentle movement that train attention on the present moment and loosen rumination" }; }
    if (s === 2) { const u = Q(t, 2); thoughts.forEach((th) => setAlpha(alpha, th, 0.25)); breath.forEach((b, i) => { const v = (t * 2.5 + i / 3) % 1; setAlpha(alpha, b, (1 - v) * 0.8); movePart(pts, base, b, [0, 0, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, weeks, 1); group.forEach((g) => setAlpha(alpha, g, 1)); grow(alpha, anx0, clamp(u * 2)); grow(alpha, anx1, clamp(u * 2 - 0.4)); grow(alpha, dep0, clamp(u * 2 - 0.6)); grow(alpha, dep1, clamp(u * 2 - 1)); return { caption: "3 · Meta-analyses of randomised trials in people with cancer show moderate reductions in anxiety, depressive symptoms, fear of recurrence and fatigue, sustained for months; the 2023 SIO-ASCO guideline makes this its strongest recommendation" }; }
    const u = Q(t, 3); thoughts.forEach((th) => setAlpha(alpha, th, 0.25)); breath.forEach((b, i) => { const v = (t * 2.5 + i / 3) % 1; setAlpha(alpha, b, (1 - v) * 0.8); movePart(pts, base, b, [0, 0, 0], 0.6 + 0.8 * v); }); setAlpha(alpha, weeks, 1); group.forEach((g) => setAlpha(alpha, g, 1)); show(alpha, 1, anx0, anx1, dep0, dep1);
    setAlpha(alpha, phone, clamp(u * 2)); setAlpha(alpha, pill, clamp(u * 2 - 0.5)); setAlpha(alpha, pillOk, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4)));
    return { caption: "4 · Online and app-based versions have randomised support and widen access; mindfulness does not treat major depression on its own, trials are mostly in breast cancer and Western populations, and it is no reason to withhold antidepressants or psychotherapy" };
  });
}

// ---------------------------------------------------------------- 28. mistletoe extracts
export function mistletoeExtracts(): Mesh {
  const sc = scene();
  const PL: Vec3 = [-2.3, 1.0, 0];
  const stem = put(sc, "stem", polyline([[PL[0], PL[1] - 0.6, 0], [PL[0], PL[1], 0], [PL[0] - 0.35, PL[1] + 0.3, 0], [PL[0], PL[1], 0], [PL[0] + 0.35, PL[1] + 0.3, 0]], "accent"));
  const leaves: Part[] = []; [[-0.5, 0.55], [0.5, 0.55]].forEach((o, i) => leaves.push(put(sc, `lf${i}`, leaf(0.32), { at: [PL[0] + o[0], PL[1] + o[1], 0], rotZ: i === 0 ? 0.5 : -0.5 })));
  const berries: Part[] = []; for (let i = 0; i < 3; i++) berries.push(put(sc, `be${i}`, mote(0.07, "soft"), { at: [PL[0] - 0.12 + 0.12 * i, PL[1] + 0.05 + 0.08 * (i % 2), 0.1] }));
  const vialP = put(sc, "vial", vial(0.16, 0.55, "accent"), { at: [-0.9, 1.0, 0] });
  const syr = put(sc, "syr", syringe(0.6, "accent"), { at: [0.6, 1.3, 0], rotZ: -Math.PI * 0.6 });
  const DISH: Vec3 = [-1.6, -1.3, 0];
  const dish = put(sc, "dish", cylinder(0.6, 0.12, 12, 2, "soft", true, true), { at: DISH });
  const dCells: Part[] = []; for (let i = 0; i < 4; i++) dCells.push(put(sc, `dc${i}`, blob(0.12, "hot"), { at: [DISH[0] - 0.3 + 0.2 * i, DISH[1] + 0.1, 0.1 * (i % 2)] }));
  const P: Vec3 = [1.6, -0.3, 0];
  const patient = put(sc, "patient", figure("soft"), { at: P, scale: 0.9 });
  const site = put(sc, "site", ring(0.14, 8, "hot", "z"), { at: [P[0] + 0.05, P[1] + 0.15, 0.2] });
  const surv0 = put(sc, "surv0", bar(2.6, 0.9, 0.22, "soft"), { at: [0, -2.0, 0] });
  const surv1 = put(sc, "surv1", bar(2.95, 0.9, 0.22, "accent"), { at: [0, -2.0, 0] });
  const cochrane = put(sc, "cochrane", doc(0.6, 0.7, 3, "soft"), { at: [0.2, -1.5, 0] });
  const mel = put(sc, "mel", cloud(5, 0.25, "hot", 6), { at: [P[0] + 0.7, P[1] + 0.7, 0.1] });
  const pdqX = put(sc, "pdqX", cross([0.2, -1.5, 0.1], 0.28));
  sc.mesh.labels = [L([PL[0], PL[1] + 1.25, 0], "Viscum album: lectins and viscotoxins"), L([DISH[0], DISH[1] - 0.65, 0], "Cytotoxic and immunostimulatory in vitro"), L([P[0], P[1] - 1.3, 0], "Injections: site reactions and fever common"), L([2.75, -2.35, 0], "Cochrane 2008, 21 trials: no reliable survival benefit")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, syr, dish, ...dCells, site, surv0, surv1, cochrane, mel, pdqX);
    setAlpha(alpha, patient, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, stem, 1); leaves.forEach((l) => setAlpha(alpha, l, 1)); berries.forEach((b, i) => { const v = clamp(u * 1.5 - 0.1 * i); setAlpha(alpha, b, 1); moveTo(pts, base, b, [PL[0] - 0.12 + 0.12 * i, PL[1] + 0.05 + 0.08 * (i % 2), 0.1], [-0.9, 1.0, 0.1], v); }); setAlpha(alpha, vialP, 0.4 + 0.6 * clamp(u * 2 - 1)); return { caption: "1 · Fermented or unfermented extracts of Viscum album (Iscador, Helixor) contain lectins and viscotoxins; they are the most prescribed complementary cancer treatment in German-speaking Europe" }; }
    if (s === 1) { const u = Q(t, 1); berries.forEach((b, i) => { setAlpha(alpha, b, 0.5); moveTo(pts, base, b, [PL[0] - 0.12 + 0.12 * i, PL[1] + 0.05 + 0.08 * (i % 2), 0.1], [-0.9, 1.0, 0.1], 1); }); setAlpha(alpha, dish, clamp(u * 2)); dCells.forEach((c, i) => { const v = clamp(u * 2 - 0.5 - 0.15 * i); setAlpha(alpha, c, clamp(u * 2 - 0.2) * (1 - 0.6 * v)); movePart(pts, base, c, [0, 0, 0], 1 - 0.4 * v); }); return { caption: "2 · In a dish the lectins induce apoptosis and cytokine release, and they are proposed to stimulate anti-tumour immunity; clinically meaningful immune effects have not been demonstrated" }; }
    if (s === 2) { const u = Q(t, 2); berries.forEach((b, i) => { setAlpha(alpha, b, 0.5); moveTo(pts, base, b, [PL[0] - 0.12 + 0.12 * i, PL[1] + 0.05 + 0.08 * (i % 2), 0.1], [-0.9, 1.0, 0.1], 1); }); setAlpha(alpha, dish, 1); dCells.forEach((c) => { setAlpha(alpha, c, 0.4); movePart(pts, base, c, [0, 0, 0], 0.6); }); setAlpha(alpha, patient, 1); setAlpha(alpha, syr, 1); moveTo(pts, base, syr, [0.6, 1.3, 0], [P[0] - 0.35, P[1] + 0.5, 0.2], clamp(u * 1.5)); setAlpha(alpha, site, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "3 · Given by injection, some low-quality trials reported better quality of life and fewer chemotherapy side effects; injection-site reactions and fever are common and serious harm is rare" }; }
    const u = Q(t, 3); berries.forEach((b, i) => { setAlpha(alpha, b, 0.5); moveTo(pts, base, b, [PL[0] - 0.12 + 0.12 * i, PL[1] + 0.05 + 0.08 * (i % 2), 0.1], [-0.9, 1.0, 0.1], 1); }); setAlpha(alpha, dish, 1); dCells.forEach((c) => { setAlpha(alpha, c, 0.4); movePart(pts, base, c, [0, 0, 0], 0.6); }); setAlpha(alpha, patient, 1); setAlpha(alpha, syr, 0.7); moveTo(pts, base, syr, [0.6, 1.3, 0], [P[0] - 0.35, P[1] + 0.5, 0.2], 1); setAlpha(alpha, site, 0.6);
    grow(alpha, surv0, clamp(u * 2)); grow(alpha, surv1, clamp(u * 2 - 0.3)); setAlpha(alpha, cochrane, clamp(u * 2 - 0.5)); setAlpha(alpha, mel, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, pdqX, clamp(u * 2 - 1));
    return { caption: "4 · The 2008 Cochrane review of 21 randomised trials found survival evidence weak and inconsistent, the best trials negative and a possible increase in melanoma metastases; the 2013 Serbian pancreatic trial was unblinded and unreplicated, and NCI PDQ does not support mistletoe as a cancer treatment" };
  });
}

// ---------------------------------------------------------------- 29. peer support and support groups
export function peerSupport(): Mesh {
  const sc = scene();
  const N = 6; const members: Part[] = [];
  for (let i = 0; i < N; i++) { const a = (TAU * i) / N; members.push(put(sc, `m${i}`, figure(i === 0 ? "accent" : "soft"), { at: [1.5 * Math.cos(a), -0.2, 1.0 * Math.sin(a)], scale: 0.55 })); }
  const circle = put(sc, "circle", ring(1.5, 18, "soft", "y"), { at: [0, -0.7, 0] });
  const lone = put(sc, "lone", ring(0.5, 12, "hot", "z"), { at: [1.5, 0.1, 0.1] });
  const links: Part[] = []; for (let i = 0; i < N; i++) { const a = (TAU * i) / N, b = (TAU * ((i + 1) % N)) / N; links.push(put(sc, `lk${i}`, line([1.5 * Math.cos(a), 0.1, 1.0 * Math.sin(a)], [1.5 * Math.cos(b), 0.1, 1.0 * Math.sin(b)], "accent"))); }
  const dis0 = put(sc, "dis0", bar(-2.7, 1.3, 0.25, "hot"), { at: [0, -2.0, 0] });
  const dis1 = put(sc, "dis1", bar(-2.3, 0.7, 0.25, "accent"), { at: [0, -2.0, 0] });
  const s89 = put(sc, "s89", bar(2.2, 1.4, 0.25, "hot"), { at: [0, -2.0, 0] });
  const s89b = put(sc, "s89b", bar(2.55, 0.7, 0.25, "soft"), { at: [0, -2.0, 0] });
  const s01 = put(sc, "s01", bar(2.2, 0.8, 0.25, "accent"), { at: [0, -2.0, 0] });
  const s01b = put(sc, "s01b", bar(2.55, 0.8, 0.25, "soft"), { at: [0, -2.0, 0] });
  const scr = put(sc, "scr", screen(0.9, 0.6, "accent"), { at: [-2.4, 1.3, 0] });
  const warn = put(sc, "warn", polyline([[-2.65, 1.1, 0.05], [-2.4, 1.55, 0.05], [-2.15, 1.1, 0.05]], "hot", true));
  const mod = put(sc, "mod", tick([-1.7, 1.3, 0.05], 0.16));
  sc.mesh.labels = [L([0, 1.35, 0], "Supportive-expressive group or matched volunteer"), L([-2.5, -2.4, 0], "Distress and isolation fall; mood and pain coping improve"), L([2.4, -2.4, 0], "1989 claim of doubled survival; 2001 NEJM, 235 women: no survival difference"), L([-2.4, 1.95, 0], "Online groups reach further and can misinform; signpost moderated ones")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...links, dis0, dis1, s89, s89b, s01, s01b, scr, warn, mod);
    setAlpha(alpha, circle, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); members.forEach((m, i) => setAlpha(alpha, m, i === 0 ? 1 : 0.35)); setAlpha(alpha, lone, (0.5 + 0.5 * pulse(t, 4)) * clamp(u * 2)); return { caption: "1 · A diagnosis isolates: fear that no one around you understands is itself a source of distress" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, lone, 0.3 * (1 - u)); members.forEach((m, i) => setAlpha(alpha, m, 0.35 + 0.65 * clamp(u * N - i + 1))); cascade(alpha, links, clamp(u * 1.3 - 0.2)); return { caption: "2 · Peer support ranges from one-to-one matched volunteers to professionally led supportive-expressive groups: shared experience normalises fear, models coping and adds emotional expression and problem-solving" }; }
    if (s === 2) { const u = Q(t, 2); members.forEach((m) => setAlpha(alpha, m, 1)); links.forEach((l) => setAlpha(alpha, l, 0.7)); grow(alpha, dis0, clamp(u * 2)); grow(alpha, dis1, clamp(u * 2 - 0.5)); return { caption: "3 · Randomised trials show reduced distress, better mood and better coping with pain, with the largest effects in those most distressed at baseline; it is cheap, charity-run and reaches people who would never see a psychologist" }; }
    const u = Q(t, 3); members.forEach((m) => setAlpha(alpha, m, 1)); links.forEach((l) => setAlpha(alpha, l, 0.7)); show(alpha, 1, dis0, dis1);
    const flip = clamp(u * 2 - 0.8); grow(alpha, s89, clamp(u * 2) * (1 - flip)); grow(alpha, s89b, clamp(u * 2) * (1 - flip)); setAlpha(alpha, s01, flip); setAlpha(alpha, s01b, flip); setAlpha(alpha, scr, clamp(u * 2 - 1)); setAlpha(alpha, warn, clamp(u * 2 - 1.2) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, mod, clamp(u * 2 - 1.4));
    return { caption: "4 · A small 1989 trial suggested groups doubled survival in metastatic breast cancer; the 235-woman replication (Goodwin, NEJM 2001) found better mood and pain but no survival difference, so groups are for quality of life, not the tumour" };
  });
}

// ---------------------------------------------------------------- 30. photothermal (plasmonic) nanoparticle ablation
export function photothermalNanoparticles(): Mesh {
  const sc = scene();
  const ORG: Vec3 = [0.3, -0.2, 0], TUM: Vec3 = [0.6, 0.0, 0.2];
  const prostate = put(sc, "prostate", organ(1.3, 1.0, 0.7, "soft"), { at: ORG });
  const tumour = put(sc, "tumour", blob(0.42, "hot"), { at: TUM });
  const vessel = put(sc, "vessel", tube(0.1, 3.4, "soft"), { at: [-0.9, 1.0, 0.1] });
  const shells: Part[] = []; for (let i = 0; i < 7; i++) shells.push(put(sc, `sh${i}`, ring(0.07, 6, "accent", "z"), { at: [-2.6, 1.0, 0.15] }));
  const shellTo = (i: number): Vec3 => [TUM[0] - 0.25 + 0.14 * (i % 4), TUM[1] - 0.12 + 0.25 * Math.floor(i / 4), 0.35];
  const leak = put(sc, "leak", ring(0.2, 8, "hot", "z"), { at: [TUM[0] - 0.2, 0.75, 0.15] });
  const laser = put(sc, "laser", beam([-2.9, -1.2, 0], [TUM[0] - 0.4, TUM[1] - 0.05, 0.2], 0.12, "hot"));
  const fibre = put(sc, "fibre", cylinder(0.08, 0.6, 6, 2, "soft", true, true), { at: [-2.9, -1.2, 0], rotZ: Math.PI / 2 });
  const heat: Part[] = []; for (let i = 0; i < 3; i++) heat.push(put(sc, `ht${i}`, ring(0.5 + 0.2 * i, 12, "hot", "z"), { at: TUM }));
  const zone = put(sc, "zone", ring(0.55, 14, "accent", "z"), { at: TUM });
  const fn = put(sc, "fn", tick([2.4, 0.9, 0.05], 0.22));
  const depth = put(sc, "depth", ticks(-2.9, -0.9, -2.0, 3, "soft"));
  const depthX = put(sc, "depthX", cross([-0.9, -2.0, 0.05], 0.16));
  const rctQ = put(sc, "rctQ", ring(0.35, 10, "hot", "z"), { at: [2.4, -1.3, 0.05] });
  const lungX = put(sc, "lungX", cross([2.4, -2.0, 0.05], 0.2));
  sc.mesh.labels = [L([-0.9, 1.6, 0], "Silica-gold nanoshells (AuroLase) leak from tumour vessels"), L([-2.9, -0.7, 0], "Near-infrared laser, 800 nm"), L([2.4, 1.4, 0], "Prostate cohorts: zone ablated, urinary and sexual function preserved"), L([1.0, -2.45, 0], "Light reaches only a few centimetres; no randomised comparison; lung study terminated")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, leak, laser, ...heat, zone, fn, depth, depthX, rctQ, lungX);
    setAlpha(alpha, prostate, 0.6);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); shells.forEach((sh, i) => { const v = clamp(u * 1.6 - 0.1 * i); setAlpha(alpha, sh, 1); const mid: Vec3 = [TUM[0] - 0.2, 1.0, 0.15]; if (v < 0.6) moveTo(pts, base, sh, [-2.6, 1.0, 0.15], mid, v / 0.6); else moveTo(pts, base, sh, [-2.6, 1.0, 0.15], [mid[0] + (shellTo(i)[0] - mid[0]) * ((v - 0.6) / 0.4), mid[1] + (shellTo(i)[1] - mid[1]) * ((v - 0.6) / 0.4), shellTo(i)[2]], 1); }); setAlpha(alpha, leak, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "1 · Silica-gold nanoshells infused into the blood leak out through the tumour's abnormally porous vessels and accumulate there, a delivery route that is unreliable in humans" }; }
    if (s === 1) { const u = Q(t, 1); shells.forEach((sh, i) => { setAlpha(alpha, sh, 1); moveTo(pts, base, sh, [-2.6, 1.0, 0.15], shellTo(i), 1); }); setAlpha(alpha, leak, 0.4); setAlpha(alpha, fibre, 1); setAlpha(alpha, laser, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 8))); heat.forEach((h, i) => { const v = (t * 4 + i / 3) % 1; setAlpha(alpha, h, clamp(u * 2 - 1) * (1 - v) * 0.8); movePart(pts, base, h, [0, 0, 0], 0.7 + 0.6 * v); }); return { caption: "2 · A near-infrared laser at 800 nm, the wavelength the shells are tuned to absorb, is shone in under MRI and ultrasound fusion guidance; the particles convert the light into heat" }; }
    if (s === 2) { const u = Q(t, 2); shells.forEach((sh, i) => { setAlpha(alpha, sh, 1); moveTo(pts, base, sh, [-2.6, 1.0, 0.15], shellTo(i), 1); }); setAlpha(alpha, leak, 0.4); setAlpha(alpha, fibre, 1); setAlpha(alpha, laser, 0.6); heat.forEach((h, i) => { const v = (t * 4 + i / 3) % 1; setAlpha(alpha, h, (1 - v) * 0.6); movePart(pts, base, h, [0, 0, 0], 0.7 + 0.6 * v); }); setAlpha(alpha, tumour, 1 - 0.5 * u); movePart(pts, base, tumour, [0, 0, 0], 1 - 0.3 * u); setAlpha(alpha, zone, clamp(u * 2 - 0.5)); setAlpha(alpha, fn, clamp(u * 2 - 1) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · The treated zone passes the ablation threshold while tissue without particles is spared; prostate cohorts reported ablation with preserved urinary and sexual function in a rapid, repeatable outpatient procedure without ionising radiation" }; }
    const u = Q(t, 3); shells.forEach((sh, i) => { setAlpha(alpha, sh, 1); moveTo(pts, base, sh, [-2.6, 1.0, 0.15], shellTo(i), 1); }); setAlpha(alpha, leak, 0.4); setAlpha(alpha, fibre, 1); setAlpha(alpha, laser, 0.6); heat.forEach((h, i) => { const v = (t * 4 + i / 3) % 1; setAlpha(alpha, h, (1 - v) * 0.6); movePart(pts, base, h, [0, 0, 0], 0.7 + 0.6 * v); }); setAlpha(alpha, tumour, 0.5); movePart(pts, base, tumour, [0, 0, 0], 0.7); setAlpha(alpha, zone, 1); setAlpha(alpha, fn, 0.8);
    grow(alpha, depth, clamp(u * 2)); setAlpha(alpha, depthX, clamp(u * 2 - 0.6)); setAlpha(alpha, rctQ, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, lungX, clamp(u * 2 - 1));
    return { caption: "4 · Light penetrates only a few centimetres, delivery depends on leaky vasculature, the lung study was terminated and the approach has never been compared with established focal therapy in a randomised trial; commercial progress has stalled" };
  });
}

// ---------------------------------------------------------------- 31. plasmid DNA and mRNA raw-material manufacturing
export function plasmidManufacturing(): Mesh {
  const sc = scene();
  const FERM: Vec3 = [-2.1, 0.2, 0];
  const ferm = put(sc, "ferm", cylinder(0.7, 1.8, 12, 3, "soft", true, true), { at: FERM });
  const bugs: Part[] = []; for (let i = 0; i < 6; i++) bugs.push(put(sc, `bug${i}`, ellipsoid(0.16, 0.08, 0.08, 3, 6, "accent", true), { at: [FERM[0] - 0.35 + 0.3 * (i % 3), FERM[1] - 0.4 + 0.45 * Math.floor(i / 3), 0.2] }));
  const plasmids: Part[] = []; for (let i = 0; i < 6; i++) plasmids.push(put(sc, `pl${i}`, ring(0.07, 6, "hot", "z"), { at: [FERM[0] - 0.35 + 0.3 * (i % 3), FERM[1] - 0.4 + 0.45 * Math.floor(i / 3), 0.3] }));
  const column = put(sc, "column", cylinder(0.22, 1.2, 8, 3, "accent", true, true), { at: [-0.5, 0.3, 0] });
  const pure = put(sc, "pure", vial(0.16, 0.5, "hot"), { at: [-0.5, -1.2, 0] });
  const template = put(sc, "template", line([0.5, 1.4, 0], [2.0, 1.4, 0], "hot"));
  const mrna = put(sc, "mrna", helix(0.1, 1.4, 4, 30, "accent"), { at: [1.9, 0.2, 0], rotZ: Math.PI / 2 });
  const mods: Part[] = []; for (let i = 0; i < 3; i++) mods.push(put(sc, `md${i}`, mote(0.06, "hot"), { at: [1.4 + 0.5 * i, 0.3, 0.1] }));
  const vector = put(sc, "vector", icosahedronLike(0.3), { at: [2.6, -1.2, 0] });
  const clock = put(sc, "clock", clockFace(0.3), { at: [0.6, -1.4, 0] });
  const single = put(sc, "single", building(0.6, 0.6), { at: [1.5, -1.4, 0] });
  const singleQ = put(sc, "singleQ", ring(0.45, 12, "hot", "z"), { at: [1.5, -1.4, 0.05] });
  const dbDNA = put(sc, "db", polyline([[2.3, 1.9, 0], [2.9, 1.9, 0], [3.0, 1.75, 0], [2.9, 1.6, 0], [2.3, 1.6, 0], [2.2, 1.75, 0]], "accent", true));
  sc.mesh.labels = [L([FERM[0], FERM[1] + 1.3, 0], "Bacterial fermentation of high-copy plasmids"), L([-0.5, 1.2, 0], "Purification: endotoxin and supercoiling specifications"), L([1.9, 0.85, 0], "Linearised template drives in vitro transcription with modified nucleosides"), L([1.5, -2.0, 0], "Weeks of lead time; single-source GMP risk; cell-free doggybone DNA alternative")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, column, pure, template, mrna, ...mods, vector, clock, single, singleQ, dbDNA);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, ferm, 0.7); bugs.forEach((b, i) => { setAlpha(alpha, b, clamp(u * 2 - 0.15 * i)); movePart(pts, base, b, [0.05 * Math.sin(t * TAU * 2 + i), 0.05 * Math.cos(t * TAU * 2 + i), 0], 1); }); plasmids.forEach((p, i) => { setAlpha(alpha, p, clamp(u * 2 - 0.5 - 0.15 * i)); movePart(pts, base, p, [0.05 * Math.sin(t * TAU * 2 + i), 0.05 * Math.cos(t * TAU * 2 + i), 0], 1); }); return { caption: "1 · Every lentiviral vector and every mRNA vaccine starts as GMP plasmid DNA grown in bacteria: high-copy plasmids are amplified by fermentation, invisible to patients but decisive for supply" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, ferm, 0.5); bugs.forEach((b) => setAlpha(alpha, b, 0.5)); plasmids.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [FERM[0] - 0.35 + 0.3 * (i % 3), FERM[1] - 0.4 + 0.45 * Math.floor(i / 3), 0.3], [-0.5, 0.7 - 0.25 * i, 0.3], clamp(u * 1.6 - 0.1 * i)); }); setAlpha(alpha, column, clamp(u * 2)); setAlpha(alpha, pure, clamp(u * 2 - 1)); return { caption: "2 · Purification must meet endotoxin and supercoiling specifications; cell-free enzymatic amplification is the alternative route" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, ferm, 0.5); bugs.forEach((b) => setAlpha(alpha, b, 0.5)); plasmids.forEach((p, i) => { setAlpha(alpha, p, 0.6); moveTo(pts, base, p, [FERM[0] - 0.35 + 0.3 * (i % 3), FERM[1] - 0.4 + 0.45 * Math.floor(i / 3), 0.3], [-0.5, 0.7 - 0.25 * i, 0.3], 1); }); setAlpha(alpha, column, 1); setAlpha(alpha, pure, 1); grow(alpha, template, clamp(u * 2)); grow(alpha, mrna, clamp(u * 1.6 - 0.4)); mods.forEach((m, i) => setAlpha(alpha, m, clamp(u * 2 - 1 - 0.2 * i))); setAlpha(alpha, vector, clamp(u * 2 - 1.2)); return { caption: "3 · The plasmid is linearised into a template for in vitro transcription of mRNA with modified nucleosides, for personalised neoantigen vaccines and in vivo CAR, or packaged into lentiviral vectors" }; }
    const u = Q(t, 3); setAlpha(alpha, ferm, 0.5); bugs.forEach((b) => setAlpha(alpha, b, 0.5)); plasmids.forEach((p, i) => { setAlpha(alpha, p, 0.6); moveTo(pts, base, p, [FERM[0] - 0.35 + 0.3 * (i % 3), FERM[1] - 0.4 + 0.45 * Math.floor(i / 3), 0.3], [-0.5, 0.7 - 0.25 * i, 0.3], 1); }); setAlpha(alpha, column, 1); setAlpha(alpha, pure, 1); setAlpha(alpha, template, 1); setAlpha(alpha, mrna, 1); mods.forEach((m) => setAlpha(alpha, m, 1)); setAlpha(alpha, vector, 1);
    setAlpha(alpha, clock, clamp(u * 2)); movePart(pts, base, clock, [0, 0, 0], 1, u * TAU); setAlpha(alpha, single, clamp(u * 2 - 0.4)); setAlpha(alpha, singleQ, clamp(u * 2 - 0.7) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, dbDNA, clamp(u * 2 - 1));
    return { caption: "4 · Supply tightened during the pandemic and again with individualised mRNA: weeks of lead time and single-source GMP grades pushed dedicated suppliers (Aldevron, VGXI, Cobra) and Touchlight's cell-free doggybone DNA" };
  });
}
/** Small capsid-like body: a filled sphere with a few spokes. */
function icosahedronLike(r: number): Mesh { const m = sphere(r, 3, 6, "accent", true); for (let i = 0; i < 6; i++) { const a = (TAU * i) / 6; add(m, line([r * Math.cos(a), r * Math.sin(a), 0], [1.35 * r * Math.cos(a), 1.35 * r * Math.sin(a), 0], "accent")); } return m; }

// ---------------------------------------------------------------- 32. proteomics instruments and affinity platforms
export function proteomicsPlatforms(): Mesh {
  const sc = scene();
  const tubeP = put(sc, "tube", vial(0.16, 0.6, "hot"), { at: [-2.7, 1.2, 0] });
  const peps: Part[] = []; for (let i = 0; i < 6; i++) peps.push(put(sc, `pep${i}`, line([-2.7, 1.2, 0.1], [-2.5, 1.2, 0.1], "accent")));
  const MS: Vec3 = [-0.9, 0.9, 0];
  const ms = put(sc, "ms", box(1.6, 0.9, 0.6, "soft", true), { at: MS });
  const path = put(sc, "path", polyline([[MS[0] - 0.6, MS[1], 0.31], [MS[0] - 0.2, MS[1] + 0.25, 0.31], [MS[0] + 0.2, MS[1] - 0.25, 0.31], [MS[0] + 0.6, MS[1] + 0.1, 0.31]], "accent"));
  const AX: Vec3 = [0.6, 0.4, 0];
  const spec = put(sc, "spec", axes(AX, 2.3, 1.2));
  const peaks: Part[] = []; [0.9, 0.4, 1.1, 0.3, 0.7, 0.5, 0.95].forEach((h, i) => peaks.push(put(sc, `pk${i}`, bar(AX[0] + 0.25 + 0.3 * i, h, 0.06, i % 3 === 0 ? "hot" : "accent"), { at: [0, AX[1], 0] })));
  const ab1 = put(sc, "ab1", polyline([[-0.2, -0.25, 0], [0, 0, 0], [0.2, -0.25, 0], [0, 0, 0], [0, 0.3, 0]], "accent"), { at: [-2.3, -1.3, 0], scale: 0.8 });
  const ab2 = put(sc, "ab2", polyline([[-0.2, -0.25, 0], [0, 0, 0], [0.2, -0.25, 0], [0, 0, 0], [0, 0.3, 0]], "accent"), { at: [-1.5, -1.3, 0], scale: 0.8, rotZ: Math.PI });
  const prot = put(sc, "prot", blob(0.16, "hot"), { at: [-1.9, -1.3, 0.1] });
  const barcode = put(sc, "barcode", helix(0.06, 0.5, 2, 12, "hot"), { at: [-2.3, -0.75, 0] });
  const cohort = put(sc, "cohort", cloud(12, 0.55, "soft", 8), { at: [0.9, -1.4, 0] });
  const cohortRing = put(sc, "cohortRing", ring(0.7, 14, "accent", "z"), { at: [0.9, -1.4, 0.02] });
  const clinic = put(sc, "clinic", doc(0.55, 0.65, 3, "soft"), { at: [2.6, -1.4, 0] });
  const clinicQ = put(sc, "clinicQ", ring(0.4, 12, "hot", "z"), { at: [2.6, -1.4, 0.05] });
  sc.mesh.labels = [L([MS[0], MS[1] + 0.85, 0], "Bottom-up mass spectrometry: Orbitrap Astral, timsTOF, ZenoTOF"), L([AX[0] + 1.2, AX[1] - 0.3, 0], "Thousands of proteins per sample"), L([-1.9, -2.05, 0], "Affinity platforms: barcoded antibody or aptamer pairs (Olink, SomaScan, NULISA)"), L([1.8, -2.3, 0], "UK Biobank 50,000 participants; CPTAC; few clinical tests yet")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...peps, spec, ...peaks, ab1, ab2, prot, barcode, cohort, cohortRing, clinic, clinicQ);
    setAlpha(alpha, ms, 0.5); setAlpha(alpha, path, 0.3);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tubeP, 1); peps.forEach((p, i) => { const v = clamp(u * 1.6 - 0.12 * i); setAlpha(alpha, p, v > 0 ? 1 : 0); moveTo(pts, base, p, [-2.7, 1.2, 0.1], [MS[0] - 0.6, MS[1] + 0.1 * Math.sin(i), 0.3], v); }); return { caption: "1 · Tissue or blood proteins are digested into peptides; a proteome is thousands of proteins spanning a huge range of abundance" }; }
    if (s === 1) { const u = Q(t, 1); peps.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.7, 1.2, 0.1], [MS[0] - 0.6, MS[1] + 0.1 * Math.sin(i), 0.3], 1); }); setAlpha(alpha, ms, 1); setAlpha(alpha, path, 0.5 + 0.5 * pulse(t, 6)); setAlpha(alpha, spec, clamp(u * 2)); peaks.forEach((p, i) => grow(alpha, p, clamp(u * 2 - 0.3 - 0.1 * i))); return { caption: "2 · Mass spectrometers fragment the peptides and measure their masses (bottom-up MS), reading the proteins directly, including drug targets and their post-translational state" }; }
    if (s === 2) { const u = Q(t, 2); peps.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.7, 1.2, 0.1], [MS[0] - 0.6, MS[1] + 0.1 * Math.sin(i), 0.3], 1); }); setAlpha(alpha, ms, 1); setAlpha(alpha, path, 0.7); setAlpha(alpha, spec, 1); peaks.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, prot, clamp(u * 2)); setAlpha(alpha, ab1, clamp(u * 2 - 0.2)); moveTo(pts, base, ab1, [-2.3, -1.3, 0], [-2.05, -1.3, 0], clamp(u * 2 - 0.4)); setAlpha(alpha, ab2, clamp(u * 2 - 0.2)); moveTo(pts, base, ab2, [-1.5, -1.3, 0], [-1.75, -1.3, 0], clamp(u * 2 - 0.4)); setAlpha(alpha, barcode, clamp(u * 2 - 1)); return { caption: "3 · Affinity platforms take another route: barcoded antibody or aptamer pairs bind each protein and are read out by sequencing or PCR (Olink, SomaScan, NULISA), with single-molecule methods from Nautilus and Quantum-Si emerging" }; }
    const u = Q(t, 3); peps.forEach((p, i) => { setAlpha(alpha, p, 0.7); moveTo(pts, base, p, [-2.7, 1.2, 0.1], [MS[0] - 0.6, MS[1] + 0.1 * Math.sin(i), 0.3], 1); }); setAlpha(alpha, ms, 1); setAlpha(alpha, path, 0.7); setAlpha(alpha, spec, 1); peaks.forEach((p) => setAlpha(alpha, p, 1)); show(alpha, 1, prot, ab1, ab2, barcode); moveTo(pts, base, ab1, [-2.3, -1.3, 0], [-2.05, -1.3, 0], 1); moveTo(pts, base, ab2, [-1.5, -1.3, 0], [-1.75, -1.3, 0], 1);
    setAlpha(alpha, cohort, clamp(u * 2)); setAlpha(alpha, cohortRing, clamp(u * 2 - 0.3) * 0.7); setAlpha(alpha, clinic, clamp(u * 2 - 0.7)); setAlpha(alpha, clinicQ, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · UK Biobank's 50,000-participant Olink dataset and CPTAC's tumour proteogenomics show the discovery value for targets and early-detection markers; cost per sample, low-abundance proteins and cross-platform standardisation keep clinical proteomic tests few" };
  });
}

// ---------------------------------------------------------------- 33. Prov-GigaPath
export function provGigapath(): Mesh {
  const sc = scene();
  const SL: Vec3 = [-1.6, 0.6, 0];
  const wsi = put(sc, "wsi", quad(2.6, 1.6, "soft"), { at: SL });
  const tissue = put(sc, "tissue", cloud(14, 0.9, "hot", 3), { at: [SL[0], SL[1], 0.03] });
  const tiles: Part[] = []; for (let i = 0; i < 10; i++) tiles.push(put(sc, `tl${i}`, quad(0.3, 0.3, "accent"), { at: [SL[0] - 1.1 + 0.45 * (i % 5), SL[1] + 0.35 - 0.7 * Math.floor(i / 5), 0.05] }));
  const enc = put(sc, "enc", box(2.4, 0.3, 0.3, "accent", true), { at: [SL[0], SL[1] - 1.3, 0] });
  const longnet: Part[] = []; [[0, 1], [0, 2], [0, 4], [0, 8], [1, 3], [2, 6], [5, 9]].forEach(([a, b], i) => { const xa = SL[0] - 1.1 + 0.45 * (a % 5), xb = SL[0] - 1.1 + 0.45 * (b % 5); const ya = SL[1] + 0.35 - 0.7 * Math.floor(a / 5), yb = SL[1] + 0.35 - 0.7 * Math.floor(b / 5); const mid: Vec3 = [(xa + xb) / 2, (ya + yb) / 2 + 0.25 + 0.1 * i, 0.1]; longnet.push(put(sc, `ln${i}`, polyline([[xa, ya, 0.1], mid, [xb, yb, 0.1]], "hot"))); });
  const slideEnc = put(sc, "slideEnc", model(1.2, 0.9, "hot"), { at: [1.9, 0.6, 0] });
  const outs: Part[] = []; ["hot", "accent"].forEach((c, i) => outs.push(put(sc, `o${i}`, box(0.6, 0.35, 0.25, c, true), { at: [1.9, -0.8 - 0.5 * i, 0] })));
  const openLock = put(sc, "openLock", box(0.4, 0.3, 0.2, "accent", true), { at: [-2.6, -1.7, 0] });
  const openArc = put(sc, "openArc", polyline([[-2.75, -1.55, 0], [-2.75, -1.3, 0], [-2.45, -1.3, 0], [-2.45, -1.55, 0]], "accent"), { at: [0.12, 0.05, 0], rotZ: 0.4 });
  const single = put(sc, "single", building(0.7, 0.6), { at: [-1.3, -1.7, 0] });
  const singleQ = put(sc, "singleQ", ring(0.5, 12, "hot", "z"), { at: [-1.3, -1.7, 0.05] });
  const heavy = put(sc, "heavy", box(0.6, 0.5, 0.4, "hot", true), { at: [0.3, -1.7, 0] });
  const heavyR: Part[] = []; for (let i = 0; i < 2; i++) heavyR.push(put(sc, `hr${i}`, ring(0.35 + 0.15 * i, 10, "hot", "z"), { at: [0.3, -1.7, 0.1] }));
  sc.mesh.labels = [L([SL[0], SL[1] + 1.05, 0], "Whole slide at gigapixel scale: 171,189 slides, 1.3 billion tiles"), L([SL[0], SL[1] - 1.65, 0], "DINOv2 tile encoder"), L([1.9, 1.35, 0], "LongNet slide encoder: dilated attention across the whole slide"), L([-0.7, -2.3, 0], "Open weights; one US health system; heavy compute")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...tiles, enc, ...longnet, ...outs, openLock, openArc, single, singleQ, heavy, ...heavyR);
    setAlpha(alpha, slideEnc, 0.4);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, wsi, 1); setAlpha(alpha, tissue, 0.5 + 0.5 * u); cascade(alpha, tiles, clamp(u * 1.5 - 0.3)); return { caption: "1 · A pathology slide is a gigapixel image; Prov-GigaPath was trained on 1.3 billion tiles from 171,189 slides and more than 30,000 Providence patients" }; }
    if (s === 1) { const u = Q(t, 1); tiles.forEach((p) => setAlpha(alpha, p, 1)); setAlpha(alpha, enc, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 5))); tiles.forEach((p, i) => movePart(pts, base, p, [0, -0.1 * clamp(u * 3 - 0.2 * i), 0], 1)); return { caption: "2 · A DINOv2 tile encoder turns every tile into a vector, as other pathology models do; the difference comes next" }; }
    if (s === 2) { const u = Q(t, 2); tiles.forEach((p) => { setAlpha(alpha, p, 1); movePart(pts, base, p, [0, -0.1, 0], 1); }); setAlpha(alpha, enc, 0.7); cascade(alpha, longnet, clamp(u * 1.4)); setAlpha(alpha, slideEnc, 0.4 + 0.6 * clamp(u * 2 - 0.5)); return { caption: "3 · A slide-level LongNet encoder with dilated attention relates tiles across the entire slide at once, rather than piece by piece, so context from far apart regions can be combined" }; }
    const u = Q(t, 3); tiles.forEach((p) => { setAlpha(alpha, p, 1); movePart(pts, base, p, [0, -0.1, 0], 1); }); setAlpha(alpha, enc, 0.7); longnet.forEach((l) => setAlpha(alpha, l, 0.8)); setAlpha(alpha, slideEnc, 1); cascade(alpha, outs, clamp(u * 2));
    show(alpha, clamp(u * 2 - 0.4), openLock, openArc); setAlpha(alpha, single, clamp(u * 2 - 0.7)); setAlpha(alpha, singleQ, clamp(u * 2 - 0.9) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, heavy, clamp(u * 2 - 1)); heavyR.forEach((r, i) => { const v = (t * 3 + i / 2) % 1; setAlpha(alpha, r, clamp(u * 2 - 1) * (1 - v) * 0.7); movePart(pts, base, r, [0, 0, 0], 0.7 + 0.6 * v); });
    return { caption: "4 · Published in Nature in 2024 with open weights, it performs strongly on mutation prediction and cancer subtyping; the data come from a single US health system and whole-slide attention is computationally heavy" };
  });
}

// ---------------------------------------------------------------- 34. PSK (Krestin) as adjuvant therapy
export function pskKrestin(): Mesh {
  const sc = scene();
  const MUSH: Vec3 = [-2.4, 0.9, 0];
  const caps: Part[] = []; for (let i = 0; i < 3; i++) caps.push(put(sc, `cap${i}`, disc(0.55 - 0.12 * i, 12, "accent", "y"), { at: [MUSH[0], MUSH[1] - 0.35 + 0.3 * i, 0] }));
  const glucans: Part[] = []; for (let i = 0; i < 5; i++) glucans.push(put(sc, `gl${i}`, mote(0.06, "accent"), { at: [MUSH[0] + 0.3, MUSH[1], 0.2] }));
  const DC: Vec3 = [0.2, 0.7, 0];
  const dc = put(sc, "dc", cell(0.55, "soft"), { at: DC });
  const dcArms: Part[] = []; for (let i = 0; i < 5; i++) { const a = (TAU * i) / 5; dcArms.push(put(sc, `da${i}`, line([DC[0] + 0.5 * Math.cos(a), DC[1] + 0.5 * Math.sin(a), 0], [DC[0] + 0.8 * Math.cos(a), DC[1] + 0.8 * Math.sin(a), 0], "soft"))); }
  const dectin = put(sc, "dectin", ring(0.14, 8, "hot", "z"), { at: [DC[0] - 0.55, DC[1] + 0.1, 0.15] });
  const nk: Part[] = []; for (let i = 0; i < 3; i++) nk.push(put(sc, `nk${i}`, blob(0.2, "accent"), { at: [1.8 + 0.4 * i, 1.3 - 0.4 * i, 0.1] }));
  const tum = put(sc, "tum", blob(0.35, "hot"), { at: [2.6, 0.2, 0] });
  const stomach = put(sc, "stomach", organ(0.5, 0.4, 0.3, "soft"), { at: [-2.4, -1.2, 0] });
  const chemo = put(sc, "chemo", vial(0.12, 0.4, "accent"), { at: [-1.6, -1.2, 0] });
  const hr0 = put(sc, "hr0", bar(-0.5, 1.0, 0.25, "soft"), { at: [0, -2.0, 0] });
  const hr1 = put(sc, "hr1", bar(-0.1, 0.88, 0.25, "accent"), { at: [0, -2.0, 0] });
  const japan = put(sc, "japan", ring(0.9, 16, "soft", "z"), { at: [1.1, -1.4, 0] });
  const west = put(sc, "west", cross([2.6, -1.4, 0.05], 0.25));
  const supp = put(sc, "supp", capsule(1.0, "soft"), { at: [2.6, -2.2, 0] });
  const suppX = put(sc, "suppX", cross([2.6, -2.2, 0.12], 0.18));
  sc.mesh.labels = [L([MUSH[0], MUSH[1] + 0.85, 0], "Trametes versicolor (turkey tail): beta-glucans"), L([DC[0], DC[1] + 1.15, 0], "Dectin-1 and toll-like receptors on innate immune cells"), L([-0.3, -2.4, 0], "Gastric cancer: 8 trials, 8,009 patients, HR 0.88 (Oba 2007)"), L([2.0, -2.6, 0], "Approved in Japan since 1977; no Western trial; supplements are not PSK")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...glucans, dectin, ...nk, stomach, chemo, hr0, hr1, japan, west, supp, suppX);
    setAlpha(alpha, tum, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); cascade(alpha, caps, clamp(u * 1.5)); glucans.forEach((g, i) => { const v = clamp(u * 2 - 0.8 - 0.1 * i); setAlpha(alpha, g, v > 0 ? 1 : 0); moveTo(pts, base, g, [MUSH[0] + 0.3, MUSH[1], 0.2], [DC[0] - 0.55, DC[1] + 0.1 + 0.15 * (i - 2), 0.2], v); }); return { caption: "1 · Polysaccharide-K is a protein-bound polysaccharide extracted from the turkey tail mushroom, an approved adjuvant drug in Japan since 1977" }; }
    if (s === 1) { const u = Q(t, 1); glucans.forEach((g, i) => { setAlpha(alpha, g, 1); moveTo(pts, base, g, [MUSH[0] + 0.3, MUSH[1], 0.2], [DC[0] - 0.55, DC[1] + 0.1 + 0.15 * (i - 2), 0.2], 1); }); setAlpha(alpha, dectin, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, dc, 0.6 + 0.4 * u); dcArms.forEach((a) => movePart(pts, base, a, [0, 0, 0], 1 + 0.3 * u)); nk.forEach((n, i) => { setAlpha(alpha, n, clamp(u * 2 - 0.5 - 0.2 * i)); moveTo(pts, base, n, [1.8 + 0.4 * i, 1.3 - 0.4 * i, 0.1], [2.6 + 0.45 * Math.cos(i * 2.1), 0.2 + 0.45 * Math.sin(i * 2.1), 0.2], clamp(u * 1.5 - 0.5 - 0.2 * i)); }); setAlpha(alpha, tum, 0.5 + 0.5 * clamp(u * 2 - 1)); return { caption: "2 · Beta-glucans bind dectin-1 and toll-like receptors on innate immune cells, enhancing dendritic cell and NK activity and shifting cytokines toward anti-tumour immunity" }; }
    if (s === 2) { const u = Q(t, 2); glucans.forEach((g, i) => { setAlpha(alpha, g, 0.6); moveTo(pts, base, g, [MUSH[0] + 0.3, MUSH[1], 0.2], [DC[0] - 0.55, DC[1] + 0.1 + 0.15 * (i - 2), 0.2], 1); }); setAlpha(alpha, dectin, 0.6); dcArms.forEach((a) => movePart(pts, base, a, [0, 0, 0], 1.3)); nk.forEach((n, i) => { setAlpha(alpha, n, 1); moveTo(pts, base, n, [1.8 + 0.4 * i, 1.3 - 0.4 * i, 0.1], [2.6 + 0.45 * Math.cos(i * 2.1), 0.2 + 0.45 * Math.sin(i * 2.1), 0.2], 1); }); setAlpha(alpha, tum, 1 - 0.3 * u); setAlpha(alpha, stomach, clamp(u * 2)); setAlpha(alpha, chemo, clamp(u * 2 - 0.3)); grow(alpha, hr0, clamp(u * 2 - 0.5)); grow(alpha, hr1, clamp(u * 2 - 0.9)); return { caption: "3 · After gastric or colorectal surgery it is added to chemotherapy: a meta-analysis of eight randomised trials with 8,009 gastric cancer patients found better overall survival (hazard ratio 0.88, Oba 2007), and three colorectal trials (Sakamoto 2006) agreed" }; }
    const u = Q(t, 3); glucans.forEach((g, i) => { setAlpha(alpha, g, 0.6); moveTo(pts, base, g, [MUSH[0] + 0.3, MUSH[1], 0.2], [DC[0] - 0.55, DC[1] + 0.1 + 0.15 * (i - 2), 0.2], 1); }); setAlpha(alpha, dectin, 0.6); dcArms.forEach((a) => movePart(pts, base, a, [0, 0, 0], 1.3)); nk.forEach((n, i) => { setAlpha(alpha, n, 1); moveTo(pts, base, n, [1.8 + 0.4 * i, 1.3 - 0.4 * i, 0.1], [2.6 + 0.45 * Math.cos(i * 2.1), 0.2 + 0.45 * Math.sin(i * 2.1), 0.2], 1); }); setAlpha(alpha, tum, 0.7); show(alpha, 1, stomach, chemo, hr0, hr1);
    setAlpha(alpha, japan, clamp(u * 2) * 0.7); setAlpha(alpha, west, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, supp, clamp(u * 2 - 0.8)); setAlpha(alpha, suppX, clamp(u * 2 - 1));
    return { caption: "4 · Every trial was Japanese, most are decades old with outdated chemotherapy, and no Western confirmatory trial has been run, so regulators elsewhere have not approved it; over-the-counter turkey tail supplements are not PSK and are unstandardised" };
  });
}

// ---------------------------------------------------------------- 35. self-amplifying and circular RNA therapeutics
export function selfAmplifyingRna(): Mesh {
  const sc = scene();
  const CELL: Vec3 = [0.3, 0.1, 0];
  const c = put(sc, "cell", cell(1.3, "soft"), { at: CELL });
  const lnp = put(sc, "lnp", sphere(0.28, 4, 8, "accent", true), { at: [-2.7, 1.2, 0] });
  const rna = put(sc, "rna", helix(0.07, 0.6, 3, 16, "hot"), { at: [-2.7, 1.2, 0.1], rotZ: Math.PI / 2 });
  const replicase = put(sc, "rep", blob(0.14, "accent"), { at: [CELL[0] - 0.5, CELL[1] + 0.3, 0.3] });
  const copies: Part[] = []; for (let i = 0; i < 5; i++) copies.push(put(sc, `cp${i}`, helix(0.07, 0.6, 3, 16, "hot"), { at: [CELL[0] - 0.4, CELL[1], 0.3], rotZ: Math.PI / 2 }));
  const copyTo = (i: number): Vec3 => [CELL[0] - 0.6 + 0.4 * (i % 3), CELL[1] - 0.6 + 0.45 * Math.floor(i / 3) + 0.2, 0.35];
  const circ = put(sc, "circ", torus(0.32, 0.05, 12, 4, "hot"), { at: [CELL[0] + 0.7, CELL[1] + 0.5, 0.3], rotX: Math.PI / 2 });
  const exo = put(sc, "exo", mote(0.1, "soft"), { at: [CELL[0] + 1.6, CELL[1] + 1.0, 0.3] });
  const exoX = put(sc, "exoX", cross([CELL[0] + 1.05, CELL[1] + 0.75, 0.35], 0.12));
  const prot: Part[] = []; for (let i = 0; i < 6; i++) prot.push(put(sc, `pr${i}`, mote(0.06, "accent"), { at: [CELL[0] + 0.1 * i, CELL[1] - 0.5, 0.4] }));
  const AXo: Vec3 = [1.8, -2.1, 0];
  const dose = put(sc, "dose", axes(AXo, 1.4, 1.3));
  const lin = put(sc, "lin", bar(AXo[0] + 0.3, 0.4, 0.22, "soft"), { at: [0, AXo[1], 0] });
  const sa = put(sc, "sa", bar(AXo[0] + 0.7, 1.0, 0.22, "hot"), { at: [0, AXo[1], 0] });
  const cc = put(sc, "cc", bar(AXo[0] + 1.1, 0.85, 0.22, "accent"), { at: [0, AXo[1], 0] });
  const liver = put(sc, "liver", organ(0.6, 0.4, 0.3), { at: [-2.4, -1.5, 0] });
  const liverIn: Part[] = []; for (let i = 0; i < 3; i++) liverIn.push(put(sc, `li${i}`, mote(0.06, "accent"), { at: [-2.5 + 0.2 * i, -1.5, 0.2] }));
  const sensor = put(sc, "sensor", ring(0.5, 12, "hot", "z"), { at: [CELL[0] - 0.3, CELL[1] - 0.1, 0.4] });
  sc.mesh.labels = [L([-2.7, 1.8, 0], "Lipid nanoparticle carrying RNA"), L([CELL[0], CELL[1] + 1.65, 0], "Alphavirus-derived replicase copies the transcript (saRNA)"), L([CELL[0] + 1.5, CELL[1] + 1.4, 0], "Circular RNA: no free ends for exonucleases"), L([-2.4, -2.1, 0], "Protein per dose; the liver still takes most of it")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, replicase, ...copies, circ, exo, exoX, ...prot, dose, lin, sa, cc, liver, ...liverIn, sensor);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, c, 0.6); moveTo(pts, base, lnp, [-2.7, 1.2, 0], [CELL[0] - 0.6, CELL[1] + 0.3, 0.2], clamp(u * 1.5)); setAlpha(alpha, lnp, 1 - 0.7 * clamp(u * 3 - 2)); moveTo(pts, base, rna, [-2.7, 1.2, 0.1], [CELL[0] - 0.4, CELL[1], 0.3], clamp(u * 1.5)); return { caption: "1 · A lipid nanoparticle delivers RNA into the cell, exactly as an ordinary mRNA vaccine does; linear mRNA is then translated until it is degraded" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, c, 0.6); setAlpha(alpha, lnp, 0.3); moveTo(pts, base, lnp, [-2.7, 1.2, 0], [CELL[0] - 0.6, CELL[1] + 0.3, 0.2], 1); moveTo(pts, base, rna, [-2.7, 1.2, 0.1], [CELL[0] - 0.4, CELL[1], 0.3], 1); setAlpha(alpha, replicase, clamp(u * 2) * (0.6 + 0.4 * pulse(t, 5))); copies.forEach((cp, i) => { const v = clamp(u * 2 - 0.4 - 0.15 * i); setAlpha(alpha, cp, v > 0 ? 1 : 0); moveTo(pts, base, cp, [CELL[0] - 0.4, CELL[1], 0.3], copyTo(i), v); }); return { caption: "2 · Self-amplifying RNA also encodes an alphavirus-derived replicase, so the transcript copies itself in the cytoplasm and a small dose keeps producing protein for days" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, c, 0.6); setAlpha(alpha, lnp, 0.3); moveTo(pts, base, lnp, [-2.7, 1.2, 0], [CELL[0] - 0.6, CELL[1] + 0.3, 0.2], 1); moveTo(pts, base, rna, [-2.7, 1.2, 0.1], [CELL[0] - 0.4, CELL[1], 0.3], 1); setAlpha(alpha, replicase, 0.7); copies.forEach((cp, i) => { setAlpha(alpha, cp, 0.8); moveTo(pts, base, cp, [CELL[0] - 0.4, CELL[1], 0.3], copyTo(i), 1); }); setAlpha(alpha, circ, clamp(u * 2)); movePart(pts, base, circ, [0, 0, 0], 1, t * TAU); setAlpha(alpha, exo, clamp(u * 2 - 0.5)); moveTo(pts, base, exo, [CELL[0] + 1.6, CELL[1] + 1.0, 0.3], [CELL[0] + 1.1, CELL[1] + 0.75, 0.3], clamp(u * 2 - 0.5)); setAlpha(alpha, exoX, clamp(u * 2 - 1.2) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "3 · Circular RNA, made by a permuted intron-exon strategy, has no free ends, so exonucleases cannot start on it and it is translated for longer than linear mRNA" }; }
    const u = Q(t, 3); setAlpha(alpha, c, 0.6); setAlpha(alpha, lnp, 0.3); moveTo(pts, base, lnp, [-2.7, 1.2, 0], [CELL[0] - 0.6, CELL[1] + 0.3, 0.2], 1); moveTo(pts, base, rna, [-2.7, 1.2, 0.1], [CELL[0] - 0.4, CELL[1], 0.3], 1); setAlpha(alpha, replicase, 0.7); copies.forEach((cp, i) => { setAlpha(alpha, cp, 0.8); moveTo(pts, base, cp, [CELL[0] - 0.4, CELL[1], 0.3], copyTo(i), 1); }); setAlpha(alpha, circ, 1); movePart(pts, base, circ, [0, 0, 0], 1, t * TAU); setAlpha(alpha, exo, 0.6); moveTo(pts, base, exo, [CELL[0] + 1.6, CELL[1] + 1.0, 0.3], [CELL[0] + 1.1, CELL[1] + 0.75, 0.3], 1); setAlpha(alpha, exoX, 0.6);
    prot.forEach((p, i) => { const v = (t * 2 + i / 6) % 1; setAlpha(alpha, p, u * (1 - v)); movePart(pts, base, p, [1.2 * v * Math.cos(i), -0.8 * v, 0], 1); }); setAlpha(alpha, dose, clamp(u * 2)); grow(alpha, lin, clamp(u * 2 - 0.2)); grow(alpha, sa, clamp(u * 2 - 0.5)); grow(alpha, cc, clamp(u * 2 - 0.7)); setAlpha(alpha, liver, clamp(u * 2 - 0.8)); liverIn.forEach((l) => setAlpha(alpha, l, clamp(u * 2 - 1))); setAlpha(alpha, sensor, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Both aim for more protein from a smaller dose, for cancer vaccines and in vivo antibodies, cytokines and CAR constructs; innate sensing of double-stranded intermediates, thin oncology data and lipid nanoparticles that mostly land in the liver are the limits, and the only approved precedent is a COVID-19 vaccine" };
  });
}

// ---------------------------------------------------------------- 36. shark cartilage (AE-941, Neovastat)
export function sharkCartilage(): Mesh {
  const sc = scene();
  const SH: Vec3 = [-1.6, 1.1, 0];
  const shark = put(sc, "shark", ellipsoid(1.3, 0.35, 0.3, 4, 10, "soft", true), { at: SH });
  put(sc, "fin", polyline([[SH[0] - 0.1, SH[1] + 0.3, 0], [SH[0] + 0.1, SH[1] + 0.8, 0], [SH[0] + 0.5, SH[1] + 0.3, 0]], "soft"));
  put(sc, "tail", polyline([[SH[0] + 1.25, SH[1], 0], [SH[0] + 1.7, SH[1] + 0.45, 0], [SH[0] + 1.6, SH[1], 0], [SH[0] + 1.7, SH[1] - 0.35, 0]], "soft"));
  const sharkTum = put(sc, "sharkTum", blob(0.14, "hot"), { at: [SH[0] + 0.4, SH[1] - 0.15, 0.3] });
  const book = put(sc, "book", doc(0.7, 0.9, 4, "accent"), { at: [1.2, 1.2, 0] });
  const bookX = put(sc, "bookX", cross([1.2, 1.2, 0.1], 0.3));
  const pills: Part[] = []; for (let i = 0; i < 3; i++) pills.push(put(sc, `pill${i}`, capsule(1.0, "accent"), { at: [-2.6 + 0.4 * i, -0.5, 0] }));
  const stomach = put(sc, "stomach", organ(0.55, 0.45, 0.3, "soft"), { at: [-1.2, -1.3, 0] });
  const digest: Part[] = []; for (let i = 0; i < 4; i++) digest.push(put(sc, `dg${i}`, mote(0.05, "soft"), { at: [-1.2, -1.3, 0.2] }));
  const tumour = put(sc, "tumour", blob(0.35, "hot"), { at: [0.6, -1.3, 0] });
  const vessels: Part[] = []; for (let i = 0; i < 3; i++) vessels.push(put(sc, `vs${i}`, line([0.6 + 0.35 * Math.cos(i * 2.1), -1.3 + 0.35 * Math.sin(i * 2.1), 0.1], [0.6 + 0.75 * Math.cos(i * 2.1), -1.3 + 0.75 * Math.sin(i * 2.1), 0.1], "hot")));
  const noReach = put(sc, "noReach", cross([-0.3, -1.3, 0.1], 0.18));
  const AX: Vec3 = [1.6, -2.1, 0];
  const surv = put(sc, "surv", axes(AX, 1.5, 1.5));
  const s0 = put(sc, "s0", bar(AX[0] + 0.45, 1.2, 0.3, "accent"), { at: [0, AX[1], 0] });
  const s1 = put(sc, "s1", bar(AX[0] + 1.05, 1.3, 0.3, "soft"), { at: [0, AX[1], 0] });
  const fade: Part[] = []; for (let i = 0; i < 4; i++) fade.push(put(sc, `fd${i}`, ellipsoid(0.3, 0.09, 0.08, 3, 6, "soft", true), { at: [1.4 + 0.5 * i, 0.2, 0] }));
  sc.mesh.labels = [L([SH[0], SH[1] + 1.15, 0], "Sharks do get cancer"), L([1.2, 0.6, 0], "1990s book claim launched a supplement trade"), L([-0.5, -2.2, 0], "Oral extract is digested; nothing reaches the tumour"), L([AX[0] + 0.75, AX[1] - 0.35, 0], "Phase 3, 379 patients (JNCI 2010): 14.4 vs 15.6 months")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, sharkTum, bookX, stomach, ...digest, tumour, ...vessels, noReach, surv, s0, s1, ...fade);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); movePart(pts, base, shark, [0.15 * Math.sin(t * TAU * 2), 0, 0], 1); setAlpha(alpha, book, 1); setAlpha(alpha, sharkTum, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, bookX, clamp(u * 2 - 1)); pills.forEach((p) => setAlpha(alpha, p, 0.4)); return { caption: "1 · A popular 1990s book claimed sharks were immune to cancer (they are not) and that their cartilage inhibits angiogenesis, launching a supplement industry" }; }
    if (s === 1) { const u = Q(t, 1); movePart(pts, base, shark, [0.15 * Math.sin(t * TAU * 2), 0, 0], 1); setAlpha(alpha, sharkTum, 0.7); setAlpha(alpha, bookX, 0.6); pills.forEach((p, i) => { setAlpha(alpha, p, 1); moveTo(pts, base, p, [-2.6 + 0.4 * i, -0.5, 0], [-1.2, -1.2, 0.1], clamp(u * 1.5 - 0.1 * i)); }); setAlpha(alpha, stomach, clamp(u * 2)); digest.forEach((d, i) => { const v = (t * 3 + i / 4) % 1; setAlpha(alpha, d, clamp(u * 2 - 1) * (1 - v)); movePart(pts, base, d, [0.4 * v * Math.cos(i * 1.6), -0.3 * v, 0], 1); }); return { caption: "2 · Cartilage proteins do inhibit angiogenesis in a dish, but the oral powders and extracts are digested and do not deliver those proteins to a tumour" }; }
    if (s === 2) { const u = Q(t, 2); movePart(pts, base, shark, [0.15 * Math.sin(t * TAU * 2), 0, 0], 1); setAlpha(alpha, sharkTum, 0.7); setAlpha(alpha, bookX, 0.6); pills.forEach((p, i) => { setAlpha(alpha, p, 0.5); moveTo(pts, base, p, [-2.6 + 0.4 * i, -0.5, 0], [-1.2, -1.2, 0.1], 1); }); setAlpha(alpha, stomach, 1); setAlpha(alpha, tumour, clamp(u * 2)); vessels.forEach((v) => setAlpha(alpha, v, clamp(u * 2 - 0.3))); setAlpha(alpha, noReach, clamp(u * 2 - 0.8) * (0.5 + 0.5 * pulse(t, 4))); return { caption: "3 · A randomised placebo-controlled trial of powdered cartilage in 83 patients with advanced breast or colorectal cancer (2005) found no effect on survival or quality of life" }; }
    const u = Q(t, 3); movePart(pts, base, shark, [0.15 * Math.sin(t * TAU * 2), 0, 0], 1); setAlpha(alpha, sharkTum, 0.7); setAlpha(alpha, bookX, 0.6); pills.forEach((p, i) => { setAlpha(alpha, p, 0.5); moveTo(pts, base, p, [-2.6 + 0.4 * i, -0.5, 0], [-1.2, -1.2, 0.1], 1); }); setAlpha(alpha, stomach, 1); setAlpha(alpha, tumour, 1); vessels.forEach((v) => setAlpha(alpha, v, 1)); setAlpha(alpha, noReach, 0.7);
    setAlpha(alpha, surv, clamp(u * 2)); grow(alpha, s0, clamp(u * 2 - 0.3)); grow(alpha, s1, clamp(u * 2 - 0.6)); fade.forEach((f, i) => setAlpha(alpha, f, clamp(u * 2 - 0.8) * (1 - 0.25 * i) * (1 - 0.5 * clamp(u * 2 - 1))));
    return { caption: "4 · The phase 3 of the standardised extract AE-941 (Neovastat) in 379 patients with stage III non-small-cell lung cancer on chemoradiotherapy (JNCI 2010) found no survival difference, 14.4 versus 15.6 months; products have caused hepatitis in case reports and the harvest hit shark populations" };
  });
}

// ---------------------------------------------------------------- 37. skin cancer screening (visual skin examination)
export function skinCancerScreening(): Mesh {
  const sc = scene();
  const P: Vec3 = [-1.8, 0.1, 0];
  const person = put(sc, "person", figure("soft"), { at: P, scale: 1.3 });
  const moles: Part[] = []; const MP: Vec3[] = [[P[0] - 0.25, P[1] + 0.5, 0.15], [P[0] + 0.2, P[1] + 0.25, 0.15], [P[0] - 0.1, P[1] - 0.3, 0.15], [P[0] + 0.35, P[1] - 0.6, 0.15]];
  MP.forEach((m, i) => moles.push(put(sc, `mole${i}`, mote(i === 1 ? 0.09 : 0.05, i === 1 ? "hot" : "soft"), { at: m })));
  const scope = put(sc, "scope", ring(0.28, 12, "accent", "z"), { at: [P[0] - 0.25, P[1] + 0.5, 0.3] });
  const scopeH = put(sc, "scopeH", line([0, -0.28, 0], [0, -0.7, 0], "accent"), { at: [P[0] - 0.25, P[1] + 0.5, 0.3] });
  const excise = put(sc, "excise", ellipsoid(0.2, 0.12, 0.05, 3, 8, "accent"), { at: [P[0] + 0.2, P[1] + 0.25, 0.2] });
  const histo = put(sc, "histo", slide("soft"), { at: [0.9, 1.3, 0], scale: 0.7 });
  const usp = put(sc, "usp", doc(0.6, 0.7, 3, "soft"), { at: [0.6, -0.2, 0] });
  const uspI = put(sc, "uspI", ring(0.42, 12, "hot", "z"), { at: [0.6, -0.2, 0.05] });
  const de = put(sc, "de", building(0.8, 0.7), { at: [2.0, -0.2, 0] });
  const deAge = put(sc, "deAge", ticks(1.6, 2.4, -0.75, 3, "soft"));
  const AX: Vec3 = [0.6, -2.3, 0];
  const ax = put(sc, "ax", axes(AX, 2.4, 1.2));
  const inc = put(sc, "inc", polyline([[AX[0] + 0.1, AX[1] + 0.2, 0], [AX[0] + 0.8, AX[1] + 0.45, 0], [AX[0] + 1.6, AX[1] + 0.8, 0], [AX[0] + 2.3, AX[1] + 1.1, 0]], "hot"));
  const mort = put(sc, "mort", polyline([[AX[0] + 0.1, AX[1] + 0.2, 0], [AX[0] + 0.8, AX[1] + 0.22, 0], [AX[0] + 1.6, AX[1] + 0.2, 0], [AX[0] + 2.3, AX[1] + 0.22, 0]], "accent"));
  const cam = put(sc, "cam", cone(0.2, 0.4, 8, "accent"), { at: [-2.9, 1.4, 0.2], rotZ: -Math.PI / 2 });
  sc.mesh.labels = [L([P[0], P[1] - 1.55, 0], "Whole-body visual examination, dermoscopy, excision for histology"), L([0.6, 0.45, 0], "USPSTF 2023: evidence insufficient (I statement)"), L([2.0, 0.45, 0], "Germany: national screening from age 35 since 2008"), L([AX[0] + 1.2, AX[1] - 0.35, 0], "Incidence rising, mortality flat: overdiagnosis")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, excise, histo, usp, uspI, de, deAge, ax, inc, mort, cam);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); moles.forEach((m) => setAlpha(alpha, m, 1)); const k = Math.floor(((t * 4) % 1) * 4) % 4; moveTo(pts, base, scope, [P[0] - 0.25, P[1] + 0.5, 0.3], [MP[k][0], MP[k][1], 0.3], 1); moveTo(pts, base, scopeH, [P[0] - 0.25, P[1] + 0.5, 0.3], [MP[k][0], MP[k][1], 0.3], 1); setAlpha(alpha, moles[1], 0.5 + 0.5 * pulse(t, 4) * clamp(u * 2)); return { caption: "1 · A trained clinician examines the whole skin and puts a dermatoscope on anything suspicious; melanoma is highly curable when it is still thin" }; }
    if (s === 1) { const u = Q(t, 1); moles.forEach((m) => setAlpha(alpha, m, 1)); moveTo(pts, base, scope, [P[0] - 0.25, P[1] + 0.5, 0.3], [MP[1][0], MP[1][1], 0.3], 1); moveTo(pts, base, scopeH, [P[0] - 0.25, P[1] + 0.5, 0.3], [MP[1][0], MP[1][1], 0.3], 1); setAlpha(alpha, excise, clamp(u * 2)); setAlpha(alpha, moles[1], 1 - clamp(u * 2 - 1)); moveTo(pts, base, moles[1], MP[1], [0.9, 1.3, 0.05], clamp(u * 2 - 0.8)); setAlpha(alpha, histo, clamp(u * 2 - 1)); return { caption: "2 · A suspicious lesion is excised for histology; the question is whether examining everyone, rather than only the symptomatic, saves lives" }; }
    if (s === 2) { const u = Q(t, 2); moles.forEach((m) => setAlpha(alpha, m, 1)); setAlpha(alpha, moles[1], 0); moveTo(pts, base, moles[1], MP[1], [0.9, 1.3, 0.05], 1); setAlpha(alpha, scope, 0.5); setAlpha(alpha, scopeH, 0.5); setAlpha(alpha, excise, 0.5); setAlpha(alpha, histo, 1); setAlpha(alpha, usp, clamp(u * 2)); setAlpha(alpha, uspI, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, de, clamp(u * 2 - 0.6)); setAlpha(alpha, deAge, clamp(u * 2 - 1)); return { caption: "3 · No randomised trial has shown a mortality benefit: the US Preventive Services Task Force called the evidence insufficient in 2023 as in 2016, while Germany has screened nationally from age 35 since 2008 after the SCREEN pilot, whose early mortality fall was not sustained" }; }
    const u = Q(t, 3); moles.forEach((m) => setAlpha(alpha, m, 1)); setAlpha(alpha, moles[1], 0); moveTo(pts, base, moles[1], MP[1], [0.9, 1.3, 0.05], 1); setAlpha(alpha, scope, 0.5); setAlpha(alpha, scopeH, 0.5); setAlpha(alpha, excise, 0.5); setAlpha(alpha, histo, 1); show(alpha, 1, usp, de, deAge); setAlpha(alpha, uspI, 0.6);
    setAlpha(alpha, ax, clamp(u * 2)); grow(alpha, inc, clamp(u * 1.5 - 0.2)); grow(alpha, mort, clamp(u * 1.5 - 0.4)); setAlpha(alpha, cam, clamp(u * 2 - 1));
    return { caption: "4 · Rising melanoma incidence without a matching change in mortality points to overdiagnosis of in situ and thin lesions, so most countries target high-risk people with total-body photography, dermoscopy and sequential imaging, increasingly with AI support" };
  });
}

// ---------------------------------------------------------------- 38. biliary stenting and drainage
export function biliaryStenting(): Mesh {
  const sc = scene();
  const LIV: Vec3 = [-0.6, 1.0, 0];
  const liver = put(sc, "liver", organ(1.6, 0.8, 0.5), { at: LIV });
  const duct = put(sc, "duct", cylinder(0.16, 1.9, 10, 3, "soft", false, true), { at: [-0.3, -0.35, 0] });
  const stricture = put(sc, "stricture", blob(0.32, "hot"), { at: [-0.3, -0.4, 0.15] });
  const bileUp: Part[] = []; for (let i = 0; i < 5; i++) bileUp.push(put(sc, `bu${i}`, mote(0.05, "accent"), { at: [LIV[0] - 0.8 + 0.4 * i, LIV[1] - 0.1, 0.3] }));
  const jaund = put(sc, "jaund", figure("accent"), { at: [-2.6, -0.6, 0], scale: 0.7 });
  const scope = put(sc, "scope", polyline([[2.6, -2.3, 0], [1.6, -2.2, 0], [0.6, -1.6, 0], [-0.3, -1.4, 0], [-0.3, -1.0, 0]], "accent"));
  const stent = put(sc, "stent", cylinder(0.08, 1.2, 8, 4, "accent", false, false), { at: [-0.3, -0.4, 0.2] });
  const flow: Part[] = []; for (let i = 0; i < 4; i++) flow.push(put(sc, `fl${i}`, mote(0.05, "accent"), { at: [-0.3, 0.5, 0.25] }));
  const bili0 = put(sc, "bili0", bar(1.5, 1.4, 0.25, "hot"), { at: [0, -0.2, 0] });
  const bili1 = put(sc, "bili1", bar(1.9, 0.4, 0.25, "accent"), { at: [0, -0.2, 0] });
  const chemo = put(sc, "chemo", vial(0.14, 0.5, "accent"), { at: [2.6, 0.5, 0] });
  const chemoOk = put(sc, "chemoOk", tick([2.6, 1.1, 0.05], 0.18));
  const fever = put(sc, "fever", polyline([[2.3, -1.2, 0], [2.6, -0.65, 0], [2.9, -1.2, 0]], "hot", true));
  const occl = put(sc, "occl", cloud(4, 0.1, "hot", 5), { at: [-0.3, -0.5, 0.3] });
  sc.mesh.labels = [L([LIV[0], LIV[1] + 0.95, 0], "Perihilar or distal bile duct cancer: obstructive jaundice"), L([1.2, -2.5, 0], "ERCP-placed stent, or percutaneous transhepatic drainage"), L([1.7, 1.55, 0], "Bilirubin must fall before systemic therapy"), L([2.6, -1.6, 0], "Cholangitis, occlusion; metal stents stay patent longer")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, scope, stent, ...flow, bili1, chemo, chemoOk, fever, occl);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, stricture, 0.6 + 0.4 * pulse(t, 4)); bileUp.forEach((b, i) => { setAlpha(alpha, b, 0.6 + 0.4 * pulse(t, 3 + i)); movePart(pts, base, b, [0, 0.15 * Math.sin(t * TAU * 2 + i) * u, 0], 1); }); setAlpha(alpha, jaund, 0.4 + 0.6 * u); grow(alpha, bili0, clamp(u * 1.5)); return { caption: "1 · A tumour narrows the bile duct; bile backs up into the liver, bilirubin climbs and the patient turns jaundiced, which is how most bile duct cancers present" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, stricture, 0.8); bileUp.forEach((b) => setAlpha(alpha, b, 0.8)); setAlpha(alpha, jaund, 1); setAlpha(alpha, bili0, 1); grow(alpha, scope, clamp(u * 1.5)); setAlpha(alpha, stent, clamp(u * 2 - 1)); movePart(pts, base, stent, [0, 0, 0], 0.3 + 0.7 * clamp(u * 2 - 1)); return { caption: "2 · An endoscope reaches the duct opening from the duodenum (ERCP) and a plastic or self-expanding metal stent is pushed across the stricture; the alternative is percutaneous transhepatic drainage through the skin" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, stricture, 0.6); bileUp.forEach((b) => setAlpha(alpha, b, 0.8 * (1 - 0.6 * u))); setAlpha(alpha, scope, 0.4); setAlpha(alpha, stent, 1); movePart(pts, base, stent, [0, 0, 0], 1); flow.forEach((f, i) => { const v = (t * 3 + i / 4) % 1; setAlpha(alpha, f, u * (1 - 0.3 * v)); movePart(pts, base, f, [0, -1.6 * v, 0], 1); }); setAlpha(alpha, bili0, 1 - 0.6 * u); grow(alpha, bili1, clamp(u * 2 - 0.5)); setAlpha(alpha, jaund, 1 - 0.5 * u); setAlpha(alpha, chemo, clamp(u * 2 - 1)); setAlpha(alpha, chemoOk, clamp(u * 2 - 1.3) * (0.6 + 0.4 * pulse(t, 4))); return { caption: "3 · Bile flows again, bilirubin falls and chemotherapy can be dosed; drainage before surgery is used in selected cases but debated for resectable disease" }; }
    const u = Q(t, 3); setAlpha(alpha, stricture, 0.6); bileUp.forEach((b) => setAlpha(alpha, b, 0.3)); setAlpha(alpha, scope, 0.4); setAlpha(alpha, stent, 1); movePart(pts, base, stent, [0, 0, 0], 1); flow.forEach((f, i) => { const v = (t * 3 + i / 4) % 1; setAlpha(alpha, f, (1 - 0.3 * v) * (1 - 0.5 * u)); movePart(pts, base, f, [0, -1.6 * v, 0], 1); }); setAlpha(alpha, bili0, 0.4); setAlpha(alpha, bili1, 1); setAlpha(alpha, jaund, 0.5); setAlpha(alpha, chemo, 1); setAlpha(alpha, chemoOk, 0.8);
    setAlpha(alpha, occl, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, fever, clamp(u * 2 - 0.6));
    return { caption: "4 · Stents block and infect (cholangitis) and need exchanging; metal stents stay patent longer than plastic, and endoscopic ultrasound-guided drainage and radiofrequency ablation through the stent are newer adjuncts" };
  });
}

// ---------------------------------------------------------------- 39. black salve and other escharotic pastes
export function blackSalve(): Mesh {
  const sc = scene();
  const SK: Vec3 = [-0.4, 0.4, 0];
  const skin = put(sc, "skin", quad(3.0, 1.8, "soft"), { at: SK });
  const lesion = put(sc, "lesion", blob(0.22, "hot"), { at: [SK[0], SK[1] + 0.1, 0.05] });
  const jar = put(sc, "jar", cylinder(0.3, 0.45, 10, 2, "accent", true, true), { at: [-2.6, 1.4, 0] });
  const paste = put(sc, "paste", disc(0.3, 12, "accent", "z"), { at: [SK[0], SK[1] + 0.1, 0.08] });
  const eschar = put(sc, "eschar", disc(0.7, 14, "hot", "z"), { at: [SK[0], SK[1] + 0.1, 0.1] });
  const crater = put(sc, "crater", ring(0.75, 16, "hot", "z"), { at: [SK[0], SK[1] + 0.1, 0.06] });
  const residual = put(sc, "residual", mote(0.1, "hot"), { at: [SK[0] + 0.45, SK[1] - 0.35, 0.08] });
  const spread: Part[] = []; for (let i = 0; i < 4; i++) spread.push(put(sc, `sp${i}`, mote(0.06, "hot"), { at: [SK[0] + 0.45, SK[1] - 0.35, 0.1] }));
  const scalpel = put(sc, "scalpel", polyline([[0, 0, 0], [0.5, 0, 0], [0.75, 0.1, 0]], "accent"), { at: [1.4, -1.6, 0] });
  const cream = put(sc, "cream", capsule(1.0, "accent"), { at: [2.3, -1.6, 0] });
  const rt = put(sc, "rt", beam([2.9, -0.9, 0], [2.3, -1.3, 0], 0.15, "accent"));
  const oks: Part[] = []; [1.7, 2.3, 2.9].forEach((x, i) => oks.push(put(sc, `ok${i}`, tick([x, -2.1, 0.05], 0.12))));
  const fda = put(sc, "fda", doc(0.55, 0.65, 3, "soft"), { at: [-2.4, -1.6, 0] });
  const fdaX = put(sc, "fdaX", cross([-2.4, -1.6, 0.1], 0.28));
  sc.mesh.labels = [L([SK[0], SK[1] + 1.25, 0], "Sanguinarine with zinc chloride: burns whatever it touches"), L([-2.6, 0.85, 0], "Sold online to 'draw out' skin cancers"), L([2.2, -2.5, 0], "Surgery, topical prescription agents, radiotherapy: highly curable"), L([-2.4, -2.2, 0], "FDA fake cancer cures list; illegal to market in the US and Australia")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, paste, eschar, crater, residual, ...spread, scalpel, cream, rt, ...oks, fda, fdaX);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, lesion, 0.6 + 0.4 * pulse(t, 3)); moveTo(pts, base, jar, [-2.6, 1.4, 0], [SK[0] - 0.7, SK[1] + 0.9, 0.2], clamp(u * 1.5)); setAlpha(alpha, paste, clamp(u * 2 - 1)); return { caption: "1 · A basal cell, squamous cell or melanoma on the skin, and a paste of bloodroot sanguinarine and zinc chloride bought online with the promise that it will draw the cancer out" }; }
    if (s === 1) { const u = Q(t, 1); moveTo(pts, base, jar, [-2.6, 1.4, 0], [SK[0] - 0.7, SK[1] + 0.9, 0.2], 1); setAlpha(alpha, paste, 1 - u); setAlpha(alpha, eschar, clamp(u * 1.5)); movePart(pts, base, eschar, [0, 0, 0], 0.4 + 0.6 * u); setAlpha(alpha, lesion, 0.5); return { caption: "2 · It destroys tissue non-selectively: the burn spreads beyond the lesion into normal skin and forms an eschar, with no way to tell tumour from healthy tissue and no margin control" }; }
    if (s === 2) { const u = Q(t, 2); moveTo(pts, base, jar, [-2.6, 1.4, 0], [SK[0] - 0.7, SK[1] + 0.9, 0.2], 1); setAlpha(alpha, eschar, 1 - u); setAlpha(alpha, crater, clamp(u * 2)); setAlpha(alpha, lesion, 0); setAlpha(alpha, residual, clamp(u * 2 - 0.5) * (0.5 + 0.5 * pulse(t, 4))); spread.forEach((p, i) => { const v = clamp(u * 2 - 1 - 0.15 * i); setAlpha(alpha, p, v); movePart(pts, base, p, [0.6 * v * Math.cos(i * 1.6), -0.5 * v - 0.1 * i * v, 0], 1); }); return { caption: "3 · The eschar falls away leaving a large disfiguring wound and, without histology, residual tumour is common; case series document melanomas that spread to metastasis while people believed they were cured, and lost noses and ears" }; }
    const u = Q(t, 3); moveTo(pts, base, jar, [-2.6, 1.4, 0], [SK[0] - 0.7, SK[1] + 0.9, 0.2], 1); setAlpha(alpha, crater, 1); setAlpha(alpha, lesion, 0); setAlpha(alpha, residual, 0.8); spread.forEach((p, i) => { setAlpha(alpha, p, 0.8); movePart(pts, base, p, [0.6 * Math.cos(i * 1.6), -0.5 - 0.1 * i, 0], 1); });
    setAlpha(alpha, scalpel, clamp(u * 2)); setAlpha(alpha, cream, clamp(u * 2 - 0.2)); setAlpha(alpha, rt, clamp(u * 2 - 0.4) * 0.7); cascade(alpha, oks, clamp(u * 2 - 0.5)); setAlpha(alpha, fda, clamp(u * 2 - 0.8)); setAlpha(alpha, fdaX, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Basal and squamous cell cancers are among the most curable with surgery, topical prescription agents or radiotherapy, which is why the harm is so avoidable; the FDA lists black salve among fake cancer cures and it is illegal to market for cancer in the US and Australia" };
  });
}

// ---------------------------------------------------------------- 40. Chemistry42 and Pharma.AI (Insilico)
export function chemistry42(): Mesh {
  const sc = scene();
  const TM: Vec3 = [-2.2, 1.0, 0], GM: Vec3 = [0, 1.0, 0];
  const tgtModel = put(sc, "tgtModel", model(1.1, 0.8, "soft"), { at: TM });
  const target = put(sc, "target", protein(0.45, "hot"), { at: [TM[0], TM[1] - 1.3, 0] });
  const genModel = put(sc, "genModel", model(1.3, 0.9, "accent"), { at: GM });
  const mols: Part[] = []; for (let i = 0; i < 8; i++) mols.push(put(sc, `mol${i}`, octahedron(0.09, i === 5 ? "hot" : "accent"), { at: [GM[0] - 0.5 + 0.15 * i, GM[1] - 0.7, 0.2] }));
  const molTo = (i: number): Vec3 => [GM[0] - 0.9 + 0.26 * i, GM[1] - 1.4 - 0.15 * ((i * 3) % 4), 0.1];
  const filt = put(sc, "filt", line([GM[0] - 1.0, GM[1] - 2.0, 0], [GM[0] + 1.0, GM[1] - 2.0, 0], "soft"));
  const pick = put(sc, "pick", ring(0.2, 10, "hot", "z"), { at: [molTo(5)[0], molTo(5)[1], 0.12] });
  const bound = put(sc, "bound", octahedron(0.09, "hot"), { at: [TM[0] + 0.25, TM[1] - 1.25, 0.3] });
  const lung = put(sc, "lung", organ(0.45, 0.6, 0.35, "soft"), { at: [2.3, 1.1, 0] });
  const lungPhase = put(sc, "lungPhase", ticks(1.8, 2.8, 0.25, 3, "accent"));
  const lungMark = put(sc, "lungMark", mote(0.08, "hot"), { at: [2.3, 0.25, 0.05] });
  const onco: Part[] = []; for (let i = 0; i < 2; i++) onco.push(put(sc, `on${i}`, capsule(1.0, "accent"), { at: [1.9 + 0.8 * i, -1.2, 0] }));
  const oncoTl = put(sc, "oncoTl", ticks(1.6, 3.0, -1.7, 4, "soft"));
  const oncoMark = put(sc, "oncoMark", mote(0.08, "hot"), { at: [1.6, -1.7, 0.05] });
  const share = put(sc, "share", ring(0.4, 12, "hot", "z"), { at: [0.3, -1.6, 0.05] });
  const chem = put(sc, "chem", vial(0.12, 0.4, "soft"), { at: [0.3, -1.6, 0] });
  sc.mesh.labels = [L([TM[0], TM[1] + 0.75, 0], "Target discovery model proposes the target"), L([GM[0], GM[1] + 0.85, 0], "Chemistry42: generative molecule design and filtering"), L([2.3, 1.95, 0], "Rentosertib (TNIK, IPF): phase 2a in 2025, the first AI-discovered drug to reach phase 2"), L([2.0, -2.2, 0], "Oncology: ISM3091 (USP1, licensed to Exelixis), ISM5411, early")];
  const base = sc.mesh.points;
  return frame(sc, 13, (t, pts, alpha) => {
    hide(alpha, ...mols, filt, pick, bound, lung, lungPhase, lungMark, ...onco, oncoTl, oncoMark, share, chem);
    setAlpha(alpha, genModel, 0.5);
    const s = stageOf(t);
    if (s === 0) { const u = Q(t, 0); setAlpha(alpha, tgtModel, 0.5 + 0.5 * u * pulse(t, 5)); setAlpha(alpha, target, clamp(u * 2 - 0.5)); movePart(pts, base, target, [0, 0, 0], 0.4 + 0.6 * clamp(u * 2 - 0.5)); return { caption: "1 · Pharma.AI starts one step earlier than most chemistry tools: a target discovery model proposes which protein to go after" }; }
    if (s === 1) { const u = Q(t, 1); setAlpha(alpha, tgtModel, 1); setAlpha(alpha, target, 1); setAlpha(alpha, genModel, 0.5 + 0.5 * u * pulse(t, 5)); mols.forEach((m, i) => { const v = clamp(u * 1.6 - 0.1 * i); setAlpha(alpha, m, v > 0 ? 1 : 0); moveTo(pts, base, m, [GM[0] - 0.5 + 0.15 * i, GM[1] - 0.7, 0.2], molTo(i), v, 1, v * 3); }); setAlpha(alpha, filt, clamp(u * 2 - 1)); return { caption: "2 · Chemistry42 generates candidate small molecules against that target and filters them; a trial outcome model sits alongside to predict which programmes will succeed" }; }
    if (s === 2) { const u = Q(t, 2); setAlpha(alpha, tgtModel, 1); setAlpha(alpha, target, 1); setAlpha(alpha, genModel, 1); mols.forEach((m, i) => { setAlpha(alpha, m, i === 5 ? 1 : 0.5); moveTo(pts, base, m, [GM[0] - 0.5 + 0.15 * i, GM[1] - 0.7, 0.2], molTo(i), 1, 1, 3); }); setAlpha(alpha, filt, 1); setAlpha(alpha, pick, clamp(u * 2) * (0.5 + 0.5 * pulse(t, 4))); setAlpha(alpha, bound, clamp(u * 2 - 0.5)); setAlpha(alpha, lung, clamp(u * 2 - 0.6)); setAlpha(alpha, lungPhase, clamp(u * 2 - 0.8)); setAlpha(alpha, lungMark, clamp(u * 2 - 1)); moveTo(pts, base, lungMark, [2.3, 0.25, 0.05], [2.8, 0.25, 0.05], clamp(u * 2 - 1)); return { caption: "3 · The platform's clinical validation is rentosertib, a TNIK inhibitor for idiopathic pulmonary fibrosis that reported phase 2a results in 2025, described as the first AI-discovered drug to reach phase 2" }; }
    const u = Q(t, 3); setAlpha(alpha, tgtModel, 1); setAlpha(alpha, target, 1); setAlpha(alpha, genModel, 1); mols.forEach((m, i) => { setAlpha(alpha, m, i === 5 ? 1 : 0.5); moveTo(pts, base, m, [GM[0] - 0.5 + 0.15 * i, GM[1] - 0.7, 0.2], molTo(i), 1, 1, 3); }); setAlpha(alpha, filt, 1); setAlpha(alpha, pick, 0.6); setAlpha(alpha, bound, 1); setAlpha(alpha, lung, 1); setAlpha(alpha, lungPhase, 1); setAlpha(alpha, lungMark, 1); moveTo(pts, base, lungMark, [2.3, 0.25, 0.05], [2.8, 0.25, 0.05], 1);
    cascade(alpha, onco, clamp(u * 2)); setAlpha(alpha, oncoTl, clamp(u * 2 - 0.4)); setAlpha(alpha, oncoMark, clamp(u * 2 - 0.6)); moveTo(pts, base, oncoMark, [1.6, -1.7, 0.05], [2.05, -1.7, 0.05], clamp(u * 2 - 0.6)); setAlpha(alpha, chem, clamp(u * 2 - 0.8)); setAlpha(alpha, share, clamp(u * 2 - 1) * (0.5 + 0.5 * pulse(t, 4)));
    return { caption: "4 · Oncology programmes include ISM3091, a USP1 inhibitor licensed to Exelixis, and ISM5411, both early; whether the speed yields approved cancer drugs, and how much of each is due to the AI rather than conventional chemistry, remain open" };
  });
}
