import { describe, expect, it } from "vitest";
import { formatBits, qrEncode, qrPath, qrSvg } from "./qr";

/** Reads a 7-module finder pattern at (x, y): the 1:1:3:1:1 rings. */
const finderOk = (m: boolean[][], x0: number, y0: number) => {
  for (let dy = 0; dy < 7; dy++) for (let dx = 0; dx < 7; dx++) {
    const ring = Math.max(Math.abs(dx - 3), Math.abs(dy - 3));
    const expected = ring !== 2;
    if (m[y0 + dy][x0 + dx] !== expected) return false;
  }
  return true;
};

describe("qr", () => {
  it("format information matches the published table", () => {
    // ECL M (00), mask 0 -> 101010000010010; ECL L (01), mask 4 -> 110011000101111; ECL H (10), mask 7 -> 000100000111011.
    expect(formatBits(0b00000)).toBe(0b101010000010010);
    expect(formatBits(0b01100)).toBe(0b110011000101111);
    expect(formatBits(0b10111)).toBe(0b000100000111011);
  });

  it("picks the smallest version that fits and sizes the matrix accordingly", () => {
    const small = qrEncode("onco.cc", "M");
    expect(small.version).toBe(1);
    expect(small.size).toBe(21);
    // 14 bytes at M fits version 1 (16 codewords); 15 bytes needs version 2.
    expect(qrEncode("a".repeat(14), "M", { boostEcl: false }).version).toBe(1);
    expect(qrEncode("a".repeat(15), "M", { boostEcl: false }).version).toBe(2);
    const url = qrEncode("https://onco.cc/drugs/trastuzumab-deruxtecan/", "M");
    expect(url.size).toBe(url.version * 4 + 17);
    expect(url.version).toBeGreaterThanOrEqual(3);
  });

  it("draws the three finder patterns, the timing patterns and the dark module", () => {
    const { modules: m, size } = qrEncode("https://onco.cc/", "M");
    expect(finderOk(m, 0, 0)).toBe(true);
    expect(finderOk(m, size - 7, 0)).toBe(true);
    expect(finderOk(m, 0, size - 7)).toBe(true);
    for (let i = 8; i < size - 8; i++) { expect(m[6][i]).toBe(i % 2 === 0); expect(m[i][6]).toBe(i % 2 === 0); }
    expect(m[size - 8][8]).toBe(true);
  });

  it("is deterministic and every module is a boolean", () => {
    const a = qrEncode("https://onco.cc/cancers/tnbc/");
    const b = qrEncode("https://onco.cc/cancers/tnbc/");
    expect(a).toEqual(b);
    for (const row of a.modules) for (const v of row) expect(typeof v).toBe("boolean");
    expect(a.mask).toBeGreaterThanOrEqual(0);
    expect(a.mask).toBeLessThanOrEqual(7);
  });

  it("handles a version 7+ code (version information) and long text", () => {
    const big = qrEncode("x".repeat(200), "M", { boostEcl: false });
    expect(big.version).toBeGreaterThanOrEqual(7);
    expect(big.size).toBe(big.version * 4 + 17);
    expect(() => qrEncode("x".repeat(3000), "L")).toThrow();
  });

  it("emits an SVG with a quiet zone and one square per dark module", () => {
    const code = qrEncode("onco", "L", { boostEcl: false });
    const dark = code.modules.flat().filter(Boolean).length;
    expect(qrPath(code, 4).split("h1v1h-1z").length - 1).toBe(dark);
    const svg = qrSvg("https://onco.cc/", { px: 80 });
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain('width="80"');
    expect(svg).toContain("aria-label=");
  });
});
