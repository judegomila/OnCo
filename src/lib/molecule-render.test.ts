import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  apply, catmullRom, chainColour, chainSegments, depthSort, elementColour, elementName, elementsPresent, ELEMENT_COLOURS, inferSecondary, mix,
  normaliseElement, ribbonGeometry, rotation, RIBBON_WIDTH, type Mol, type Vec3,
} from "./molecule-render";

describe("element colours", () => {
  it("follows the CPK convention for the common elements", () => {
    const hue = (hex: string) => { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
    const [rC, gC, bC] = hue(elementColour("C"));
    expect(Math.abs(rC - gC) < 20 && Math.abs(gC - bC) < 20).toBe(true); // carbon grey
    const [rN, , bN] = hue(elementColour("N")); expect(bN).toBeGreaterThan(rN + 80); // nitrogen blue
    const [rO, gO, bO] = hue(elementColour("O")); expect(rO).toBeGreaterThan(gO + 80); expect(rO).toBeGreaterThan(bO + 80); // oxygen red
    const [rS, gS, bS] = hue(elementColour("S")); expect(rS).toBeGreaterThan(bS + 80); expect(gS).toBeGreaterThan(bS + 80); // sulphur yellow
    const [rF, gF, bF] = hue(elementColour("F")); expect(gF).toBeGreaterThan(rF + 40); expect(gF).toBeGreaterThan(bF + 40); // fluorine green
    const [rCl, gCl, bCl] = hue(elementColour("Cl")); expect(gCl).toBeGreaterThan(rCl + 40); expect(gCl).toBeGreaterThan(bCl + 40); // chlorine green
    const [rBr, gBr, bBr] = hue(elementColour("Br")); expect(rBr).toBeGreaterThan(gBr + 60); expect(rBr).toBeGreaterThan(bBr + 60); expect(rBr).toBeLessThan(170); // bromine dark red
    const [rP, gP, bP] = hue(elementColour("P")); expect(rP).toBeGreaterThan(gP + 40); expect(gP).toBeGreaterThan(bP + 60); // phosphorus orange
    const [rH, gH, bH] = hue(elementColour("H")); expect(Math.min(rH, gH, bH)).toBeGreaterThan(215); // hydrogen near white
  });

  it("normalises symbol case and falls back for unknown elements", () => {
    expect(normaliseElement("CL")).toBe("Cl");
    expect(normaliseElement("cl")).toBe("Cl");
    expect(elementColour("CL")).toBe(ELEMENT_COLOURS.Cl);
    expect(elementColour("Xx")).toMatch(/^#[0-9a-f]{6}$/);
    expect(elementColour("Xx")).not.toBe(ELEMENT_COLOURS.C);
    expect(elementName("S")).toBe("sulphur");
    expect(elementName("Pt")).toBe("platinum");
    expect(elementName("Xx")).toBe("Xx");
  });

  it("lists elements present, most frequent first, hydrogens optional", () => {
    const mol: Mol = { atoms: [[0, 0, 0, "C"], [1, 0, 0, "C"], [2, 0, 0, "O"], [3, 0, 0, "H"], [4, 0, 0, "N"], [5, 0, 0, "N"]], bonds: [] };
    expect(elementsPresent(mol)).toEqual(["C", "N", "O"]);
    expect(elementsPresent(mol, { includeH: true })).toEqual(["C", "N", "H", "O"]);
  });

  it("gives each chain a distinct calm colour in both themes", () => {
    const chains = ["A", "B", "C"];
    const light = chains.map((c) => chainColour(chains, c, false)), dark = chains.map((c) => chainColour(chains, c, true));
    expect(new Set(light).size).toBe(3);
    expect(new Set(dark).size).toBe(3);
    expect(light[0]).not.toBe(dark[0]);
  });
});

describe("depth sort", () => {
  it("orders back to front (ascending camera z) and keeps ties stable", () => {
    const items = [{ id: "front", z: 1 }, { id: "back", z: -1 }, { id: "mid1", z: 0 }, { id: "mid2", z: 0 }];
    expect(depthSort(items, (x) => x.z).map((x) => x.id)).toEqual(["back", "mid1", "mid2", "front"]);
  });
  it("does not mutate its input", () => {
    const items = [3, 1, 2];
    const out = depthSort(items, (x) => x);
    expect(out).toEqual([1, 2, 3]);
    expect(items).toEqual([3, 1, 2]);
  });
  it("uses the rotated z, so a point in front after a half turn is behind", () => {
    const p: Vec3 = [0, 0, 1];
    expect(apply(rotation(0, 0), p)[2]).toBeCloseTo(1);
    expect(apply(rotation(Math.PI, 0), p)[2]).toBeCloseTo(-1);
    // rotation preserves length
    const q = apply(rotation(0.7, -0.4), [1, 2, 3]);
    expect(Math.hypot(...q)).toBeCloseTo(Math.hypot(1, 2, 3));
  });
});

describe("colour mixing", () => {
  it("mixes towards the second colour", () => {
    expect(mix("#000000", "#ffffff", 0)).toBe("#000000");
    expect(mix("#000000", "#ffffff", 1)).toBe("#ffffff");
    expect(mix("#000000", "#ffffff", 0.5)).toBe("#808080");
    expect(mix("#abc", "#abc", 0.3)).toBe("#aabbcc");
  });
});

describe("Catmull-Rom", () => {
  it("passes through every control point and has the expected length", () => {
    const pts = [[0, 0, 0], [1, 2, 0], [3, 1, 1], [4, 4, 2]];
    const out = catmullRom(pts, 4);
    expect(out.length).toBe((pts.length - 1) * 4 + 1);
    pts.forEach((p, i) => expect(out[i * 4]).toEqual(p));
  });
  it("handles degenerate inputs", () => {
    expect(catmullRom([], 4)).toEqual([]);
    expect(catmullRom([[1, 2, 3]], 4)).toEqual([[1, 2, 3]]);
  });
  it("interpolates extra dimensions (normals and widths) alongside positions", () => {
    const out = catmullRom([[0, 0, 0, 1], [1, 0, 0, 1], [2, 0, 0, 3], [3, 0, 0, 3]], 2);
    expect(out[3][3]).toBeGreaterThan(1); expect(out[3][3]).toBeLessThan(3); // half way between residues 2 and 3
  });
});

/** Ideal alpha helix C-alpha trace: radius 2.3 A, rise 1.5 A, 100 degrees per residue. */
function helix(n: number): Vec3[] { return Array.from({ length: n }, (_, i) => [2.3 * Math.cos(i * 100 * Math.PI / 180), 2.3 * Math.sin(i * 100 * Math.PI / 180), 1.5 * i] as Vec3); }
/** Ideal beta strand: 3.3 A rise per residue with a 1 A zig-zag. */
function strand(n: number): Vec3[] { return Array.from({ length: n }, (_, i) => [i % 2 ? 1 : 0, 0, 3.3 * i] as Vec3); }

describe("backbone geometry", () => {
  it("splits the C-alpha trace into unbroken runs using the snapshot bonds", () => {
    const mol: Mol = {
      atoms: [[0, 0, 0, "CA", "A", "ca"], [3.8, 0, 0, "CA", "A", "ca"], [7.6, 0, 0, "CA", "A", "ca"], [20, 0, 0, "CA", "A", "ca"], [24, 0, 0, "CA", "A", "ca"], [0, 0, 0, "CA", "B", "ca"], [3.8, 0, 0, "CA", "B", "ca"], [50, 50, 50, "C", "A", "lig"]],
      bonds: [[0, 1, 1], [1, 2, 1], [3, 4, 1], [5, 6, 1]],
    };
    expect(chainSegments(mol)).toEqual([{ chain: "A", idx: [0, 1, 2] }, { chain: "A", idx: [3, 4] }, { chain: "B", idx: [5, 6] }]);
  });

  it("infers helix and strand from C-alpha spacing", () => {
    expect(inferSecondary(helix(14))).toMatch(/^H+$/);
    expect(inferSecondary(strand(10))).toMatch(/^E+$/);
    expect(inferSecondary(helix(3))).toBe("CCC");
  });

  it("agrees with the PDB HELIX/SHEET records well above chance on a kinase (5A9U)", () => {
    const m = JSON.parse(readFileSync("public/structures/pdb-5A9U.json", "utf8")) as Mol;
    let agree = 0, total = 0;
    for (const seg of chainSegments(m)) {
      const ca = seg.idx.map((k) => [m.atoms[k][0], m.atoms[k][1], m.atoms[k][2]] as Vec3);
      const inf = inferSecondary(ca);
      seg.idx.forEach((k, i) => { total++; if (m.ss![k] === inf[i]) agree++; });
    }
    expect(total).toBeGreaterThan(250);
    expect(agree / total).toBeGreaterThan(0.6);
  });

  it("builds a smooth ribbon that is wide on helices, thin on loops, with unit normals", () => {
    const ca = [...helix(12), ...strand(0)];
    const ss = "HHHHHHHHHHHH";
    const rib = ribbonGeometry(ca, ss, 4);
    expect(rib.length).toBe(11 * 4 + 1);
    for (const q of rib) {
      expect(Math.hypot(...q.n)).toBeCloseTo(1, 5);
      expect(q.w).toBeCloseTo(RIBBON_WIDTH.H, 5);
    }
    const loop = ribbonGeometry(strand(6), "CCCCCC", 2);
    for (const q of loop) expect(q.w).toBeCloseTo(RIBBON_WIDTH.C, 5);
    // Normals are sign-continued: neighbours never point opposite ways.
    for (let i = 1; i < rib.length; i++) expect(rib[i].n[0] * rib[i - 1].n[0] + rib[i].n[1] * rib[i - 1].n[1] + rib[i].n[2] * rib[i - 1].n[2]).toBeGreaterThan(0);
  });
});
