import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { GM_DIVE } from "@/data/country-gm";

export const metadata: Metadata = pageMeta({ title: GM_DIVE.title, description: GM_DIVE.description, path: "/countries/gm/" });

export default function GambiaPage() {
  return <CountryDeepDive dive={GM_DIVE} />;
}
