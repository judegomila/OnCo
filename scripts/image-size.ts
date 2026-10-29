/**
 * Pixel dimensions of an image buffer, read from its header. No dependencies: PNG (IHDR), JPEG (SOFn), GIF,
 * WebP (VP8, VP8L, VP8X), ICO (the largest entry) and SVG (width/height attributes, else the viewBox).
 * Returns null when the format is not recognised. An SVG with neither reports Infinity: it scales.
 *
 * Used by scripts/fetch-logos.ts to tell a 16-pixel favicon from a real logo, and by its audit.
 */
export type ImageSize = { width: number; height: number; format: "png" | "jpg" | "gif" | "webp" | "ico" | "svg" };

export function imageSize(buf: Buffer): ImageSize | null {
  if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), format: "png" };
  if (buf.length >= 10 && buf.toString("ascii", 0, 3) === "GIF") return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8), format: "gif" };
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
      const len = buf.readUInt16BE(i + 2);
      if ((marker >= 0xc0 && marker <= 0xcf) && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7), format: "jpg" };
      }
      i += 2 + len;
    }
    return null;
  }
  if (buf.length >= 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff, format: "webp" };
    if (chunk === "VP8L") { const b = buf.readUInt32LE(21); return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1, format: "webp" }; }
    if (chunk === "VP8X") return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1, format: "webp" };
    return null;
  }
  if (buf.length >= 6 && buf.readUInt16LE(0) === 0 && buf.readUInt16LE(2) === 1) {
    const n = buf.readUInt16LE(4);
    if (n < 1 || n > 64 || buf.length < 6 + n * 16) return null;
    let best = { width: 0, height: 0 };
    for (let k = 0; k < n; k++) {
      const o = 6 + k * 16;
      const w = buf[o] || 256, h = buf[o + 1] || 256;
      if (w * h > best.width * best.height) best = { width: w, height: h };
    }
    return { ...best, format: "ico" };
  }
  const head = buf.toString("utf8", 0, Math.min(buf.length, 4096));
  const svg = head.match(/<svg\b[^>]*>/i);
  if (svg) {
    const attr = (n: string) => { const m = svg[0].match(new RegExp(`\\s${n}\\s*=\\s*["']\\s*([\\d.]+)(px)?\\s*["']`, "i")); return m ? Number(m[1]) : undefined; };
    const w = attr("width"), h = attr("height");
    if (w && h) return { width: w, height: h, format: "svg" };
    const vb = svg[0].match(/viewBox\s*=\s*["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
    if (vb) return { width: Number(vb[1]), height: Number(vb[2]), format: "svg" };
    return { width: Infinity, height: Infinity, format: "svg" };
  }
  return null;
}
