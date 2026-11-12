/**
 * Static schematics for the functional-model records. These illustrate the methods
 * described and cited on each record; geometry and traces carry no measured values.
 */
import { add, arrow, box, cone, cylinder, ellipsoid, empty, label, line, polyline, sphere, type Mesh, type Vec3 } from "@/lib/wireframe";

function bioprinting(): Mesh {
  const m = empty();
  // Extrusion is one printing method, not the definition of every bioprinter.
  add(m, box(2.5, 0.12, 1.7, "soft", true), { at: [0, -0.8, 0] });
  add(m, cylinder(0.22, 0.8, 8, 2, "soft", false, true), { at: [-0.7, 0.85, 0] });
  add(m, cone(0.22, 0.4, 8, "accent", false), { at: [-0.7, 0.25, 0] });
  add(m, line([-0.7, 0.05, 0], [-0.7, -0.45, 0], "accent"));
  for (const z of [-0.5, 0, 0.5]) add(m, line([-1, -0.6, z], [1, -0.6, z], "accent"));
  for (const x of [-1, -0.5, 0, 0.5, 1]) add(m, line([x, -0.45, -0.5], [x, -0.45, 0.5], "accent"));
  for (const p of [[-0.7, 0.95, 0], [-0.7, 0.7, 0], [-0.5, -0.4, 0.2], [0.5, -0.4, -0.2]] as Vec3[]) {
    add(m, sphere(0.08, 2, 6, "hot", true), { at: p });
  }
  label(m, [-0.7, 1.02, 0], "Extrusion example");
  label(m, [-0.45, 0.7, 0], "Cells in bioink");
  label(m, [-0.5, -0.5, 0.25], "Printed layers");
  return m;
}

function tumourFragments(): Mesh {
  const m = empty();
  add(m, ellipsoid(0.55, 0.4, 0.3, 3, 8, "soft", true), { at: [-1.5, 0.55, 0] });
  for (const p of [[-1.7, 0.6, 0.2], [-1.45, 0.45, 0.2], [-1.3, 0.65, 0.2]] as Vec3[]) {
    add(m, sphere(0.09, 2, 6, "hot", true), { at: p });
  }
  add(m, arrow([-0.8, 0.45, 0], [0, 0.15, 0], "soft"));
  for (const x of [-0.25, 0.65, 1.55]) {
    add(m, cylinder(0.34, 0.28, 10, 2, "soft"), { at: [x, -0.6, 0] });
    add(m, ellipsoid(0.2, 0.09, 0.16, 2, 6, "hot", true), { at: [x, -0.43, 0] });
  }
  // Treatment is applied to a tissue piece; no response or clinical prediction is implied.
  add(m, arrow([1.55, 0.5, 0], [1.55, -0.22, 0], "accent"));
  label(m, [-1.5, 0.7, 0.2], "Native tissue pieces");
  label(m, [-0.6, -0.65, 0], "Control and treatment wells");
  label(m, [0.9, 0.35, 0], "Exposure");
  return m;
}

function singleCellMass(): Mesh {
  const m = empty();
  // A fluid-filled U-channel is suspended in a cantilever, not a mass spectrometer.
  add(m, box(0.45, 1.1, 0.35, "soft", true), { at: [-1.4, 0.35, 0] });
  add(m, box(1.9, 0.75, 0.12, "soft", true), { at: [-0.25, 0.35, 0] });
  add(m, polyline([[-1.6, 0.6, 0.1], [0.45, 0.6, 0.1], [0.6, 0.5, 0.1], [0.6, 0.2, 0.1], [0.45, 0.1, 0.1], [-1.6, 0.1, 0.1]], "accent"));
  add(m, sphere(0.1, 3, 8, "hot", true), { at: [0.15, 0.6, 0.13] });
  add(m, arrow([-1.05, 0.6, 0.12], [-0.55, 0.6, 0.12], "accent", 0.1));
  add(m, arrow([-0.55, 0.1, 0.12], [-1.05, 0.1, 0.12], "accent", 0.1));
  // A schematic frequency deflection as a cell passes, without a mass or time scale.
  add(m, polyline([[-0.9, -0.65, 0], [-0.45, -0.65, 0], [-0.2, -0.95, 0], [0.05, -0.65, 0], [0.5, -0.65, 0]], "hot"));
  label(m, [-0.9, 0.8, 0], "Suspended microchannel");
  label(m, [0.3, 0.55, 0.13], "Cell in fluid");
  label(m, [-0.85, -0.45, 0.65], "Buoyant mass signal");
  return m;
}

export const FUNCTIONAL_MODEL_SCHEMATICS: Record<string, () => Mesh> = {
  bioprinting,
  "ex-vivo-tumour-fragments": tumourFragments,
  "single-cell-mass-assays": singleCellMass,
};
