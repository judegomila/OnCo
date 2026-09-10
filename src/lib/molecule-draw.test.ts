import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { buildScene, createRenderer, toMesh, type Ctx2D, type SpriteCanvas } from "./molecule-draw";
import type { Mol } from "./molecule-render";

const load = (file: string) => JSON.parse(readFileSync(`public/structures/${file}`, "utf8")) as Mol;

/** Records every 2D-context call so a frame can be checked without a browser. */
function recorder() {
  const ops: Array<{ op: string; args: number[] }> = [];
  const nums = (args: unknown[]) => args.filter((a): a is number => typeof a === "number");
  const target: Record<string, unknown> = { fillStyle: "", strokeStyle: "", lineWidth: 1, lineCap: "butt", lineJoin: "miter", globalAlpha: 1 };
  const ctx = new Proxy(target, {
    get(t, k: string) {
      if (k in t) return t[k];
      return (...args: unknown[]) => { ops.push({ op: k, args: nums(args) }); };
    },
    set(t, k: string, v) { t[k] = v; return true; },
  }) as unknown as Ctx2D;
  return { ctx, ops };
}
const fakeSprite = (sizePx: number): SpriteCanvas => {
  const { ctx } = recorder();
  const g = ctx as unknown as SpriteCanvas["ctx"] & { createRadialGradient: () => { addColorStop: () => void } };
  g.createRadialGradient = () => ({ addColorStop: () => {} });
  return { width: sizePx, height: sizePx, ctx: g, image: {} as CanvasImageSource };
};

describe("small molecule scene (lapatinib, PubChem 3D conformer)", () => {
  const mol = load("pubchem-208908.json");
  const scene = buildScene(mol, false);

  it("keeps every atom and bond, lists CPK elements, and fits a sensible radius", () => {
    expect(scene.isProtein).toBe(false);
    expect(scene.atoms.length).toBe(mol.atoms.length);
    expect(scene.bonds.length).toBe(mol.bonds.length);
    expect(scene.elements).toEqual(expect.arrayContaining(["C", "N", "O", "S", "Cl", "F", "H"]));
    expect(scene.hasH).toBe(true);
    expect(scene.radius).toBeGreaterThan(5); expect(scene.radius).toBeLessThan(30);
    expect(scene.bonds.some((b) => b.order === 2)).toBe(true); // aromatic rings carry double bonds in the SDF
  });

  it("draws one sprite per heavy atom, bonds as strokes, all inside the canvas, back to front", () => {
    const r = createRenderer(scene, fakeSprite);
    const { ctx, ops } = recorder();
    r.draw(ctx, { W: 400, H: 300, dpr: 1, yaw: 0.4, pitch: 0.3, showH: false, compact: false, dark: false });
    const images = ops.filter((o) => o.op === "drawImage");
    const heavy = scene.atoms.filter((a) => !a.isH).length;
    expect(images.length).toBe(heavy);
    for (const o of images) { expect(o.args[0]).toBeGreaterThan(-20); expect(o.args[0]).toBeLessThan(420); expect(o.args[1]).toBeGreaterThan(-20); expect(o.args[1]).toBeLessThan(320); }
    const strokes = ops.filter((o) => o.op === "stroke").length;
    expect(strokes).toBeGreaterThan(scene.bonds.filter((b) => !scene.atoms[b.a].isH && !scene.atoms[b.b].isH).length * 3 - 1);
    for (const o of ops) for (const n of o.args) expect(Number.isFinite(n)).toBe(true);
    // Hydrogens appear only on request.
    const { ctx: ctx2, ops: ops2 } = recorder();
    r.draw(ctx2, { W: 400, H: 300, dpr: 1, yaw: 0.4, pitch: 0.3, showH: true, compact: false, dark: true });
    expect(ops2.filter((o) => o.op === "drawImage").length).toBe(scene.atoms.length);
  });

  it("compact frames still draw every heavy atom at thumbnail size", () => {
    const r = createRenderer(scene, fakeSprite);
    const { ctx, ops } = recorder();
    r.draw(ctx, { W: 96, H: 96, dpr: 2, yaw: 1, pitch: 0.2, showH: true, compact: true, dark: false });
    expect(ops.filter((o) => o.op === "drawImage").length).toBe(scene.atoms.filter((a) => !a.isH).length);
  });

  it("wireframe mesh mirrors the snapshot, hiding hydrogens unless asked", () => {
    const m = toMesh(mol, false, false);
    expect(m.points.length).toBe(mol.atoms.length);
    expect(m.segments.length).toBeLessThan(mol.bonds.length);
    expect(toMesh(mol, false, true).segments.length).toBe(mol.bonds.length);
  });
});

describe("protein scene (5A9U, ALK kinase with lorlatinib)", () => {
  const mol = load("pdb-5A9U.json");
  const scene = buildScene(mol, true);

  it("uses the recorded secondary structure, keeps only the ligand as atoms, and centres on it", () => {
    expect(scene.isProtein).toBe(true);
    expect(scene.hasLigand).toBe(true);
    expect(scene.atoms.every((a) => a.lig)).toBe(true);
    expect(scene.atoms.length).toBe(mol.atoms.filter((a) => a[5] === "lig").length);
    expect(scene.chains).toEqual(["A"]);
    expect(scene.residues).toBe(mol.atoms.filter((a) => a[5] === "ca").length);
    expect(scene.rib.count).toBeGreaterThan(scene.residues * 4);
    // Helix points are wider than coil points, so widths vary along the ribbon.
    const ws = new Set(Array.from(scene.rib.W).map((w) => Math.round(w * 100)));
    expect(ws.size).toBeGreaterThan(3);
    const lig = mol.atoms.filter((a) => a[5] === "lig");
    const cx = lig.reduce((s, a) => s + a[0], 0) / lig.length;
    expect(Math.abs(scene.centre[0] - cx)).toBeLessThan(1e-6);
  });

  it("draws one filled quad per ribbon segment plus the ligand in ball-and-stick, with finite coordinates", () => {
    const r = createRenderer(scene, fakeSprite);
    const { ctx, ops } = recorder();
    r.draw(ctx, { W: 500, H: 320, dpr: 1, yaw: 2.1, pitch: 0.35, showH: false, compact: false, dark: false });
    expect(ops.filter((o) => o.op === "fill").length).toBe(scene.rib.segStart.length);
    expect(ops.filter((o) => o.op === "drawImage").length).toBe(scene.atoms.length);
    for (const o of ops) for (const n of o.args) expect(Number.isFinite(n)).toBe(true);
    expect(r.itemCount).toBe(scene.atoms.length + scene.bonds.length + scene.rib.segStart.length);
  });

  it("falls back to inferred secondary structure when a snapshot has no ss field", () => {
    const stripped: Mol = { ...mol, ss: undefined };
    const s2 = buildScene(stripped, true);
    expect(s2.rib.count).toBe(scene.rib.count);
    expect(new Set(Array.from(s2.rib.W).map((w) => Math.round(w * 100))).size).toBeGreaterThan(3);
  });
});

describe("multi-chain antibody (1IGT)", () => {
  it("gives each chain its own colour index and draws without error", () => {
    const scene = buildScene(load("pdb-1IGT.json"), true);
    expect(scene.chains.length).toBe(4);
    expect(scene.hasLigand).toBe(false);
    expect(new Set(Array.from(scene.rib.chain)).size).toBe(4);
    const r = createRenderer(scene, fakeSprite);
    const { ctx, ops } = recorder();
    r.draw(ctx, { W: 320, H: 320, dpr: 1, yaw: 0, pitch: 0, showH: false, compact: true, dark: true });
    expect(ops.filter((o) => o.op === "fill").length).toBe(scene.rib.segStart.length);
  });
});
