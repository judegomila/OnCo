import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { OncoClient, resolveApi } from "./client";
import { run } from "./onco";
import { writeFixture } from "./test-fixture";

describe("local API file URLs", () => {
  it.each(["offline API", "离线数据", "API#1", "API%20copy"])("decodes the directory name %s exactly once", (name) => {
    const dir = join(process.cwd(), name);
    const url = pathToFileURL(dir).href;
    expect(resolveApi(url, {})).toEqual({ base: dir, local: true });
    expect(resolveApi(undefined, { ONCO_API: url })).toEqual({ base: dir, local: true });
  });

  let fixture: Awaited<ReturnType<typeof writeFixture>>;
  let url: string;
  beforeEach(async () => {
    fixture = await writeFixture();
    const dir = join(fixture.dir, "离线 API #100%20");
    await mkdir(dir);
    await copyFile(join(fixture.dir, "meta.json"), join(dir, "meta.json"));
    url = pathToFileURL(dir).href;
  });
  afterEach(() => fixture.cleanup());

  it("reads JSON and binary files from an encoded directory URL", async () => {
    const client = new OncoClient(resolveApi(url, {}));
    expect((await client.meta()).total).toBe(3);
    const bytes = await client.bytes("meta.json");
    expect(JSON.parse(new TextDecoder().decode(bytes)).total).toBe(3);
  });

  it.each(["flag", "environment"])("runs the CLI with a file URL from the %s", async (source) => {
    const out: string[] = [], err: string[] = [];
    const argv = ["meta", "--json", "--quiet", ...(source === "flag" ? ["--api", url] : [])];
    const env = source === "environment" ? { ONCO_API: url } : {};
    const code = await run(argv, { out: (s) => out.push(s), err: (s) => err.push(s) }, env);
    expect(code).toBe(0);
    expect(err).toEqual([]);
    expect(JSON.parse(out.join("\n")).total).toBe(3);
  });
});
