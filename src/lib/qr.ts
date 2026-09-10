/**
 * QR code generator (ISO/IEC 18004), byte mode, versions 1 to 40, all four error-correction levels, with
 * automatic version and mask selection. Dependency-free and pure, so it runs in the browser (print header)
 * and in Node (tests, feeds). Output is a boolean matrix or an SVG path. The algorithm follows the public
 * structure of the specification: segment encoding, Reed-Solomon over GF(256) with polynomial 0x11D,
 * block interleaving, function patterns, format and version information, the eight masks and the penalty
 * score that picks between them.
 */

export type Ecl = "L" | "M" | "Q" | "H";

/** Error-correction level as the two format bits. */
const ECL_BITS: Record<Ecl, number> = { L: 1, M: 0, Q: 3, H: 2 };

// Indexed by version (index 0 unused).
const ECC_CODEWORDS_PER_BLOCK: Record<Ecl, number[]> = {
  L: [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  M: [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
  Q: [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  H: [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
};
const NUM_ERROR_CORRECTION_BLOCKS: Record<Ecl, number[]> = {
  L: [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
  M: [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
  Q: [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
  H: [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81],
};

const PENALTY_N1 = 3, PENALTY_N2 = 3, PENALTY_N3 = 40, PENALTY_N4 = 10;

/** Total modules available for data and error correction in a version. */
function numRawDataModules(ver: number): number {
  let result = (16 * ver + 128) * ver + 64;
  if (ver >= 2) {
    const numAlign = Math.floor(ver / 7) + 2;
    result -= (25 * numAlign - 10) * numAlign - 55;
    if (ver >= 7) result -= 36;
  }
  return result;
}

/** Data codewords (bytes) available after error correction. */
function numDataCodewords(ver: number, ecl: Ecl): number {
  return Math.floor(numRawDataModules(ver) / 8) - ECC_CODEWORDS_PER_BLOCK[ecl][ver] * NUM_ERROR_CORRECTION_BLOCKS[ecl][ver];
}

/** Character-count field width for byte mode. */
const byteCountBits = (ver: number) => (ver <= 9 ? 8 : 16);

const getBit = (x: number, i: number) => ((x >>> i) & 1) !== 0;

/** Format information: 5 data bits plus a 10-bit BCH remainder, XOR-masked. Exported for tests. */
export function formatBits(data5: number): number {
  let rem = data5;
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
  return ((data5 << 10) | rem) ^ 0x5412;
}

/** Version information for versions 7 and up: 6 data bits plus a 12-bit BCH remainder. */
function versionBits(ver: number): number {
  let rem = ver;
  for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
  return (ver << 12) | rem;
}

// ---- Reed-Solomon over GF(2^8) with the QR polynomial x^8 + x^4 + x^3 + x^2 + 1 (0x11D) ----

function gfMul(x: number, y: number): number {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d);
    z ^= ((y >>> i) & 1) * x;
  }
  return z & 0xff;
}

function rsDivisor(degree: number): number[] {
  const result = new Array<number>(degree).fill(0);
  result[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      result[j] = gfMul(result[j], root);
      if (j + 1 < degree) result[j] ^= result[j + 1];
    }
    root = gfMul(root, 0x02);
  }
  return result;
}

function rsRemainder(data: number[], divisor: number[]): number[] {
  const result = new Array<number>(divisor.length).fill(0);
  for (const b of data) {
    const factor = b ^ (result.shift() as number);
    result.push(0);
    divisor.forEach((coef, i) => { result[i] ^= gfMul(coef, factor); });
  }
  return result;
}

// ---- Encoding ----

const utf8 = (s: string): number[] => Array.from(new TextEncoder().encode(s));

function appendBits(bb: number[], val: number, len: number) {
  for (let i = len - 1; i >= 0; i--) bb.push((val >>> i) & 1);
}

/** Byte-mode data codewords for `bytes` at `ver`/`ecl`, padded per the specification. */
function encodeBytes(bytes: number[], ver: number, ecl: Ecl): number[] {
  const bb: number[] = [];
  appendBits(bb, 0x4, 4);
  appendBits(bb, bytes.length, byteCountBits(ver));
  for (const b of bytes) appendBits(bb, b, 8);
  const capacity = numDataCodewords(ver, ecl) * 8;
  appendBits(bb, 0, Math.min(4, capacity - bb.length));
  appendBits(bb, 0, (8 - (bb.length % 8)) % 8);
  for (let pad = 0xec; bb.length < capacity; pad ^= 0xec ^ 0x11) appendBits(bb, pad, 8);
  const out: number[] = [];
  for (let i = 0; i < bb.length; i += 8) out.push(parseInt(bb.slice(i, i + 8).join(""), 2));
  return out;
}

/** Split into blocks, add error correction to each, then interleave the bytes. */
function addEccAndInterleave(data: number[], ver: number, ecl: Ecl): number[] {
  const numBlocks = NUM_ERROR_CORRECTION_BLOCKS[ecl][ver];
  const blockEccLen = ECC_CODEWORDS_PER_BLOCK[ecl][ver];
  const rawCodewords = Math.floor(numRawDataModules(ver) / 8);
  const numShortBlocks = numBlocks - (rawCodewords % numBlocks);
  const shortBlockLen = Math.floor(rawCodewords / numBlocks);
  const blocks: number[][] = [];
  const rsDiv = rsDivisor(blockEccLen);
  for (let i = 0, k = 0; i < numBlocks; i++) {
    const datLen = shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1);
    const dat = data.slice(k, k + datLen);
    k += datLen;
    const ecc = rsRemainder(dat, rsDiv);
    if (i < numShortBlocks) dat.push(0);
    blocks.push(dat.concat(ecc));
  }
  const result: number[] = [];
  for (let i = 0; i < blocks[0].length; i++) {
    blocks.forEach((block, j) => {
      if (i !== shortBlockLen - blockEccLen || j >= numShortBlocks) result.push(block[i]);
    });
  }
  return result;
}

// ---- Matrix ----

class Matrix {
  size: number;
  modules: boolean[][];
  isFunction: boolean[][];
  constructor(size: number) {
    this.size = size;
    this.modules = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
    this.isFunction = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  }
  setFunction(x: number, y: number, dark: boolean) {
    this.modules[y][x] = dark;
    this.isFunction[y][x] = true;
  }
}

function alignmentPositions(ver: number): number[] {
  if (ver === 1) return [];
  const numAlign = Math.floor(ver / 7) + 2;
  const size = ver * 4 + 17;
  const step = ver === 32 ? 26 : Math.ceil((ver * 4 + 4) / (numAlign * 2 - 2)) * 2;
  const result = [6];
  for (let pos = size - 7; result.length < numAlign; pos -= step) result.splice(1, 0, pos);
  return result;
}

function drawFinder(m: Matrix, x: number, y: number) {
  for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
    const dist = Math.max(Math.abs(dx), Math.abs(dy));
    const xx = x + dx, yy = y + dy;
    if (xx >= 0 && xx < m.size && yy >= 0 && yy < m.size) m.setFunction(xx, yy, dist !== 2 && dist !== 4);
  }
}

function drawAlignment(m: Matrix, x: number, y: number) {
  for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) m.setFunction(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
}

function drawFormat(m: Matrix, ecl: Ecl, mask: number) {
  const bits = formatBits((ECL_BITS[ecl] << 3) | mask);
  for (let i = 0; i <= 5; i++) m.setFunction(8, i, getBit(bits, i));
  m.setFunction(8, 7, getBit(bits, 6));
  m.setFunction(8, 8, getBit(bits, 7));
  m.setFunction(7, 8, getBit(bits, 8));
  for (let i = 9; i < 15; i++) m.setFunction(14 - i, 8, getBit(bits, i));
  const size = m.size;
  for (let i = 0; i < 8; i++) m.setFunction(size - 1 - i, 8, getBit(bits, i));
  for (let i = 8; i < 15; i++) m.setFunction(8, size - 15 + i, getBit(bits, i));
  m.setFunction(8, size - 8, true);
}

function drawVersion(m: Matrix, ver: number) {
  if (ver < 7) return;
  const bits = versionBits(ver);
  for (let i = 0; i < 18; i++) {
    const bit = getBit(bits, i);
    const a = m.size - 11 + (i % 3), b = Math.floor(i / 3);
    m.setFunction(a, b, bit);
    m.setFunction(b, a, bit);
  }
}

function drawFunctionPatterns(m: Matrix, ver: number, ecl: Ecl) {
  const size = m.size;
  for (let i = 0; i < size; i++) { m.setFunction(6, i, i % 2 === 0); m.setFunction(i, 6, i % 2 === 0); }
  drawFinder(m, 3, 3); drawFinder(m, size - 4, 3); drawFinder(m, 3, size - 4);
  const pos = alignmentPositions(ver);
  const n = pos.length;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    if ((i === 0 && j === 0) || (i === 0 && j === n - 1) || (i === n - 1 && j === 0)) continue;
    drawAlignment(m, pos[i], pos[j]);
  }
  drawFormat(m, ecl, 0);
  drawVersion(m, ver);
}

function drawCodewords(m: Matrix, data: number[]) {
  const size = m.size;
  let i = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        const upward = ((right + 1) & 2) === 0;
        const y = upward ? size - 1 - vert : vert;
        if (!m.isFunction[y][x] && i < data.length * 8) {
          m.modules[y][x] = getBit(data[i >>> 3], 7 - (i & 7));
          i++;
        }
      }
    }
  }
}

function maskBit(mask: number, x: number, y: number): boolean {
  switch (mask) {
    case 0: return (x + y) % 2 === 0;
    case 1: return y % 2 === 0;
    case 2: return x % 3 === 0;
    case 3: return (x + y) % 3 === 0;
    case 4: return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0;
    case 5: return ((x * y) % 2) + ((x * y) % 3) === 0;
    case 6: return (((x * y) % 2) + ((x * y) % 3)) % 2 === 0;
    default: return (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
  }
}

function applyMask(m: Matrix, mask: number) {
  for (let y = 0; y < m.size; y++) for (let x = 0; x < m.size; x++) if (!m.isFunction[y][x] && maskBit(mask, x, y)) m.modules[y][x] = !m.modules[y][x];
}

/** Finder-like pattern count in a run history (1:1:3:1:1 with a 4-light border on either side). */
function finderPenalty(runHistory: number[]): number {
  const n = runHistory[1];
  const core = n > 0 && runHistory[2] === n && runHistory[3] === n * 3 && runHistory[4] === n && runHistory[5] === n;
  return (core && runHistory[0] >= n * 4 && runHistory[6] >= n ? 1 : 0) + (core && runHistory[6] >= n * 4 && runHistory[0] >= n ? 1 : 0);
}

function penaltyScore(m: Matrix): number {
  const size = m.size;
  let result = 0;
  const addRun = (hist: number[], len: number) => { hist.pop(); hist.unshift(len); };
  const terminate = (hist: number[], curLen: number, dark: boolean) => { if (dark) { addRun(hist, curLen); curLen = 0; } addRun(hist, curLen + size); return finderPenalty(hist); };
  for (let y = 0; y < size; y++) {
    let runColor = false, runX = 0; const hist = [0, 0, 0, 0, 0, 0, 0];
    for (let x = 0; x < size; x++) {
      if (m.modules[y][x] === runColor) { runX++; if (runX === 5) result += PENALTY_N1; else if (runX > 5) result++; }
      else { addRun(hist, runX); if (!runColor) result += finderPenalty(hist) * PENALTY_N3; runColor = m.modules[y][x]; runX = 1; }
    }
    result += terminate(hist, runX, runColor) * PENALTY_N3;
  }
  for (let x = 0; x < size; x++) {
    let runColor = false, runY = 0; const hist = [0, 0, 0, 0, 0, 0, 0];
    for (let y = 0; y < size; y++) {
      if (m.modules[y][x] === runColor) { runY++; if (runY === 5) result += PENALTY_N1; else if (runY > 5) result++; }
      else { addRun(hist, runY); if (!runColor) result += finderPenalty(hist) * PENALTY_N3; runColor = m.modules[y][x]; runY = 1; }
    }
    result += terminate(hist, runY, runColor) * PENALTY_N3;
  }
  for (let y = 0; y < size - 1; y++) for (let x = 0; x < size - 1; x++) {
    const c = m.modules[y][x];
    if (c === m.modules[y][x + 1] && c === m.modules[y + 1][x] && c === m.modules[y + 1][x + 1]) result += PENALTY_N2;
  }
  let dark = 0;
  for (const row of m.modules) for (const v of row) if (v) dark++;
  const total = size * size;
  const k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
  result += k * PENALTY_N4;
  return result;
}

export type QrCode = { version: number; ecl: Ecl; mask: number; size: number; modules: boolean[][] };

/**
 * Encode `text` (UTF-8, byte mode) at the smallest version that fits, preferring `ecl` and stepping down to
 * "L" if the text will not fit otherwise (`boostEcl` raises the level when a higher one fits the same version).
 */
export function qrEncode(text: string, ecl: Ecl = "M", { minVersion = 1, maxVersion = 40, boostEcl = true }: { minVersion?: number; maxVersion?: number; boostEcl?: boolean } = {}): QrCode {
  const bytes = utf8(text);
  const fits = (ver: number, level: Ecl) => 4 + byteCountBits(ver) + bytes.length * 8 <= numDataCodewords(ver, level) * 8;
  let version = -1, level: Ecl = ecl;
  for (let ver = minVersion; ver <= maxVersion; ver++) { if (fits(ver, ecl)) { version = ver; break; } }
  if (version < 0) {
    for (let ver = minVersion; ver <= maxVersion; ver++) { if (fits(ver, "L")) { version = ver; level = "L"; break; } }
    if (version < 0) throw new Error(`Text too long for a QR code (${bytes.length} bytes)`);
  }
  if (boostEcl) for (const l of ["M", "Q", "H"] as Ecl[]) if (fits(version, l) && ECL_BITS_ORDER.indexOf(l) > ECL_BITS_ORDER.indexOf(level)) level = l;

  const data = addEccAndInterleave(encodeBytes(bytes, version, level), version, level);
  const size = version * 4 + 17;
  const m = new Matrix(size);
  drawFunctionPatterns(m, version, level);
  drawCodewords(m, data);

  let best = 0, bestScore = Infinity;
  for (let mask = 0; mask < 8; mask++) {
    applyMask(m, mask);
    drawFormat(m, level, mask);
    const score = penaltyScore(m);
    if (score < bestScore) { bestScore = score; best = mask; }
    applyMask(m, mask);
  }
  applyMask(m, best);
  drawFormat(m, level, best);
  return { version, ecl: level, mask: best, size, modules: m.modules };
}

/** Strength order for boosting. */
const ECL_BITS_ORDER: Ecl[] = ["L", "M", "Q", "H"];

/** SVG path data drawing every dark module as a unit square, offset by `margin` modules (the quiet zone). */
export function qrPath(code: QrCode, margin = 4): string {
  const parts: string[] = [];
  for (let y = 0; y < code.size; y++) for (let x = 0; x < code.size; x++) if (code.modules[y][x]) parts.push(`M${x + margin} ${y + margin}h1v1h-1z`);
  return parts.join("");
}

/** A complete standalone SVG (square, `px` wide) with a white quiet zone; fill follows `color`. */
export function qrSvg(text: string, { px = 96, margin = 4, ecl = "M", color = "#000" }: { px?: number; margin?: number; ecl?: Ecl; color?: string } = {}): string {
  const code = qrEncode(text, ecl);
  const dim = code.size + margin * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" width="${px}" height="${px}" shape-rendering="crispEdges" role="img" aria-label="QR code for ${text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")}"><rect width="${dim}" height="${dim}" fill="#fff"/><path d="${qrPath(code, margin)}" fill="${color}"/></svg>`;
}
