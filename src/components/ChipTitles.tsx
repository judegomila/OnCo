"use client";

import { useEffect } from "react";

const truncated = (el: Element) => el.scrollWidth > el.clientWidth + 1;

/**
 * Whether React has taken this element over yet. React hangs its fiber on every DOM node it renders or hydrates,
 * under a key that starts `__reactFiber$`. That key is an internal, so src/components/ChipTitles.test.ts hydrates
 * a real chip and fails if a React upgrade renames it.
 */
export const hydrated = (el: Element) => Object.keys(el).some((k) => k.startsWith("__reactFiber$"));

/**
 * Stamp or clear the full label on one chip. A chip that already carries a title of its own is left alone, and so
 * is one React has not hydrated: see ChipTitles below for why.
 */
export function titleChip(el: HTMLElement) {
  if (!hydrated(el)) return;
  const own = el.dataset.chipTitle === "1";
  if (truncated(el) || Array.from(el.children).some(truncated)) {
    if (!el.title || own) { el.title = (el.textContent ?? "").replace(/\s+/g, " ").trim(); el.dataset.chipTitle = "1"; }
  } else if (own) { el.removeAttribute("title"); delete el.dataset.chipTitle; }
}

/**
 * Chips (.chip) are one-line pills that truncate with an ellipsis when the label is wider than the space
 * (src/app/globals.css). This puts the full label in a native title tooltip on a chip that is actually truncated,
 * so a hover or long-press reveals the text (issue 42).
 *
 * The title is written when the pointer reaches the chip, not when the page loads. Until 16 November 2026 this
 * measured every chip once the browser was idle and stamped the truncated ones. It sits in the root layout, which
 * hydrates first, and a long page hydrates in pieces after it: on /survival/, /forest/, /explained/ and
 * /technologies/adc/ the stamp landed on chips React had not reached, and React then reported `title` and
 * `data-chip-title` as attributes the server never sent. Nothing differed between server and client render; the
 * markup was edited between the two. So the write now waits for the reader, which is also when it is first of any
 * use, and skips a chip that is still server markup. The browser shows a title after a hover delay, so one set on
 * the way in is in time.
 */
export function ChipTitles() {
  useEffect(() => {
    const over = (e: Event) => {
      const chip = e.target instanceof Element ? e.target.closest<HTMLElement>(".chip") : null;
      if (chip) titleChip(chip);
    };
    document.addEventListener("pointerover", over, { passive: true });
    return () => document.removeEventListener("pointerover", over);
  }, []);
  return null;
}
