import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import ids from "../data/structure-ids.json";

describe("structure ids", () => {
  it("lists exactly the products in public/structures/index.json", () => {
    const index = JSON.parse(readFileSync("public/structures/index.json", "utf8")) as Record<string, unknown[]>;
    expect(ids).toEqual(Object.keys(index).filter((k) => index[k]?.length).sort());
  });
});
