// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createElement as h, act } from "react";
import { renderToString } from "react-dom/server";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { ChipTitles, hydrated } from "./ChipTitles";

/**
 * ChipTitles sits in the root layout, which hydrates before the page under it. It used to stamp `title` and
 * `data-chip-title` on truncated chips as soon as the browser was idle, and React then reported both as a
 * hydration mismatch on every long page whose chips it had not reached yet. These tests replay that order: the
 * tooltip component is live first, the chips are still server markup, and the page hydrates afterwards.
 */
const LABEL = "Advanced systemic mastocytosis (aggressive SM, SM with an associated haematological neoplasm)";
const page = () => h("div", null, h("a", { className: "chip", href: "/cancers/advanced-systemic-mastocytosis/" }, LABEL));

/** jsdom does no layout, so every chip is given a label wider than its box. */
function clip(el: Element) {
  Object.defineProperty(el, "scrollWidth", { configurable: true, value: 400 });
  Object.defineProperty(el, "clientWidth", { configurable: true, value: 120 });
}
const hover = (el: Element) => act(() => { el.dispatchEvent(new Event("pointerover", { bubbles: true })); });

const roots: Root[] = [];
async function serverPageWithLiveTooltips() {
  const tips = document.createElement("div");
  const container = document.createElement("div");
  container.innerHTML = renderToString(page());
  document.body.append(tips, container);
  const tipsRoot = createRoot(tips);
  roots.push(tipsRoot);
  await act(async () => { tipsRoot.render(h(ChipTitles)); });
  const chip = container.querySelector<HTMLElement>(".chip")!;
  clip(chip);
  return { container, chip };
}

beforeAll(() => { (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true; });
afterEach(async () => {
  await act(async () => { for (const r of roots.splice(0)) r.unmount(); });
  document.body.innerHTML = "";
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("chip titles and hydration", () => {
  it("writes nothing to a chip on load, however long the page sits", async () => {
    vi.useFakeTimers();
    const { chip } = await serverPageWithLiveTooltips();
    await act(async () => { vi.advanceTimersByTime(10_000); });
    expect(chip.hasAttribute("title")).toBe(false);
    expect(chip.hasAttribute("data-chip-title")).toBe(false);
  });

  it("leaves a chip alone while it is still server markup, so the page hydrates without a mismatch", async () => {
    const { container, chip } = await serverPageWithLiveTooltips();
    await hover(chip);
    expect(chip.hasAttribute("title")).toBe(false);
    expect(chip.hasAttribute("data-chip-title")).toBe(false);

    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const recoverable: unknown[] = [];
    await act(async () => { roots.push(hydrateRoot(container, page(), { onRecoverableError: (e) => recoverable.push(e) })); });
    expect(errors.mock.calls).toEqual([]);
    expect(recoverable).toEqual([]);
  });

  it("gives a truncated chip its full label once React owns it and the pointer reaches it", async () => {
    const { container, chip } = await serverPageWithLiveTooltips();
    await act(async () => { roots.push(hydrateRoot(container, page())); });
    // The check for "React owns it" reads a React internal. If an upgrade renames it, this is the line that fails.
    expect(hydrated(chip)).toBe(true);
    await hover(chip);
    expect(chip.title).toBe(LABEL);
    expect(chip.dataset.chipTitle).toBe("1");

    // Wide enough again: the title this component wrote comes off.
    Object.defineProperty(chip, "clientWidth", { configurable: true, value: 400 });
    await hover(chip);
    expect(chip.hasAttribute("title")).toBe(false);
    expect(chip.hasAttribute("data-chip-title")).toBe(false);
  });

  it("does not overwrite a title the page set itself", async () => {
    const own = () => h("div", null, h("span", { className: "chip", title: "Set by the page" }, LABEL));
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    roots.push(root);
    await act(async () => { root.render(h("div", null, h(ChipTitles), own())); });
    const chip = container.querySelector<HTMLElement>(".chip")!;
    clip(chip);
    await hover(chip);
    expect(chip.title).toBe("Set by the page");
    expect(chip.hasAttribute("data-chip-title")).toBe(false);
  });

  it("reports the old order as a mismatch, so the second test is a real check", async () => {
    const { container, chip } = await serverPageWithLiveTooltips();
    chip.title = LABEL;
    chip.dataset.chipTitle = "1";
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    await act(async () => { roots.push(hydrateRoot(container, page())); });
    expect(errors.mock.calls.flat().join(" ")).toMatch(/hydrat/i);
  });
});
