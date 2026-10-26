"use client";

import { useRef } from "react";
import { useLazySchematic } from "@/lib/schematics-loader";
import { Wireframe3D } from "./Wireframe3D";

export type SchematicSpec = { kind: "front"; id: string } | { kind: "tech"; id: string; sections: string[] } | { kind: "term"; category: string };

/**
 * A compact schematic in a grid of cards (the fronts on the home page and /fronts/, a front's technologies, the
 * glossary categories), named rather than carried. The server used to put each drawing's geometry in the page, 20 to
 * 35 KB a card: 500 KB of the home page's 810 KB of HTML was the twenty front drawings, which a reader without
 * JavaScript cannot see. Now the scene is built in the browser when the card nears the screen
 * (src/lib/schematics-loader.ts). Until then an empty canvas with the drawing's own classes holds its box.
 */
export function SchematicThumb({ spec, height, speed }: { spec: SchematicSpec; height: string; speed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const key = spec.kind === "front" ? `front:${spec.id}` : spec.kind === "tech" ? `tech:${spec.id}|${spec.sections.join(" ")}` : `term:${spec.category}`;
  const mesh = useLazySchematic(ref, key, (m) => (spec.kind === "front" ? m.frontSchematicFor(spec.id) : spec.kind === "tech" ? m.schematicFor(spec.id, spec.sections).mesh : m.termSchematicFor(spec.category)));
  if (mesh) return <Wireframe3D mesh={mesh} compact height={height} speed={speed} />;
  return <div className="relative wire-bg"><canvas ref={ref} className={`block w-full ${height}`} aria-hidden /></div>;
}
