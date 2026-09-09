import type { Metadata } from "next";
import Latest, { metadata as latestMeta } from "./2026/page";

/** /report/ always shows the latest annual report; earlier years stay at /report/<year>/. Update the import when a new year is written. */
export const metadata: Metadata = { ...latestMeta, title: "Annual report", alternates: { canonical: "https://onco.cc/report/" } };
export default function Report() { return <Latest />; }
