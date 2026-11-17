import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { GENERIC_ICON_MD5, genericIcon, md5Of } from "./generic-icons";

const LOGOS = join(process.cwd(), "public", "logos");

describe("a host's stock icon is not a logo", () => {
  it("lists each generic icon by a full md5 with a description of the picture", () => {
    for (const [hash, what] of Object.entries(GENERIC_ICON_MD5)) {
      expect(hash, what).toMatch(/^[0-9a-f]{32}$/);
      expect(what.length, hash).toBeGreaterThan(20);
    }
    // The kinds this list was started for: the WordPress, Vercel and HostGator defaults, the European Commission emblem and a grey placeholder.
    const all = Object.values(GENERIC_ICON_MD5).join(" | ");
    for (const kind of ["WordPress", "Vercel", "HostGator", "European Commission emblem", "Grey block placeholder"]) expect(all).toContain(kind);
  });

  it("recognises bytes by md5 and passes anything else", () => {
    expect(md5Of(Buffer.from(""))).toBe("d41d8cd98f00b204e9800998ecf8427e");
    expect(genericIcon(Buffer.from("an organisation's own logo"))).toBeUndefined();
  });

  it("no file under public/logos is one of them", () => {
    const hits = readdirSync(LOGOS).filter((f) => f !== "index.json").map((f) => [f, genericIcon(readFileSync(join(LOGOS, f)))] as const).filter(([, what]) => what);
    expect(hits.map(([f, what]) => `${f}: ${what}`)).toEqual([]);
  });

  it("the logo index names no file that is missing, for the four records whose stock icons were removed", () => {
    const index = JSON.parse(readFileSync(join(LOGOS, "index.json"), "utf8")) as Record<string, { file: string }>;
    for (const id of ["apmonia-therapeutics", "loki-therapeutics", "cansera", "japan-psycho-oncology-society"]) {
      expect(index[id], id).toBeUndefined();
      for (const ext of ["png", "svg", "jpg", "ico"]) expect(existsSync(join(LOGOS, `${id}.${ext}`)), `${id}.${ext}`).toBe(false);
    }
  });

  it("the fetcher checks every logo it writes against the list", () => {
    const src = readFileSync(join(process.cwd(), "scripts", "fetch-logos.ts"), "utf8");
    // Both passes (first fetch and upgrade) go through notGeneric before an entry reaches the index.
    expect(src.match(/notGeneric\(/g)?.length ?? 0).toBeGreaterThanOrEqual(3);
  });
});
