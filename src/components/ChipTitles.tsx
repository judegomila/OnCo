"use client";

import { useEffect } from "react";

/**
 * Chips (.chip) are one-line pills that truncate with an ellipsis when the label is wider than the space
 * (src/app/globals.css). This stamps the full label as a native title tooltip on the chips that are actually
 * truncated, and only those, so a hover or long-press reveals the text (issue 42). Runs after load, on resize
 * and when the DOM changes (tabs, client tables), batched to one pass per frame. Chips that already carry a
 * title of their own are left alone.
 */
export function ChipTitles() {
  useEffect(() => {
    let raf = 0;
    const truncated = (el: Element) => el.scrollWidth > el.clientWidth + 1;
    const pass = () => {
      raf = 0;
      for (const el of document.querySelectorAll<HTMLElement>(".chip")) {
        const clipped = truncated(el) || Array.from(el.children).some(truncated);
        const own = el.dataset.chipTitle === "1";
        if (clipped) {
          if (!el.title || own) { el.title = (el.textContent ?? "").replace(/\s+/g, " ").trim(); el.dataset.chipTitle = "1"; }
        } else if (own) { el.removeAttribute("title"); delete el.dataset.chipTitle; }
      }
    };
    const schedule = () => { if (!raf) raf = window.requestAnimationFrame(pass); };
    schedule();
    window.addEventListener("resize", schedule);
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener("resize", schedule); mo.disconnect(); if (raf) window.cancelAnimationFrame(raf); };
  }, []);
  return null;
}
