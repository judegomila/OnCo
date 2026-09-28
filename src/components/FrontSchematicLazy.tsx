"use client";

import { useEffect, useRef, useState } from "react";
import { Wireframe3D } from "./Wireframe3D";
import type { Mesh } from "@/lib/wireframe";

/**
 * A front's animated schematic, built in the browser instead of on the server.
 *
 * `FrontSchematic` (the server form) calls `frontSchematicFor` and passes the mesh down as a prop, so every point
 * and segment is serialised twice into the page: once in the markup and once in the hydration payload. Measured on
 * 28 September 2026, that is 9.6 to 34.6 KB a front, 386 KB for all nineteen, which is most of why `/fronts/` is
 * 614 KB with four fifths of it payload. On an index of fronts that is the right trade: the drawing is the page.
 *
 * On a page that lifts two or three fronts out of nineteen it is not. The animated meshes are rebuilt in the
 * browser anyway: `Wireframe3D` fetches `@/data/schematics` the first time it draws a mesh carrying an `anim`
 * marker, and calls the same builder. So this component skips the server copy entirely. It renders a plain box of
 * the right height, waits until the reader has scrolled it into view, then imports the builders and draws. A
 * reader who never reaches the section downloads nothing for it; one who does downloads the schematics chunk that
 * `/fronts/` and every animated technology page would have made them download in any case.
 *
 * The cost is that the drawing is not in the HTML, so it is not there with scripting off and not in the static
 * markup a crawler reads. Callers pass `caption` for that reader: it is rendered as text either way.
 */
export function FrontSchematicLazy({ sectionId, caption, height = "h-64 sm:h-72" }: { sectionId: string; caption: string; height?: string }) {
  const [mesh, setMesh] = useState<Mesh | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let live = true;
    const load = () => {
      import("@/data/schematics")
        .then((m) => { if (live) setMesh(m.frontSchematicFor(sectionId)); })
        .catch(() => { /* the caption carries the meaning without the drawing */ });
    };
    if (!("IntersectionObserver" in window)) { load(); return () => { live = false; }; }
    // 400 px of lead time, so the drawing is usually up by the time the section is read.
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { io.disconnect(); load(); } }, { rootMargin: "400px" });
    io.observe(el);
    return () => { live = false; io.disconnect(); };
  }, [sectionId]);

  return (
    <div ref={box}>
      {mesh ? <Wireframe3D mesh={mesh} height={height} speed={0.18} /> : <div className={`${height} w-full`} aria-hidden />}
      <p className="px-4 py-3 border-t border-border text-sm text-muted">{caption}</p>
    </div>
  );
}
