/** Shared by the weekly re-check's unit tests. Nothing here touches the network. */
import { Net } from "./lib";

/** A fake network: answers from a table, records what was asked, and never touches a socket. */
export function fakeFetch(table: (url: string, init: RequestInit) => Response | Promise<Response>) {
  const calls: Array<{ url: string; method: string; ua: string; redirect?: string }> = [];
  const impl = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = String(input);
    calls.push({ url, method: init.method ?? "GET", ua: (init.headers as Record<string, string>)["User-Agent"], redirect: init.redirect });
    return table(url, init);
  }) as typeof fetch;
  return { impl, calls };
}

/** A Net over a fake network, with no waiting. */
export function fakeNet(table: (url: string, init: RequestInit) => Response | Promise<Response>) {
  const f = fakeFetch(table);
  return { net: new Net({ fetchImpl: f.impl, sleep: async () => undefined }), calls: f.calls };
}

/** A real, uncompressed ZIP holding one sheet of inline strings: enough of an .xlsx for the EMA reader. */
export function workbook(rows: string[][]): Buffer {
  const esc = (s: string) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
  const xml = `<worksheet><sheetData>${rows.map((row, i) => `<row r="${i + 1}">${row.map((v, j) => `<c r="${String.fromCharCode(65 + j)}${i + 1}" t="inlineStr"><is><t>${esc(v)}</t></is></c>`).join("")}</row>`).join("")}</sheetData></worksheet>`;
  const filename = Buffer.from("xl/worksheets/sheet1.xml"), data = Buffer.from(xml);
  let crc = 0xffffffff;
  for (const byte of data) { crc ^= byte; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0); }
  crc = (crc ^ 0xffffffff) >>> 0;
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50); header.writeUInt16LE(20, 4); header.writeUInt32LE(crc, 14); header.writeUInt32LE(data.length, 18); header.writeUInt32LE(data.length, 22); header.writeUInt16LE(filename.length, 26);
  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6); central.writeUInt32LE(crc, 16); central.writeUInt32LE(data.length, 20); central.writeUInt32LE(data.length, 24); central.writeUInt16LE(filename.length, 28);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50); end.writeUInt16LE(1, 8); end.writeUInt16LE(1, 10); end.writeUInt32LE(central.length + filename.length, 12); end.writeUInt32LE(header.length + filename.length + data.length, 16);
  return Buffer.concat([header, filename, data, central, filename, end]);
}
