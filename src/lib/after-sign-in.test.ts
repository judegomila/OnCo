import { describe, expect, it } from "vitest";
import { afterSignInPath, backFromSearch, safeReturnPath, welcomeHref } from "./after-sign-in";

/** The one decision made on /signup/ once WorkOS has returned: welcome step for a reader with no stored role, the return path otherwise. */
describe("after sign-in", () => {
  it("sends a reader with no stored role to the welcome page carrying the return path", () => {
    expect(afterSignInPath({ hasRole: false, back: "/cancers/aml/" })).toBe("/welcome/?back=%2Fcancers%2Faml%2F");
    expect(afterSignInPath({ hasRole: false, back: "/trials/?cancers=AML" })).toBe("/welcome/?back=%2Ftrials%2F%3Fcancers%3DAML");
    expect(afterSignInPath({ hasRole: false, back: "/" })).toBe("/welcome/");
    expect(afterSignInPath({ hasRole: false, back: null })).toBe("/welcome/");
  });

  it("sends a reader with a stored role straight back to where they started", () => {
    expect(afterSignInPath({ hasRole: true, back: "/cancers/aml/" })).toBe("/cancers/aml/");
    expect(afterSignInPath({ hasRole: true, back: "/signup/" })).toBe("/signup/");
    expect(afterSignInPath({ hasRole: true, back: null })).toBe("/");
  });

  it("never nests the welcome page inside its own back parameter", () => {
    expect(afterSignInPath({ hasRole: false, back: "/welcome/?back=%2Fsaved%2F" })).toBe("/welcome/?back=%2Fsaved%2F");
    expect(afterSignInPath({ hasRole: true, back: "/welcome/?back=%2Fsaved%2F" })).toBe("/welcome/?back=%2Fsaved%2F");
    expect(welcomeHref("/welcome/")).toBe("/welcome/");
  });

  it("only returns to same-origin absolute paths, else the home page", () => {
    expect(safeReturnPath("/cancers/aml/")).toBe("/cancers/aml/");
    expect(safeReturnPath("//evil.example/")).toBe("/");
    expect(safeReturnPath("https://evil.example/")).toBe("/");
    expect(safeReturnPath(null)).toBe("/");
    expect(safeReturnPath("")).toBe("/");
    expect(safeReturnPath(undefined, "/signup/")).toBe("/signup/");
    expect(afterSignInPath({ hasRole: false, back: "https://evil.example/" })).toBe("/welcome/");
    expect(afterSignInPath({ hasRole: true, back: "//evil.example/" })).toBe("/");
  });

  it("reads and validates the back parameter of a welcome address", () => {
    expect(backFromSearch("?back=%2Fcancers%2Faml%2F")).toBe("/cancers/aml/");
    expect(backFromSearch("?back=//evil.example/")).toBe("/");
    expect(backFromSearch("")).toBe("/");
    expect(backFromSearch("?other=1")).toBe("/");
  });
});
